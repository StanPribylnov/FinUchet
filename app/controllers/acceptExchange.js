var AppData = require('data');
var acceptExchangeView = this.getView();
var fullData = AppData.fullUserData(); 
acceptExchangeView.open();

var dateObj = new Date(AppData.acceptExchange().date);
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear();

$.exchDate.text = 'date: ' + day + '/' + month + '/'+ year; 
$.exchAmount.text = 'Amount: ' + AppData.acceptExchange().amount+' ' + getCurrency(AppData.acceptExchange().currency);
//$.incAccount.text = 'Your account: ' + AppData.acceptIncome().toacc;
$.exchComment.text = 'Comment: ' + AppData.acceptExchange().comment;
 


function cancelExchange() { 
	acceptExchangeView.close();
    Alloy.createController('index').getView().open();
};  

function acceptExchange() {
	AppData.createExchange(AppData.acceptExchange());
    Alloy.createController('refresh');
	acceptExchangeView.close();
};        
 
function getCurrency(curId){
	for(var i = 0; i <= parseInt(fullData.allow_cur.length) -1; i++){
		if(fullData.allow_cur[i].id == curId){
			return fullData.allow_cur[i].code;
		}
	} 
	
}