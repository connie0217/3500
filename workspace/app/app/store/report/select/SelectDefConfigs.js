
Ext.define('Sgai.store.report.select.SelectDefConfigs',
{
        extend: 'Ext.data.Store',
        autoLoad: false,  
        model: 'Sgai.model.report.select.SelectDefConfig',
        storeId: 'selectselectdefconfigs',			        	
        remoteSort: true,
        proxy:
        {
	    type:'ajax',
	    actionMethods:  
            {
                read:'POST'
            },
            api:
            {
                read:'select/select-def-config/read.action',
                create:'select/select-def-config/add.action',
                update:'select/select-def-config/update.action',
                destroy:'select/select-def-config/destroy.action'
            },

            reader:
            {
                type:'json',
                rootProperty:'data',
                totalProperty:'data.totalProperty',
                successProperty:'success',
                messageProperty:'message'
            }
        } 
    });
