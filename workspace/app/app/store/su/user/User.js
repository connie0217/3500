Ext.define('Sgai.store.su.user.User',
{
        extend: 'Ext.data.Store',
        autoLoad: false,        
        model: 'Sgai.model.su.user.User',
        storeId: 'su.user',
        remoteSort: 'true',

        //使用proxy指定加载远程数据
        proxy:
        {
        	actionMethods:
        	{
				read:'POST'
        	},
            type:'ajax',
            api:
            {
                read:'system/user/findByPage.action',
                create:'system/user/addUser.action',
                update:'system/user/updateUser.action',
                destroy:'system/user/destroy.action'
            },

            reader:
            {
                type:'json',
                rootProperty:'data.items',
                totalProperty:'data.totalProperty',
                //{"results":13,"items":[{"id":"1","statu":1,},……{}],"success":true}
                successProperty:'meta.success',
                //判断读取如果success为true，则调用rootProperty:'items'下的内容。如果为false则读取 messageProperty:'message'
                //message和success一样都是自己定义的。message可以用来输出报错信息的内容。
                messageProperty:'meta.message'
            }
        } 
    });