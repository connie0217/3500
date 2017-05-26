Ext.define('Sgai.store.report.proc.ProcParStore',
{
        extend: 'Ext.data.Store',
        autoLoad: false,        
        model: 'Sgai.model.report.proc.ProcParModel',
        storeId: 'procParStore',
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
                read:'report/proc-manage/findRptProcPar.action'
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