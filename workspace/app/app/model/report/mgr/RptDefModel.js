Ext.define('Sgai.model.report.mgr.RptDefModel', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			idProperty : 'sid',
			fields : [{
						name : 'rptId',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptTemplatePath',
						type : 'string',
						defaultValue : null
					}, {
						name : 'pagingFlag',
						type : 'float',
						defaultValue : null
					}, {
						name : 'validateExpr',
						type : 'string',
						defaultValue : null
					}, {
						name : 'pageComputeFlag',
						type : 'string',
						defaultValue : null
					}, {
						name : 'numPerExcel',
						type : 'float',
						defaultValue : null
					}, {
						name : 'totalCountDs',
						type : 'string',
						defaultValue : null
					}, {
						name : 'totalCountSql',
						type : 'string',
						defaultValue : null
					}]
		});
