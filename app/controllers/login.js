var AppData = require('data');
var LangData = require('lang');
var currentLangData = false;

if(AppData.getLang() == 'RU'){// Inversion
	currentLangData = LangData.jeData();
}else{
	currentLangData = LangData.ruData();
}     
 
setLangData();
  

function signIn(e) { 
	//Ti.API.info(AppData.isLoggedIn()); 
	//Ti.API.info("Login user: " + $.userLogin.value);
	//Ti.API.info("Password user: " + $.userPassword.value);
		  
	 
	if(! $.userLogin.value || ! $.userPassword.value){
		
        var dialog = Ti.UI.createAlertDialog({
            message: L('formMissingFields', 'Please complete all form fields'),
            ok: 'OK',
            title: L('actionRequired', 'Action Required')
        }).show(); 
         
	}else{
		   
	    $.activityIndicator.show(); 
	    $.loginButton.hide();
	    AppData.setUserEnterence($.userLogin.value, $.userPassword.value);
        AppData.login($.userLogin.value, $.userPassword.value,
            function(response) {
            	 
                if (response.result === 'ok') {
                    var indexController = Alloy.createController('index');
         			$.login.close();    
                                    
                } else {
                    $.userPassword.value = '';
				    $.activityIndicator.hide();
				    $.loginButton.show();
                }
                 
            }); 
	    
	    
	}
	
} 


function setLangData(){
} 
