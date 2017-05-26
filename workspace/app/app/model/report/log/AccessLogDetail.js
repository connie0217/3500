Ext.define('Sgai.model.report.log.AccessLogDetail', {
	extend : 'Ext.data.Model',
	autoLoad : true,
	idProperty : 'sid',
	fields : [{
				name : 'sid',
				type : 'int',
				defaultValue : null
			}, {
				name : 'createdDt',
				type : 'date'
			}, {
				name : 'createdBy',
				type : 'string'
			}, {
				name : 'requestBy',
				type : 'string',
				defaultValue : null
			}, {
				name : 'requestIp',
				type : 'string',
				defaultValue : null
			}, {
				name : 'rptId',
				type : 'string',
				defaultValue : null
			}, {
				name : 'rptName',
				type : 'string',
				defaultValue : null
			}, {
				name : 'requestByName',
				type : 'string',
				defaultValue : null
			}, {
				name : 'startTimestamp',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s',
				defaultValue : null
			}, {
				name : 'endTimestamp',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s',
				defaultValue : null
			}, {
				name : 'params',
				type : 'string',
				defaultValue : null
			}, {
				name : 'accessResult',
				type : 'int',
				useNull : true
			}, {
				name : 'duration',
				type : 'string',
				defaultValue : null
			}, {
				name : 'durationCompute',
				convert : function(v, record) {
					if (record.get('endTimestamp') && record.get('startTimestamp')) {
						return (record.get('endTimestamp').getTime() - record.get('startTimestamp')
								.getTime())
								* 0.001
					} else {
						return ''
					}
				}
			}

	]
});
