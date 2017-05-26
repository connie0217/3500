Ext.define('Sgai.store.msg.NotifyMessages', {
			extend : 'Ext.data.Store',
			model : 'Sgai.model.msg.NotifyMessage',
			storeId : 'notifymessages',
			proxy : {
				type : 'memory',
				data:[]
			}
		});
