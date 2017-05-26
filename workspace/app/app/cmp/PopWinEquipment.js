Ext.ns('Sgai.cmp');
Ext.define('Sgai.cmp.PopWinEquipment', {
			statics : {
				conditions : [{
							name : 'qm.equiptIdLike',
							itemId : 'equiptId',
							labelWidth : 70,
							fieldLabel : '设备编码',
							width : 200
						}, {
							name : 'qm.equiptNameLike',
							itemId : 'equiptName',
							labelWidth : 70,
							fieldLabel : '设备名称',
							width : 200
						}],
				columns : [{
							xtype : 'rownumberer',
							width : 50,
							text : translations.rowNumber
						}, {
							width : 150,
							dataIndex : 'equiptId',
							text : '设备编码'
						}, {
							width : 150,
							dataIndex : 'equiptName',
							text : '设备名称'
						}, {
							width : 150,
							dataIndex : 'unit',
							text : '单位'
						}]
			}
		});