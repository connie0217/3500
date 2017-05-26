Ext.ns('Sgai.cmp');
Ext.define('Sgai.cmp.PopProject', {
			statics : {
				// 测试用items
				conditions : [{
							xtype : 'hiddenfield',
							name : 'qm.delFlag',
							itemId : 'delFlag',
							value : 0
						}, {
							xtype:'textfield',
							name : 'qm.rqNoLike',
							itemId : 'rqNo',
							labelWidth : 80,
							labelAlign : 'right',
							fieldLabel : '售前项目号',
							width : 200
						}, {
							xtype:'textfield',
							name : 'qm.rqNameLike',
							itemId : 'rqName',
							labelWidth : 70,
							labelAlign : 'right',
							fieldLabel : '项目名称',
							width : 200
						}],
				columns : [{
							xtype : 'rownumberer',
							width : 50,
							text : translations.rowNumber,
							align : 'center'
						}, {
							width : 100,
							dataIndex : 'rqNo',
							text : '售前项目号'
						}, {
						    width: 150,
						    dataIndex: 'rqName',
						    text: '项目名称'
						},{
							width : 100,
							dataIndex : 'rqDesc',
							text : '项目描述'
						}, {
							width : 100,
							dataIndex : 'custDeputyDept',
							text : '参与部门'
						}, {
							width : 100,
							dataIndex : 'saler',
							text : '销售人员'
						}, {
							dataIndex : 'preSalePeriod',
							width : 100,
							text : '售前阶段 ',
							renderer:function(value) {
				            	return getCommonTypeItemName('PERIOD', value);	
				            }
						}, {
							width : 100,
							dataIndex : 'rqState',
							text : '需求状态',
							renderer:function(value) {
				            	return getCommonTypeItemName('RQ_STATE', value);	
				            }
						}, {
							width : 100,
							dataIndex : 'isBid',
							text : '是否投标',
						    renderer:function(value) {
				            	return getCommonTypeItemName('IS_BID', value);	
				            }
						}]
			}
		});