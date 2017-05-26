Ext.define('Sgai.view.report.select.SelectDefConfigWin', {
			extend : 'Ext.window.Window',
			id : 'selectDefConfiglWin',
			alias : 'widget.selectdefconfigwin',
			title : 'select定义配置',
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
									name : 'sid',
									hidden:true

								},{
									name : 'version',
									hidden:true

								},{
									name : 'selectId',
									labelAlign : 'right',
									labelWidth : 70,
									width : 260,
									fieldLabel : 'ID',
									allowBlank:false,
									emptyText:'字母开头，可以使用下划线'

								}, {
									name : 'selectName',
									labelAlign : 'right',
									labelWidth : 70,
									width : 260,
									fieldLabel : '名字',
									allowBlank:false,
									emptyText:'可用中文'
								}, {
									name : 'selectDesc',
									labelAlign : 'right',
									labelWidth : 70,
									colspan : 2,
									width : 520,
									fieldLabel : '描述',
									allowBlank:false,
									emptyText:'简单描述该查询定义'
								}, {
									name : 'defineDetail',
									xtype : 'textareafield',
									colspan : 2,
									labelAlign : 'right',
									labelWidth : 70,
									width : 520,
									fieldLabel : '配置信息',
									allowBlank:false,
									grow : true,
									height: 320,
									emptyText:'详细的XML配置'
							}],
						buttons : [{
									text : '保存',
									itemId : 'update',
									margin : '0 0 0 10',
									formBind:true,
									listeners : {
										click : 'saveButtonClick'
									}
								},{
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