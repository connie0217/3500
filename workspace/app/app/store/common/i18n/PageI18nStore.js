
Ext.define('Sgai.store.common.i18n.PageI18nStore',
{
        extend: 'Ext.data.Store',
        autoLoad: false,        
        pageSize:15,
        model: 'Sgai.model.common.i18n.PageI18nModel',
        storeId: 'pageI18nStore',
    	

        //使用proxy指定加载远程数据
        proxy:
        {
            type:'ajax',
            method:'POST',
            api:
            {
                read:'system/page-i18n!findByPage.action',
                create:'system/page-i18n!add.action',
                update:'system/page-i18n!update.action',
                destroy:'system/page-i18n!destroy.action'
            },

            reader:
            {
                type:'json',
                rootProperty:'items',
                totalProperty:'totalProperty',
                successProperty:'success',
                messageProperty:'message'
            }//,
            
//            listeners: {
//		        exception:function(proxy,response,operation,eOpts) {
//		            var o = Ext.decode(response.responseText);  
//		            if(!o.success){  
//		                Ext.Msg.alert(translations.errMsgWinTitle,o.message);  
//		            }
//	        	}
//	    	}
        } ,

        remoteSort: 'true'
    });