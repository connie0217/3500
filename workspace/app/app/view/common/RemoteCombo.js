/**
 * Created by tenderlitch on 14-7-31.
 */
Ext.define('Sgai.view.common.RemoteCombo',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.remotecombo',
    dataUrl:'combo/combo/findComboBoxValue.action',
    tableName:'MES_ED_ARISES_CREW',
    displayName:'CREW_NAME',
    valueName:'CREW_ID',
    rootName:'items',
    queryMode:'local',
    displayField:'key',
    valueField:'value',
    orderField:'',
    keyword :'',
    sgaiStoreLoaded:false,
    listeners:{
        render:function(combo){
        	var me=this;
            if(!combo.sgaiStoreLoaded){
                combo.getStore().load({
                    callback:function(records,operation,success) {
                        if (success && combo.value !== undefined && records && records.length > 0) {
                        	var values = Sgai.config.Runtime.getComboxValues();
                        	var flag = false;
                        	for (var i = 0; i < values.length; i++) {
                        		var value = values[i];
                        		if (value.keyId==me.filterValue) {
                        			flag = true;
                        			break;
                        		}
                        	}
                        		
                        	var main = {};
                        	var items = [];
                            for (var i = 0; i < records.length; i++) {
                                var record = records[i];
                                if (!flag) {
                                	items.push(record.data);
                                }
                                if (record.get('value') === combo.value) {
                                    combo.clearValue();
                                    combo.select(record);
                                }
                            }
                            if (!flag) {
	                            main.keyId = me.filterValue;
	                            main.items = items;
	                            values.push(main);
                            }
                        }
                        combo.sgaiStoreLoaded=true;
                    }
                });
            }
        }
    },
    initComponent : function() {
        var me=this;
        this.store=Ext.create('Ext.data.Store', {
            //model: "User",
            fields: [{name: 'key',  type: 'string'},
                {name: 'value', type: 'string'},
                {name:'nextField',type:'string'}],
            /*autoLoad:{
                params:{
                    tableName:me.tableName,
                    displayField:me.displayName,
                    nextField:me.nextField,
                    valueField:me.valueName,
                    filterName:me.filterName,
                    filterValue:me.filterValue,
                    filterValueLike:me.filterValueLike
                },
                callback:function(records,operation,success){
                    if(success && me.value!==undefined && records && records.length>0){
                        for(var i=0;i<records.length;i++){
                            var record=records[i];
                            if(record.get('value')===me.value){
                                me.clearValue();
                                me.select(record);
                            }
                        }
                    }
                }
            },*/
            proxy: {
                type: 'ajax',
                url: me.dataUrl,
                reader: {
                    type: 'json',
                    rootProperty: me.rootName
                },
                extraParams:{
                    tableName:me.tableName,
                    displayField:me.displayName,
                    nextField:me.nextField,
                    valueField:me.valueName,
                    filterName:me.filterName,
                    filterValue:me.filterValue,
                    filterValueLike:me.filterValueLike,
                    orderField:me.orderField,
                    keyword:me.keyword
                }
            }
        });
        this.callParent(arguments);
    }
});