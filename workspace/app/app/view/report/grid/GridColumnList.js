Ext.define('Sgai.view.report.grid.GridColumnList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.gridcolumnlist',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext.create('Sgai.store.report.grid.GridColumns'),
			loadMask : true,
			reference : 'columnGrid',
			selType : 'checkboxmodel',
			columns : [{
						xtype : 'rownumberer',
						width : 40,
						text : translations.rowNumber
					}, {
						width : 50,
						xtype : 'numbercolumn',
						dataIndex : 'gridSid',
						hidden : true,
						editor : {
							xtype : 'numberfield',
							allowBlank : false
						}
					}, {
						width : 50,
						xtype : 'numbercolumn',
						format : '000',
						dataIndex : 'position',
						text : '次序',
						editor : {
							xtype : 'numberfield',
							allowBlank : false
						}
					}, {
						width : 100,
						dataIndex : 'dataIndex',
						text : '列名',
						editor : {
							allowBlank : false
						}
					}, {
						width : 100,
						dataIndex : 'xtype',
						text : '列类型',
						editor : {
							allowBlank : true
						}
					}, {
						width : 120,
						dataIndex : 'text',
						text : '标签',
						editor : {
							allowBlank : false
						}
					}, {
						width : 70,
						xtype : 'numbercolumn',
						dataIndex : 'width',
						text : '显示宽度',
						editor : {
							xtype : 'numberfield',
							allowBlank : false
						}
					}, {
						width : 70,
						xtype : 'numbercolumn',
						dataIndex : 'hiddenFlag',
						text : '是否隐藏',
						editor : {
							xtype : 'combo',
							editable : false,
							valueField : 'value',
							store : new Ext.data.SimpleStore({
										fields : ['value', 'text'],
										data : [[0, "否"], [1, "是"]]
									})
						},
						renderer : function(value) {
							if (value == 0) {
								return '否';
							}
							if (value == 1) {
								return '是';
							}
						}
					}, {
						width : 70,
						xtype : 'numbercolumn',
						dataIndex : 'sortFlag',
						text : '是否可排序',
						editor : {
							xtype : 'combo',
							editable : false,
							valueField : 'value',
							store : new Ext.data.SimpleStore({
										fields : ['value', 'text'],
										data : [[0, "否"], [1, "是"]]
									})
						},
						renderer : function(value) {
							if (value == 0) {
								return '否';
							}
							if (value == 1) {
								return '是';
							}
						}
					}, {
						width : 120,
						dataIndex : 'summaryType',
						text : '合计类型',
						editor : {
						}
					}, {
						width : 120,
						dataIndex : 'summaryFormatter',
						text : '合计格式',
						editor : {
						}
					}, {
						width : 120,
						dataIndex : 'dateFormat',
						text : '日期格式',
						editor : {
						}
					}, {
						width : 120,
						dataIndex : 'others',
						text : '其他',
						editor : {
						}
					}, {
						width : 120,
						dataIndex : 'renderer',
						text : '渲染器'
					}, {
						xtype : 'actioncolumn',
						header : translations.del,
						width : 50,
						items : [{
							icon : 'resources/icons/delete.png',
							tooltip : translations.del,
							handler : function(grid, rowIndex, colIndex) {
								this.up('grid').fireEvent(
										'deletecolumnclicked', grid, rowIndex,
										colIndex);
							}
						}]
					}],
			// listeners : {
			// render : 'gridColumnListRender',
			// edit : 'rowEditFired',
			// canceledit : 'rowEditCancel',
			// deletecolumnclicked : 'rowDeleteFired',
			// selectionchange : 'selectionChange'
			// },
			plugins : [Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToMoveEditor : 1,
						autoCancel : true
					})],
			dockedItems : [{
						xtype : 'toolbar',
						flex : 1,
						dock : 'top',
						items : [{
									xtype : 'button',
									text : translations.save,
									itemId : 'columnSave',
									iconCls : 'save',
									listeners : {
										click : 'columnSaveButtonClick'
									}
								}]
					}],
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					id : 'columndrop',
					ddGroup : 'gridcolumn',
					dragText : translations.gridColumn.columnDrag
				},
				listeners : {
					beforedrop : 'columnGridBeforeDrop',
					drop : 'columnGridDrop'
				}
			}
		});
