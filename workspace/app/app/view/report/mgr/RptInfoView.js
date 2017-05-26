Ext.define('Sgai.view.report.mgr.RptInfoView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.rptInfoView',
	itemId : 'rptInfoView',
	layout : 'fit',
	dock : 'top',
	header : false,
	dockedItems : [{
				xtype : 'panel',
				layout : 'fit',
				items : [{
							xtype : 'form',
							bodyStyle : "padding:2px 2px 2x 2x",
							frame : true,
							border : 0,
							itemId : 'formPanel',
							layout : {
								type : 'table',
								columns : 4
							},
							labelAlign : 'left',
							defaultType : 'textfield',
							items : [{
										xtype : 'textfield',
										itemId : 'pagingFlag',
										labelWidth : 95,
										labelAlign : 'right',
										fieldLabel : '分页标志',
									    reference:'pagingFlag',
										width : 260,
										readOnly : true
									}, {
										xtype : 'textfield',
										itemId : 'rptTemplatePath',
										labelWidth : 155,
										labelAlign : 'right',
										fieldLabel : '报表路径',
									    reference:'rptTemplatePath',
										width : 750,
										colspan : 2,
										readOnly : true
									}, {
										xtype : 'button',
										itemId : 'downloadRaq',
										text : '下载模板',
										margin : '0 0 0 10',
										listeners:{
											click : 'onButtonClickDownload'
										}
									}, {
										xtype : 'textfield',
										itemId : 'validateExpr',
									    reference:'validateExpr',
										labelWidth : 95,
										labelAlign : 'right',
										fieldLabel : '参数校验表达式',
										width : 1010,
										colspan : 4,
										readOnly : true
									}, {
										xtype : 'textfield',
										itemId : 'pageComputeFlag',
										labelWidth : 95,
										labelAlign : 'right',
									    reference:'pageComputeFlag',
										fieldLabel : '分页计算标志',
										width : 260,
										readOnly : true
									}, {
										xtype : 'textfield',
										itemId : 'numPerExcel',
										labelWidth : 155,
										labelAlign : 'right',
										fieldLabel : 'EXCEL每页最大数',
									    reference:'numPerExcel',
										width : 320,
										readOnly : true
									}, {
										xtype : 'textfield',
										itemId : 'totalCountDs',
									    reference:'totalCountDs',
										labelWidth : 135,
										labelAlign : 'right',
										fieldLabel : '总记录数数据源',
										width : 430,
										readOnly : true
									}, {
										xtype : 'label'
									}, {
										xtype : 'textarea',
										itemId : 'totalCountSql',
										labelAlign : 'right',
										labelWidth : 95,
										fieldLabel : '总记录数SQL',
									    reference:'totalCountSql',
										width : 1010,
										height : 90,
										colspan : 4,
										readOnly : true
									}]
						}]
			}]

});