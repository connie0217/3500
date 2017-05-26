Ext.define('Sgai.view.report.excel.ExcelGenerateLog', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.excelgeneratelog',
			requires : ['Sgai.view.report.excel.ExcelGenerateLogList',
					'Sgai.view.report.excel.ExcelGenerateLogController'],
			controller : 'excelgeneratelog',
			layout : {
				type : 'fit'
			},

			items : [{
						xtype : 'excelgenerateloglist'
					}],
			dockedItems : [{
				xtype : 'panel',
				iconCls : 'look',
				title : translations.queryCond,
				collapsible : true,
				layout : 'fit',
				items : [{
					xtype : 'form',
					layout : 'column',
					bodyPadding : 5,
					defaultType : 'textfield',
					reference : 'queryForm',
					items : [{
								name : 'qm.rptName',
								itemId : 'rptName',
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '报表名称',
								width : 200
							}, {
								name : 'qm.rptCategoryId',
								itemId : 'rptCategoryId',
								xtype : 'remotecombo',
								tableName : 'V_SU_REPORT_MENUS',
								displayName : 'RES_NAME',
								valueName : 'SID',
								editable : false,
								filterName : 'RES_LEVEL',
								filterValue : '1',
								rootName : 'items',
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '报表分类',
								width : 200,
								allowBlank : true,
								listeners : {
									select : 'rptCategorySelected'
								}
							}, {
								name : 'qm.rptId',
								itemId : 'rptId',
								xtype : 'remotecombo',
								reference : 'rptIdCombo',
								tableName : 'V_SU_REPORT_MENUS',
								displayName : 'RES_NAME',
								valueName : 'RES_ID',
								filterName : 'RES_LEVEL',
								filterValue : '2',
								editable : false,
								rootName : 'items',
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '报表',
								width : 200,
								allowBlank : true
							}, {
								name : 'qm.startTimestampFrom',
								itemId : 'startTimestampFrom',
								xtype : 'datefield',
								format : Sgai.util.Util.commTimeFormat,
								submitFormat : Sgai.util.Util.commTimeFormat,
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '开始时间从',
								width : 200
							}, {
								name : 'qm.startTimestampTo',
								itemId : 'startTimestampTo',
								xtype : 'datefield',
								format : Sgai.util.Util.commTimeFormat,
								submitFormat : Sgai.util.Util.commTimeFormat,
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '开始时间到',
								width : 200
							}, {
								name : 'qm.endTimestampFrom',
								itemId : 'endTimestampFrom',
								xtype : 'datefield',
								format : Sgai.util.Util.commTimeFormat,
								submitFormat : Sgai.util.Util.commTimeFormat,
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '结束时间从',
								width : 200
							}, {
								name : 'qm.endTimestampTo',
								itemId : 'endTimestampTo',
								xtype : 'datefield',
								format : Sgai.util.Util.commTimeFormat,
								submitFormat : Sgai.util.Util.commTimeFormat,
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '结束时间到',
								width : 200
							}, {
								xtype : 'combo',
								itemId : 'generateResult',
								name : 'qm.generateResult',
								labelWidth : 70,
								labelAlign : 'right',
								fieldLabel : '结果',
								width : 200,
								valueField : 'value',
								editable : false,
								store : new Ext.data.SimpleStore({
											fields : ['value', 'text'],
											data : [['0', "失败"], ['1', "成功"],
													['2', "生成中"]]
										})
							}],
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
												click : 'queryButtonClick'
											}
										}, {
											xtype : 'component',
											flex : 1
										}]
							}]
				}]
			}]
		});
