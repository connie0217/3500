Ext.define('Sgai.view.report.query.ReportQuery', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.reportquery',
	height : '100%',
	width : '100%',
	itemId : 'reportQuery',
	requires : ['Ext.ux.SimpleIFrame', 'Sgai.view.report.query.ReportQueryController'],
	controller : 'reportquery',

	layout : {
		type : 'fit'
	},
	items : [{
				xtype : 'simpleiframe',
				itemId : 'simpleiframe',
				reference : 'queryFrame'
			}],
	dockedItems : [{
				xtype : 'panel',
				collapsible : true,
				title : '查询条件',
				layout : 'fit',
				items : [{
							xtype : 'form',
							reference : 'queryForm',
							listeners : {
								afterrender : 'mainFormRender'
							},
							layout : 'column',
							bodyPadding : 5,
							defaultType : 'textfield',
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'bottom',
										ui : 'footer',
										region : "center",
										items : [{
													xtype : 'component',
													flex : 1
												}, {
													text : '查询',
													itemId : 'query',
													iconCls : 'find',
													formBind : true,
													listeners : {
														buffer:2000,
														click : 'queryReport'
													}
												}, {
													xtype : 'component',
													flex : 1
												}]
									}],
							items : [{
										name : 'reportId',
										reference : 'reportId',
										itemId : 'reportId',
										xtype : 'textfield',
										hidden : true
									}, {
										name : 'targetPanel',
										reference : 'targetPanel',
										itemId : 'targetPanel',
										xtype : 'textfield',
										hidden : true
									}]
						}]
			}]
});
