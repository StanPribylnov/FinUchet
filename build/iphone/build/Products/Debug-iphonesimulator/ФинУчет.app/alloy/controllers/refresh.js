function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "refresh";
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
    $.__views.refresh = Ti.UI.createView({
        id: "refresh"
    });
    $.__views.refresh && $.addTopLevelView($.__views.refresh);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator"
    });
    $.__views.refresh.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var logpass = AppData.getUserEnterence();
    AppData.login(logpass.login, logpass.password, function(response) {
        if ("ok" === response.result) {
            console.log(response);
            {
                Alloy.createController("index");
            }
        } else {
            $.userPassword.value = "";
            $.activityIndicator.hide();
            $.loginButton.show();
        }
    });
    AppData.fullUserData();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;