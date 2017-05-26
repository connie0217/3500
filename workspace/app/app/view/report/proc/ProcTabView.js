Ext.define('Sgai.view.report.proc.ProcTabView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.procTabView',
			layout : 'fit',
			itemId : 'procTabView',
			header : false,

			requires : ['Sgai.util.Util', 'Sgai.view.Translation',
					'Ext.selection.CellModel', 'Ext.grid.plugin.CellEditing',
					'Ext.ux.PagingToolbarResizer', 'Sgai.view.report.proc.ProcPar',
					'Sgai.view.report.proc.ProcLogInfo'],

			initComponent : function() {
				var me = this;
				Ext.apply(me, {
							items : [{// 总体tab
								xtype : 'tabpanel',
								layout : {
									type : 'fit',
									align : 'stretch',
									pack : 'start'
								},
								activeTab : 0, // 默认激活第1个tab页
								renderTo : Ext.getBody(),
								items : [{
											title : '参数信息',
											layout : 'fit',
											dock : 'top',
											header : false,
											items : [{
														xtype : 'procPar'
													}]
										}, {
											title : '运行日志',
											layout : 'fit',
											items : [{
														xtype : 'procLogInfo'
													}]
										}]
							}]
						})
				this.callParent(arguments);
			}
		});
