Ext.define('Sgai.view.demo.DemoUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.demouser',

   userListRender:function(component){
        component.getStore().load();
    },
    queryButtonClick:function(button){
        Sgai.util.Util.postPageForm(this.lookupReference('queryForm'),this.getMaingrid());
    },
    resetButtonClick:function(button){
       this.lookupReference('queryForm').getForm().reset();
    }
    ,
    getMaingrid:function(){
    	return this.lookupReference('mainGrid');
    },
    rowEditFired:function(editor,context){
        Sgai.util.Util.postEditRow(context);
    },
    addButtonClick:function(btn){
        Sgai.util.Util.addNewRow(this.getMaingrid());
    },
    editButtonClick:function(btn){
        Sgai.util.Util.editSelectedRow(this.getMaingrid());
    },
    deleteButtonClick:function(btn){
        Sgai.util.Util.deleteSeletedRow(this.getMaingrid());
    },
    rowEditCancel:function(btn, context){
        Sgai.util.Util.cancelEditRow(context);
    },
    rowDeleteFired:function(grid, rowIndex){
        Sgai.util.Util.deleteColumnClick(grid,rowIndex);
    },
    selectionChange:function(model, selected){
        this.lookupReference('editBtn').setDisabled(selected.length == 0);
        this.lookupReference('deleteBtn').setDisabled(selected.length == 0);
    },
	onButtonClickExport : function(button, e, options) {
		var me=this;
		me.exportExcel(me,false);
	},
	onButtonClickExport2007 : function(button, e, options) {
		var me=this;
		me.exportExcel(me,true);
	},
	exportExcel:function(me,is2007){
		var formPanel = me.lookupReference('queryForm');		
		var params = Sgai.util.Util.getReportFormParams(formPanel);
		var gridPanel = me.getMaingrid();
		// 必须提供的参数 excelName：导出文件的名称 excelTitle：导出表格的标题
		params['excelName'] = '导出Excel';
		params['excelTitle'] = '导出Demo';
		params['excel2007'] = is2007;
		
		var url = 'demo/user-demo/exportExcel.action';
		// exportExcel 函数 url： 导出调用的action链接 gridPanel: 数据表格 params：参数列表
		Sgai.util.Util.exportExcel(url, gridPanel, params);
	},
	onButtonClickColumn: function(button, e, options) {
		var columnAdjustWin = Ext.widget('selectgridcolumnadjustwin',{grid:this.getMaingrid()});
		columnAdjustWin.show();
	}
    
});
