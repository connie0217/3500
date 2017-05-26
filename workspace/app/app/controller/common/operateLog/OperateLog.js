Ext.define('Sgai.controller.common.operateLog.OperateLog', {
    extend: 'Ext.app.Controller',
	
    requires: [
        'Sgai.util.Util'
    ],
    
    views: [
    	'common.operateLog.OperateLog'
    ],

    stores: [
        'Sgai.store.common.operateLog.OperateLog'
    ],
    
    refs: [ {
		ref: 'operateLog',
		selector: 'operateLog'
    	}
    ],
    
	init: function(application) {
	   //console.log('eventLog');
	   this.control(
		   {
			   	"operateLog grid button#btnQuery": {
		            click: this.onButtonClickQuery
		        },
		        "operateLog grid button#btnReset": {
		            click: this.onButtonClickReset
		        }
		   }
	   )	
	},
	
	onButtonClickQuery: function(button, e, options) {
		
        var formPanel = button.up('#operateLogPanel').down('#formPanel');
        var gridPanel = button.up('#gridPanel');
        
        if (!formPanel.getForm().isValid()) {
	        	Ext.MessageBox.show({
				    title:translations.operateMsgWinTitle,
				    msg:translations.formArgError,
				    buttons:Ext.Msg.OK,
				    icon:Ext.MessageBox.INFO
				});
	        	return;
        }

        var requestId = formPanel.down('textfield[itemId=qm.requestId]').getValue();
        var startTimestamp = Sgai.util.Util.datetimeFormat(formPanel.down('textfield[itemId=qm.startTimestamp]').getValue());
        var endTimestamp = Sgai.util.Util.datetimeFormat(formPanel.down('textfield[itemId=qm.endTimestamp]').getValue());          

        //设置提交参数
        var store = gridPanel.getStore();
        var pagingToolbarPanel = formPanel.up('#operateLogPanel').down('#pagingToolbarPanel');
        var pagingToolbar = pagingToolbarPanel.down('#pagingToolbar');
        
        
        var params = {
        	action:'read',
         	start:0,
         	limit:pagingToolbar.pageSize,
         	'qm.requestId':requestId,
         	'qm.startTimestamp':startTimestamp,
         	'qm.endTimestamp':endTimestamp
        };
        store.pageSize=pagingToolbar.pageSize;
        store.proxy.extraParams=params;
        
		pagingToolbar.store = store;
        store.load({
	               
        });          
    },
    
    onButtonClickReset: function(button, e, options) {
        button.up('#operateLogPanel').down('#formPanel').getForm().reset();
    }
	 
});