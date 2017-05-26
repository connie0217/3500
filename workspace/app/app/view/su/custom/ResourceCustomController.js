Ext.define('Sgai.view.su.custom.ResourceCustomController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.resourcecustom',

	resourceCustomTreeRender : function(component) {
		var me =this;
		me.getView().getStore().load();
//		var resCustomTree = this.getView().getStore().load();
//		var store = resCustomTree.getStore()
//		store.on('load',function(store,records){
//			resCustomTree.expandAll();
//		});
//		store.load();
	},
	beforedestroy:function(){
		
		var resCustomTree = this.getView();
		var store = resCustomTree.getStore();
		store.removeAll();
	},
	onButtonClickDelete : function(button, e, options) {
		var treePanel = this.getView();
		var record = treePanel.getSelectionModel().lastSelected;
		if (record.hasChildNodes()) {
			Ext.MessageBox.show({
						title : translations.operateMsgWinTitle,
						msg : translations.hasChildCanNotDel,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.INFO
					});
		} else {
			record.remove();
		}
	},

	onButtonClickAdd : function(button, e, options) {

		var treePanel = this.getView();
		var record = treePanel.getSelectionModel().lastSelected;

		if (!Ext.isEmpty(record)) {
			if (!record.isExpanded()) {
				treePanel.expandNode(record);
			}
			if (record.data.customLevel == 0) {
				var resModel = Ext.create('Sgai.model.su.custom.ResourceCustom');
				resModel.set('customLevel',1);
				resModel.store = record.store;
				record.appendChild(resModel);
			} else { // 子节点添加子节点
				Sgai.util.Util.showErrorMsg('不能在该层级添加节点');
			}
		}
	},

	onButtonClickSave : function(button, e, options) {

		var gridPanel = this.getView();
		// 校验必填项目

		var newRec = gridPanel.getStore().getNewRecords();
		var updateRec = gridPanel.getStore().getUpdatedRecords();
		var removeRec = gridPanel.getStore().getRemovedRecords();
		var isValidNew = this.validRecords(newRec);
		var isValidUpdate = this.validRecords(updateRec);
		if (!isValidNew || !isValidUpdate) {
			Sgai.util.Util.showErrorMsg(translations['notAllInputTip']);
			return;
		}

		// 提交确认
		Ext.Msg.confirm(translations.operateMsgWinTitle,
				translations.operateConfirm, function(btn) {
					if (btn == 'no') {
						return;
					} else {
						// 设置提交参数
						var store = gridPanel.getStore();
						var params = {
							action : 'create'
						};
						store.proxy.extraParams = params;
						store.sync({
							success : function(batch, options) {
								Sgai.util.Util
										.showTipMsg(translations['operateSuccess']);
							},
							failure : function(batch, options) {
								var errMsg = "";
								for (var i = 0; i < batch.exceptions.length; i++) {
									// var error = batch.exceptions[i].error;
									// //不知为啥取不到，暂时先写死了
									var error = 'resIdExist';
									for (var j = 0; j < batch.exceptions[i].records.length; j++) {
										var resId = batch.exceptions[i].records[i].data.resId;
										var resName = batch.exceptions[i].records[i].data.resName;
										var args = resId + "-" + resName;
										errMsg = errMsg
												+ args
												+ "::"
												+ eval(("translations." + error))
												+ "<br/>";
									}
								}

								Sgai.util.Util.showErrorMsg(errMsg);
							}
						});
					}
				});
	},

	validRecords : function(vRecords) {
		if (vRecords == "") {
			return true;
		}

		for (var i = 0; i < vRecords.length; i++) {
			var record = vRecords[i];
			if (Ext.String.trim(record.data.customName) == "") {
				return false;
			}
		}
		return true;
	},

	onButtonClickExpandAll : function(button, e, options) {
		var treePanel = this.getView();
		treePanel.expandAll();
	},
	onButtonClickCollapseAll : function(button, e, options) {
		var treePanel = this.getView();
		treePanel.collapseAll();
	},
	treeContextMenu:function(menutree, record, items,
			index, e) {
		e.preventDefault();
		e.stopEvent();
		// 判断是否为叶子结点
		var treePanel = this.getView();
		if (record.data.leaf == false) {
			var nodemenu = new Ext.menu.Menu({
				floating : true,
				items : [{
					text : translations.addNode,
					handler : function() {
						if (!record.isExpanded()) {
							treePanel.expandNode(record);
						}
						if (!Ext.isEmpty(record)) {
							if (!record.isExpanded()) {
								treePanel.expandNode(record);
							}
							if (record.data.customLevel == 0) {
								var resModel = Ext
										.create('Sgai.model.su.custom.ResourceCustom');
								resModel.set('customLevel', 1);
								resModel.store = record.store;
								record.appendChild(resModel);
							} else { // 子节点添加子节点
								Sgai.util.Util
										.showErrorMsg('不能在该层级添加节点');
							}
						}
					}
				}, {
					text : translations.delNode,
					handler : function() {
						if (record.hasChildNodes()) {
							Ext.MessageBox.show({
								title : translations.operateMsgWinTitle,
								msg : translations.hasChildCanNotDel,
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
						} else {
							record.remove();
						}
					}
				}]
			});
			nodemenu.showAt(e.getXY());
		}
	}
});