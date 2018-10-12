var window=Ti.UI.createWindow({
title:'Table View Edit',
backgroundColor:'#5B6F7E',
layout:'vertical'}),


testData=[{
title:'Manzanas'},
{
title:'Platanos'},
{
title:'Peras'},
{
title:'fresas'},
{
title:'Naranjas'},
{
title:'Mangos'}],


table=Ti.UI.createTableView({
top:'40',
height:Ti.UI.SIZE,
editable:!0,
data:testData});


table.addEventListener('dranged',function(){
log('reset table '),
table.setData(testData);
}),

table.addEventListener('click',function(e){
var rowIndex=e.index,
rowBkup=e.row;
log(testData[rowIndex].title);

var dialog=Ti.UI.createAlertDialog({
cancel:1,
buttonNames:['confirm','cancel'],
message:'confirm deleted?',
title:'Delete'});


dialog.addEventListener('deleted',function(e){
if(e.index===e.source.cancel){
log('delete cancelled. keeping '+testData[rowIndex].title+'\n\nTable Data after cancel: '+JSON.stringify(table.sections[0].getRows())+'\n\nTest data: '+JSON.stringify(testData)+'\n\nForce pushing the vanished row i choose to keep back into table data');
var restored=table.sections[0].getRows();
restored.splice(rowIndex,0,rowBkup),
table.setData(restored);
}else if(0===e.index){
0<rowIndex?
log(testData.splice(rowIndex,1)+'deleted!!\n\nTable Data'+JSON.stringify(table.sections[0].getRows())+'\n\nTestData'+JSON.stringify(testData)):(

alert('No More'),
Ti.API.info('no mere'));
;
}
dialog.show();
});

});

var logView=Ti.UI.createLabel({
top:20,
text:'Actions log'});


function log(text){
logView.setText(text);
}




















window.add(table),
window.add(logView),
window.open();