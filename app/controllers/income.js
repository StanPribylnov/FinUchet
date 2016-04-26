var incomeView = this.getView();
incomeView.open();
var AppData = require('data');
var LangData = require('lang');
var userData = AppData.fullUserData();
var cur = 0;
var acc = 0;


if(AppData.getLang() == 'JE'){
	currentLangData = LangData.jeData();
}else{
	currentLangData = LangData.ruData();
}    
console.log('inc lang'+userData.user.lang);

function toOperations() {
	Alloy.createController('refresh');
	incomeView.close();
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
incomeView.add(fader);
//					DATE PICKER

	var dateView = Ti.UI.createView({
		top: 250,
	    width: 300,
	    height: 120,
	    backgroundColor: 'white',
	    borderWidth: '1dp',
	    borderColor: 'black', 
	    zIndex: 9999,
	    visible: false 
	 });  
	 var picker = Ti.UI.createPicker({
	 	type:Ti.UI.PICKER_TYPE_DATE,
  		minDate:new Date(1990,0,1),
  		maxDate:new Date(2220,11,31),
  		value:new Date(),
	});	
	dateView.add(picker);
	var datePickerButton = Ti.UI.createButton({
    	title: 'OK',
    	bottom: 5
    });
    $.psPickDate.value = new Date().toLocaleDateString();
    datePickerButton.addEventListener('click', function(){ 
    	$.psPickDate.value = picker.getValue().toLocaleDateString();
        dateView.hide();
        fader.hide();
    });
    dateView.add(datePickerButton); 
	incomeView.add(dateView);
	
	 
    
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
    	title: 'OK',
    	bottom: 0
    });
    curPickerButton.addEventListener('click', function(){
	    cur = curPicker.getSelectedRow(0).psValue; 
	    $.currencyPicker.value = curPicker.getSelectedRow(0).title;
        curView.hide();
        fader.hide();
    	$.psRaitIndicatorLabel.text = $.currencyPicker.value+ '/'+ 'USD';
    });
    curView.add(curPickerButton); 
	incomeView.add(curView);

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
    	title: 'OK',
    	bottom: 0
    });
    accPickerButton.addEventListener('click', function(){
	    acc = accPicker.getSelectedRow(0).psValue; 
	    $.accountPicker.value = accPicker.getSelectedRow(0).title;
        accView.hide();
        fader.hide();
    });
    accView.add(accPickerButton); 
	incomeView.add(accView);

$.accountPicker.addEventListener('click',function(e){
	
	accView.show();
        fader.show();
   
});


	 	
//					Category PICKER

var categories = [];
categories[0]=Ti.UI.createPickerRow({title:'Category 1'});
categories[1]=Ti.UI.createPickerRow({title:'Category 2'});

	var catView = Ti.UI.createView({
		top: 250,
	    width: 300,
	    height: 100,
	    backgroundColor: 'white',
	    borderWidth: '1dp',
	    borderColor: 'black', 
	    zIndex: 9999,
	    visible: false
	 });  
	 var catPicker = Ti.UI.createPicker({
	});	
	catPicker.add(categories);
	catView.add(catPicker);
	var catPickerButton = Ti.UI.createButton({
    	title: 'OK',
    	bottom: 0
    });
    catPickerButton.addEventListener('click', function(){
    	$.categoryPicker.value = "Category 1";
        catView.hide();
        fader.hide();
    });
    catView.add(catPickerButton); 
	incomeView.add(catView);

 
    
$.categoryPicker.addEventListener('click',function(e){
	
	catView.show();
        fader.show();
   
});	

 	
//					Sub category PICKER

var subCategories = [];
subCategories[0]=Ti.UI.createPickerRow({title:'Sub category 1'});
subCategories[1]=Ti.UI.createPickerRow({title:'Sub category 2'});

	var subCatView = Ti.UI.createView({
		top: 250,
	    width: 300,
	    height: 100, 
	    backgroundColor: 'white',
	    borderWidth: '1dp',
	    borderColor: 'black', 
	    zIndex: 9999,
	    visible: false
	 });  
	 var subCatPicker = Ti.UI.createPicker({
	});	
	subCatPicker.add(subCategories);
	subCatView.add(subCatPicker);
	var subCatPickerButton = Ti.UI.createButton({
    	title: 'OK',
    	bottom: 0
    });
    subCatPickerButton.addEventListener('click', function(){
    	$.subCategoryPicker.value = "Sub category 1";
        subCatView.hide();
        fader.hide();
    });
    subCatView.add(subCatPickerButton); 
	incomeView.add(subCatView);

 
    
$.subCategoryPicker.addEventListener('click',function(e){
	subCatView.show();
        fader.show();
   
});

/*
incomeView.addEventListener('click', function(){
	$.amount.blur(); 
	$.psRait.blur(); 
});	 
*/
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
 


function submitData(){ 
	if(($.amount.value && cur && $.psRait.value && acc && $.comment.value) != ''){
		if(parseFloat($.amount.value) == 0 || parseFloat($.psRait.value) == 0){
			alert('Поля сумма и курс не должны быть нулевыми!');
		}else{
			AppData.acceptIncome({   
				hash: userData.user.hash, 
				subcategory: 1,  
				comment: $.comment.value,
				rate: parseFloat($.psRait.value).toFixed(2),
				toacc: acc,
				currency: cur,
				amount: parseFloat($.amount.value).toFixed(2),
				operationType: 1,
				date: Date.parse($.psPickDate.value)
			});    
			incomeView.close();
		    Alloy.createController('acceptIncome');
		}
	}else{ 
		alert('Вы должны заполнить все поля');
	}
	/*
	console.log('hash '+userData.user.hash);
	console.log('subcategory '+1);
	console.log('comment '+$.comment.value);
	console.log('rate '+$.psRait.value);
	console.log('toacc '+acc);
	console.log('currency '+cur);
	console.log('amount '+ parseFloat($.amount.value)); 
	console.log('operationType '+1);
	console.log('date '+Date.parse($.psPickDate.value));
	*/ 
}

setLangData();

function setLangData(){
	$.gback.title = currentLangData.operationsList.goback;
	$.psDateLabel.text = currentLangData.operationsList.date;
	$.psAmountLabel.text = currentLangData.operationsList.amount;
	$.currencyPicker.hintText = currentLangData.operationsList.currency; 
	$.psRaitLabel.text = currentLangData.operationsList.rait;
	$.psToAccLabel.text = currentLangData.operationsList.toaccount;
	$.accountPicker.hintText = currentLangData.operationsList.youracc;
	$.psToForLabel.text = currentLangData.operationsList.forwhat;
	$.categoryPicker.hintText = currentLangData.operationsList.category;
	$.subCategoryPicker.hintText = currentLangData.operationsList.subcategory;
	$.comment.text = currentLangData.operationsList.comment;
}
