Ext.define('Sgai.view.msg.MsgDisplayWin',
{
	extend : 'Ext.window.Window',
	alias : 'widget.msgdisplaywin',
	title : '消息',
	width : 500,
	height : 400,
	border:false,
	resizable : false,
	closeAction:'hide',
	requires : [
		'Sgai.view.msg.MsgDisplayList'
	],
	layout : {
		type : 'fit'
	},
	items : [
	{
		xtype : 'msgdisplaylist',
		itemId:'msgDisplayList'
	}],
	buttons : [
	{
		text : '关闭',
		itemId : 'close',
		margin : '0 0 0 10'
	}]
});