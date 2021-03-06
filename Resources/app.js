var window = Ti.UI.createWindow({
	title : "Table View Edit",
	backgroundColor : '#5B6F7E',
	layout : 'vertical',
});

var testData = [{
	title : 'Manzanas'
}, {
	title : 'Platanos'
}, {
	title : 'Peras'
}, {
	title : 'fresas'
}, {
	title : 'Naranjas'
},{
    title: 'Mangos'
}];

var table = Ti.UI.createTableView({
	top : '40',
	height : Ti.UI.SIZE,
	editable : true,
	data : testData
});

table.addEventListener('dranged', function() {
	log('reset table ');
	table.setData(testData);
});

table.addEventListener('deleted', function(e) {
	var rowIndex = e.index;
	var rowBkup = e.row;
	log(testData[rowIndex].title);

	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['confirm', 'cancel'],
		message : 'confirm deleted?',
		title : 'Delete'
	});

	dialog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			log("delete cancelled. keeping " + testData[rowIndex].title + "\n\nTable Data after cancel: " + JSON.stringify(table.sections[0].getRows()) + "\n\nTest data: " + JSON.stringify(testData) + "\n\nForce pushing the vanished row i choose to keep back into table data");
			var restored = table.sections[0].getRows();
			restored.splice(rowIndex, 0, rowBkup);
			table.setData(restored);
		} else if (e.index === 0) {
			if (rowIndex > 0) {
				log(testData.splice(rowIndex, 1) + "deleted!!" + "\n\nTable Data" + JSON.stringify(table.sections[0].getRows()) + "\n\nTestData" + JSON.stringify(testData));
			} else {
				alert('No More');
				Ti.API.info('no mere');
			};
		}
		dialog.show();
    });

});

var logView = Ti.UI.createLabel({
	top : 20,
	text : 'Actions log'
});

function log(text) {
	logView.setText(text);
}
/*
var button = Ti.UI.createButton({
	backgroundColor : 'white',
	title : 'buton',
	top:80,
    color: 'red'
});
button.addEventListener('click', function(e) {
    var dialogo = Ti.UI.createAlertDialog({
        cancel : 1,
        buttonNames : ['Aceptar', 'Cancelar'],
        message : 'Ejemplo Dialogo',
        title : 'Dialogo'
    });
    dialogo.show();
});
window.add(button);
*/


window.add(table);
window.add(logView);
window.open();
