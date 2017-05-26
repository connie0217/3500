Ext.define('Sgai.view.common.CommonTypeComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.commontypecombobox',
	requires : ['Sgai.model.common.commonType.MdCommonTypeModel'],
    typeId:'typeId',
    emptyText : translations.pleaseSelect,
    displayField:'typeName',
    queryMode:'local',
    valueField:'typeId',
    sgaiStoreLoaded:false,
    storeFilters:[],
    initComponent : function() {
        var me=this;
        me.store = Ext.create('Ext.data.Store', {
            //storeId : me.itemId + "Store",
            model : 'Sgai.model.common.commonType.MdCommonTypeModel',
            autoLoad : false,
            async : false,
            filters : me.storeFilters, 
            proxy : {
                type : 'ajax',
                url : 'md/md-common-type/findItemsByTypeId.action',
                extraParams : {
                    'qm.typeId' : me.typeId
                },
                reader : {
                    type : 'json',
                    rootProperty : 'items'
                }
            }
        });
//        if (!Ext.isEmpty(me.storeFilters) && me.storeFilters.length>0) {
//    		me.store.setFilters(me.storeFilters);
//        };
        me.callParent(arguments);
        me.on('render',function(combo){
            if(!combo.sgaiStoreLoaded){
                combo.getStore().load({
                    callback:function(){combo.sgaiStoreLoaded=true}
                });
            }
        },me);
    }

});