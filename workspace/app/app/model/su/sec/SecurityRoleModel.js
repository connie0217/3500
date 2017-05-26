Ext.define('Sgai.model.su.sec.SecurityRoleModel', {
			extend : 'Sgai.model.AbstractModel',
			autoLoad : true,
			idProperty:['roleSid'],
			fields : [{
						name : 'roleSid',
						type : 'int',
						defaultValue : '',
						critical : true
					}, {
						name : 'roleVersion',
						type : 'int',
						defaultValue : '',
						critical : true
					}, {
						name : 'busSid',
						type : 'int',
						defaultValue : '',
						critical : true
					}, {
						name : 'busVersion',
						type : 'int',
						defaultValue : '',
						critical : true
					}, {
						name : 'securityRoleId',
						type : 'string',
						defaultValue : ''
					}, {
						name : 'securityRoleName',
						type : 'string',
						defaultValue : ''
					}, {
						name : 'securityRoleDesc',
						type : 'string',
						defaultValue : ''
					}, {
						name : 'roleGroup',
						type : 'string',
						defaultValue : ''
					}, {
						name : 'object',
						type : 'string',
						defaultValue : ''
					}, {
						name : 'instanceSid',
						type : 'string',
						defaultValue : ''
					}]
		});
