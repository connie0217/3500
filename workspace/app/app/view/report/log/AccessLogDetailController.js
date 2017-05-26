Ext.define('Sgai.view.report.log.AccessLogDetailController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.accesslogdetail',

	accessLogDetailListRender : function(component) {
		component.getStore().getProxy().setTimeout(60000);
		component.getStore().load();
	},
	queryButtonClick : function(button) {
		Sgai.util.Util.postPageForm(this.lookupReference('queryForm'), this
						.getMaingrid());
	},
	resetButtonClick : function(button) {
		this.lookupReference('queryForm').getForm().reset();
	},
	getMaingrid : function() {
		return this.lookupReference('mainGrid');
	},
	rptCategorySelected : function(combo, record, index) {
		var me = this;
		var rptIdCombo = this.lookupReference('rptIdCombo');
		var store = rptIdCombo.getStore();
		rptIdCombo.reset();
		var param = {
			'tableName' : 'V_SU_REPORT_MENUS',
			'displayField' : 'RES_NAME',
			'valueField' : 'RES_ID',
			'filterName' : 'PARENT_SID',
			'filterValue' : combo.value
		};
		store.getProxy().extraParams = param;
		store.load({
					callback : function(records, operation, success) {
						if (records.length > 0) {
							me.lookupReference('rptIdCombo')
									.setValue(records[0].get('value'));
						}
					}
				});
	},
	onButtonClickExport : function(button, e, options) {
		var me = this;
		me.exportExcel(me, false);
	},
	onButtonClickExport2007 : function(button, e, options) {
		var me = this;
		me.exportExcel(me, true);
	},
	exportExcel : function(me, is2007) {
		var formPanel = me.lookupReference('queryForm');
		var params = Sgai.util.Util.getReportFormParams(formPanel);
		var gridPanel = me.getMaingrid();
		// 必须提供的参数 excelName：导出文件的名称 excelTitle：导出表格的标题
		params['excelName'] = 'reportAccessLog';
		params['qm.excelTitle'] = '报表访问日志';
		params['excel2007'] = is2007;
		params['selectId'] = 'selectReportAccessDetail';

		var url = 'select/select-query/exportExcel.action';
		// exportExcel 函数 url： 导出调用的action链接 gridPanel: 数据表格 params：参数列表
		Sgai.util.Util.exportExcel(url, gridPanel, params);
	},
	accessLogCellDbClick : function(grid, td, cellIndex, record, tr, rowIndex,
			e) {
		this.openDetailWin(record);
	},
	// 打开详细信息窗口
	openDetailWin : function(record) {
		var me = this;
		var form = me.getDetailForm();
		var win = me.getDetailWin();
		form.getForm().setValues({
					rptId : '',
					requestBy : '',
					startTimestamp : '',
					endTimestamp : '',
					params : '',
					exceptionMsg : '',
					accessResult : '',
					duration : ''
				});
		Ext.Ajax.request({
			waitMsg : '正在操作',
			waitTitle : '提示',
			url : 'report/report-query/findRptAccessLogWithException.action?rptAccessLogSid='
					+ record.get('sid'),
			method : 'POST',
			success : function(conn, response, options, eOpts) {
				var accessLogDetail = Ext.JSON.decode(conn.responseText).data;
				form.getForm().setValues(accessLogDetail);
				me.lookupReference('duration').setValue(record.get('duration'));
				me.lookupReference('accessResultMsg').setValue(record
						.get('accessResultMsg'));
				win.show();
			},
			failure : function(conn, response, options, eOpts) {
				me.getView().el.unmask();
				Sgai.util.Util.showErrorMsg(conn.responseText);

			}
		});
	},
	getDetailWin : function() {
		return this.lookupReference('detailWin');
	},
	getDetailForm : function() {
		return this.lookupReference('detailForm');
	},
	closeButtonClick : function() {
		return this.getDetailWin().close();
	},
	testButtonClick : function() {
		var me = this;
		var seletedRecord = this.getSelectedOfGrid();
		if(!seletedRecord){
			Sgai.util.Util.showErrorMsg("请选择访问日志");
			return;
		}
		var paramObj={};
		var paramStr = seletedRecord.get('params');
		var paramArry=[];
		if(paramStr.indexOf('{')!=-1){
			paramStr=paramStr.substr(1,paramStr.length-2);
			paramArry = paramStr.split(',')
		}else{				
			paramArry = paramStr.split(';');
		}
		for(var i=0;i<paramArry.length;i++){
			var arr=paramArry[i].split('=');
			if(arr.length>=2){
				paramObj[me.trim(arr[0])]=me.trim(arr[1]);
			}
		}
		var resId=paramObj.gridId?paramObj.gridId:paramObj.reportId;
		var targetPanel=Ext.ComponentQuery.query("mainpanel")[0];
		Ext.Ajax.request({
			waitMsg : '正在操作',
			waitTitle : '提示',
			url : 'system/resources/findByResId.action?resId='
					+ resId,
			method : 'POST',
			success : function(conn, response, options, eOpts) {
				var res = Ext.JSON.decode(conn.responseText);
				var newTab = targetPanel.items.findBy(function(tab) {
							return tab.title === res.resName;
						});

				if (!newTab) {
					var tabObject = {
						xtype : res.resUri,
						closable : true,
						title : res.resName,
						className : res.resUri,
						resParams : res.resParams,
						resId : res.resId,
						paramObj:paramObj
					}
					if (res.resUri === 'reportquery') {// 报表查询特殊处理
						tabObject.itemId = res.resId;
						tabObject.targetPanel = 'mainpanel';
					}
					newTab = targetPanel.add(tabObject);
				}

				targetPanel.setActiveTab(newTab);
			},
			failure : function(conn, response, options, eOpts) {
				me.getView().el.unmask();
				Sgai.util.Util.showErrorMsg(conn.responseText);

			}
		});

	},
	trim:function(s){
	    return s.replace(/(^\s*)|(\s*$)/g, "");
	},
	selectionChange : function(model, selected) {
		this.lookupReference('testButton').setDisabled(selected.length == 0);
	},
	getSelectedOfGrid : function() {
		var selectedRecords = this.getMaingrid().getSelectionModel()
				.getSelection();
		if (!selectedRecords || selectedRecords.length == 0) {
			return;
		}
		return selectedRecords[0];
	}
});
