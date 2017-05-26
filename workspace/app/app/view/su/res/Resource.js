Ext.define('Sgai.view.su.res.Resource',
{
    extend: 'Ext.tree.Panel',
    alias:"widget.resource",
    store: Ext.create('Sgai.store.su.res.ResourceStore',{storeId:'resourceStore'}),    
    layout:'fit', 

	controller:'resource',
    requires: [
    	'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.Column',
        'Sgai.view.su.res.ResourceController'
    ],
    autoHeight:true,
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
            	itemId: 'btnResourceExpandAll',
				listeners: {
		            click: 'onButtonClickExpandAll'
		        }  
            },
            {
             	xtype:'button',
            	text:translations.collapseAll,
            	iconCls:'arrow-out',
            	itemId: 'btnResourceCollapseAll',
				listeners: {
		            click: 'onButtonClickCollapseAll'
		        }  
            },
            '-',
            {
             	xtype:'button',
            	text:translations.addNode,
            	//privilegeCode:'SU010101',
            	iconCls:'add',
            	itemId: 'btnResourceAddNode',
				listeners: {
		            click: 'onButtonClickAdd'
		        }  
            },
            {
             	xtype:'button',
            	text:translations.delNode,
            	//privilegeCode:'SU010102',
            	iconCls:'delete',
            	itemId: 'btnResourceDelNode',
				listeners: {
		            click: 'onButtonClickDelete'
		        }  
            },
            {
             	xtype:'button',
            	text:translations.save,
            	//privilegeCode:'SU010103',
            	iconCls:'save',
            	itemId: 'btnResourceSave',
				listeners: {
		            click: 'onButtonClickSave'
		        }  
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
                editor: Sgai.util.Util.createCommonTypeComboBox('RESOURCE_TYPE','comboResType', null, false),
				renderer : function(value) {
					return getCommonTypeItemName('RESOURCE_TYPE', value);
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
        itemcontextmenu:'onButtonClickCollapseAll',
        afterrender : 'afterPanelRender'
    } 
        
    
});

