Ext.define('Sgai.view.su.custom.ResourceCustomWin', {
			extend : 'Ext.window.Window',
			alias : 'widget.resourcecustomwin',
			requires : ['Sgai.view.su.custom.ResourceCustomWinController',
					'Sgai.store.su.custom.ResourceCustomCombos'],
			controller : 'resourcecustomwin',
			title : '收藏',
			layout : 'fit',
			autoShow : false,
			record : '',
			height : 170,
			width : 300,
			items : [{
						xtype : 'form',
						frame : false,
						reference : 'resourceCustomForm',
						bodyPadding : 15,
						defaults : {
							xtype : 'textfield',
							anchor : '100%',
							labelWidth : 60,
							minLength : 3,
							msgTarget : 'under',
							width : 200
						},
						items : [{
									name : 'resName',
									fieldLabel : '菜单名称',
									maxLength : 25
								}, {
									name : 'resSid',
									hidden : true
								},  {
									xtype : 'combobox',
									name : 'parentSid',
									itemId : 'parentSid',
									reference : 'parentSid',
									publishes : 'sid',
									labelAlign : 'right',
									fieldLabel : '文件夹',
									valueField : 'sid',
									displayField : 'customName',
									editable : false,
									store : {
										type : 'suresourcecustomcombos',
										autoLoad : true
									}
								}],
						dockedItems : [{
									xtype : 'toolbar',
									dock : 'bottom',
									items : [{
												xtype : 'tbfill'
											}, {
												xtype : 'button',
												itemId : 'cancel',
												iconCls : 'cancel',
												text : translations.cancel,
												listeners : {
													click : 'cancelButtonClick'
												}
											}, {
												xtype : 'button',
												itemId : 'submit',
												iconCls : 'key-go',
												text : translations.submit,
												listeners : {
													click : 'submitButtonClick'
												}
											}]
								}]
					}]
		});