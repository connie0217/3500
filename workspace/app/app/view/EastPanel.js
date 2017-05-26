Ext.define('Sgai.view.EastPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.eastpanel',

    requires: [
        'Ext.ux.IFrame'
    ],
    activeTab: 0,
    plain: true,
    headerPosition: 'right',
    
    reference:'eastpanel',
    	
    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'home',
            itemId:'homePanel',
            name:'homePanel',
            title: translations.homePage,
            loyout:'fit',
            disabled: false,
            bodyStyle:{
				background:'url(images/default1.jpg) center right no-repeat fixed',
				'background-size':'contain'
			}
        }
    ]
});