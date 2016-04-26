var AppData = require('data');
var userData = AppData.fullUserData();
var LangData = require('lang');
var currentLangData = false;


if(AppData.getLang() == 'JE'){
	currentLangData = LangData.jeData();
}else{
	currentLangData = LangData.ruData();
}    

setLangData();


 
function setLangData(){
	$.tab4.title = currentLangData.settingsTab.settings; 
	$.win.title = currentLangData.settingsTab.settings;  
	$.pickLang.title = currentLangData.settingsTab.chooseLang; 
} 
