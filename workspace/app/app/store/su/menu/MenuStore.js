Ext.define('Sgai.store.su.menu.MenuStore', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    model: 'Sgai.model.su.menu.MenuModel',
	root: {
	    expanded: true
	},
    proxy: {
    	 type:'ajax',
    	 actionMethods:{read: 'POST'},
    	 api:
         {
             read:'system/login/menu4report.action' 
         },
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});