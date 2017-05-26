
Ext.define('Sgai.store.common.commonType.ComboCommonTypeItemStore',
{
        extend: 'Ext.data.Store',
        autoLoad: false,
        pageSize:10,
        model: 'Sgai.model.common.commonType.CommonTypeItemModel',
        storeId: 'comboCommonTypeItemStore',
        remoteSort: 'true',

        // 使用proxy指定加载远程数据
        proxy:
        {
            type:'ajax',
            actionMethods:{read: 'POST'},
            api:
            {
                read:'md/common-type-item!getCommonTypeItems.action'
            },

            reader:
            {
                type:'json',
                rootProperty:'items',
                totalProperty:'totalProperty',
                successProperty:'success',
                messageProperty:'message'
            }
        }
    });