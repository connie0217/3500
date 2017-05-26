Ext.define('Sgai.view.demo.DemoUserJpaList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.demouserjpalist',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext.create('Sgai.store.demo.DemoUserJpas'),
			loadMask : true,
			reference : 'mainGrid',
			selType : 'checkboxmodel',
			columns : [{
						xtype : 'rownumberer',
						width : 50,
						text : translations.rowNumber
					}, {
						width : 150,
						dataIndex : 'name',
						text : '姓名',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'pin',
						text : 'ID',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'password',
						text : '密码',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'gender',
						text : '性别',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'phone1',
						text : '手机号1',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'phone2',
						text : '手机号2',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'tel',
						text : '固定电话',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'email',
						text : '邮箱',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						xtype : 'numbercolumn',
						dataIndex : 'state',
						text : '状态',
						editor : {
							xtype : 'numberfield',
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'userPost',
						text : '岗位',
						editor : {
							allowBlank : false
						}
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
				render : 'userListRender',
				edit : 'rowEditFired',
				canceledit : 'rowEditCancel',
				deletecolumnclicked : 'rowDeleteFired',
				selectionchange : 'selectionChange'
			},
			plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
						clicksToMoveEditor : 1,
						autoCancel : true
					})],
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : 'demouserjpas', // same store GridPanel is using
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					}]
		});
