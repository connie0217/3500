Ext.define('Sgai.view.report.mgr.ReportManageController', {
	extend : 'Ext.app.ViewController',
    alias: 'controller.reportmanage',
    
    getRptMgrGrid : function(button) {
    	return this.lookupReference('rptMgrList');
    },
    getRptMgrForm : function(button) {
    	return this.lookupReference('queryForm');
    },
    getRptParGrid : function(button) {
    	return this.lookupReference('rptParGrid');
    },
    getRptDelBtn : function(button) {
    	return this.lookupReference('rptDelBtn');
    },
    getRptUpdBtn : function(button) {
    	return this.lookupReference('rptUpdBtn');
    },
    getRptPubBtn : function(button) {
    	return this.lookupReference('rptPubBtn');
    },
    getRptUnPubBtn : function(button) {
    	return this.lookupReference('rptUnPubBtn');
    },
    getRptTemplatePath : function(button) {
    	return this.lookupReference('rptTemplatePath');
    }, 
    getPagingFlag : function(button) {
    	return this.lookupReference('pagingFlag');
    }, 
    getValidateExpr : function(button) {
    	return this.lookupReference('validateExpr');
    }, 
    getPageComputeFlag : function(button) {
    	return this.lookupReference('pageComputeFlag');
    },
    getPageComputeFlag : function(button) {
    	return this.lookupReference('pageComputeFlag');
    },
    getNumPerExcel : function(button) {
    	return this.lookupReference('numPerExcel');
    },
    getTotalCountDS : function(button) {
    	return this.lookupReference('totalCountDs');
    },
    getTotalCountSQL : function(button) {
    	return this.lookupReference('totalCountSql');
    },
    getRptMgrWin : function(button) {
    	return this.lookupReference('rptMgrWin');
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
		var win = Ext.widget('rptmgrwin',{title:'新建报表',dataOption:'add',rptMgrGrid:this.getRptMgrGrid()});
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
		var params = {
				'qm.rptId' : record.data.rptId,
				'qm.rptName' : record.data.rptName,
				'qm.rptCatLevel1' : record.data.rptParentCategorySid,
				'qm.rptCat' : record.data.rptCategorySid,
				'qm.pagingFlag' : me.getPagingFlag().value,
				'qm.pageComputeFlag' : me.getPageComputeFlag().value,
				'qm.fillingFlag' : record.data.fillingFlag,
				'qm.groupFlag' : record.data.groupFlag,
				'qm.excelImportFlag' : record.data.excelImportFlag,
				'qm.validateExpr' : me.getValidateExpr().value,
				'qm.numPerExcel' : me.getNumPerExcel().value,
				'qm.totalCountDs' : me.getTotalCountDS().value,
				'qm.totalCountSql' : me.getTotalCountSQL().value,
				'qm.sid' : record.data.sid,
				'qm.resSid' : record.data.resSid
			};
		var win = Ext.widget('rptmgrwin',{title:'修改报表',dataOption:'upd',params:params,rptMgrGrid:rptMgrGrid});
		win.show();
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