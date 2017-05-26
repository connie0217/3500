Ext.define('Sgai.model.report.proc.ProcLogModel', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			idProperty : 'sid',
			fields : [{
						name : 'procId',
						type : 'string',
						defaultValue : null
					}, {
						name : 'doExp',
						type : 'string',
						defaultValue : null
					}, {
						name : 'requestBy',
						type : 'string',
						defaultValue : null
					}, {
						name : 'params',
						type : 'string',
						defaultValue : null
					}, {
						name : 'runState',
						type : 'string',
						defaultValue : null
					}, {
						name : 'runTime',
						type : 'date',
						dateFormat : 'Y-m-d H:i:s',
						defaultValue : null
					}, {
						name : 'exception',
						type : 'string',
						defaultValue : null
					}]
		});
