
Ext.define('Sgai.store.common.operateLog.OperateLog',
{
        extend: 'Ext.data.Store',
        autoLoad: false,        
        pageSize:15,
        model: 'Sgai.model.common.operateLog.OperateLog',
        storeId: 'operateLogStore',
    	
        //使用proxy指定加载远程数据
        proxy:
        {
            type:'ajax',
            method:'POST',
            api:
            {
                read:'system/operation-log!findByPage.action'
            },

            reader:
            {
                type:'json',
                rootProperty:'items',
                totalProperty:'totalProperty',
                successProperty:'success',
                messageProperty:'message'
            },
            
            listeners: {
		        exception:function(proxy,response,operation,eOpts) {
		            var o = Ext.decode(response.responseText);  
		            if(!o.success){  
		                Ext.Msg.alert(translations.errMsgWinTitle,eval("translations." + o.message));  
		            }
	        	}
	    	}
        } ,

        remoteSort: 'true'
    });