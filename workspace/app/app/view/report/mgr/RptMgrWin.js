Ext.define('Sgai.view.report.mgr.RptMgrWin', {
			extend : 'Ext.window.Window',
			alias : 'widget.rptmgrwin',
			requires : ['Sgai.view.report.mgr.RptMgrWinController'],
			controller : 'rptmgrwin',
			width : 600,
			height : 400,
			dataOption : null,
			modal : true,
			layout : 'fit',
			bodyStyle : "background-color: transparent;",
			labelAlign : "left",
			autoScroll : true,
			defaultType : "textfield",
			bodyStyle : 'background:#ffc',
			items : [{
				xtype : 'form',
				bodyStyle : "padding:2px 2px 2x 2x",
				border : 0,
				frame : true,
				itemId : 'rptMgrWinForm',
				reference : 'rptMgrWinForm',
				layout : {
					type : 'table',
					columns : 2
				},
				defaultType : 'textfield',
				items : [{
							itemId : 'rptId',
							name : 'qm.rptId',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '报表编码',
							allowBlank : false,
							width : 260
						}, {
							itemId : 'rptName',
							name : 'qm.rptName',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '报表名称',
							allowBlank : false,
							width : 260
						},{
							xtype : 'remotecombo',
							itemId : 'rptCat',
							name : 'qm.rptCat',
							tableName : 'V_SU_REPORT_MENUS',
							fieldLabel : '菜单分类',
							labelWidth : 100,
							labelAlign : 'right',
							allowBlank : false,
							displayName : 'RES_NAME',
							valueName : 'SID',
							filterName : 'RES_LEVEL',
							filterValue : '1',
							editable : false,
							width : 260
						},{
							xtype : 'combo',
							itemId : 'groupFlag',
							name : 'qm.groupFlag',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '报表组',
							width : 260,
							valueField : 'value',
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ['value',
												'text'],
										data : [['0', "否"],
												['1', "是"]]
									})
						},{
							xtype : 'combo',
							itemId : 'fillingFlag',
							name : 'qm.fillingFlag',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '是否填报',
							width : 260,
							valueField : 'value',
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ['value',
												'text'],
										data : [['0', "否"],
												['1', "是"]]
									})
						},{
							xtype : 'combo',
							itemId : 'excelImportFlag',
							name : 'qm.excelImportFlag',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '是否导入Excel',
							width : 260,
							colspan : 2,
							valueField : 'value',
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ['value',
												'text'],
										data : [['0', "否"],
												['1', "是"]]
									})
						},{
							itemId : 'sid',
							name : 'qm.sid',
							hidden : true
						}, {
							itemId : 'resSid',
							name : 'qm.resSid',
							hidden : true
						},{
							xtype : 'combo',
							itemId : 'pagingFlag',
							name : 'qm.pagingFlag',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '分页标志',
							width : 260,
							valueField : 'value',
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ['value',
												'text'],
										data : [['0', "不分页"],
												['1', "分页"]]
									})
						}, {
							xtype : 'combo',
							itemId : 'pageComputeFlag',
							name : 'qm.pageComputeFlag',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '分页计算标志',
							width : 260,
							valueField : 'value',
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ['value',
												'text'],
										data : [['0', "不分页"],
												['1', "分页"]]
									})
						}, {
							xtype : 'textarea',
							itemId : 'validateExpr',
							name : 'qm.validateExpr',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '参数校验表达式',
							width : 520,
							colspan : 2
						}, {
							itemId : 'numPerExcel',
							name : 'qm.numPerExcel',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : 'EXCEL每页最大数',
							width : 260
						}, {
							itemId : 'totalCountDs',
							name : 'qm.totalCountDs',
							labelWidth : 100,
							labelAlign : 'right',
							fieldLabel : '总记录数数据源',
							width : 260
						}, {
							xtype : 'textarea',
							itemId : 'totalCountSql',
							name : 'qm.totalCountSql',
							labelAlign : 'right',
							labelWidth : 100,
							fieldLabel : '总记录数SQL',
							width : 520,
							height : 120,
							colspan : 2
						}],
				bbar : [{
							xtype : 'fileuploadfield',
							itemId : 'rptUploadFile',
							reference : 'rptUploadFile',
							fileUpload : true,
							labelWidth : 95,
							labelAlign : 'right',
							fieldLabel : '报表路径',
							name : 'rptUploadFile',
							width : 500,
							readOnly : true,
							buttonText : '浏览',
							regex : /^(.*\.raq)$/,
							invalidText : '不是raq文件'
						}]
			}],
			buttons : [{
						text : translations.save,
						itemId : 'save',
						margin : '0 0 0 10',
						formBind : true,
						listeners :{
							click:'winSaveButtonClick'
						}
					}, {
						text : translations.cancel,
						itemId : 'cancel',
						margin : '0 0 0 10',
						listeners :{
							click:'winCancelButtonClick'
						}
					}]

		});
