function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getIncomePending() {
        function reverseForIn(obj, f) {
            var arr = [];
            for (var key in obj) arr.push(key);
            for (var i = arr.length - 1; i >= 0; i--) f.call(obj, arr[i]);
        }
        function json_merge_recursive(json1, json2) {
            var out = {};
            for (var k1 in json1) json1.hasOwnProperty(k1) && (out[k1] = json1[k1]);
            for (var k2 in json2) json2.hasOwnProperty(k2) && (out.hasOwnProperty(k2) ? "object" == typeof out[k2] && out[k2].constructor === Object && "object" == typeof json2[k2] && json2[k2].constructor === Object && (out[k2] = json_merge_recursive(out[k2], json2[k2])) : out[k2] = json2[k2]);
            return out;
        }
        function generateSortHistory(sortCur, sortType, sortPeriod) {
            console.log("start");
            faderW.show();
            reverseForIn(newHistory, function(key) {
                var that = this;
                var opTypeLabel = Ti.UI.createLabel({
                    text: getOpType(this[key][0]["operation_type"]),
                    operation_id: this[key][0]["operation"],
                    height: "auto",
                    width: 200,
                    top: 5,
                    left: 10,
                    font: {
                        fontSize: 14
                    }
                });
                var amountLabel = Ti.UI.createLabel({
                    text: this[key][0]["amount"] + "	" + getCurrency(this[key][0]["currency_id"]) + " ",
                    operation_id: this[key][0]["operation"],
                    height: "auto",
                    width: 200,
                    top: 5,
                    left: 10,
                    font: {
                        fontSize: 14
                    }
                });
                if (1 == this[key][0]["operation_type"]) var actionLabel = Ti.UI.createLabel({
                    text: this[key][0]["comment"],
                    operation_id: this[key][0]["operation"],
                    height: "auto",
                    width: 200,
                    top: 5,
                    left: 10,
                    font: {
                        fontSize: 14
                    }
                }); else if (2 == this[key][0]["operation_type"]) var actionLabel = Ti.UI.createLabel({
                    text: this[key][0]["comment"],
                    operation_id: this[key][0]["operation"],
                    height: "auto",
                    width: 200,
                    top: 5,
                    left: 10,
                    font: {
                        fontSize: 14
                    }
                }); else if (3 == this[key][0]["operation_type"]) var actionLabel = Ti.UI.createLabel({
                    text: currentLangData.operationsList.rait + this[key][0]["rate"],
                    operation_id: this[key][0]["operation"],
                    height: "auto",
                    width: 200,
                    top: 5,
                    left: 10,
                    font: {
                        fontSize: 14
                    }
                }); else if (4 == this[key][0]["operation_type"]) var actionLabel = Ti.UI.createLabel({
                    text: currentLangData.operationsList.userPickerLabel + " " + getUser(this[key][0]["to_account"]),
                    operation_id: this[key][0]["operation"],
                    height: "auto",
                    width: 200,
                    top: 5,
                    left: 10,
                    font: {
                        fontSize: 14
                    }
                });
                var dateLabel = Ti.UI.createLabel({
                    text: this[key][0]["date"].substring(10, 0),
                    operation_id: this[key][0]["operation"],
                    height: "auto",
                    width: 95,
                    top: -45,
                    right: 60,
                    font: {
                        fontSize: 14
                    }
                });
                if (3 == this[key][0]["status"]) if (fullData.user.id == this[key][0]["to_account"]) {
                    var rightButton = Ti.UI.createImageView({
                        image: "/images/dark_2x/dark_check-2@2x.png",
                        section: tableSections,
                        operation_id: this[key][0]["operation"]
                    });
                    var tmpView = Ti.UI.createView({
                        height: 80,
                        width: 50,
                        top: -40,
                        right: 0,
                        id: this[key][0]["operation"],
                        operation_id: this[key][0]["operation"]
                    });
                } else {
                    var rightButton = Ti.UI.createImageView({
                        image: "/images/dark_2x/dark_x@2x.png",
                        section: tableSections,
                        operation_id: this[key][0]["operation"]
                    });
                    var tmpView = Ti.UI.createView({
                        height: 80,
                        width: 50,
                        top: -40,
                        right: 0,
                        id: this[key][0]["operation"],
                        operation_id: this[key][0]["operation"]
                    });
                } else if (2 == this[key][0]["status"]) {
                    var rightButton = Ti.UI.createImageView({
                        section: tableSections,
                        operation_id: this[key][0]["operation"]
                    });
                    var tmpView = Ti.UI.createView({
                        height: 80,
                        width: 50,
                        top: -40,
                        right: 0,
                        operation_id: this[key][0]["operation"]
                    });
                } else if (1 == this[key][0]["status"]) {
                    var rightButton = Ti.UI.createImageView({
                        section: tableSections,
                        operation_id: this[key][0]["operation"]
                    });
                    var tmpView = Ti.UI.createView({
                        height: 80,
                        width: 50,
                        top: -40,
                        right: 0,
                        operation_id: this[key][0]["operation"]
                    });
                }
                var account_types = [];
                for (var i = 0; i <= parseInt(fullData.my_accounts.length) - 1; i++) {
                    var id = fullData.my_accounts[i].id;
                    var accType = fullData.my_accounts[i].type_id;
                    {
                        fullData.acc_type[accType];
                    }
                    void 0 !== id;
                    account_types[i] = Ti.UI.createPickerRow({
                        psValue: id
                    });
                }
                var aceptAcc = false;
                var aceptOperation = false;
                var accView = Ti.UI.createView({
                    top: 140,
                    width: 300,
                    height: 150,
                    backgroundColor: "white",
                    borderColor: "black",
                    zIndex: 9999,
                    visible: false
                });
                var accPicker = Ti.UI.createPicker({});
                accPicker.add(account_types);
                accView.add(accPicker);
                var accPickerButton = Ti.UI.createButton({
                    title: "Submit",
                    bottom: 0,
                    right: 80
                });
                accPickerButton.addEventListener("click", function() {
                    aceptAcc = accPicker.getSelectedRow(0).psValue;
                    Ti.API.info("Hash: " + fullData.user.hash);
                    Ti.API.info("Oper: " + aceptOperation);
                    Ti.API.info("Acc: " + aceptAcc);
                    params = {
                        hash: fullData.user.hash,
                        id: aceptOperation,
                        toacc: aceptAcc,
                        currency: 1
                    };
                    AppData.acceptOperation(params);
                    $.tab2.badge -= 1;
                    rightButton.image = "";
                    accView.hide();
                    fader.hide();
                });
                var accDeclineButton = Ti.UI.createButton({
                    title: "Decline",
                    bottom: 0,
                    right: 80
                });
                accDeclineButton.addEventListener("click", function() {
                    params = {
                        hash: fullData.user.hash,
                        id: aceptOperation,
                        toacc: 1,
                        currency: 1
                    };
                    AppData.declineOperation(params);
                    $.tab2.badge -= 1;
                    rightButton.image = "";
                    that[key][0]["status"] = 1;
                    accView.hide();
                    fader.hide();
                });
                var cancelButton = Ti.UI.createButton({
                    title: "Cancel",
                    bottom: 0,
                    left: 80
                });
                cancelButton.addEventListener("click", function() {
                    accView.hide();
                    fader.hide();
                });
                accView.add(cancelButton);
                var accDeclinelabel = Ti.UI.createLabel({
                    text: "Accept your actions",
                    top: 50
                });
                accView.add(accDeclinelabel);
                $.historyWin.add(accView);
                var row = Ti.UI.createTableViewRow({
                    psRowIndex: psRowIndex,
                    height: "auto",
                    layout: "vertical",
                    operation_id: this[key][0]["operation"]
                });
                row.addEventListener("click", function(e) {
                    if (fullData.user.id == that[key][0]["to_account"] && 3 == that[key][0]["status"]) {
                        fader.show();
                        accView.show();
                        aceptOperation = e.source.operation_id;
                        accView.add(accPickerButton);
                    } else if (3 == that[key][0]["status"]) {
                        fader.show();
                        accView.show();
                        aceptOperation = e.source.operation_id;
                        psRowIndex = e.source.psRowIndex;
                        accView.add(accDeclineButton);
                    }
                });
                row.add(opTypeLabel);
                row.add(amountLabel);
                row.add(actionLabel);
                row.add(dateLabel);
                tmpView.add(rightButton);
                row.add(tmpView);
                var fixingH = new Date().getHours();
                var fixingM = new Date().getMinutes();
                fixingH = 60 * fixingH * 60 * 1e3;
                fixingM = 60 * fixingM * 1e3;
                totalFixing = fixingH + fixingM;
                if (0 == sortCur && 0 == sortType && 0 == sortPeriod) data[tableSections].add(row); else if (0 != sortCur && 0 != sortType && 0 != sortPeriod) {
                    if (this[key][0]["currency_id"] == sortCur && this[key][0]["operation_type"] == sortType) {
                        var sortDate = new Date().getTime();
                        var pickSortPeriod = sortDate - sortPeriod - totalFixing;
                        var historyDate = Date.parse(this[key][0]["date"].substring(10, 0));
                        historyDate >= pickSortPeriod && data[tableSections].add(row);
                    }
                } else if (0 != sortCur && 0 == sortType && 0 == sortPeriod) this[key][0]["currency_id"] == sortCur && data[tableSections].add(row); else if (0 == sortCur && 0 != sortType && 0 == sortPeriod) this[key][0]["operation_type"] == sortType && data[tableSections].add(row); else if (0 == sortCur && 0 == sortType && 0 != sortPeriod) {
                    var sortDate = new Date().getTime();
                    var pickSortPeriod = sortDate - sortPeriod - totalFixing;
                    var historyDate = Date.parse(this[key][0]["date"].substring(10, 0));
                    historyDate >= pickSortPeriod && data[tableSections].add(row);
                } else if (0 != sortCur && 0 != sortType && 0 == sortPeriod) this[key][0]["currency_id"] == sortCur && this[key][0]["operation_type"] == sortType && data[tableSections].add(row); else if (0 == sortCur && 0 != sortType && 0 != sortPeriod) {
                    if (this[key][0]["operation_type"] == sortType) {
                        var sortDate = new Date().getTime();
                        var pickSortPeriod = sortDate - sortPeriod - totalFixing;
                        var historyDate = Date.parse(this[key][0]["date"].substring(10, 0));
                        historyDate >= pickSortPeriod && data[tableSections].add(row);
                    }
                } else if (0 != sortCur && 0 == sortType && 0 != sortPeriod && this[key][0]["currency_id"] == sortCur) {
                    var sortDate = new Date().getTime();
                    sortPeriod = sortDate - sortPeriod;
                    var historyDate = Date.parse(this[key][0]["date"].substring(10, 0));
                    historyDate >= sortPeriod && data[tableSections].add(row);
                }
                psRowIndex++;
                3 == this[key][0]["status"] && pendCount++;
            });
            console.log("end");
            faderW.hide();
        }
        var pendCount = 0;
        var data = [];
        var tableSections = 0;
        data[tableSections] = Ti.UI.createTableViewSection({
            headerTitle: ""
        });
        var newHistory = json_merge_recursive(trToMe, trFromMe);
        generateSortHistory(0, 0, 0);
        var tableview = Titanium.UI.createTableView({
            data: data,
            style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
            minRowHeight: 80
        });
        $.historyLayout.add(tableview);
        $.tab2.badge = pendCount;
        var sortLabel = Ti.UI.createLabel({
            text: "Фильтр",
            top: 0,
            right: 20
        });
        tableview.add(sortLabel);
        var fader = Ti.UI.createView({
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            borderWidth: "1dp",
            borderColor: "black",
            zIndex: 9999,
            visible: false,
            opacity: "0.8",
            zIndex: 1
        });
        $.historyWin.add(fader);
        var sortView = Ti.UI.createView({
            top: 50,
            width: 300,
            height: 410,
            backgroundColor: "white",
            borderColor: "black",
            zIndex: 9999,
            visible: false
        });
        $.historyWin.add(sortView);
        var sortCurLabel = Ti.UI.createLabel({
            text: "Currency",
            top: 10
        });
        sortView.add(sortCurLabel);
        var sortCurPicker = Ti.UI.createPicker({
            top: 30,
            height: 100
        });
        var sortCur = [];
        sortCur[0] = Ti.UI.createPickerRow({
            title: "ALL",
            index: 0
        });
        sortCur[1] = Ti.UI.createPickerRow({
            title: "UAH",
            index: 1
        });
        sortCur[2] = Ti.UI.createPickerRow({
            title: "USD",
            index: 2
        });
        sortCur[3] = Ti.UI.createPickerRow({
            title: "EUR",
            index: 3
        });
        sortCur[4] = Ti.UI.createPickerRow({
            title: "ILS",
            index: 4
        });
        sortCurPicker.add(sortCur);
        sortCurPicker.selectionIndicator = true;
        sortView.add(sortCurPicker);
        var sortTypeLabel = Ti.UI.createLabel({
            text: "Operation type",
            top: 120
        });
        sortView.add(sortTypeLabel);
        var sortTypePicker = Ti.UI.createPicker({
            top: 140,
            height: 100
        });
        var sortType = [];
        sortType[0] = Ti.UI.createPickerRow({
            title: "ALL",
            index: 0
        });
        sortType[1] = Ti.UI.createPickerRow({
            title: "Income",
            index: 1
        });
        sortType[2] = Ti.UI.createPickerRow({
            title: "Expense",
            index: 2
        });
        sortType[3] = Ti.UI.createPickerRow({
            title: "Echange",
            index: 3
        });
        sortType[4] = Ti.UI.createPickerRow({
            title: "Transfer",
            index: 4
        });
        sortTypePicker.add(sortType);
        sortTypePicker.selectionIndicator = true;
        sortView.add(sortTypePicker);
        var sortPeriodLabel = Ti.UI.createLabel({
            text: "Period",
            top: 220
        });
        sortView.add(sortPeriodLabel);
        var sortPeriodPicker = Ti.UI.createPicker({
            top: 240,
            height: 100
        });
        var sortPeriod = [];
        sortPeriod[0] = Ti.UI.createPickerRow({
            title: "ALL",
            index: 0
        });
        sortPeriod[1] = Ti.UI.createPickerRow({
            title: "Week",
            index: 6048e5
        });
        sortPeriod[2] = Ti.UI.createPickerRow({
            title: "Month",
            index: 2592e6
        });
        sortPeriod[3] = Ti.UI.createPickerRow({
            title: "1/2 Year",
            index: 15768e6
        });
        sortPeriodPicker.add(sortPeriod);
        sortPeriodPicker.selectionIndicator = true;
        sortView.add(sortPeriodPicker);
        var acceptSort = Ti.UI.createButton({
            title: "Accept",
            bottom: 20
        });
        acceptSort.addEventListener("click", function() {
            sortView.hide();
            fader.hide();
            try {
                if (tableview.data.length > 0) for (var i = tableview.data[0].rows.length - 1; i >= 0; i--) tableview.deleteRow(i);
                var sortCur = sortCurPicker.getSelectedRow(0).index;
                var sortType = sortTypePicker.getSelectedRow(0).index;
                var sortPeriod = sortPeriodPicker.getSelectedRow(0).index;
                generateSortHistory(sortCur, sortType, sortPeriod);
                tableview.data = data;
            } catch (e) {}
        });
        sortView.add(acceptSort);
        sortLabel.addEventListener("click", function() {
            fader.show();
            sortView.show();
        });
    }
    function getUser(id) {
        for (var i = 0; i <= parseInt(fullData.users.length) - 1; i++) if (fullData.users[i].id == id) return fullData.users[i].login;
    }
    function getCurrency(id) {
        for (var i = 0; i <= parseInt(fullData.balances.length) - 1; i++) if (fullData.balances[i].id == id) {
            var curId = fullData.balances[i].currency_id;
            return fullData.allow_cur[curId - 1].code;
        }
    }
    function getOpType(opID) {
        var operationType = false;
        1 == opID ? operationType = currentLangData.operationsTab.income : 2 == opID ? operationType = currentLangData.operationsTab.expense : 3 == opID ? operationType = currentLangData.operationsTab.exchange : 4 == opID && (operationType = currentLangData.operationsTab.transfer);
        return operationType;
    }
    function setLangData() {
        $.historyWin.title = currentLangData.historyTab.history;
        incomingTrasfers = currentLangData.global.incomingTrasfers;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "history";
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
    $.__views.historyWin = Ti.UI.createWindow({
        id: "historyWin",
        backgroundColor: "white",
        exitOnClose: "true",
        fullscreen: "false",
        title: "History"
    });
    $.__views.historyLayout = Ti.UI.createScrollView({
        id: "historyLayout",
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        height: "100%"
    });
    $.__views.historyWin.add($.__views.historyLayout);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.historyWin,
        id: "tab2",
        title: "",
        badge: "2",
        icon: "images/dark_2x/dark_book@2x.png"
    });
    $.__views.tab2 && $.addTopLevelView($.__views.tab2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var LangData = require("lang");
    var currentLangData = false;
    var incomingTrasfers = 0;
    var psRowIndex = 0;
    var faderW = Ti.UI.createView({
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 9999,
        visible: false,
        zIndex: 1
    });
    $.historyWin.add(faderW);
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "silver",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 22,
            fontWeight: "bold"
        },
        message: "Loading... please wait second",
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        top: "300",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    activityIndicator.show();
    faderW.add(activityIndicator);
    currentLangData = "JE" == AppData.getLang() ? LangData.jeData() : LangData.ruData();
    setLangData();
    if (AppData.isLoggedIn()) {
        var fullData = AppData.fullUserData();
        var trFromMe = fullData.transactions.from_me;
        var trToMe = fullData.transactions.to_me;
        var myId = fullData.user.id;
        getIncomePending(myId);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;