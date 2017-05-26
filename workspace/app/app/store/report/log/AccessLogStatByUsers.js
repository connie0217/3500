Ext.define('Sgai.store.report.log.AccessLogStatByUsers',
{
        extend: 'Ext.data.Store',
        autoLoad: false,  
        pageSize:15,
        model: 'Sgai.model.report.log.AccessLogStatByUser',
        storeId: 'report.systemaccesslogstatbyusers',			        	
        remoteSort: true,
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			api : {
				read : 'select/select-query/find.action?selectId=topNCountByUser&topN=20'
			},

			reader : {
				type : 'json',
				rootProperty : 'data.items',
				totalProperty : 'data.totalProperty',
				successProperty : 'success',
				messageProperty : 'message'
			}
		} 
    });
