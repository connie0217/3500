/**
 * Created by tenderlitch on 2014/11/6.
 */
Ext.define('Sgai.view.common.SimplePagingBoundList',{
    extend:'Ext.view.BoundList',
    alias:'widget.simplepagingboundlist',
    requires:['Sgai.view.common.SimplePagingToolbar'],
    createPagingToolbar: function() {
        var me=this;
        return Ext.widget('simplepagingtoolbar', {
            id: this.id + '-paging-toolbar',
            pageSize: this.pageSize,
            store: this.dataSource,
            border: false,
            ownerCt: this,
            ownerLayout: this.getComponentLayout(),
            listeners:{
                'beforechange':function(){
                    me.fireEvent('beforepagingchange');
                }
            }
        });
    }
});