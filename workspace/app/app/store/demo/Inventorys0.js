Ext.define('Sgai.store.demo.Inventorys0', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.demo.Inventory0',
			storeId : 'inventorys0',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'demo/Inventory0/findByPage.action'
				},
				reader : {
					type : 'json',
					rootProperty :'data.items',
					totalProperty :'data.totalProperty',
					successProperty : 'meta.success',
					messageProperty : 'meta.message'
				}
			}
		});
