Ext.define('Sgai.store.demo.DemoUsers', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.demo.DemoUser',
			storeId : 'demousers',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'demo/user-demo/findByPage.action',
					create : 'demo/user-demo/addDemoUser.action',
					update : 'demo/user-demo/update.action',
					destroy : 'demo/user-demo/destroy.action'
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
