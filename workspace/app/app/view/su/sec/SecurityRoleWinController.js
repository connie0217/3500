Ext.define('Sgai.view.su.sec.SecurityRoleWinController', {
			extend : 'Ext.app.ViewController',
			alias : 'controller.securityRoleWinController',

			onWinRender : function() {
				var win = this.view;
				if (win.title === '添加权限') {
					return;
				}
				var grid = Ext.ComponentQuery
						.query('gridpanel#securityRoleGrid')[0];
				var sels = grid.getSelectionModel().getSelection();
				if (sels.length === 1) {
					win.viewModel.set('secRoleInfo', sels[0]);
				}
			},

			onConfirmBtnClick : function(win) {
				var record = win.viewModel.get('secRoleInfo');
				var roleGroupTmp = Ext.ComponentQuery
						.query('hidden#roleGroupTmp')[0];
				if (win.title === '添加权限') {
					record.set('roleGroup', roleGroupTmp.value);
				}
				var params = Ext.JSON.encode(record.data);
				var url = 'system/secRole/saveSecRole.action';
				Ext.Ajax.request({
							url : url,
							method : 'post',
							jsonData : params,
							async : false,
							success : function(response, options) {
								Sgai.util.Util.showTipMsg("处理成功！");
								win.close();
								var grid = Ext.ComponentQuery
										.query('gridpanel#securityRoleGrid')[0];
								grid.getStore().reload();
							},
							failure : function(response, options) {
								Sgai.util.Util.showTipMsg("处理失败！");
							}
						});
			}
		});
