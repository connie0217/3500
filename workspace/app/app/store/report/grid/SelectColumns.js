Ext.define('Sgai.store.report.grid.SelectColumns', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.report.grid.SelectColumn',
			storeId : 'ui.gridselectcolumns',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'report/select-report-query/findAllColumnsBySelectId.action'
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
