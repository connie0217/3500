Ext.define('Sgai.view.su.group.Group', {
	extend : 'Ext.panel.Panel',
	alias : "widget.group",
	store : 'su.group.Group',
	layout:'anchor', 
	itemId : 'groupMainPanel',
    id:'groupMainPanel',
	items : [ {
		layout : {
			type : 'vbox',
			align : 'stretch'
		}
	} ],
	initComponent : function() {
		var store = Ext.create('Sgai.store.su.group.Group');
		//角色左侧的store
		var roleleft = Ext.create('Sgai.store.su.role.Role',{storeId:'surole',pageSize:1000});
		var userleft = Ext.create('Sgai.store.su.user.User',{storeId:'suuser',pageSize:1000});
		// 在grid前加复选框
		var selModel = Ext.create('Ext.selection.CheckboxModel', {
							mode:'SINGLE',
							allowDeselect:true
						});	
        //用户组信息展示
		var grid = Ext.create('Ext.grid.Panel', {
			anchor : '100% 89%',
			region : 'center', // 此属性必须指定
			iconCls:'data',
            title: translations.dataList,
            selModel : selModel,
            selType:'checkboxmodel',
			autoScroll : true,
            layout:'fit',
			itemId : 'groupGridPanel',
			id : 'groupGridPanel',
		    border:0,  
            store : store.load({}),
		    tbar:[          
            {
         	  xtype:'button',
         	  text:translations.query,
              iconCls:'find',
         	  itemId: 'btnQuery'
            },
            {
          	  xtype:'button',
         	  text:translations.reset,
              iconCls:'reset',
         	  itemId: 'btnReset'
            },
            '-',
            {
         	  xtype:'button',
         	  text:translations.add,
         	  privilegeCode:'SU010401',
              iconCls:'add',
         	  itemId: 'btnNew'
            },
            {
              xtype:'button',
         	  text:translations.save,
         	  privilegeCode:'SU010402',
         	  formBind: true,
              iconCls:'save',
         	  itemId: 'btnSave'
            },
            {
              xtype : 'button',
			  text : translations.del,
			  privilegeCode:'SU010403',
			  formBind : true,
			  itemId : 'delRec',
		      iconCls:'delete',
			  id : 'groupDelRec',
			  disabled:true
            }
           ],
           viewConfig:{
             forceFit: true,
             scrollOffset: 0,
             enableTextSelection:true
           },
			columns : [
			{
				xtype : 'gridcolumn',
				dataIndex : 'sid',
				itemId: 'sid',
				text : translations.sid,
				hidden : true,
				flex : 2
			},
			{
                xtype: 'gridcolumn',
                dataIndex: 'groupUsers',
                itemId: 'groupUsers',
                text: translations.groupUsers,
                hidden:true,
                flex: 2
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'groupRoles',
                itemId: 'groupRoles',
                text: translations.groupRoles,
                hidden:true,
                flex: 2
            },
			{
				xtype : 'gridcolumn',
				dataIndex : 'userGroupId',
				itemId: 'userGroupId',
				text : translations.userGroupId,
				allowBlank : false,
				flex : 8,
				editor : {
					xtype : 'textfield',
					emptyText : translations.pleaseInput + translations.userGroupId,
					maxLength : 32,
					enforceMaxLength : true,
					msgTarget : 'under'
				}
			},
			{
				xtype : 'gridcolumn',
				dataIndex : 'userGroupName',
				itemId: 'userGroupName',
				allowBlank : false,
				text : translations.userGroupName,
				flex : 8,
				editor : {
					xtype : 'textfield',
					emptyText : translations.pleaseInput + translations.userGroupName,
					maxLength : 32,
					enforceMaxLength : true,
					msgTarget : 'under'
				}
			}, {
				xtype : 'gridcolumn',
				dataIndex : 'userGroupDesc',
				itemId: 'userGroupDesc',
				text : translations.userGroupDesc,
				flex : 4,
				editor : {
					xtype : 'textfield',
					emptyText : translations.pleaseInput + translations.userGroupDesc,
					maxLength : 32,
					enforceMaxLength : true,
					msgTarget : 'under'
				}
			}
			],
			plugins: [
                       {
							ptype: 'cellediting',
							pluginId:'groupCellEditing',
							clicksToEdit: 1
                       },
                       {
							ptype: 'gridHeaderAdjust',
							aliasName:'groupGridHeaderAdjust'
			           }
            ],
			dockedItems : [ {
		    	xtype : 'pagingtoolbar',
		    	store : store, // same store GridPanel is using
		    	dock : 'bottom',
		    	displayInfo : true,
		    	plugins : [ {
		    		ptype : 'pagingtoolbarresizer'
		    	} ]
		    } ]
		});
		//   用户与角色区域
		var tabpanel = Ext.create("Ext.tab.Panel", {
			frame : true,
			height : 600,
			width : 300,
			activeTab : 1, // 默认激活第2个tab页
			renderTo : Ext.getBody(),
			items : [ 
			{   title : translations.user,//可分配用户
				items:[{
				    	  xtype: 'form',
		                  bodyStyle:"padding:2px 2px 2x 2x",
						  border:0,
						  collapsible:false,
						  frame : true,
	                	  anchor : '100% 10%',
						  itemId: 'userQueryPanel',
		                  title: '可分配用户查询',
		                  layout: {
      	     					type: 'table',
      	     					columns: 4
      	     				},
		          		  defaultType : 'textfield',  
		                  items: [
		                      {
		                          name:'qm.pin',
			                      itemId:'pin',
			                      labelWidth:60,
			                      labelAlign:'right',
			                      fieldLabel:translations.pin,
							      width:190
		                      },
		                      {
		                          name:'qm.userNameCn',
			                      itemId:'userNameCn',
			                      labelWidth:60,
			                      labelAlign:'right',
			                      fieldLabel:translations.userNameCn,
							      width:190
		                      },
		                      	  {
									xtype:'button',
									text: translations.query,
									itemId:'btnUserQuery',
									margin:'0 0 0 10',
									formBind:true,
									iconCls: 'find'
			                  },
							  {
									xtype:'button',
									text: translations.reset,
									itemId:'btnUserReset',
									margin:'0 0 0 10',
									formBind:true,
									iconCls: 'reset'
			  	             }
		                  ]
				       },
				       {
				    	    xtype : "itemselector",
					        width:500,  
					        height:440,  
					        //anchor: '100%',
							name : 'userselector',
							itemId:'userselector',
							hideLabel : true,
							id:'userselector',
							style : 'margin-top:10px;margin-left:10px;margin-right:10px;',
							imagePath : 'ext/src/ux/css/images/',
	                        store:userleft.load({}),
	                        valueField:"sid",  
	                        displayField:"userNameCn",
					        fromTitle: translations.unAssignedUser,
					        toTitle: translations.assignedUser,
					        buttons: ["top", "add", "remove", "bottom"],
	                        buttonsText: {
	                          top:translations._addAll,
	                          add:translations._add,
	                          remove: translations._remove,
	                          bottom: translations._removeAll
				       		}
                      } ]
			},
			{   title : translations.role,
                items:[
                       {
		                  xtype: 'form',
		                  anchor : '100% 10%',
		                  bodyStyle:"padding:2px 2px 2x 2x",
						  border:0,
						  collapsible:false,
						  frame : true,
						  itemId: 'roleQueryPanel',
		                  title: '可分配角色查询',
		                  layout: {
 	     						type: 'table',
 	     						columns: 3
 	     					},
		          		  defaultType : 'textfield',  
		                  items: [
		                          {
			  	                	 name : 'qm.roleId',
			  	                	 itemId : 'roleId',
			  	                	 xtype : 'remotecombo',
			  	                	 tableName : 'SGAI_SU_ROLE',
			  	                	 displayName : 'ROLE_NAME',
			  	                	 valueName : 'ROLE_ID',
			  	                	 labelWidth : 80,
			  	                	 editable : true,
			  	                	  typeAhead:false,
                                      anyMatch:true, 
			  	                	 labelAlign : 'right',
			  	                	 emptyText : '请选择',
			  	                	 fieldLabel : '角色名称',
			  	                	 width : 250
			                     },
			                     {
										xtype:'button',
										text: translations.query,
										itemId:'btnRoleQuery',
										margin:'0 0 0 30',
										formBind:true,
										iconCls: 'find'
				                  },
								  {
										xtype:'button',
										text: translations.reset,
										itemId:'btnRoleReset',
										margin:'0 0 0 30',
										formBind:true,
										iconCls: 'reset'
				  	             }
		                  ]
                       },
                       {xtype:"itemselector",  
                        name:"roleselector",  
                        itemId:'roleselector',
                        id:'roleselector',
                        hideLabel:true,  
                        width:500,  
                        height:467,  
                        style : 'margin-top:10px;margin-left:10px;margin-right:10px;',
                        valueField:"sid",  
                        displayField:"roleName",  
                        store:roleleft.load({params:{limit:1000,page:1}}),
                        fromTitle: translations.unAssignedRole,
                        toTitle: translations.assignedRole,
                        buttons: ["top", "add", "remove", "bottom"],
                        buttonsText: {
                          top:translations._addAll,
                          add:translations._add,
                          remove: translations._remove,
                          bottom: translations._removeAll
                        }
               } ]
             }]
		});
		this.items = [ 
              {
                  xtype: 'form',
                  bodyStyle:"padding:2px 2px 2x 2x",
                  anchor : '100% 11%',
				  border:0,
				  collapsible:true,
				  frame : true,
				  itemId: 'groupQueryPanel',
                  title: translations.queryCond,
                  layout : 'hbox',
          		  defaultType : 'textfield',  
                  items: [
                      {
                          name:'qm.userGroupId',
	                      itemId:'userGroupId',
	                      labelWidth:95,
	                      labelAlign:'right',
	                      fieldLabel:translations.userGroupId,
					      width:220
                      },
                      {
                          name:'qm.userGroupName',
	                      itemId:'userGroupName',
	                      labelWidth:95,
	                      labelAlign:'right',
	                      fieldLabel:translations.userGroupName,
					      width:220
                      }
                  ]
               },
                   grid
                ];
       this.dockedItems =[
		{
			xtype : 'panel',
			layout : 'fit',
			width:530,
			dock:'right',
			items : [ tabpanel ]
		}
	   ];
		this.callParent(arguments);
	}
});
