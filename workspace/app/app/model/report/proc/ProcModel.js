Ext.define('Sgai.model.report.proc.ProcModel', {
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
						name : 'procId',
						type : 'string',
						defaultValue : null
					}, {
						name : 'procName',
						type : 'string',
						defaultValue : null
					}, {
						name : 'resSid',
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
