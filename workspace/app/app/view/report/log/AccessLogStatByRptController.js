Ext.define('Sgai.view.report.log.AccessLogStatByRptController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accesslogstatbyrpt',

    queryButtonClick:function(button){
        Sgai.util.Util.postPageForm(this.lookupReference('queryForm'),this.getMainchart());
    },
    resetButtonClick:function(button){
       this.lookupReference('queryForm').getForm().reset();
    },
	getMainchart : function() {
		return this.lookupReference('mainChart');
	}
    
});
