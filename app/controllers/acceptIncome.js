var AppData = require('data');
var acceptIncomeView = this.getView();
var fullData = AppData.fullUserData();
acceptIncomeView.open();
var dateObj = new Date(AppData.acceptIncome().date);
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear();

$.incDate.text = 'date: ' + day + '/' + month + '/'+ year; 
$.incAmount.text = 'Amount: ' + AppData.acceptIncome().amount+' ' + getCurrency(AppData.acceptIncome().currency);
//$.incAccount.text = 'Your account: ' + AppData.acceptIncome().toacc;
$.incComment.text = 'Comment: ' + AppData.acceptIncome().comment;
 


function cancelIncome() {
	acceptIncomeView.close();
    Alloy.createController('index').getView().open();
};  

function acceptlIncome() {
	AppData.createIncome(AppData.acceptIncome());
    Alloy.createController('refresh');
	acceptIncomeView.close();
};    
 
function getCurrency(curId){
	for(var i = 0; i <= parseInt(fullData.allow_cur.length) -1; i++){
		if(fullData.allow_cur[i].id == curId){
			return fullData.allow_cur[i].code;
		}
	} 
	
}