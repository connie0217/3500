
Ext.define('Sgai.model.su.group.Group',
    {
		extend: 'Sgai.model.AbstractModel',
        autoLoad: true,
        fields: [
            {name: 'userGroupId' , type: 'string'},  
            {name: 'userGroupName', type: 'string'}, 
            {name: 'userGroupDesc' , type: 'string'},
            {name: 'groupUsers', type: 'string'}, 
            {name: 'groupRoles' , type: 'string'}
        ]
    });
