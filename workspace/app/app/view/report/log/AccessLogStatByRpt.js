Ext.define('Sgai.view.report.log.AccessLogStatByRpt', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.accesslogstatbyrpt',
	requires : ['Sgai.view.report.log.AccessLogStatByRptController'],
	controller : 'accesslogstatbyrpt',
	layout : {
		type : 'fit'
	},

	items : [{
		xtype : 'cartesian',
        width: '100%',
		store : Ext.create('Sgai.store.report.log.AccessLogStatByRpts'),
		reference : 'mainChart',
        legend: {
            docked: 'bottom'
        },
		insetPadding : {
			top : 40,
			bottom : 40,
			left : 20,
			right : 40
		},
		axes : [{
			type : 'numeric',
			position : 'left',
			minimum : 0,
			titleMargin : 20,
			title : {
				text : '访问次数'
			}
		},{
                type: 'category',
                position: 'bottom',
                grid: true,
                fields: ['rptName'],
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
		animation : Ext.isIE8 ? false : {
			easing : 'backOut',
			duration : 500
		},
		series : {
			type : 'bar',
			xField : 'rptName',
			title: [ '成功次数', '失败次数'],
			yField: [ 'successCount', 'failerCount'],
			stacked: true,
            style: {
                opacity: 0.80
            },
            highlight: {
                fillStyle: 'yellow'
            },
			label : {
				field : 'accessCount',
				display : 'insideEnd',
				renderer : function(value) {
					return value.toFixed(0);
				}
			},
			tooltip : {
				style : 'background: #fff',
				renderer : function(storeItem, item) {
					var Item = item.series.getTitle()[Ext.Array.indexOf(
							item.series.getYField(), item.field)];
					this.setHtml(Item + ' for ' + storeItem.get('rptName')
							+ ': ' + storeItem.get(item.field));
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
