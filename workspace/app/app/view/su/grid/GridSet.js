Ext
		.define(
				'Sgai.view.su.grid.GridSet',
				{
					extend : 'Ext.panel.Panel',
					alias : "widget.gridSet",
					store : 'su.grid.GridSet',
					layout : 'column',
					itemId : 'gridMainPanel',
					id : 'gridMainPanel',
					items : [ {
						layout : {
							type : 'vbox',
							align : 'stretch'
						}
					} ],
					dockedItems : [ {
						xtype : 'toolbar',
						items : [ {
							xtype : 'button',
							text : translations.query,
							itemId : 'btnQuery'
						}, {
							xtype : 'button',
							text : translations.reset,
							itemId : 'btnReset'
						}, '-', {
							xtype : 'button',
							text : translations.add,
							itemId : 'btnNew'
						}, {
							xtype : 'button',
							text : translations.submit,
							formBind : true,
							itemId : 'btnSave'
						}, {
							xtype : 'button',
							text : translations.del,
							formBind : true,
							itemId : 'delRec',
							id : 'gridDelRec'
						}, '-', {
							xtype : 'button',
							text : translations.gridColumn.columnAdd,
							formBind : true,
							itemId : 'btnNewColumn'
						}, {
							xtype : 'button',
							text : translations.gridColumn.columnUpdate,
							formBind : true,
							itemId : 'btnUpdateColumn'
						}, {
							xtype : 'button',
							text : translations.gridColumn.columnDelete,
							formBind : true,
							itemId : 'btnDeleteColumn',
							id : 'columnDelRec'
						} ]
					} ],

					initComponent : function() {
						var pageSize = 15;// 每页行数15
						var store = Ext.getStore('su.grid.GridSet');// 主gridstore
						var columnStoreleft = Ext.getStore('su.grid.ColumnSet');// 分配securityRole用store
						var toColumnValue = new Array();// 集合， 用于
						// 存储分配securityRole空间有半部分显示
						// 在grid前加单选框
						var selModel = Ext
								.create(
										'Ext.selection.CheckboxModel',
										{
											mode : 'SINGLE',
											listeners : // 事件监听
											{ // 最初是的数据不是从这里获取的。
												// 复选框选中或者取消选中
												selectionchange : function(sm,
														selections) {
													// 如果没有选中任何的记录，将删除按钮设置为不可用，
													Ext
															.getCmp(
																	'gridDelRec')
															.setDisabled(
																	selections.length == 0);
													// Ext.getCmp('columnGridPanel').getView().plugins[0].enable();
													// 如果有选中的记录，执行if内的代码
													if (selections.length > 0) {
														// getselectionModel获得panel中的选择模型，返回值为Ext.selection.Model，getSelection获取当前被选择的记录
														data = Ext.getCmp('gridGridPanel').getSelectionModel().getSelection()[0];
														var lastOptions = columnStoreleft.lastOptions;
														Ext
																.apply(
																		lastOptions.params,
																		{
																			'qm.gridSid' : data
																					.get("gridId"),
																			'limit' : 1000,
																			'page' : 1,
																			'start' : 0
																		});
														columnStoreleft
																.reload(lastOptions);
													}
												}
											}
										});

						var selColumnModel = Ext
								.create(
										'Ext.selection.CheckboxModel',
										{
											listeners : {
												selectionchange : function(sm,
														selections) {
													Ext.getCmp(
																	'columnDelRec')
															.setDisabled(
																	selections.length == 0);
												}
											}
										});

						// 查询区域panel，form.Panel为查询表单
						var queryPanel = Ext
								.create(
										'Ext.form.Panel',
										{
											labelAlign : 'right',
											buttonAlign : 'center',
											bodyStyle : 'padding:0px;margin:0px;padding-top:5px;',// padding:1px;padding-top:5px;,
											labelWidth : 50,
											border : 0,
											collapsible : true,
											id : 'gridQueryPanel',
											frame : true,

											items : [ {
												layout : 'column',
												items : [
														{
															columnWidth : .30,
															layout : 'form',
															defaultType : 'textfield',
															labelAlign : 'right',
															items : [ {
																itemId : 'gridId',
																name : 'qm.gridId',
																labelAlign : 'right',
																fieldLabel : translations.gridColumn.gridId

															} ]
														},
														{
															columnWidth : .30,
															layout : 'form',
															defaultType : 'textfield',
															labelAlign : 'right',
															items : [ {
																itemId : 'gridType',
																name : 'qm.gridType',
																labelAlign : 'right',
																fieldLabel : translations.gridColumn.gridType
															} ]
														},
														{
															columnWidth : .30,
															layout : 'form',
															defaultType : 'textfield',
															labelAlign : 'right',
															items : [ {
																itemId : 'queryType',
																name : 'qm.queryType',
																labelAlign : 'right',
																fieldLabel : translations.gridColumn.queryType

															} ]
														}

												]
											} ]
										});
						// 用户数据主显示grid
						var grid = Ext
								.create(
										'Ext.grid.Panel',
										{
											region : 'center', // 此属性必须指定
											minHeight : 200,
											height : 450,
											selModel : selModel, // 每条记录前的复选框注意调用的方式
											// selModel是grid.panel自带属性
											autoScroll : true,
											id : 'gridGridPanel',
											itemId : 'gridPanel',
											layout : 'fit',
											store : store.load({
												params : {
													limit : 15,
													page : 1
												}
											}),// 在页面加载的时候被调用
											columns : [
													{
														xtype : 'gridcolumn',
														dataIndex : 'sid',
														text : translations.sid,
														hidden : true,
														flex : 2
													},
													{
														xtype : 'gridcolumn',
														dataIndex : 'gridId',
														text : translations.gridColumn.gridId,
														flex : 1,
														editor : {
															xtype : 'textfield',
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.gridId,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													},
													{
														xtype : 'gridcolumn',
														dataIndex : 'gridDesc',
														text : translations.gridColumn.gridDesc,
														flex : 1,
														editor : {
															xtype : 'textfield',
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.gridDesc,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													},
													{
														xtype : 'gridcolumn',
														dataIndex : 'gridType',
														text : translations.gridColumn.gridType,
														flex : 1,
														editor : {
															xtype : 'textfield',
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.gridType,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													},

													{
														xtype : 'gridcolumn',
														dataIndex : 'queryType',
														text : translations.gridColumn.queryType,
														flex : 1,
														editor : {
															xtype : 'textfield',
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.queryType,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													} ],
											plugins : [ Ext
													.create(
															'Ext.grid.plugin.CellEditing',
															{
																pluginId : 'gridCellEditing',
																clicksToEdit : 1,
																autoCancel : false
															}) ],
											listeners : {}
										});

						var tabpanel = Ext
								.create(
										'Ext.grid.Panel',
										{
											region : 'center', // 此属性必须指定
											minHeight : 200,
											height : 450,
											selModel : selColumnModel,
											autoScroll : true,
											id : 'columnGridPanel',
											itemId : 'gridPanel',
											layout : 'fit',
											store : columnStoreleft.load({
												params : {
													limit : 15,
													page : 1
												}
											}),// 在页面加载的时候被调用
											columns : [
													{
														xtype : 'gridcolumn',
														dataIndex : 'sid',
														text : translations.sid,
														hidden : true,
														flex : 2
													},
													{
														xtype : 'gridcolumn',
														disabled : true,// 设置为不可编译的，用户可以通过拖拽实现列的排序
														dataIndex : 'position',
														text : translations.gridColumn.columnPosition,
														flex : 1

													},
													{
														xtype : 'gridcolumn',
														dataIndex : 'dataIndex',
														text : translations.gridColumn.columnDataIndex,
														flex : 1,
														editor : {
															xtype : 'textfield',
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.columnDataIndex,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													},
													{
														xtype : 'gridcolumn',
														dataIndex : 'text',
														text : translations.gridColumn.columnText,
														flex : 1,
														editor : {
															xtype : 'textfield',
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.columnText,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													},

													{
														xtype : 'gridcolumn',
														dataIndex : 'width',
														text : translations.gridColumn.columnWidth,
														flex : 1,
														editor : {
															xtype : 'numberfield',// 限制可以输入数字格式
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.columnWidth,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													},

													{
														xtype : 'gridcolumn',
														dataIndex : 'hiddenFlag',
														text : translations.gridColumn.columnHiddenFlag,
														flex : 1,
														editor : new Ext.form.field.ComboBox(
																{
																	editable : false,
																	itemId : 'hidCom',
																	emptyText : translations.select,
																	valueField : 'value',
																	displayField : 'text',
																	store : [[0,translations.gridColumn.columnDisplay ],[1,translations.gridColumn.columnHidden]]
																}),
														renderer : function(
																value) {
															var hidCom = Ext.ComponentQuery
																	.query('combo#hidCom')[0];
															return hidCom
																	.setValue(
																			value)
																	.getRawValue();
														}

													},

													{
														xtype : 'gridcolumn',
														dataIndex : 'sortFlag',
														text : translations.gridColumn.columnSortFalg,
														flex : 1,
														editor : new Ext.form.field.ComboBox(
																{
																	editable : false,
																	itemId : 'sortCom',
																	emptyText : translations.select,
																	valueField : 'value',
																	displayField : 'text',
																	store : new Ext.data.SimpleStore(
																			{
																				fields : [
																						'value',
																						'text' ],
																				data : [
																						[
																								0,
																								translations.gridColumn.columnSort ],
																						[
																								1,
																								translations.gridColumn.columnUnsort ] ]
																			})
																}),
														renderer : function(
																value) {
															var sortCom = Ext.ComponentQuery
																	.query('combo#sortCom')[0];
															return sortCom
																	.setValue(
																			value)
																	.getRawValue();
														}

													},

													{
														xtype : 'gridcolumn',
														dataIndex : 'renderer',
														text : translations.gridColumn.columnRenderer,
														flex : 1,
														editor : {
															xtype : 'textfield',
															emptyText : translations.pleaseInput
																	+ translations.gridColumn.columnRenderer,
															allowBlank : false,
															maxLength : 32,
															enforceMaxLength : true,
															msgTarget : 'under'
														}
													} ],
											plugins : [ Ext
													.create(
															'Ext.grid.plugin.CellEditing',
															{
																pluginId : 'columnCellEditing',
																clicksToEdit : 1,
																autoCancel : false
															}) ],
											listeners : {},
											viewConfig : {
												plugins : {
													ptype : 'gridviewdragdrop',
													id : 'columndrop',
													dragText : translations.gridColumn.columnDrag
												}
											}
										});

						Ext
								.getCmp('columnGridPanel')
								.getView()
								.addListener(
										'drop',
										function(node, obj, overModel,
												dropPosition, opts) {
											var store = Ext
													.getCmp('columnGridPanel').store;
											for (i = 0; i < store.getCount(); i++) {
												var item = store.getAt(i);
												if (typeof (item) == undefined) { // 代码需要完善

												} else {
													var perPosition = item
															.get('position');
													var position = i + 1;
													item.set('position',
															position);
												}
											}
											// store.commitChanges( );
											store
													.sync(

													{
														success : function(
																batch, options) {
															Ext.MessageBox
																	.show({
																		title : translations.operateMsgWinTitle,
																		msg : translations.gridColumn.columnUpdateSuccess,
																		buttons : Ext.Msg.OK,
																		icon : Ext.MessageBox.INFO
																	});
														},
														failure : function(
																batch, options) {
															var errMsg = "";
															for ( var i = 0; i < batch.exceptions.length; i++) {
																var error = 'pinExist';
																for ( var j = 0; j < batch.exceptions[i].records.length; j++) {
																	var resId = batch.exceptions[i].records[i].data.resId;
																	var resName = batch.exceptions[i].records[i].data.resName;
																	var args = resId
																			+ "-"
																			+ resName;
																	errMsg = errMsg
																			+ args
																			+ "::"
																			+ eval(("translations." + error))
																			+ "<br/>";
																}
															}

															Ext.MessageBox
																	.show({
																		title : translations.errMsgWinTitle,
																		msg : errMsg,
																		maxWidth : 360,
																		buttons : Ext.Msg.OK,
																		icon : Ext.MessageBox.ERROR
																	});
														}
													});
										});
						columnStoreleft
								.on(
										'load',
										function() { // 在load完成是对Itemselector富默认值
											Ext.getCmp('columnGridPanel')
													.getView().plugins[0]
													.disable();
											Ext
													.getCmp('gridDelRec')
													.setDisabled(
															Ext
																	.getCmp(
																			'gridGridPanel')
																	.getSelectionModel()
																	.getSelection().length == 0);
											Ext
													.getCmp('columnDelRec')
													.setDisabled(
															Ext
																	.getCmp(
																			'columnGridPanel')
																	.getSelectionModel()
																	.getSelection().length == 0);
											Ext.Array.clean(toColumnValue);
											data = Ext.getCmp('gridGridPanel')
													.getSelectionModel()
													.getSelection()[0];
											if (Ext.getCmp('gridGridPanel')
													.getSelectionModel()
													.getSelection().length > 0) {
												Ext.getCmp('columnGridPanel')
														.getView().plugins[0]
														.enable();
												var gridSid = data.get('sid');
												Ext.Ajax
														.request({
															url : 'system/column/read.action',
															params : {
																'qm.gridSid' : gridSid
															},
															success : function(
																	response) {
																var text = response.responseText;
																var reText = Ext
																		.decode(response.responseText).items;
																toColumnValue = new Array();
																for ( var i = 0; i < reText.length; i++) {
																	toColumnValue
																			.push(reText[i]);
																}
																// columnStoreleft
																// .removeAll();

																// columnStoreleft
																// .add(toColumnValue);
															},
															failure : function(
																	response) {
																Sgai.util.Util
																		.showErrorMsg(response.responseText);
															}
														});
											}
										});

						this.items = [ {
							xtype : 'panel',
							title : translations.grid,
							layout : 'fit',
							columnWidth : 0.5,// 控制显示的宽度
							items : [ queryPanel, grid ]
						}, {
							title : translations.column,
							xtype : 'panel',
							layout : 'fit',
							columnWidth : 0.5,
							items : [ tabpanel ]
						}

						];
						var grid = Ext.getCmp('gridGridPanel');
						this.items[0].dockedItems = [ Sgai.util.Util
								.pagingToolbar(grid, pageSize) ];

						this.callParent(arguments);
					}

				});
