Ext.define('Sgai.view.su.sec.SecurityController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.securityController',

	getGroupGrid : function() {
		return this.lookupReference('securityGroupGrid');
	},
	getRoleGrid : function() {
		return this.lookupReference('securityRoleGrid');
	},

	queryButtonClick : function(button) {
		var panel = button.up().up();
		var grid;
		if (panel.itemId == "groupForm") {
			grid = this.getGroupGrid();
			this.getRoleGrid().getStore().removeAll();
		}
		if (panel.itemId == "roleForm") {
			grid = this.getRoleGrid();
		}
		Sgai.util.Util.postPageForm(button.up(), grid);
	},

	tabGroupSelect : function(grid, record, eOpts) {
		var store = this.getRoleGrid().getStore();
		if (record.length > 0) {
			this.lookupReference('roleGroupTmp').setValue(record[0]
					.get('roleGroup'));
			store.load({
						params : {
							'qm.roleGroup' : record[0].get('roleGroup'),
							'qm.securityRoleId' : this
									.lookupReference('securityRoleId').value
						}
					});
		} else {
			store.removeAll();
		}
	},
	beforeEditFunc : function(editor, context, eOpts) {
		var record = context.record;
		var gridPanel = this.getGroupGrid();
		var store = gridPanel.getStore();
		var newRec = store.getNewRecords();
		// 并且sid为非数字
		if (newRec.length > 0 && !isNaN(record.get("sid"))) {
			Sgai.util.Util.showTipMsg("提交数据中存在新增记录请先提交，再进行修改操作！");
			return;
		}
	},

	addGroupClick : function(button) {
		var store = this.getGroupGrid().getStore();
		var updateRec = store.getUpdatedRecords();
		if (updateRec.length > 0) {
			Sgai.util.Util.showTipMsg("提交数据中存在修改未提交的数据，请提交后再插入！");
			return;
		}
		var model = Ext.create(store.model.getName(), {
					sid : null,
					version : null
				});
		var sels = this.getGroupGrid().getSelection();
		if (sels.length == 0) {
			store.insert(store.data.length, model);
		} else {
			store.insert(store.indexOf(sels[0]) + 1, model);
		}
	},
	addRoleClick : function(button) {
		var grid = this.getRoleGrid();
		var win = Ext.create('Sgai.view.su.sec.SecurityRoleWin');
		win.title = "添加权限";
		win.show();
	},
	updateRoleClick : function(button) {
		var grid = this.getRoleGrid();
		var sels = grid.getSelectionModel().getSelection();
		if (sels.length != 1) {
			Sgai.util.Util.showTipMsg("请选择一条记录！");
			return;
		}
		var win = Ext.create('Sgai.view.su.sec.SecurityRoleWin');
		win.title = "修改权限";
		win.show();
	},

	delGroupClick : function(button) {
		var grid = this.getGroupGrid();
		var records = grid.getSelectionModel().getSelection();
		var store = grid.getStore();
		if (records.length === 0) {
			Sgai.util.Util.showTipMsg('请选择需要删除的记录!');
			return;
		}
		Ext.Msg.confirm('操作提示', '是否确定删除所选的记录？', function(btn) {
			if (btn == 'yes') {
				store.remove(records);
				store.sync({
							success : function(batch, options) {
								Sgai.util.Util.showTipMsg("删除操作执行成功！");
								store.load({});
							},
							failure : function(batch, options) {
								var errMsg = "";
								for (var i = 0; i < batch.exceptions.length; i++) {
									var error = batch.exceptions[i].error;
									var errorObj = Ext
											.decode(error.response.responseText);
									var errorStr = errorObj.meta.message;
									errMsg = errorStr + "<br/>";
								}
								Sgai.util.Util.showErrorMsg(errMsg);
								store.load({});
							}
						});
			}
		});
	},
	saveGroupClick : function(button) {
		var flag = true;
		var grid = this.getGroupGrid();
		var store = grid.getStore();

		store.each(function(record) {
					store.each(function(inrecord) {
								if (store.indexOf(record) != store
										.indexOf(inrecord)
										&& (record.get('roleGroup') == inrecord
												.get('roleGroup'))) {
									flag = false;
								}
							});
				});
		if (!flag) {
			Sgai.util.Util.showTipMsg("提交数据中存在重复的权限类别ID，请修改！");
			return;
		}
		// 校验必填项目
		var newRec = store.getNewRecords();
		var updateRec = store.getUpdatedRecords();
		// 如果没有需要提交的记录给提示
		if (newRec.length === 0 && updateRec.length === 0) {
			Sgai.util.Util.showTipMsg('没有需要提交修改的记录，请确认!');
			return;
		}
		// 对数值进行校验，校验通过提交
		if (Sgai.util.Util.validRecordsFordataIndex(grid, newRec)
				&& Sgai.util.Util.validRecordsFordataIndex(grid, updateRec)) {
			Sgai.util.Util.storeSync(store);
		}
	},

	delRoleClick : function(button) {
		var grid = this.getRoleGrid();
		var records = grid.getSelectionModel().getSelection();
		var store = grid.getStore();
		if (records.length === 0) {
			Sgai.util.Util.showTipMsg('请选择需要删除的记录!');
			return;
		}
		Ext.Msg.confirm('操作提示', '是否确定删除所选的记录？', function(btn) {
			if (btn == 'yes') {
				store.remove(records);
				store.sync({
							success : function(batch, options) {
								Sgai.util.Util.showTipMsg("删除操作执行成功！");
								store.reload({});
							},
							failure : function(batch, options) {
								var errMsg = "";
								for (var i = 0; i < batch.exceptions.length; i++) {
									var error = batch.exceptions[i].error;
									var errorObj = Ext
											.decode(error.response.responseText);
									var errorStr = errorObj.meta.message;
									errMsg = errorStr + "<br/>";
								}
								Sgai.util.Util.showErrorMsg(errMsg);
								store.reload({});
							}
						});
			}
		});
	}

});
