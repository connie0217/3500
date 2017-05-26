
Ext.define('Sgai.store.su.custom.ResourceCustoms',
{
        extend: 'Ext.data.TreeStore',
        autoLoad: false,        
        model: 'Sgai.model.su.custom.ResourceCustom',
        storeId: 'resourceCustomStore',
        remoteSort: 'true',
        folderSort: true,
    	root: {
            sid: '-999',
            customName: '收藏夹',
            customLevel:0,
    	    expanded: true
    	},
        // 使用proxy指定加载远程数据
        proxy:
        {
            type:'ajax',
            api:
            {
                read:'system/resource-custom/getFavorites.action' ,
                create:'system/resource-custom/add.action',
                update:'system/resource-custom/update.action',
                destroy:'system/resource-custom/destroy.action'
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