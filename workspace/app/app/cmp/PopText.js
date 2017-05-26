Ext.ns('Sgai.cmp');
Ext.define('Sgai.cmp.PopText', {
	extend : 'Ext.form.field.Text',
	alias : 'widget.poptextfield',
	fieldCls:'pop-text',
	conditions:[],
	columns:[],
	store:null,
    title:'数据选择',
    popWinWidth:900,
    popWinHeight:400,
    eventName:'popWinSelected',
    popWinItemId:'matPop',
    addPagingToolbar:true,
    queryCondColumns:4,
    exParams:{},

	requires: [
		'Sgai.util.Util',
		'Sgai.view.Translation'
    ],
    
	initComponent : function() {
		var me = this;
		me.enableBubble(me.eventName);
		me.on('disable',function(text, eOpts) {
			text.fieldCls='x-item-disabled x-form-field';
		});
		me.on('enable',function(text, eOpts) {
			text.fieldCls='pop-text';
		});	
		this.callParent(arguments);
	},
	
	initEvents : function() {
		var me = this;
		me.callParent(arguments);
		me.mon(me.getEl(), 'dblclick', this.onDblClick, this);		
	},

	onDblClick : function(e) {
		console.log('dblclick');
		if (!this.disabled) {
			this.popWindow();
		}
	},
	
	popWindow:function() {
		var me = this;
		if (Ext.isEmpty(me.popWinItemId)) {
			me.popWinItemId = Sgai.util.Util.getUuid();
		}

		me.popWin = Ext.create('Ext.window.Window', {
		    itemId:me.popWinItemId,
		    title: me.title,
		    height: me.popWinHeight,
		    width: me.popWinWidth,
		    border:0,
		    bodyPadding : 2,
		    layout: 'fit',
		    resizable:true,
		    draggable:true,
		    constrainHeader:true,
		    plain:true,
		    modal:true,
			owner:me,
		    
			listeners:{  
            	'beforeclose' : me.onWindowClose
            },
	                
		    dockedItems: [        		
            	{                
	 				xtype:'panel',
	            	collapsible: true,
	            	layout:'fit',
	            	dock:'top',
	            	header:false,
            		items:[{
                        xtype: 'form',
                        bodyStyle:"padding:1px 1px 1x 1x",
						border:0,
						collapsible:true,
						frame : true,
						itemId: 'formPanel',
                        title: translations.queryCond,
                        iconCls:'look',
                        defaults : {
							xtype : 'textfield',
							labelAlign : 'right'
						},
	            		layout: {
	 				       type: 'table',
	 				       columns: me.queryCondColumns
	      		       	},
                        items : me.conditions
                    }
                ]
            }],
            
		    items: [                   
                {
                    xtype: 'gridpanel',
                    title: translations.dataList,
                    iconCls:'data',
                    region:'center',
		            autoScroll : true,           
		            itemId: 'gridPanel',
		            store:me.store,
		            border:1,
		            columnLines:true,
					selModel: Ext.create('Ext.selection.CheckboxModel', {
						mode:'SINGLE',
						checkOnly: false,
						showHeaderCheckbox: false
					}),
					
					viewConfig:{
						forceFit: true,
					 	scrollOffset: 0,
						enableTextSelection:true
					},
					
					listeners:{  
	                	'itemdblclick' : me.gridRowDblClick
	                },
	                
		            tbar:[            	
		            	{
		                	xtype:'button',
		                	text:translations.query,
		                	itemId: 'btnQuery',
		                	formBind: true,
		                	iconCls: 'find',
		                	handler:function(button, e) {
		                		var selector = "#" +me.popWin.itemId + ' form';
		                		var formPanel = Ext.ComponentQuery.query(selector)[0];
		                		if (!formPanel.getForm().isValid()) {
							        Sgai.util.Util.showErrorMsg(translations.formArgError);									   
							        return;
						        }
						        var params = Sgai.util.Util.getFormParams(formPanel, me.exParams);
						        var store = me.store;
						        store.proxy.extraParams=params;					        
						        store.loadPage(1);        					        
		                	}
		                },
		                {
		                 	xtype:'button',
		                	text:translations.reset,
		                	itemId: 'btnReset',
		                	iconCls: 'reset',
		                	handler:function(button, e) {
		                		var selector = "#" +me.popWin.itemId + ' form';
		                		var formPanel = Ext.ComponentQuery.query(selector)[0];
		                		formPanel.getForm().reset();
		                	}
		                }
		            ],
		            
                    columns:me.columns,					            
					plugins: [Ext.create('Sgai.cmp.GridHeaderAdjust',  {aliasName:me.popWinItemId})]
                }
            ]
		});
		
		if (me.addPagingToolbar) {						        	
			var selector = "#" +me.popWin.itemId + ' grid';
			var gridPanel = Ext.ComponentQuery.query(selector)[0];
			//gridPanel.addDocked(Sgai.util.Util.pagingToolbar(me.store));
			gridPanel.addDocked({
				xtype : 'pagingtoolbar',
				store : me.store,
				dock : 'bottom',
				displayInfo : true,
				plugins : [{
					ptype : 'pagingtoolbarresizer'
				   }
				]
	       })
		}
		
		me.popWin.show();
	},
	onWindowClose:function(win, eOpts) {
		var selector = "#" +win.itemId + ' grid';
		var gridPanel = Ext.ComponentQuery.query(selector)[0];
		gridPanel.getStore().removeAll();
	},
	gridRowDblClick:function(grid, record, item, index, e, eOpts) {
		var me = this.ownerCt.owner;
		me.fireEvent(me.eventName, record);
		me.store.removeAll();
		me.popWin.close();
	}

});
