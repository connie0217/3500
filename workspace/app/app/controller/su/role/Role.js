Ext.define('Sgai.controller.su.role.Role', {
	extend : 'Ext.app.Controller',

	requires : [ 'Sgai.util.Util'],

	views : ['su.role.Role'],

	stores : [ 'su.role.Role' ],

	refs : [

	],
init: function(application) {
    this.control({
        "role  button#btnQuery": {
            click: this.onButtonClickQuery
        },
        "role  button#btnReset": {
            click: this.onButtonClickReset
        },
        "role  button#delRec": {
            click: this.onButtonClickRemove
        },
        "role  button#btnNew": {
            click: this.onButtonClickNew
        },
        "role  button#btnSave": {
        	click: this.onButtonClickSave
        },
        "role treepanel button#btnResourceExpandAll": {
        	click: this.onButtonClickExpandAll
        },
        "role treepanel button#btnResourceCollapseAll": {
        	click: this.onButtonClickCollapseAll
        },
        "role treepanel button#btnSecExpandAll": {
        	click: this.onButtonClickSecExpandAll
        },
        "role treepanel button#btnSecCollapseAll": {
        	click: this.onButtonClickSecCollapseAll
        }
    });

},


    onButtonClickReset: function(button, e, options) {
    	button.up('#roleMainPanel').down('#roleQueryPanel').getForm().reset();
     },
        
    onButtonClickRemove: function(button, e, options) {   
        var gridPanel = button.up('#roleGridPanel');
        var store = gridPanel.getStore();  
        var sels = gridPanel.getSelectionModel().getSelection();
        Ext.Msg.confirm
        (
            '操作提示',
            '是否确定删除所选的' + sels.length + '条记录？',
            function (btn)
            {
                if (btn == 'yes')
                {
                    for (var i = 0; i < sels.length; i++)
                    {  
                        store.remove(sels[i]);     //调用 Store 的 remove 方法
                    }
                  
                    store.sync
                    ({
                        success:function ()
                        {
                            Ext.MessageBox.show
                            ({
                                title:'操作提示',
                                msg:'删除成功！',
                                buttons:Ext.MessageBox.OK,
                                icon:Ext.MessageBox.INFO
                            })
                        },
                        failure:function ()
                        {
                            Ext.MessageBox.show
                            ({
                                title:'操作提示',
                                msg:'删除失败，请检查异常信息！',
                                buttons:Ext.MessageBox.OK,
                                icon:Ext.MessageBox.ERROR
                            })
                        }
                    })
                }
            }
        )
	},
	onButtonClickNew:function(button) {
    	var rec = new Sgai.model.su.role.Role({
            sid: '',
    	    roleId: '',
    	    roleName:'',
    	    roleDesc:''
        });
        var gridPanel = button.up('#roleGridPanel');
        gridPanel.getStore().insert(0, rec);
        var cellEditing = gridPanel.getPlugin('cellEditing');        
        cellEditing.startEditByPosition({
            row: 0, 
            column: 0
        });
    },


	onButtonClickQuery : function(button, e, options) {
		var gridPanel = button.up('#roleGridPanel');
		var store = gridPanel.getStore();
		var formPanel = button.up('#roleMainPanel').down('#roleQueryPanel');
		//设置提交参数
        var params = Sgai.util.Util.getFormParams(formPanel);
        store.proxy.extraParams=params;
		store.load({
		});
	},

	onButtonClickSave: function(button, e, options) {
		var gridPanel = button.up('#roleGridPanel');
		var store = gridPanel.getStore();
		var treePanel=button.up('#roleMainPanel').down('#roleTreePanel');
		var secTreePanel=button.up('#roleMainPanel').down('#secTreePanel');
		var resIds="";
		var secIds="";
		var checkedResIds = treePanel.getChecked();
		for (var i=0;i<checkedResIds.length;i++) {
    		var resRecord = checkedResIds[i];
    		resIds=resIds+resRecord.data.sid+",";
		}
		var checkedSecs = secTreePanel.getStore().getUpdatedRecords();
		for (var i=0;i<checkedSecs.length;i++) {
    		var secRecord = checkedSecs[i];
    		secIds=secIds+secRecord.data.sid+",";
		}
		
		//校验必填项目
		var newRec = gridPanel.getStore().getNewRecords();
		if(gridPanel.getSelectionModel().getSelection().length>0){
		 var data=gridPanel.getSelectionModel().getSelection()[0];
         data.set('roleResources',resIds);
         data.set('roleSec',secIds);
		}
		var updateRec = gridPanel.getStore().getUpdatedRecords();
		var removeRec= gridPanel.getStore().getRemovedRecords();
		if(Sgai.util.Util.validRecords(gridPanel,newRec)&&Sgai.util.Util.validRecords(gridPanel,updateRec)){
			var store = gridPanel.getStore();	
			Sgai.util.Util.storeSync(store);
			treePanel.getStore().commitChanges();
		}
		},
		
    onButtonClickExpandAll: function(button, e, options) {
		var treePanel = button.up('#roleMainPanel').down('#roleTreePanel');
		treePanel.expandAll();
	},
	onButtonClickCollapseAll: function(button, e, options) {
		var treePanel = button.up('#roleMainPanel').down('#roleTreePanel');
		treePanel.collapseAll();
	},
	onButtonClickSecExpandAll: function(button, e, options) {
		var treePanel = button.up('#roleMainPanel').down('#secTreePanel');
		treePanel.expandAll();
	},
	onButtonClickSecCollapseAll: function(button, e, options) {
		var treePanel = button.up('#roleMainPanel').down('#secTreePanel');
		treePanel.collapseAll();
	}
});