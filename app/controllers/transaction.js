var transactionView = this.getView();
transactionView.open();

var AppData = require('data');
var LangData = require('lang');
var userData = AppData.fullUserData();
var cur = 0; 
var acc = 0;
var touser = 0;



if(AppData.getLang() == 'JE'){
	currentLangData = LangData.jeData();
}else{
	currentLangData = LangData.ruData();
}    
console.log('inc lang'+userData.user.lang);




function toOperations() {
	Alloy.createController('refresh');
	transactionView.close();
    //Alloy.createController('index').getView().open();
}; 


//				Currencies
var currencies = [];
for(var i = 0; i<= (parseInt(userData.allow_cur.length) -1 ); i++){
	var accType = userData.allow_cur[i].code; 
	var id = userData.allow_cur[i].id;
	currencies[i]=Ti.UI.createPickerRow({title: accType, psValue: id});
	
}
//$.currency.add(currencies); 


//				Acc types
var account_types = [];
for(var i = 0; i<= (parseInt(userData.my_accounts.length) -1 ); i++){
	var id = userData.my_accounts[i].id;
	var accType = userData.my_accounts[i].type_id;
	var accName = userData.acc_type[accType];
	if(id !== undefined){
		Ti.API.info(userData.my_accounts[i].id);
	}
	account_types[i]=Ti.UI.createPickerRow({title: accName, psValue: id});
	 
} 
//$.account.add(account_types);
 

//				Users 
var users = [];
for(var i = 0; i<= (parseInt(userData.users.length) -1 ); i++){
	//console.log(userData.users[i].login);
	users[i]=Ti.UI.createPickerRow({title: userData.users[i].login, psValue: userData.users[i].id});
}
//$.user.add(users);


var fader = Ti.UI.createView({
	top: 0,
    width: "100%",
    height: '100%',
    backgroundColor: 'black',
    borderWidth: '1dp',
    borderColor: 'black', 
    zIndex: 9999,
    visible: false,
    opacity: '0.8',
    zIndex: 1
});  
transactionView.add(fader);
//					DATE PICKER

	var dateView = Ti.UI.createView({
		top: 250,
	    width: 300,
	    height: 100,
	    backgroundColor: 'white',
	    borderWidth: '1dp',
	    borderColor: 'black', 
	    zIndex: 9999,
	    visible: false
	 });  
	 var picker = Ti.UI.createPicker({
	 	type:Ti.UI.PICKER_TYPE_DATE,
  		minDate:new Date(2009,0,1),
  		maxDate:new Date(2014,11,31),
  		value:new Date(2014,3,12),
	});	
	dateView.add(picker);
	var datePickerButton = Ti.UI.createButton({
    	title: 'ok',
    	bottom: 0
    });
    $.psPickDate.value = new Date().toLocaleDateString();
    datePickerButton.addEventListener('click', function(){
    	$.psPickDate.value = picker.getValue().toLocaleDateString();
        dateView.hide();
        fader.hide();
    });
    dateView.add(datePickerButton); 
	transactionView.add(dateView);
	
	 
    
$.psPickDate.addEventListener('click',function(e){
	
	dateView.show();
        fader.show();
   
});

//					CURENCY PICKER



	var curView = Ti.UI.createView({
		top: 250,
	    width: 300,
	    height: 100,
	    backgroundColor: 'white',
	    borderWidth: '1dp',
	    borderColor: 'black', 
	    zIndex: 9999,
	    visible: false
	 });  
	 var curPicker = Ti.UI.createPicker({
	});	
	curPicker.add(currencies);
	curView.add(curPicker);
	var curPickerButton = Ti.UI.createButton({
    	title: 'ok',
    	bottom: 0
    });
    curPickerButton.addEventListener('click', function(){
	    cur = curPicker.getSelectedRow(0).psValue; 
	    $.currencyPicker.value = curPicker.getSelectedRow(0).title;
	    curView.hide();
        fader.hide();
    	$.psRaitIndicatorLabel.text = $.currencyPicker.value+ '/'+ 'USD';
	    if(acc != 0 && cur != 0){
			$.psTotalExchLabel3.text = 'Доступно: ' + getCurrency(acc,cur) + curPicker.getSelectedRow(0).title;
	    }
    });
    curView.add(curPickerButton); 
	transactionView.add(curView);

 
    
$.currencyPicker.addEventListener('click',function(e){
	
	curView.show();
        fader.show();
   
});

