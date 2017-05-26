Ext.define('Sgai.store.su.grid.GridSet', {
	extend : 'Ext.data.Store',
	autoLoad : false,
	pageSize : 15,
	model : 'Sgai.model.su.grid.GridSet',
	storeId : 'su.grid',
	remoteSort : 'true',

	// 使用proxy指定加载远程数据
	proxy : {
		type : 'ajax',
		api : {
			read : 'system/grid/findByPage.action',
            create:'system/grid/add.action',
            update:'system/grid/update.action',
            destroy:'system/grid/destroy.action'
		},

		reader : {
			type : 'json',
			rootProperty : 'items',
			totalProperty : 'totalProperty',
			// {"results":13,"items":[{"id":"1","statu":1,},……{}],"success":true}
			successProperty : 'success',
			// 判断读取如果success为true，则调用rootProperty:'items'下的内容。如果为false则读取
			// messageProperty:'message'
			// message和success一样都是自己定义的。message可以用来输出报错信息的内容。
			messageProperty : 'message'
		}
	},
	actionMethods : {
		read : 'POST'
	},
	listeners : {

	}
});