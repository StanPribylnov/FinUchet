function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cancelExchange() {
        acceptExchangeView.close();
        Alloy.createController("index").getView().open();
    }
    function acceptExchange() {
        AppData.createExchange(AppData.acceptExchange());
        Alloy.createController("refresh");
        acceptExchangeView.close();
    }
    function getCurrency(curId) {
        for (var i = 0; i <= parseInt(fullData.allow_cur.length) - 1; i++) if (fullData.allow_cur[i].id == curId) return fullData.allow_cur[i].code;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "acceptExchange";
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
    $.__views.acceptExchange = Ti.UI.createWindow({
        width: 300,
        top: 50,
        layout: "vertical",
        id: "acceptExchange"
    });
    $.__views.acceptExchange && $.addTopLevelView($.__views.acceptExchange);
    $.__views.h1 = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        font: {
            fontSize: 24
        },
        text: "Please accept Your expense!",
        id: "h1"
    });
    $.__views.acceptExchange.add($.__views.h1);
    $.__views.exchDate = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "exchDate"
    });
    $.__views.acceptExchange.add($.__views.exchDate);
    $.__views.exchAmount = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "exchAmount"
    });
    $.__views.acceptExchange.add($.__views.exchAmount);
    $.__views.exchComment = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "exchComment"
    });
    $.__views.acceptExchange.add($.__views.exchComment);
    $.__views.exchDecline = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "silver",
        color: "white",
        title: "Cancel",
        id: "exchDecline"
    });
    $.__views.acceptExchange.add($.__views.exchDecline);
    cancelExchange ? $.addListener($.__views.exchDecline, "click", cancelExchange) : __defers["$.__views.exchDecline!click!cancelExchange"] = true;
    $.__views.exchAccept = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "#75C799",
        color: "white",
        title: "Accept",
        id: "exchAccept"
    });
    $.__views.acceptExchange.add($.__views.exchAccept);
    acceptExchange ? $.addListener($.__views.exchAccept, "click", acceptExchange) : __defers["$.__views.exchAccept!click!acceptExchange"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var acceptExchangeView = this.getView();
    var fullData = AppData.fullUserData();
    acceptExchangeView.open();
    var dateObj = new Date(AppData.acceptExchange().date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();
    $.exchDate.text = "date: " + day + "/" + month + "/" + year;
    $.exchAmount.text = "Amount: " + AppData.acceptExchange().amount + " " + getCurrency(AppData.acceptExchange().currency);
    $.exchComment.text = "Comment: " + AppData.acceptExchange().comment;
    __defers["$.__views.exchDecline!click!cancelExchange"] && $.addListener($.__views.exchDecline, "click", cancelExchange);
    __defers["$.__views.exchAccept!click!acceptExchange"] && $.addListener($.__views.exchAccept, "click", acceptExchange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;