var AppData = require('data');
var acceptTransactionView = this.getView();
var fullData = AppData.fullUserData();
acceptTransactionView.open();

var dateObj = new Date(AppData.acceptTransaction().date);
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear();

$.transDate.text = 'date: ' + day + '/' + month + '/'+ year; 
$.transAmount.text = 'Amount: ' + AppData.acceptTransaction().amount+' ' + getCurrency(AppData.acceptTransaction().currency);
//$.incAccount.text = 'Your account: ' + AppData.acceptIncome().toacc;
$.transComment.text = 'Comment: ' + AppData.acceptTransaction().comment;
 


function cancelTransaction() {
	acceptTransactionView.close();
    Alloy.createController('index').getView().open();
};  

function acceptTransaction() {
	AppData.createTransaction(AppData.acceptTransaction());
    Alloy.createController('refresh');
	acceptTransactionView.close();
};         



function getCurrency(curId){
	for(var i = 0; i <= parseInt(fullData.allow_cur.length) -1; i++){
		if(fullData.allow_cur[i].id == curId){
			return fullData.allow_cur[i].code;
		}
	} 
	
}
