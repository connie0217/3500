Ext.define('Sgai.view.demo.Inventory0List', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.inventory0list',
			requires : ['Ext.ux.PagingToolbarResizer'],
			frame : true,
			store : Ext.create('Sgai.store.demo.Inventorys0'),
			loadMask : true,
			reference : 'mainGrid',
			selType : 'checkboxmodel',
			columns : [{
						xtype : 'rownumberer',
						width : 50,
						text : translations.rowNumber
					}, {
						width : 150,
						dataIndex : 'matId',
						text : '钢板号',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'slotId',
						text : '销售订单号',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'holdFlag',
						text : 'Hold_Flag',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'scrapFlag',
						text : 'Scrap_Flag',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'matType',
						text : '钢种',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'layer',
						text : 'Layer',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'poId',
						text : '垛位号',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'soucePoId',
						text : 'Souce_po_id',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'soId',
						text : '销售订单号',
						editor : {
							allowBlank : false
						}
					}, {
						width : 150,
						dataIndex : 'soItemId',
						text : '销售订单行项目号',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'matMass',
						text : '理重',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'steelgradeId',
						text : '钢种等级',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'l4Matnr',
						text : '四级物料号',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'fqcResult',
						text : '终检结果',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'storeDt',
						text : '入库日期',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'l4StgPlace',
						text : 'l4_stg_place',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'facilityId',
						text : '设备id',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'createDt',
						text : '创建日期',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'holdReason',
						text : '热处理挽救原因',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'prodReportFlag',
						text : 'prod_report_flag',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'settlementMass',
						text : '实重',
						editor : {
							allowBlank : false
						}
					},{
						width : 150,
						dataIndex : 'xnStg',
						text : 'xnStg',
						editor : {
							allowBlank : false
						}
					}],
			listeners : {
				render : 'userListRender'
			},
		
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : 'inventorys0', // same store GridPanel is using
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					}]
		});
