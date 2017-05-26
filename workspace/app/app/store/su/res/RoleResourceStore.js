
Ext.define('Sgai.store.su.res.RoleResourceStore',
{
        extend: 'Ext.data.TreeStore',
        autoLoad: false,        
        model: 'Sgai.model.su.res.RoleResourceModel',
        storeId: 'roleResourceStore',
        remoteSort: 'true',
        folderSort: true,
        // 使用proxy指定加载远程数据
        proxy:
        {
            type:'ajax',
            api:
            {
                read:'system/resources/findRoleResources.action' 
            },
            reader:
            {
                type:'json',
                rootProperty:'items'
            }
        } ,
        actionMethods:  //以 POST 的方式请求 可以解决中文乱码问题。    2013-10-10|星期四
        {
            read:'POST'
        }
    });