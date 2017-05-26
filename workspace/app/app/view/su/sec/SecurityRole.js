Ext.define('Sgai.view.su.sec.SecurityRole', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.securityRole',
			title : '权限项',

			autoScroll : true,
			reference : 'securityRole',
			loadMask : true,
			requires : ['Sgai.view.su.sec.SecurityRoleGrid'],

			layout : 'fit',

			dockedItems : [{
						xtype : 'queryform',
						itemId : 'roleForm',
						formItems : [{
									name : 'qm.securityRoleId',
									xtype : 'textfield',
									itemId : 'securityRoleId',
									reference : 'securityRoleId',
									width : 230,
									labelWidth : 80,
									fieldLabel : '权限项ID'
								}, {
									name : 'qm.roleGroup',
									reference : 'roleGroupTmp',
									itemId : 'roleGroupTmp',
									xtype : 'hidden'
								}]
					}],
			items : [{
						xtype : 'securityRoleGrid',
						reference : 'securityRoleGrid'
					}]
		});