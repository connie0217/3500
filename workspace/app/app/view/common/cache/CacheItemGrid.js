Ext.define('Sgai.view.common.cache.CacheItemGrid', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.cacheItemGrid',
			store : Ext.create('Sgai.store.common.cache.CacheItemStore', {
						storeId : 'cacheItemStore'
					}),
			selModel : {
				selType : 'checkboxmodel',
				allowDeselect : false
			},

			autoScroll : true,
			reference : 'cacheItemGrid',
			loadMask : true,
			dockedItems : [{
						xtype : 'toolbar',
						items : [{
									xtype : 'button',
									text : '加载全部缓存',
									iconCls : 'refresh',
									itemId : 'btnLoadAllItem',
									listeners : {
										click : 'loadCat'
									}
								}, {
									xtype : 'button',
									text : '加载单项缓存',
									iconCls : 'refresh',
									itemId : 'btnLoadItem',
									listeners : {
										click : 'loadItem'
									}
								}]
					}],
			columns : [{
						xtype : 'rownumberer',
						width : 40,
						text : '序号'
					}, {
						text : '明细ID',
						flex : 3,
						dataIndex : 'key'
					}]
		});