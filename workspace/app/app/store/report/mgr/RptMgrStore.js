Ext.define('Sgai.store.report.mgr.RptMgrStore',
{
        extend: 'Ext.data.Store',
        autoLoad: false,        
        model: 'Sgai.model.report.mgr.RptMgrListModel',
        storeId: 'rptMgrStore',
        // 前台排序
        remoteSort: false,
        sortable:true,
        pageSize:100,
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
                read:'report/report-manage/findByPage.action'
            },

            reader:
            {
                type:'json',
				rootProperty :'data.items',
				totalProperty :'data.totalProperty',
                successProperty:'success',
                messageProperty:'message'
            }
        } 
    });