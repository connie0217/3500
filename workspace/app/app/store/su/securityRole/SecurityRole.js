Ext.define('Sgai.store.su.securityRole.SecurityRole',
{
        extend: 'Ext.data.TreeStore',
        autoLoad: false,        
        model: 'Sgai.model.su.securityRole.SecurityRole',
        storeId: 'su.securityRole',
        remoteSort: false,

        //使用proxy指定加载远程数据
        proxy:
        {
            type:'ajax',
            api:
            {
                read:'system/user/findUserSecurityRoleTreeNodes.action'
            },

            reader:
            {
                type:'json',
                rootProperty:'items'
            }
        } ,
        actionMethods:
        {
            read:'POST'
        }
    });