
Ext.define('Sgai.store.common.commonType.MdCommonTypeItemStore',
{
        extend: 'Ext.data.Store',
        autoLoad: false,        
        pageSize:10,
        model: 'Sgai.model.common.commonType.MdCommonTypeModel',
        // 使用proxy指定加载远程数据
        proxy:
        {
        	actionMethods:
        	{
				read:'POST'
        	},
            type:'ajax',
            api:
            {
                read:'md/md-common-type/findItemsByTypeId.action' 
            },

            reader:
            {
                type:'json',
                rootProperty:'items',
                totalProperty:'totalProperty',
                successProperty:'success',
                messageProperty:'message'
            }
        },
        remoteSort: 'true'
    });