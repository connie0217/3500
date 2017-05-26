Ext.define('Sgai.view.msg.MsgDisplayList', 
{
	extend : 'Ext.grid.Panel',
	alias : 'widget.msgdisplaylist',
	border:false,
	store : Ext.create('Sgai.store.msg.NotifyMessages'),
	loadMask : true,
	columns : [
	{
		flex:1,
		dataIndex : 'messageTime',
		xtype : 'datecolumn',
		format : Sgai.util.Util.commTimeFormat,
		text : '接收时间'
	},
	{
		flex:2,
		dataIndex : 'message',
		text : '消息内容',
		renderer : function(value, meta, record) {
			meta.style = 'white-space:normal;word-break:break-all;';
			return value;
		}
	}]
});
