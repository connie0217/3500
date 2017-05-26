Ext.define('Sgai.model.su.securityRole.SecurityRole',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        fields: [
            {name: 'sid' , type: 'int'},               
            {name: 'text' , type: 'string'}, 
            {name: 'checked' , type: 'boolean'}
        ]
    });
