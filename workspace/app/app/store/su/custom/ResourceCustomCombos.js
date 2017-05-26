Ext.define('Sgai.store.su.custom.ResourceCustomCombos', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			alias: 'store.suresourcecustomcombos',
			model : 'Sgai.model.su.custom.ResourceCustom',
			storeId : 'suresourcecustomcombos',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'system/resource-custom!findUserCustomFolders.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'items',
					totalProperty : 'totalProperty',
					successProperty : 'success',
					messageProperty : 'message'
				}
			}
		});
