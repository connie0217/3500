Ext.define('Sgai.view.su.password.Password', {
	extend : 'Ext.window.Window',
	alias : 'widget.password',
	itemId : 'Password',
	title:'修改密码',
	closable : true,
	layout : 'fit',
	autoShow : true,
	height : 200,
	width : 400,
	requires : [ 'Sgai.util.Util', 'Sgai.view.Translation','Ext.ux.layout.Center' ],

	initComponent : function() {
		var params = {
			labelWidth : 100,
			labelAlign : 'right',
			defaultVal:1
		};

		this.items = [ {
			xtype : 'form',
			frame : false,
			bodyPadding : 15,
			defaults:{
				anchor : '100%'
			},
			layout : {
				type : 'table',
				columns : 1,
				align : 'stretch'
			},

			items : [ {
				name : 'qm.password',
				itemId : 'password',
				xtype : 'textfield',
				labelWidth : 100,
				inputType : 'password',
				labelAlign : 'right',
				fieldLabel : translations.suPassword.password,
				allowBlank : false,
				width : 250
			},
			{
				name : 'qm.newPassword',
				itemId : 'newPassword',
				xtype : 'textfield',
				labelWidth : 100,
				inputType : 'password',
				labelAlign : 'right',
				fieldLabel : '新密码',
				allowBlank : false,
				vtype : 'alphanum',
				minLength : 3,
				maxLength:10,
				width : 250,
				colspan : 2,
				disabled : false
				}, 
				{
				name : 'qm.sureNewPassword',
				itemId : 'sureNewPassword',
				xtype : 'textfield',
				labelWidth : 100,
				inputType : 'password',
				labelAlign : 'right',
				fieldLabel : '确认新密码',
				allowBlank : false,
				width : 250,
				enableKeyEvents : true,
				vtype : 'password',
				sure : 'sureNewPassword',
				password : {
					fresh : 'newPassword',
					sure : 'sureNewPassword'
				},
				colspan : 2,
		        msgTarget : 'under',
				disabled : false
			} 
				],

dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [ {
					xtype : 'tbfill'
				},
				 {
				 xtype : 'button',
				 text : translations.cancel,
				 itemId : 'cancelBtn',
				 iconCls : 'cancel',
				 colspan : 2
				 },

				{
					xtype : 'button',
					itemId : 'submit',
					iconCls : 'key-go',
					colspan : 2,
					formBind:true,
					text : translations.submit
				} ]
			} ]
	} ];
		this.callParent(arguments);  
	}
});
