Ext.define('Sgai.view.common.operateLog.OperateLog', {
	extend : 'Ext.Container',
	alias : 'widget.operateLog',
	store :'common.operateLog.OperateLog',
	layout:'fit', 
    itemId: 'operateLogPanel',
    
    requires: [
        'Sgai.util.Util',
        'Sgai.view.Translation'
    ],
    
	items:[
		 {

		 }
    ],

	initComponent : function() {

		var pageSize = 15;
		var store = Ext.getStore('Sgai.store.common.operateLog.OperateLog');

		var queryPanel = Ext.create('Ext.form.Panel', {
			title: translations.queryCond,
			labelAlign : 'right',
			buttonAlign : 'center',
			border:0,
			collapsible:true,
			frame : true,
			itemId: 'formPanel',

		    items: [
            {
                layout : 'hbox',
                defaultType : 'textfield',
                border:0,
                bodyStyle: {
					background: '#dfe9f6',
				    padding: 'padding:2px 2px 2x 2x'
				},
                items : [
                    {
                        name:'qm.requestId',
                        itemId:'qm.requestId',
                        labelWidth:70,
                        labelAlign:'right',
                        fieldLabel:translations.requestId,
						width:350,
						allowBlank:true
                    },   
					{
                        xtype:'datefield',
                        name:'qm.startTimestamp',
                        itemId:'qm.startTimestamp',
                        labelAlign: 'right',
                        labelWidth:80,
                        width:230,
                        allowBlank:false,
                        fieldLabel:translations.startTimestamp,
                        maxValue:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,1),"Y-m-d H:i:s"),
                        format: 'Y-m-d H:i:s',
                        value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,-1),"Y-m-d H:i:s")
                    },
                    {
                        xtype:'datefield',
                        name:'qm.endTimestamp',
                        itemId:'qm.endTimestamp',
                        labelAlign: 'right',
                        labelWidth:80,
                        width:230,
                        allowBlank:false,
                        fieldLabel:translations.endTimestamp,
                        maxValue: Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,1),"Y-m-d H:i:s"),
                        format: 'Y-m-d H:i:s',
                        value:Ext.util.Format.date(Ext.Date.add(new Date()),"Y-m-d H:i:s")
                    }                         
                 ]
             }       
           ] 

		});
		
		var grid = Ext.create('Ext.grid.Panel',
        {
            title: translations.dataList,
            region:'center',
            minHeight:200,
            height:400,
            autoScroll : true,           
            itemId: 'gridPanel',
            store:store,
            border:0,
            
            rbar:[            	
            	{
                	xtype:'button',
                	text:translations.query,
                	formBind: true,
                	itemId: 'btnQuery'
                },
                {
                 	xtype:'button',
                	text:translations.reset,
                	itemId: 'btnReset'
                }	   
            ],
            
            viewConfig:{
				forceFit: true,
			 	scrollOffset: 0,
				enableTextSelection:true
			},
			
            columns:
            [
            	{
                	text:translations.requestId,
                	sortable:true,
                    dataIndex:'requestId',
                    flex: 5                   
                },
                {
                	text:translations.classId,
                    dataIndex:'classId',
                    labelAlign:'center',
                    flex: 3                   
                },
                {
                	text:translations.methodId,
                    dataIndex:'methodId',
                    flex: 3
                    
                },
                {
                    text:translations.eventDesc,
                    dataIndex:'eventDesc',
                    flex: 4
                    
                },
                {
                	text: translations.startTimestamp, 
                	dataIndex: 'startTimestamp',
                	flex: 3 
                }, 
                {	text:translations.endTimestamp,
                	dataIndex:'endTimestamp',
					flex: 3
				},
				{	text:translations.runMilli,
                	dataIndex:'runMilli',
					flex: 2
				},
				{	text:translations.createdBy,
                	dataIndex:'createdBy',
					flex: 2
				},
				{	text:translations.parameters,
                	dataIndex:'parameters',
					hidden:true
					
				},
				{
					itemId:'paramShow',   //itemId:'actionDelete',
                    xtype:'actioncolumn',
                    flex: 2,
                    text:translations.paramShow,
                    align:'center',
                    icon:'images/icons/fam/book.png',
                    handler:function (grid, rowIndex, colIndex) {                  	
                    	var record = grid.getStore().getAt(rowIndex);
						var data = record.get('parameters');
						Ext.create('Ext.window.Window', {
						    title: translations.browseTitle,
						    height: 200,
						    width: 400,
						    layout: 'fit',
						    resizable:false,
						    items: {
						        xtype: 'textareafield',
						        value:data,
						        enableKeyEvents:false
						    }
						}).show();
                    }
				}
            ]
        });

		this.items[0].items = [queryPanel,grid];
		this.items[0].dockedItems=[Sgai.util.Util.pagingToolbar(grid, pageSize)];
		this.callParent(arguments);
	}
});
