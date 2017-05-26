Ext.define('Sgai.view.report.query.SelectReportWithSummary', {
			extend : 'Sgai.view.report.query.SelectReport',
			alias : 'widget.selectreportwithsummary',
			requires : ['Sgai.view.report.query.SelectReportListWithSum',
					'Sgai.view.report.query.SelectReportController'],
			controller : 'selectreport',

			items : [{
						xtype : 'selectreportlistwithsum'
					}]
		});
