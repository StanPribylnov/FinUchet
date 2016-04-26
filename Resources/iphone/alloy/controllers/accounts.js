function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getAccBalance(accId) {
        for (var i = 0; i <= parseInt(fullData.balances.length) - 1; i++) if (fullData.balances[i].account_id == accId) {
            var curCode = getBalCur(fullData.balances[i].currency_id);
            "UAH" == curCode ? totalUAH += parseInt(fullData.balances[i].value) : "USD" == curCode ? totalUSD += parseInt(fullData.balances[i].value) : "EUR" == curCode ? totalEUR += parseInt(fullData.balances[i].value) : "ILS" == curCode && (totalILS += parseInt(fullData.balances[i].value));
            $.accountsWin.add(Ti.UI.createLabel({
                text: fullData.balances[i].value + " " + curCode,
                top: 5,
                left: 25
            }));
        }
    }
    function getBalCur(curId) {
        var curCode = false;
        for (var i = 0; i <= parseInt(fullData.allow_cur.length) - 1; i++) fullData.allow_cur[i].id == curId && (curCode = fullData.allow_cur[i].code);
        return curCode;
    }
    function setLangData() {
        $.accountsWin.title = currentLangData.accountsTab.accounts;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "accounts";
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
    $.__views.accountsWin = Ti.UI.createWindow({
        id: "accountsWin",
        layout: "vertical",
        title: "Accounts"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.accountsWin,
        id: "tab3",
        title: "",
        icon: "images/dark_2x/dark_coins@2x.png"
    });
    $.__views.tab3 && $.addTopLevelView($.__views.tab3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var LangData = require("lang");
    var currentLangData = false;
    var totalUAH = 0, totalUSD = 0, totalEUR = 0, totalILS = 0;
    currentLangData = "JE" == AppData.getLang() ? LangData.jeData() : LangData.ruData();
    setLangData();
    if (AppData.isLoggedIn()) {
        var fullData = AppData.fullUserData();
        for (var i = 0; i <= parseInt(fullData.my_accounts.length) - 1; i++) {
            $.accountsWin.add(Ti.UI.createLabel({
                text: fullData.acc_type[fullData.my_accounts[i].type_id],
                top: 30,
                font: {
                    fontSize: 24
                },
                color: "#5DAD42"
            }));
            getAccBalance(fullData.my_accounts[i].id);
        }
    }
    var totalView = Ti.UI.createView({
        top: 30,
        width: "100%",
        height: 200,
        backgroundColor: "#75C799",
        layout: "vertical"
    });
    $.accountsWin.add(totalView);
    totalView.add(Ti.UI.createLabel({
        text: "Total: ",
        top: 20,
        font: {
            fontSize: 24
        }
    }));
    totalView.add(Ti.UI.createLabel({
        text: totalUAH + " UAH",
        top: 5,
        left: 25
    }));
    totalView.add(Ti.UI.createLabel({
        text: totalUSD + " USD",
        top: 5,
        left: 25
    }));
    totalView.add(Ti.UI.createLabel({
        text: totalEUR + " EUR",
        top: 5,
        left: 25
    }));
    totalView.add(Ti.UI.createLabel({
        text: totalILS + " ILS",
        top: 5,
        left: 25
    }));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;