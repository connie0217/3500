Ext.define('Sgai.controller.common.fileupload.FileUploadController', {
    extend: 'Ext.app.Controller',
	
    requires: [
        'Sgai.util.Util'
    ],
    
    views: [
    	'common.fileupload.FileUploadView'
    ],

    stores: [
        
    ],

    refs: [ {
		ref: 'fileUploadView',
		selector: 'fileUploadView'
    	}
    ],
    
	init: function(application) {
	   this.control(
		   {
//			   	"pageI18nView grid button#btnQuery": {
//		            click: this.onButtonClickQuery
//		        },
//		        "pageI18nView grid button#btnReset": {
//		            click: this.onButtonClickReset
//		        },
//		        "pageI18nView grid button#btnNew": {
//		            click: this.onButtonClickNew
//		        },
//		        "pageI18nView grid button#btnSave": {
//		            click: this.onButtonClickSave
//		        },
//		        "pageI18nView grid actioncolumn#delRec": {
//		            click: this.onImgaeClickDel
//		        }
		   }
	   )	
	}
	
	
    
});