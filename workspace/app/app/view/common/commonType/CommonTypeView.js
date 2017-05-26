Ext.define('Sgai.view.common.commonType.CommonTypeView', {
    extend: 'Ext.Container',
	alias : 'widget.commonTypeView',
	store :'Sgai.store.common.commonType.CommonTypeStore',
	layout:'fit', 
    itemId: 'commonTypePanel',
    
    requires: [
        'Sgai.util.Util',
        'Sgai.view.Translation',
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.View'
    ],

    height: 475,
    width: 653,

    initComponent: function() {
        var me = this;
		var pageSize = 10;
		var storeMain = Ext.getStore('Sgai.store.common.commonType.CommonTypeStore');
		var storeItem = Ext.getStore('Sgai.store.common.commonType.CommonTypeItemStore');
		// 在grid前加复选框
		var selModel = Ext.create('Ext.selection.CheckboxModel', {
			
					listeners : //事件监听
					{
						selectionchange : function(sm, selections) {
						 Ext.getCmp('commonTypeDelRec').setDisabled(selections.length == 0);
						 
						 if(selections.length > 0){
								var data=Ext.getCmp('gridpanelMainId').getSelectionModel().getSelection()[0];
								var params = '';
								params = params + '\"' + 'qm.typeSid' + '\":\'' + data.get('sid') + '\',';
								params = params + '\"action\":\'read\',';
								params = params + '\"limit\":\'1000\',';
								params = params + '\"page\":\'1\',';
								params = params + '\"start\":\'0\'';	
								params = '({' + params + '})';
								params = eval(params);
								storeItem.removeAll();
								storeItem.load({
									params : params
								});	
							 }else{
							 	storeItem.removeAll();
							 }
						},
						
						dblclick: function(){
						}
						
						
					}
				});
		
        Ext.applyIf(me, {
            items: [{
            	
            	items:[
                {
                    xtype: 'form',
                    itemId:'formPanelMain',
                    collapsible:true,
                    frame : true,
                    border:0,
                    bodyPadding: 0,
                    title: translations.queryCond,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaultType : 'textfield',
                    items: [
                        {
                        	
                        	name:'qm.typeId',
		                    itemId:'typeId',
		                    labelWidth:90,
		                    labelAlign:'right',
		                    fieldLabel:'类型编码'
							//width:200
                        },
                        {
                        	name:'qm.typeName',
		                    itemId:'typeName',
		                    labelWidth:90,
		                    labelAlign:'right',
		                    fieldLabel:'类型名称'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    selModel : selModel, //每条记录前的复选框注意调用的方式  selModel是grid.panel自带属性
                    itemId: 'gridpanelMain',
                    id:'gridpanelMainId',
                    store:storeMain,
                    region:'center',
                    minHeight:200,
                    height:240,
                    autoScroll : true, 
                    title: translations.dataList,
                    /*dockedItems: Sgai.util.Util.pagingToolbar(grid, '10'),*/
                    /*[{
			        xtype: 'pagingtoolbar',
			        store: storeMain,   // GridPanel使用相同的数据源
			        dock: 'bottom',
			        displayInfo: true
    				}],*/
                    
                    rbar:[            	
			            	{
			                	xtype:'button',
			                	text:translations.query,
			                	itemId: 'btnQuery'
			                },
			                '-',
			                {
			                 	xtype:'button',
			                	text:translations.reset,
			                	itemId: 'btnReset'
			                },
			                '-',
			                {
			                	xtype:'button',
			                	text:translations.add,
			                	itemId: 'btnNew'
			                },
			                '-',
			                {
			                 	xtype:'button',
			                	text:translations.submit,
			                	formBind: true,
			                	itemId: 'btnSave'
			                },
			                '-',
			                {
			                 	xtype:'button',
			                	text:translations.del,
			                	formBind: true,
			                	itemId: 'delRec',
			                	id:'commonTypeDelRec'
			                }  
			            ],

                    
                    columns: [
                        {
                            text:translations.sid,
			                dataIndex:'sid',
			                flex: 5,
			                hidden:true
                        },
                        {
                            text:'类型编码',
			                dataIndex:'typeId',
			                flex: 5,
			                editor : {
								xtype : 'textfield',
								emptyText:'请输入编码',
			                    allowBlank:false,
			                    vtype:'alphanum',
			                    maxLength:64,
			                    enforceMaxLength:true,
			                    msgTarget: 'under'
							}
                        },
                        {
                            text:'类型名称',
			                dataIndex:'typeName',
			                flex: 5,
			                editor : {
								xtype : 'textfield',
								emptyText:'请输入名称',
			                    allowBlank:false,
			                    maxLength:64,
			                    enforceMaxLength:true,
			                    msgTarget: 'under'
							}
                        },
                        {
                            text:'类型描述',
			                dataIndex:'typeDesc',
			                flex: 5,
			                editor : {
								xtype : 'textfield',
								emptyText:'请输入名称',
			                    allowBlank:false,
			                    maxLength:64,
			                    enforceMaxLength:true,
			                    msgTarget: 'under'
							}
                        },
                        {
                            itemId:'delRec',
			                xtype:'actioncolumn',
			                flex: 2,
			                text:translations.del,
			                align:'center',
			                icon:'images/icons/fam/delete.gif'
                        },
                        {
                                text:translations.createdBy,
			                    dataIndex:'createdBy',
			                    flex: 5,
			                    hidden:true
                        },
                        {
                            text:translations.createdTimestamp,
		                    dataIndex:'createdTimestamp',
		                    flex: 5,
		                    hidden:true
                        },
                        {
                            text:translations.updatedBy,
		                    dataIndex:'updatedBy',
		                    flex: 5,
		                    hidden:true
                        },
                        {
                            text:translations.updatedTimestamp,
		                    dataIndex:'updatedTimestamp',
		                    flex: 5,
		                    hidden:true
                        },
                        {
                            text:translations.version,
		                    dataIndex:'version',
		                    flex: 5,
		                    hidden:true
                        }                          
                    ],
                    plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {
                            	pluginId:'cellEditing',
                                clicksToEdit: 1,
                                autoCancel:false                            
                            })
                     ],
                     listeners:{ 
					/*//双击
				    itemdblclick : function(grid,row){ 
				           alert("双击") 
				    } */
					//单击 
				    itemclick:function() {
						    var data=Ext.getCmp('gridpanelMainId').getSelectionModel().getSelection()[0]; 
						    var typeSid = data.get('sid');
						    //设置提交参数
						    var store = storeItem;
						    var params = {
						    	action:'read',
						     	start:0,
						     	limit:1000,
						     	'qm.typeSid':typeSid
						    };
						    store.proxy.extraParams=params;
						    store.load({
						    });          
					}
				   } 
                },
                {
                    xtype: 'gridpanel',
                    itemId: 'gridpanelItem',
                    store:storeItem,
                    region:'center',
                    minHeight:230,
                    height:150,
                    autoScroll : true, 
                    selType:'checkboxmodel',//设定选择模式
                   /* title: translations.dataList,*/
                    rbar:[            	
			            	{
			                	xtype:'button',
			                	text:translations.refresh,
			                	itemId: 'btnQueryItem',
			                	frame:true
			                },
			                '-',
			                {
			                	xtype:'button',
			                	text:translations.add,
			                	itemId: 'btnNewItem'
			                },
			                '-',
			                {
			                 	xtype:'button',
			                	text:translations.submit,
			                	formBind: true,
			                	itemId: 'btnSaveItem'
			                }
			            ],
                    
                    columns: [
                        {
                            text:translations.sid,
			                dataIndex:'sid',
			                flex: 5,
			                hidden:true
                        },
                        {
                            text:translations.typeSid,
			                dataIndex:'typeSid',
			                flex: 5,
			                hidden:true
                        },
                        {
                            text:'项目ID',
			                dataIndex:'itemId',
			                flex: 5,
			                editor : {
								xtype : 'textfield',
								emptyText:'请输入编码',
			                    allowBlank:false,
			                   // vtype:'alphanum',
			                    maxLength:64,
			                    enforceMaxLength:true,
			                    msgTarget: 'under'
							}
                        },
                        {
                            text:'项目名称',
			                dataIndex:'itemName',
			                flex: 5,
			                editor : {
								xtype : 'textfield',
								emptyText:'请输入名称',
			                    allowBlank:false,
			                    maxLength:64,
			                    enforceMaxLength:true,
			                    msgTarget: 'under'
							}
                        },
                        {
                            itemId:'delRec',
			                xtype:'actioncolumn',
			                flex: 2,
			                text:translations.del,
			                align:'center',
			                icon:'images/icons/fam/delete.gif'
                        },
                        {
                            text:translations.createdBy,
			                dataIndex:'createdBy',
			                flex: 5,
			                hidden:true
                         },
                        {
                            text:translations.createdTimestamp,
		                    dataIndex:'createdTimestamp',
		                    flex: 5,
		                    hidden:true
                        },
                        {
                            text:translations.updatedBy,
		                    dataIndex:'updatedBy',
		                    flex: 5,
		                    hidden:true
                        },
                        {
                            text:translations.updatedTimestamp,
		                    dataIndex:'updatedTimestamp',
		                    flex: 5,
		                    hidden:true
                        },
                        {
                            text:translations.version,
		                    dataIndex:'version',
		                    flex: 5,
		                    hidden:true
                        } 
                    ],
                     plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {
                            	pluginId:'cellEditing',
                                clicksToEdit: 1,
                                autoCancel:false                            
                            })
                     ]
                }
            ]
            }]
        });
        
		var grid = this.items[0].items[1];
		this.items[0].items[1].dockedItems=[Sgai.util.Util.pagingToolbar(grid, pageSize)];
        this.callParent(arguments);

    }

});