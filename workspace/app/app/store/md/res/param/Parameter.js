Ext.define('Sgai.store.md.res.param.Parameter', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.md.res.param.ParameterVO',
			storeId : 'mdresources',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'res/parameter/findByParams.action',
					create : 'res/parameter/addBatchFromJson.action',
					update : 'res/parameter/updateBatchFromJson.action',
					destroy : 'res/parameter/destroy.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'data',
					//totalProperty : 'totalProperty',
					successProperty : 'meta.success',
					messageProperty : 'meta.message'
				}
			}
		});
