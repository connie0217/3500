Ext.define('Sgai.view.report.mgr.ReportManage', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.reportmanage',
			requires : ['Sgai.view.report.mgr.ReportManageController',
			            'Sgai.view.report.mgr.RptMgrList',
					'Sgai.view.report.mgr.RptMgrTabView'],
			controller : 'reportmanage',
			layout : 'anchor',
			items : [{
						xtype : 'rptmgrlist',
						anchor : '100% 60%'
					}, {
						xtype : 'rptMgrTabView',
						anchor : '100% 40%'
					}],
			dockedItems : [{
				xtype : 'panel',
				layout : 'fit',
				items : [{
					xtype : 'form',
					layout : 'column',
					bodyPadding : 5,
				    reference:'queryForm',
					itemId : 'querypanel',
					defaultType : 'textfield',
					items : [{
								itemId : 'rptId',
								name : 'qm.rptIdLike',
								labelWidth : 95,
								labelAlign : 'right',
								fieldLabel : '报表编码',
								width : 220,
								colspan : 2
							}, {
								itemId : 'rptName',
								name : 'qm.rptName',
								labelWidth : 95,
								labelAlign : 'right',
								fieldLabel : '报表名称',
								width : 220,
								colspan : 2
							}, {
								xtype : 'combo',
								itemId : 'rptState',
								name : 'qm.rptState',
								labelWidth : 95,
								labelAlign : 'right',
								fieldLabel : '报表状态',
								width : 220,
								valueField : 'value',
								editable : false,
								store : new Ext.data.SimpleStore({
											fields : ['value', 'text'],
											data : [['created', "未发布"],
													['published', "已发布"]]
										}),
								colspan : 2
							}, {
								xtype : 'remotecombo',
								itemId : 'rptCat',
								name : 'qm.rptCat',
								labelWidth : 95,
								labelAlign : 'right',
								fieldLabel : '报表分类',
								width : 220,
								editable : false,
								tableName : 'V_SU_REPORT_MENUS',
								displayName : 'RES_NAME',
								valueName : 'SID',
								filterName : 'RES_LEVEL',
								filterValue : '1',
								colspan : 2
							}, {
								xtype : 'button',
								text : translations.query,
								margin : '0 0 0 10',
								formBind : true,
								itemId : 'queryBtn',
								iconCls : 'find',
								listeners: {
									click:'onButtonClickQuery'
							    }
							}, {
								xtype : 'button',
								text : translations.reset,
								margin : '0 0 0 10',
								itemId : 'resetBtn',
								iconCls : 'reset',
								listeners: {
									click:'onButtonClickReset'
							    }
							}]

				}]
			}]
		});
