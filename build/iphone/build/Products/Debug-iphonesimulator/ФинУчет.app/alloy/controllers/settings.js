function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setLangData() {
        $.tab4.title = currentLangData.settingsTab.settings;
        $.win.title = currentLangData.settingsTab.settings;
        $.pickLang.title = currentLangData.settingsTab.chooseLang;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
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
    $.__views.win = Ti.UI.createWindow({
        id: "win",
        title: "",
        layout: "vertical",
        fullscreen: "false",
        backgroundColor: "white"
    });
    $.__views.pickLang = Ti.UI.createButton({
        width: "75%",
        height: 40,
        top: 240,
        backgroundColor: "#75C799",
        color: "white",
        title: "Chose language",
        id: "pickLang"
    });
    $.__views.win.add($.__views.pickLang);
    var __alloyId5 = [];
    __alloyId5.push("Russian");
    __alloyId5.push("Hebrew");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId5,
        id: "dialog",
        title: "Chose language"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.win,
        id: "tab4",
        title: "Settings",
        icon: "images/dark_2x/dark_gears@2x.png"
    });
    $.__views.tab4 && $.addTopLevelView($.__views.tab4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    AppData.fullUserData();
    var LangData = require("lang");
    var currentLangData = false;
    currentLangData = "JE" == AppData.getLang() ? LangData.jeData() : LangData.ruData();
    setLangData();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;