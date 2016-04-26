var AppData = require('data');
var acceptExpenseView = this.getView();
var fullData = AppData.fullUserData();
acceptExpenseView.open();


var dateObj = new Date(AppData.acceptExpense().date);
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear();

$.expDate.text = 'date: ' + day + '/' + month + '/'+ year; 
$.expAmount.text = 'Amount: ' + AppData.acceptExpense().amount+' ' + getCurrency(AppData.acceptExpense().currency);
//$.incAccount.text = 'Your account: ' + AppData.acceptIncome().toacc;
$.expComment.text = 'Comment: ' + AppData.acceptExpense().comment;
 


function cancelIncome() {
	acceptExpenseView.close();
    Alloy.createController('index').getView().open();
};  

function acceptlIncome() {
	AppData.createExpense(AppData.acceptExpense());
    Alloy.createController('refresh');
	acceptExpenseView.close();
};        
 
function getCurrency(curId){
	for(var i = 0; i <= parseInt(fullData.allow_cur.length) -1; i++){
		if(fullData.allow_cur[i].id == curId){
			return fullData.allow_cur[i].code;
		}
	} 
	
}