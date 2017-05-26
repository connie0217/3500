
Ext.define('Sgai.cmp.GridHeaderAdjust', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridHeaderAdjust',

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
    	//初始化加载表头
    	me.reOrderGridHeader();
    	//表头右键菜单
    	me.createGridHeaderMenu();
    },
    
    createGridHeaderMenu:function() {
    	var me = this;
    	me.myGrid.on('afterrender',function(grid){			
    		me.myGrid.headerCt.on('headercontextmenu', function(ct, column, e, t, eOpts) {
    			e.preventDefault();  
				e.stopEvent();  
				
				var headermenu = Ext.ComponentQuery.query('menu#headermenu')[0];;
				if (headermenu != null) {
					headermenu.close();
				} 
				
    				headermenu = Ext.create('Ext.menu.Menu', {
    				itemId : 'headermenu',
	                floating:true,
	                closeAction : 'destroy',
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
						    	var gridId = Ext.isEmpty(grid.itemId)?grid.reference:grid.itemId;
						    	Ext.each(columns, function(item) {
						    			var colConfig={};
						    			colConfig.gridId = me.aliasName + '.' + gridId;						    			
						    			colConfig.dataIndex = Ext.isEmpty(item.dataIndex)?item.itemId:item.dataIndex;
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
		                },
		                '-',
		                {  
		                	text:translations.userGridHeaderConfigDelete,
		                	iconCls:'delete',
		                	handler:function() {
		                		var gridId = Ext.isEmpty(grid.itemId)?grid.reference:grid.itemId;
		                		var params={
		                			'qm.gridId':me.aliasName + '.' + gridId
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
    	me.myGrid.on('reconfigure',function(grid){			
    		me.myGrid.headerCt.on('headercontextmenu', function(ct, column, e, t, eOpts) {
    			e.preventDefault();  
				e.stopEvent();  
				var headermenu = Ext.ComponentQuery.query('menu#headermenu0')[0];;
				if (headermenu != null) {
					headermenu.close();
				} 
    				headermenu = Ext.create('Ext.menu.Menu', {
    				itemId : 'headermenu0',
	                floating:true,
	                closeAction : 'destroy',
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
						    	var gridId = Ext.isEmpty(grid.itemId)?grid.reference:grid.itemId;
						    	Ext.each(columns, function(item) {
						    			var colConfig={};
						    			colConfig.gridId = me.aliasName + '.' + gridId;						    			
						    			colConfig.dataIndex = Ext.isEmpty(item.dataIndex)?item.itemId:item.dataIndex;
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
		                },
		                '-',
		                {  
		                	text:translations.userGridHeaderConfigDelete,
		                	iconCls:'delete',
		                	handler:function() {
		                		var gridId = Ext.isEmpty(grid.itemId)?grid.reference:grid.itemId;
		                		var params={
		                			'qm.gridId':me.aliasName + '.' + gridId
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
    
    reOrderGridHeader:function() {
    	var me = this;
    	me.myGrid.on('beforerender', function() {
    		var gridId = Ext.isEmpty(me.myGrid.itemId)?me.myGrid.reference:me.myGrid.itemId;
	    	Ext.Ajax.request({
	    		method:'GET',
			    url: 'system/user-grid-columns/read.action',
			    async: true,
			    params: {		        
			        'qm.gridId':me.aliasName + '.' + gridId 
			    },
			    success: function(response){
			        var text = response.responseText;
			       	me.userDefColumns = Ext.decode(response.responseText).data;
			       	if(me.userDefColumns.length>0) 	me.myGrid.fireEvent('onDefColumnsOk', me);

			       	if(me.userDefColumns.length>0) {
				       	var headerCt = me.myGrid.headerCt;
				    	var headerItems = headerCt.items.items;						
						//调整显示、隐藏
						for (var i=0;i<me.userDefColumns.length;i++) {
							var userItem = me.userDefColumns[i];
							if (!Ext.isEmpty(userItem.dataIndex)) {
							    var header = me.getHeaderItem(headerItems, userItem.dataIndex);	
								if (!Ext.isEmpty(header)) {
								    header.width=userItem.width;
									header.hidden = eval(userItem.hidden);							
									if (userItem.hidden=='false') {
										header['show']();
									} else {
										header['hide']();	
									}
								}
							}
						};									
						//调整显示顺序
						for (var i=0;i<me.userDefColumns.length;i++) {
							var userItem = me.userDefColumns[i];
							if (!Ext.isEmpty(userItem.dataIndex)) {
								var headerItemIndex = me.getHeaderItemIndex(headerItems, userItem.dataIndex);
							    var headerItem = me.getHeaderItem(headerItems, userItem.dataIndex);
						    	if (!Ext.isEmpty(headerItemIndex) && !Ext.isEmpty(headerItem)) {
								    headerCt.move(headerItemIndex, userItem.seq);
							    	headerCt.purgeCache();
							    	Ext.suspendLayouts();
							        headerCt.onHeaderMoved(headerItem, 1, headerItemIndex, userItem.seq);
							        Ext.resumeLayouts(true)
						    	}
							}
						};
					}			   
				}
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
