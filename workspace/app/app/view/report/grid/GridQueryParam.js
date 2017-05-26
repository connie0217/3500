Ext.define('Sgai.view.report.grid.GridQueryParam', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.gridqueryparam',
			requires : ['Sgai.view.report.grid.GridQueryParamList',
					'Sgai.view.report.grid.SelectParamList'],
			layout : {
				type : 'border'
			},

			items : [{
						xtype : 'gridqueryparamlist',
						region : 'center',
						flex : 2,
						split : true
					}, {
						xtype : 'selectparamlist',
						title : '可用数据列',
						collapsed : true,
						collapsible : true,
						region : 'east',
						flex : 1,
						split : true
					}]
		});
