/**
 * Created by tenderlitch on 2015/5/29.
 */
Ext.define('Sgai.view.common.window.EditWindow',{
    extend:'Ext.window.Window',
    alias:'widget.editwindow',
    autoShow:true,
    modal:true,
    initComponent:function(){
        var form,me=this;
        if(me.items && me.items.length>0){
            form=Ext.Array.findBy(me.items,function(item){
                if(item.xtype==='form') return true;
            },me);
            if(form){
                form.buttons=[
                    {
                        text:'确定',
                        handler:function(){
                            this.up('window').fireEvent('confirmBtnClick',me);
                        },
                        formBind:true
                    },
                    {
                        text:'取消',
                        handler:function(){
                            this.up('window').close();
                        }
                    }
                ];
                form.bodyPadding=5;
            }
        }
        this.callParent(arguments);
        if(form){
            this.enableBubble('confirmBtnClick');//确认按钮的点击事件,激活冒泡
        }
    }
});