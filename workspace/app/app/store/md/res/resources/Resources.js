Ext.define('Sgai.store.md.res.resources.Resources', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.md.res.resources.ResourcesVO',
			storeId : 'mdresources',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'res/resources-vo/findByPage.action',
					create : 'res/resources-vo/addBatchFromJson.action',
					update : 'res/resources-vo/updateBatchFromJson.action',
					destroy : 'res/resources-vo/destroy.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'data.items',
					totalProperty : 'data.totalProperty',
					successProperty : 'meta.success',
					messageProperty : 'meta.message'
				}
			}
		});
