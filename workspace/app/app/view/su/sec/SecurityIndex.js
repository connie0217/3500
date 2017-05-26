Ext.define('Sgai.view.su.sec.SecurityIndex', {
			extend : 'Ext.panel.Panel',
			alias : "widget.securityIndex",
			layout : 'border',
			itemId : 'securityIndex',

			requires : ['Sgai.view.su.sec.SecurityGroup',
					'Sgai.view.su.sec.SecurityRole',
					'Sgai.view.su.sec.SecurityRoleWin',
					'Sgai.view.su.sec.SecurityController'],
			controller : 'securityController',

			items : [{
						xtype : 'securityGroup',
						reference : 'securityGroup',
						region : 'center',
						width : '33%',
						flex : 1
					}, {
						xtype : 'securityRole',
						reference : 'securityRole',
						region : 'east',
						width : '67%',
						flex : 1
					}]
		});
