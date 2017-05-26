Ext.define('Sgai.view.common.cache.CacheController', {
			extend : 'Ext.app.ViewController',
			alias : 'controller.cacheController',

			getCatGrid : function() {
				return this.lookupReference('cacheCatGrid');
			},
			getItemGrid : function() {
				return this.lookupReference('cacheItemGrid');
			},

			queryButtonClick : function(button) {
				var panel = button.up().up();
				var grid;
				if (panel.itemId == "catForm") {
					grid = this.getCatGrid();
					this.getItemGrid().getStore().removeAll();
				}
				if (panel.itemId == "itemForm") {
					grid = this.getItemGrid();
				}
				Sgai.util.Util.postPageForm(button.up(), grid);
			},

			tabcatSelect : function(grid, record, eOpts) {
				var store = this.getItemGrid().getStore();
				if (record.length != 0) {
					this.lookupReference('fieldTmp').setValue(record[0]
							.get('field'));
					store.load({
								params : {
									'qm.field' : record[0].get('field'),
									'qm.key' : this.lookupReference('key').value
								}
							});
				}
			},

			loadAllCat : function(button, e, options) {
				var me = this;
				var catGrid = this.getCatGrid();
				var store = catGrid.getStore();
				var records = store.data.items;
				if (!Ext.isEmpty(records)) {
					var jsonArray = [];
					Ext.each(records, function(record) {
								jsonArray.push(record.data);
							});
					if (jsonArray.length > 0) {
						var list = Ext.encode(jsonArray);
						var url = "cache/refreshAllCat.action";
						me.getView().el.mask('缓存加载中，请耐心等待！');
						Sgai.util.Util.postAjaxRequestByJsonData(url, list,
								true, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '加载成功！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									me.getView().el.unmask();
									var store = me.getCatGrid().getStore();
									store.reload();
								}, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '加载失败！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									me.getView().el.unmask();
									var store = me.getCatGrid().getStore();
									store.reload();
								}, null);
					}
				}
			},

			loadCat : function(button, e, options) {
				var me = this;
				var catGrid = this.getCatGrid();
				var records = catGrid.getSelectionModel().getSelection();
				if (!Ext.isEmpty(records)) {
					var jsonArray = [];
					Ext.each(records, function(record) {
								jsonArray.push(record.data);
							});
					if (jsonArray.length > 0) {
						var list = Ext.encode(jsonArray);
						var url = "cache/refreshCat.action";
						me.getView().el.mask('缓存加载中，请耐心等待！');
						Sgai.util.Util.postAjaxRequestByJsonData(url, list,
								true, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '加载成功！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									me.getView().el.unmask();
									var store = me.getItemGrid().getStore();
									store.reload();
								}, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '加载失败！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									me.getView().el.unmask();
									var store = me.getItemGrid().getStore();
									store.reload();
								}, null);
					}
				} else {
					Sgai.util.Util.showTipMsg("请选择一项缓存大类，再进行加载操作！");
				}
			},

			loadItem : function(button, e, options) {
				var me = this;
				var itemGrid = this.getItemGrid();
				var records = itemGrid.getSelectionModel().getSelection();
				var catGrid = this.getCatGrid();
				var catRec = catGrid.getSelectionModel().getSelection();
				if (Ext.isEmpty(catRec)) {
					Sgai.util.Util.showTipMsg("未选择缓存大类！");
				} else {
					if (!Ext.isEmpty(records)) {
						var _field = catRec[0].data.field;
						var jsonArray = [];
						Ext.each(records, function(record) {
									record.set('field', _field);
									jsonArray.push(record.data);
								});
						if (jsonArray.length > 0) {
							var list = Ext.encode(jsonArray);
							var url = "cache/refreshItem.action";
							me.getView().el.mask('缓存加载中，请耐心等待！');
							Sgai.util.Util.postAjaxRequestByJsonData(url, list,
									true, function() {
										Ext.MessageBox.show({
													title : '操作提示',
													msg : '加载成功！',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
										me.getView().el.unmask();
									}, function() {
										Ext.MessageBox.show({
													title : '操作提示',
													msg : '加载失败！',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
										me.getView().el.unmask();
									}, null);
						}
					} else {
						Sgai.util.Util.showTipMsg("请选择一项缓存明细，再进行加载操作！");
					}
				}
			}
		});
