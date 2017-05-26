﻿Ext.define('Sgai.view.su.user.User', {

	extend : 'Ext.panel.Panel',
	alias : "widget.user",
	store : 'su.user.User',
	itemId : 'userMainPanel',
	id:'userMainPanel',
	layout:'border', 
	initComponent : function() {
		var pageSize = 10;
		 /* 数据权限树向上遍历父结点 */
		var parentnode = function(node) {
			if (node.parentNode != null) {
				node.parentNode.set('checked', true);
				parentnode(node.parentNode);
			}
		};
		/* 数据权限树遍历子结点 选中 与取消选中操作 */
		var chd = function(node, check) {
			node.set('checked', check);
			if (node.isNode) {
				node.eachChild(function(child) {
							chd(child, check);
						});
			}
		};
        var store = Ext.create('Sgai.store.su.user.User');
		var securityRoleStore = Ext.create('Sgai.store.su.securityRole.SecurityRole');
	    securityRoleStore.load({});
		var toSecurityRoleValue=new Array();//集合， 用于 存储分配securityRole空间有半部分显示
		// 在grid前加复选框
		var selModel = Ext.create('Ext.selection.CheckboxModel', {					
		    		singleSelect: true ,
					listeners : //事件监听
					{
						//复选框选中或者取消选中
						selectionchange : function(sm, selections) {
						    if (selections && selections.length > 0) {
								//selectedRecordSid = selections[0].get('sid');
								var data=Ext.getCmp('userGridPanel').getSelectionModel().selected.last();
								var selectedRecordSid =data.get('sid');
								if(selectedRecordSid==null){
									selectedRecordSid = -999999999;
								}
								var params = {
				                    action:'read',
				                    start:0
					             }; 
						    	params['userSid'] = selectedRecordSid;
						    	securityRoleStore.on('beforeload', function(store) {
											Ext.apply(store.proxy.extraParams, params);
										});
							  var mask = new Ext.LoadMask(Ext.getBody().component, {                          
                              msg : '数据正在加载，请稍后... ',                           
                              removeMask : true });
                              mask.show();
										
                              securityRoleStore.reload({
									params : params,
						        	callback: function(records, operation, success) {
                                   // sm.setLocked(false);
							 	      mask.hide();
                                    }
								});
							}
						    securityRoleStore.on('beforeload', function(securityRoleStore, options) {
						          Ext.apply(securityRoleStore.proxy.extraParams, params);
				          	    });
						}
					}
				});
        //用户数据主显示grid
		var grid = Ext.create('Ext.grid.Panel', {
			region : 'center', //此属性必须指定
			anchor : '100% 90%',
		
			//iconCls:'data',
            //title: translations.dataList,
			selModel : selModel, //每条记录前的复选框注意调用的方式  selModel是grid.panel自带属性
			autoScroll : true,
            id:'userGridPanel',
			itemId : 'userGridPanel',
			store : store,
		    tbar:[          
            {
         	 xtype:'button',
         	 text:translations.query,
             iconCls:'find',
         	 itemId: 'btnQuery'
            },
            {
          	 xtype:'button',
         	 text:translations.reset,
             iconCls:'reset',
         	 itemId: 'btnReset'
            },
            '-',
            {
         	 xtype:'button',
         	 text:translations.add,
         	 privilegeCode:'SU010201',
             iconCls:'add',
         	 itemId: 'btnNew'
            },
            {
          	 xtype:'button',
         	 text:translations.save,
         	 privilegeCode:'SU010202',
         	 formBind: true,
             iconCls:'save',
         	 itemId: 'btnSave'
            },
            {
          	 xtype:'button',
         	 text:translations.del,
         	 privilegeCode:'SU010203',
         	 formBind: true,
         	 itemId: 'delRec',
             iconCls:'delete',
         	 id:'userDelRec'
            },  '-',
            {
             xtype:'button',
         	 text:'重置密码',
         	 privilegeCode:'SU010204',
         	 formBind: true,
         	 itemId: 'resetPassword',
             iconCls:'reset',
         	 id:'resetPassword'
            }
         ],
        viewConfig:{
          forceFit: true,
          scrollOffset: 0,
          enableTextSelection:true
         },
			columns : [
	                {
	    				xtype : 'gridcolumn',
	    				dataIndex : 'pin',
	    				itemId:'pin',
	    				text : translations.pin,
	    				allowBlank:false,
	    				editor:{
	    					 xtype:'textfield',
	    					 allowBlank:false
	    				}
	    			 },
	    			 {
		    				xtype : 'gridcolumn',
		    				dataIndex : 'password',
		    				itemId:'password',
		    				text : translations.password,
		    				allowBlank:false,
		    				renderer:function(value){
		    					if(value=="" || value==null){
		    						return "";
		    					}
		    					return '******';
		    				},
		    				editor:{
	    				      xtype:'textfield',
	    				      vtype : 'alphanum',
	    				      allowBlank:false
	    				    }
		    		 },
	    			 {
		    				xtype : 'gridcolumn',
		    				dataIndex : 'userNameCn',
		    				itemId:'userNameCn',
		    				text : translations.userNameCn,
		    				allowBlank:false,
		    				editor : {
		    					xtype : 'textfield',
		    					emptyText : translations.pleaseInput + translations.userNameCn,
		    					msgTarget : 'under'
		    				}
		    			},
		    			{
			    				dataIndex : 'shortName',
			    				itemId:'shortName',
			    				text : '简称',
			    				editor : {
			    					xtype : 'textfield',
			    					emptyText : translations.pleaseInput + translations.userNameCn,
			    					msgTarget : 'under'
			    				}
			    		},
		    			{
		    				xtype : 'gridcolumn',
		    				dataIndex : 'userNameEn',
		    				itemId:'userNameEn',
		    				text : translations.userNameEn,
		    				editor : {
		    					xtype : 'textfield',
		    					emptyText : translations.pleaseInput + translations.userNameEn,
		    					msgTarget : 'under'
		    				}
		    			},
		    			{
    			            	text:translations.sex,
    			            	dataIndex:'sex',
    			            	itemId:'sex',
    			            	allowBlank:false,
    			                editor: Sgai.util.Util.createCommonTypeComboBox('MD_USER_SEX','sexEditor', null, false),
								renderer : function(value) {
									return getCommonTypeItemName('MD_USER_SEX', value);
								}
    			        },
		    			{
		    				xtype : 'gridcolumn',
		    				dataIndex : 'extTel',
		    				itemId:'extTel',
		    				text : translations.extTel,
		    				editor : {
		    					xtype : 'textfield',
		    					emptyText : translations.pleaseInput + translations.extTel,
		    					msgTarget : 'under'
		    				}
		    			 },	
		    			 {
		    				xtype : 'gridcolumn',
		    				dataIndex : 'phone1',
		    				itemId:'phone1',
		    				text : translations.phone1,
		    				editor : {
		    					xtype : 'textfield',
		    					emptyText : translations.pleaseInput + translations.phone1,
		    					msgTarget : 'under'
		    				}
		    			},
		    			{
		    				xtype : 'gridcolumn',
		    				dataIndex :'phone2',
		    				itemId:'phone2',
		    				text : translations.phone2,
		    				editor : {
		    					xtype : 'textfield',
		    					emptyText : translations.pleaseInput + translations.phone2,
		    					msgTarget : 'under'
		    				}
		    			},
		       	     	{
 			            	text:translations.crewId,//班别
 			            	dataIndex:'groupId',
 			            	itemId:'groupId',
			                editor: Sgai.util.Util.createCommonTypeComboBox('MD_USER_GROUP','groupEditor', null, false),
							renderer : function(value) {
								return getCommonTypeItemName('MD_USER_GROUP', value);
							}
 			            },
 			            {
			            	text:translations.shiftId,//班次
			            	dataIndex:'shiftId',
			            	itemId:'shiftId',
			                editor: Sgai.util.Util.createCommonTypeComboBox('MD_USER_SHIFT','shiftEditor', null, false),
							renderer : function(value) {
								return getCommonTypeItemName('MD_USER_SHIFT', value);
							}
			            },
		       	     	{
 			            	xtype:'datecolumn',
 			            	text:translations.pwdModifyDate,
 			            	dataIndex:'pwdModifyDate',
 			            	itemId:'pwdModifyDate',
 			            	format:'Y-m-d',
 			            	hidden:true
 			            },{
		    				xtype : 'gridcolumn',
		    				dataIndex :'sid',
		    				itemId:'sid',
		    				hidden : true
		    				}
					],
					
//            dockedItems:[Sgai.util.Util.pagingToolbar('Sgai.store.su.user.User')],
            plugins: [
                      {
							ptype: 'cellediting',
							pluginId:'userCellEditing',
							clicksToEdit: 1
                      },
                      {
							ptype: 'gridHeaderAdjust',
							aliasName:'userGridHeaderAdjust'
			          },
                      {
	  		                ptype: 'rowexpander',
	  		                rowBodyTpl : new Ext.XTemplate(
	  		                	'<p><b>'+'所在用户组'+':'+'{userGroupNames}',
	  		                	'<p><b>'+'拥有角色'+':'+'{roleNames}'
	  		                    )
  		              }
            ],
			dockedItems : [{
			    	xtype : 'pagingtoolbar',
			    	store : store, // same store GridPanel is using
			    	dock : 'bottom',
			    	displayInfo : true,
			    	plugins : [ {
			    		ptype : 'pagingtoolbarresizer'
			    	} ]
			    } ]
                    
		});
		
		var securityRoleTreePanel = Ext.create('Ext.tree.Panel', {
			//layout : 'fit',
		    region: 'east',
		    autoScroll : true, 
			labelAlign : 'right',
			xtype : 'treepanel',
			//animate : true,
			flex:0.5,
			split:true,
			itemId : 'roleTreePanel',
			border : 0,
			//loadMask : true,
			checked : false,
			rootVisible : false,
			store : securityRoleStore,

			viewConfig : {
				//forceFit : true,
				scrollOffset : 0,
				enableTextSelection : true
			},

			columns : [{
						xtype : 'treecolumn',
						dataIndex : 'text',
						text : translations.sercurityRoleList,
						flex : 7
					}, {
						xtype : 'gridcolumn',
						dataIndex : 'sid',
						text : translations.sid,
						hidden : true
					}

			],
			listeners : {
				checkchange : function(node, checked, eOpts) {
					if (checked) {
						node.eachChild(function(child) {
							chd(child, true);
						});
					} else {
						node.eachChild(function(child) {
							chd(child, false);
						});
					}
					parentnode(node); // 进行父级选中操作
				}
			}
		});
		
		this.items = [
                   grid,
                   securityRoleTreePanel 
         ], 
         this.dockedItems =[
			{
		                  xtype: 'form',
		                  bodyStyle:"padding:2px 2px 2x 2x",
						  border:0,
						  collapsible:true,
						  frame : true,
	                	  anchor : '100% 10%',
						  itemId: 'userQueryPanel',
		                  title: translations.queryCond,
		                  layout : 'hbox',
		          		  defaultType : 'textfield',  
		                  items: [
		                      {
		                          name:'qm.pin',
			                      itemId:'pin',
			                      labelWidth:70,
			                      labelAlign:'right',
			                      fieldLabel:translations.pin,
							      width:200
		                      },
		                      {
		                          name:'qm.userNameCn',
			                      itemId:'userNameCn',
			                      labelWidth:70,
			                      labelAlign:'right',
			                      fieldLabel:translations.userNameCn,
							      width:200
		                      }
		                  ]
	             
			}
		 ];
		this.callParent(arguments);
	  }
    });
