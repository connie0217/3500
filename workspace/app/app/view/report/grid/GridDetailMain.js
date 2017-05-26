Ext.define('Sgai.view.report.grid.GridDetailMain', {
			extend : 'Ext.tab.Panel',
			alias : 'widget.griddetailmain',

			requires : ['Sgai.view.report.grid.GridColumn','Sgai.view.report.grid.GridQueryParam','Ext.ux.IFrame'],
			activeTab : 0,

			plain : true,

			items : [{
						xtype : 'gridqueryparam',
						closable : false,
						title : '查询参数',
						loyout : 'fit',
						disabled : false
					}, {
						xtype : 'uigridcolumn',
						closable : false,
						title : '列显示',
						loyout : 'fit',
						disabled : false
					}]
		});
