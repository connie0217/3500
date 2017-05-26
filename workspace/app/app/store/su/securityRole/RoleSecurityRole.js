Ext.define('Sgai.store.su.securityRole.RoleSecurityRole',
{
        extend: 'Ext.data.TreeStore',
        autoLoad: false,        
        model: 'Sgai.model.su.securityRole.SecurityRole',
        storeId: 'su.roleSecurityRole',
        remoteSort: false,

        //使用proxy指定加载远程数据
        proxy:
        {
            type:'ajax',
            api:
            {
                read:'system/role/findRoleSecurityRoleTreeNodes.action'
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