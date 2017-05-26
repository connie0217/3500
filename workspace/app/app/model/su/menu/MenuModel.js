Ext.define('Sgai.model.su.menu.MenuModel', {
    extend: 'Ext.data.TreeModel',
    
    idProperty: 'sid',

    fields: [
        {
            name: 'sid'
        },    
        {
            name: 'id'
        },    
        {
            name: 'resId'
        },
        {
            name: 'resName'
        },
        {
            name: 'resType'
        },
        {
            name: 'resUri'
        },
        {
            name: 'resLevel'
        },
        {
            name: 'parentSid'
        }
    ]
});