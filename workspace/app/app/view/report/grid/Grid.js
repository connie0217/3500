Ext.define('Sgai.view.report.grid.Grid', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.uigrid',
			requires : ['Sgai.view.report.grid.GridList','Sgai.view.report.grid.GridDetailMain',
					'Sgai.view.report.grid.GridController'],
			controller : 'grid',
			layout : {
				type : 'border'
			},
	
			items : [{
						xtype : 'gridlist',
						flex : 1,
						region : 'north',
						split : true
					}, {
						xtype : 'griddetailmain',
						region : 'center',
						flex : 2
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
									items : [

									{
												name : 'qm.gridId',
												itemId : 'gridId',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : 'ID',
												width : 200
											}, {
												name : 'qm.gridDescLike',
												itemId : 'gridDescLike',
												labelWidth : 70,
												labelAlign : 'right',
												fieldLabel : '描述',
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
								}, {
									xtype : 'remotecombo',
									itemId : 'parentResourceCombo',
									name : 'parentResourceCombo',
									tableName : 'v_su_report_menus',
									displayName : 'RES_NAME',
									valueName : 'SID',
									filterName : 'RES_LEVEL',
									filterValue : '1',
									hidden:true
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
									text : '查询参数转为自定义',
									itemId : 'paramsCustomBtn',
									iconCls : 'app_edit',
									reference : 'paramsCustomBtn',
									disabled : true,
									hidden :true,
									listeners : {
										click : 'paramsCustomButtonClick'
									}
								}, {
									xtype : 'button',
									text : '列转为自定义',
									itemId : 'columnsCustomBtn',
									iconCls : 'app_form_edit',
									reference : 'columnsCustomBtn',
									hidden :true,
									disabled : true,
									listeners : {
										click : 'columnsCustomButtonClick'
									}
								}]
					}]
		});
