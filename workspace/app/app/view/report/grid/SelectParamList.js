Ext.define('Sgai.view.report.grid.SelectParamList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.selectparamlist',
			frame : true,
			store : Ext.create('Sgai.store.report.grid.SelectParams'),
			loadMask : true,
			reference : 'selectParamGrid',
			selType : 'checkboxmodel',
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					id : 'selectParamDrop',
					dragText : '',
					ddGroup : 'gridparam'
				},
				listeners : {
					beforedrop : 'selectParamGridBeforeDrop'
				}
			},
			columns : [{
						xtype : 'rownumberer',
						width : 30,
						text : '序号'
					}, {
						width : 100,
						dataIndex : 'paramId',
						text : 'ID'
					}, {
						width : 120,
						dataIndex : 'paramType',
						text : '数据类型'
					}]
		});
