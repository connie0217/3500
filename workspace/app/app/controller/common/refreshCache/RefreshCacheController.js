Ext.define('Sgai.controller.common.refreshCache.RefreshCacheController', {
    extend: 'Ext.app.Controller',
	
    requires: [
        'Sgai.util.Util'
    ],
    
    views: [
    	'common.refreshCache.RefreshCacheView'
    ],

    stores: [
        
    ],

    refs: [ {
		ref: 'refreshCacheView',
		selector: 'refreshCacheView'
    	}
    ],
    
	init: function(application) {
	   this.control(
		   {
				"button#refreshSystemProperties": {
		            click: this.onButtonClick
		        },
		        "button#refreshCommonTypeItems": {
		            click: this.onButtonClick
		        },
		        "button#refreshUserGridColumns": {
		            click: this.onButtonClick
		        },
		        "button#refreshSelectDefs": {
		            click: this.onButtonClick
		        }
		   }
	   )	
	},
	
	onButtonClick: function(button, e, options) {
		//console.log(button.itemId);
		var url = 'md/refresh-cache/' + button.itemId + '.action';
		//console.log(url);
		this.executeRefresh(url, button);
	},
	
	executeRefresh:function(url, button) {
		var mask = new Ext.LoadMask(Ext.getBody().component, {                          
        msg : '数据正在加载，请稍后... '});
        mask.show();
        
		Ext.Ajax.request({
    		method:'POST',
		    url: url,
		    async: false, 
		    success: function(response){
				if (button.name=='refreshCommonTypeItems') {
					Sgai.config.Runtime.setCommonTypeItems(Ext.decode(response.responseText));
				}
		    	var text = button.text + ' ' +translations.success;
		        Sgai.util.Util.showTipMsg(text);
		        mask.hide();
		    },
		    failure: function(response, opts) {
		        var reText = response.responseText;
		        var text = button.text + ' '+ translations.failed + ' ' + reText;
		        Sgai.util.Util.showErrorMsg(text);
		        mask.hide();
		    }
		});
	}
    
});