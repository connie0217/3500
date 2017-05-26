Ext.define('Sgai.view.su.menu.MainMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.mainmenu',
    title: translations.menuTitle,
    iconCls: 'sitemap',
    rootVisible: false,
    hideHeaders:true,
    animate:true,
    useArrows: true,
    autoScroll : true,

	store: Ext.create('Sgai.store.su.menu.MenuStore'),
    reference:'mainmenu',
    columns: [
        {
            xtype: 'treecolumn',
            dataIndex: 'resName',
            flex:1,
            text: translations.resList
        }
    ],    
	listeners : {
		render : 'onMenuPanelRender',
		itemclick: 'onMenuItemClick',
		itemdblclick: 'onMenuItemDblClick'
	}
});