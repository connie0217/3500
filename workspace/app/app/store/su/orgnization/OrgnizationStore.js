Ext.define('Sgai.store.su.orgnization.OrgnizationStore',{
	extend: 'Ext.data.TreeStore',
	autoLoad: false,
	model: 'Sgai.model.su.orgnization.OrgnizationModel',
	storeId: 'orgnizationStore',
	remoteSort: 'true',
	folderSort: true,
	
	// 使用proxy指定加载远程数据
    proxy:
    {
        type:'ajax',
        api:
        {
            read:'su/orgnization/getOrgnizations.action' ,
            create:'su/orgnization/add.action',
            update:'su/orgnization/update.action',
            destroy:'su/orgnization/destroy.action'
        },
        reader:
        {
			type:'json',
			rootProperty:'items',
            totalProperty:'totalProperty',
            successProperty:'success',
            messageProperty:'message'
        }
    } ,
    actionMethods:  //以 POST 的方式请求 可以解决中文乱码问题。  
    {
		read:'POST'
	}
});