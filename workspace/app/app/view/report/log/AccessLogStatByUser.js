Ext.define('Sgai.view.report.log.AccessLogStatByUser', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.accesslogstatbyuser',
	requires : ['Sgai.view.report.log.AccessLogStatByUserController'],
	controller : 'accesslogstatbyuser',
	layout : {
		type : 'fit'
	},

	items : [{
				xtype : 'cartesian',
				store : Ext
						.create('Sgai.store.report.log.AccessLogStatByUsers'),
				reference : 'mainChart',
				insetPadding : {
					top : 40,
					bottom : 40,
					left : 20,
					right : 40
				},
				interactions : 'itemhighlight',
				axes : [{
							type : 'numeric',
							position : 'left',
							minimum : 0,
							titleMargin : 20,
							title : {
								text : '访问次数'
							}
						}, {
							type : 'category',
							position : 'bottom'
						}],
				animation : Ext.isIE8 ? false : {
					easing : 'backOut',
					duration : 500
				},
				series : {
					type : 'bar',
					xField : 'userName',
					yField : 'accessCount',
					style : {
						minGapWidth : 20
					},
					highlight : {
						strokeStyle : 'black',
						fillStyle : 'gold',
						lineDash : [5, 3]
					},
					label : {
						field : 'accessCount',
						display : 'insideEnd',
						renderer : function(value) {
							return value.toFixed(1);
						}
					}
				},
				sprites : {
					type : 'text',
					text : '报表访问统计Top 20',
					fontSize : 22,
					width : 100,
					height : 30,
					x : 40,
					y : 20
				}
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
								columns : 5
							},
							bodyPadding : 5,
							defaultType : 'textfield',
							reference : 'queryForm',
							items : [{
										name : 'rptCategoryId',
										itemId : 'rptCategoryId',
										xtype : 'remotecombo',
										tableName : 'V_SU_REPORT_MENUS',
										displayName : 'RES_NAME',
										valueName : 'SID',
										editable : false,
										filterName : 'RES_LEVEL',
										filterValue : '2',
										rootName : 'items',
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '报表分类',
										width : 220,
										allowBlank:true,
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
										filterValue : '3',
										editable : false,
										rootName : 'items',
										labelWidth : 70,
										labelAlign : 'right',
										fieldLabel : '报表',
										width : 220,
										allowBlank:true
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
