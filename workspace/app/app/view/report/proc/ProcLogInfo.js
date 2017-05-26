Ext.define('Sgai.view.report.proc.ProcLogInfo', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.procLogInfo',
			itemId : 'procLogInfo',
			layout : 'fit',
			autoScroll : true,
			viewConfig : {
				forceFit : true,
				scrollOffset : 0,
				enableTextSelection : true
			},
			requires : ['Sgai.util.Util', 'Ext.selection.CellModel'],
			initComponent : function() {
				var me = this;
				var logStore = Ext.create('Sgai.store.report.proc.ProcLogStore');
				me.store = logStore;
				Ext.apply(me, {
							columns : [{
										text : 'sid',
										dataIndex : 'sid',
										hidden : true
									}, {
										text : '运行脚本',
										dataIndex : 'doExp',
										flex : 3
									}, {
										text : '运行参数',
										dataIndex : 'params',
										flex : 3
									}, {
										text : '操作人',
										dataIndex : 'requestBy',
										flex : 2
									}, {
										xtype : 'datecolumn',
										dataIndex : 'runTime',
										text : '操作时间',
										format : 'Y-m-d H:i:s',
										dateformat : 'Y-m-d H:i:s',
										flex : 3
									}, {
										text : '运行结果',
										dataIndex : 'runState',
										flex : 2
									}, {
										text : '异常日志',
										dataIndex : 'exception',
										flex : 5
									}]
						})
				this.callParent(arguments);
			}
		});