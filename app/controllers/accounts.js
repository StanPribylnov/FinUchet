var AppData = require('data');
var LangData = require('lang');
var currentLangData = false;
var totalUAH = 0, 
totalUSD = 0, 
totalEUR = 0, 
totalILS = 0;

if(AppData.getLang() == 'JE'){
	currentLangData = LangData.jeData();
}else{
	currentLangData = LangData.ruData();
}    

setLangData();

if (AppData.isLoggedIn()) { 
	var fullData = AppData.fullUserData(); 

	
	//				Accounts
	for(var i = 0; i <= parseInt(fullData.my_accounts.length) -1; i++){
		$.accountsWin.add(Ti.UI.createLabel({
			text: fullData.acc_type[fullData.my_accounts[i].type_id],
			top: 30,
			font: {
				fontSize: 24
			}, 
			color: '#5DAD42'
		})); 
		
		//getCur(fullData.my_accounts[i].id);
		getAccBalance(fullData.my_accounts[i].id);
	}
	    
  	 
	function getAccBalance(accId){
		
		for(var i = 0; i <= parseInt(fullData.balances.length) -1; i++){
			if(fullData.balances[i].account_id == accId){
								
				var curCode = getBalCur(fullData.balances[i].currency_id);
				
				if(curCode == "UAH"){
					totalUAH = totalUAH + parseInt(fullData.balances[i].value);					
				}else if(curCode == "USD"){
					totalUSD = totalUSD + parseInt(fullData.balances[i].value);	
				}else if(curCode == "EUR"){
					totalEUR = totalEUR + parseInt(fullData.balances[i].value);	
				}else if(curCode == "ILS"){
					totalILS = totalILS + parseInt(fullData.balances[i].value);	
				} 
				
				$.accountsWin.add(Ti.UI.createLabel({
					text: fullData.balances[i].value + " " + curCode,
					top: 5,
					left: 25
				}));
				
			}
		}
	}
	function getBalCur(curId){
		var curCode = false;
		for(var i = 0; i <= parseInt(fullData.allow_cur.length) -1; i++){			
			if(fullData.allow_cur[i].id == curId){
				curCode = fullData.allow_cur[i].code;
			}
		}
		return curCode;
	} 
	
	
}


//					SET TOTAL AMOUNT
var totalView = Ti.UI.createView({
	top: 30,
	width: '100%',
	height: 200,
	backgroundColor: '#75C799',
	layout: 'vertical' 
});
$.accountsWin.add(totalView);
totalView.add(Ti.UI.createLabel({
	text: "Total: ",
	top: 20, 
	font: {
		fontSize: 24
	}
}));
totalView.add(Ti.UI.createLabel({
	text: totalUAH + " UAH",
	top: 5,
	left: 25
}));
totalView.add(Ti.UI.createLabel({
	text: totalUSD + " USD",
	top: 5,
	left: 25
}));
totalView.add(Ti.UI.createLabel({
	text: totalEUR + " EUR",
	top: 5,
	left: 25
}));
totalView.add(Ti.UI.createLabel({
	text: totalILS + " ILS",
	top: 5,
	left: 25
}));
	
function setLangData(){
	$.accountsWin.title = currentLangData.accountsTab.accounts;  
} 
       