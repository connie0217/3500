Ext.define('Sgai.store.report.grid.GridColumns', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.report.grid.GridColumn',
			storeId : 'ui.gridgridcolumns',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'ui/column/read.action',
					create : 'ui/column/addBatchFromJson.action',
					update : 'ui/column/update.action',
					destroy : 'ui/column/destroy.action'
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
