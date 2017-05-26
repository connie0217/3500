Ext.define('Sgai.store.md.res.category.Category', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.md.res.category.CategoryVO',
			storeId : 'mdresources',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'res/res-categories/findByPage.action',
					create : 'res/res-categories/addBatchFromJson.action',
					update : 'res/res-categories/updateBatchFromJson.action',
					destroy : 'res/res-categories/destroy.action'
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
