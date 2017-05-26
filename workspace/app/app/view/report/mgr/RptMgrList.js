Ext.define('Sgai.view.report.mgr.RptMgrList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rptmgrlist',
	requires : ['Ext.ux.PagingToolbarResizer'],
	layout : 'fit',
	dock : 'top',
	region : 'center',
	autoScroll : true,
	store : Ext.create('Sgai.store.report.mgr.RptMgrStore'),
    reference:'rptMgrList',
	selModel : {
		  selType : 'checkboxmodel',
	      mode : 'SIMPLE'
	},
	tbar : [{
				xtype : 'button',
				text : '新建',
				itemId : 'btnNew',
				iconCls : 'add',
				listeners: {
					click:'onNewRpt'
			    }
			}, {
				xtype : 'button',
				text : '删除',
				itemId : 'btnDel',
				iconCls : 'delete',
			    reference:'rptDelBtn',
				listeners: {
					click:'onDelRpt'
			    }
			}, {
				xtype : 'button',
				text : '修改',
				itemId : 'btnUpd',
				iconCls : 'update',
			    reference:'rptUpdBtn',
				listeners: {
					click:'onUpdRpt'
			    }
			}, '-', {
				xtype : 'button',
				text : '发布',
				itemId : 'btnPub',
			    reference:'rptPubBtn',
				listeners: {
					click:'onPubRpt'
			    }
			}, {
				xtype : 'button',
				text : '取消发布',
				itemId : 'btnUnPub',
			    reference:'rptUnPubBtn',
				listeners: {
					click:'onUnPubRpt'
			    }
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
				dataIndex : 'rptId',
				flex : 1,
				text : '报表编码'
			}, {
				width : 150,
				dataIndex : 'rptName',
				flex : 1,
				text : '报表名称'
			}, {
				width : 150,
				dataIndex : 'rptCat',
				flex : 1,
				text : '报表分类'
			}, {
				width : 150,
				dataIndex : 'rptState',
				flex : 1,
				text : '报表状态',
				renderer : function(value) {
					if (value == 'created') {
						return '未发布';
					}
					if (value == 'published') {
						return '已发布';
					}
				}
			}, {
				width : 150,
				dataIndex : 'groupFlag',
				flex : 1,
				text : '报表组',
				renderer : function(value) {
					if(value &&value == '1' ){
						return '是';
					}
					return '否';
				}
			}, {
				width : 150,
				dataIndex : 'fillingFlag',
				flex : 1,
				text : '是否填报',
				renderer : function(value) {
					if(value &&value == '1' ){
						return '是';
					}
					return '否';
				}
			}, {
				width : 150,
				dataIndex : 'excelImportFlag',
				flex : 1,
				text : '是否导入Excel',
				renderer : function(value) {
					if(value &&value == '1' ){
						return '是';
					}
					return '否';
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
			}],
	dockedItems : [{
				xtype : 'pagingtoolbar',
				store : 'rptMgrStore',
				dock : 'bottom',
				displayInfo : true,
				plugins : [{
							ptype : 'pagingtoolbarresizer'
						}]
			}],
	listeners: {
        selectionchange:'onSelectionchange'
    }
});
