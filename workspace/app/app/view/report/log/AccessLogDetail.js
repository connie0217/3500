Ext.define('Sgai.view.report.log.AccessLogDetail', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.accesslogdetail',
	requires : ['Sgai.view.report.log.AccessLogDetailList','Sgai.view.report.log.AccessLogDetailWin',
			'Sgai.view.report.log.AccessLogDetailController'],
	controller : 'accesslogdetail',
	layout : {
		type : 'fit'
	},

	items : [{
				xtype : 'accesslogdetaillist'
			}, {
				xtype : 'accesslogdetailwin'
			}],
	dockedItems : [{
				xtype : 'panel',
				iconCls : 'look',
				title : translations.queryCond,
				collapsible : true,
				layout : 'fit',
				items : [{
							xtype : 'form',
							layout : {
								type : 'table',
								columns : 4
							},
							bodyPadding : 5,
							defaultType : 'textfield',
							reference : 'queryForm',
							items : [

							{
										name : 'requestBy',
										itemId : 'requestBy',
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '用户ID',
										width : 220
									}, {
										name : 'requestByName',
										itemId : 'requestByName',
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '用户名',
										width : 220
									}, {
										name : 'rptCategoryId',
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
										width : 220,
										allowBlank : true,
										listeners : {
											select : 'rptCategorySelected'
										}
									}, {
										name : 'rptId',
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
										width : 220,
										allowBlank : true
									}, {
										name : 'startDate',
										itemId : 'startDate',
										xtype : 'datefield',
										format : Sgai.util.Util.commTimeFormat,
										submitFormat : Sgai.util.Util.commTimeFormat,
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '起始时间',
										width : 220
									}, {
										name : 'endDate',
										itemId : 'endDate',
										xtype : 'datefield',
										format : Sgai.util.Util.commTimeFormat,
										submitFormat : Sgai.util.Util.commTimeFormat,
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '截至时间',
										width : 220
									}, {
										name : 'accessResult',
										itemId : 'accessResult',
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '是否成功',
										width : 220,
										xtype : 'combo',
										valueField : 'value',
										editable : false,
										store : new Ext.data.SimpleStore({
													fields : ['value', 'text'],
													data : [[1, "成功"],
															[0, "失败"]]
												})
									},

									{
										name : 'rptName',
										itemId : 'rptName',
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '报表名称',
										width : 220
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
