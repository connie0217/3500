
Ext.define('Sgai.cmp.SelectGridHeaderAdjust', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.selectGridHeaderAdjust',
	requires : ['Sgai.cmp.SelectGridColumnAdjustWin'],

    myGrid: 'undifined',
    userDefColumns:'undifined',
	aliasName:null,
	
    constructor: function(config) {
		if (!Ext.isEmpty(config.aliasName)) {
			this.aliasName=config.aliasName;
		}
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    init : function(grid) {
    	var me = this;
    	if (!Ext.isEmpty(grid.title)) {
    		grid.title = grid.title + '(*)';
    	}
    	me.myGrid = grid;
    	if (Ext.isEmpty(me.aliasName)) {
    		me.aliasName = grid.isContained.xtype;
    	}
    	//表头右键菜单
    	me.createGridHeaderMenu();
    },
    
    createGridHeaderMenu:function() {
    	var me = this;
    	me.myGrid.on('afterrender',function(grid){			
    		me.myGrid.headerCt.on('headercontextmenu', function(ct, column, e, t, eOpts) {
    			e.preventDefault();  
				e.stopEvent();  
    			var headermenu = new Ext.menu.Menu({  
	                floating:true,
	                title:translations.userGridHeaderConfig,
	                titleAlign:'center',
	                items:[
		                {  
		                	text:translations.userGridHeaderConfigSave,
		                	iconCls:'save',
		                	handler:function() {
		                		var headerCt = grid.headerCt;
						    	var columns = headerCt.items.items;
						    	var arrayObj = new Array();
						    	var i=0;
						    	var gridId = Ext.isEmpty(grid.gridId)?grid.reference:grid.gridId;
						    	Ext.each(columns, function(item) {
						    			var colConfig={};
						    			colConfig.gridId = gridId;						    			
						    			colConfig.dataIndex = Ext.isEmpty(item.dataIndex)?item.gridId:item.dataIndex;
						    			colConfig.width = Ext.isEmpty(item.width)?100:item.width;
						    			colConfig.hidden = item.hidden;
						    			colConfig.seq = i;
						    			arrayObj.push(colConfig);
						    			i++;
						    		}
						    	);
						    	var configJson = Ext.encode(arrayObj);
						    	var url = 'system/user-grid-columns/insertGridColumn.action';
						    	Ext.Msg.confirm (
					            translations.operateMsgWinTitle,
					            translations.operateConfirm,
					            function (btn)
					            {
					                if (btn == 'no') {
					                	return;
					                } else {					                	    
						    			Sgai.util.Util.postAjaxRequestByJsonData(url, configJson, false, function(){}, function(){});
					                }
					            });
		                	}
		                },'-',
		                {  
		                	text:translations.userGridHeaderConfig,
		                	iconCls:'app_edit',
		                	handler:function() {
		                		var columnCustomWin = Ext.widget('selectgridcolumnadjustwin',{grid:grid});
		                		columnCustomWin.show();
		                	}
		                },
		                '-',
		                {  
		                	text:translations.userGridHeaderConfigDelete,
		                	iconCls:'delete',
		                	handler:function() {
		                		var gridId = Ext.isEmpty(grid.gridId)?grid.reference:grid.gridId;
		                		var params={
		                			'qm.gridId':gridId
		                		};
		                		var url = 'system/user-grid-columns/deleteGridColumn.action';
						    	Ext.Msg.confirm (
					            translations.operateMsgWinTitle,
					            translations.operateConfirm,
					            function (btn)
					            {
					                if (btn == 'no') {
					                	return;
					                } else {					                	    
						    			Sgai.util.Util.postAjaxRequestByParams(url, params, false);
					                }
					            });
		                	}
		                }
		            ]
    			}); 
    			 headermenu.showAt(e.getXY());
    		});
    	});
    },
    
    getHeaderItemIndex:function(headerItems, dataIndex) {
    	for (var i=0;i<headerItems.length;i++) {
    		var item = headerItems[i];
    		if (item.dataIndex==dataIndex || item.itemId==dataIndex) {
    			return i;
    		}
    	}
    },
    
    getHeaderItem:function(headerItems, dataIndex) {
    	for (var i=0;i<headerItems.length;i++) {
    		var item = headerItems[i];
    		if (item.dataIndex==dataIndex || item.itemId==dataIndex) {
    			return item;
    		}
    	}
    }
});
