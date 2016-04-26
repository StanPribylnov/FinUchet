function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function signIn() {
        if ($.userLogin.value && $.userPassword.value) {
            $.activityIndicator.show();
            $.loginButton.hide();
            AppData.setUserEnterence($.userLogin.value, $.userPassword.value);
            AppData.login($.userLogin.value, $.userPassword.value, function(response) {
                if ("ok" === response.result) {
                    {
                        Alloy.createController("index");
                    }
                    $.login.close();
                } else {
                    $.userPassword.value = "";
                    $.activityIndicator.hide();
                    $.loginButton.show();
                }
            });
        } else {
            Ti.UI.createAlertDialog({
                message: L("formMissingFields", "Please complete all form fields"),
                ok: "OK",
                title: L("actionRequired", "Action Required")
            }).show();
        }
    }
    function setLangData() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.login = Ti.UI.createWindow({
        layout: "vertical",
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.userLogin = Ti.UI.createTextField({
        width: "75%",
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: "40%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "silver",
        value: "user0",
        id: "userLogin",
        hintText: "Login"
    });
    $.__views.login.add($.__views.userLogin);
    $.__views.userPassword = Ti.UI.createTextField({
        width: "75%",
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "silver",
        value: "12345",
        id: "userPassword",
        hintText: "Password",
        passwordMask: "true"
    });
    $.__views.login.add($.__views.userPassword);
    $.__views.loginButton = Ti.UI.createButton({
        width: "75%",
        height: 40,
        top: 10,
        backgroundColor: "#75C799",
        color: "white",
        title: "Login",
        id: "loginButton"
    });
    $.__views.login.add($.__views.loginButton);
    signIn ? $.addListener($.__views.loginButton, "click", signIn) : __defers["$.__views.loginButton!click!signIn"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        id: "activityIndicator"
    });
    $.__views.login.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var LangData = require("lang");
    var currentLangData = false;
    currentLangData = "RU" == AppData.getLang() ? LangData.jeData() : LangData.ruData();
    setLangData();
    __defers["$.__views.loginButton!click!signIn"] && $.addListener($.__views.loginButton, "click", signIn);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;