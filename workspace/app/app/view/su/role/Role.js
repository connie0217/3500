Ext.define('Sgai.view.su.role.Role', {
	extend : 'Ext.panel.Panel',
	alias : "widget.role",
	store : 'su.role.Role',
	layout:'anchor', 
	itemId : 'roleMainPanel',
    id:'roleMainPanel',
	initComponent : function() {
		  var pageSize = 15;
		   /* 权限树向上遍历父结点 */
		   var parentnode=function(node){
		   if(node.parentNode !=null){
			 node.parentNode.set('checked',true);
			  parentnode(node.parentNode);
			 }
		   };
		   /* 权限树遍历子结点 选中 与取消选中操作 */
		var chd=function(node,check){
			node.set('checked',check);
			if(node.isNode){
				node.eachChild(function(child){
				 chd(child,check);
				 });
			}
			};
	
		var store = Ext.create('Sgai.store.su.role.Role');
		//右侧treegrid对应的store
		var resource_store = Ext.create('Sgai.store.su.res.RoleResourceStore');
		var sec_store = Ext.create('Sgai.store.su.securityRole.RoleSecurityRole');
		
		// 在grid前加复选框
		var selModel = Ext.create('Ext.selection.CheckboxModel', {
		    singleSelect: true ,
			listeners : // 事件监听
			{
				selectionchange : function(sm, selections) {
					  //sm.setLocked(true);
					//在此处为什么不能调用resource_store.removeAll方法
					if(selections.length > 0){
				    	Ext.getCmp('roleDelRec').setDisabled(selections.length == 0);
				    	//selected.last() 使用这种方式获得 选择的最后一条
				   		data=Ext.getCmp('roleGridPanel').getSelectionModel().selected.last();
				   		//.getLastSelected()获得最后选中的一条记录，当再次点击查询按钮，这个值仍然存在，不适用。
				   		//.getSelection()[selections.length-1]; // 获取所有选中行，
				   		
				   		var funcFlag = false;
				   		var dataFlag = false;
				   		var mask = new Ext.LoadMask(Ext.getBody().component, {                          
                            msg : '数据正在加载，请稍后... ',                           
                            removeMask : true });
                            mask.show();
				   		
//				   		var _tabPanel = Ext.ComponentQuery.query('tabpanel#rightTabPanel')[0];
//				   		var _tab = _tabPanel.getActiveTab();
//						if (_tab.itemId == 'funcPri') {
                   		var params = {
                      		action:'read',
                     		roleId: data.get('roleId'),
                     		start:0
	                	};
	                	//请求成功之后将左侧的内容设置为可选的
	                	  
	                    resource_store.reload({
							params : params,
							callback: function(records, operation, success) {
                                // sm.setLocked(false);
								funcFlag = true;
								if (dataFlag) {
							 		mask.hide();
								}
                             }
						});	
//					}
//					
//					if (_tab.itemId == 'dataPri') {
                   		var _params = {
                      		action:'read',
                     		start:0
	                	};
	                	_params['roleSid'] = data.get('sid');
	                	//请求成功之后将左侧的内容设置为可选的
	                    sec_store.reload({
							params : _params,
							callback: function(records, operation, success) {
                                // sm.setLocked(false);
								dataFlag=true;
								if (funcFlag) {
							 		mask.hide();
								}
                             }
						});	
					}
//					}
                    resource_store.on('beforeload', function(resource_store, options) {
			          Ext.apply(resource_store.proxy.extraParams, params);
	          	    });
	          	    sec_store.on('beforeload', function(sec_store, options) {
			          Ext.apply(sec_store.proxy.extraParams, _params);
	          	    });
				}
			  }
		    });

        //数据列表
		var grid = Ext.create('Ext.grid.Panel', {
		    xtype: 'gridpanel',
		    anchor : '100% 89%',
		    iconCls:'data',
            title: translations.dataList,
            region:'center',
            autoScroll : true,           
            itemId: 'roleGridPanel',
		    id:'roleGridPanel',
            border:0,                 
		    selModel : selModel, // 每条记录前的复选框注意调用的方式 selModel是grid.panel自带属性
		    store : store,
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
			                	privilegeCode:'SU010301',
			                    iconCls:'add',
			                	itemId: 'btnNew'
			                },
			                {
			                 	xtype:'button',
			                	text:translations.save,
//			                	privilegeCode:'SU010302',
			                	formBind: true,
			                    iconCls:'save',
			                	itemId: 'btnSave'
			                },
			                {
			                 	xtype:'button',
			                	text:translations.del,
			                	privilegeCode:'SU010303',
			                	formBind: true,
			                	itemId: 'delRec',
			                    iconCls:'delete',
			                	id:'roleDelRec'
			                }
                         ],
		    viewConfig:{
			  forceFit: true,
		 	  scrollOffset: 0,
		 	  enableTextSelection:true
		    },
			columns : [
			                   {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'sid',
	                                itemId: 'sid',
	                                text: translations.sid,
	                                hidden:true,
	                                flex: 2
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'roleResources',
	                                itemId: 'roleResources',
	                                text: translations.roleResources,
	                                hidden:true,
	                                flex: 2
	                            },
                                {
				                    xtype: 'gridcolumn',
	                                dataIndex: 'roleId',
	                                itemId: 'roleId',
	                                text: translations.roleId,
	                                allowBlank:false,
	                                flex: 4,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput +translations.roleId,
				                    	allowBlank:false,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
			                     }, 
			                     {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'roleName',
	                                itemId: 'roleName',
	                                allowBlank:false,
	                                text: translations.roleName,
	                                flex: 4,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput +translations.roleName,
				                    	allowBlank:false,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
	                              },
	                              {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'roleDesc',
	                                itemId: 'roleDesc',
	                                text: translations.roleDesc,
	                                flex: 4,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput +translations.roleDesc,
				                    	allowBlank:false,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
	                               }],
//		     dockedItems:[Sgai.util.Util.pagingToolbar(store)],
             plugins: [
                       {
							ptype: 'cellediting',
							pluginId:'roleCellEditing',
							clicksToEdit: 1
                       },
                       {
							ptype: 'gridHeaderAdjust',
							aliasName:'roleGridHeaderAdjust'
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
		//权限树
		var treePanel = Ext.create('Ext.tree.Panel', {
			layout : 'fit',
		    autoScroll : true, 
		    height:600,
			labelAlign : 'right',
			xtype : 'treepanel',
			animate : true,
			checked : false,
			rootVisible : true,
			itemId : 'roleTreePanel',
			id:'roleTreePanel',
			store : resource_store,
			listeners : {
				checkchange : function(node, checked, eOpts) {
					if (checked) {
						node.set('checked',true);
						node.eachChild(function(child) {
							chd(child, true);
						});
					} else {
						node.set('checked',false);
						node.eachChild(function(child) {
							chd(child, false);
						});
					}
					parentnode(node); // 进行父级选中操作
				}
			},
			tbar : [ {
				xtype : 'button',
				text : translations.expandAll,
				iconCls:'arrow-out',
				itemId : 'btnResourceExpandAll'
			}, {
				xtype : 'button',
				text : translations.collapseAll,
				iconCls:'arrow-out',
				itemId : 'btnResourceCollapseAll'
			} ],
			columns : [
					{
						xtype : 'treecolumn',
						dataIndex : 'resId',
						text : translations.resList,
						flex : 7,
						renderer:function(value,metaData,record) {
                        	var text = record.get('resName');
		                	return text;
		                }
					},
					{
						xtype : 'gridcolumn',
						dataIndex : 'sid',
						text : translations.sid,
						hidden : true,
						flex : 2
					},
					{
						xtype : 'gridcolumn',
						dataIndex : 'resId',
						text : translations.resId,
						flex : 3,
						editor : {
							xtype : 'textfield',
							emptyText : translations.pleaseInput
									+ translations.resId,
							allowBlank : false,
							maxLength : 32,
							enforceMaxLength : true,
							vtype : 'alphanum',
							msgTarget : 'under'
						}
					},
					{
						xtype : 'gridcolumn',
						dataIndex : 'resName',
						text : translations.resName,
						flex : 4,
						editor : {
							xtype : 'textfield',
							emptyText : translations.pleaseInput
									+ translations.resName,
							allowBlank : false,
							maxLength : 32,
							enforceMaxLength : true,
							msgTarget : 'under'
						}
					},
					{
						xtype : 'gridcolumn',
						dataIndex : 'resType',
						text : translations.resType,
						flex : 3,
						editor: Sgai.util.Util.createCommonTypeComboBox('RESOURCE_TYPE','comboResType', null, false),		
						renderer : function(value) {
							var comboResType = Ext.ComponentQuery
									.query('combo#comboResType')[0];
							return comboResType.setValue(value).getRawValue();
						}
					},
					{
						xtype : 'gridcolumn',
						dataIndex : 'resUri',
						text : translations.resUri,
						flex : 3,
						editor : {
							xtype : 'textfield',
							emptyText : translations.pleaseInput
									+ translations.resUri,
							allowBlank : true,
							maxLength : 32,
							enforceMaxLength : true,
							vtype : 'alphanum',
							msgTarget : 'under'
						}
					}, {
						xtype : 'gridcolumn',
						dataIndex : 'resLevel',
						text : translations.resLevel,
						hidden : true,
						flex : 2
					}, {
						xtype : 'gridcolumn',
						dataIndex : 'parentSid',
						text : translations.parentSid,
						hidden : true,
						flex : 2
					}, {
						text : translations.createdBy,
						dataIndex : 'createdBy',
						flex : 2,
						hidden : true
					}, {
						text : translations.createdTimestamp,
						dataIndex : 'createdTimestamp',
						flex : 2,
						hidden : true
					}, {
						text : translations.updatedBy,
						dataIndex : 'updatedBy',
						flex : 2,
						hidden : true
					}, {
						text : translations.updatedTimestamp,
						dataIndex : 'updatedTimestamp',
						flex : 2,
						hidden : true
					}, {
						text : translations.version,
						dataIndex : 'version',
						flex : 2,
						hidden : true
					}

			   ]
		    });
		
		 // 数据权限
		var secTreePanel = Ext.create('Ext.tree.Panel', {
			layout : 'fit',
		    autoScroll : true, 
		    height:600,
			labelAlign : 'right',
			xtype : 'treepanel',
			animate : true,
			checked : false,
			itemId : 'secTreePanel',
			id:'secTreePanel',
			store : sec_store,
			listeners : {
				checkchange : function(node, checked, eOpts) {
					if (checked) {
						node.eachChild(function(child) {
							chd(child, true);
						});
					} else {
						node.eachChild(function(child) {
							chd(child, false);
						});
					}
					parentnode(node); // 进行父级选中操作
				}
			},
			tbar : [ {
				xtype : 'button',
				text : translations.expandAll,
				iconCls:'arrow-out',
				itemId : 'btnSecExpandAll'
			}, {
				xtype : 'button',
				text : translations.collapseAll,
				iconCls:'arrow-out',
				itemId : 'btnSecCollapseAll'
			} ],
			columns : [{
						xtype : 'treecolumn',
						dataIndex : 'text',
						text : translations.sercurityRoleList,
						flex : 7
					}, {
						xtype : 'gridcolumn',
						dataIndex : 'sid',
						text : translations.sid,
						hidden : true
					}

			]

		    });
		    
		// 权限与数据权限
		var tabpanel = Ext.create("Ext.tab.Panel", {
			itemId : 'rightTabPanel',
			frame : true,
			height : 600,
			renderTo : Ext.getBody(),
			items : [{   
				title : '功能权限',
				itemId : 'funcPri',
				items:[ treePanel ]
			}, {
				title : '数据权限',
				itemId : 'dataPri',
				items:[ secTreePanel ]
			}]
		});
		    
          this.items =[
              {
                  xtype: 'form',
                  anchor : '100% 11%',
                  bodyStyle:"padding:2px 2px 2x 2x",
				  border:0,
				  collapsible:true,
				  frame : true,
				  itemId: 'roleQueryPanel',
                  title: translations.queryCond,
                  layout : 'hbox',
          		  defaultType : 'textfield',  
                  items: [
                          {
	  	                	 name : 'qm.roleId',
	  	                	 itemId : 'roleId',
	  	                	 xtype : 'remotecombo',
	  	                	 tableName : 'SGAI_SU_ROLE',
	  	                	 displayName : 'ROLE_NAME',
	  	                	 valueName : 'ROLE_ID',
	  	                	 labelWidth : 95,
	  	                	 editable : true,
	  	                	 typeAhead:false,
                             anyMatch:true,  
	  	                	 labelAlign : 'right',
	  	                	 emptyText : '请选择',
	  	                	 fieldLabel : '角色名称',
	  	                	 width : 270
	                     }
                  ]
              },
                  grid
           ],
           
        this.dockedItems =[
			{
				xtype : 'panel',
				layout : 'fit',
				width:500,
				dock:'right',
				items : [ tabpanel ]
			}
		 ]    ;
		this.callParent(arguments);
	}
  });
