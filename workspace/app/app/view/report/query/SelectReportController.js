Ext.define('Sgai.view.report.query.SelectReportController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.selectreport',
	requires : ['Sgai.cmp.SelectGridColumnAdjustWin'],
	
	getMaingrid : function() {
		return this.lookupReference('mainGrid');
	},
	selectDemoListRender : function(component) {
		// component.getStore().load();
	},
	
	queryButtonClick : function(button) {
		var params = Sgai.util.Util.getReportFormParams(this.lookupReference('queryForm'));
		globleInputParams = params;
		var  validateExp= this.selectGridDef.validateExpr;
		if (Sgai.util.Util.validateFormByExp(validateExp)) {
			Sgai.util.Util.postPageForm(this.lookupReference('queryForm'), this
							.getMaingrid());
		}
	},
	resetButtonClick : function(button) {
		this.lookupReference('queryForm').getForm().reset();
	},
	afterRender : function(button) {
		var me = this;		
		this.lookupReference('gridId').setValue(this.getView().resId);
		this.querySelectGridDef();
		
	},
	querySelectGridDef : function() {
		var me = this;
		var params = me.getGridIdParams();
		Ext.Ajax.request({
					waitMsg : '正在操作',
					waitTitle : '提示',
					url : 'report/select-report-query/getGrid.action',
					method : 'POST',// 请求方式
					params : params,
					success : function(conn, response, options, eOpts) {
						var responseObj=Sgai.util.Util
								.decodeJSON(conn.responseText);
						var selectGridDef=responseObj.data;
						me.selectGridDef = selectGridDef;
						me.getMaingrid().gridId = selectGridDef.gridId;
						me.lookupReference('selectId').setValue(selectGridDef.selectId);
						me.reconfigureGrid(me);
					},
					failure : function(conn, response, options, eOpts) {
						Sgai.util.Util.showErrorMsg(conn.responseText);

					}
				});
	},
	getGridIdParams : function() {
		var queryFormPanel = this.lookupReference('queryForm');
		var params = {
			gridId : this.lookupReference('gridId')
					.getValue()
		};
		return params;
	},
	reconfigureGrid : function(me) {
		var params = me.getGridIdParams();
		Ext.Ajax.request({
					waitMsg : '正在操作',
					waitTitle : '提示',
					url : 'report/select-report-query/getSelectGridStr.action',
					method : 'POST',// 请求方式
					params : params,
					success : function(conn, response, options, eOpts) {						
						// 对后台输出的Json进行解码
						var responseObj = Ext.JSON.decode(conn.responseText);
						var selectGrid = responseObj.data;
						me.createQueryComponent(me, selectGrid.queryParams);

						me.initGrid(me, selectGrid);						
						if(me.getView().paramObj){
							Ext.defer(function(){
								me.lookupReference('queryForm').getForm().setValues(me.getView().paramObj);
								me.getView().paramObj='';
							},2000);
						}
					},
					failure : function(conn, response, options, eOpts) {
						Sgai.util.Util.showErrorMsg(conn.responseText);

					}
				});
	},
	createQueryComponent : function(me, reportParameters) {
		var formComponents = [];
		var parIndex = 0;
		Ext.Array.each(reportParameters, function(reportParameter) {
					// 枚举类型
					if (reportParameter.paramType === 'ENUM'
							|| reportParameter.paramType === 'ENUM_CHECK') {
						formComponents.push({
											name : reportParameter.paramId,
											xtype : 'commontypecombobox',
											fieldLabel : reportParameter.paramDesc,
											labelAlign : 'right',
											typeId : reportParameter.ruleExpr,
											editable : false,
											multiSelect : reportParameter.paramType === 'ENUM_CHECK',
											allowBlank : !Boolean(reportParameter.requiredFlag),
											hidden:Boolean(reportParameter.hiddenFlag)
										});

					} else if (reportParameter.paramType === 'DATE') {
						var dateFormat=reportParameter.ruleExpr?reportParameter.ruleExpr:Sgai.util.Util.commDateFormat;
						formComponents.push({
									xtype : 'datefield',
									fieldLabel : reportParameter.paramDesc,
			                        labelAlign:'right',
									name : reportParameter.paramId,
									format : dateFormat,
									submitFormat : dateFormat,
									editable : true,
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:eval(reportParameter.defaultVal)
								});
					} else if (reportParameter.paramType === 'DATETIME') {
						var dateFormat=reportParameter.ruleExpr?reportParameter.ruleExpr:Sgai.util.Util.commDateFormat;
						formComponents.push({
									xtype : 'datefield',
									fieldLabel : reportParameter.paramDesc,
			                        labelAlign:'right',
									name : reportParameter.paramId,
									format : dateFormat+' H:i:s',
									submitFormat : dateFormat+' H:i:s',
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:eval(reportParameter.defaultVal)
								});
					} else if (reportParameter.paramType === 'YEARMON') {
						formComponents.push({
									xtype : 'monthfield',
									fieldLabel : reportParameter.paramDesc,
			                        labelAlign:'right',
									name : reportParameter.paramId,
									format : 'Y-m',
									submitFormat : 'Y-m',
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:eval(reportParameter.defaultVal)
								});
					} else if (reportParameter.paramType === 'NUM') {
						formComponents.push({
									xtype : 'numberfield',
									fieldLabel : reportParameter.paramDesc,
			                        labelAlign:'right',
									name : reportParameter.paramId,
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:reportParameter.defaultVal
								});
					} else if (reportParameter.paramType === 'CUSTOM') {
						formComponents.push(Ext.JSON
								.decode(reportParameter.ruleExpr));
					} else {
						formComponents.push({
									xtype : 'textfield',
									fieldLabel : reportParameter.paramDesc,
			                        labelAlign:'right',
									name : reportParameter.paramId,
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:reportParameter.defaultVal
								});
					}
					parIndex++;
				});
		var formPanel = this.lookupReference('queryForm');
		formPanel.add(formComponents);
		formPanel.updateLayout();
	},
	
	initGrid : function(me, selectGrid) {
		var json2 = Ext.JSON
				.decode('{fieldNames:[{"name":"name"},{"name":"pin"},{"name":"password"},{"name":"phone1"}],'
						+ 'columnModels:[{xtype:"rownumberer",width:50},{dataIndex:"name","text":"姓名",width:120},{dataIndex:"pin","text":"ID",width:80},{dataIndex:"password","text":"密码",width:120},{dataIndex:"phone1","text":"电话",width:120}]}');
		if(me.selectGridDef.pageFlag===1){
			var store = Ext.create('Ext.data.JsonStore', {
						proxy : {
							type : 'ajax',
							url : 'report/select-report-query/findByPage.action',
							reader : {
								type : 'json',
								rootProperty : 'items',
								totalProperty : 'totalProperty',
								successProperty : 'success',
								messageProperty : 'message'
							}
						},
						fields : selectGrid.fieldNames,
						pageSize: me.selectGridDef.limitPerPage?me.selectGridDef.limitPerPage:40
					});			
			me.lookupReference('pagingtoolbar').bindStore(store); 
			me.lookupReference('pagingtoolbar').setHidden(false); 
		}else{			
			var store = Ext.create('Ext.data.JsonStore', {
						proxy : {
							type : 'ajax',
							url : 'report/select-report-query/find.action',
							reader : {
								type : 'json',
								rootProperty : 'data.items',
								totalProperty : 'data.totalProperty',
								successProperty : 'success',
								messageProperty : 'message'
							}
						},
						fields : selectGrid.fieldNames
					});			
			me.lookupReference('pagingtoolbar').setHidden(true); 
		}
		store.getProxy().setTimeout(900000);
		me.getMaingrid().reconfigure(store, selectGrid.columnModels);
	},
	onButtonClickExport : function(button, e, options) {
		var me=this;
		me.exportExcel(me,false);
	},
	onButtonClickExport2007 : function(button, e, options) {
		var me=this;
		me.exportExcel(me,true);
	},
	exportExcel:function(me,is2007){
		var formPanel = me.lookupReference('queryForm');		
		var params = Sgai.util.Util.getReportFormParams(formPanel);
		var gridPanel = me.getMaingrid();
		// 必须提供的参数 excelName：导出文件的名称 excelTitle：导出表格的标题
		params['excelName'] = me.selectGridDef.gridId;
		params['excelTitle'] = me.selectGridDef.gridDesc;
		params['excel2007'] = is2007;
		
		var url = 'report/select-report-query/exportExcel.action';
		// exportExcel 函数 url： 导出调用的action链接 gridPanel: 数据表格 params：参数列表
		Sgai.util.Util.exportExcel(url, gridPanel, params);
	},
	onButtonClickColumn: function(button, e, options) {
		var columnAdjustWin = Ext.widget('selectgridcolumnadjustwin',{grid:this.getMaingrid()});
		columnAdjustWin.show();
	}

});
