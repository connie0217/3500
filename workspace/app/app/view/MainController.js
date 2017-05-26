/**
 * 主界面Controller
 * 
 */
Ext.define('Sgai.view.MainController', {
	extend : 'Ext.app.ViewController',

	alias : 'controller.main',
	
	routes : {
		':id' : {
			action : 'handleRoute',// 执行跳转
			before : 'beforeHandleRoute'// 路由跳转前操作
		}
	},

	onMenuItemClick : function(view, record, item, index, event, options){
		if (record) {
			this.redirectTo(record.getId());
		}
	},

	onMenuItemDblClick : function(view, record, item, index, event, options){
		if (record) {
			this.redirectTo('home');
		}
	},

	beforeHandleRoute : function(id, action) {
//		Ext.Msg.alert('路由跳转id为' + id + ' 的组件');
		var me = this, 
        mainmenu = me.lookupReference('mainmenu'),
        store = mainmenu.getStore(),
        menuItem = store.getNodeById(id);

		if (menuItem) {
			action.resume();
		} else if (store.getCount() === 0) {
			// 在store load事件中判断节点，避免store数据未加载情况
			store.on('load', function() {
			    		var rootNode = mainmenu.getRootNode();
						if (rootNode.hasChildNodes()) {
							rootNode.expand();
						}
	            		node = store.getNodeById(id);
						if (node) {
							action.resume();
						} else {
							//Ext.Msg.alert('路由跳转失败1', '找不到id为' + id + ' 的组件');
							action.stop();
						}
					});
			store.load();
		} else {
//			Ext.Msg.alert('路由跳转失败21', store.getCount());
//			Ext.Msg.alert('路由跳转失败2', '找不到id为' + id + ' 的组件');
			action.stop();
		}
	},

    handleRoute: function (id) {
        var me = this,
            mainView = me.getView(),
            mainmenu = me.lookupReference('mainmenu'),
            targetPanel = me.lookupReference('mainpanel'),
            store = mainmenu.getStore(),
            menuItem = store.getNodeById(id),
            className,cmp,ViewClass;

        //响应路由，左侧树定位到相应节点
        var parentNode = menuItem.parentNode;
        mainmenu.getSelectionModel().select(menuItem);
        mainmenu.getView().expand(parentNode);
        mainmenu.getView().focusNode(menuItem);

        if (menuItem.isLeaf()&&menuItem.get('resLevel')==2) {
        	me.addTabPanel(targetPanel,menuItem,'mainpanel');
        }
    },
	addTabPanel : function(targetPanel,menuItem,targetPanelStr) {
		var newTab = targetPanel.items.findBy(function(tab) {
					return tab.title === menuItem.get('resName');
				});

		if (!newTab) {
			var tabObject = {
				xtype : menuItem.get('resUri'),
				closable : true,
				title : menuItem.get('resName'),
				className : menuItem.get('resUri'),
				resParams : menuItem.get('resParams'),
				resId : menuItem.get('id')
			}
			if (menuItem.get('resUri') === 'reportquery') {// 报表查询特殊处理
				tabObject.itemId = menuItem.get('id');
				tabObject.targetPanel = 'mainpanel';
			}
			newTab = targetPanel.add(tabObject);
		}
		targetPanel.setActiveTab(newTab);
		
		// 校验按钮权限
		var newButtons = Ext.ComponentQuery.query(menuItem.get('resUri')
				+ ' button[privilegeCode]');
		for (var i = 0; i < newButtons.length; i++) {
			newButtons[i].setVisible(Ext.Array.contains(Sgai.config.Runtime
							.getBtnPrivileges(), newButtons[i].privilegeCode));
		}
		// 校验actioncolumn的权限,
		var actionColumns = Ext.ComponentQuery.query(menuItem.get('resUri')
				+ ' actioncolumn[privilegeCode]');
		for (var i = 0; i < actionColumns.length; i++) {
			var privilegeCode = actionColumns[i].privilegeCode;
			actionColumns[i].setVisible(Ext.Array.contains(Sgai.config.Runtime
							.getBtnPrivileges(), privilegeCode));
			Ext.Array.each(actionColumns[i].items, function(columnItem) {
						columnItem.disabled = (!Ext.Array.contains(
								Sgai.config.Runtime.getBtnPrivileges(),
								privilegeCode));
					});
		}
	},
	
	onMainRender : function(component, options) {
		var me=this;
		me.judgeUserPrivilege(); //加载用户权限
		me.commonTypeItemsInit();//加载公用类型数据
//		me.findAllUserInfos();//加载系统用户
////		this.systemPropertiesInit();//加载系统配置参数
//		me.getAppServerDate();
		setInterval(this.getAppServerDate,600000);
	},
	onHeaderPanelRender : function(component, options) {
//		this.topMenuStore.load(this.initTopMenus);
	},
	
	onMenuPanelRender : function(component, options) {
	},
	
	onTreepanelSelect : function(selModel, record, index, options, targetPanel,
			targetPanelStr) {
		if (record) {
			this.redirectTo(record.get('resId'));
		}

	},

	onTreepanelItemClick : function(view, record, item, index, event, options) {
		var targetPanel = this.lookupReference('mainpanel');
		this.onTreepanelSelect(view, record, index, options, targetPanel,
				'mainpanel');
	},
	onTreepanelItemRightClick : function(view, record, item, index, event,
			options) {
		event.stopEvent();
		var me = this;
		var contextmenu = new Ext.menu.Menu({
					itemId : 'theContextMenu',
					items : [{
						xtype : "button",
						text : "收藏",
						iconCls : "add",
						handler : function() {
							me.addToFavorite(me, view, record, item, index,
									event, options);
						}
					}, {
						xtype : "button",
						text : "对比",
						iconCls : "edit",
						handler : function() {
							me.addToEastPanel(me, view, record, item, index,
									event, options);
						}
					}]
				});
		contextmenu.showAt(event.getXY());
	},

	addToFavorite : function(me, view, record, item, index, event, options) {
		var resourceCustomWin = Ext.widget('resourcecustomwin', {
					record : record
				});
		resourceCustomWin.show();
	},
	addToEastPanel : function(me, view, record, item, index, event, options) {
		var targetPanel =  me.lookupReference('eastpanel');
        store = me.lookupReference('mainmenu').getStore(),
		menuItem = store.getNodeById(record.get('id'))
		
		me.addTabPanel(targetPanel,menuItem,'eastpanel');
	},
	
    judgeUserPrivilege:function() {
    	Ext.Ajax.request({
    		  method : 'POST',
    		  url : 'system/resources/judgeUserPrivilege.action',
    		  async : false,
    		  success : function(response) {
        		  var text = response.responseText;
        		  var reText = Ext.decode(response.responseText).data;
        		  Sgai.config.Runtime.setBtnPrivileges(reText);
        	  },
        	  failure : function(response, opts) {
        		  var reText = response.responseText;
        		  Ext.MessageBox
        		  .show({
        			  title : translations.errMsgWinTitle,
        			  msg : reText,
        			  maxWidth : 360,
        			  buttons : Ext.Msg.OK,
        			  icon : Ext.MessageBox.ERROR
        		  });
        	  }
    	  });	
    },
    
	commonTypeItemsInit:function() {   	
		Ext.Ajax.request({
			method:'POST',
		    url: 'md/md-common-type/getAllCommonTypeItems.action',
		    async: false,
		    params: {},
		    success: function(response){
		        Sgai.config.Runtime.setCommonTypeItems(Ext.decode(response.responseText));
		    }
		});
	},
	
	findAllUserInfos:function() {// 查找所有的用户的pin和中文名并缓存
		Ext.Ajax.request({
			method : 'POST',
			url : 'system/user/findAllUserInfos.action',
			async : false,
			success : function(response) {
				var text = response.responseText;
				Sgai.config.Runtime.setAllUserInfo(Ext.decode(response.responseText));
			}
		});
	},
	
	getAppServerDate:function() {
		Ext.Ajax.request({
			method : 'POST',
			url : 'system/login/getCurrentDate.action',
			async : false,
			success : function(response) {
				appServerDate = response.responseText;
			}
		});
	},
	
	systemPropertiesInit:function() {
    	Ext.Ajax.request({
    		method:'GET',
		    url: 'system/login/systemPropertiesInit.action',
		    async: false, //注意这里是同步调用，异步调用会导致国际化信息初始化未完毕就进行后续界面渲染，导致错误
		    params: {},
		    success: function(response){
		        var text = response.responseText;
		        var reText = Ext.decode(response.responseText).items;
				var sysProperties = "{"
				for (var i=0;i<reText.length;i++) {
					sysProperties= sysProperties + "'" + reText[i].i18nKey +"':'" + reText[i].i18nValue + "',";
				}
				if(sysProperties.substring(sysProperties.length-1)==",") {
					sysProperties = sysProperties.substring(0,sysProperties.length-1)
				}
				sysProperties = sysProperties + "}";
				sysProperties = "[" + sysProperties + "]";
				systemProperties = eval('('+sysProperties+')')[0];
		    }
		});
    },
	
	onTabRemoved:function() {
		this.redirectTo('home');
	}

});
