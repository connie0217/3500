Ext.define('Sgai.view.report.query.ReportQueryController', {
	extend : 'Ext.app.ViewController',
    alias: 'controller.reportquery',
	init : function() {
//		console.log('111');
//		 this.mainFormRender();
//		this.control({
//					'reportquery form' : {
//						afterrender : this.mainFormRender
//					},
//					'reportquery button#query' : {
//						click : this.queryReport
//					}
//
//				});

	},
	mainFormRender : function() {
//		var mainframe = this.getMainframe();
//		var queryFormPanel = this.getQueryform();
		this.lookupReference('reportId').setValue(this.getView().resId);
		this.lookupReference('targetPanel').setValue(this.getView().targetPanel);
		this.queryReportDef();
		this.addComponent();
	},
	queryReportDef : function() {
		var me = this;
		var params = me.getRptIdParams();
		Ext.Ajax.request({
					waitMsg : '正在操作',
					waitTitle : '提示',
					url : 'report/report-query/getReportDef.action',
					method : 'POST',// 请求方式
					params : params,
					success : function(conn, response, options, eOpts) {
						me.reportDef = Sgai.util.Util
								.decodeJSON(conn.responseText);
					},
					failure : function(conn, response, options, eOpts) {
						Sgai.util.Util.showErrorMsg(conn.responseText);

					}
				});
	},
	getRptIdParams : function() {
		var queryFormPanel = this.lookupReference('queryForm');
		var params = {
			reportId : this.lookupReference('reportId')
					.getValue()
		};
		return params;
	},
	getQueryParams : function() {
		var queryFormPanel = this.lookupReference('queryForm');
		var params = {
			evalDate : Ext.Date.format(queryFormPanel
							.down('textfield[name=productDate]').getValue(),
					Sgai.util.Util.commDateFormat),
			positionId : queryFormPanel.down('textfield[name=positionId]')
					.getValue(),
			tempId : queryFormPanel.down('textfield[name=tempId]').getValue(),
			orgId : queryFormPanel.down('combo[name=orgId]').getValue(),
			staffId : queryFormPanel.down('textfield[name=staffId]').getValue()
		};

		return params;
	},

	queryReport : function() {
		var me = this;
		var queryFrame = this.lookupReference('queryFrame');		
		var params = Sgai.util.Util.getReportFormParams(this.lookupReference('queryForm'));
		var paramStr = "";
		globleInputParams = params;
		var  validateExp= this.reportDef.validateExpr;
		if (Sgai.util.Util.validateFormByExp(validateExp)) {
			for (var key in params) {
				if (params.hasOwnProperty(key)) {
					paramStr += key + "=" + params[key] + "&";
				}
			}
			queryFrame.update("报表查询中,请稍候...");
			queryFrame.setSrc('report/report-query/printReport.action?'
					+ encodeURI(paramStr));
			me.getView().el.mask('报表查询中,请稍候...');
		}
	},

	addComponent : function() {
		var me = this;
		var params = me.getRptIdParams();
		Ext.Ajax.request({
					waitMsg : '正在操作',
					waitTitle : '提示',
					url : 'report/report-query/getInputParams.action',
					method : 'POST',// 请求方式
					params : params,
					success : function(conn, response, options, eOpts) {
						// 对后台输出的Json进行解码
						me.createQueryComponent(me, conn.responseText);
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

	createQueryComponent : function(me, jsonStr) {
		var reportParameters = Ext.JSON.decode(jsonStr);
		var formComponents = [];
		var parIndex = 0;
		Ext.Array.each(reportParameters.items, function(reportParameter) {
					// 枚举类型
					if (reportParameter.rptParType === 'ENUM'
							|| reportParameter.rptParType === 'ENUM_CHECK') {
						var selectedMap = [];
						for (var key in reportParameter.referMap) {
							if (reportParameter.referMap.hasOwnProperty(key)) {
								selectedMap.push([key,
										reportParameter.referMap[key]]);
							}
						}
						var compXtype = reportParameter.rptParType === 'ENUM'
								? 'combobox'
								: 'checkcombo';
						var comboStore = Ext.create('Ext.data.SimpleStore', {
									data : selectedMap,
									fields : ['value', 'text']
								});
						formComponents.push({
									xtype : compXtype,
									fieldLabel : reportParameter.rptParDesc,
			                        labelAlign:'right',
									name : reportParameter.rptParId,
									store : comboStore,
									queryMode : 'local',
									trigger1Cls:'x-form-clear-trigger',
									displayField : 'text',
									valueField : 'value',
									editable : false,
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag)
								});

					} else if (reportParameter.rptParType === 'DATE') {
						var dateFormat=reportParameter.ruleExpr?reportParameter.ruleExpr:Sgai.util.Util.commDateFormat;
						formComponents.push({
									xtype : 'datefield',
									fieldLabel : reportParameter.rptParDesc,
			                        labelAlign:'right',
									name : reportParameter.rptParId,
									format : dateFormat,
									submitFormat : dateFormat,
									editable : false,
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:eval(reportParameter.defaultVal)
								});
					} else if (reportParameter.rptParType === 'DATETIME') {
						var dateFormat=reportParameter.ruleExpr?reportParameter.ruleExpr:Sgai.util.Util.commDateFormat;
						formComponents.push({
									xtype : 'datefield',
									fieldLabel : reportParameter.rptParDesc,
			                        labelAlign:'right',
									name : reportParameter.rptParId,
									format : dateFormat+' H:i:s',
									submitFormat : dateFormat+' H:i:s',
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:eval(reportParameter.defaultVal)
								});
					} else if (reportParameter.rptParType === 'YEARMON') {
						formComponents.push({
									xtype : 'monthfield',
									fieldLabel : reportParameter.rptParDesc,
			                        labelAlign:'right',
									name : reportParameter.rptParId,
									format : 'Y-m',
									submitFormat : 'Y-m',
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:eval(reportParameter.defaultVal)
								});
					} else if (reportParameter.rptParType === 'NUM') {
						formComponents.push({
									xtype : 'numberfield',
									fieldLabel : reportParameter.rptParDesc,
			                        labelAlign:'right',
									name : reportParameter.rptParId,
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:reportParameter.defaultVal
								});
					} else if (reportParameter.rptParType === 'CUSTOM') {
						formComponents.push(Ext.JSON
								.decode(reportParameter.ruleExpr));
					} else {
						formComponents.push({
									xtype : 'textfield',
									fieldLabel : reportParameter.rptParDesc,
			                        labelAlign:'right',
									name : reportParameter.rptParId,
									allowBlank : !Boolean(reportParameter.requiredFlag),
									hidden:Boolean(reportParameter.hiddenFlag),
									value:reportParameter.defaultVal
								});
					}
					parIndex++;
				});
//		formComponents.push(
//			        {
//			            xtype: 'tbseparator'
//			        },
//				   {
//					xtype : 'button',
//					text : '查询',
//					itemId : 'query',
//					iconCls : 'find',
//					formBind : true
//				});
		var formPanel = this.lookupReference('queryForm');
		formPanel.add(formComponents);
		formPanel.updateLayout();
	},
	// 逻辑验证函数
	validateFormByExp : function() {
//		var mainframe = this.getMainframe();
		var validateExp = this.reportDef.validateExpr;
		if (validateExp && validateExp != "") {
			var validateExpArr = validateExp.split(";");
			for (var i = 0; i < validateExpArr.length; i++) {
				var subValidateExpArr = validateExpArr[i].split("^");
				var rtn = eval(subValidateExpArr[0]);
				if (!rtn) {
					Ext.Msg.alert(subValidateExpArr[1]);
					return rtn;
				}
			}
		}
		return true;
	}
});
