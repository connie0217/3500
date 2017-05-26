
Ext.define('Sgai.model.su.role.Role',
    {
        extend: 'Sgai.model.AbstractModel',
        autoLoad: true,
        fields: [
            {name: 'roleId' , type: 'string'},  
            {name: 'roleName', type: 'string'}, 
            {name: 'roleDesc' , type: 'string'},
            {name: 'roleResources' , type: 'string'}
        ]
    });
