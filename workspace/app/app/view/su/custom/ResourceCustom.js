Ext.define('Sgai.view.su.custom.ResourceCustom', {
    extend: 'Ext.tree.Panel',
	alias : 'widget.resourcecustom',
	requires : ['Sgai.view.su.custom.ResourceCustomController',
			'Sgai.view.su.custom.ResourceCustomTree'],
	controller : 'resourcecustom',
	layout : {
		type : 'fit'
	},
	store : Ext.create('Sgai.store.su.custom.ResourceCustoms', {
		storeId : 'resourceCustomStore'
	}),
	autoHeight : true,
	trackMouseOver : true,
	animate : true,
	useArrows : true,
	loadMask : true,
	rootVisible : true,
	singleClickExpand : true,

	tbar : [{
				xtype : 'button',
				text : translations.expandAll,
				iconCls : 'arrow-out',
				itemId : 'btnResourceExpandAll',
				listeners : {
					click : 'onButtonClickExpandAll'
				}
			}, {
				xtype : 'button',
				text : translations.collapseAll,
				iconCls : 'arrow-in',
				itemId : 'btnResourceCollapseAll',
				listeners : {
					click : 'onButtonClickCollapseAll'
				}
			}, '-', {
				xtype : 'button',
				text : '添加文件夹',
				// privilegeCode:'SU010101',
				iconCls : 'add',
				itemId : 'btnResourceAddNode',
				listeners : {
					click : 'onButtonClickAdd'
				}
			}, {
				xtype : 'button',
				text : '删除',
				// privilegeCode:'SU010102',
				iconCls : 'delete',
				itemId : 'btnResourceDelNode',
				listeners : {
					click : 'onButtonClickDelete'
				}
			}, {
				xtype : 'button',
				text : translations.submit,
				// privilegeCode:'SU010103',
				iconCls : 'save',
				itemId : 'btnResourceSave',
				listeners : {
					click : 'onButtonClickSave'
				}
			}],

	columns : [{
				xtype : 'treecolumn',
				dataIndex : 'sid',
				text : translations.resList,
				flex : 7,
				renderer : function(value, metaData, record) {
					var text = translations[value];
					if (Ext.isEmpty(text)) {
						text = record.get('customName');
					}
					return text;
				}
			}, {
				xtype : 'gridcolumn',
				dataIndex : 'sid',
				text : translations.sid,
				hidden : true,
				flex : 2
			}, {
				xtype : 'gridcolumn',
				dataIndex : 'customName',
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
			}, {
				xtype : 'gridcolumn',
				dataIndex : 'dispSeq',
				text : translations.resSeq,
				flex : 3,
				editor : {
					xtype : 'textfield',
					emptyText : translations.pleaseInput
							+ translations.resSeq,
					allowBlank : false,
					maxLength : 3,
					enforceMaxLength : true,
					vtype : 'positiveInteger',
					msgTarget : 'under'
				}
			}, {
				xtype : 'gridcolumn',
				dataIndex : 'customLevel',
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

	],
	plugins : [{
				ptype : 'cellediting',
				pluginId : 'resourceTreeCellEditing',
				clicksToEdit : 1
			}],
	listeners : {
		'afterrender' : 'resourceCustomTreeRender',
		'itemcontextmenu' : 'treeContextMenu'
	},
	viewConfig : {
		forceFit : true,
		scrollOffset : 0,
		enableTextSelection : true,
		plugins : {
			ptype : 'treeviewdragdrop',
			ddGroup : 'group',
			appendOnly : true,
			sortOnDrop : true,
			containerScroll : true
		}
	}

});