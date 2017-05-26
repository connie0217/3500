Ext.define('Sgai.view.demo.LeaveApplyList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.leaveapplylist',
	requires : [ 'Ext.ux.PagingToolbarResizer' ],
	frame : true,
	store : Ext.create('Sgai.store.demo.LeaveApplys'),
	loadMask : true,
	reference : 'mainGrid',
	selType : 'checkboxmodel',
    selModel:{
        mode:'SINGLE'
    },
	columns : [
			{
				xtype : 'rownumberer',
				width : 50,
				text : translations.rowNumber
			},
			{
				header : '查看',
				align : 'center',
				xtype : 'actioncolumn',
				width : 70,
				items : [{
							iconCls : 'add',
							tooltip : '查看审批',
							handler : 'traceHistory'
						}]
			},
			{
				width : 150,
				dataIndex : 'applyBy',
				text : '申请人'
			},
			{
				width : 150,
				dataIndex : 'applyDate',
				text : '申请时间'
			},
			{
				width : 150,
				xtype : 'datecolumn',
				format : Sgai.util.Util.commTimeFormat,
				submitFormat : Sgai.util.Util.commTimeFormat,
				dataIndex : 'startDate',
				text : '开始日期',
				editor : {
					xtype : 'datefield',
					allowBlank : false
				}
			},
			{
				width : 150,
				xtype : 'datecolumn',
				format : Sgai.util.Util.commTimeFormat,
				submitFormat : Sgai.util.Util.commTimeFormat,
				dataIndex : 'endDate',
				text : '结束日期',
				editor : {
					xtype : 'datefield',
					allowBlank : false
				}
			},
			{
				width : 150,
				dataIndex : 'reason',
				text : '请假原因',
				editor : {
					allowBlank : false
				}
			},
			{
				width : 150,
				dataIndex : 'leaveState',
				text : '请假状态',
				renderer : function(value, metaData, record) {
					if (!value) {
						return '';
					}
					var leaveStateCombo = Ext.ComponentQuery
							.query('#leaveStateCombo')[0];
					if (leaveStateCombo) {
						var store = leaveStateCombo.getStore();
						return store.getAt(store.find('typeId',value)).data.typeName;
					}
					return value;
				}
			},{
				width : 150,
				xtype : 'datecolumn',
				format : Sgai.util.Util.commTimeFormat,
				submitFormat : Sgai.util.Util.commTimeFormat,
				dataIndex : 'actStartDate',
				text : '实际开始日期',
				editor : {
					xtype : 'datefield'
				}
			},
			{
				width : 150,
				xtype : 'datecolumn',
				format : Sgai.util.Util.commTimeFormat,
				submitFormat : Sgai.util.Util.commTimeFormat,
				dataIndex : 'actEndDate',
				text : '实际结束日期',
				editor : {
					xtype : 'datefield'
				}
			},
			{
				width : 150,
				dataIndex : 'procInstId',
				text : '工作流实例ID'
			},
			{
				width : 150,
				xtype : 'datecolumn',
				format : Sgai.util.Util.commTimeFormat,
				submitFormat : Sgai.util.Util.commTimeFormat,
				dataIndex : 'reportBackDate',
				text : '销假日期'
			},
			{
				xtype : 'actioncolumn',
				header : translations.del,
				width : 50,
				items : [ {
					icon : 'resources/icons/delete.png',
					tooltip : translations.del,
					handler : function(grid, rowIndex, colIndex) {
						this.up('grid').fireEvent('deletecolumnclicked', grid,
								rowIndex, colIndex);
					}
				} ]
			} ],
	listeners : {
		render : 'leaveApplyListRender',
		edit : 'rowEditFired',
		canceledit : 'rowEditCancel',
		deletecolumnclicked : 'rowDeleteFired',
		selectionchange : 'selectionChange'
	},
	plugins : [ Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToMoveEditor : 1,
		autoCancel : true
	}) ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		store : 'demoleaveapplys', // same store GridPanel is using
		dock : 'bottom',
		displayInfo : true,
		plugins : [ {
			ptype : 'pagingtoolbarresizer'
		} ]
	} ]
});
