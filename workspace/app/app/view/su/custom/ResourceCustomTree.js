Ext.define('Sgai.view.su.custom.ResourceCustomTree', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.resourcecustomtree',
	store : Ext.create('Sgai.store.su.custom.ResourceCustoms'),
	reference : 'resourceCustomTree',
	iconCls : 'data',
	autoHeight : true,
	height : 530,
	trackMouseOver : true,
	animate : true,
	useArrows : true,
	itemId : 'resourceTreePanel',
	border : 0,
	loadMask : true,
	rootVisible : true,
	singleClickExpand : true,

	tbar : [{
				xtype : 'button',
				text : translations.expandAll,
				iconCls : 'delete',
				itemId : 'btnResourceExpandAll',
				listeners : {
					click : 'onButtonClickExpandAll'
				}
			}, {
				xtype : 'button',
				text : translations.collapseAll,
				iconCls : 'add',
				itemId : 'btnResourceCollapseAll',
				listeners : {
					click : 'onButtonClickCollapseAll'
				}
			}, '-', {
				xtype : 'button',
				text : translations.addNode,
				// privilegeCode:'SU010101',
				iconCls : 'add',
				itemId : 'btnResourceAddNode',
				listeners : {
					click : 'onButtonClickAdd'
				}
			}, {
				xtype : 'button',
				text : translations.delNode,
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
					emptyText : translations.pleaseInput + translations.resName,
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
					emptyText : translations.pleaseInput + translations.resSeq,
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
		'itemcontextmenu' : function(menutree, record, items, index, e) {
			e.preventDefault();
			e.stopEvent();
			// 判断是否为叶子结点
			var treePanel = Ext.ComponentQuery
					.query('treepanel#resourceCustomTreePanel')[0];;
			if (record.data.leaf == false) {
				var nodemenu = new Ext.menu.Menu({
					floating : true,
					items : [{
						text : translations.addNode,
						handler : function() {
							if (!record.isExpanded()) {
								treePanel.expandNode(record);
							}
							if (!Ext.isEmpty(record)) {
								if (!record.isExpanded()) {
									treePanel.expandNode(record);
								}
								if (record.data.customLevel == 0) {
									var resModel = Ext.create('Sgai.model.su.custom.ResourceCustom');
									resModel.set('customLevel',1);
									resModel.store = record.store;
									record.appendChild(resModel);
								} else { // 子节点添加子节点
									Sgai.util.Util.showErrorMsg('不能在该层级添加节点');
								}
							}
						}
					}, {
						text : translations.delNode,
						handler : function() {
							if (record.hasChildNodes()) {
								Ext.MessageBox.show({
											title : translations.operateMsgWinTitle,
											msg : translations.hasChildCanNotDel,
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.INFO
										});
							} else {
								record.remove();
							}
						}
					}]
				});
				nodemenu.showAt(e.getXY());
			}
		}
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