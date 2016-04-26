function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function toOperations() {
        Alloy.createController("refresh");
        expenseView.close();
    }
    function getCurrency(accId, curId) {
        for (var i = 0; i <= parseInt(userData.balances.length) - 1; i++) if (userData.balances[i].account_id == accId && userData.balances[i].currency_id == curId) return userData.balances[i].value;
    }
    function submitData() {
        if ("" != ($.amount.value && cur && $.psRait.value && acc && $.comment.value)) if (0 == parseFloat($.amount.value) || 0 == parseFloat($.psRait.value)) alert("Поля сумма и курс не должны быть нулевыми!"); else if (getCurrency(acc, cur) - parseFloat($.amount.value).toFixed(2) >= 0) {
            AppData.acceptExpense({
                hash: userData.user.hash,
                fromUser: userData.user.id,
                subcategory_id: 1,
                comment: $.comment.value,
                rate: parseFloat($.psRait.value).toFixed(2),
                fromAccount: acc,
                currency: cur,
                amount: parseFloat($.amount.value).toFixed(2),
                operationType: 2,
                date: Date.parse($.psPickDate.value)
            });
            expenseView.close();
            Alloy.createController("acceptExpense");
        } else alert("На аккаунте в текущей валюте недостаточно средств!"); else alert("Вы должны заполнить все поля");
    }
    function setLangData() {
        $.gback.title = currentLangData.operationsList.goback;
        $.psDateLabel.text = currentLangData.operationsList.date;
        $.psAmountLabel.text = currentLangData.operationsList.amount;
        $.currencyPicker.hintText = currentLangData.operationsList.currency;
        $.psRaitLabel.text = currentLangData.operationsList.rait;
        $.psFromAccLabel.text = currentLangData.operationsList.fromaccount;
        $.accountPicker.hintText = currentLangData.operationsList.youracc;
        $.psToForLabel.text = currentLangData.operationsList.forwhat;
        $.categoryPicker.hintText = currentLangData.operationsList.category;
        $.subCategoryPicker.hintText = currentLangData.operationsList.subcategory;
        $.comment.text = currentLangData.operationsList.comment;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "expense";
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
    $.__views.incForm = Ti.UI.createWindow({
        id: "incForm"
    });
    $.__views.incForm && $.addTopLevelView($.__views.incForm);
    $.__views.historyLayout = Ti.UI.createScrollView({
        width: "100%",
        top: 10,
        id: "historyLayout",
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        height: "100%"
    });
    $.__views.incForm.add($.__views.historyLayout);
    $.__views.gback = Ti.UI.createButton({
        width: "100%",
        height: 40,
        top: 20,
        backgroundColor: "#e3e3e3",
        backgroundRepeat: 0,
        textAlign: "left",
        id: "gback",
        title: ""
    });
    $.__views.historyLayout.add($.__views.gback);
    toOperations ? $.addListener($.__views.gback, "click", toOperations) : __defers["$.__views.gback!click!toOperations"] = true;
    $.__views.psDateLabel = Ti.UI.createLabel({
        width: 100,
        top: 20,
        left: "12.5%",
        id: "psDateLabel",
        text: "Дата: "
    });
    $.__views.historyLayout.add($.__views.psDateLabel);
    $.__views.psPickDate = Ti.UI.createTextField({
        width: 150,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: -30,
        borderWidth: 1,
        borderColor: "silver",
        left: 175,
        id: "psPickDate",
        editable: "false",
        hintText: "Pick date"
    });
    $.__views.historyLayout.add($.__views.psPickDate);
    $.__views.psAmountLabel = Ti.UI.createLabel({
        width: 150,
        left: "12.5%",
        id: "psAmountLabel",
        text: "Сумма: "
    });
    $.__views.historyLayout.add($.__views.psAmountLabel);
    $.__views.amount = Ti.UI.createTextField({
        width: 150,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        borderWidth: 1,
        borderColor: "silver",
        left: "12.5%",
        id: "amount",
        hintText: "0.00"
    });
    $.__views.historyLayout.add($.__views.amount);
    $.__views.currencyPicker = Ti.UI.createTextField({
        width: 120,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: -40,
        borderWidth: 1,
        borderColor: "silver",
        right: "12.5%",
        id: "currencyPicker",
        editable: "false",
        hintText: "Currency"
    });
    $.__views.historyLayout.add($.__views.currencyPicker);
    $.__views.psRaitLabel = Ti.UI.createLabel({
        width: "75%",
        top: 15,
        left: "12.5%",
        id: "psRaitLabel",
        text: "Курс: "
    });
    $.__views.historyLayout.add($.__views.psRaitLabel);
    $.__views.psRait = Ti.UI.createTextField({
        width: 150,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        borderWidth: 1,
        borderColor: "silver",
        left: "12.5%",
        id: "psRait",
        hintText: "0.00"
    });
    $.__views.historyLayout.add($.__views.psRait);
    $.__views.psRaitIndicatorLabel = Ti.UI.createLabel({
        width: 100,
        top: -30,
        left: 275,
        id: "psRaitIndicatorLabel",
        text: "EUR/USD"
    });
    $.__views.historyLayout.add($.__views.psRaitIndicatorLabel);
    $.__views.psFromAccLabel = Ti.UI.createLabel({
        width: 150,
        top: 20,
        left: "12.5%",
        id: "psFromAccLabel",
        text: "На счет: "
    });
    $.__views.historyLayout.add($.__views.psFromAccLabel);
    $.__views.accountPicker = Ti.UI.createTextField({
        width: "75%",
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        borderWidth: 1,
        borderColor: "silver",
        id: "accountPicker",
        editable: "false",
        hintText: "Account"
    });
    $.__views.historyLayout.add($.__views.accountPicker);
    $.__views.psTotalExchLabel3 = Ti.UI.createLabel({
        id: "psTotalExchLabel3",
        text: ""
    });
    $.__views.historyLayout.add($.__views.psTotalExchLabel3);
    $.__views.psToForLabel = Ti.UI.createLabel({
        width: "75%",
        top: 15,
        left: "12.5%",
        id: "psToForLabel",
        text: "Назначение платежа: "
    });
    $.__views.historyLayout.add($.__views.psToForLabel);
    $.__views.categoryPicker = Ti.UI.createTextField({
        width: "75%",
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        borderWidth: 1,
        borderColor: "silver",
        id: "categoryPicker",
        editable: "false",
        hintText: "Category"
    });
    $.__views.historyLayout.add($.__views.categoryPicker);
    $.__views.subCategoryPicker = Ti.UI.createTextField({
        width: "75%",
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        borderWidth: 1,
        borderColor: "silver",
        id: "subCategoryPicker",
        editable: "false",
        hintText: "Sub category"
    });
    $.__views.historyLayout.add($.__views.subCategoryPicker);
    $.__views.comment = Ti.UI.createTextArea({
        width: "75%",
        height: 60,
        paddingLeft: 20,
        paddingRight: 20,
        top: 10,
        borderWidth: 1,
        borderColor: "silver",
        id: "comment",
        hintText: "Ваш комментарий"
    });
    $.__views.historyLayout.add($.__views.comment);
    $.__views.__alloyId1 = Ti.UI.createButton({
        width: "55%",
        height: 50,
        top: 10,
        backgroundColor: "#75C799",
        color: "white",
        title: "Ok",
        id: "__alloyId1"
    });
    $.__views.historyLayout.add($.__views.__alloyId1);
    submitData ? $.addListener($.__views.__alloyId1, "click", submitData) : __defers["$.__views.__alloyId1!click!submitData"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var expenseView = this.getView();
    expenseView.open();
    var AppData = require("data");
    var LangData = require("lang");
    var userData = AppData.fullUserData();
    var cur = 0;
    var acc = 0;
    currentLangData = "JE" == AppData.getLang() ? LangData.jeData() : LangData.ruData();
    console.log("inc lang" + userData.user.lang);
    var currencies = [];
    for (var i = 0; i <= parseInt(userData.allow_cur.length) - 1; i++) {
        var accType = userData.allow_cur[i].code;
        var id = userData.allow_cur[i].id;
        currencies[i] = Ti.UI.createPickerRow({
            title: accType,
            psValue: id
        });
    }
    var account_types = [];
    for (var i = 0; i <= parseInt(userData.my_accounts.length) - 1; i++) {
        var id = userData.my_accounts[i].id;
        var accType = userData.my_accounts[i].type_id;
        var accName = userData.acc_type[accType];
        void 0 !== id && Ti.API.info(userData.my_accounts[i].id);
        account_types[i] = Ti.UI.createPickerRow({
            title: accName,
            psValue: id
        });
    }
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
    expenseView.add(fader);
    var dateView = Ti.UI.createView({
        top: 250,
        width: 300,
        height: 100,
        backgroundColor: "white",
        borderWidth: "1dp",
        borderColor: "black",
        zIndex: 9999,
        visible: false
    });
    var picker = Ti.UI.createPicker({
        type: Ti.UI.PICKER_TYPE_DATE,
        minDate: new Date(2009, 0, 1),
        maxDate: new Date(2014, 11, 31),
        value: new Date(2014, 3, 12)
    });
    dateView.add(picker);
    var datePickerButton = Ti.UI.createButton({
        title: "ok",
        bottom: 0
    });
    $.psPickDate.value = new Date().toLocaleDateString();
    datePickerButton.addEventListener("click", function() {
        $.psPickDate.value = picker.getValue().toLocaleDateString();
        dateView.hide();
        fader.hide();
    });
    dateView.add(datePickerButton);
    expenseView.add(dateView);
    $.psPickDate.addEventListener("click", function() {
        dateView.show();
        fader.show();
    });
    var curView = Ti.UI.createView({
        top: 250,
        width: 300,
        height: 100,
        backgroundColor: "white",
        borderWidth: "1dp",
        borderColor: "black",
        zIndex: 9999,
        visible: false
    });
    var curPicker = Ti.UI.createPicker({});
    curPicker.add(currencies);
    curView.add(curPicker);
    var curPickerButton = Ti.UI.createButton({
        title: "ok",
        bottom: 0
    });
    curPickerButton.addEventListener("click", function() {
        cur = curPicker.getSelectedRow(0).psValue;
        $.currencyPicker.value = curPicker.getSelectedRow(0).title;
        curView.hide();
        fader.hide();
        $.psRaitIndicatorLabel.text = $.currencyPicker.value + "/USD";
        0 != acc && 0 != cur && ($.psTotalExchLabel3.text = "Доступно: " + getCurrency(acc, cur) + curPicker.getSelectedRow(0).title);
    });
    curView.add(curPickerButton);
    expenseView.add(curView);
    $.currencyPicker.addEventListener("click", function() {
        curView.show();
        fader.show();
    });
    var accView = Ti.UI.createView({
        top: 250,
        width: 300,
        height: 100,
        backgroundColor: "white",
        borderWidth: "1dp",
        borderColor: "black",
        zIndex: 9999,
        visible: false
    });
    var accPicker = Ti.UI.createPicker({});
    accPicker.add(account_types);
    accView.add(accPicker);
    var accPickerButton = Ti.UI.createButton({
        title: "ok",
        bottom: 0
    });
    accPickerButton.addEventListener("click", function() {
        acc = accPicker.getSelectedRow(0).psValue;
        $.accountPicker.value = accPicker.getSelectedRow(0).title;
        accView.hide();
        fader.hide();
        if (0 != acc && 0 != cur) {
            console.log(getCurrency(acc, cur));
            $.psTotalExchLabel3.text = "Доступно: " + getCurrency(acc, cur) + curPicker.getSelectedRow(0).title;
        }
    });
    accView.add(accPickerButton);
    expenseView.add(accView);
    $.accountPicker.addEventListener("click", function() {
        accView.show();
        fader.show();
    });
    var categories = [];
    categories[0] = Ti.UI.createPickerRow({
        title: "Category 1"
    });
    categories[1] = Ti.UI.createPickerRow({
        title: "Category 2"
    });
    var catView = Ti.UI.createView({
        top: 250,
        width: 300,
        height: 100,
        backgroundColor: "white",
        borderWidth: "1dp",
        borderColor: "black",
        zIndex: 9999,
        visible: false
    });
    var catPicker = Ti.UI.createPicker({});
    catPicker.add(categories);
    catView.add(catPicker);
    var catPickerButton = Ti.UI.createButton({
        title: "ok",
        bottom: 0
    });
    catPickerButton.addEventListener("click", function() {
        $.categoryPicker.value = "Category 1";
        catView.hide();
        fader.hide();
    });
    catView.add(catPickerButton);
    expenseView.add(catView);
    $.categoryPicker.addEventListener("click", function() {
        catView.show();
        fader.show();
    });
    var subCategories = [];
    subCategories[0] = Ti.UI.createPickerRow({
        title: "Sub category 1"
    });
    subCategories[1] = Ti.UI.createPickerRow({
        title: "Sub category 2"
    });
    var subCatView = Ti.UI.createView({
        top: 250,
        width: 300,
        height: 100,
        backgroundColor: "white",
        borderWidth: "1dp",
        borderColor: "black",
        zIndex: 9999,
        visible: false
    });
    var subCatPicker = Ti.UI.createPicker({});
    subCatPicker.add(subCategories);
    subCatView.add(subCatPicker);
    var subCatPickerButton = Ti.UI.createButton({
        title: "ok",
        bottom: 0
    });
    subCatPickerButton.addEventListener("click", function() {
        $.subCategoryPicker.value = "Sub category 1";
        subCatView.hide();
        fader.hide();
    });
    subCatView.add(subCatPickerButton);
    expenseView.add(subCatView);
    $.subCategoryPicker.addEventListener("click", function() {
        subCatView.show();
        fader.show();
    });
    $.amount.addEventListener("change", function(e) {
        e.source.value = e.source.value.replace(/[^\d\.]/g, "").replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
    });
    $.psRait.addEventListener("change", function(e) {
        e.source.value = e.source.value.replace(/[^\d\.]/g, "").replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
    });
    setLangData();
    __defers["$.__views.gback!click!toOperations"] && $.addListener($.__views.gback, "click", toOperations);
    __defers["$.__views.__alloyId1!click!submitData"] && $.addListener($.__views.__alloyId1, "click", submitData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;