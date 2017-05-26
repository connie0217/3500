/**
 * Created by tenderlitch on 14-11-6.
 * 简单的分页下拉菜单,分页条只有向前和向后翻页按钮,已节省宽度
 */
Ext.define('Sgai.view.common.SimplePagingCombo',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.simplepagingcombo',
    requires:['Sgai.view.common.SimplePagingBoundList'],
    createPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'simplepagingboundlist',
                pickerField: me,
                selModel: {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                pageSize: me.pageSize,
                tpl: me.tpl,
                listeners:{
                    'beforepagingchange':function(){
                        me.fireEvent('beforepagingchange',me);
                    }
                }
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.widget(pickerCfg);
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            selectionchange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    },
    onTriggerClick: function() {
        var me = this;
        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                me.onFocus({});
                if (me.triggerAction === 'all') {
                    me.doQuery(me.allQuery, true);
                } else if (me.triggerAction === 'last') {
                    me.doQuery(me.lastQuery, true);
                } else {
                    me.doQuery(me.getRawValue(), false, true);
                }
                me.fireEvent('triggerclick',me);
            }
            me.inputEl.focus();
        }
    },
    initComponent: function() {
        this.addEvents('triggerclick');
        this.callParent();
    }
});