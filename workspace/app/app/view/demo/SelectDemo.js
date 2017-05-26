Ext.define('Sgai.view.demo.SelectDemo', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.selectdemo',
			requires : ['Sgai.view.demo.SelectDemoList',
					'Sgai.view.demo.SelectDemoController'],
			controller : 'selectdemo',
			layout : {
				type : 'fit'
			},

			items : [{
						xtype : 'selectdemolist'
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
												reference : 'selectId',
												itemId : 'selectId',
												xtype : 'textfield',
												value : 'selectDemo',
												hidden : true
											},

											{
												name : 'qm.name',
												itemId : 'name',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '姓名',
												width : 200
											}, {
												name : 'qm.pin',
												itemId : 'pin',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : 'ID',
												width : 200
											}, {
												name : 'qm.password',
												itemId : 'password',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '密码',
												width : 200
											}, {
												name : 'qm.gender',
												itemId : 'gender',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '性别',
												width : 200
											}, {
												name : 'qm.phone1',
												itemId : 'phone1',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '手机号1',
												width : 200
											}, {
												name : 'qm.phone2',
												itemId : 'phone2',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '手机号2',
												width : 200
											}, {
												name : 'qm.tel',
												itemId : 'tel',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '固定电话',
												width : 200
											}, {
												name : 'qm.email',
												itemId : 'email',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '邮箱',
												width : 200
											}, {
												name : 'qm.stateFrom',
												itemId : 'stateFrom',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '状态',
												width : 200
											}, {
												name : 'qm.stateTo',
												itemId : 'stateTo',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '状态',
												width : 200
											}, {
												name : 'qm.userPost',
												itemId : 'userPost',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '岗位',
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
					}]
		});
