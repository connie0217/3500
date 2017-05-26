Ext.define('Sgai.view.su.sec.SecurityGroup', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.securityGroup',
			title : '权限大类',
			autoScroll : true,
			reference : 'securityGroup',
			loadMask : true,
			layout : 'fit',

			requires : ['Sgai.view.su.sec.SecurityGroupGrid'],

			dockedItems : [{
						xtype : 'queryform',
						itemId : 'groupForm',
						formItems : [{
									name : 'qm.roleGroup',
									xtype : 'textfield',
									itemId : 'roleGroup',
									reference : 'roleGroup',
									width : 200,
									labelWidth : 80,
									fieldLabel : '权限大类ID'
								}]
					}],
			items : [{
						xtype : 'securityGroupGrid',
						reference : 'securityGroupGrid'
					}]
		});