Ext.define('Sgai.view.su.orgnization.OrgnizationView',{
	extend: 'Ext.Container',
    alias: "widget.orgnizationView",
    store: 'Sgai.store.su.orgnization.OrgnizationStore',    
    layout:'fit', 
    itemId: 'orgnizationPanel',
    
    requires: [
    	'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.Column'
    ],
    
    initComponent : function(){
		var me = this;
		var store = Ext.create('Sgai.store.su.orgnization.OrgnizationStore');
		store.load();
		Ext.applyIf(me, {
            items: [        		
            {                
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
			            itemId: 'orgnizationTreePanel',
			            border:0,
			            loadMask: true, 
			            rootVisible:false,
			            singleClickExpand: true,
			            store:store,
			            
			            viewConfig: {
							forceFit: true,
						 	scrollOffset: 0,
						 	enableTextSelection:true
                         },
						
                         tbar:[
                         		{
				                 	xtype:'button',
				                	text:translations.expandAll,
				                	iconCls:'delete',
				                	itemId: 'btnOrgnizationExpandAll'
				                },
				                {
				                 	xtype:'button',
				                	text:translations.collapseAll,
				                	iconCls:'add',
				                	itemId: 'btnOrgnizationCollapseAll'
				                },
				                '-',
				                {
				                 	xtype:'button',
				                	text:translations.addNode,
				                	//privilegeCode:'SU010101',
				                	iconCls:'add',
				                	itemId: 'btnOrgnizationAddNode'
				                },
				                {
				                 	xtype:'button',
				                	text:translations.delNode,
				                	//privilegeCode:'SU010102',
				                	iconCls:'delete',
				                	itemId: 'btnOrgnizationDelNode'
				                },
				                {
				                 	xtype:'button',
				                	text:translations.submit,
				                	//privilegeCode:'SU010103',
				                	iconCls:'save',
				                	itemId: 'btnOrgnizationSave'
				                } 
				            ],
                         columns: [
	                            {
	                                xtype: 'treecolumn',
	                                dataIndex: 'orgId',
	                                text: translations.orgList,
	                                flex: 7,
	                                renderer:function(value,metaData,record) {
	                                	var text = translations[value];
	                                	if (Ext.isEmpty(text)) {
	                                		text = record.get('orgName');
	                                	}
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
	                                dataIndex: 'orgId',
	                                text:translations.orgId,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.orgId,
				                    	allowBlank:false,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	vtype:'alphanum',
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'orgName',
	                                text: translations.orgName,
	                                flex: 4,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.orgName,
				                    	allowBlank:false,
				                    	maxLength:100,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'orgBriefName',
	                                text: translations.orgBriefName,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.orgBriefName,
				                    	allowBlank:true,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'orgLocation',
	                                text: translations.orgLocation,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.orgLocation,
				                    	allowBlank:true,
				                    	maxLength:32,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'orgLevel',
	                                text: translations.orgLevel,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.orgLevel,
				                    	allowBlank:true,
				                    	maxLength:3,
				                    	enforceMaxLength:true,
				                    	vtype:'positiveInteger',
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'orgSeq',
	                                text: translations.orgSeq,
	                                flex: 3,
	                                hidden : true,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.orgSeq,
				                    	allowBlank:true,
				                    	maxLength:3,
				                    	enforceMaxLength:true,
				                    	vtype:'positiveInteger',
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'comments',
	                                text: translations.comments,
	                                flex: 4,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.comments,
				                    	allowBlank:true,
				                    	maxLength:1000,
				                    	enforceMaxLength:true,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                text:translations.createdBy,
				                    dataIndex:'createdBy',
				                    flex: 2,
				                    hidden:true
	                            },
	                            {
	                                text:translations.createdDt,
				                    dataIndex:'createdDt',
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
	                                text:translations.updatedDt,
				                    dataIndex:'updatedDt',
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
                            Ext.create('Ext.grid.plugin.CellEditing', {
                            	pluginId:'orgnizationTreeCellEditing',
                                clicksToEdit: 1,
                                autoCancel:false                            
                            })
                        ],
                        listeners:{  
					        'itemcontextmenu':function(menutree,record,items,index,e){  
					            e.preventDefault();  
					            e.stopEvent();  
					            //判断是否为叶子结点 
					            var treePanel = Ext.ComponentQuery.query('treepanel#orgnizationTreePanel')[0];
					            if(record.data.leaf==false){  					            	
					            	var nodemenu = new Ext.menu.Menu({  
					                floating:true,  
					                items:[
						                {  
						                    text:translations.addNode,						                 
						                    //disabled:!Sgai.util.Util.isAccessible('SU010101'),
						                    handler:function(){
						                    	if (!record.isExpanded()) {
													treePanel.expandNode(record);
												}
						                    	if (record.data.resLevel==0) {//根节点添加子节点
						                    		var orgModel = new Sgai.model.su.orgnization.OrgnizationModel({
							                    		sid:'',
							                    		orgId:'',
							                    		orgName:'',
							                    		orgBriefName:'',
							                    		orgLocation:'',
							                    		comments:'',
							                    		officeFlag:'',
							                    		orgLevel:1,
							                    		orgSeq:record.data.orgSeq +1,
							                    		orgShortCode : '',
														psDutyFlag : '',
							                    		parentSid:record.data.sid
							                    	});
							                    	orgModel.store=record.store;
							                    	record.appendChild(orgModel);
						                    	} else { //子节点添加子节点
							                    	var orgModel = new Sgai.model.su.orgnization.OrgnizationModel({
							                    		sid:'',
							                    		orgId:'',
							                    		orgName:'',
							                    		orgBriefName:'',
							                    		orgLocation:'',
							                    		officeFlag:'',
							                    		comments:'',
							                    		resLevel:record.data.resLevel +1,
							                    		orgSeq:record.data.orgSeq +1,
							                    		orgShortCode : '',
														psDutyFlag : '',
							                    		parentSid:record.data.sid
							                    	});
							                    	record.appendChild(orgModel);
						                    	}
						                    }  
						                },
						                {  
						                    text:translations.delNode, 
						                    //disabled:!Sgai.util.Util.isAccessible('SU010102'),
						                    handler:function(){  
						                        if (record.hasChildNodes()) {
						                        	Ext.MessageBox.show({
													    title:translations.operateMsgWinTitle,
													    msg:translations.hasChildCanNotDel,
													    buttons:Ext.Msg.OK,
													    icon:Ext.MessageBox.INFO
													});
						                        } else {					                       
						                        	record.remove();
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
            }]
        });
		this.callParent(arguments);
	}
	
	
});