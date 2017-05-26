Ext.define('Sgai.cmp.SelectGridColumnAdjustWinController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.selectgridcolumnadjustwin',

	afterRender : function(button) {
		var me = this;
		var grid = this.getView().grid;
		// var =
		// this.lookupReference('gridId').setValue(this.getView().resId);
		var selectedCols = [];
		var unSelectedCols = [];

		var columns = grid.headerCt.items.items;
		var leftCount = 1, rightCount = 1;
		Ext.each(columns, function(item) {
					var colConfig = {};
					colConfig.dataIndex = item.dataIndex;
					colConfig.text = item.text;
					colConfig.width = Ext.isEmpty(item.width)
							? 100
							: item.width;
					if (!item.hidden) {
						colConfig.position = leftCount;
						selectedCols.push(colConfig);
						leftCount++;
					} else {
						colConfig.position = rightCount;
						unSelectedCols.push(colConfig);
						rightCount++;
					}
				});
		var fields = [{
					"name" : "position"
				}, {
					"name" : "dataIndex"
				}, {
					"name" : "text"
				}];
		var selectedStore = Ext.create('Ext.data.JsonStore', {
					// 下面两个参数也是从后台加载来的
					data : selectedCols,
					fields : fields
				});
		var unSelectedStore = Ext.create('Ext.data.JsonStore', {
					// 下面两个参数也是从后台加载来的
					data : unSelectedCols,
					fields : fields
				});
		this.lookupReference('selectedColumnGrid').bindStore(selectedStore);
		this.lookupReference('unSelectedColumnGrid').bindStore(unSelectedStore);
	},
	selectedColumnGridDrop : function(node, data, dropRec, dropPosition) {
		var me = this;
		var store = this.lookupReference('selectedColumnGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			store.getAt(i).set('position', i + 1);
		}

	},
	unSelectedColumnGridDrop : function(node, data, dropRec, dropPosition) {
		var me = this;
		var store = this.lookupReference('unSelectedColumnGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			store.getAt(i).set('position', i + 1);
		}

	},
	saveButtonClick : function(btn) {
		var me = this;
		var grid = this.getView().grid;
		var headerCt = grid.headerCt;
		var columns = headerCt.items.items;
		var arrayObj = new Array();
		var i = 0;
		var gridId = Ext.isEmpty(grid.gridId) ? grid.reference : grid.gridId;
		var store = this.lookupReference('selectedColumnGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			var record = store.getAt(i);
			var colConfig = {};
			colConfig.gridId = gridId;
			colConfig.dataIndex = record.get('dataIndex');
			colConfig.width = record.get('width');
			colConfig.hidden = false;
			colConfig.seq = i;
			arrayObj.push(colConfig);
		}
		var beginIdx = store.getCount();
		var unSelectStore = this.lookupReference('unSelectedColumnGrid')
				.getStore();
		for (var i = 0; i < unSelectStore.getCount(); i++) {
			var record = unSelectStore.getAt(i);
			var colConfig = {};
			colConfig.gridId = gridId;
			colConfig.dataIndex = record.get('dataIndex');
			colConfig.width = record.get('width');
			colConfig.hidden = true;
			colConfig.seq = i + beginIdx;
			arrayObj.push(colConfig);
		}
		var configJson = Ext.encode(arrayObj);
		var url = 'system/user-grid-columns/insertGridColumn.action';
		Ext.Msg.confirm(translations.operateMsgWinTitle,
				translations.operateConfirm, function(btn) {
					if (btn == 'no') {
						return;
					} else {
						Sgai.util.Util.postAjaxRequestByJsonData(url,
								configJson, false, function() {
									me.getView().close();
								}, function() {
								});
					}
				});
	},
	cancelButtonClick : function(btn) {
		this.getView().close();
	}

});