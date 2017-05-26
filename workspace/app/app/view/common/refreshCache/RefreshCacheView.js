Ext.define('Sgai.view.common.refreshCache.RefreshCacheView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.refreshCacheView',
    itemId: 'refreshCacheView',
    //layout:'fit',
    layout:'ux.center',  
    requires: [
        'Sgai.util.Util',
        'Sgai.view.Translation',
   		'Ext.ux.layout.Center'
    ],

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle:"padding:10px 10px 0x",
					border:0,
					heightRatio:0.3,
					//height:300,
					width:210,
					collapsible:false,
					frame : true,
					itemId: 'formPanel',
                    title: translations.refreshCache,
                    iconCls:'refresh',
                    buttonAlign:'center',
                    
                    layout: {
 				       type: 'table',
 				       columns: 1
      		       	},
      		       	
                    defaults: {
                    	xtype: 'button',
                    	width:200,
				        height:25,
						style:{
			            	marginTop:'5px'	            	
			            }
			        },

			        items: [		        		
			        	{
				            itemId:'refreshSystemProperties',
				            name:'refreshSystemProperties',
				            text:translations.reloadSystemParam					            
				        },
				        {
				            itemId:'refreshCommonTypeItems',
				            name:'refreshCommonTypeItems',
				            text:translations.reloadCommonData
				        },						    		        		
				        {
				            itemId:'refreshUserGridColumns',
				            name:'refreshUserGridColumns',
				            text:translations.refreshUserGridColumns
				        },						    		        		
				        {
				            itemId:'refreshSelectDefs',
				            name:'refreshSelectDefs',
				            text:translations.refreshSelectDefs
				        }						     
			        ]
                }]
        });
		this.callParent(arguments);
	}
});
