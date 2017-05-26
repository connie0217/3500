
Ext.define('Sgai.store.common.commonType.MdCommonTypeStore',
{
        extend: 'Ext.data.TreeStore',
        autoLoad: false,        
        pageSize:10,
        model: 'Sgai.model.common.commonType.MdCommonTypeModel',
		nodeParam : 'qm.parentSid',//指定节点参数名 
		root: {
		    name: 'rootNode',
		    text: 'rootNode',
		    sid:0
		},
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
                read:'md/md-common-type/findByConnect.action' ,
                create:'md/md-common-type/add.action',
                update:'md/md-common-type/updateBatchFromJson.action',
                destroy:'md/md-common-type/destroy.action'
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