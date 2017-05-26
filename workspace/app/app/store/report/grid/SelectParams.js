Ext.define('Sgai.store.report.grid.SelectParams', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.report.grid.SelectParam',
			storeId : 'ui.gridselectparams',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'report/select-report-query/findAllParamsBySelectId.action'
				},

				reader : {
					type : 'json',
					rootProperty :'data',
					totalProperty :'data.totalProperty',
					successProperty : 'meta.success',
					messageProperty : 'meta.message'
				}
			}
		});
