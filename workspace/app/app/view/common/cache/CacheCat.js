Ext.define('Sgai.view.common.cache.CacheCat', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.cacheCat',
			title : '缓存大类',
			autoScroll : true,
			reference : 'cacheCat',
			loadMask : true,
			layout : 'fit',

			requires : ['Sgai.view.common.cache.CacheCatGrid'],

			dockedItems : [{
						xtype : 'queryform',
						itemId : 'catForm',
						formItems : [{
									name : 'qm.field',
									xtype : 'textfield',
									itemId : 'field',
									reference : 'field',
									width : 230,
									labelWidth : 80,
									fieldLabel : '缓存大类ID'
								}]
					}],
			items : [{
						xtype : 'cacheCatGrid',
						reference : 'cacheCatGrid'
					}]
		});