Ext.define('Sgai.view.report.log.AccessLogDetailList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.accesslogdetaillist',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext.create('Sgai.store.report.log.AccessLogDetails'),
			loadMask : true,
			reference : 'mainGrid',
			selType : 'checkboxmodel',
		    selModel:{
		        mode:'SINGLE'
		    },
			viewConfig : {
				getRowClass : function(record, rowIndex, rowParams, store) {
					var result = record.data.accessResult;
					if (result == 0) {
						return "row-bg-red";
					} else {
						return "";
					}
				}
			},
			columns : [{
						xtype : 'rownumberer',
						width : 50,
						text : translations.rowNumber
					}, {
						width : 90,
						dataIndex : 'requestBy',
						text : '用户ID',
						sortable : true
					}, {
						width : 70,
						dataIndex : 'requestByName',
						text : '用户名',
						sortable : true
					}, {
						width : 70,
						dataIndex : 'requestIp',
						text : 'IP',
						sortable : true
					}, {
						width : 150,
						dataIndex : 'rptId',
						text : '报表ID',
						hidden:true
					}, {
						width : 200,
						dataIndex : 'rptName',
						text : '报表名称'
					}, {
						width : 150,
						xtype : 'datecolumn',
						format : Sgai.util.Util.commTimeFormat,
						submitFormat : Sgai.util.Util.commTimeFormat,
						dataIndex : 'startTimestamp',
						text : '开始时间'
					}, {
						width : 150,
						xtype : 'datecolumn',
						format : Sgai.util.Util.commTimeFormat,
						submitFormat : Sgai.util.Util.commTimeFormat,
						dataIndex : 'endTimestamp',
						text : '结束时间'
					}, {
						width : 50,
						dataIndex : 'duration',
						text : '耗时(秒)',
						align:'right',
						sortable : false
					}, {
						width : 60,
						dataIndex : 'accessResultMsg',
						text : '访问结果',
						sortable : false
					}, {
						flex : 1,
						dataIndex : 'params',
						text : '查询参数',
						sortable : false
					}],
			listeners : {
				render : 'accessLogDetailListRender',
				celldblclick:'accessLogCellDbClick',
				selectionchange : 'selectionChange'
			},
			dockedItems : [{
						xtype : 'toolbar',
						flex : 1,
						dock : 'top',
						items : [{
									xtype : 'button',
									text : '导出',
									itemId : 'exportExcel',
									iconCls : 'excel',
									listeners : {
										click : 'onButtonClickExport'
									}
								},{
									xtype : 'button',
									text : '重新查询',
									itemId : 'testButton',
									iconCls : 'app_link',
									reference : 'testButton',
									disabled : true,
									listeners : {
										click : 'testButtonClick'
									}
								}]
					}, {
						xtype : 'pagingtoolbar',
						store : 'report.logaccesslogdetails', // same store GridPanel is using
						dock : 'bottom',
						displayInfo : true,
						plugins : [ {
							ptype : 'pagingtoolbarresizer'
						} ]
					}]
		});
