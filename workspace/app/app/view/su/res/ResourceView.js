Ext.define('Sgai.view.su.res.ResourceView',
{
    extend:'Ext.Container',
    alias:"widget.resourceView",
    store: 'Sgai.store.su.res.ResourceStore',    
    layout:'fit', 
    itemId: 'resourcePanel',
	
    requires: [
    	'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.Column'
    ],
    
	initComponent : function(){
		var me = this;
		var store = Ext.create('Sgai.store.su.res.ResourceStore',{storeId:'resourceStore'});
		store.load();
		Ext.applyIf(me, {
            items: [        		
                    {
                        xtype: 'treepanel',
                        title: translations.dataList,
                        iconCls:'data',
                        autoHeight:true,
                        height:530,
                        trackMouseOver:true,
                        animate:true,
                        useArrows: true,
                        region:'center',
			            autoScroll : true,           
			            itemId: 'resourceTreePanel',
			            border:0,
			            loadMask: true, 
			            rootVisible:false,
			            singleClickExpand: true,
			            store: store,
			            
			            viewConfig: {
							forceFit: true,
						 	scrollOffset: 0,
						 	enableTextSelection:true
                         },
						
                         tbar:[
                         		{
				                 	xtype:'button',
				                	text:translations.expandAll,
				                	iconCls:'arrow-out',
				                	itemId: 'btnResourceExpandAll'
				                },
				                {
				                 	xtype:'button',
				                	text:translations.collapseAll,
				                	iconCls:'arrow-out',
				                	itemId: 'btnResourceCollapseAll'
				                },
				                '-',
				                {
				                 	xtype:'button',
				                	text:translations.addNode,
				                	//privilegeCode:'SU010101',
				                	iconCls:'add',
				                	itemId: 'btnResourceAddNode'
				                },
				                {
				                 	xtype:'button',
				                	text:translations.delNode,
				                	//privilegeCode:'SU010102',
				                	iconCls:'delete',
				                	itemId: 'btnResourceDelNode'
				                },
				                {
				                 	xtype:'button',
				                	text:translations.save,
				                	//privilegeCode:'SU010103',
				                	iconCls:'save',
				                	itemId: 'btnResourceSave'
				                } 
				            ],
				            
                         columns: [
	                            {
	                                xtype: 'treecolumn',
	                                dataIndex: 'resId',
	                                text: translations.resList,
	                                flex: 7,
	                                renderer:function(value,metaData,record) {
	                                	var text = record.get('resName');
					                	return text;
					                }
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'sid',
	                                text: translations.sid,
	                                hidden:true,
	                                flex: 2
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'resId',
	                                text:translations.resId,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.resId,
				                    	allowBlank:false,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	vtype:'alphanum',
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'resName',
	                                text: translations.resName,
	                                flex: 4,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.resName,
				                    	allowBlank:false,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'resType',
	                                text: translations.resType,
	                                flex: 3,
	                                editor : {
										xtype : 'remotecombo',
										reference : 'comboResType',
										itemId : 'comboResType',
										tableName : 'sys_dom_values',
										displayName : 'high_value',
										valueName : 'low_value',
										filterName : 'dom_id',
										filterValue : 'RESOURCE_TYPE',
										orderField : 'DOM_VAL_POS'
									},
									renderer : function(value) {
										return getComboxValues('RESOURCE_TYPE', value);
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'resSeq',
	                                text: translations.resSeq,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.resSeq,
				                    	allowBlank:false,
				                    	maxLength:3,
				                    	enforceMaxLength:true,
				                    	vtype:'positiveInteger',
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'resUri',
	                                text: translations.resUri,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.resUri,
				                    	allowBlank:true,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	vtype:'alphanum',
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'resLevel',
	                                text: translations.resLevel,
	                                hidden:true,
	                                flex: 2
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'parentSid',
	                                text:translations.parentSid,
	                                hidden:true,
	                                flex: 2
	                            },
	                            {
	                                text:translations.createdBy,
				                    dataIndex:'createdBy',
				                    flex: 2,
				                    hidden:true
	                            },
	                            {
	                                text:translations.createdTimestamp,
				                    dataIndex:'createdTimestamp',
				                    flex: 2,
				                    hidden:true
	                            },
	                            {
	                                text:translations.updatedBy,
				                    dataIndex:'updatedBy',
				                    flex: 2,
				                    hidden:true
	                            },
	                            {
	                                text:translations.updatedTimestamp,
				                    dataIndex:'updatedTimestamp',
				                    flex: 2,
				                    hidden:true
	                            },
	                            {
	                                text:translations.version,
				                    dataIndex:'version',
				                    flex: 2,
				                    hidden:true
	                            }
	                   
                        ],
                        plugins: [
                                  {
           							ptype: 'cellediting',
           							pluginId:'resourceTreeCellEditing',
           							clicksToEdit: 1
                                  }
                        ],
                        listeners:{  
					        'itemcontextmenu':function(menutree,record,items,index,e){  
					            e.preventDefault();  
					            e.stopEvent();  
					            //判断是否为叶子结点 
					            var treePanel = Ext.ComponentQuery.query('treepanel#resourceTreePanel')[0];;
					            if(record.data.leaf==false){  	
					            	var nodemenu = Ext.ComponentQuery.query('menu#resmenu')[0];
									if (nodemenu != null) {
										nodemenu.close();
									} 
				
    								nodemenu = Ext.create('Ext.menu.Menu', {
					            	itemId : 'resmenu',
					                floating:true,  
					                closeAction : 'destroy',
					                items:[
						                {  
						                    text:translations.addNode,		
//						                    disabled:!Sgai.util.Util.isAccessible('MENUPRI01'), // DONGYU 菜单权限
						                    handler:function(){
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
						                {  
						                    text:translations.delNode, 
						                    handler:function(){  
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
																			store.reload();
																		}, function() {
																			Ext.MessageBox.show({
																						title : '操作提示',
																						msg : '删除失败！',
																						buttons : Ext.MessageBox.OK,
																						icon : Ext.MessageBox.INFO
																					});
																			store.reload();
																		}, null);
															}
														});
													}					                      
						                        }
						                    }  
						                }
					                ]  					                  
					            });  
					            nodemenu.showAt(e.getXY());  
					            }  
					        }  
					    } 
                    }
            ]
        });

		this.callParent(arguments);
		
	}
        
    
});

