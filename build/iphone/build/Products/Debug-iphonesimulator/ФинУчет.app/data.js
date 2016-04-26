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

Ti.App.Properties.setString("hideNotice", 0);

exports.getUserEnterence = function() {
    var userLogPass = {
        login: Ti.App.Properties.getString("loginData"),
        password: Ti.App.Properties.getString("passwordData")
    };
    return userLogPass;
};

Ti.App.Properties.getString("loggedIn") && "0" !== Ti.App.Properties.getString("loggedIn") && (userData = Ti.App.Properties.getObject("userData"));

exports.checkNotice = function() {
    return Ti.App.Properties.getString("hideNotice");
};

exports.setHideNotice = function() {
    console.log(hideNotice);
    Ti.App.Properties.setString("hideNotice", 1);
    hideNotice = 1;
    return hideNotice;
};

exports.setUserEnterence = function(login, password) {
    Ti.App.Properties.setString("loginData", login);
    Ti.App.Properties.setString("passwordData", password);
};

exports.isLoggedIn = function() {
    return loggedIn;
};

exports.fullUserData = function() {
    return userData;
};

exports.curLangSet = function(curLang) {
    curLang = "RU" == curLang ? "RU" : "JE";
    return curLang;
};

exports.getLang = function() {
    var psLang = "RU";
    if (0 != userData && 4 == userData.user.lang) var psLang = "JE";
    return psLang;
};

var loginReq = Titanium.Network.createHTTPClient();

var req = Titanium.Network.createHTTPClient();

exports.acceptIncome = function(params) {
    "object" == typeof params && (acceptIncData = params);
    return acceptIncData;
};

exports.createIncome = function(params) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=action/income&format=json");
    req.send(params);
    req.onload = function() {
        var json = this.responseText;
        console.log(json);
        console.log(params);
    };
};

exports.updateInfo = function(login, password, callback) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=api/&format=json");
    var params = {
        login: "censore",
        password: "12345"
    };
    req.send(params);
    req.onload = function() {
        var json = this.responseText;
        var response = JSON.parse(json);
        updateUserData = false;
        updateUserData = response;
        callback({
            result: updateUserData
        });
        return callback;
    };
};

exports.acceptExpense = function(params) {
    "object" == typeof params && (acceptExpData = params);
    return acceptExpData;
};

exports.createExpense = function(params) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=action/expense&format=json");
    req.send(params);
    req.onload = function() {
        var json = this.responseText;
        console.log(json);
    };
};

exports.acceptExchange = function(params) {
    "object" == typeof params && (acceptExchData = params);
    return acceptExchData;
};

exports.createExchange = function(params) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=action/exchange&format=json");
    req.send(params);
    req.onload = function() {
        var json = this.responseText;
        console.log(json);
    };
};

exports.acceptTransaction = function(params) {
    "object" == typeof params && (acceptTransData = params);
    return acceptTransData;
};

exports.createTransaction = function(params) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=action/createoperation&format=json");
    req.send(params);
    req.onload = function() {
        var json = this.responseText;
        console.log(json);
    };
};

exports.pickLang = function(params) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=action/language&format=json");
    req.send(params);
    req.onload = function() {
        var json = this.responseText;
        var response = JSON.parse(json);
        if (1 == response.result) if ("RU" == response.new_lang) {
            alert("New language switched to Russian");
            Alloy.createController("refresh");
        } else {
            alert("New language switched to Hebrew");
            Alloy.createController("refresh");
        } else alert("Server error");
    };
};

exports.acceptOperation = function(params) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=action/accept&format=json");
    req.send(params);
    console.log(params);
    req.onload = function() {
        var json = this.responseText;
        var response = JSON.parse(json);
        console.log("ss" + response);
    };
};

exports.declineOperation = function(params) {
    req.open("POST", "http://localserver.curiousit.eu/web/index.php?r=action/decline&format=json");
    req.send(params);
    console.log(params);
    req.onload = function() {
        var json = this.responseText;
        var response = JSON.parse(json);
        console.log("ss" + response);
    };
};

exports.login = function(username, password, callback) {
    loginReq.open("POST", "http://localserver.curiousit.eu/web/index.php?r=api&format=json");
    var params = {
        login: username,
        password: password
    };
    loginReq.send(params);
    loginReq.onload = function() {
        try {
            var json = this.responseText;
            var response = JSON.parse(json);
            if (response.error) {
                alert(response.error);
                setTimeout(function() {
                    callback({
                        result: "error",
                        msg: 'Username "error" triggers login error'
                    });
                }, 1500);
            } else {
                loggedIn = 1;
                Ti.App.Properties.setString("loggedIn", 1);
                userData = response;
                Ti.App.Properties.setObject("userData", response);
                setTimeout(function() {
                    callback({
                        result: "ok"
                    });
                }, 1500);
            }
            return userData;
        } catch (e) {
            alert("Not correct user or password");
            setTimeout(function() {
                callback({
                    result: "error",
                    msg: 'Username "error" triggers login error'
                });
            }, 1500);
        }
    };
};