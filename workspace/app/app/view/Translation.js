Ext.define('Sgai.view.Translation', {
    extend: 'Ext.button.Split',
    alias: 'widget.translation',

    menu: Ext.create('Ext.menu.Menu', {
        items: [
            {
                xtype: 'menuitem',
                iconCls: 'zh_CN',
                text: translations.locale_zh_CN
            },
            {
                xtype: 'menuitem',
                iconCls: 'en',
                text: translations.locale_en
            }
        ]
    })
});