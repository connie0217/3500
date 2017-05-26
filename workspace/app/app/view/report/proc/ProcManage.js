Ext.define('Sgai.view.report.proc.ProcManage', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.procmanage',

			requires : ['Sgai.view.report.proc.ProcList','Sgai.view.report.proc.ProcTabView'],

			layout : 'anchor',
			items : [{
						xtype : 'proclist',
						anchor : '100% 60%'
					}, {
						xtype : 'procTabView',
						anchor : '100% 40%'
					}],
			dockedItems : [{
						xtype : 'panel',
						layout : 'fit',
						items : [{
									xtype : 'form',
									layout : 'column',
									bodyPadding : 5,
									itemId : 'querypanel',
									defaultType : 'textfield',
									items : [{
												itemId : 'rptId',
												name : 'qm.rptId',
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
												itemId : 'procId',
												name : 'qm.procId',
												labelWidth : 95,
												labelAlign : 'right',
												fieldLabel : '存储过程编码',
												width : 220,
												colspan : 2
											}, {
												itemId : 'procName',
												name : 'qm.procName',
												labelWidth : 95,
												labelAlign : 'right',
												fieldLabel : '存储过程名称',
												width : 220,
												colspan : 2
											}, {
												xtype : 'button',
												text : translations.query,
												margin : '0 0 0 10',
												formBind : true,
												itemId : 'queryBtn',
												iconCls : 'find'
											}, {
												xtype : 'button',
												text : translations.reset,
												margin : '0 0 0 10',
												itemId : 'resetBtn',
												iconCls : 'reset'
											}, {
												xtype : 'remotecombo',
												itemId : 'rptRes',
												tableName : 'V_RPT_RESOURCE',
												displayName : 'RES_ID',
												valueName : 'RES_NAME',
												filterName : 'RES_LEVEL',
												filterValue : '2',
												hidden : true
											}]

								}]
					}]
		});
