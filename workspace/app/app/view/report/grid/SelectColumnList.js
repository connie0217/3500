Ext.define('Sgai.view.report.grid.SelectColumnList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.selectcolumnlist',
			frame : true,
			store : Ext.create('Sgai.store.report.grid.SelectColumns'),
			loadMask : true,
			reference : 'selectColumnGrid',
			selType : 'checkboxmodel',
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					id : 'SelectColumnDrop',
					dragText : '',
					ddGroup : 'gridcolumn'
				},
				listeners : {
					beforedrop : 'selectColumnGridBeforeDrop'
				}
			},
			columns : [{
						xtype : 'rownumberer',
						width : 30,
						text : '序号'
					}, {
						width : 100,
						dataIndex : 'colName',
						text : '名字'
					}, {
						width : 120,
						dataIndex : 'colTitle',
						text : '显示名称'
					}, {
						width : 60,
						dataIndex : 'colType',
						text : '数据类型'
					}]
		});
