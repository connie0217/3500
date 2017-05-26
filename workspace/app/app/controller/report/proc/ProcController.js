Ext.define('Sgai.controller.report.proc.ProcController', {
	extend : 'Ext.app.Controller',
	requires : ['Sgai.store.report.proc.ProcStore'],
	views : ['Sgai.view.report.proc.ProcManage', 'Sgai.view.report.proc.ProcList'],
	stores : ['Sgai.store.report.proc.ProcStore'],
	refs : [{
				ref : 'procForm',
				selector : 'procmanage form#querypanel'
			}, {
				ref : 'procGrid',
				selector : 'procmanage proclist grid#gridPanelProc'
			}, {
				ref : 'rptRes',
				selector : 'procmanage form#querypanel remotecombo#rptRes'
			}, {
				ref : 'parGrid',
				selector : 'procmanage procTabView procPar'
			}, {
				ref : 'logGrid',
				selector : 'procmanage procTabView procLogInfo'
			}],

	init : function() {
		this.control({
			"procmanage form#querypanel button#queryBtn" : {
				click : this.onButtonClickQuery
			},
			"procmanage form#querypanel button#resetBtn" : {
				click : this.onButtonClickReset
			},
			"procmanage proclist button#btnNew" : {
				click : this.onNewProc
			},
			"procmanage proclist gridpanel#gridPanelProc" : {
				edit : this.rptNameChangeWin,
				selectionchange : this.onSelectionchange
			},
			'procmanage proclist gridpanel#gridPanelProc button#btnSave' : {
				click : this.onButtonClickProcSave
			},
			"procmanage proclist gridpanel#gridPanelProc actioncolumn#delProc" : {
				click : this.onButtonClickDelProc
			},
			'procmanage procTabView procPar button#btnSave' : {
				click : this.onButtonClickExec
			}
		});
	},

	onButtonClickQuery : function(button) {
		Sgai.util.Util.postPageForm(this.getProcForm(), this.getProcGrid());
	},

	onButtonClickReset : function(button, e, options) {
		this.getProcForm().getForm().reset();
	},

	onSelectionchange : function(model, selections) {
		if (selections.length > 0) {
			var data = selections[selections.length - 1];
			var procId = data.get('procId');
			var params = {
				'qm.procId' : procId
			};
			var parStore = this.getParGrid().getStore();
			parStore.proxy.extraParams = params;
			parStore.load();
			var logStore = this.getLogGrid().getStore();
			logStore.proxy.extraParams = params;
			logStore.load();
		}
	},

	onNewProc : function(button) {
		var rec = Ext.create('Sgai.model.report.proc.ProcModel');
		rec.set('createdBy', Sgai.config.Runtime.getUserName());
		rec.set('createdDt', new Date());
		var gridPanel = button.up('gridpanel');
		gridPanel.getStore().insert(0, rec);
	},

	rptNameChangeWin : function(editor, e, eOpts) {
		var me = this;
		var item = e.field;
		if (item == 'rptName') {
			var rptName = e.record.data.rptName;
			var store = me.getRptRes().getStore();
			e.record.set('rptId', store.getAt(store.find('value', rptName, 0,
							false, true, true)).data.key)
		}
	},

	onButtonClickProcSave : function(button) {
		var store = this.getProcGrid().getStore();
		var records = store.data.items;
		if (Ext.isEmpty(records)) {
			Sgai.util.Util.showTipMsg('没有数据需要提交修改!');
			return;
		}
		var jsonArray = [];
		Ext.each(records, function(item) {
					jsonArray.push(item.data);
				});
		var parList = Ext.encode(jsonArray);

		if (Sgai.util.Util.validRecords(this.getProcGrid(), records)) {
			var url = 'report/proc-manage/updateProc.action';
			Sgai.util.Util.postAjaxRequestByJsonData(url, parList, false,
					function() {
						store.load();
					}, function() {
					}, button);
		} else {
			Sgai.util.Util.showTipMsg('请检查必输项!');
		}
	},

	onButtonClickDelProc : function(grid, e, rowIndex) {
		var store = grid.getStore();
		var rec = store.getAt(rowIndex);
		// grid.getStore().removeAt(rowIndex);
		Ext.Msg.confirm('操作提示', '是否确定删除所选的记录？', function(btn) {
					if (btn == 'yes') {
						var url = "report/proc-manage/destroy.action";
						Sgai.util.Util.postAjaxRequestByJsonData(url, rec.data,
								false, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '删除成功！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									store.load();
								}, function() {
								}, null);
					}
				})
	},

	onButtonClickExec : function(button) {
		var me = this;
		var store = this.getParGrid().getStore();
		var procs = this.getProcGrid().getSelectionModel().getSelection();
		var proc = procs[procs.length - 1];
		var procId = proc.get('procId');
		var params = {
			'procName' : procId
		};
		var records = store.data.items;
		if (!Ext.isEmpty(records)) {
			var jsonArray = [];
			Ext.each(records, function(item) {
						jsonArray.push(item.data);
					});
			var pars = Ext.encode(jsonArray);
			params['parList'] = pars;
		}
		var url = 'report/proc-manage/execProc.action';
		Ext.getBody().mask("请稍等，正在处理中...", "x-mask-loading");
		Ext.Ajax.request({
					url : url,
					method : 'post',
					params : params,
					success : function(response, options) {
						var reText = response.responseText;
						var flag = Ext.JSON.decode(reText).success;
						if (flag == true) {
							Sgai.util.Util.showTipMsg('运行成功!');
						} else {
							Sgai.util.Util.showTipMsg('运行失败!');
						}
						var logParam = {
							'procId' : procId
						};
						var logStore = me.getLogGrid().getStore();
						logStore.proxy.extraParams = logParam;
						logStore.load();
						Ext.getBody().unmask();
					},
					failure : function(response, options) {
						Ext.getBody().unmask();
					}
				});
	}

});
