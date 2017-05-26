
Ext.define('Sgai.store.common.commonType.CommonTypeStore',
{
        extend: 'Ext.data.Store',
        autoLoad: false,        
        pageSize:10,
        model: 'Sgai.model.common.commonType.CommonTypeModel',
        storeId: 'commonTypeStore',
        remoteSort: 'true',

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
                read:'md/common-type/read.action' ,
                create:'md/common-type/add.action',
                update:'md/common-type/update.action',
                destroy:'md/common-type/destroy.action'
            },

            reader:
            {
                type:'json',
                rootProperty:'items',
                totalProperty:'totalProperty',
                //{"results":13,"items":[{"id":"1","statu":1,},……{}],"success":true}
                successProperty:'success',
                //判断读取如果success为true，则调用rootProperty:'items'下的内容。如果为false则读取 messageProperty:'message'
                //message和success一样都是自己定义的。message可以用来输出报错信息的内容。
                messageProperty:'message'
            }
        } 
    });