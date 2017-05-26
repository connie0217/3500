Ext.define('Sgai.view.report.proc.ProcPar', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.procPar',
			itemId : 'procPar',
			layout : 'fit',
			autoScroll : true,
			viewConfig : {
				forceFit : true,
				scrollOffset : 0,
				enableTextSelection : true
			},
			requires : ['Sgai.util.Util', 'Ext.selection.CellModel',
					'Ext.grid.plugin.CellEditing'],
			initComponent : function() {
				var me = this;
				var parStore = Ext.create('Sgai.store.report.proc.ProcParStore');
				me.store = parStore;
				Ext.apply(me, {
							tbar : [{
										xtype : 'button',
										text : '执行',
										itemId : 'btnSave',
										iconCls : 'play'
									}],
							columns : [{
										text : '参数顺序',
										dataIndex : 'position',
										flex : 2
									}, {
										text : '参数名称',
										dataIndex : 'argumentName',
										flex : 3
									}, {
										text : '参数数据类型',
										dataIndex : 'dataType',
										flex : 3
									}, {
										text : '输入输出类型',
										dataIndex : 'inOut',
										flex : 3
									}, {
										text : '参数值',
										dataIndex : 'parVal',
										flex : 3,
										editor : {
											xtype : 'textfield',
											allowBlank : true
										}
									}],
							plugins : [Ext.create(
									'Ext.grid.plugin.CellEditing', {
										pluginId : 'cellEditing',
										clicksToEdit : 1,
										autoCancel : false
									})]
						})
				this.callParent(arguments);
			}
		});