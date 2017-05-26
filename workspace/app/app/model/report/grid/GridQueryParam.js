Ext.define('Sgai.model.report.grid.GridQueryParam', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			idProperty : 'sid',
			fields : [{
						name : 'paramId',
						type : 'string',
						defaultValue : null
					}, {
						name : 'paramDesc',
						type : 'string',
						defaultValue : null
					}, {
						name : 'paramType',
						type : 'string',
						defaultValue : null
					}, {
						name : 'paramLength',
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
						name : 'gridSid',
						type : 'float',
						defaultValue : null
					}]
		});
