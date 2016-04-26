function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openIncome() {
        $.index.close();
        Alloy.createController("income");
    }
    function openExpense() {
        $.index.close();
        Alloy.createController("expense");
    }
    function openTransaction() {
        $.index.close();
        Alloy.createController("transaction");
    }
    function openExchange() {
        $.index.close();
        Alloy.createController("exchange");
    }
    function getIncomePending() {
        var pendCount = 0;
        return pendCount;
    }
    function getUserAcc(id) {
        for (var i = 0; i <= parseInt(fullData.users.length) - 1; i++) for (var k = 0; k <= parseInt(fullData.users[i].accounts.length) - 1; k++) if (fullData.users[i].accounts[k].id == id) return getUser(fullData.users[i].id);
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
    function pickLang() {
        $.settings.dialog.show();
        $.settings.dialog.addEventListener("click", onSelectDialog);
    }
    function onSelectDialog(event) {
        var langId = event.index;
        if (0 == langId) {
            langId = 2;
            currentLangData = LangData.ruData();
            setLangData();
            $.index.close();
        } else {
            langId = 4;
            currentLangData = LangData.jeData();
            setLangData();
            $.index.close();
        }
        AppData.pickLang({
            hash: fullData.user.hash,
            lang_id: langId
        });
    }
    function setLangData() {
        $.tab1.title = currentLangData.operationsTab.operations;
        $.operations.title = currentLangData.operationsTab.operations;
        $.incomeBtn.title = currentLangData.operationsTab.income;
        $.expenseBtn.title = currentLangData.operationsTab.expense;
        $.exchangeBtn.title = currentLangData.operationsTab.exchange;
        $.transferBtn.title = currentLangData.operationsTab.transfer;
        $.history.tab2.title = currentLangData.historyTab.history;
        $.accounts.tab3.title = currentLangData.accountsTab.accounts;
        $.settings.tab4.title = currentLangData.settingsTab.settings;
        $.settings.pickLang.title = currentLangData.settingsTab.chooseLang;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __alloyId3 = [];
    $.__views.operations = Ti.UI.createWindow({
        id: "operations",
        title: "Operations",
        layout: "vertical"
    });
    $.__views.incomeBtn = Ti.UI.createButton({
        width: "75%",
        height: 40,
        top: 100,
        backgroundColor: "#75C799",
        font: {
            fontSize: "22dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        color: "white",
        id: "incomeBtn",
        title: "Income"
    });
    $.__views.operations.add($.__views.incomeBtn);
    openIncome ? $.addListener($.__views.incomeBtn, "click", openIncome) : __defers["$.__views.incomeBtn!click!openIncome"] = true;
    $.__views.expenseBtn = Ti.UI.createButton({
        width: "75%",
        height: 40,
        top: 20,
        backgroundColor: "#75C799",
        font: {
            fontSize: "22dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        color: "white",
        id: "expenseBtn",
        title: "Expense"
    });
    $.__views.operations.add($.__views.expenseBtn);
    openExpense ? $.addListener($.__views.expenseBtn, "click", openExpense) : __defers["$.__views.expenseBtn!click!openExpense"] = true;
    $.__views.exchangeBtn = Ti.UI.createButton({
        width: "75%",
        height: 40,
        top: 20,
        backgroundColor: "#75C799",
        font: {
            fontSize: "22dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        color: "white",
        id: "exchangeBtn",
        title: "Exchange"
    });
    $.__views.operations.add($.__views.exchangeBtn);
    openExchange ? $.addListener($.__views.exchangeBtn, "click", openExchange) : __defers["$.__views.exchangeBtn!click!openExchange"] = true;
    $.__views.transferBtn = Ti.UI.createButton({
        width: "75%",
        height: 40,
        top: 20,
        backgroundColor: "#75C799",
        font: {
            fontSize: "22dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        color: "white",
        id: "transferBtn",
        title: "Transfer"
    });
    $.__views.operations.add($.__views.transferBtn);
    openTransaction ? $.addListener($.__views.transferBtn, "click", openTransaction) : __defers["$.__views.transferBtn!click!openTransaction"] = true;
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.operations,
        id: "tab1",
        title: "",
        icon: "images/dark_2x/dark_list---add@2x.png"
    });
    __alloyId3.push($.__views.tab1);
    $.__views.history = Alloy.createController("history", {
        id: "history"
    });
    __alloyId3.push($.__views.history.getViewEx({
        recurse: true
    }));
    $.__views.accounts = Alloy.createController("accounts", {
        id: "accounts"
    });
    __alloyId3.push($.__views.accounts.getViewEx({
        recurse: true
    }));
    $.__views.settings = Alloy.createController("settings", {
        id: "settings"
    });
    __alloyId3.push($.__views.settings.getViewEx({
        recurse: true
    }));
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId3,
        tabsBackgroundFocusedColor: "#5DAD42",
        tintColor: "#5DAD42",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var AppData = require("data");
    var LangData = require("lang");
    var currentLangData = false;
    currentLangData = "JE" == AppData.getLang() ? LangData.jeData() : LangData.ruData();
    setLangData();
    if (AppData.isLoggedIn()) {
        Ti.API.info("Index is loged in: " + AppData.isLoggedIn());
        var fullData = AppData.fullUserData();
        console.log("user hash " + fullData.user.hash);
        console.log("user lang " + fullData.user.lang);
        var categories = [];
        categories[0] = Ti.UI.createPickerRow({
            title: "Category 1"
        });
        categories[1] = Ti.UI.createPickerRow({
            title: "Category 2"
        });
        var incomeOperView = Ti.UI.createScrollView({
            top: 30,
            width: 300,
            height: 600,
            backgroundColor: "white",
            borderWidth: "1dp",
            borderColor: "black",
            zIndex: 9999,
            visible: false,
            layout: "vertical",
            zIndex: 2
        });
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
        var catPicker = Ti.UI.createPicker({});
        catPicker.add(categories);
        var catPickerButton = Ti.UI.createButton({
            title: "Готово",
            width: 100,
            height: 40,
            bottom: 0,
            backgroundColor: "#75C799",
            color: "black"
        });
        catPickerButton.addEventListener("click", function() {
            incomeOperView.hide();
            fader.hide();
            AppData.setHideNotice();
            $.index.close();
            Alloy.createController("refresh");
        });
        $.index.add(incomeOperView);
        $.index.add(fader);
        {
            fullData.transactions.from_me;
        }
        var trToMe = fullData.transactions.to_me;
        var myId = fullData.user.id;
        getIncomePending(myId);
        var data = [];
        var haveNotice = 0;
        var tableSections = 0;
        data[tableSections] = Ti.UI.createTableViewSection({
            headerTitle: "Входящие переводы"
        });
        for (key in trToMe) for (var i = 0; i < key.length; i++) if ("object" == typeof trToMe[key][i] && 3 == trToMe[key][i].status) {
            haveNotice++;
            var pendHeader = Ti.UI.createLabel({
                text: trToMe[key][i].date.substring(10, 0) + "    от: " + getUserAcc(trToMe[key][i].from_account),
                height: "auto",
                width: 260,
                operation_id: trToMe[key][i].operation,
                top: 5,
                left: 10,
                font: {
                    fontSize: 14
                }
            });
            var pendContent = Ti.UI.createLabel({
                text: trToMe[key][i].amount + "		   " + getCurrency(trToMe[key][i].currency_id) + " ",
                height: "auto",
                width: 260,
                left: 10,
                operation_id: trToMe[key][i].operation,
                font: {
                    fontSize: 18
                }
            });
            var rightButton = Ti.UI.createImageView({
                image: "/images/dark_2x/dark_check-2@2x.png",
                operation_id: trToMe[key][i].operation,
                section: tableSections
            });
            var tmpView = Ti.UI.createView({
                height: 80,
                width: 50,
                top: -40,
                right: 0,
                backgroundColor: "#75C799",
                id: trToMe[key][i].operation
            });
            var row = Ti.UI.createTableViewRow({
                height: "auto",
                layout: "vertical",
                operation_id: trToMe[key][i].operation
            });
            row.add(pendHeader);
            row.add(pendContent);
            var account_types = [];
            for (var i = 0; i <= parseInt(fullData.my_accounts.length) - 1; i++) {
                var id = fullData.my_accounts[i].id;
                var accType = fullData.my_accounts[i].type_id;
                var accName = fullData.acc_type[accType];
                void 0 !== id;
                account_types[i] = Ti.UI.createPickerRow({
                    title: accName,
                    psValue: id
                });
            }
            var aceptAcc = false;
            var aceptOperation = false;
            var accView = Ti.UI.createView({
                top: -540,
                width: 300,
                height: 400,
                backgroundColor: "white",
                borderWidth: "1dp",
                borderColor: "black",
                zIndex: 9999,
                visible: false
            });
            var accPicker = Ti.UI.createPicker({});
            accPicker.add(account_types);
            accView.add(accPicker);
            var cancelOperation = Ti.UI.createButton({
                title: "Cancel",
                bottom: 0,
                left: 80
            });
            cancelOperation.addEventListener("click", function() {
                accView.hide();
                catPickerButton.show();
                params = {
                    hash: fullData.user.hash,
                    id: aceptOperation,
                    toacc: aceptAcc,
                    currency: 1
                };
            });
            accView.add(cancelOperation);
            var accPickerButton = Ti.UI.createButton({
                title: "Submit",
                bottom: 0,
                right: 80
            });
            row.addEventListener("click", function(e) {
                accView.show();
                catPickerButton.hide();
                aceptOperation = e.source.operation_id;
                var that1 = this;
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
                    tmpView.hide();
                    rightButton.hide();
                    pendContent.hide();
                    pendHeader.hide();
                    tableview.deleteRow(that1);
                    AppData.acceptOperation(params);
                    accView.hide();
                    catPickerButton.show();
                });
                accView.add(accPickerButton);
            });
            tmpView.add(rightButton);
            row.add(tmpView);
            data[tableSections].add(row);
        }
        var tableview = Titanium.UI.createTableView({
            data: data,
            style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
            minRowHeight: 80
        });
        incomeOperView.add(tableview);
        incomeOperView.add(accView);
        incomeOperView.add(catPickerButton);
        if (0 == AppData.checkNotice() && haveNotice > 0) {
            incomeOperView.show();
            fader.show();
        }
        $.index.open();
        Alloy.createController("history").getView();
        Alloy.createController("accounts").getView();
        Alloy.createController("settings").getView();
        $.settings.pickLang.addEventListener("click", pickLang);
    } else {
        Alloy.createController("login").getView().open();
        try {
            $.loginButton.title = currentLangData.login.loginBtn;
        } catch (e) {}
    }
    __defers["$.__views.incomeBtn!click!openIncome"] && $.addListener($.__views.incomeBtn, "click", openIncome);
    __defers["$.__views.expenseBtn!click!openExpense"] && $.addListener($.__views.expenseBtn, "click", openExpense);
    __defers["$.__views.exchangeBtn!click!openExchange"] && $.addListener($.__views.exchangeBtn, "click", openExchange);
    __defers["$.__views.transferBtn!click!openTransaction"] && $.addListener($.__views.transferBtn, "click", openTransaction);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;