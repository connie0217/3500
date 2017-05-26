Ext.define('Sgai.view.report.mgr.RptMgrWinController', {
	extend : 'Ext.app.ViewController',
    alias: 'controller.rptmgrwin',
    getRptMgrWinForm : function(button) {
    	return this.lookupReference('rptMgrWinForm');
    },    

    getRptUploadFile : function(button) {
    	return this.lookupReference('rptUploadFile');
    },

    
    afterRender : function(){
    	var params = this.getView().params;
    	this.getRptMgrWinForm().getForm().setValues(params);
    },
    
    winCancelButtonClick : function() {
		this.getView().close();
	},

	winSaveButtonClick : function(button) {
		var rptMgrGrid = this.getView().rptMgrGrid;
		var store = rptMgrGrid.getStore();
		var win = this.getView();
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
	}
});