/**
 * Created by tenderlitch on 2015/6/18.
 */
Ext.define('Sgai.view.common.form.BackPanel',{
    extend:'Ext.panel.Panel',
    xtype:'backform',
    iconCls:'look',
    title:translations.queryCond,
    collapsible: true,
    layout:'fit',
    formItems:[],
    queryBtnHandler:'queryButtonClick',
    items:[
        {
            xtype:'form',
            bodyPadding:5,
            reference:'queryForm',
            layout:'column'
        }
    ],
    initComponent:function(){
        var me=this;
        me.formItems=me.formItems.concat([
            {
                xtype:'button',
                text:translations.query,
                margin:'0 0 0 10',
                width:60,
                formBind:true,
                iconCls: 'find',
                reference:'queryButton',
                listeners: {
                    click: me.queryBtnHandler
                }
            },
            {
                xtype:'button',
                text:translations.reset,
                margin:'0 0 0 10',
                width:60,
                iconCls: 'reset',
                listeners: {
                    click: function(){
                        Sgai.util.Util.formReset(this);
                    }
                }
            },
            {
                xtype:'button',
                iconCls: 'edit',
                text:'回带数据',
                reference:'backButton',
                margin:'0 0 0 10',
                width:80
            }
        ]);
        this.items[0].items=this.formItems;
        this.items[0].defaults=Ext.apply({},me.defaults,{
            xtype:'textfield',
            labelWidth:80,
            width:230,
            labelAlign:'right'
        });
        this.callParent(arguments);
    }
});