Ext.define('Sgai.store.common.cache.CacheCatStore', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			model : 'Sgai.model.common.cache.CacheCatModel',
			storeId : 'cacheCatStore',
			remoteSort : false,
			folderSort : false,

			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'cache/findAllCats.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'data'
				}
			}
		});