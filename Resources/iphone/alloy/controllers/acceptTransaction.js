function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cancelTransaction() {
        acceptTransactionView.close();
        Alloy.createController("index").getView().open();
    }
    function acceptTransaction() {
        AppData.createTransaction(AppData.acceptTransaction());
        Alloy.createController("refresh");
        acceptTransactionView.close();
    }
    function getCurrency(curId) {
        for (var i = 0; i <= parseInt(fullData.allow_cur.length) - 1; i++) if (fullData.allow_cur[i].id == curId) return fullData.allow_cur[i].code;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "acceptTransaction";
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
    $.__views.acceptTransaction = Ti.UI.createWindow({
        layout: "vertical",
        id: "acceptTransaction"
    });
    $.__views.acceptTransaction && $.addTopLevelView($.__views.acceptTransaction);
    $.__views.h1 = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        font: {
            fontSize: 24
        },
        text: "Please accept Your income!",
        id: "h1"
    });
    $.__views.acceptTransaction.add($.__views.h1);
    $.__views.transDate = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "transDate"
    });
    $.__views.acceptTransaction.add($.__views.transDate);
    $.__views.transAmount = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "transAmount"
    });
    $.__views.acceptTransaction.add($.__views.transAmount);
    $.__views.transComment = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "transComment"
    });
    $.__views.acceptTransaction.add($.__views.transComment);
    $.__views.transDecline = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "silver",
        color: "white",
        title: "Cancel",
        id: "transDecline"
    });
    $.__views.acceptTransaction.add($.__views.transDecline);
    cancelTransaction ? $.addListener($.__views.transDecline, "click", cancelTransaction) : __defers["$.__views.transDecline!click!cancelTransaction"] = true;
    $.__views.transAccept = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "#75C799",
        color: "white",
        title: "Accept",
        id: "transAccept"
    });
    $.__views.acceptTransaction.add($.__views.transAccept);
    acceptTransaction ? $.addListener($.__views.transAccept, "click", acceptTransaction) : __defers["$.__views.transAccept!click!acceptTransaction"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var acceptTransactionView = this.getView();
    var fullData = AppData.fullUserData();
    acceptTransactionView.open();
    var dateObj = new Date(AppData.acceptTransaction().date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();
    $.transDate.text = "date: " + day + "/" + month + "/" + year;
    $.transAmount.text = "Amount: " + AppData.acceptTransaction().amount + " " + getCurrency(AppData.acceptTransaction().currency);
    $.transComment.text = "Comment: " + AppData.acceptTransaction().comment;
    __defers["$.__views.transDecline!click!cancelTransaction"] && $.addListener($.__views.transDecline, "click", cancelTransaction);
    __defers["$.__views.transAccept!click!acceptTransaction"] && $.addListener($.__views.transAccept, "click", acceptTransaction);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;