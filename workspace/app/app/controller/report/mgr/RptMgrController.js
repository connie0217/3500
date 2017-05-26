Ext.define('Sgai.controller.report.mgr.RptMgrController', {
	extend : 'Ext.app.Controller',
	requires : ['Sgai.store.report.mgr.RptMgrStore'],
	views : ['Sgai.view.report.mgr.ReportManage', 'Sgai.view.report.mgr.RptMgrList',
			'Sgai.view.report.mgr.RptMgrWin'],
	stores : ['Sgai.store.report.mgr.RptMgrStore'],
	refs : [{
				ref : 'rptMgrForm',
				selector : 'reportmanage form#querypanel'
			}, {
				ref : 'rptMgrGrid',
				selector : 'reportmanage rptmgrlist grid#gridPanelRpt'
			}, {
				ref : 'rptParGrid',
				selector : 'reportmanage rptMgrTabView rptParInfo'
			}, {
				ref : 'rptDelBtn',
				selector : 'reportmanage rptmgrlist button#btnDel'
			}, {
				ref : 'rptUpdBtn',
				selector : 'reportmanage rptmgrlist button#btnUpd'
			}, {
				ref : 'rptPubBtn',
				selector : 'reportmanage rptmgrlist button#btnPub'
			}, {
				ref : 'rptUnPubBtn',
				selector : 'reportmanage rptmgrlist button#btnUnPub'
			}, {
				ref : 'rptTemplatePath',
				selector : 'reportmanage rptMgrTabView rptInfoView textfield#rptTemplatePath'
			}, {
				ref : 'pagingFlag',
				selector : 'reportmanage rptMgrTabView rptInfoView textfield#pagingFlag'
			}, {
				ref : 'validateExpr',
				selector : 'reportmanage rptMgrTabView rptInfoView textfield#validateExpr'
			}, {
				ref : 'pageComputeFlag',
				selector : 'reportmanage rptMgrTabView rptInfoView textfield#pageComputeFlag'
			}, {
				ref : 'numPerExcel',
				selector : 'reportmanage rptMgrTabView rptInfoView textfield#numPerExcel'
			}, {
				ref : 'totalCountDs',
				selector : 'reportmanage rptMgrTabView rptInfoView textfield#totalCountDs'
			}, {
				ref : 'totalCountSql',
				selector : 'reportmanage rptMgrTabView rptInfoView textarea#totalCountSql'
			}, {
				ref : 'rptMgrWin',
				selector : 'rptMgrWin',
				autoCreate : true,
				xtype : 'rptMgrWin'
			}, {
				ref : 'rptMgrWinForm',
				selector : 'rptMgrWin form#rptMgrWinForm'
			}, {
				ref : 'rptUploadFile',
				selector : 'rptMgrWin form#rptMgrWinForm fileuploadfield#rptUploadFile'
			}],

	init : function() {
		this.control({
					"reportmanage form#querypanel button#queryBtn" : {
						click : this.onButtonClickQuery
					},
					"reportmanage form#querypanel button#resetBtn" : {
						click : this.onButtonClickReset
					},
					"reportmanage rptMgrTabView rptInfoView button#downloadRaq" : {
						click : this.onButtonClickDownload
					},
					"reportmanage rptmgrlist grid#gridPanelRpt" : {
						selectionchange : this.onSelectionchange
					},
					"reportmanage rptmgrlist button#btnNew" : {
						click : this.onNewRpt
					},
					"reportmanage rptmgrlist button#btnDel" : {
						click : this.onDelRpt
					},
					"reportmanage rptmgrlist button#btnUpd" : {
						click : this.onUpdRpt
					},
					"reportmanage rptmgrlist button#btnPub" : {
						click : this.onPubRpt
					},
					"reportmanage rptmgrlist button#btnUnPub" : {
						click : this.onUnPubRpt
					},
					'rptMgrWin button#save' : {
						click : this.winSaveButtonClick
					},
					'rptMgrWin button#cancel' : {
						click : this.winCancelButtonClick
					},
					'reportmanage rptMgrTabView rptParInfo button#btnSave' : {
						click : this.onButtonClickParSave
					}
				});
	},

	onButtonClickQuery : function(button) {
		Sgai.util.Util.postPageForm(this.getRptMgrForm(), this.getRptMgrGrid());
	},

	onButtonClickReset : function(button, e, options) {
		this.getRptMgrForm().getForm().reset();
	},

	onSelectionchange : function(model, selections) {
		this.getRptDelBtn().setDisabled(false);
		this.getRptUpdBtn().setDisabled(false);
		this.getRptPubBtn().setDisabled(false);
		this.getRptUnPubBtn().setDisabled(false);
		var me = this;
		if (selections.length > 0) {
			var data = selections[selections.length - 1];
			var rptState = data.get('rptState');
			if (rptState == 'published') {
				this.getRptDelBtn().setDisabled(true);
				this.getRptUpdBtn().setDisabled(true);
				this.getRptPubBtn().setDisabled(true);
			}
			if (rptState == 'created') {
				this.getRptUnPubBtn().setDisabled(true);
			}
			var rptSid = data.get('sid');
			var rptInfoStore = Ext.create('Sgai.store.report.mgr.RptInfoStore');
			var params = {
				'qm.sid' : rptSid
			};
			rptInfoStore.proxy.extraParams = params;
			rptInfoStore.load(function(records, operation, success) {
				var record;
				var length = records.length;
				if (length > 0) {
					record = records[0];
					me.getRptTemplatePath().setValue(record
							.get('rptTemplatePath'));
					me.getPagingFlag().setValue(record.get('pagingFlag'));
					me.getValidateExpr().setValue(record.get('validateExpr'));
					me.getPageComputeFlag().setValue(record
							.get('pageComputeFlag'));
					me.getNumPerExcel().setValue(record.get('numPerExcel'));
					me.getTotalCountDS().setValue(record.get('totalCountDs'));
					me.getTotalCountSQL().setValue(record.get('totalCountSql'));
				}
			});
			var parGrid = this.getRptParGrid();
			var parStore = parGrid.getStore();
			var parParams = {
				'qm.rptSid' : rptSid
			};
			parStore.proxy.extraParams = parParams;
			parStore.load();
		}
	},

	onButtonClickDownload : function(button) {
		var templatePath = this.getRptTemplatePath().value;
		var url = 'report/report-manage/downloadRaq.action?fpath='
				+ encodeURIComponent(templatePath);
		window.location = url;
	},

	onNewRpt : function(button) {
		var win = this.getRptMgrWin();
		win.title = '新建报表';
		win.dataOption = 'add';
		win.show();
	},

	onDelRpt : function(button) {
		var rptMgrGrid = this.getRptMgrGrid();
		var store = rptMgrGrid.getStore();
		var selections = rptMgrGrid.getSelectionModel().getSelection();
		if (selections.length < 1) {
			Sgai.util.Util.showTipMsg(translations['notSelectDataNoSubmit']);
			return;
		}
		Ext.Msg.confirm('操作提示', '是否确定删除所选的记录？', function(btn) {
					if (btn == 'yes') {
						var jsonArray = [];
						Ext.each(selections, function(item) {
									jsonArray.push(item.data);
								});
						var rptList = Ext.encode(jsonArray)
						var url = "report/report-manage/delReportDef.action";
						Sgai.util.Util.postAjaxRequestByJsonData(url, rptList,
								false, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '删除成功！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									store.load();
								}, function() {
								}, button);
					}
				})
	},

	onPubRpt : function(button) {
		var rptMgrGrid = this.getRptMgrGrid();
		var store = rptMgrGrid.getStore();
		var selections = rptMgrGrid.getSelectionModel().getSelection();
		if (selections.length < 1) {
			Sgai.util.Util.showTipMsg(translations['notSelectDataNoSubmit']);
			return;
		}
		var jsonArray = [];
		Ext.each(selections, function(item) {
					jsonArray.push(item.data);
				});
		var rptList = Ext.encode(jsonArray)
		var url = "report/report-manage/publishRpt.action";
		Sgai.util.Util.postAjaxRequestByJsonData(url, rptList, false,
				function() {
					Ext.MessageBox.show({
								title : '操作提示',
								msg : '发布成功！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
					store.load();
					rptMgrGrid.getSelectionModel().deselectAll();
				}, function() {
				}, button);
	},

	onUnPubRpt : function(button) {
		var rptMgrGrid = this.getRptMgrGrid();
		var store = rptMgrGrid.getStore();
		var selections = rptMgrGrid.getSelectionModel().getSelection();
		if (selections.length < 1) {
			Sgai.util.Util.showTipMsg(translations['notSelectDataNoSubmit']);
			return;
		}
		var jsonArray = [];
		Ext.each(selections, function(item) {
					jsonArray.push(item.data);
				});
		var rptList = Ext.encode(jsonArray);
		var url = "report/report-manage/unPublishRpt.action";
		Sgai.util.Util.postAjaxRequestByJsonData(url, rptList, false,
				function() {
					Ext.MessageBox.show({
								title : '操作提示',
								msg : '取消发布成功！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
					store.load();
					rptMgrGrid.getSelectionModel().deselectAll();
				}, function() {
				}, button);
	},

	onUpdRpt : function(button) {
		var me = this;
		var rptMgrGrid = this.getRptMgrGrid();
		var selections = rptMgrGrid.getSelectionModel().getSelection();
		if (selections.length < 1) {
			Sgai.util.Util.showTipMsg(translations['notSelectDataNoSubmit']);
			return;
		}
		var record = selections[selections.length - 1];
		var win = this.getRptMgrWin();
		win.title = '修改报表';
		win.dataOption = 'upd';
		var form = this.getRptMgrWinForm();
		win.show();
		var param = {
			'qm.rptId' : record.data.rptId,
			'qm.rptName' : record.data.rptName,
			'qm.rptCat' : record.data.rptCategorySid,
			'qm.pagingFlag' : me.getPagingFlag().value,
			'qm.pageComputeFlag' : me.getPageComputeFlag().value,
			'qm.validateExpr' : me.getValidateExpr().value,
			'qm.numPerExcel' : me.getNumPerExcel().value,
			'qm.totalCountDs' : me.getTotalCountDS().value,
			'qm.totalCountSql' : me.getTotalCountSQL().value,
			'qm.sid' : record.data.sid,
			'qm.resSid' : record.data.resSid
		};
		form.getForm().setValues(param);
	},

	winCancelButtonClick : function() {
		this.getRptMgrWin().close();
	},

	winSaveButtonClick : function(button) {
		var rptMgrGrid = this.getRptMgrGrid();
		var store = rptMgrGrid.getStore();
		var win = this.getRptMgrWin();
		var form = this.getRptMgrWinForm();
		if (win.dataOption == 'add'
				&& (this.getRptUploadFile().value == undefined || this.getRptUploadFile().value == "")) {
			Sgai.util.Util.showTipMsg('请选择上传模板文件');
			return;
		}
		var url = "";
		if (win.dataOption == 'upd') {
			var url = "report/report-manage/updReportDef.action";
		}
		if (win.dataOption == 'add') {
			var url = "report/report-manage/addReportDef.action";
		}
		form.getForm().submit({
					url : url,
					waitMsg : '正在提交数据...',
					method : 'POST',
					success : function(form, action) {
						Ext.Msg.alert('操作成功', '保存成功');
						win.close();
						store.load();
						rptMgrGrid.getSelectionModel().deselectAll();
					},
					failure : function(form, action) {
						switch (action.failureType) {
						case Ext.form.Action.CLIENT_INVALID:
							Ext.Msg.alert("错误",
									"提交的表单数据无效,请检查!");
							break;
						case Ext.form.Action.CONNECT_FAILURE:
							Ext.Msg.alert('错误', '连接失败');
							break;
						case Ext.form.Action.SERVER_INVALID:
							Ext.Msg.alert('业务逻辑错误',action.result.message);
						}
					}
				});
	},

	onButtonClickParSave : function(button) {
		var store = this.getRptParGrid().getStore();
		var records = store.data.items;
		if (Ext.isEmpty(records)) {
			Sgai.util.Util.showTipMsg('没有参数需要提交修改!');
			return;
		}

		var jsonArray = [];
		Ext.each(records, function(item) {
					jsonArray.push(item.data);
				});
		var parList = Ext.encode(jsonArray);

		if (Sgai.util.Util.validRecords(this.getRptParGrid(), records)) {
			var url = 'report/report-manage/updatePar.action';
			Sgai.util.Util.postAjaxRequestByJsonData(url, parList, false,
					function() {
						store.load();
					}, function() {
					}, button);
		} else {
			Sgai.util.Util.showTipMsg('请检查必输项!');
		}
	}

});
