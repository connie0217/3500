Ext.define('Sgai.model.su.sec.SecurityGroupModel', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			fields : [{
						name : 'roleGroup',
						type : 'string',
						defaultValue : ''
					}, {
						name : 'roleGroupName',
						type : 'string',
						defaultValue : ''
					}]
		});
