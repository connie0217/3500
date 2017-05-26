Ext.define('Sgai.view.report.log.AccessLogDetailWin', {
			extend : 'Ext.window.Window',
			id : 'accessLogDetailWin',
			alias : 'widget.accesslogdetailwin',
			title : '访问历史详细内容',
			width : 570,
			height : 480,
			resizable : true,
			closeAction : 'hide',
			autoShow : false,
			autoDestroy : false,
			closable : true,
			layout : 'fit',
			modal : true,
			reference : 'detailWin',
			items : [

			{
						xtype : 'form',
						bodyStyle : "padding:2px 2px 2x 2x",
						reference : 'detailForm',
						layout : {
							type : 'table',
							columns : 2,
							itemCls : 'align-top'
						},
						bodyPadding : 10,
						defaultType : 'textfield',
						items : [{
									name : 'rptId',
									labelAlign : 'right',
									labelWidth : 70,
									width : 260,
									fieldLabel : '报表ID'

								}, {
									name : 'requestBy',
									labelAlign : 'right',
									labelWidth : 70,
									width : 260,
									fieldLabel : '访问人'
								}, {
									name : 'startTimestamp',
									labelAlign : 'right',
									labelWidth : 70,
									width : 260,
									fieldLabel : '开始时间'
								}, {
									name : 'endTimestamp',
									labelAlign : 'right',
									labelWidth : 70,
									width : 260,
									fieldLabel : '结束时间'
								}, {
									name : 'duration',
									labelAlign : 'right',
									labelWidth : 70,
									reference:'duration',
									width : 260,
									fieldLabel : '耗时'
								}, {
									name : 'accessResultMsg',
									labelAlign : 'right',
									reference:'accessResultMsg',
									labelWidth : 70,
									width : 260,
									fieldLabel : '是否成功'
								}, {
									name : 'params',
									colspan : 2,
									xtype : 'textareafield',
									fieldLabel : '报表参数',
									labelWidth : 70,
									labelAlign : 'right',
									width : 520
								}, {
									name : 'exceptionMsg',
									xtype : 'textareafield',
									colspan : 2,
									labelAlign : 'right',
									labelWidth : 70,
									width : 520,
									fieldLabel : '异常信息',
									grow : true,
									height : 300
									// 最大的显示高度
							}],
						buttons : [{
									text : '关闭',
									itemId : 'close',
									margin : '0 0 0 10',
									listeners : {
										click : 'closeButtonClick'
									}
								}]
					}

			]

		});