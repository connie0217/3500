Ext.define('Sgai.controller.su.res.ResourceController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Sgai.util.Util'
    ],

    views: [
        'Sgai.view.su.res.ResourceView'
    ],

    stores: [
            'Sgai.store.su.res.ResourceStore'
    ],

    refs: [

		{
		    ref: 'resourceView',
		    selector: 'resourceView'
		}
        
    ],
	init: function(application) {
	    this.control({
	    	"resourceView treepanel button#btnResourceSave": {
            	click: this.onButtonClickSave
	        },
	        "resourceView treepanel button#btnResourceAddNode": {
            	click: this.onButtonClickAdd
	        },
	        "resourceView treepanel button#btnResourceDelNode": {
            	click: this.onButtonClickDelete
	        },
	        "resourceView treepanel button#btnResourceExpandAll": {
            	click: this.onButtonClickExpandAll
	        },
	        "resourceView treepanel button#btnResourceCollapseAll": {
            	click: this.onButtonClickCollapseAll
	        }
	    });
	},
	
	onButtonClickDelete: function(button, e, options) {
		var treePanel = button.up('#resourceTreePanel');
		var record = treePanel.getSelectionModel().lastSelected;
		if (record.hasChildNodes()) {
        	Ext.MessageBox.show({
			    title:translations.operateMsgWinTitle,
			    msg:translations.hasChildCanNotDel,
			    buttons:Ext.Msg.OK,
			    icon:Ext.MessageBox.INFO
			});
        } else {
        	var jsonArray = [];
			jsonArray.push(record.data);
			if (jsonArray.length > 0) {
				var list = Ext.encode(jsonArray);
        		Ext.Msg.confirm('操作提示', '是否确定删除所选的记录？', function(btn) {
					if (btn == 'yes') {
						record.remove();	
						var url = "system/resources/destroy.action";
						Sgai.util.Util.postAjaxRequestByJsonData(url,
								list, false, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '删除成功！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									var _store = treePanel.getStore();
									_store.reload();
								}, function() {
									Ext.MessageBox.show({
												title : '操作提示',
												msg : '删除失败！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
									var _store = treePanel.getStore();
									_store.reload();
								}, null);
					}
				});
			}
        }
	},
	
	onButtonClickAdd: function(button, e, options) {

		var treePanel = button.up('#resourceTreePanel');
		var record = treePanel.getSelectionModel().lastSelected;

		if (!Ext.isEmpty(record)) {
			if (!record.isExpanded()) {
				treePanel.expandNode(record);
			}
			if (record.data.resLevel==0) {//根节点添加子节点
        		var resModel = new Sgai.model.su.res.ResourceModel({
            		sid:'',
            		resId:'',
            		resName:'',
            		resType:1,
            		resLevel:1,
            		parentSid:1
            	});
            	resModel.store=record.store;
            	record.appendChild(resModel);
        	} else { //子节点添加子节点
            	var resModel = new Sgai.model.su.res.ResourceModel({
            		sid:'',
            		resId:'',
            		resName:'',
            		resType:'1',
            		resLevel:record.data.resLevel +1,
            		parentSid:record.data.sid
            	});
            	record.appendChild(resModel);
        	}
		}
	},
	
	onButtonClickSave: function(button, e, options) {
	    
		var gridPanel = button.up('#resourceTreePanel');
		//校验必填项目
		
		var newRec = gridPanel.getStore().getNewRecords();
		var updateRec = gridPanel.getStore().getUpdatedRecords();
		var removeRec= gridPanel.getStore().getRemovedRecords();
		var isValidNew = this.validRecords(newRec);
		var isValidUpdate = this.validRecords(updateRec);
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
			        var store = gridPanel.getStore();	
//			        var params = {
//			        	action:'create'
//			        };			
//			        store.proxy.extraParams=params;
			        store.sync({
				       success:function(batch, options) {   		
				       		Sgai.util.Util.showTipMsg(translations['operateSuccess']);
				       		var _store = gridPanel.getStore();
							_store.reload();
				       },
				       failure:function(batch, options) {
				       		var errMsg = "";
				       		for (var i=0;i<batch.exceptions.length;i++)
				       		{
				       			//var error = batch.exceptions[i].error;  //不知为啥取不到，暂时先写死了
				       			var error = 'resIdExist';
				       			for (var j=0;j<batch.exceptions[i].records.length;j++) {
					       			var resId = batch.exceptions[i].records[i].data.resId;
					       			var resName = batch.exceptions[i].records[i].data.resName;
					       			var args = resId + "-" + resName;
					       			errMsg = errMsg + args + "::" + eval(("translations." + error)) + "<br/>";	
				       			}
				       		}

				       		Sgai.util.Util.showErrorMsg(errMsg);
				       		var _store = gridPanel.getStore();
							_store.reload();
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
				if (Ext.String.trim(record.data.resId)=="") {
					return false;
				}
				if (Ext.String.trim(record.data.resName)=="") {
					return false;
				}
			}
			return true;
	},
	
	onButtonClickExpandAll: function(button, e, options) {
		var treePanel = button.up('#resourceTreePanel');
		treePanel.expandAll();
	},
	onButtonClickCollapseAll: function(button, e, options) {
		var treePanel = button.up('#resourceTreePanel');
		treePanel.collapseAll();
	}
});