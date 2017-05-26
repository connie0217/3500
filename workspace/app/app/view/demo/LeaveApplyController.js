Ext.define('Sgai.view.demo.LeaveApplyController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.leaveapply',

	leaveApplyListRender : function(component) {
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
	rowEditFired : function(editor, context) {
		Sgai.util.Util.postEditRow(context);
	},
	addButtonClick : function(btn) {
		Sgai.util.Util.addNewRow(this.getMaingrid());
	},
	editButtonClick : function(btn) {
		Sgai.util.Util.editSelectedRow(this.getMaingrid());
	},
	deleteButtonClick : function(btn) {
		Sgai.util.Util.deleteSeletedRow(this.getMaingrid());
	},
	rowEditCancel : function(btn, context) {
		Sgai.util.Util.cancelEditRow(context);
	},
	rowDeleteFired : function(grid, rowIndex) {
		Sgai.util.Util.deleteColumnClick(grid, rowIndex);
	},
	selectionChange : function(model, selected) {
		this.lookupReference('editBtn').setDisabled(selected.length == 0);
		this.lookupReference('deleteBtn').setDisabled(selected.length == 0);
	},
    applyButtonClick:function(btn, context){//请假申请提交
    	var grid = this.getMaingrid();
    	var selectApplies = grid.getSelectionModel().getSelection();
    	if(!selectApplies || selectApplies.length==0){    		
 		   Ext.Msg.alert('操作错误','必须先选择一条请假申请');
    	}
    	var currentApply = selectApplies[0];
    	var applySid = currentApply.get('sid');
    	var params = {'applySid':applySid};
    	Ext.Ajax.request({                    
    		waitMsg : '正在加载数据请稍后',            
    		waitTitle : '提示',               
    		url : 'demo/leave-apply!applySubmit.action',       
    		method:'POST',//
		    method:'POST',// 请求方式
		    params:params,             
    		success: function(conn, response, options, eOpts) {  		
    	 		   Ext.Msg.alert('提示','操作成功');
    		},
    		failure:function(conn, response, options, eOpts) {           
    			Sgai.util.Util.showErrorMsg(conn.responseText);     
    		    
    		} 
    	   });
    	
    },
    cancelApplyButtonClick:function(btn, context){//请假申请提交
    	var grid = this.getMaingrid();
    	var selectApplies = grid.getSelectionModel().getSelection();
    	if(!selectApplies || selectApplies.length==0){    		
 		   Ext.Msg.alert('操作错误','必须先选择一条请假申请');
    	}
    	var currentApply = selectApplies[0];
    	var applySid = currentApply.get('sid');
    	var params = {'applySid':applySid};
    	Ext.Ajax.request({                    
    		waitMsg : '正在加载数据请稍后',            
    		waitTitle : '提示',               
    		url : 'demo/leave-apply!applyCancel.action',       
    		method:'POST',//
		    method:'POST',// 请求方式
		    params:params,             
    		success: function(conn, response, options, eOpts) {  		
    	 		   Ext.Msg.alert('提示','操作成功');
    		},
    		failure:function(conn, response, options, eOpts) {           
    			Sgai.util.Util.showErrorMsg(conn.responseText);     
    		    
    		} 
    	   });
    	
    },    
    traceHistory : function(view, rowIdx, colIdx, item, e, record, row){//追踪历史		
    	var me=this;
		var traceHistoryWin = Ext.widget('tracehistorywin',{procInstId:record.get('procInstId')});
		traceHistoryWin.show();
	}

});
