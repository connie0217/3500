Ext.define('Sgai.model.su.orgnization.OrgModel',{
	extend: 'Ext.data.TreeModel',
        autoLoad: true,
        idProperty:'sid',
        versionProperty:'version',
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
        	{name: 'comments', type: 'string'},
        	{name: 'orgShortCode', type: 'string'},
        	{name: 'psDutyFlag', type: 'string'},
        	{name: 'createdBy', type: 'string'},
            {name: 'createdDt', type: 'date'},
            {name: 'updatedBy', type: 'string'},
            {name: 'updatedDt', type: 'date'},
            {name: 'version', type: 'int',critical:true}    	
        ]
});