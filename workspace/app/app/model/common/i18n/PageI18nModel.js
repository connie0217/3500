
Ext.define('Sgai.model.common.i18n.PageI18nModel',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        fields: [
            {name: 'sid' , type: 'int'},               
            {name: 'i18nKey' , type: 'string'},  
            {name: 'i18nValue', type: 'string'},
            {name: 'language', type: 'string'},
            {name: 'delFlag', type: 'int'},           
            {name: 'createdBy', type: 'string'},
            {name: 'createdTimestamp', type: 'date'},
            {name: 'updatedBy', type: 'string'},
            {name: 'updatedTimestamp', type: 'date'},
            {name: 'version', type: 'int'}
        ]
    });
