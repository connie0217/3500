Ext.define('Sgai.view.su.sec.SecurityRoleWin', {
	extend : 'Sgai.view.common.window.EditWindow',
	requires : ['Sgai.view.common.window.EditWindow',
			'Sgai.view.su.sec.SecurityRoleWinController',
			'Sgai.model.su.sec.SecurityRoleModel'],
	width : 450,
	alias : 'widget.securityRoleWin',
	height : 270,
	autoShow : false,
	modal : true,
	reference : 'securityRoleWin',
	controller : 'securityRoleWinController',
	viewModel : {
		links : {
			secRoleInfo : {
				type : 'Sgai.model.su.sec.SecurityRoleModel',
				create : true
			}
		}
	},
	listeners : {
		confirmBtnClick : 'onConfirmBtnClick',
		render : 'onWinRender'
	},
	items : [{
				xtype : 'form',
				defaults : {
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 1
				},
				defaultType : 'textfield',
				items : [{
							xtype : 'fieldset',
							title : '权限项',
							collapsible : true,
							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							width : 400,
							layout : 'anchor',
							items : [{
										fieldLabel : '权限项ID',
										name : 'securityRoleId',
										allowBlank : false,
										bind : {
											value : '{secRoleInfo.securityRoleId}'
										}
									}, {
										fieldLabel : '权限项名称',
										name : 'securityRoleName',
										allowBlank : false,
										bind : {
											value : '{secRoleInfo.securityRoleName}'
										}
									}, {
										fieldLabel : '权限项描述',
										name : 'securityRoleDesc',
										allowBlank : false,
										bind : {
											value : '{secRoleInfo.securityRoleDesc}'
										}
									}]
						}, {
							xtype : 'fieldset',
							title : '权限明细',
							collapsible : true,
							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							width : 400,
							layout : 'anchor',
							items : [{
										fieldLabel : '对象',
										name : 'object',
										allowBlank : false,
										bind : {
											value : '{secRoleInfo.object}'
										}
									}, {
										fieldLabel : '实例主键',
										name : 'instanceSid',
										allowBlank : false,
										bind : {
											value : '{secRoleInfo.instanceSid}'
										}
									}]
						}]
			}]
});