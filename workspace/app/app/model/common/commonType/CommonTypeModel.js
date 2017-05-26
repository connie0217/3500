
Ext.define('Sgai.model.common.commonType.CommonTypeModel',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        fields: [
            {name: 'sid' , type: 'string'},               
            {name: 'typeId' , type: 'string'},  
            {name: 'typeName', type: 'string'},
            {name: 'typeDesc', type: 'string'},
            {name: 'createdBy', type: 'string'},
            {name: 'createdTimestamp', type: 'string'},
            {name: 'updatedBy', type: 'string'},
            {name: 'updatedTimestamp', type: 'string'},
            {name: 'version', type: 'int'}
        ]
    });
