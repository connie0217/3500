Ext.define('Sgai.view.report.select.SelectDefConfigList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.selectdefconfiglist',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext.create('Sgai.store.report.select.SelectDefConfigs'),
			loadMask : true,
			reference : 'mainGrid',
			selType : 'checkboxmodel',
			selModel : {
				mode : 'SINGLE'
			},
			columns : [{
						xtype : 'rownumberer',
						width : 50,
						text : translations.rowNumber
					}, {
						width : 150,
						dataIndex : 'selectId',
						text : 'Id',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'selectName',
						text : '名字',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'selectDesc',
						text : '描述',
						editor : {
							allowBlank : false
						}
					/*}, {
						width : 150,
						dataIndex : 'defineDetail',
						hidden : true,
						text : 'select定义详细信息',
						editor : {
							allowBlank : false
						}*/
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
			listeners : {
				render : 'selectDefConfigListRender',
				edit : 'rowEditFired',
				canceledit : 'rowEditCancel',
				deletecolumnclicked : 'rowDeleteFired',
				selectionchange : 'selectionChange'
			},
			plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
						clicksToMoveEditor : 1,
						autoCancel : true
					})]
		});
