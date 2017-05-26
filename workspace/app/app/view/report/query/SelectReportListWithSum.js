Ext.define('Sgai.view.report.query.SelectReportListWithSum', {
	extend : 'Sgai.view.report.query.SelectReportList',
	alias : 'widget.selectreportlistwithsum',
	requires : ['Ext.ux.PagingToolbarResizer', 'Ext.grid.filters.Filters',
			'Ext.grid.selection.SpreadsheetModel', 'Ext.grid.plugin.Clipboard'],
	reference : 'mainGrid',
	gridId : '',
    features: [{
        ftype: 'summary',
		dock: 'bottom',
		reference : 'summaryFeature',
		showSummaryRow:true
    }]
});
