
Ext.define('Sgai.model.MapModel',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        fields: [
            {name: 'key' , type: 'string',defaultValue:null},  
            {name: 'value' , type: 'string',defaultValue:null}
            ]
    });
