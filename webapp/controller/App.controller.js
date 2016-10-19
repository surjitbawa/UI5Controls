sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"opensap/UI5Controls/model/formatter"

], function(Controller, MessageToast, JSONModel, ResourceModel, Filter, FilterOperator, formatter) {
	"use strict";
	return Controller.extend("opensap.UI5Controls.controller.App", {

		formatter: formatter,
		onShowHello: function() {
			// show a native JavaScript alert
			//	alert("Hello World");
			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
			//	console.log(sap.ui.getCore().getConfiguration().getLanguage());
		},
		onItemSelected: function(oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.byId("productDetailsPanel");

			oProductDetailPanel.bindElement({
				path: sPath
			});
			this.byId("productDetailsPanel").setVisible(true);
		},

		onFilterProducts: function(oEvent) {

			// build filter array
			var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("productsList"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter
			// which will make all entries visible again
			oBinding.filter(aFilter);
		},

		//	var oModel = new sap.ui.model.odata.v2.ODataModel("http://services.odata.org/Northwind/Northwind.svc/"),

		onInit: function() {
			// set data model on view
			// var oData = {
			// 	recipient: {
			// 		name: "World"
			// 	}
			// };

			// var oModel = new JSONModel(oData);
			// // oModel.loadData({
			// // 	sURL: "http://services.odata.org/Northwind/Northwind.svc/Customers('ALFKI')"

			// // });

			// oModel.setData({
			// 	recipient: {
			// 		name: "World"
			// 	}

			// });
			// this.getView().setModel(oModel);
		}
	});

});