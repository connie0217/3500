Ext.define('Sgai.proxy.report.SelectQueryByPageProxy', {
			extend : 'Ext.data.proxy.Ajax',
			alias : 'proxy.selectquerybypageproxy',
			type : 'ajax',
			url : 'report/select-report-query/findByPage.action',
			reader : {
				type : 'json',
				root : 'items',
				totalProperty : 'totalProperty',
				successProperty : 'success',
				messageProperty : 'message'
			}
		});