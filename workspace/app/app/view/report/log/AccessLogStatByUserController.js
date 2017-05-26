Ext.define('Sgai.view.report.log.AccessLogStatByUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accesslogstatbyuser',

    queryButtonClick:function(button){
        Sgai.util.Util.postPageForm(this.lookupReference('queryForm'),this.getMainchart());
    },
    resetButtonClick:function(button){
       this.lookupReference('queryForm').getForm().reset();
    },
	getMainchart : function() {
		return this.lookupReference('mainChart');
	},
	rptCategorySelected:function(combo, record, index){	
    	var me=this;
    	var rptIdCombo = this.lookupReference('rptIdCombo');
		var store = rptIdCombo.getStore();
        rptIdCombo.reset();
        var param ={
        'tableName':'V_SU_REPORT_MENUS', 'displayField':'RES_NAME',
        'valueField':'RES_ID','filterName':'PARENT_SID',
        'filterValue': combo.value};
        store.getProxy().extraParams = param;
		store.load({callback: function(records, operation, success) {
			if(records.length>0){
				me.lookupReference('rptIdCombo').setValue(records[0].get('value'));
			}
	    }});
	}
    
});
