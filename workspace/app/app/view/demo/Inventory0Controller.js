Ext.define('Sgai.view.demo.Inventory0Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inventory0',

   userListRender:function(component){
        component.getStore().load();
    },
    queryButtonClick:function(button){
        Sgai.util.Util.postPageForm(this.lookupReference('queryForm'),this.getMaingrid());
    },
    resetButtonClick:function(button){
       return this.lookupReference('queryForm').getForm().reset();
    }
    ,
    getMaingrid:function(){
    	return this.lookupReference('mainGrid');
    }
});
