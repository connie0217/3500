Ext.define('Sgai.view.report.mgr.RptMgrTabView', {
    		extend: 'Ext.tab.Panel',
			alias : 'widget.rptMgrTabView',
			layout : 'fit',
			itemId : 'rptMgrTabView',
			header : false,

			requires : ['Sgai.util.Util', 'Sgai.view.Translation',
					'Ext.selection.CellModel', 'Ext.grid.plugin.CellEditing',
					'Ext.ux.PagingToolbarResizer',
					'Sgai.view.report.mgr.RptInfoView',
					'Sgai.view.report.mgr.RptParInfo'],
			
			items : [{
						title : '报表信息',
						xtype : 'rptInfoView'
					}, {
						title : '参数信息',
						xtype : 'rptParInfo'
					}]
		});
