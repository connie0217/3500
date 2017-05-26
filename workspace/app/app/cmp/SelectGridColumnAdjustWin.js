Ext.define('Sgai.cmp.SelectGridColumnAdjustWin', {
			extend : 'Ext.window.Window',
			alias : 'widget.selectgridcolumnadjustwin',
			requires : ['Sgai.cmp.SelectGridColumnAdjustWinController'],
			controller : 'selectgridcolumnadjustwin',
			grid : '',
			title : '显示列定义',
			width : 480,
			height : 450,
			resizable : true,
			autoShow : false,
			autoDestroy : true,
			closable : true,
			layout : {
				type : 'border'
			},
			modal : true,

			items : [{
						xtype : 'grid',
						region : 'center',
						flex : 1,
						loadMask : true,
						reference : 'selectedColumnGrid',
						selType : 'checkboxmodel',
						viewConfig : {
							plugins : {
								ptype : 'gridviewdragdrop',
								id : 'SelectColumnDrop',
								dragText : '',
								ddGroup : 'griditem'
							},
							listeners : {
								drop : 'selectedColumnGridDrop'
							}
						},
						columns : [{
									dataIndex : 'position',
									width : 50,
									text : '序号'
								}, {
									width : 150,
									dataIndex : 'text',
									text : '名字'
								}, {
									width : 150,
									dataIndex : 'dataIndex',
									text : '列',
									hidden : true
								}]
					}, {
						xtype : 'grid',
						region : 'east',
						flex : 1,
						loadMask : true,
						reference : 'unSelectedColumnGrid',
						selType : 'checkboxmodel',
						viewConfig : {
							plugins : {
								ptype : 'gridviewdragdrop',
								id : 'SelectColumnDrop',
								dragText : '',
								ddGroup : 'griditem'
							},
							listeners : {
								drop : 'unSelectedColumnGridDrop'
							}
						},
						columns : [{
									dataIndex : 'position',
									width : 50,
									text : '序号'
								}, {
									width : 150,
									dataIndex : 'text',
									text : '名字'
								}, {
									width : 150,
									dataIndex : 'dataIndex',
									text : '列',
									hidden : true
								}]
					}],
			buttons : [{
						text : '确定',
						itemId : 'save',
						margin : '0 0 0 10',
						listeners : {
							click : 'saveButtonClick'
						}
					}, {
						text : translations.cancel,
						itemId : 'cancel',
						margin : '0 0 0 10',
						listeners : {
							click : 'cancelButtonClick'
						}
					}]
		});
