Ext.define('Sgai.model.su.orgnization.OrgnizationModel',{
	extend: 'Ext.data.TreeModel',
        autoLoad: true,
        fields: [
        	{name: 'sid', type: 'int',critical:true},
        	{name: 'orgId', type: 'string'},
        	{name: 'parentSid', type: 'int', userNull:true},
        	{name: 'orgName', type: 'string'},
        	{name: 'orgBriefName', type: 'string'},
        	{name: 'orgLocation', type: 'string'},
        	{name: 'orgLevel', type: 'int'},
        	{name: 'orgSeq', type: 'int'},
        	{name: 'officeFlag', type: 'string'},
        	{name: 'orgShortCode', type: 'string'},
        	{name: 'psDutyFlag', type: 'string'},
        	{name: 'comments', type: 'string'},
        	{name: 'createdBy', type: 'string'},
            {name: 'createdDt', type: 'date'},
            {name: 'updatedBy', type: 'string'},
            {name: 'updatedDt', type: 'date'},
            {name: 'version', type: 'int',critical:true}
        	
        ]
});