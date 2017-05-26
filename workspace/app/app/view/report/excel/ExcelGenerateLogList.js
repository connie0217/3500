Ext.define('Sgai.view.report.excel.ExcelGenerateLogList', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.excelgenerateloglist',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext
					.create('Sgai.store.report.excel.ExcelGenerateLogDetails'),
			loadMask : true,
			reference : 'mainGrid',
			selType : 'checkboxmodel',
			columns : [{
						xtype : 'rownumberer',
						width : 50,
						text : translations.rowNumber
					}, {
						width : 180,
						dataIndex : 'rptId',
						text : '报表ID',
						hidden : true
					}, {
						width : 150,
						dataIndex : 'rptName',
						text : '报表'
					}, {
						width : 140,
						xtype : 'datecolumn',
						format : Sgai.util.Util.commTimeFormat,
						submitFormat : Sgai.util.Util.commTimeFormat,
						dataIndex : 'startTimestamp',
						text : '开始时间'
					}, {
						width : 140,
						xtype : 'datecolumn',
						format : Sgai.util.Util.commTimeFormat,
						submitFormat : Sgai.util.Util.commTimeFormat,
						dataIndex : 'endTimestamp',
						text : '结束时间'
					}, {
						text : '进度',
						xtype : 'widgetcolumn',
						flex : 1,
						dataIndex : 'progress',
						widget : {
							xtype : 'progressbarwidget',
							textTpl : ['已完成{percent:number("0")}%']
						}
					}, {
						width : 150,
						dataIndex : 'params',
						text : '参数',
						hidden : true
					}, {
						width : 150,
						xtype : 'numbercolumn',
						dataIndex : 'generateResult',
						text : '生成结果',
						renderer : function(value) {
							if (value == 0) {
								return '失败';
							} else if (value == 1) {
								return '成功';
							} else if (value == 2) {
								return '生成中';
							} else if (value == 3) {
								return '超出单个报表任务限制';
							} else if (value == 4) {
								return '超出总任务限制';
							}
							return '';
						}
					}, {
						width : 60,
						xtype : 'numbercolumn',
						dataIndex : 'currentPage',
						text : '当前页',
						format : '0,000'
					}, {
						width : 70,
						xtype : 'numbercolumn',
						dataIndex : 'totalPage',
						text : '总页数',
						format : '0,000'
					}, {
						width : 150,
						dataIndex : 'zipFile',
						text : '生成的Excel压缩包',
						hidden : true
					}, {
						width : 70,
						xtype : 'numbercolumn',
						dataIndex : 'totalNum',
						text : '总记录数',
						format : '0,000'
					}, {
						text : '操作',
						width : 70,
						xtype : 'widgetcolumn',
						dataIndex : 'downLoadText',
						widget : {
							xtype : 'button',
							align : 'center',
							handler : 'downLoadButtonClick'
						}
					}],
			listeners : {
				render : 'excelGenerateLogListRender'
			},
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : 'report.excelexcelgeneratelogdetails',
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					}]
		});
