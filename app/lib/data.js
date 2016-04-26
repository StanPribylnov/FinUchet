var loggedIn = false;
var hideNotice = false;
var userData = false;
var updateUserData = false;
var acceptIncData = false;
var acceptExpData = false;
var acceptExchData = false;
var acceptTransData = false;
var loginData = false;
var passwordData = false;
var curLang = false;
Ti.App.Properties.setString('hideNotice', 0);
//Ti.App.Properties.setObject('userData', 0);    
//Ti.API.info('Loged in start: ' + Ti.App.Properties.getString('loggedIn'));
//Ti.API.info('User data in start: ' + Ti.App.Properties.getString('userData'));
exports.getUserEnterence = function(){
	var userLogPass ={
		login: Ti.App.Properties.getString('loginData'),
		password: Ti.App.Properties.getString('passwordData') 
	};
	return userLogPass;
};

if (Ti.App.Properties.getString('loggedIn')) {
    if(Ti.App.Properties.getString('loggedIn') !== '0'){
    	userData = Ti.App.Properties.getObject('userData'); 
    }  
}     
exports.checkNotice = function(){
	//console.log('notice: '+ Ti.App.Properties.getString('hideNotice'));
	return Ti.App.Properties.getString('hideNotice');
};
exports.setHideNotice = function () {
	console.log(hideNotice);
	Ti.App.Properties.setString('hideNotice', 1);
	hideNotice = 1;
	
	return hideNotice;
}; 
exports.setUserEnterence = function (login, password) {
	Ti.App.Properties.setString('loginData', login);
	Ti.App.Properties.setString('passwordData', password);
}; 
exports.isLoggedIn = function () {
    return loggedIn; 
}; 
exports.fullUserData = function () { 
    return userData;
};
exports.curLangSet = function (curLang) { 
	if(curLang == 'RU'){
		curLang = 'RU';
	}else{
		curLang = 'JE';
	}
    return curLang;
};

exports.getLang = function(){
	var psLang = 'RU';
	if(userData != 0){
		if(userData.user.lang == 4){
			var psLang = 'JE';
		} 
	}
	return psLang;
};

var loginReq = Titanium.Network.createHTTPClient();
var req = Titanium.Network.createHTTPClient();

exports.acceptIncome = function(params){
	if(typeof(params) == 'object'){
		acceptIncData = params;
	}
	return acceptIncData;
}; 

exports.createIncome = function(params){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=action/income&format=json");   
    req.send(params);       
     
    req.onload = function(){ 
	    var json = this.responseText;
	    console.log(json);
	    console.log(params);
	};
    
};

exports.updateInfo = function(login, password, callback){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=api/&format=json");   
    var params = {
    	login: 'censore',
    	password: '12345'
    };
    req.send(params);       
     
    req.onload = function(){ 
	    var json = this.responseText;
	    var response = JSON.parse(json);
	    updateUserData = false;
	    updateUserData =  response;
	    callback({ result: updateUserData });
	    return callback;
	};
}; 

 
exports.acceptExpense = function(params){
	if(typeof(params) == 'object'){
		acceptExpData = params;
	}
	return acceptExpData;
}; 

  
exports.createExpense = function(params){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=action/expense&format=json");   
    req.send(params);       
     
    req.onload = function(){ 
	    var json = this.responseText;
	    console.log(json);
	    
	};
    
};

exports.acceptExchange = function(params){
	if(typeof(params) == 'object'){
		acceptExchData = params;
	}
	return acceptExchData;
}; 

  
exports.createExchange = function(params){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=action/exchange&format=json");   
    req.send(params);      
     
    req.onload = function(){ 
	    var json = this.responseText;
	    console.log(json);
	    
	};
    
};

exports.acceptTransaction = function(params){
	if(typeof(params) == 'object'){
		acceptTransData = params;
	}
	return acceptTransData;
}; 

   
exports.createTransaction = function(params){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=action/createoperation&format=json");   
    req.send(params);           
     
    req.onload = function(){ 
	    var json = this.responseText;
	    console.log(json);
	    
	};
};
 

exports.pickLang = function(params){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=action/language&format=json");   
    req.send(params);     
    
    req.onload = function(){ 
	    var json = this.responseText;
	    var response = JSON.parse(json); 
	    
	    if(response.result == 1){
	    	if(response.new_lang == 'RU'){
	    		alert('New language switched to Russian');
    			Alloy.createController('refresh');
	    	}else{ 
	    		alert('New language switched to Hebrew');
    			Alloy.createController('refresh');
	    	}
	    }else{
	        alert('Server error');  
	    }
	    
	}; 
	 
    
}; 

exports.acceptOperation = function(params){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=action/accept&format=json");   
    req.send(params);   
    console.log(params);
    req.onload = function(){ 
	    var json = this.responseText;
	    var response = JSON.parse(json); 
	    console.log('ss'+response);
	    
	};  
};


exports.declineOperation = function(params){
    req.open("POST","http://localserver.curiousit.eu/web/index.php?r=action/decline&format=json");   
    req.send(params);   
    console.log(params);
    req.onload = function(){ 
	    var json = this.responseText;
	    var response = JSON.parse(json); 
	    console.log('ss'+response);
	    
	};  
};
   
exports.login = function(username, password, callback) {
	  
    loginReq.open("POST","http://localserver.curiousit.eu/web/index.php?r=api&format=json"); 
     
    var params = {  
        login: username,
        password: password     
    };    
    loginReq.send(params);    
     
    
    loginReq.onload = function(){ 
    	try {


	    var json = this.responseText; 
	    var response = JSON.parse(json);
	    if(!response.error){    
	        loggedIn = 1;
	        Ti.App.Properties.setString('loggedIn', 1);
	        userData = response;
	        Ti.App.Properties.setObject('userData', response);
	        setTimeout(function() { 
	            callback({ result: 'ok' }); 
	        }, 1500);      	   
	    }else{ 
	        alert(response.error);  
        	setTimeout(function() {
            	callback({ result: 'error', msg: 'Username "error" triggers login error' });
        	}, 1500);    
	    }   
	    return userData; 


		} catch (e) {
		  alert( "Not correct user or password" );
        	setTimeout(function() {
            	callback({ result: 'error', msg: 'Username "error" triggers login error' });
        	}, 1500); 
		}

	};
	
};
