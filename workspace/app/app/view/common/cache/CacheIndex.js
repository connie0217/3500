Ext.define('Sgai.view.common.cache.CacheIndex', {
			extend : 'Ext.panel.Panel',
			alias : "widget.cacheIndex",
			layout : 'border',
			itemId : 'cacheIndex',

			requires : ['Sgai.view.common.cache.CacheCat',
					'Sgai.view.common.cache.CacheItem',
					'Sgai.view.common.cache.CacheController'],
			controller : 'cacheController',

			items : [{
						xtype : 'cacheCat',
						reference : 'cacheCat',
						region : 'center',
						width : '40%',
						flex : 1
					}, {
						xtype : 'cacheItem',
						reference : 'cacheItem',
						region : 'east',
						width : '60%',
						flex : 1
					}]
		});
