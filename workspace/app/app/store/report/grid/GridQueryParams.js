Ext.define('Sgai.store.report.grid.GridQueryParams', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.report.grid.GridQueryParam',
			storeId : 'ui.gridgridqueryparams',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'ui/grid-query-param/read.action',
					create : 'ui/grid-query-param/add.action',
					update : 'ui/grid-query-param/update.action',
					destroy : 'ui/grid-query-param/destroy.action'
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
