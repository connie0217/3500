Ext.define('Sgai.view.MainPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainpanel',

    requires: [
        'Ext.ux.IFrame',
    'Ext.ux.TabScrollerMenu',
    'Ext.ux.TabReorderer',
    'Ext.ux.TabCloseMenu'
    ],
    reference :'mainpanel',
    activeTab: 0,
    plain: true,
    plugins:[
          Ext.create('Ext.ux.TabReorderer'),
          Ext.create('Ext.ux.TabCloseMenu',{
              closeTabText: '关闭当前标签',
              closeOthersTabsText: '关闭其他标签',
              closeAllTabsText: '关闭所有标签'
          })
    ],
    	
    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'home',
            itemId:'homePanel',
            name:'homePanel',
            id:'homePanel',
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