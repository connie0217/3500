Ext.define('Sgai.model.common.AbstractEntity',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        idProperty:'sid',
        fields: [
            {name: 'sid' , type: 'int'},
            {name: 'createdBy', type: 'string'},
            {name: 'createdTimestamp', type: 'time'},
            {name: 'updatedBy', type: 'string'},
            {name: 'updatedTimestamp', type: 'time'},
            {name: 'version', type: 'int',defaultValue:1}
        ]
    });
