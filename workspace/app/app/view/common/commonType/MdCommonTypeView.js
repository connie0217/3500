Ext.define('Sgai.view.common.commonType.MdCommonTypeView',
{
    extend:'Ext.panel.Panel',
    alias:"widget.mdCommonTypeView",
    layout:'fit', 
    itemId: 'mdCommonPanel',
	
    requires: [
    	'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.Column',
        'Sgai.view.common.commonType.MdCommonTypeController'
    ],
    controller:'mdCommonTypeCtrl',
	initComponent : function(){
		var me = this;
		var store = Ext.create('Sgai.store.common.commonType.MdCommonTypeStore',{storeId:'mdCommonTypeTreeStore'});
		var nodeStore = Ext.create('Ext.data.Store', {
								    fields: ['nodeId', 'nodeName'],
								    data : [
									        {"nodeId":0, "nodeName":"叶子结点"},
									        {"nodeId":1, "nodeName":"非叶子结点"}
  								 		   ]
					 });
		Ext.applyIf(me, {
            items: [        		
                    {
                        xtype: 'treepanel',
                        region:'center',
					    autoScroll : true,   
					    columnLines:false,    
					    title: '公共类型',
					    iconCls:'data',
					    autoHeight:true,
					    height:530,
					    trackMouseOver:true,
					    animate:true,
					    useArrows: true,           
					    reference:'mdCommonTypeTree',
					    border:0,
					    loadMask: true, 
					    rootVisible:false,
					    singleClickExpand: true,
					    collapsible: true,
					    collapseDirection:'left',
					   	store: store,
					   	tbar:[
						 		{
						         	xtype:'button',
						        	text:translations.expandAll,
						        	iconCls:'delete',
						        	reference: 'btnExpandAll',
						        	handler:'expandAll',
						        	disabled:true
						        },
						        {
						         	xtype:'button',
						        	text:translations.collapseAll,
						        	iconCls:'add',
						        	reference: 'btnCollapseAll',
						        	handler:'collapseAll',
						        	disabled:true
						        	
						        },
						        {
						         	xtype:'button',
						        	text:translations.submit,
						        	iconCls:'save',
						        	reference: 'btnSave',
						        	handler:'save',
						        	disabled:true
						        } 
					    ],
			            viewConfig: {
								plugins: {
						        	allowContainerDrop : false,
						            ptype: 'treeviewdragdrop',
						            nodeHighlightOnRepair : true,
						            appendOnly:true            
						        },
						        listeners:{
							        beforeDrop:'beforeDropNode',
							        drop:'dropNode'
						        }
						},
						plugins: [
						      {
								ptype: 'cellediting',
								pluginId:'deptTreeCellEditing',
								clicksToEdit: 2
						      }
						 ],
						 listeners:{  
					        'itemcontextmenu':'itemcontextmenuclick',
					         'afterrender':'treeAfterrender'
   						 },
                         columns: [
	                            {
	                                xtype: 'treecolumn',
	                                dataIndex: 'typeName',
	                                text: translations.resList,
	                                flex: 7
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
	                                dataIndex: 'typeId',
	                                text:translations.typeId,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.typeId,
				                    	allowBlank:false,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'typeName',
	                                text:translations.typeName,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.typeName,
				                    	allowBlank:false,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'typeDesc',
	                                text: translations.typeDesc,
	                                flex: 4,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.typeDesc,
				                    	allowBlank:true,
				                    	msgTarget: 'under'
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'typeLevel',
	                                text:translations.typeLevel,
	                                flex: 3,
	                                hidden:true
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'nodeType',
	                                text: translations.nodeType,
	                                flex: 3,
	                                editor: Ext.create('Ext.form.ComboBox', {
															    store: nodeStore,
															    itemId:'comboNodeType',
															    queryMode: 'local',
															    displayField: 'nodeName',
															    valueField: 'nodeId'
														}),
					                renderer:function(value) {
					                	var comboNodeType = Ext.ComponentQuery.query('combo#comboNodeType')[0];
					                	return comboNodeType.setValue(value).getRawValue();
					                }
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'sequence',
	                                text: '顺序',
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + '顺序',
				                    	allowBlank:true
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'extCol1',
	                                text: translations.extCol1,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.extCol1,
				                    	allowBlank:true
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'extCol1Desc',
	                                text: translations.extCol1Desc,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.extCol1Desc,
				                    	allowBlank:true
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'extCol2',
	                                text: translations.extCol2,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.extCol2,
				                    	allowBlank:true
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'extCol2Desc',
	                                text: translations.extCol2Desc,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.extCol2Desc,
				                    	allowBlank:true
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'extCol3',
	                                text: translations.extCol3,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.extCol3,
				                    	allowBlank:true
									}
	                            },
	                            {
	                                xtype: 'gridcolumn',
	                                dataIndex: 'extCol3Desc',
	                                text: translations.extCol3Desc,
	                                flex: 3,
	                                editor : {
										xtype : 'textfield',
										emptyText:translations.pleaseInput + translations.extCol3Desc,
				                    	allowBlank:true
									}
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
	                   
                        ]
                    }]
        });
		this.callParent(arguments);
	}
});

