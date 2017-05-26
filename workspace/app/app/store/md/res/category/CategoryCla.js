Ext.define('Sgai.store.md.res.category.CategoryCla', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.md.res.category.CategoryCla',
			storeId : 'mdresources',
			remoteSort : false,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'res/res-classifications/findByParams.action',
					create : 'res/res-classifications/addBatchFromJson.action',
					update : 'res/res-classifications/updateBatchFromJson.action',
					destroy : 'res/res-classifications/destroy.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'data',
					successProperty : 'meta.success',
					messageProperty : 'meta.message'
				}
			}
		});
