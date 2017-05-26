Ext.define('Sgai.controller.su.group.Group', {
	extend : 'Ext.app.Controller',

	requires : [ 'Sgai.util.Util',
	'Ext.ux.form.ItemSelector',
	'Ext.ux.form.MultiSelect',
	'Ext.ux.ajax.SimManager'],
	views : ['Sgai.view.su.group.Group'],
	stores : [ 'Sgai.store.su.group.Group' ],
	refs : [
	        {
                ref:'delButton',
                selector:'group grid button#delRec'
            },
            {
                ref:'userselector',
                selector:'group tabpanel itemselector#userselector'
            },
            {
                ref:'roleselector',
                selector:'group tabpanel itemselector#roleselector'
            },
            {
    			ref:'maingrid',
    			selector:'group grid#groupGridPanel'
        	},
        	{
    			ref:'queryform',
    			selector:'group form#groupQueryPanel'
        	},
        	{
    			ref:'userform',
    			selector:'group tabpanel form#userQueryPanel'
        	},
        	{
    			ref:'roleform',
    			selector:'group tabpanel form#roleQueryPanel'
        	}
	],
init: function(application) {
    this.control({
    "group  button#btnQuery": {
        click: this.onButtonClickQuery
    },
    "group  button#btnReset": {
        click: this.onButtonClickReset
    },
    "group  button#delRec": {
        click: this.onButtonClickRemove
    },
    "group  button#btnNew": {
        click: this.onButtonClickNew
    },
    "group  button#btnSave": {
    	click: this.onButtonClickSave
    },
    "group grid#groupGridPanel": {
    	selectionchange: this.onSelectionchange
    },
    "group  button#btnUserQuery": {
    	click: this.onButtonClickQueryUser
    },
    "group  button#btnUserReset": {
    	click: this.onButtonClickResetUser
    },
    "group  button#btnRoleQuery": {
    	click: this.onButtonClickQueryRole
    },
    "group  button#btnRoleReset": {
    	click: this.onButtonClickResetRole
    }
    });
 },
    onButtonClickReset: function(button, e, options) {
    	this.getQueryform().getForm().reset();
     },
    onButtonClickRemove: function(button, e, options) {   
        var gridPanel = this.getMaingrid();
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
		this.getUserselector().getStore().load({});	
		this.getRoleselector().getStore().load({});	
		this.getUserselector().setValue(null);
		this.getRoleselector().setValue(null);
    	var rec = Ext.create('Sgai.model.su.group.Group'); 
        var gridPanel = button.up('#groupGridPanel');
        gridPanel.getStore().insert(0, rec);
    },
	onButtonClickQuery : function(button, e, options) {
		    var formPanel = this.getQueryform();
	        var gridPanel = this.getMaingrid();
	        //设置提交参数
	        var params = Sgai.util.Util.getFormParams(formPanel);
	        var store = gridPanel.getStore();  
	        store.proxy.extraParams=params;
	        store.load({
	        });   
	},

onButtonClickSave: function(button, e, options) {
		var gridPanel = this.getMaingrid();
		//用户选择区域
		var userselector=this.getUserselector();
		var users="";
		var checkeds = userselector.getValue();
		for (var i=0;i<checkeds.length;i++) {
	    		var record = checkeds[i];
	    		if (!Ext.isEmpty(record)) {
	    			users=users+record+",";
	    		}
		}
		//角色选择区域
		var roleselector=this.getRoleselector();
		var roles="";
		var checkeds_roles = roleselector.getValue();
		for (var i=0;i<checkeds_roles.length;i++) {
	    		var record = checkeds_roles[i];
	    		if (!Ext.isEmpty(record)) {
	    			roles=roles+record+",";
	    		}
		}
        var newRec = gridPanel.getStore().getNewRecords();
		if(gridPanel.getSelectionModel().getSelection().length>0){
			 var data=gridPanel.getSelectionModel().getSelection()[0];
	         data.set('groupUsers',users);
	         data.set('groupRoles',roles);
			}
		var updateRec = gridPanel.getStore().getUpdatedRecords();
		var removeRec= gridPanel.getStore().getRemovedRecords();
		if(Sgai.util.Util.validRecords(gridPanel,newRec)&&Sgai.util.Util.validRecords(gridPanel,updateRec)){
			var store = gridPanel.getStore();			
			Sgai.util.Util.storeSync(store);
			}
		
		},
		
	onSelectionchange:function(sm, selections) {
	    var me = this;
	    var mainGrid=this.getMaingrid();
	    
		this.getDelButton().setDisabled(selections.length == 0);
		var toUserValue=new Array();
		var toRoleValue=new Array();
		if(selections.length > 0){
					Ext.Array.clean(toUserValue);
					var selection = me.getMaingrid().getSelectionModel().getSelection(); 
					var data=selection[selection.length-1];
					var userGroupId=data.get('userGroupId');
					if(userGroupId!=null&&userGroupId!=''&&userGroupId!='null'){
							Ext.Ajax.request({
							      url: 'system/user/read.action',
							      params: {
							    	  'qm.userGroupId': userGroupId
							      },
							      success: function(response){
							    	var text = response.responseText;
								        var reText = Ext.decode(response.responseText).data;
								        toUserValue=new Array();
										for (var i=0;i<reText.length;i++) {
											toUserValue.push(reText[i].sid);
										}
								       mainGrid.toUserValue=toUserValue;
							          me.getUserselector().setValue(toUserValue);
							      },
							      failure: function(response) {
							          Sgai.util.Util.showErrorMsg(response.responseText);
							      }
							  }); 
								Ext.Ajax.request({
					                  url: 'system/role/read.action',
					                  params: {
					                	  'qm.userGroupId': userGroupId
					                  },
					                  success: function(response){
						                	var text = response.responseText;
						      		        var reText = Ext.decode(response.responseText).data;
						      		        toRoleValue=new Array();
						      				for (var i=0;i<reText.length;i++) {
						      					toRoleValue.push(reText[i].sid);
						      				}
						      				mainGrid.toRoleValue=toRoleValue;
						      				me.getRoleselector().setValue(toRoleValue);
					                  },
					                  failure: function(response) {
					                      Sgai.util.Util.showErrorMsg(response.responseText);
					                  }
					              }); 
        
			           }

	        }else{
	        	me.getUserselector().setValue(null);
	        	me.getRoleselector().setValue(null);
			}
		},

		onButtonClickQueryUser : function(button, e, options) {
//			var store = Ext.create('Sgai.store.su.user.User');
//			var mainGrid=this.getMaingrid();
//			var formPanel = this.getUserform();
//			 //设置提交参数
//		    var params = Sgai.util.Util.getFormParams(formPanel);
//		    store.proxy.extraParams=params;
//		    var userselector = this.getUserselector();
//		    userselector.store= store;
//		    store.load();   
//		    userselector.bindStore(store);
//		    userselector.setValue(mainGrid.toUserValue);
			 var userselector = this.getUserselector();
			 var fromList=userselector.fromField.boundList;
			 var fromStore=fromList.getStore();
			 var toList=userselector.toField.boundList;
			 var toStore=toList.getStore();
			  
			 var store = Ext.create('Sgai.store.su.user.User');
			 var formPanel = this.getUserform();
			 var params = Sgai.util.Util.getFormParams(formPanel);
			 //store.proxy.extraParams=params;	
			//params['qm.userGroupId']=userGroupId;
			        Ext.Ajax.request({
							      url: 'system/user/read.action',
							      params: params,
							      success:function(response){
							    	   var text = response.responseText;
								       var reText = Ext.decode(text).data;
								       fromStore.removeAll();
								       var datas= toStore.data.items;
								       for(var j=0;j<reText.length;j++){
								       	    var  re=reText[j];
								            for(var i=0;i<datas.length;i++){
								            	if(re.pin===datas[i].get('pin')){
								            	   Ext.Array.remove(reText,re);//reText.remove(datas[i]);
								            	}
								            }
								       }
								  
								       fromStore.add(reText);
							         }
							      });
			 
//			  params['qm.pageSize']=1000;
//			 store.load({
//			 params:params,
//			 callback:function(records){
//			       fromStore.removeAll();
//	               fromStore.add(records);
//			   }}); 
		},
		onButtonClickResetUser : function(button, e, options) {
		    this.getUserform().getForm().reset();
		},
		onButtonClickQueryRole : function(button, e, options) {
//			var mainGrid=this.getMaingrid();
//			var store = Ext.create('Sgai.store.su.role.Role');
//			var formPanel = this.getRoleform();
//			 //设置提交参数
//		    var params = Sgai.util.Util.getFormParams(formPanel);
//		    store.proxy.extraParams=params;
         // var roleselector = this.getRoleselector();
//		    roleselector.store= store;
//		    store.load();   
//		    roleselector.bindStore(store);
//			roleselector.setValue(mainGrid.toRoleValue);
	        var roleselector = this.getRoleselector();
			 var toList=roleselector.toField.boundList;
			 var fromList=roleselector.fromField.boundList;
			 var fromStore=fromList.getStore();
			 var toStore=toList.getStore();
			 var formPanel = this.getRoleform();
			 var params = Sgai.util.Util.getFormParams(formPanel);
	        // store.proxy.extraParams=params;
	         Ext.Ajax.request({
			   url: 'system/role/read.action',
			   params: params,
			   success:function(response){
					var text = response.responseText;
					var reText = Ext.decode(response.responseText).data;
					fromStore.removeAll();
					var datas= toStore.data.items;
					for(var j=0;j<reText.length;j++){
							var  re=reText[j];
							for(var i=0;i<datas.length;i++){
								if(re.roleId===datas[i].get('roleId')){
								     Ext.Array.remove(reText,re);//reText.remove(datas[i]);
								 }
							}
					}
					 fromStore.add(reText);
			    }
			 });
		},
		onButtonClickResetRole : function(button, e, options) {
		    this.getRoleform().getForm().reset();
		}
		
   });