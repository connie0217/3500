Ext.define('Sgai.view.report.query.SelectReportList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.selectreportlist',
	requires : ['Ext.ux.PagingToolbarResizer', 'Ext.grid.filters.Filters',
			'Ext.grid.selection.SpreadsheetModel', 'Ext.grid.plugin.Clipboard'],
	reference : 'mainGrid',
	rowLines : true,
	gridId : '',
	columnLines : true,
	frame : true,
	loadMask : true,
	columns : [],
	plugins : [{
				ptype : 'gridfilters'
			}, {
				ptype : 'selectGridHeaderAdjust',
				aliasName : 'userGridHeaderAdjust'
			}],
	dockedItems : [{
				xtype : 'toolbar',
				flex : 1,
				dock : 'top',
				items : [{
							xtype : 'button',
							text : '自定义列',
							itemId : 'columnCustom',
							iconCls : 'app_edit',
							listeners : {
								click : 'onButtonClickColumn'
							}
						},{
							xtype : 'button',
							text : '导出',
							itemId : 'exportExcel',
							iconCls : 'excel',
							listeners : {
								click : 'onButtonClickExport'
							}
						},{
							xtype : 'button',
							text : '导出2007',
							itemId : 'exportExcel2007',
							iconCls : 'excel',
							listeners : {
								click : 'onButtonClickExport2007'
							}
						}]
			}, {
				reference : 'pagingtoolbar',
				xtype : 'pagingtoolbar',
				dock : 'bottom',
				displayInfo : true,
				hidden : true
			}]
});
