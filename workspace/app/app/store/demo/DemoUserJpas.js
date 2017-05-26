Ext.define('Sgai.store.demo.DemoUserJpas', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.demo.DemoUserJpa',
			storeId : 'demouserjpas',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'demo/user-demo-jpa/findByPage.action',
					create : 'demo/user-demo-jpa/add.action',
					update : 'demo/user-demo-jpa/update.action',
					destroy : 'demo/user-demo-jpa/destroy.action'
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
