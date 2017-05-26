Ext.define('Sgai.controller.common.commonType.CommonTypeController', {
    extend: 'Ext.app.Controller',
	
    requires: [
        'Sgai.util.Util'
    ],
    
    views: [
    	'Sgai.view.common.commonType.CommonTypeView'
    ],

    stores: [
        'Sgai.store.common.commonType.CommonTypeStore',
        'Sgai.store.common.commonType.CommonTypeItemStore'
    ],

    refs: [ {
		ref: 'commonTypeView',
		selector: 'commonTypeView'
    	}
    ],
    
	init: function(application) {
		this.control(
			{
				"commonTypeView grid button#btnQuery": {
		            click: this.onButtonClickQuery
		    },
		    	"commonTypeView grid button#btnReset": {
		            click: this.onButtonClickReset
		    },
		    	"commonTypeView grid button#btnNew": {
		            click: this.onButtonClickNew
	        },
		        "commonTypeView grid button#btnSave": {
		            click: this.onButtonClickSave
	        },
		        "commonTypeView grid actioncolumn#delRec": {
		            click: this.onImgaeClickDel
	        },
		       "commonTypeView grid button#btnNewItem": {
		            click: this.onButtonClickNewItem
	        },
		        "commonTypeView grid button#btnSaveItem": {
		            click: this.onButtonClickSaveItem
	        },
	        	"commonTypeView grid button#btnQueryItem": {
		            click: this.onButtonClickQueryItem
		    }
			}
		)
	},
	/*查询公共类型*/
	onButtonClickQuery: function(button, e, options) {
	    var formPanelMain = button.up('#commonTypePanel').down('#formPanelMain');
	    var gridpanelMain = button.up('#gridpanelMain');
	    var typeId = formPanelMain.down('textfield[itemId=typeId]').getValue();
	    var typeName = formPanelMain.down('textfield[itemId=typeName]').getValue();
	    //设置提交参数
	    var store = gridpanelMain.getStore();
	    var pagingToolbarPanel = formPanelMain.up('#commonTypePanel').down('#pagingToolbarPanel');
	    var pagingToolbar = pagingToolbarPanel.down('#pagingToolbar');
	
	    var params = {
	    	action:'read',
	     	start:0,
	     	limit:pagingToolbar.pageSize,
	     	'qm.typeId':typeId,
	     	'qm.typeName':typeName
	    };
	   /* Sgai.util.Util.postAjaxRequestByParams('md/common-type!read.action',params,false)*/
	    store.pageSize=pagingToolbar.pageSize;
	    store.proxy.extraParams=params;
	    
		pagingToolbar.store = store;
	    store.load({
	    });          
	},
	
	/*刷新公共类型子项*/
	onButtonClickQueryItem: function(button, e, options) {
	    var gridpanelItem = button.up('#gridpanelItem');
	    var data=Ext.getCmp('gridpanelMainId').getSelectionModel().getSelection()[0]; 
	    var typeSid = data.get('sid');
	    //设置提交参数
	    var store = gridpanelItem.getStore();
	
	    var params = {
	    	action:'read',
	     	start:0,
	     	limit:1000,
	     	'qm.typeSid':typeSid
	    };
	    store.proxy.extraParams=params;
	    store.load({
	    });          
	},
	
	/*重置查询条件*/
	onButtonClickReset: function(button, e, options) {
        button.up('#commonTypePanel').down('#formPanelMain').getForm().reset();
    },
    /*新建公用类型*/
    onButtonClickNew:function(button) {
    	var rec = new Sgai.model.common.commonType.CommonTypeModel({
            sid: '0',
            typeId: '',
            typeName:'',
            typeDesc:'',
            delFlag: 1
        });
        var gridpanelMain = button.up('#gridpanelMain');
        gridpanelMain.getStore().insert(0, rec);
        var cellEditing = gridpanelMain.getPlugin('cellEditing');        

        cellEditing.startEditByPosition({
            row: 0, 
            column: 0
        });
    },
    /*保存公共类型*/
    onButtonClickSave: function(button, e, options) {
        
        var gridpanelMain = button.up('#gridpanelMain');
        //校验必填项目
        var newRec = gridpanelMain.getStore().getNewRecords();
        var updateRec = gridpanelMain.getStore().getUpdatedRecords();
        var removeRec= gridpanelMain.getStore().getRemovedRecords();
        var isValidNew = this.validRecords(newRec);
        var isValidUpdate = this.validRecords(updateRec);
        if (!isValidNew||!isValidUpdate) {
        	Sgai.util.Util.showErrorMsg(translations.notAllInputTip);
        	return;
        }

        //提交确认
        Ext.Msg.confirm (
            translations.operateMsgWinTitle,
            translations.operateConfirm,
            function (btn)
            {
                if (btn == 'no') {
                	return;
                } else {
                	//设置提交参数
			        var store = gridpanelMain.getStore();			
			        var params = {
			        	action:'create'
			        };			
			        store.proxy.extraParams=params;			        
			        store.sync({
					   success:function(batch, options) {
				       	  		Sgai.util.Util.showTipMsg(translations['operateSuccess']);
				       },
				       failure:function(batch, options) {
				       		var errMsg = "";
				       		for (var i=0;i<batch.exceptions.length;i++)
				       		{
				       			var error = batch.exceptions[i].error;
				       			for (var j=0;j<batch.exceptions[i].records.length;j++) {
					       			var typeId = batch.exceptions[i].records[j].data.typeId;
					       			errMsg =  errMsg + typeId + "::" + eval(("translations." + error)) + "<br/>";
				       			}
				       		};
				       		Sgai.util.Util.showErrorMsg(errMsg);
				       }
			        }); 
			         gridpanelMain.getStore().reload();
                }
            }
         );  
    },
    
    /*单行删除*/				       
    onImgaeClickDel: function(grid, e, rowIndex){
        grid.getStore().removeAt(rowIndex);
   	},
   	
   	/*新建子项*/
    onButtonClickNewItem:function(button) {
    	var data = Ext.getCmp('gridpanelMainId').getSelectionModel().getSelection()[0];
    	var typeSid = data.get('sid');
    	var rec = new Sgai.model.common.commonType.CommonTypeItemModel({
            sid: '0',
            typeSid: typeSid,
            itemId: '',
            itemName:'',
            delFlag: 1
        });
        var gridpanelItem = button.up('#gridpanelItem');
        gridpanelItem.getStore().insert(0, rec);
        var cellEditing = gridpanelItem.getPlugin('cellEditing');        

        cellEditing.startEditByPosition({
            row: 0, 
            column: 0
        });
    },
    
      /*保存子项*/
    onButtonClickSaveItem: function(button, e, options) {
        
        var gridpanelItem = button.up('#gridpanelItem');
        //校验必填项目
        var newRec = gridpanelItem.getStore().getNewRecords();
        var updateRec = gridpanelItem.getStore().getUpdatedRecords();
        var removeRec= gridpanelItem.getStore().getRemovedRecords();
        var isValidNew = this.validRecords1(newRec);
        var isValidUpdate = this.validRecords1(updateRec);
        if (!isValidNew||!isValidUpdate) {
        	Sgai.util.Util.showErrorMsg(translations['notAllInputTip']);
        	return;
        }

        //提交确认
        Ext.Msg.confirm (
            translations.operateMsgWinTitle,
            translations.operateConfirm,
            function (btn)
            {
                if (btn == 'no') {
                	return;
                } else {
                	//设置提交参数
			        var store = gridpanelItem.getStore();
			        
			        var params = {
			        	action:'create'
			        };			
			        store.proxy.extraParams=params;	
			        store.sync({
					   success:function(batch, options) {
				       	  	Sgai.util.Util.showTipMsg(translations['operateSuccess']);
				       },
				       failure:function(batch, options) {
				       		var errMsg = "";
				       		for (var i=0;i<batch.exceptions.length;i++)
				       		{
				       			var error = batch.exceptions[i].error;
				       			for (var j=0;j<batch.exceptions[i].records.length;j++) {
					       			var itemId = batch.exceptions[i].records[j].data.itemId;
					       			errMsg =  errMsg + itemId + "::" + eval(("translations." + error)) + "<br/>";
				       			}
				       		}
				       		Sgai.util.Util.showErrorMsg(errMsg);
				       }
			        }); 
                }
            }
         );   
    },
    
   	/*校验*/
   	validRecords1:function(vRecords) {
    	if (vRecords=="") {
    		return true;
    	}

    	for (var i=0;i<vRecords.length;i++) {
    		var record = vRecords[i];
    		if (Ext.String.trim(record.data.itemId)=="") {
    			return false;
    		}
    		if (Ext.String.trim(record.data.itemName)=="") {
    			return false;
    		}
    	}
    	return true;
    },
    
       	/*校验*/
   	validRecords:function(vRecords) {
    	if (vRecords=="") {
    		return true;
    	}

    	for (var i=0;i<vRecords.length;i++) {
    		var record = vRecords[i];
    		if (Ext.String.trim(record.data.typeId)=="") {
    			return false;
    		}
    		if (Ext.String.trim(record.data.typeName)=="") {
    			return false;
    		}
    	}
    	return true;
    }
	
});