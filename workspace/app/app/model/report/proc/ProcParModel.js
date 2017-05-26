Ext.define('Sgai.model.report.proc.ProcParModel', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			idProperty : 'sid',
			fields : [{
						name : 'packageNname',
						type : 'string',
						defaultValue : null
					}, {
						name : 'objectName',
						type : 'string',
						defaultValue : null
					}, {
						name : 'argumentName',
						type : 'string',
						defaultValue : null
					}, {
						name : 'position',
						type : 'string',
						defaultValue : null
					}, {
						name : 'dataType',
						type : 'string',
						defaultValue : null
					}, {
						name : 'inOut',
						type : 'string',
						defaultValue : null
					}, {
						name : 'parVal',
						type : 'string',
						defaultValue : null
					}]
		});
