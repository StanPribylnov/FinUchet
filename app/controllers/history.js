var AppData = require('data');
var LangData = require('lang');
var currentLangData = false;
var incomingTrasfers = 0;
var psRowIndex = 0;


var faderW = Ti.UI.createView({
	top: 0,
    width: "100%",
    height: '100%',
    backgroundColor: 'white',
    zIndex: 9999,
    visible: false,
    zIndex: 1
});  
$.historyWin.add(faderW); 

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'silver',
  font: {fontFamily:'Helvetica Neue', fontSize:22, fontWeight:'bold'},
  message: 'Loading... please wait second',
  style: Ti.UI.ActivityIndicatorStyle.DARK,
  top:'300',
  height:Ti.UI.SIZE,
  width:Ti.UI.SIZE
});
activityIndicator.show();
// The activity indicator must be added to a window or view for it to appear
faderW.add(activityIndicator);





if(AppData.getLang() == 'JE'){
	currentLangData = LangData.jeData();
}else{
	currentLangData = LangData.ruData();
}    
setLangData(); 

if (AppData.isLoggedIn()) { 
	var fullData = AppData.fullUserData(); 
	var trFromMe = fullData.transactions.from_me;
	var trToMe = fullData.transactions.to_me;//fullData.transactions.to_me;
	var myId = fullData.user.id;
	 
	
	getIncomePending(myId);
	  
	 
	function getIncomePending(id){
		var pendCount = 0;  
		
// create table view data object 
var data = [];  
 
var tableSections = 0;

// f is a function that has the obj as 'this' and the property name as first parameter
function reverseForIn(obj, f) {
  var arr = [];
  for (var key in obj) {
    // add hasOwnPropertyCheck if needed
    arr.push(key);
  }
  for (var i=arr.length-1; i>=0; i--) {
    f.call(obj, arr[i]);
  }
}

    data[tableSections] = Ti.UI.createTableViewSection({headerTitle:''/*incomingTrasfers*/});
//usage




function json_merge_recursive(json1, json2){
    var out = {};
    for(var k1 in json1){
        if (json1.hasOwnProperty(k1)) out[k1] = json1[k1];
    }
    for(var k2 in json2){
        if (json2.hasOwnProperty(k2)) {
            if(!out.hasOwnProperty(k2)) out[k2] = json2[k2];
            else if(
                (typeof out[k2] === 'object') && (out[k2].constructor === Object) && 
                (typeof json2[k2] === 'object') && (json2[k2].constructor === Object)
            ) out[k2] = json_merge_recursive(out[k2], json2[k2]);
        }
    }
    return out;
}
var newHistory = json_merge_recursive(trToMe,trFromMe); 



/*			Start of view generate			*/
function generateSortHistory(sortCur,sortType,sortPeriod){
//console.log(sortCur,sortType,sortPeriod); 


	console.log('start');
	faderW.show(); 
	
reverseForIn(newHistory, function(key){ 
	
	

	var that = this;
	
	
	
	var opTypeLabel = Ti.UI.createLabel({
	    text:
	    getOpType(this[key][0]['operation_type']),
	    operation_id: this[key][0]['operation'],
	    height:'auto',
	    width: 200,
	    top: 5,
	    left:10, 
	    font:{
	    	fontSize: 14
	    }
	});
	var amountLabel = Ti.UI.createLabel({
	   	text:
		this[key][0]['amount'] + "	"+
		getCurrency(this[key][0]['currency_id']) + " ",
	    operation_id: this[key][0]['operation'],
	    height:'auto',
	    width: 200,
	    top: 5,
	    left:10,
	    font:{
	    	fontSize: 14
	    }
	});
	if(this[key][0]['operation_type'] == 1){
	    var actionLabel = Ti.UI.createLabel({
	        text: this[key][0]['comment'],
	    	operation_id: this[key][0]['operation'],
	        height:'auto',
	        width: 200,
	        top: 5,
	        left:10,
	        font:{
	        	fontSize: 14
	        }
	    });
	}else if(this[key][0]['operation_type'] == 2){
	    var actionLabel = Ti.UI.createLabel({
	        text: this[key][0]['comment'],
	    	operation_id: this[key][0]['operation'],
	        height:'auto',
	        width: 200,
	        top: 5,
	        left:10,
	        font:{
	        	fontSize: 14
	        }
	    });
	}else if(this[key][0]['operation_type'] == 3){ 
	    var actionLabel = Ti.UI.createLabel({
	        text: 
			currentLangData.operationsList.rait + this[key][0]['rate'],
	    	operation_id: this[key][0]['operation'],
	        height:'auto', 
	        width: 200,
	        top: 5,
	        left:10,
	        font:{
	        	fontSize: 14 
	        }
	    });
	}else if(this[key][0]['operation_type'] == 4){
	    var actionLabel = Ti.UI.createLabel({
	        text:
			currentLangData.operationsList.userPickerLabel +' '+ getUser(this[key][0]['to_account']),
	    	operation_id: this[key][0]['operation'],
	        height:'auto',
	        width: 200,
	        top: 5,
	        left:10,
	        font:{
	        	fontSize: 14
	        }
	    });
	}
	var dateLabel = Ti.UI.createLabel({
	    text:
	    this[key][0]['date'].substring(10, 0),
	    operation_id: this[key][0]['operation'],
	    height:'auto',
	    width: 95,
	    top: -45,
	    right:60,
	    font:{
	    	fontSize: 14
	    }
	});
	
	
	if(this[key][0]['status'] == 3){
		if(fullData.user.id == this[key][0]['to_account']){
		    var rightButton = Ti.UI.createImageView({
	        	image:'/images/dark_2x/dark_check-2@2x.png',
		        section:tableSections,
	    			operation_id: this[key][0]['operation'],
		    });
		    var tmpView = Ti.UI.createView({height:80,width:50,top: -40,right:0,
	    			/*backgroundColor: '#75C799', */id: this[key][0]['operation'],
	    			operation_id: this[key][0]['operation'],
		    	}); 
		}else{
		    var rightButton = Ti.UI.createImageView({
	        	image:'/images/dark_2x/dark_x@2x.png',
		        section:tableSections,
	    			operation_id: this[key][0]['operation'],
		    });
		    var tmpView = Ti.UI.createView({height:80,width:50,top: -40,right:0,
	    			/*backgroundColor: '#F24B4B',*/ id: this[key][0]['operation'],
	    			operation_id: this[key][0]['operation'],
		    	}); 
		    	
		} 
	}else if(this[key][0]['status'] == 2){
	    var rightButton = Ti.UI.createImageView({
	        //image:'/images/dark_2x/dark_check-2@2x.png',
	        section:tableSections,
	    			operation_id: this[key][0]['operation'],
	    }); 
	    var tmpView = Ti.UI.createView({height:80,width:50,top: -40,right:0, 
	    	//backgroundColor: '#75C799',
	    			operation_id: this[key][0]['operation'],
	    }); 
	}else if(this[key][0]['status'] == 1){
	    var rightButton = Ti.UI.createImageView({
	        //image:'/images/dark_2x/dark_x@2x.png',
	        section:tableSections,
	    			operation_id: this[key][0]['operation'],
	    });
	    var tmpView = Ti.UI.createView({height:80,width:50,top: -40,right:0, 
	    	//backgroundColor: '#F24B4B',
	    			operation_id: this[key][0]['operation'],
	    	});
	}
	
	
	
	
//				Acc types
var account_types = [];
for(var i = 0; i<= (parseInt(fullData.my_accounts.length) -1 ); i++){
	var id = fullData.my_accounts[i].id;
	var accType = fullData.my_accounts[i].type_id;
	var accName = fullData.acc_type[accType];
	if(id !== undefined){
	}
	account_types[i]=Ti.UI.createPickerRow({/*title: accName,*/ psValue: id});
	 
} 


//					ACCOUNTS

var aceptAcc = false;
var aceptOperation = false;


	var accView = Ti.UI.createView({
		top: 140,
	    width: 300,
	    height: 150,
	    backgroundColor: 'white',
	    borderColor: 'black', 
	    zIndex: 9999, 
	    visible: false 
	 });  
	 var accPicker = Ti.UI.createPicker({
	});	
	accPicker.add(account_types);
	accView.add(accPicker);
    
	var accPickerButton = Ti.UI.createButton({
    	title: 'Submit',
    	bottom: 0,
    	right: 80
    });
    accPickerButton.addEventListener('click', function(){
	    aceptAcc = accPicker.getSelectedRow(0).psValue; 
	    Ti.API.info('Hash: '+fullData.user.hash); 
	    Ti.API.info('Oper: '+aceptOperation); 
	    Ti.API.info('Acc: '+aceptAcc); 
	    params = {
	    	hash: fullData.user.hash,
	    	id: aceptOperation,
	    	toacc: aceptAcc,
	    	currency: 1
	    };
	    AppData.acceptOperation(params);
	    	    
	    $.tab2.badge -= 1;
	    rightButton.image='';
	    
        accView.hide();
		fader.hide();
    });
    
    
	var accDeclineButton = Ti.UI.createButton({
    	title: 'Decline',
    	bottom: 0,
    	right: 80
    });    
    accDeclineButton.addEventListener('click', function(){
	    params = {
	    	hash: fullData.user.hash,
	    	id: aceptOperation, 
	    	toacc: 1,
	    	currency: 1 
	    };
	    //console.log(params); 
	    AppData.declineOperation(params);
	    $.tab2.badge -= 1;
	    rightButton.image='';
	    that[key][0]['status'] = 1;
	    
        accView.hide();
		fader.hide();
    });
    
	var cancelButton = Ti.UI.createButton({
    	title: 'Cancel', 
    	bottom: 0,
    	left: 80 
    });
    cancelButton.addEventListener('click', function(){
        accView.hide(); 
		fader.hide();
    }); 
    accView.add(cancelButton);  
    
    
    
	var accDeclinelabel = Ti.UI.createLabel({
    	text: 'Accept your actions',
    	top: 50
    });    
    accView.add(accDeclinelabel);  
    
	$.historyWin.add(accView);
	
	
	
	
	        
	var row = Ti.UI.createTableViewRow({psRowIndex: psRowIndex ,height:'auto',layout: 'vertical', operation_id: this[key][0]['operation']});

    row.addEventListener('click',function(e)
    {
    		 
		if((fullData.user.id == that[key][0]['to_account']) && (that[key][0]['status'] == 3)){
			fader.show();
			accView.show();
	        aceptOperation = e.source.operation_id;		
    		accView.add(accPickerButton);  
    		//rightButton.image='';
		}else if(that[key][0]['status'] == 3){
			fader.show();
			accView.show();
	        aceptOperation = e.source.operation_id;	
	        psRowIndex = e.source.psRowIndex;	
    		accView.add(accDeclineButton);   
    		//rightButton.image='';	 
    		//console.log(psRowIndex); 
		}     
    });
	row.add(opTypeLabel);
	row.add(amountLabel);
	row.add(actionLabel);
	row.add(dateLabel); 
	tmpView.add(rightButton);
	row.add(tmpView);
	var fixingH = new Date().getHours();
	var fixingM = new Date().getMinutes();
	fixingH = fixingH*60*60*1000;
	fixingM = fixingM*60*1000;
	totalFixing = fixingH + fixingM;
	
	if(sortCur == 0 && sortType == 0 && sortPeriod == 0 ){
		data[tableSections].add(row);
	}else if(sortCur != 0 && sortType != 0 && sortPeriod != 0){
		if((this[key][0]['currency_id'] == sortCur) && (this[key][0]['operation_type'] == sortType)){
		var sortDate = new Date().getTime();
		var pickSortPeriod = sortDate-sortPeriod-totalFixing;
		var historyDate = Date.parse(this[key][0]['date'].substring(10, 0));
		if(historyDate >= pickSortPeriod){
				data[tableSections].add(row);
			}
		}
	}else if(sortCur != 0 && sortType == 0 && sortPeriod == 0){
		if((this[key][0]['currency_id'] == sortCur)){
			data[tableSections].add(row);
		}
	}else if(sortCur == 0 && sortType != 0 && sortPeriod == 0){
		if((this[key][0]['operation_type'] == sortType)){
			data[tableSections].add(row);
		}
	}else if(sortCur == 0 && sortType == 0 && sortPeriod != 0){
		var sortDate = new Date().getTime();		
		var pickSortPeriod = sortDate-sortPeriod-totalFixing;
		var historyDate = Date.parse(this[key][0]['date'].substring(10, 0));
		if(historyDate >= pickSortPeriod){
			data[tableSections].add(row);
		}
	}
	else if(sortCur != 0 && sortType != 0 && sortPeriod == 0){
		if((this[key][0]['currency_id'] == sortCur) && (this[key][0]['operation_type'] == sortType)){
			data[tableSections].add(row);
		}
	}else if(sortCur == 0 && sortType != 0 && sortPeriod != 0){
		if((this[key][0]['operation_type'] == sortType)){
		var sortDate = new Date().getTime();
		var pickSortPeriod = sortDate-sortPeriod-totalFixing;
		var historyDate = Date.parse(this[key][0]['date'].substring(10, 0));
		if(historyDate >= pickSortPeriod){
				data[tableSections].add(row);
			}
		}
	}else if(sortCur != 0 && sortType == 0 && sortPeriod != 0){
		if((this[key][0]['currency_id'] == sortCur)){
		var sortDate = new Date().getTime();
		sortPeriod = sortDate-sortPeriod;
		var historyDate = Date.parse(this[key][0]['date'].substring(10, 0));
		if(historyDate >= sortPeriod){
			data[tableSections].add(row);
		}
		}
	}
	
	psRowIndex++;
	
	
	if(this[key][0]['status'] == 3){
		pendCount++;
	}
	 
	
	
 
    
	
});
	

	console.log('end');
	faderW.hide(); 
}

generateSortHistory(0,0,0);

/*			End of view generate			*/

  

// create table view
var tableview = Titanium.UI.createTableView({
    data:data,
    style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
    minRowHeight:80
});
// add table view to the window

$.historyLayout.add(tableview);	
		
		$.tab2.badge = pendCount;
		
		
		
		
		
		
var sortLabel = Ti.UI.createLabel({
	text: 'Фильтр',
	top: 0,
	right: 20
});    
		
		
	tableview.add(sortLabel);
	

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
$.historyWin.add(fader);
    
    
var sortView = Ti.UI.createView({
	top: 50,
    width: 300,
    height: 410,
    backgroundColor: 'white',
	borderColor: 'black', 
    zIndex: 9999, 
    visible: false 
 });  
$.historyWin.add(sortView);

var sortCurLabel = Ti.UI.createLabel({
	text: 'Currency',
	top: 10
});    
sortView.add(sortCurLabel);  

var sortCurPicker = Ti.UI.createPicker({
  top: 30,
  height: 100
});

var sortCur = [];
sortCur[0]=Ti.UI.createPickerRow({title:'ALL', index: 0});
sortCur[1]=Ti.UI.createPickerRow({title:'UAH', index: 1});
sortCur[2]=Ti.UI.createPickerRow({title:'USD', index: 2});
sortCur[3]=Ti.UI.createPickerRow({title:'EUR', index: 3});
sortCur[4]=Ti.UI.createPickerRow({title:'ILS', index: 4});

sortCurPicker.add(sortCur);
sortCurPicker.selectionIndicator = true;

sortView.add(sortCurPicker);





var sortTypeLabel = Ti.UI.createLabel({
	text: 'Operation type',
	top: 120
});    
sortView.add(sortTypeLabel);  

var sortTypePicker = Ti.UI.createPicker({
  top: 140,
  height: 100
});

var sortType = [];
sortType[0]=Ti.UI.createPickerRow({title:'ALL', index: 0});
sortType[1]=Ti.UI.createPickerRow({title:'Income', index: 1});
sortType[2]=Ti.UI.createPickerRow({title:'Expense', index: 2});
sortType[3]=Ti.UI.createPickerRow({title:'Echange', index: 3});
sortType[4]=Ti.UI.createPickerRow({title:'Transfer', index: 4});

sortTypePicker.add(sortType);
sortTypePicker.selectionIndicator = true;

sortView.add(sortTypePicker);



var sortPeriodLabel = Ti.UI.createLabel({
	text: 'Period',
	top: 220
});    
sortView.add(sortPeriodLabel);  

var sortPeriodPicker = Ti.UI.createPicker({
  top: 240,
  height: 100
});
 
var sortPeriod = [];
sortPeriod[0]=Ti.UI.createPickerRow({title:'ALL', index: 0});
sortPeriod[1]=Ti.UI.createPickerRow({title:'Week', index: 604800000});
sortPeriod[2]=Ti.UI.createPickerRow({title:'Month', index: 2592000000});
sortPeriod[3]=Ti.UI.createPickerRow({title:'1/2 Year', index: 15768000000});

sortPeriodPicker.add(sortPeriod);
sortPeriodPicker.selectionIndicator = true;

sortView.add(sortPeriodPicker);
    
var acceptSort = Ti.UI.createButton({
	title: 'Accept',
	bottom: 20,
});
acceptSort.addEventListener('click', function(){
    sortView.hide();
	fader.hide();
	
	
	try{
		if (tableview.data.length > 0) {
		    for (var i = tableview.data[0].rows.length-1; i >= 0; i--) {
		        tableview.deleteRow(i);
		    }
		}
	var sortCur = sortCurPicker.getSelectedRow(0).index;
	var sortType = sortTypePicker.getSelectedRow(0).index;
	var sortPeriod = sortPeriodPicker.getSelectedRow(0).index;
	//console.log('Cur: '+sortCur);
	//console.log('Type: '+sortType);
	//console.log('Period: '+sortPeriod);
	
	
	generateSortHistory(sortCur,sortType,sortPeriod);
	tableview.data = data;
	}catch (e) {
		
	}
	
	
}); 
sortView.add(acceptSort);  



sortLabel.addEventListener('click', function(){
	fader.show(); 
	sortView.show();	
}); 

		
		
		
		
		
		 
	}
	 
	function getUserAcc(id){
	
		for(var i = 0; i <= parseInt(fullData.users.length) -1; i++){	
			for(var k = 0; k <= parseInt(fullData.users[i].accounts.length) -1; k++){	
				if(fullData.users[i].accounts[k].id == id){
					return getUser(fullData.users[i].id);
				}
			}
		} 
		 
	};
	 
	function getUser(id){
		
		for(var i = 0; i <= parseInt(fullData.users.length) -1; i++){	
			if(fullData.users[i].id == id){
				return fullData.users[i].login;
			}
		}
		
	}; 
	
  	function getAccount(id){

		for(var i = 0; i <= parseInt(fullData.balances.length) -1; i++){		
			if(fullData.balances[i].id == id){
				return(getAccountType(fullData.balances[i].account_id));
			} 
		} 
		
  	}
  	function getCurrency(id){
		for(var i = 0; i <= parseInt(fullData.balances.length) -1; i++){		
			if(fullData.balances[i].id == id){
				var curId = fullData.balances[i].currency_id;
				return(fullData.allow_cur[curId-1].code);
			} 
		} 
		
  	}
  	 
  	
  	
  	function getAccountType(id){
  		return(fullData.acc_type[id]);
  	}
	
	
	
	function acceptOperation(){
		var id = 3; 
		AppData.acceptOperation(id);
	} 
	function getOpType(opID){
		var operationType = false;
		if(opID == 1){
			operationType = currentLangData.operationsTab.income;
		}else if(opID == 2){
			operationType = currentLangData.operationsTab.expense; 
		}else if(opID == 3){
			operationType = currentLangData.operationsTab.exchange;
		}else if(opID == 4){
			operationType = currentLangData.operationsTab.transfer;
		}
		return operationType;
	}
	
	
	
	
	
	
	
	
	
	
	
} 


function setLangData(){
	$.historyWin.title = currentLangData.historyTab.history;  
	incomingTrasfers = currentLangData.global.incomingTrasfers;
} 

 
