Ext.define('Sgai.view.report.mgr.RptParInfo', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.rptParInfo',
			itemId : 'rptParInfo',
			layout : 'fit',
			autoScroll : true,
		    reference:'rptParGrid',
			viewConfig : {
				forceFit : true,
				scrollOffset : 0,
				enableTextSelection : true
			},
			requires : ['Sgai.util.Util', 'Ext.selection.CellModel',
					'Ext.grid.plugin.CellEditing'],
			store : Ext.create('Sgai.store.report.mgr.RptParStore'),
			tbar : [{
						xtype : 'button',
						text : '保存参数',
						itemId : 'btnSave',
						iconCls : 'save',
						listeners: {
							click:'onButtonClickParSave'
					    }
					}],
			columns : [{
						text : 'sid',
						dataIndex : 'sid',
						hidden : true
					}, {
						text : '显示顺序',
						dataIndex : 'dispSeq',
						flex : 2,
						editor : {
							xtype : 'numberfield',
							emptyText : '请输入顺序号',
							maxLength : 3,
							msgTarget : 'under',
							minValue : 0
						}
					}, {
						text : '参数标识',
						dataIndex : 'rptParId',
						flex : 3
					}, {
						text : '参数描述',
						dataIndex : 'rptParDesc',
						flex : 4,
						editor : {
							xtype : 'textfield',
							emptyText : '请输入参数描述',
							maxLength : 64,
							msgTarget : 'under'
						}
					}, {
						text : '参数类型',
						dataIndex : 'rptParType',
						itemId : 'rptParType',
						flex : 3,
						allowBlank : false,
						convertCode : 'RPT_PAR_TYPE',
						editor : Sgai.util.Util
								.createCommonTypeComboBox(
										'RPT_PAR_TYPE',
										'rptParType', null,
										false),
						renderer : function(value) {
							var combo = Ext.ComponentQuery
									.query('combo#rptParType')[0];
							return combo.setValue(value)
									.getRawValue();
						}
					}, {
						text : '参数长度',
						dataIndex : 'rptParLength',
						flex : 3,
						editor : {
							xtype : 'numberfield',
							maxLength : 3,
							minValue : 0
						}
					}, {
						text : '必输标志',
						dataIndex : 'requiredFlag',
						flex : 2,
						editor : {
							xtype : 'combo',
							editable : false,
							valueField : 'value',
							store : new Ext.data.SimpleStore({
										fields : ['value',
												'text'],
										data : [[0, "不必输"],
												[1, "必输"]]
									})
						},
						renderer : function(value) {
							if (value == 0) {
								return '不必输';
							}
							if (value == 1) {
								return '必输';
							}
						}
					}, {
						text : '规则',
						dataIndex : 'ruleExpr',
						flex : 5,
						editor : {
							xtype : 'textfield',
							allowBlank : true,
							maxLength : 2048
						}
					}, {
						text : '隐藏标志',
						dataIndex : 'hiddenFlag',
						flex : 2,
						editor : {
							xtype : 'combo',
							editable : false,
							valueField : 'value',
							store : new Ext.data.SimpleStore({
										fields : ['value',
												'text'],
										data : [[0, "不隐藏"],
												[1, "隐藏"]]
									})
						},
						renderer : function(value) {
							if (value == 0) {
								return '不隐藏';
							}
							if (value == 1) {
								return '隐藏';
							}
						}
					}, {
						text : '缺省值',
						dataIndex : 'defaultVal',
						flex : 3,
						editor : {
							xtype : 'textfield',
							allowBlank : true,
							maxLength : 64
						}
					}, {
						text : '是否为新参数',
						dataIndex : 'saveFlag',
						flex : 2
					}],
			plugins : [Ext.create(
					'Ext.grid.plugin.CellEditing', {
						pluginId : 'cellEditing',
						clicksToEdit : 1,
						autoCancel : false
					})]
		});