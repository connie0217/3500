Ext.define('Sgai.view.demo.DemoUserJpaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.demouserjpa',

   userListRender:function(component){
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
    },
    rowEditFired:function(editor,context){
        Sgai.util.Util.postEditRow(context);
    },
    addButtonClick:function(btn){
        Sgai.util.Util.addNewRow(this.getMaingrid());
    },
    editButtonClick:function(btn){
        Sgai.util.Util.editSelectedRow(this.getMaingrid());
    },
    deleteButtonClick:function(btn){
        Sgai.util.Util.deleteSeletedRow(this.getMaingrid());
    },
    rowEditCancel:function(btn, context){
        Sgai.util.Util.cancelEditRow(context);
    },
    rowDeleteFired:function(grid, rowIndex){
        Sgai.util.Util.deleteColumnClick(grid,rowIndex);
    },
    selectionChange:function(model, selected){
        this.lookupReference('editBtn').setDisabled(selected.length == 0);
        this.lookupReference('deleteBtn').setDisabled(selected.length == 0);
    }
    
    
});
