Ext.define('Sgai.view.report.grid.GridColumn', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.uigridcolumn',
			requires : ['Sgai.view.report.grid.GridColumnList',
					'Sgai.view.report.grid.SelectColumnList'],
			layout : {
				type : 'border'
			},

			items : [{
						xtype : 'gridcolumnlist',
						region : 'center',
						flex : 2,
						split : true
					}, {
						xtype : 'selectcolumnlist',
						title : '可用数据列',
						collapsed : true,
						collapsible : true,
						region : 'east',
						flex : 1,
						split : true
					}]
		});
