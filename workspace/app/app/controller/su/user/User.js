Ext.define('Sgai.controller.su.user.User', {
	extend : 'Ext.app.Controller',
	requires : [ 'Sgai.util.Util'],
	views : ['su.user.User'],
	stores : [ 'su.user.User' ,'su.securityRole.SecurityRole'],
	refs : [ 
	       {
	          ref:'main',
	          selector:'user'
	       },
	       {    ref : 'maingrid',
				selector : 'user grid#userGridPanel'
			}
	
	],
init: function(application) {
    this.control({
       "user":{
       	  beforedestroy:this.beforedestroy
       },
       "user grid#userGridPanel":{
         beforeedit:this.beforeGridEdit
       },
       
        "user  button#btnQuery": {
            click: this.onButtonClickQuery
        },
        "user  button#btnReset": {
            click: this.onButtonClickReset
        },
        "user  button#delRec": {
            click: this.onButtonClickRemove
        },
        "user  button#btnNew": {
            click: this.onButtonClickNew
        },
        "user  button#btnSave": {
        	click: this.onButtonClickSave
        },
        "user  button#resetPassword":{
            click:this.resetPassword
        }
    });
   },
   resetPassword:function(button){
   	    var gridPanel = button.up('#userGridPanel');
   	    var store = gridPanel.getStore();  
   	    var sels = gridPanel.getSelectionModel().getSelection();
   	     Ext.Msg.confirm(
            '操作提示',
            '是否确定将所选用户的密码重置为【123456】吗？',
            function (btn){
                if (btn == 'yes'){
                	var arr=new Array();
                	 for(var i=0;i<sels.length;i++){
                	 	var rec=sels[i];
                        rec.set("password",'123456');
                        arr.push(rec.data);
                	 }
                Ext.Ajax.request({
				method : 'POST',
				url : 'system/user/updatepasswords.action',
				params:{
					jsonStr:Ext.JSON.encode(arr)
				},
				success:function(response){
	   	  			var reText = response.responseText;
    				if (reText == "")
    					return;
    				var text = Ext.decode(reText);
    				var msg = text.message;
    				if (text.success) {
    					Ext.Msg.alert("恭喜", "密码重置成功！");
    					store.reload();
    				} else {
    					Ext.Msg.alert("重置失败！", msg);
	   	  			}
		          },
                  failure:function (response)
                  {
                	  Sgai.util.Util.showErrorMsg("重置失败!");
                  }
    	});
                }
            });
   },   
   beforeGridEdit:function(editor, e, eOpts){
   	var record=e.record;
   	  if(e.colIdx==2 && record.get('sid')!=null && record.get('sid')!=0  ){
   	     	Sgai.util.Util.showTipMsg('人员代码不允许修改!');
   	     	return false;
   	  }
   	  if( e.colIdx==3&& record.get('sid')!=null && record.get('sid')!=0 ){
   	  	 Sgai.util.Util.showTipMsg('密码修改请使用页面右上方【修改密码】功能!');
    	 return false;
   	  }
   },
     beforedestroy:function(){
     	var me=this;
    	me.getMaingrid().getStore().removeAll();
    },
	onButtonClickReset: function(button, e, options) {
		button.up('#userMainPanel').down('#userQueryPanel').getForm().reset();
     },
    onButtonClickRemove: function(button, e, options) {   
        var gridPanel = button.up('#userGridPanel');
        var store = gridPanel.getStore();  
        var sels = gridPanel.getSelectionModel().getSelection();
        if(sels.length===0){
        	Sgai.util.Util.showTipMsg('请选择需要删除的记录!');
        	return;
        }
        Ext.Msg.confirm
        (
            '操作提示',
            '是否确定删除所选的' + sels.length + '条记录？',
            function (btn)
            {
                if (btn == 'yes')
                {
                    var jsonArray = [];
                    var url = 'system/user/destroy.action';
                    Ext.each(sels, function(item) {
						jsonArray.push(item.data);
					});
                    var userlist = Ext.encode(jsonArray);
                    var params = {
						'userlist' : userlist
					};
					Ext.Ajax.request({
								url : url,
						method : 'post',
						params : params,
						success : function(response, options) {
							store.reload({});
						},
						failure : function(response, options) {
						}
					});
                }
            }
        )
	},
	onButtonClickNew:function(button) {
    	var rec = Ext.create('Sgai.model.su.user.User'); 
        var gridPanel = button.up('#userGridPanel');
        gridPanel.getStore().insert(0, rec);
    },
	onButtonClickQuery : function(button, e, options) {
		var formPanel = button.up('#userMainPanel').down('#userQueryPanel');
        var gridPanel = button.up('#userGridPanel');
        //设置提交参数
        var params = Sgai.util.Util.getFormParams(formPanel);
        var store = gridPanel.getStore();  
        store.proxy.extraParams=params;
         store.loadPage(1);
	},
	
      onButtonClickSave: function(button, e, options) {
  		var gridPanel = button.up('#userGridPanel');
  		var roleTreePanel=button.up('#userMainPanel').down('treepanel');
  		var securityRoles="";
		var checkedRoleRecords = roleTreePanel.getStore().getUpdatedRecords();
		for (var i=0;i<checkedRoleRecords.length;i++) {
    		var roleRecord = checkedRoleRecords[i];
    		if(roleRecord.data.depth===2){
    			securityRoles=securityRoles+roleRecord.data.sid+",";
    		}
		}
  		//校验必填项目
  		var newRec = gridPanel.getStore().getNewRecords();
  		if(gridPanel.getSelectionModel().getSelection().length>0){
			 var data=gridPanel.getSelectionModel().getSelection()[0];
	         data.set('userSecurityRoles',securityRoles);
			}
		//校验必填项目
		var newRec = gridPanel.getStore().getNewRecords();
		var updateRec = gridPanel.getStore().getUpdatedRecords();
		if(newRec.length===0 && updateRec.length===0){
		   Sgai.util.Util.showTipMsg('没有需要提交修改的记录，请确认!');
		   return;
		}
		var removeRec= gridPanel.getStore().getRemovedRecords();
		if(Sgai.util.Util.validRecords(gridPanel,newRec)&&Sgai.util.Util.validRecords(gridPanel,updateRec)){
				var store = gridPanel.getStore();			
				Sgai.util.Util.storeSync(store);
				roleTreePanel.getStore().commitChanges();
		  }
					    	
  		}
 });