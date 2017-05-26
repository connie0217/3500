Ext.define('Sgai.view.demo.DemoUser', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.demouser',
    requires: [
        'Sgai.view.demo.DemoUserList','Sgai.view.demo.DemoUserController'
    ],
	controller:'demouser',
    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'demouserlist'
        }
    ],
    dockedItems: [
        {
            xtype:'panel',
            iconCls:'look',
            title:translations.queryCond,
            collapsible: true,
            layout:'fit',
            items:[
                {
                    xtype:'form',
                    layout:'column',
                    bodyPadding:5,
                    defaultType: 'textfield',
                    reference:'queryForm',
                    items: [
		    	    
									{
	                            name:'qm.name',
		                        itemId:'name',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '姓名',
								width:200
						}, 
												{
	                            name:'qm.pin',
		                        itemId:'pin',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: 'ID',
								width:200
						}, 
												{
	                            name:'qm.password',
		                        itemId:'password',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '密码',
								width:200
						}, 
												{
	                            name:'qm.gender',
		                        itemId:'gender',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '性别',
								width:200
						}, 
												{
	                            name:'qm.phone1',
		                        itemId:'phone1',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '手机号1',
								width:200
						}, 
												{
	                            name:'qm.phone2',
		                        itemId:'phone2',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '手机号2',
								width:200
						}, 
												{
	                            name:'qm.tel',
		                        itemId:'tel',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '固定电话',
								width:200
						}, 
												{
	                            name:'qm.email',
		                        itemId:'email',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '邮箱',
								width:200
						}, 
												{
	                            name:'qm.stateFrom',
		                        itemId:'stateFrom',
		                     		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '状态',
								width:200
						}, 
						{
	                            name:'qm.stateTo',
		                        itemId:'stateTo',
		                     		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '状态',
								width:200
						},
												{
	                            name:'qm.userPost',
		                        itemId:'userPost',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '岗位',
								width:200
						}, 
				                    
                        {
                            xtype:'button',
                            text:translations.query,
                            margin:'0 0 0 10',
                            itemId:'queryBtn',
                            iconCls: 'find',
							listeners: {
					            click: 'queryButtonClick'
					        }  
                        },
	                    {
	                        xtype:'button',
                            text:translations.reset,
                            margin:'0 0 0 10',
                            itemId:'resetBtn',
                            iconCls: 'reset'
	                    }
                    ]
                }
            ]
        }
        ,
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: translations.add,
                    itemId: 'add',
                    iconCls: 'add',
                    reference:'addBtn',
					listeners: {
			            click: 'addButtonClick'
			        }  
                },
                {
                    xtype: 'button',
                    text: translations.update,
                    itemId: 'edit',
                    iconCls: 'edit',
                    reference:'editBtn',
                    disabled: true,
					listeners: {
			            click: 'editButtonClick'
			        }  
                },
                {
                    xtype: 'button',
                    text: translations.del,
                    itemId: 'delete',
                    iconCls: 'delete',
                    reference:'deleteBtn',
                    disabled:true,
					listeners: {
			            click: 'deleteButtonClick'
			        }  
                }
            ]
        }
            ]
});
