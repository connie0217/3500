Ext.define('Sgai.view.demo.DemoUserList',
		{
			extend : 'Ext.grid.Panel',
			alias : 'widget.demouserlist',
			requires : [ 'Ext.ux.PagingToolbarResizer',
					'Ext.grid.filters.Filters',
					'Ext.grid.selection.SpreadsheetModel',
					'Ext.grid.plugin.Clipboard' ],
			frame : true,
			store : Ext.create('Sgai.store.demo.DemoUsers'),
			loadMask : true,
			reference : 'mainGrid',
			selType : 'checkboxmodel',
			columns : [
					{
						xtype : 'rownumberer',
						width : 50,
						text : translations.rowNumber
					},
					{
						width : 150,
						dataIndex : 'name',
						text : '姓名',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'pin',
						text : 'ID',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'password',
						text : '密码',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'gender',
						text : '性别',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'phone1',
						text : '手机号1',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'phone2',
						text : '手机号2',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'tel',
						text : '固定电话',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'email',
						text : '邮箱',
						editor : {
							allowBlank : false
						}
					},
					{
						width : 150,
						xtype : 'numbercolumn',
						dataIndex : 'state',
						text : '状态',
						editor : {
							xtype : 'numberfield',
							allowBlank : false
						}
					},
					{
						width : 150,
						dataIndex : 'userPost',
						text : '岗位',
						editor : {
							allowBlank : false
						}
					},
					{
						xtype : 'actioncolumn',
						header : translations.del,
						width : 50,
						items : [ {
							icon : 'resources/icons/delete.png',
							tooltip : translations.del,
							handler : function(grid, rowIndex, colIndex) {
								this.up('grid').fireEvent(
										'deletecolumnclicked', grid, rowIndex,
										colIndex);
							}
						} ]
					} ],
			listeners : {
				render : 'userListRender',
				edit : 'rowEditFired',
				canceledit : 'rowEditCancel',
				deletecolumnclicked : 'rowDeleteFired',
				selectionchange : 'selectionChange'
			},
			plugins : [ Ext.create('Ext.grid.plugin.RowEditing', {
				clicksToMoveEditor : 1,
				autoCancel : true
			}), {
				ptype : 'gridfilters'
			}, {
				ptype : 'selectGridHeaderAdjust',
				aliasName : 'userGridHeaderAdjust'
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				flex : 1,
				dock : 'top',
				items : [ {
					xtype : 'button',
					text : '自定义列',
					itemId : 'columnCustom',
					iconCls : 'app_edit',
					listeners : {
						click : 'onButtonClickColumn'
					}
				}, {
					xtype : 'button',
					text : '导出',
					itemId : 'exportExcel',
					iconCls : 'excel',
					listeners : {
						click : 'onButtonClickExport'
					}
				}, {
					xtype : 'button',
					text : '导出2007',
					itemId : 'exportExcel2007',
					iconCls : 'excel',
					listeners : {
						click : 'onButtonClickExport2007'
					}
				} ]
			}, {
				xtype : 'pagingtoolbar',
				store : 'demousers', // same store GridPanel is using
				dock : 'bottom',
				displayInfo : true,
				plugins : [ {
					ptype : 'pagingtoolbarresizer'
				} ]
			} ]
		});
