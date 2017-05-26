Ext.define('Sgai.model.report.mgr.RptParModel', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			idProperty : 'sid',
			fields : [{
						name : 'rptParId',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptParDesc',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptParType',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptParLength',
						type : 'float',
						defaultValue : null
					}, {
						name : 'defaultVal',
						type : 'string',
						defaultValue : null
					}, {
						name : 'ruleExpr',
						type : 'string',
						defaultValue : null
					}, {
						name : 'dispSeq',
						type : 'float',
						defaultValue : null
					}, {
						name : 'hiddenFlag',
						type : 'float',
						defaultValue : null
					}, {
						name : 'requiredFlag',
						type : 'float',
						defaultValue : null
					}, {
						name : 'saveFlag',
						type : 'string',
						defaultValue : null
					}, {
						name : 'rptSid',
						type : 'float',
						defaultValue : null
					}]
		});