//					ACCOUNTS



	var accView = Ti.UI.createView({
		top: 250,
	    width: 300,
	    height: 100,
	    backgroundColor: 'white',
	    borderWidth: '1dp',
	    borderColor: 'black', 
	    zIndex: 9999, 
	    visible: false
	 });  
	 var accPicker = Ti.UI.createPicker({
	});	
	accPicker.add(account_types);
	accView.add(accPicker);
	var accPickerButton = Ti.UI.createButton({
    	title: 'ok',
    	bottom: 0
    });
    accPickerButton.addEventListener('click', function(){
	    acc = accPicker.getSelectedRow(0).psValue; 
	    $.accountPicker.value = accPicker.getSelectedRow(0).title;
	    accView.hide();
        fader.hide();
	    if(acc != 0 && cur != 0){
			$.psTotalExchLabel3.text = 'Доступно: ' + getCurrency(acc,cur) + curPicker.getSelectedRow(0).title;
	    }
    });
    accView.add(accPickerButton); 
	transactionView.add(accView);

 
    
$.accountPicker.addEventListener('click',function(e){
	
	accView.show();
        fader.show();
   
});




//					USER PICKER



	var userView = Ti.UI.createView({
		top: 250,
	    width: 300,
	    height: 100,
	    backgroundColor: 'white',
	    borderWidth: '1dp',
	    borderColor: 'black', 
	    zIndex: 9999, 
	    visible: false
	});   
	 var userPicker = Ti.UI.createPicker({
	});	
	userPicker.add(users);
	userView.add(userPicker);
	var userPickerButton = Ti.UI.createButton({
    	title: 'ok',
    	bottom: 0
    });
    userPickerButton.addEventListener('click', function(){
	    touser = userPicker.getSelectedRow(0).psValue; 
	    $.userPicker.value = userPicker.getSelectedRow(0).title;
        userView.hide();
        fader.hide();
    });
    userView.add(userPickerButton); 
	transactionView.add(userView);

 
    
$.userPicker.addEventListener('click',function(e){
	
	userView.show();
        fader.show();
   
});




$.amount.addEventListener('change', function(e) {
      e.source.value = e.source.value.replace(/[^\d\.]/g, "")
  .replace(/\./, "x")
  .replace(/\./g, "")
  .replace(/x/, ".");
});
$.psRait.addEventListener('change', function(e) {
      e.source.value = e.source.value.replace(/[^\d\.]/g, "")
  .replace(/\./, "x")
  .replace(/\./g, "")
  .replace(/x/, ".");
});


/*
transactionView.addEventListener('click', function(){
	$.amount.blur();
	$.psRait.blur();
});	 
*/
function getCurrency(accId,curId){
	for(var i = 0; i <= parseInt(userData.balances.length) -1; i++){
		if(userData.balances[i].account_id == accId && userData.balances[i].currency_id == curId){
			return userData.balances[i].value;
		}
	} 
	
}



function submitData(){ 

	if(($.amount.value && cur && $.psRait.value && acc && $.comment.value) != ''){
		if(parseFloat($.amount.value) == 0 || parseFloat($.psRait.value) == 0){
			alert('Поля сумма и курс не должны быть нулевыми!');
		}else{
		    if(getCurrency(acc,cur)-parseFloat($.amount.value).toFixed(2) >= 0){
		    	if(userData.user.id == touser){
					alert('Вы не можете создавать перевод на самого себя!');
		    	}else{
					AppData.acceptTransaction({ 
						hash: userData.user.hash, 
						operationType: 4,  
						date: Date.parse($.psPickDate.value), 
						amount: parseFloat($.amount.value).toFixed(2), 
						currency: cur,   
						rait: parseFloat($.psRait.value).toFixed(2),  
						fromUser: userData.user.id,   
						fromAccount: acc, 
						comment: $.comment.value, 
						subcategory_id: 1,  
						touser: touser  
					});      
					transactionView.close();
				    Alloy.createController('acceptTransaction');
		    	}
			}else{
				alert('На аккаунте в текущей валюте недостаточно средств!');
			}
	   }
	}else{
		alert('Вы должны заполнить все поля');
	}
} 



setLangData();

function setLangData(){
	$.gback.title = currentLangData.operationsList.goback;
	$.psDateLabel.text = currentLangData.operationsList.date;
	$.psAmountLabel.text = currentLangData.operationsList.amount;
	$.currencyPicker.hintText = currentLangData.operationsList.currency;
	$.tocurrencylabel = currentLangData.operationsList.tocurrencylabel;
	$.tocurrencyPicker = currentLangData.operationsList.currency;
	$.psTotalExchLabel1 = currentLangData.operationsList.psTotalExchLabel1;
	$.psTotalExchLabel1 = currentLangData.operationsList.currency;
	$.psRaitLabel.text = currentLangData.operationsList.rait;
	$.psFromAccLabel.text = currentLangData.operationsList.fromaccount;
	$.accountPicker.hintText = currentLangData.operationsList.youracc;
	$.userPickerLabel.text = currentLangData.operationsList.userPickerLabel;
	$.userPicker.hintText = currentLangData.operationsList.userPicker;
	$.comment.text = currentLangData.operationsList.comment;
}

