Ext.define('Sgai.view.su.sec.SecurityRoleGrid', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.securityRoleGrid',
			store : Ext.create('Sgai.store.su.sec.SecurityRoleStore', {
						storeId : 'securityRoleStore'
					}),
			selModel : {
				selType : 'checkboxmodel',
				allowDeselect : false
			},

			autoScroll : true,
			reference : 'securityRoleGrid',
			itemId : 'securityRoleGrid',
			loadMask : true,
			dockedItems : [],
			columns : [{
						xtype : 'rownumberer',
						width : 35,
						text : '序号'
					}, {
						text : '权限项ID',
						flex : 1,
						dataIndex : 'securityRoleId'
					}, {
						text : '权限项名称',
						flex : 1.5,
						dataIndex : 'securityRoleName'
					}, {
						text : '权限项描述',
						flex : 2,
						dataIndex : 'securityRoleDesc'
					}, {
						text : '对象ID',
						flex : 1,
						dataIndex : 'object'
					}, {
						text : '实例主键',
						flex : 2,
						dataIndex : 'instanceSid'
					}],
			dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						items : [{
									xtype : 'button',
									text : '添加',
									iconCls : 'add',
									reference : 'addRole',
									handler : 'addRoleClick'
								}, {
									xtype : 'button',
									text : '修改',
									iconCls : 'update',
									reference : 'updateRole',
									handler : 'updateRoleClick'
								}, {
									xtype : 'button',
									text : '删除',
									iconCls : 'delete',
									reference : 'delRole',
									handler : 'delRoleClick'
								}]
					}, {
						xtype : 'pagingtoolbar',
						store : 'securityRoleStore',
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					}]
		});