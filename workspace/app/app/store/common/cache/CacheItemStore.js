Ext.define('Sgai.store.common.cache.CacheItemStore', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			model : 'Sgai.model.common.cache.CacheItemModel',
			storeId : 'cacheItemStore',
			remoteSort : false,
			folderSort : false,

			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'cache/findItemByField.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'data'
				}
			}
		});