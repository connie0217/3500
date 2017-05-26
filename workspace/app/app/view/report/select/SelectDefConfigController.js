Ext.define('Sgai.view.report.select.SelectDefConfigController', {
			extend : 'Ext.app.ViewController',
			alias : 'controller.selectdefconfig',

			selectDefConfigListRender : function(component) {
				component.getStore().load();
			},
			queryButtonClick : function(button) {
				Sgai.util.Util.postPageForm(this.lookupReference('queryForm'),
						this.getMaingrid());
			},
			resetButtonClick : function(button) {
				this.lookupReference('queryForm').getForm().reset();
			},
			getMaingrid : function() {
				return this.lookupReference('mainGrid');
			},
			rowEditFired : function(editor, context) {
				Sgai.util.Util.postEditRow(context);
			},
			addButtonClick : function(btn) {
				var store = this.getMaingrid().getStore();
				var record = Ext.create(store.model.getName(), {
							sid : null,
							version : null
						});
				this.openDetailWin(record,false);
			},
			editButtonClick : function(btn) {
				// Sgai.util.Util.editSelectedRow(this.getMaingrid());
				this.openDetailWin(this.getSelected(),true);
			},
			deleteButtonClick : function(btn) {
				Sgai.util.Util.deleteSeletedRow(this.getMaingrid());
			},
			rowEditCancel : function(btn, context) {
				Sgai.util.Util.cancelEditRow(context);
			},
			rowDeleteFired : function(grid, rowIndex) {
				Sgai.util.Util.deleteColumnClick(grid, rowIndex);
			},
			selectionChange : function(model, selected) {
				this.lookupReference('editBtn')
						.setDisabled(selected.length == 0);
				this.lookupReference('deleteBtn')
						.setDisabled(selected.length == 0);
				this.lookupReference('refreshBtn')
						.setDisabled(selected.length == 0);

			},
			refreshButtonClick : function(button) {
				var me = this;
				var selected = me.getSelected();
				if (!selected) {
					Ext.MessageBox.show('必须选择记录');
					return;
				}
				var params = {
					'selectId' : selected.get('selectId')
				};
				var url = 'select/select-def-config/refreshBySelectId.action';
				Sgai.util.Util.postAjaxRequestByParams(url, params, false,
						function() {
						});
			},

			refreshAllButtonClick : function(button) {
				var params = {};
				var url = 'select/select-def-config/refreshAll.action';
				Sgai.util.Util.postAjaxRequestByParams(url, params, false,
						function() {
						});
			},

			getSelected : function() {
				var selecteds = this.getMaingrid().getSelectionModel()
						.getSelection();
				if (!selecteds || selecteds.length == 0) {
					return;
				}
				return selecteds[0];
			},
			// 打开详细信息窗口
			openDetailWin : function(record,isEdit) {
				var me = this;
				var form = me.getDetailForm();
				var win = me.getDetailWin();
				form.getForm().setValues({
							sid:'',
							version : record.get('version'),
							selectId : record.get('selectId'),
							selectName : record.get('selectName'),
							selectDesc : record.get('selectDesc'),
							defineDetail : ''
						});
				if (isEdit) {
					Ext.Ajax.request({
								waitMsg : '正在操作',
								waitTitle : '提示',
								url : 'select/select-def-config/findBySid.action?sid='
										+ record.get('sid'),
								method : 'POST',
								success : function(conn, response, options,
										eOpts) {
									var selectDefConfigDetail = Ext.JSON
											.decode(conn.responseText);
									form.getForm().setValues(selectDefConfigDetail.data);
									win.show();
								},
								failure : function(conn, response, options,
										eOpts) {
									Sgai.util.Util
											.showErrorMsg(conn.responseText);

								}
							});
				}else{
					win.show();
				}
			},
			saveButtonClick : function(button) {
				var me = this;
				var formData = me.getDetailForm().getForm().getValues();
				var jsonObj = Ext.encode(formData);
				var url = 'select/select-def-config/insert.action';
				if (formData.sid) {
					var url = 'select/select-def-config/update.action';
				}
				Sgai.util.Util.postAjaxRequestByJsonData(url, jsonObj, false,
						function() {
							me.getMaingrid().getStore().reload();
							me.getDetailWin().close();
						});
			},
			getDetailWin : function() {
				return this.lookupReference('detailWin');
			},
			getDetailForm : function() {
				return this.lookupReference('detailForm');
			},
			closeButtonClick : function() {
				return this.getDetailWin().close();
			}
		});
