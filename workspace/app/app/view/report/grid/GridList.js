Ext.define('Sgai.view.report.grid.GridList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.gridlist',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext.create('Sgai.store.report.grid.Grids'),
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
						dataIndex : 'gridId',
						text : 'ID',
						editor : {
							allowBlank : false
						}
					}, {
						flex : 1,
						dataIndex : 'gridDesc',
						text : '描述',
						editor : {
							allowBlank : false
						}
					}, {
						width : 70,
						dataIndex : 'gridType',
						text : '类型',
						itemId : 'gridType',
						editor : Sgai.util.Util.createCommonTypeComboBox(
								'UI_GRID_TYPE', 'gridType', null, false),
						renderer : function(value) {
							var combo = Ext.ComponentQuery
									.query('combo#gridType')[0];
							return combo.setValue(value).getRawValue();
						}
					}, {
						width : 70,
						dataIndex : 'queryType',
						text : '查询类型',
						itemId : 'queryType',
						editor : Sgai.util.Util.createCommonTypeComboBox(
								'UI_GRID_QUERY_TYPE', 'queryType', null, false),
						renderer : function(value) {
							var combo = Ext.ComponentQuery
									.query('combo#queryType')[0];
							return combo.setValue(value).getRawValue();
						}
					}, {
						width : 150,
						dataIndex : 'selectId',
						text : '查询ID',
						editor : {
							allowBlank : false
						}
					}, {
						width : 100,
						dataIndex : 'parentResourceSid',
						text : '菜单分组',
						itemId : 'parentResourceSid',
						editor : {
							xtype : 'remotecombo',
							itemId : 'parentResourceSid',
							name : 'qm.rptCat',
							tableName : 'v_su_report_menus',
							displayName : 'RES_NAME',
							valueName : 'SID',
							filterName : 'RES_LEVEL',
							filterValue : '1',
							editable : false,
							allowBlank : false
						},
						renderer:function(value, metaData, record) {
							if(!value){
								return '';
							}
							var store  = Ext.ComponentQuery.query('#parentResourceCombo')[0].getStore();							    	
							if(store.find('value',value)!=-1){
								return store.getAt(store.find('value',value)).data.key;
							}
		                }
					}, {
						width : 70,
						dataIndex : 'pageFlag',
						text : '是否分页？',
						renderer : function(value) {
							if (value == 1) {
								return '是';
							}
								return '否';
						},
						editor : {
			                xtype:'combo',
			                valueField:'value',
			                editable:false,
			                store:new Ext.data.SimpleStore({
			                fields:['value','text']	,
			                data:[
			                      ['1',"是"],
			                      ['0',"否"]
			                      ]
			                })
						}
					}, {
						width : 70,
						dataIndex : 'summaryFlag',
						text : '是否合计？',
						renderer : function(value) {
							if (value == 1) {
								return '是';
							}
								return '否';
						},
						editor : {
			                xtype:'combo',
			                valueField:'value',
			                editable:false,
			                store:new Ext.data.SimpleStore({
			                fields:['value','text']	,
			                data:[
			                      ['1',"是"],
			                      ['0',"否"]
			                      ]
			                })
						}
					}, {
						width : 70,
						xtype : 'numbercolumn',
						dataIndex : 'limitPerPage',
						text : '每页行数',
						editor : {
							xtype:'numberfield'
						}
					}, {
						width : 90,
						dataIndex : 'excelFooterFlag',
						text : '导出Excel页脚？',
						renderer : function(value) {
							if (value == 1) {
								return '是';
							}
								return '否';
						},
						editor : {
			                xtype:'combo',
			                valueField:'value',
			                editable:false,
			                store:new Ext.data.SimpleStore({
			                fields:['value','text']	,
			                data:[
			                      ['1',"是"],
			                      ['0',"否"]
			                      ]
			                })
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
				render : 'gridListRender',
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
						store : 'ui.gridgrids', // same store GridPanel is using
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					}]
		});
