Ext.define('Sgai.view.report.query.SelectReport', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.selectreport',
			requires : ['Sgai.view.report.query.SelectReportList',
					'Sgai.view.report.query.SelectReportController'],
			controller : 'selectreport',
			layout : {
				type : 'fit'
			},

			items : [{
						xtype : 'selectreportlist'
					}],
			dockedItems : [{
						xtype : 'panel',
						collapsible : true,
						title : '查询条件',
						layout : 'fit',
						items : [{
									xtype : 'form',
									reference : 'queryForm',
									layout : {
										type : 'table',
										columns : 4
									},

									// listeners : {
									// afterrender : 'afterRender'
									// },
									bodyPadding : 5,
									defaultType : 'textfield',
									dockedItems: [{
									    xtype: 'toolbar',
									    dock: 'bottom',
									    ui: 'footer',
									    region : "center",
									    items: [
									    	 { xtype: 'component', flex: 1 },
									        {
												text : '查询',
												itemId : 'query',
												iconCls : 'find',
												formBind : true,
												listeners : {
													buffer:2000,
													click : 'queryButtonClick'
												}
									        },
									         { xtype: 'component', flex: 1 }
									    ]
									}],
									items : [{
												name : 'gridId',
												reference : 'gridId',
												itemId : 'gridId',
												xtype : 'textfield',
												hidden : true
											}, {
												name : 'selectId',
												reference : 'selectId',
												itemId : 'selectId',
												xtype : 'textfield',
												hidden : true
											}]
								}]
					}]
		});
