Ext.define('Sgai.model.msg.NotifyMessage', {
	extend : 'Ext.data.Model',
	autoLoad : true,
	idProperty : 'messageId',
	fields : [ {
		name : 'messageId',
		type : 'string',
		defaultValue : null
	}, {
		name : 'messageTime',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'message',
		type : 'string',
		defaultValue : null
	} ]
});
