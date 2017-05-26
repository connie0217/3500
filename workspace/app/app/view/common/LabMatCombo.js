/**
 * Created by tenderlitch on 14-7-31.
 */
Ext.define('Sgai.view.common.LabMatCombo',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.labmatcombo',
    valueField : 'l3MatType',
	displayField : 'matTypeDesc',
	queryMode : 'local',
    initComponent : function() {
        this.store=Ext.create('Ext.data.Store', {
            fields: [
     			{name: 'l4Matnr' , type: 'string', defaultValue:null  },	    
    			{name: 'matName' , type: 'string' , defaultValue:null  },
    			{name: 'l3MatType' , type: 'string', defaultValue:null  },	    
    			{name: 'matTypeDesc' , type: 'string', defaultValue:null  }
            ],
            autoLoad:true,
            proxy: {
                type: 'ajax',
                url: 'lab/lab-main!getMatByPurview.action',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        this.callParent(arguments);
    }
});