Ext.define('Sgai.model.report.mgr.RptMgrListModel', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			idProperty : 'sid',
			fields : [{
						name : 'rptId',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptName',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptCat',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptCategorySid',
						type : 'string',
						defaultValue : null
					}, {
						name : 'resSid',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptState',
						type : 'string',
						defaultValue : null
					}, {
						name : 'fillingFlag',
						type : 'string',
						defaultValue : null
					}, {
						name : 'groupFlag',
						type : 'string',
						defaultValue : null
					}, {
						name : 'excelImportFlag',
						type : 'string',
						defaultValue : null
					}, {
						name : 'createdBy',
						type : 'string',
						defaultValue : null
					}, {
						name : 'createdDt',
						type : 'date',
						dateFormat : 'Y-m-d H:i:s',
						defaultValue : null
					}]
		});
