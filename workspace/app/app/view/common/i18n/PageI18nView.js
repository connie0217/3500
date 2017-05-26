Ext.define('Sgai.view.common.i18n.PageI18nView', {
	extend : 'Ext.Container',
	alias : 'widget.pageI18nView',
	store :'common.i18n.PageI18nStore',
	layout:'fit', 
    itemId: 'pageI18nPanel',
    
    requires: [
        'Sgai.util.Util',
        'Sgai.view.Translation',
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.grid.plugin.CellEditing'
    ],

	initComponent : function() {
		var me = this;
		var pageSize = 15;
		var store = Ext.getStore('Sgai.store.common.i18n.PageI18nStore');
        
		Ext.applyIf(me, {
            items: [        		
            {                
                items: [
                    {
                        xtype: 'form',
                        bodyStyle:"padding:2px 2px 2x 2x",
						border:0,
						collapsible:true,
						frame : true,
						itemId: 'formPanel',
                        title: translations.queryCond,
                        layout : 'hbox',
                		defaultType : 'textfield',  
                        items: [
                            {
                                name:'qm.i18nKey',
		                        itemId:'qm.i18nKey',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel:translations.i18nKey,
								width:200
                            },
                            {
                                name:'qm.i18nValue',
		                        itemId:'qm.i18nValue',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel:translations.i18nValue,
								width:200
                            },
                            {
								xtype:'combo',
								name:'qm.language',
		                        itemId:'qm.language',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel:translations.language,
								width:200,		
			                    valueField:'value',
			                    editable:false,
			                    emptyText : '请选择',
			                    store:new Ext.data.SimpleStore({
			                    fields:['value','text']	,
			                    data:[
			                          ['zh_CN','简体中文'],
				                      ['zh_TW','繁体中文'],
				                      ['en','英语'],
				                      ['vn','越语']
			                          ]
			                    })
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        title: translations.dataList,
                        region:'center',
			            minHeight:200,
			            height:400,
			            autoScroll : true,           
			            itemId: 'gridPanel',
			            store:store,
			            border:0,
			            //selType : 'checkboxmodel',
			            
			            rbar:[            	
			            	{
			                	xtype:'button',
			                	text:translations.query,
			                	itemId: 'btnQuery'
			                },
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
			                {
			                 	xtype:'button',
			                	text:translations.submit,
			                	formBind: true,
			                	itemId: 'btnSave'
			                }
			            ],

			            viewConfig:{
							forceFit: true,
						 	scrollOffset: 0,
							enableTextSelection:true
						},
			
                        columns: [
                        	{
                                text:translations.sid,
			                    dataIndex:'sid',
			                    flex: 5,
			                    hidden:true
                            },
                            {
                                text:translations.i18nKey,
			                    dataIndex:'i18nKey',
			                    flex: 5,
			                    editor : {
									xtype : 'textfield',
									emptyText:'请输入参数名',
			                    	allowBlank:false,
			                    	vtype:'alphanum',
			                    	maxLength:64,
			                    	enforceMaxLength:true,
			                    	msgTarget: 'under'
								}

                            },
                            {
                                text:translations.i18nValue,
			                    dataIndex:'i18nValue',
			                    flex: 5,
			                    editor : {
									xtype : 'textfield',
									emptyText:'请输入参数值',
			                    	allowBlank:false,
			                    	maxLength:64,
			                    	enforceMaxLength:true,
			                    	msgTarget: 'under'
								}
                            },
                            {
                                text:translations.language,
			                    dataIndex:'language',
			                    flex: 5,
			                    editor: new Ext.form.field.ComboBox({
				                    editable:false,
				                    itemId:'comboLanguage',
				                    emptyText : '请选择',
				                    valueField: 'value',
        							displayField: 'text',
				                    store:new Ext.data.SimpleStore({
					                    fields:['value','text']	,
					                    data:[
					                          ['zh_CN','简体中文'],
						                      ['zh_TW','繁体中文'],
						                      ['en','英语'],
						                      ['vn','越语']
					                          ]
				                    })
				                }),
				                renderer:function(value) {
				                	var comboLanguage = Ext.ComponentQuery.query('combo#comboLanguage')[0];
				                	return comboLanguage.setValue(value).getRawValue();
				                }
                            },
                            {
                                text:translations.delFlag,
			                    dataIndex:'delFlag',
			                    flex: 5,
			                    editor: new Ext.form.field.ComboBox({
				                    editable:false,
				                    itemId:'comboDelFlag',
				                    emptyText : '请选择',
				                    valueField: 'value',
        							displayField: 'text',
				                    store:new Ext.data.SimpleStore({
					                    fields:['value','text']	,
					                    data:[
					                          [1,'启用'],
				                        	  [0,'禁用']
					                          ]
				                    })
				                }),
				                renderer:function(value) {
				                	var comboDelFlag = Ext.ComponentQuery.query('combo#comboDelFlag')[0];
				                	return comboDelFlag.setValue(value).getRawValue();
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
		this.items[0].dockedItems=[Sgai.util.Util.pagingToolbar(grid, pageSize)];
		this.callParent(arguments);
	}
	
	
});
