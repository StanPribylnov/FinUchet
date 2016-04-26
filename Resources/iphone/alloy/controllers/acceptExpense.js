function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cancelIncome() {
        acceptExpenseView.close();
        Alloy.createController("index").getView().open();
    }
    function acceptlIncome() {
        AppData.createExpense(AppData.acceptExpense());
        Alloy.createController("refresh");
        acceptExpenseView.close();
    }
    function getCurrency(curId) {
        for (var i = 0; i <= parseInt(fullData.allow_cur.length) - 1; i++) if (fullData.allow_cur[i].id == curId) return fullData.allow_cur[i].code;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "acceptExpense";
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
    $.__views.acceptExpense = Ti.UI.createWindow({
        width: 300,
        top: 50,
        layout: "vertical",
        id: "acceptExpense"
    });
    $.__views.acceptExpense && $.addTopLevelView($.__views.acceptExpense);
    $.__views.h1 = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        font: {
            fontSize: 22
        },
        text: "Please accept Your expense!",
        id: "h1"
    });
    $.__views.acceptExpense.add($.__views.h1);
    $.__views.expDate = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "expDate"
    });
    $.__views.acceptExpense.add($.__views.expDate);
    $.__views.expAmount = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "expAmount"
    });
    $.__views.acceptExpense.add($.__views.expAmount);
    $.__views.expComment = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "expComment"
    });
    $.__views.acceptExpense.add($.__views.expComment);
    $.__views.expDecline = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "silver",
        color: "white",
        title: "Cancel",
        id: "expDecline"
    });
    $.__views.acceptExpense.add($.__views.expDecline);
    cancelIncome ? $.addListener($.__views.expDecline, "click", cancelIncome) : __defers["$.__views.expDecline!click!cancelIncome"] = true;
    $.__views.expAccept = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "#75C799",
        color: "white",
        title: "Accept",
        id: "expAccept"
    });
    $.__views.acceptExpense.add($.__views.expAccept);
    acceptlIncome ? $.addListener($.__views.expAccept, "click", acceptlIncome) : __defers["$.__views.expAccept!click!acceptlIncome"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var acceptExpenseView = this.getView();
    var fullData = AppData.fullUserData();
    acceptExpenseView.open();
    var dateObj = new Date(AppData.acceptExpense().date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();
    $.expDate.text = "date: " + day + "/" + month + "/" + year;
    $.expAmount.text = "Amount: " + AppData.acceptExpense().amount + " " + getCurrency(AppData.acceptExpense().currency);
    $.expComment.text = "Comment: " + AppData.acceptExpense().comment;
    __defers["$.__views.expDecline!click!cancelIncome"] && $.addListener($.__views.expDecline, "click", cancelIncome);
    __defers["$.__views.expAccept!click!acceptlIncome"] && $.addListener($.__views.expAccept, "click", acceptlIncome);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;