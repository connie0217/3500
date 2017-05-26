/**
 * 主界面
 */
Ext.define('Sgai.view.Main', {

    extend: 'Ext.container.Viewport',

    requires: [
        'Sgai.view.Header',
        'Sgai.view.su.menu.MainMenu',
        'Sgai.view.MainPanel',
        'Sgai.view.EastPanel',
        'Sgai.view.MainController'
    ],

    xtype: 'app-main',

    controller: 'main',//指定控制器

    layout: {
        type: 'border'
    },

	itemId:'appMain',
    items: [
        {
            xtype: 'mainmenu',
            width: 185,
            region: 'west',
            collapsible: true,
            style: 'background-color: #8FB488;',
			split: true
        },
        {
            xtype: 'appheader',
            region: 'north'
        },
        {
            xtype: 'mainpanel',
            flex:1,
            region: 'center',
			split: true
        },
        {
            xtype: 'eastpanel',
            flex:1,
            collapsed: true,
            collapsible: true,
            region: 'east'
        },
        
        {
            xtype: 'container',
            region: 'south',
            height: 25,
            style: 'border-top: 1px solid #4c72a4;',
            html: '<center>©Copyright <img alt="" src="resources/images/sgai-logo.png">&nbsp;&nbsp;'+ translations.developCompany+ '&nbsp;&nbsp;' + translations.applicationVersion +'20141203210435</center><right>'
        }
    ],
    
	listeners : {
		render : 'onMainRender',
		removed : 'onTabRemoved'
	}

});