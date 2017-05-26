Ext.define('Sgai.view.report.proc.ProcList', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.proclist',
	requires : ['Ext.ux.PagingToolbarResizer'],
	itemId : 'proclist',
	collapsible : true,
	layout : 'fit',
	dock : 'top',
	header : false,
	flex : 1,

	initComponent : function() {
		var me = this;
		var procStore = Ext.create('Sgai.store.report.proc.ProcStore');
		// 在grid前加复选框
		var selModel = Ext.create('Ext.selection.CheckboxModel', {
					mode : 'SINGLE',
					allowDeselect : true
				});
		Ext.apply(me, {
					items : [{
								xtype : 'gridpanel',
								region : 'center',
								autoScroll : true,
								itemId : 'gridPanelProc',
								selModel : selModel,
								selType : 'checkboxmodel',
								store : procStore,
								border : 0,
								tbar : [{
											xtype : 'button',
											text : '新建',
											itemId : 'btnNew',
											iconCls : 'add'
										}, {
											xtype : 'button',
											text : '提交',
											itemId : 'btnSave',
											iconCls : 'save'
										}],
								viewConfig : {
									forceFit : true,
									scrollOffset : 0,
									enableTextSelection : true
								},
								columns : [{
											xtype : 'rownumberer',
											width : 50,
											text : translations.rowNumber
										}, {
											width : 150,
											dataIndex : 'procId',
											flex : 1,
											text : '存储过程编码',
											editor : {
												xtype : 'textfield',
												emptyText : '请输入存储过程编码',
												msgTarget : 'under',
												allowBlank : false
											}
										}, {
											width : 150,
											dataIndex : 'procName',
											flex : 1,
											text : '存储过程名称',
											editor : {
												xtype : 'textfield',
												emptyText : '请输入存储过程描述',
												msgTarget : 'under',
												allowBlank : false
											}
										}, {
											width : 150,
											dataIndex : 'rptId',
											flex : 1,
											text : '报表编码'
										}, {
											width : 150,
											dataIndex : 'rptName',
											flex : 1,
											text : '报表名称',
											editor : {
												xtype : 'remotecombo',
												tableName : 'V_RPT_RESOURCE',
												displayName : 'RES_NAME',
												valueName : 'RES_NAME',
												filterName : 'RES_LEVEL',
												filterValue : '2',
												allowBlank : false,
												forceSelection : true
											}
										}, {
											xtype : 'datecolumn',
											width : 150,
											dataIndex : 'createdDt',
											flex : 1,
											text : '创建日期',
											format : 'Y-m-d',
											dateformat : 'Y-m-d'
										}, {
											width : 150,
											dataIndex : 'createdBy',
											flex : 1,
											text : '创建人'
										}, {
											xtype : 'actioncolumn',
											itemId : 'delProc',
											text : '删除',
											hidden : false,
											align : 'center',
											icon : 'images/icons/fam/delete.gif'
										}],
								dockedItems : [{
											xtype : 'pagingtoolbar',
											store : 'procStore',
											dock : 'bottom',
											displayInfo : true,
											plugins : [{
														ptype : 'pagingtoolbarresizer'
													}]
										}],
								plugins : [Ext.create(
										'Ext.grid.plugin.CellEditing', {
											pluginId : 'cellEditing',
											clicksToEdit : 1,
											autoCancel : false
										})]
							}]
				})
		this.callParent(arguments);
	}
});
