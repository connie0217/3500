Ext.define('Sgai.view.common.cache.CacheItem', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.cacheItem',
			title : '缓存明细',

			autoScroll : true,
			reference : 'cacheItem',
			loadMask : true,
			requires : ['Sgai.view.common.cache.CacheItemGrid'],

			layout : 'fit',

			dockedItems : [{
						xtype : 'queryform',
						itemId : 'itemForm',
						formItems : [{
									name : 'qm.key',
									xtype : 'textfield',
									itemId : 'key',
									reference : 'key',
									width : 230,
									labelWidth : 80,
									fieldLabel : '缓存明细ID'
								}, {
									name : 'qm.field',
									reference : 'fieldTmp',
									xtype : 'hidden'
								}]
					}],
			items : [{
						xtype : 'cacheItemGrid',
						reference : 'cacheItemGrid'
					}]
		});