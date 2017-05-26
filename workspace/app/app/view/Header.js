Ext.define('Sgai.view.Header', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.appheader',

	height : 35,
	ui : 'footer',

	requires : ['Sgai.view.Translation','Sgai.view.msg.MsgDisplayWin'],
	style : {
		'border-bottom' : '2px solid #4c72a4;',
		'background-size' : 'contain'
	},
	
	initComponent : function() {
		var me = this;
		
		var items = [{
					xtype : 'label',
					style : {
						background : 'transparent',
						'font-size' : '18pt',
						'font-family' : 'DFBK-W5-FPG',
						'font-weight' : 'bold',
						color : 'black'
					},
					text : translations.systemTitle
				},  {
					xtype : 'tbfill'
				}, {
					xtype : 'label',
					itemId : 'loginUserTip',
					text : '你好,'
							+ ' '
							+ getSystemUserName(Sgai.config.Runtime
									.getUserName()) + ', ' + '今天是' + ' '
							+ Sgai.util.Util.getCurrentDataAndWeekDay() + ' 班次:'
							+ getSystemUserGroup(Sgai.config.Runtime.getCrewId())+'，班别:'
							+ getSystemUserShift(Sgai.config.Runtime.getShiftId()),
					style : {
						background : 'transparent',
						'font-size' : '10pt',
						'font-family' : 'DFBK-W5-FPG',
						'font-weight' : 'bold',
						color : 'black'
					}
				},{
					xtype : 'tbseparator'
				},
		        {
		            xtype: 'msgdisplaywin'
		        },
		        {
		            xtype: 'button',
		            text: '信息',
		            itemId: 'message',
		            iconCls: 'sgai-message'          
		        },{
					xtype : 'tbseparator'
				},
		        {
		            xtype: 'combo',
		            width: 145,
		    		labelWidth: 30,
		    		fieldLabel: '主题',
		    		displayField: 'name',
		    		valueField: 'value',
		    		emptyText: '请选择',
		    		queryMode: 'local',
		    		store: Ext.create('Ext.data.Store', {
		    			fields: ['value', 'name'],
		    			data : [
		    				{ value: 'neptune', name: 'Neptune主题' },
		    				{ value: 'crisp', name: 'Crisp主题' },
		    				{ value: 'classic', name: 'Classic主题' },
		    				{ value: 'gray', name: 'Gray主题' }
		    			]
		    		}),
		    		listeners: {
		    			select: function(combo) {
		    				var  theme = combo.getValue();
		    				var	href = 'ext/packages/ext-theme-'+theme+'/build/resources/ext-theme-'+theme+'-all.css';
		    				var	link = Ext.fly('theme');
		    			 
		    				if(!link) {
		    					link = Ext.getHead().appendChild({
		    						 tag:'link',
		    						 id:'theme',
		    						 rel:'stylesheet',
		    						 href:''
		    					});
		    				};
		    				link.set({href:Ext.String.format(href, theme)});
		    			}
		    		}
		        }, {
					xtype : 'button',
					text : '个人中心',
					iconCls : 'usercenter',
					menu : [ {
								text : '收藏夹',
								itemId : 'favorite',
								iconCls : 'favorite',
								handler : function(button, e) {
									var mainPanel = Ext.ComponentQuery.query('mainpanel')[0]
									var newTab = mainPanel.items.findBy(function(tab) {
												return tab.title === '收藏夹';
											});
			
									if (!newTab) {
										var tabObject = {
											xtype : 'resourcecustom',
											closable : true,
											title : '收藏夹'
										}
										newTab = mainPanel.add(tabObject);
									}
			
									mainPanel.setActiveTab(newTab);
								}
							}, {
								text : '修改密码',
								itemId : 'changePassword',
								iconCls : 'data',
								handler : function(button, e) {
									Ext.create('Ext.window.Window', {
										title : '修改密码',
										itemId : 'changePasswordWin',
										height : 170,
										width : 330,
										border : 0,
										bodyPadding : 2,
										layout : 'fit',
										resizable : false,
										constrainHeader : true,
										plain : true,
										modal : true,
			
										items : [{
													xtype : 'form',
													frame : false,
													itemId : 'changePasswordForm',
													bodyPadding : 5,
													defaults : {
														xtype : 'textfield',
														anchor : '100%',
														labelWidth : 100,
														allowBlank : false,
														minLength : 3,
														msgTarget : 'side',
														labelAlign : 'right',
														width : 150
													},
													items : [{
																inputType : 'password',
																name : 'qm.oldPassword',
																itemId : 'oldPassword',
																fieldLabel : '旧密码',
																vtype : 'alphanum',
																emptyText : '旧密码'
															}, {
																inputType : 'password',
																name : 'qm.newPassword',
																itemId : 'newPassword',
																fieldLabel : '新密码',
																vtype : 'alphanum',
																emptyText : '新密码'
															}, {
																inputType : 'password',
																name : 'qm.newPasswordConfirm',
																itemId : 'newPasswordConfirm',
																fieldLabel : '密码确认',
																vtype : 'alphanum',
																emptyText : '密码确认'
															}]
												}],
										dockedItems : [{
											xtype : 'toolbar',
											dock : 'bottom',
											ui : 'footer',
											items : [{
														xtype : 'component',
														flex : 1
													}, {
														xtype : 'button',
														text : translations.save,
														iconCls : 'save',
														handler : function(button, e) {
															console.log('save');
															var changePasswordForm = Ext.ComponentQuery
																	.query('#changePasswordWin form')[0];
															var win = Ext.ComponentQuery
																	.query('#changePasswordWin')[0];
															if (!changePasswordForm
																	.getForm().isValid()) {
																Ext.MessageBox.show({
																	title : translations.operateMsgWinTitle,
																	msg : '输入数据有错误，请检查！',
																	buttons : Ext.Msg.OK,
																	icon : Ext.MessageBox.INFO
																});
																return;
															}
															// 设置提交参数
															var params = Sgai.util.Util
																	.getFormParams(changePasswordForm);
															if (params['qm.oldPassword'] == params['qm.newPassword']) {
																Sgai.util.Util
																		.showTipMsg('新密码与旧密码不能相同！');
																return;
															} else {
																if (params['qm.newPassword'] != params['qm.newPasswordConfirm']) {
																	Sgai.util.Util
																			.showTipMsg('两次输入的新密码不一致!');
																	return;
																}
																var url = 'system/user/changePassword.action';
																Ext.Msg
																		.confirm(
																				translations.operateMsgWinTitle,
																				translations.operateConfirm,
																				function(
																						btn) {
																					if (btn == 'no') {
																						return;
																					} else {
																						Sgai.util.Util
																								.postAjaxRequestByParams(
																										url,
																										params,
																										true);
																						button.ownerCt.ownerCt
																								.close();
																					}
																				});
															}
														}
													}, {
														xtype : 'button',
														text : '关闭',
														iconCls : 'logout',
														handler : function(button, e) {
															button.ownerCt.ownerCt.close();
														}
													}, {
														xtype : 'component',
														flex : 1
													}]
										}]
									}).show();
								}
							}, {
								text : translations.logout,
								itemId : 'logout',
								iconCls : 'logout',
								handler:function(){									
						          Ext.Ajax.request({
						              url: 'system/login/logout.action',
						              success: function(conn, response, options, eOpts){						
						                  var result = Sgai.util.Util.decodeJSON(conn.responseText);
						
						                  if (result.success) {
						                      dForm = Ext.ComponentQuery.query('#appMain')[0].destroy();                 
								  			  
						                      if(window.parent){
						                      	 window.parent.location.reload();
						                      }else{
						                      	 window.location.reload();
						                      }						                      
						                      
						                  } else {						
						                      Sgai.util.Util.showErrorMsg(conn.responseText);
						                  }
						              },
						              failure: function(conn, response, options, eOpts) {
						                  
						                  Sgai.util.Util.showErrorMsg(conn.responseText);
						              }
						          });
								}
							}]}];
		this.items = items;
		this.callParent(arguments);
	}
});