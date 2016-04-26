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
        acceptIncomeView.close();
        Alloy.createController("index").getView().open();
    }
    function acceptlIncome() {
        AppData.createIncome(AppData.acceptIncome());
        Alloy.createController("refresh");
        acceptIncomeView.close();
    }
    function getCurrency(curId) {
        for (var i = 0; i <= parseInt(fullData.allow_cur.length) - 1; i++) if (fullData.allow_cur[i].id == curId) return fullData.allow_cur[i].code;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "acceptIncome";
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
    $.__views.acceptIncome = Ti.UI.createWindow({
        width: 300,
        top: 50,
        layout: "vertical",
        id: "acceptIncome"
    });
    $.__views.acceptIncome && $.addTopLevelView($.__views.acceptIncome);
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
    $.__views.acceptIncome.add($.__views.h1);
    $.__views.incDate = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "incDate"
    });
    $.__views.acceptIncome.add($.__views.incDate);
    $.__views.incAmount = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "incAmount"
    });
    $.__views.acceptIncome.add($.__views.incAmount);
    $.__views.incComment = Ti.UI.createLabel({
        width: 300,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        id: "incComment"
    });
    $.__views.acceptIncome.add($.__views.incComment);
    $.__views.incDecline = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "silver",
        color: "white",
        title: "Cancel",
        id: "incDecline"
    });
    $.__views.acceptIncome.add($.__views.incDecline);
    cancelIncome ? $.addListener($.__views.incDecline, "click", cancelIncome) : __defers["$.__views.incDecline!click!cancelIncome"] = true;
    $.__views.incAccept = Ti.UI.createButton({
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: "#75C799",
        color: "white",
        title: "Accept",
        id: "incAccept"
    });
    $.__views.acceptIncome.add($.__views.incAccept);
    acceptlIncome ? $.addListener($.__views.incAccept, "click", acceptlIncome) : __defers["$.__views.incAccept!click!acceptlIncome"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var acceptIncomeView = this.getView();
    var fullData = AppData.fullUserData();
    acceptIncomeView.open();
    var dateObj = new Date(AppData.acceptIncome().date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();
    $.incDate.text = "date: " + day + "/" + month + "/" + year;
    $.incAmount.text = "Amount: " + AppData.acceptIncome().amount + " " + getCurrency(AppData.acceptIncome().currency);
    $.incComment.text = "Comment: " + AppData.acceptIncome().comment;
    __defers["$.__views.incDecline!click!cancelIncome"] && $.addListener($.__views.incDecline, "click", cancelIncome);
    __defers["$.__views.incAccept!click!acceptlIncome"] && $.addListener($.__views.incAccept, "click", acceptlIncome);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;