
Ext.define('Sgai.model.common.commonType.CommonTypeItemModel',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        fields: [
            {name: 'sid' , type: 'string'},               
            {name: 'typeSid' , type: 'string'},  
            {name: 'itemId', type: 'string'},
            {name: 'itemName', type: 'string'},
            {name: 'createdBy', type: 'string'},
            {name: 'createdTimestamp', type: 'string'},
            {name: 'updatedBy', type: 'string'},
            {name: 'updatedTimestamp', type: 'string'},
            {name: 'version', type: 'int'}
        ]
    });
