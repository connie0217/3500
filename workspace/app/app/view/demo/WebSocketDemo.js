Ext.define('Sgai.view.demo.WebSocketDemo',
{
	extend : 'Ext.panel.Panel',
	alias : 'widget.websocketdemo',
	requires : ['Sgai.view.demo.WebSocketDemoController'],
	controller : 'websocketdemo',
	layout : {
		type : 'fit'
	},
	dockedItems : [
	{
		xtype : 'form',
		reference : 'pushForm',
		border : false,
		items : [
		{
			xtype : 'toolbar',
			dock : 'top',
			border : false,
			items : [
			{
				xtype:'textfield',
				name : 'loginId',
				allowBlank:false,
				labelWidth : 80,
				fieldLabel : '用户ID',
				labelAlign:'right',
				width : 250
			},
			{
				xtype:'textfield',
				name : 'message',
				allowBlank:false,
				labelWidth : 80,
				fieldLabel : '消息',
				labelAlign:'right',
				width : 300
			},
			{
				xtype : 'button',
				text : "推送",
				iconCls : 'add',
				formBind:true,
				listeners : {
					click : 'pushMessage'
				}
			}]
		}]
	}]
});