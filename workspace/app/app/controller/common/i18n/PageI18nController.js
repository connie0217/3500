Ext.define('Sgai.controller.common.i18n.PageI18nController', {
    extend: 'Ext.app.Controller',
	
    requires: [
        'Sgai.util.Util'
    ],
    
    views: [
    	'common.i18n.PageI18nView'
    ],

    stores: [
        'Sgai.store.common.i18n.PageI18nStore'
    ],

    refs: [ {
		ref: 'pageI18nView',
		selector: 'pageI18nView'
    	}
    ],
    
	init: function(application) {
	   this.control(
		   {
			   	"pageI18nView grid button#btnQuery": {
		            click: this.onButtonClickQuery
		        },
		        "pageI18nView grid button#btnReset": {
		            click: this.onButtonClickReset
		        },
		        "pageI18nView grid button#btnNew": {
		            click: this.onButtonClickNew
		        },
		        "pageI18nView grid button#btnSave": {
		            click: this.onButtonClickSave
		        },
		        "pageI18nView grid actioncolumn#delRec": {
		            click: this.onImgaeClickDel
		        }
		   }
	   )	
	},
	
	onButtonClickQuery: function(button, e, options) {
		//Ext.ComponentQuery.query('#pageI18nPanel form#')
        var formPanel = button.up('#pageI18nPanel').down('#formPanel');
        //console.log('formPanel:' + formPanel);
        var gridPanel = button.up('#gridPanel');
        //console.log('gridPanel:' + gridPanel);

        var i18nKey = formPanel.down('textfield[itemId=qm.i18nKey]').getValue();
        //console.log('i18nKey:' + i18nKey);
        var i18nValue = formPanel.down('textfield[itemId=qm.i18nValue]').getValue();
        var language = formPanel.down('combo[itemId=qm.language]').getValue();
        //console.log('language:' + language);
        //设置提交参数
        var store = gridPanel.getStore();
        var pagingToolbarPanel = formPanel.up('#pageI18nPanel').down('#pagingToolbarPanel');
        var pagingToolbar = pagingToolbarPanel.down('#pagingToolbar');

        var params = {
        	action:'read',
         	start:0,
         	limit:pagingToolbar.pageSize,
         	'qm.i18nKey':i18nKey,
         	'qm.i18nValue':i18nValue,
         	'qm.language':language
        };
        store.pageSize=pagingToolbar.pageSize;
        store.proxy.extraParams=params;
        
		pagingToolbar.store = store;
        store.load({
	               
        });          
    },
    
    onButtonClickReset: function(button, e, options) {
        button.up('#pageI18nPanel').down('#formPanel').getForm().reset();
    },
    
    onButtonClickNew:function(button) {
    	var rec = new Sgai.model.common.i18n.PageI18nModel({
            sid: '',
            i18nKey: '',
            i18nValue:'',
            language:'zh_CN',
            delFlag: 1
        });
        var gridPanel = button.up('gridpanel');
        gridPanel.getStore().insert(0, rec);
        var cellEditing = gridPanel.getPlugin('cellEditing');        

        cellEditing.startEditByPosition({
            row: 0, 
            column: 0
        });
    },
	
    onButtonClickSave: function(button, e, options) {
        
        var gridPanel = button.up('#gridPanel');
        
        //校验必填项目
        
        var newRec = gridPanel.getStore().getNewRecords();
        var updateRec = gridPanel.getStore().getUpdatedRecords();
        var removeRec= gridPanel.getStore().getRemovedRecords();
        
        var isValidNew = this.validRecords(newRec);
        var isValidUpdate = this.validRecords(updateRec);
        if (!isValidNew||!isValidUpdate) {
        	Ext.MessageBox.show({
			    title:translations.errMsgWinTitle,
			    msg:translations.notAllInputTip,
			    buttons:Ext.Msg.OK,
			    icon:Ext.MessageBox.ERROR,
			    animEl:'gridPanel'
			});
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
			        var store = gridPanel.getStore();			
			        var params = {
			        	action:'create'
			        };			
			        store.proxy.extraParams=params;			        
			        store.sync({
					   success:function(batch, options) {
				       	  	Ext.MessageBox.show({
							    title:translations.operateMsgWinTitle,
							    msg:translations.operateSuccess,
							    buttons:Ext.Msg.OK,
							    icon:Ext.MessageBox.INFO
							});
				       },
				       failure:function(batch, options) {
				       		var errMsg = "";
				       		for (var i=0;i<batch.exceptions.length;i++)
				       		{
				       			var error = batch.exceptions[i].error;
				       			for (var j=0;j<batch.exceptions[i].records.length;j++) {
					       			var i18nKey = batch.exceptions[i].records[j].data.i18nKey;
					       			errMsg =  errMsg + i18nKey + "::" + eval(("translations." + error)) + "<br/>";
				       			}
				       		}
				       		Ext.MessageBox.show({
							    title:translations.errMsgWinTitle,
							    msg:errMsg,
							    maxWidth:360,
							    buttons:Ext.Msg.OK,
							    icon:Ext.MessageBox.ERROR
							});	
				       }				           
			        }); 
                }
            }
         );         
    },
    
    validRecords:function(vRecords) {
    	if (vRecords=="") {
    		return true;
    	}

    	for (var i=0;i<vRecords.length;i++) {
    		var record = vRecords[i];
    		if (Ext.String.trim(record.data.i18nKey)=="") {
    			return false;
    		}
    		if (Ext.String.trim(record.data.i18nValue)=="") {
    			return false;
    		}
    	}
    	return true;
    },
    
    onImgaeClickDel: function(grid, e, rowIndex){
        grid.getStore().removeAt(rowIndex);
    }
    
});