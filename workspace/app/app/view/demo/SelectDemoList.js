Ext.define('Sgai.view.demo.SelectDemoList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.selectdemolist',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext.create('Sgai.store.demo.SelectDemos'),
			loadMask : true,
			reference : 'mainGrid',
			collapsible: true,
		    iconCls: 'icon-grid',
		    frame: true,
		    width: 700,
		    height: 500,
		    resizable: true,
    		columnLines: true,
		
		    plugins: 'gridfilters',
		
		    emptyText: 'No Matching Records',
		    loadMask: true,
		    stateful: true,
		    features: [{
		        ftype: 'summary',
        		dock: 'bottom',
        		showSummaryRow:true
		    }],
			columns : [{
						xtype : 'rownumberer',
						width : 50,
						text : translations.rowNumber,
						locked:true
					}, {
						width : 150,
						dataIndex : 'name',
						text : '姓名',
						filter: true
					}, {
						width : 150,
						dataIndex : 'sid',
						text : '主键',
						type : 'numbercolumn',
						filter: true,
						summaryType: 'sum',
            			summaryFormatter: 'number("0")'
					}, {
						width : 150,
						dataIndex : 'pin',
						text : 'ID'
					}, {
						width : 150,
						dataIndex : 'password',
						text : '密码'
					}, {
						width : 150,
						dataIndex : 'gender',
						text : '性别'
					}, {
						width : 150,
						dataIndex : 'phone1',
						text : '手机号1'
					}, {
						width : 150,
						dataIndex : 'phone2',
						text : '手机号2'
					}, {
						width : 150,
						dataIndex : 'tel',
						text : '固定电话'
					}, {
						width : 150,
						dataIndex : 'email',
						text : '邮箱'
					}, {
						width : 150,
						xtype : 'numbercolumn',
						dataIndex : 'state',
						text : '状态'
					}, {
						width : 150,
						dataIndex : 'userPost',
						text : '岗位'
					}],
			listeners : {
				render : 'selectDemoListRender'
			},
			plugins : [{
				ptype : 'gridfilters',
				aliasName : 'userGridHeaderAdjust'
			}],
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : 'selectdemos', // same store GridPanel is using
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					}]
		});
