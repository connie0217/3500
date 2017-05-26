
Ext.define('Sgai.store.report.log.AccessLogDetails',
{
        extend: 'Ext.data.Store',
        autoLoad: false,  
        pageSize:15,
        model: 'Sgai.model.report.log.AccessLogDetail',
        storeId: 'report.logaccesslogdetails',			        	
        remoteSort: true,
		proxy : {
			type : 'ajax',
			actionMethods : {
				read : 'POST'
			},
			api : {
				read : 'select/select-query/selectByPage.action?selectId=selectReportAccessDetail'
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
