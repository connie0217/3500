Ext.define('Sgai.view.demo.SelectDemoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.selectdemo',

   selectDemoListRender:function(component){
        component.getStore().load();
    },
    queryButtonClick:function(button){
        Sgai.util.Util.postPageForm(this.lookupReference('queryForm'),this.getMaingrid());
    },
    resetButtonClick:function(button){
       this.lookupReference('queryForm').getForm().reset();
    }
    ,
    getMaingrid:function(){
    	return this.lookupReference('mainGrid');
    }
    
    
});
