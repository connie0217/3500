Ext.define('Sgai.store.report.excel.ExcelGenerateLogDetails', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			pageSize : 15,
			model : 'Sgai.model.report.excel.ExcelGenerateLogDetail',
			storeId : 'report.excelexcelgeneratelogdetails',
			remoteSort : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'report/excel-generate-log/findDetailsByPage.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'data.items',
					totalProperty : 'data.totalProperty',
					successProperty : 'success',
					messageProperty : 'message'
				}
			}
		});
