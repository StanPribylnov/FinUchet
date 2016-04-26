var AppData = require('data');
//var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'mydata.txt');
//var content = file.read();
//content = JSON.parse(content);


var logpass = AppData.getUserEnterence();
AppData.login(logpass.login, logpass.password,
    function(response) { 
    	
        if (response.result === 'ok') {
        	 
            console.log(response);
            var indexController = Alloy.createController('index');
                            
        } else {
            $.userPassword.value = '';
		    $.activityIndicator.hide();
		    $.loginButton.show();  
        }
         
  	}); 
  	
	var fullData = AppData.fullUserData();  