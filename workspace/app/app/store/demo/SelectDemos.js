Ext.define('Sgai.store.demo.SelectDemos', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.demo.SelectDemo',
			storeId : 'selectdemos',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'report/select-report-query/findByPage.action?selectId=selectDemo'
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
