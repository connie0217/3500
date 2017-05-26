Ext.define('Sgai.view.su.sec.SecurityGroupGrid', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.securityGroupGrid',
			store : Ext.create('Sgai.store.su.sec.SecurityGroupStore', {
						storeId : 'securityGroupStore'
					}),
			selModel : {
				selType : 'checkboxmodel',
				mode : 'SINGLE',
				allowDeselect : true
			},

			autoScroll : true,
			reference : 'securityGroupGrid',
			loadMask : true,
			columns : [{
						xtype : 'rownumberer',
						width : 35,
						text : '序号'
					}, {
						text : '权限类别ID',
						flex : 1,
						dataIndex : 'roleGroup',
						editor : {
							xtype : 'textfield',
							allowBlank : false
						}
					}, {
						text : '权限类别名称',
						flex : 2,
						dataIndex : 'roleGroupName',
						editor : {
							xtype : 'textfield',
							allowBlank : false
						}
					}],
			listeners : [{
						selectionchange : 'tabGroupSelect'
					}],
			dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						items : [{
									xtype : 'button',
									text : '添加',
									iconCls : 'add',
									reference : 'addGroup',
									handler : 'addGroupClick'
								}, {
									xtype : 'button',
									text : '删除',
									iconCls : 'delete',
									reference : 'delGroup',
									handler : 'delGroupClick'
								}, {
									xtype : 'button',
									text : translations.save,
									iconCls : 'save',
									reference : 'saveGroup',
									handler : 'saveGroupClick'
								}]
					}, {
						xtype : 'pagingtoolbar',
						store : 'securityGroupStore',
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					}],
			plugins : [Ext.create('Ext.grid.plugin.CellEditing', {
						pluginId : 'groupCellEditing',
						clicksToEdit : 1,
						listeners : [{
									beforeedit : 'beforeEditFunc'
								}]
					})]
		});