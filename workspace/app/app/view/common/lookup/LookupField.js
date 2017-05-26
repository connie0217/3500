/**
 * Created by tenderlitch on 2016/4/5.
 */
Ext.define('Sgai.view.common.lookup.LookupField',{
    extend:'Ext.form.field.Text',
    xtype:'lookupfield',
    alias:'widget.lookupfield',
    editable:false,
    expvalue:'',
    fieldCls:'lookupfield',
    popTarget:'lookupwin',
    triggerEvent:'dblclick',
    initParameters:{
        productTypeCode:'',
        regionType:''
    },
    listeners:{
        render:function(component){
            component.getEl().on(this.triggerEvent, this.triggeredEvent,component);
        },
        lookupConfirm:function(valueRecord){
            this.lookupConfirm(valueRecord);
        }
    },
    triggeredEvent:function(event, el) {
        Ext.create({
            xtype:this.popTarget,
            targetField:this,
            initParameters:this.initParameters,
            expvalue:this.expvalue
        });
    },
    lookupConfirm:function(valueRecord){
        this.setValue(valueRecord);
    }
});