Ext.define('Sgai.view.demo.Inventory0', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.inventory0',
    requires: [
        'Sgai.view.demo.Inventory0List','Sgai.view.demo.Inventory0Controller'
    ],
	controller:'inventory0',
    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'inventory0list'
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
	                            name:'qm.mat_id',
		                        itemId:'matId',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '钢板号',
								width:200
						}, 
												{
	                            name:'qm.mat_type',
		                        itemId:'matType',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '钢种',
								width:200
						}, 
												{
	                            name:'qm.po_id',
		                        itemId:'poId',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '垛位号',
								width:200
						}, 
												{
	                            name:'qm.slot_id',
		                        itemId:'slotID',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '销售订单号',
								width:200
						}, 
												{
	                            name:'qm.so_item_id',
		                        itemId:'soItemId',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '行项目号',
								width:200
						}, 
												{
						       name:'qm.fqc_result',
		                        itemId:'fqcResult',
		                        labelWidth:70,
		                        labelAlign:'right',
		                        fieldLabel: '质检结果',
								width:200
						}, 				
				                    
                        {
                            xtype:'button',
                            text:translations.query,
                            margin:'0 0 0 40',
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
                            iconCls: 'reset',
                            listeners: {
					            click: 'resetButtonClick'
					        }  
	                    }
                    ]
                }
            ]
        }
    

            ]
});
