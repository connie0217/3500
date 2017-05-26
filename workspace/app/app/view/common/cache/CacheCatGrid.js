Ext.define('Sgai.view.common.cache.CacheCatGrid', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.cacheCatGrid',
			store : Ext.create('Sgai.store.common.cache.CacheCatStore', {
						storeId : 'cacheCatStore'
					}),
			selModel : {
				selType : 'checkboxmodel',
				mode : 'SINGLE',
				allowDeselect : false
			},

			autoScroll : true,
			reference : 'cacheCatGrid',
			loadMask : true,
			dockedItems : [{
						xtype : 'toolbar',
						items : [{
									xtype : 'button',
									text : '加载全部缓存',
									iconCls : 'refresh',
									itemId : 'btnLoadAllCat',
									listeners : {
										click : 'loadAllCat'
									}
								}, {
									xtype : 'button',
									text : '加载单项缓存',
									iconCls : 'refresh',
									itemId : 'btnLoadCat',
									listeners : {
										click : 'loadCat'
									}
								}]
					}],
			columns : [{
						xtype : 'rownumberer',
						width : 40,
						text : '序号'
					}, {
						text : '类别ID',
						flex : 3,
						dataIndex : 'field'
					}],
			listeners : [{
						selectionchange : 'tabcatSelect'
					}]
		});