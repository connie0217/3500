Ext.define('Sgai.controller.su.grid.GridSet', {
	extend : 'Ext.app.Controller',

	requires : [ 'Sgai.util.Util'],

	views : ['su.grid.GridSet'],

	stores : [ 'su.grid.GridSet',
	           'su.grid.ColumnSet'],

	refs : [
	],
init: function(application) { //toolbar 定义按钮的使用
    this.control({
        "gridSet  button#btnQuery": {
            click: this.onButtonClickQuery
        },
        "gridSet  button#btnReset": {
            click: this.onButtonClickReset
        },
        "gridSet  button#delRec": {
            click: this.onButtonClickRemove
        },
        "gridSet  button#btnNew": {
            click: this.onButtonClickNew
        },
        "gridSet  button#btnSave": {
        	click: this.onButtonClickSave
        },
        "gridSet  button#btnNewColumn" : {
			click : this.onButtonColumnNew
		},
		"gridSet button#btnUpdateColumn":{
			click: this.onButtonColumnSave
		},
		"gridSet button#btnDeleteColumn":{
			click: this.onButtonColumnDel
		}
        
    });

},


onButtonColumnNew:function(){
	var columnPanel = Ext.getCmp('columnGridPanel');
	var gridPanel = Ext.getCmp('gridGridPanel');
	data = Ext.getCmp('gridGridPanel')
	.getSelectionModel()
	.getSelection()[0];
	var rec = new Sgai.model.su.grid.ColumnSet({
		sid: '',
	    position:columnPanel.getStore().getCount()+1,
		gridSid :  data.get('sid') , //获得gridGridPanle中被选中的sid
		dataIndex : '',
		text : '',
		width : '',
		hiddenFlag : 0,
		sortFlag : 0,
		renderer : ''
	});
	columnPanel.getStore().insert(columnPanel.getStore().getCount(), rec);
},
onButtonColumnSave:function(){
	var columnPanel = Ext.getCmp('columnGridPanel'); 
	var columnStore=columnPanel.getStore();
	var newRec = columnStore.getNewRecords();
	var  newOrUpdate=columnStore.getModifiedRecords();
	var updateRec = columnStore.getUpdatedRecords();
	var removeRec= columnStore.getRemovedRecords();
	//添加新增了修改的方法
			var isValidNew = this.validRecords(newOrUpdate);
			if (!isValidNew){
				Ext.MessageBox.show({
				    title:translations.errMsgWinTitle,
				    msg:translations.notAllInputTip, //提示未完全输入
				    buttons:Ext.Msg.OK,
				    icon:Ext.MessageBox.ERROR,
				    animEl:'gridGridPanel'
				});
     			return;
			}	
  			 var params = {
  			        	action:'create'
  			     };			
  	       columnStore.proxy.extraParams=params;
  	     columnStore.sync({
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
			       			//var error = batch.exceptions[i].error;  //不知为啥取不到，暂时先写死了
			       			var error = 'pinExist';
			       			for (var j=0;j<batch.exceptions[i].records.length;j++) {
				       			var resId = batch.exceptions[i].records[i].data.resId;
				       			var resName = batch.exceptions[i].records[i].data.resName;
				       			var args = resId + "-" + resName;
				       			errMsg = errMsg + args + "::" + eval(("translations." + error)) + "<br/>";	
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

},

onButtonClickReset: function(button, e, options) {
Ext.getCmp('gridQueryPanel').getForm().reset();
 },
onButtonClickRemove: function(button, e, options) { 
	//alert("点击删除");
    var gridPanel = Ext.getCmp('gridGridPanel');
    var store = gridPanel.getStore();  
    var sel = gridPanel.getSelectionModel().getSelection()[0];
    Ext.Msg.confirm
    (
        '操作提示',
        '是否确定删除所选的记录？',
        function (btn)
        {
            if (btn == 'yes')
            {
            	 var list=sel.columnListStore;
                //将store中的被选中的记录取出，查看columnList的长度是否大于0，如果大于0提醒。
            	if(list.data.length==0){
                    store.remove(sel);     //调用 Store 的 remove 方法
                    store.sync({
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
                });
            	}else{
            		 Ext.MessageBox.show
                     ({
                         title:'操作提示',
                         msg:'此表存在列，如需删除，请先删除列！',
                         buttons:Ext.MessageBox.OK,
                         icon:Ext.MessageBox.ERROR
                     });
            	}
             
            }
        }
    )
}
,
onButtonColumnDel: function(button, e, options) { 
    var gridPanel = Ext.getCmp('columnGridPanel');
    var store = gridPanel.getStore();  
    var sels = gridPanel.getSelectionModel().getSelection();
    Ext.Msg.confirm
    (
        '操作提示',
        '是否确定删除所选的记录？',
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
}
,
onButtonClickNew:function(button) {
   var rec = new Sgai.model.su.grid.GridSet({
        sid: '',
	    gridId: '',
	    gridDesc:'',
	    gridType:'',
	    queryType:''
    });
    var gridPanel = Ext.getCmp('gridGridPanel');
    gridPanel.getStore().insert(0, rec);
    var cellEditing = gridPanel.getPlugin('gridCellEditing');        

    cellEditing.startEditByPosition({
        row: 0, 
        column: 0
    });
},


onButtonClickQuery : function(button, e, options) {
	var formPanel = Ext.getCmp('gridQueryPanel');
	var gridPanel = Ext.getCmp('gridGridPanel');
	var store = gridPanel.getStore();
	var IfieldName = formPanel.query('textfield');
	var params = '';

	for ( var i = 0; i < IfieldName.length; i++) {
		paramName = IfieldName[i].getItemId();
		if (paramName.indexOf('-') != -1) {
			continue;
		}
		paramValue = IfieldName[i].getValue();
		if (paramValue == undefined) {
			paramValue = ''
		}
		params = params + '\"' + paramName + '\":\'' + paramValue + '\',';
	}
	
	
    var pagingToolbarPanel = Ext.getCmp('gridMainPanel').down('#pagingToolbarPanel');
    var pagingToolbar = pagingToolbarPanel.down('#pagingToolbar');
    store.pageSize=pagingToolbar.pageSize;
    params = params + '\"' + paramName + '\":\'' + paramValue + '\',';
	params = params + '\"limit\":\''+ pagingToolbar.pageSize+'\',';
	params = params + '\"action\":\'read\',';
	params = params + '\"start\":\'0\'';
	params = '({' + params + '})';
	params = eval(params);
	store.load({
		params : params
	});

	store.on('beforeload', function(store, options) {
		Ext.apply(store.proxy.extraParams, params);
	});
},

validRecords:function(vRecords) {
  if (vRecords=="") {
	return true;
   }
  for (var i=0;i<vRecords.length;i++) {
	var record = vRecords[i];
	var textFlag=record.data.text==""||record.data.text=="NaN";
	var dataIndexFlag=record.data.dataIndex==""||record.data.dataIndex=="NaN";
	var widthFlag=record.data.width==""||record.data.width=="NaN";
	var rendererFlag=record.data.renderer==""||record.data.renderer=="NaN";
	
	if (textFlag||dataIndexFlag||widthFlag||rendererFlag) {
		return false;
	}
	
  }
   return true;
  },
  validGridRecords:function(vRecords) { //对创建表的校验
	  if (vRecords=="") {
		return true;
	   }

	  for (var i=0;i<vRecords.length;i++) {
		var record = vRecords[i];
		var gridIdFlag=record.data.gridId==""||record.data.gridId=="NaN";
		var gridDescFlag=record.data.gridDesc==""||record.data.gridDesc=="NaN";
		var gridTypeFlag=record.data.gridType==""||record.data.gridType=="NaN";
		if (gridIdFlag||gridDescFlag||gridTypeFlag) {
			return false;
		}
	  }
	   return true;
	  },
	 
	  onButtonClickSave: function(button, e, options) {
	//alert('创建');
		var gridPanel = Ext.getCmp('gridGridPanel'); //得到grid
//		var securityRoleselector=Ext.getCmp('securityRoleselector');
//	var securityRoles="";
//	var checkeds = securityRoleselector.getValue();
//	for (var i=0;i<checkeds.length;i++) {
//		var record = checkeds[i];
//		securityRoles=securityRoles+record+",";
//	} 
//		//校验必填项目  
		var newRec = gridPanel.getStore().getNewRecords();
//		if(gridPanel.getSelectionModel().getSelection().length>0){
//		 var data=gridPanel.getSelectionModel().getSelection()[0];
//         data.set('userSecurityRoles',securityRoles);
//		}
		var updateRec = gridPanel.getStore().getUpdatedRecords();
		var removeRec= gridPanel.getStore().getRemovedRecords();
		var isValidNew = this.validGridRecords(newRec);
		var isValidUpdate = this.validGridRecords(updateRec);
		if (!isValidNew||!isValidUpdate) {
			Ext.MessageBox.show({
			    title:translations.errMsgWinTitle,
			    msg:translations.notAllInputTip, //提示未完全输入
			    buttons:Ext.Msg.OK,
			    icon:Ext.MessageBox.ERROR,
			    animEl:'gridGridPanel'
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
			       // store.sync();
			        var params = {
			        	action:'create'
			        };			
			        store.proxy.extraParams=params;

			        store.sync(
			        	{
				       success:function(batch, options) {
				    	   store.load();
				       		Ext.MessageBox.show({
							    title:translations.operateMsgWinTitle,
							    msg:translations.gridColumn.columnUpdateSuccess,
							    buttons:Ext.Msg.OK,
							    icon:Ext.MessageBox.INFO
							});
				       },
				       failure:function(batch, options) {
				       		var errMsg = "";
				       		for (var i=0;i<batch.exceptions.length;i++)
				       		{
				       			//var error = batch.exceptions[i].error;  //不知为啥取不到，暂时先写死了
				       			var error = 'pinExist';
				       			for (var j=0;j<batch.exceptions[i].records.length;j++) {
					       			var resId = batch.exceptions[i].records[i].data.resId;
					       			var resName = batch.exceptions[i].records[i].data.resName;
					       			var args = resId + "-" + resName;
					       			errMsg = errMsg + args + "::" + eval(("translations." + error)) + "<br/>";	
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
}

});