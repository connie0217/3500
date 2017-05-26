Ext.define('Sgai.view.report.select.SelectDefConfig', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.selectdefconfig',
			requires : ['Sgai.view.report.select.SelectDefConfigList',
					'Sgai.view.report.select.SelectDefConfigWin',
					'Sgai.view.report.select.SelectDefConfigController'],
			controller : 'selectdefconfig',
			layout : {
				type : 'fit'
			},

			items : [{
						xtype : 'selectdefconfiglist'
					}, {
						xtype : 'selectdefconfigwin'
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
												name : 'qm.selectId',
												itemId : 'selectId',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : 'ID',
												width : 200
											}, {
												name : 'qm.selectName',
												itemId : 'selectName',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '名字',
												width : 200
											},

											{
												xtype : 'button',
												text : translations.query,
												margin : '0 0 0 10',
												itemId : 'queryBtn',
												iconCls : 'find',
												listeners : {
													click : 'queryButtonClick'
												}
											}, {
												xtype : 'button',
												text : translations.reset,
												margin : '0 0 0 10',
												itemId : 'resetBtn',
												iconCls : 'reset'
											}]
								}]
					}, {
						xtype : 'toolbar',
						flex : 1,
						dock : 'top',
						items : [{
									xtype : 'button',
									text : translations.add,
									itemId : 'add',
									iconCls : 'add',
									reference : 'addBtn',
									listeners : {
										click : 'addButtonClick'
									}
								}, {
									xtype : 'button',
									text : translations.update,
									itemId : 'edit',
									iconCls : 'edit',
									reference : 'editBtn',
									disabled : true,
									listeners : {
										click : 'editButtonClick'
									}
								}, {
									xtype : 'button',
									text : translations.del,
									itemId : 'delete',
									iconCls : 'delete',
									reference : 'deleteBtn',
									disabled : true,
									listeners : {
										click : 'deleteButtonClick'
									}
								}, {
									xtype : 'button',
									text : '刷新',
									itemId : 'refresh',
									iconCls : 'refresh',
									reference : 'refreshBtn',
									disabled : true,
									listeners : {
										click : 'refreshButtonClick'
									}
								}, {
									xtype : 'button',
									text : '全部刷新',
									itemId : 'refreshAll',
									iconCls : 'refresh',
									reference : 'refreshAllBtn',
									listeners : {
										click : 'refreshAllButtonClick'
									}
								}]
					}]
		});
