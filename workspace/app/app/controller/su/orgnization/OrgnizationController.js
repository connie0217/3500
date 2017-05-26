Ext.define('Sgai.controller.su.orgnization.OrgnizationController', {
	extend : 'Ext.app.Controller',

	requires : ['Sgai.util.Util'],

	views : ['Sgai.view.su.orgnization.OrgnizationView'],

	stores : ['Sgai.store.su.orgnization.OrgnizationStore'],

	refs : [

	{
				ref : 'orgnizationView',
				selector : 'orgnizationView'
			}

	],
	init : function(application) {
		this.control({
					"orgnizationView treepanel button#btnOrgnizationSave" : {
						click : this.onButtonClickSave
					},
					"orgnizationView treepanel button#btnOrgnizationAddNode" : {
						click : this.onButtonClickAdd
					},
					"orgnizationView treepanel button#btnOrgnizationDelNode" : {
						click : this.onButtonClickDelete
					},
					"orgnizationView treepanel button#btnOrgnizationExpandAll" : {
						click : this.onButtonClickExpandAll
					},
					"orgnizationView treepanel button#btnOrgnizationCollapseAll" : {
						click : this.onButtonClickCollapseAll
					},
					"orgnizationView treepanel button#btnOrgnizationCollapseAll" : {
						click : this.onButtonClickCollapseAll
					}
				});
	},

	onButtonClickDelete : function(button, e, options) {
		var treePanel = button.up('#orgnizationTreePanel');
		var record = treePanel.getSelectionModel().lastSelected;
		if (record.hasChildNodes()) {
			Ext.MessageBox.show({
						title : translations.operateMsgWinTitle,
						msg : translations.hasChildCanNotDel,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.INFO
					});
		} else {
			record.remove();
		}
	},

	onButtonClickAdd : function(button, e, options) {

		var treePanel = button.up('#orgnizationTreePanel');
		var record = treePanel.getSelectionModel().lastSelected;

		if (!Ext.isEmpty(record)) {
			if (!record.isExpanded()) {
				treePanel.expandNode(record);
			}
			if (record.data.orgLevel == 0) {// 根节点添加子节点
				var orgModel = new Sgai.model.su.orgnization.OrgnizationModel({
							sid : '',
							orgId : '',
							orgName : '',
							orgBriefName : '',
							orgLocation : '',
							officeFlag : '',
							comments : '',
							orgLevel : 1,
							orgSeq : record.data.orgSeq + 1,
							orgShortCode : '',
							psDutyFlag : '',
							parentSid : record.data.sid
						});
				orgModel.store = record.store;
				record.appendChild(orgModel);
			} else { // 子节点添加子节点
				var orgModel = new Sgai.model.su.orgnization.OrgnizationModel({
							sid : '',
							orgId : '',
							orgName : '',
							orgBriefName : '',
							orgLocation : '',
							officeFlag : '',
							comments : '',
							orgLevel : record.data.orgLevel + 1,
							orgSeq : record.data.orgSeq + 1,
							orgShortCode : '',
							psDutyFlag : '',
							parentSid : record.data.sid
						});
				record.appendChild(orgModel);
			}
		}
	},

	onButtonClickSave : function(button, e, options) {

		var gridPanel = button.up('#orgnizationTreePanel');
		// 校验必填项目

		var newRec = gridPanel.getStore().getNewRecords();
		var updateRec = gridPanel.getStore().getUpdatedRecords();
		var removeRec = gridPanel.getStore().getRemovedRecords();
		var isValidNew = this.validRecords(newRec);
		var isValidUpdate = this.validRecords(updateRec);

		if (!isValidNew || !isValidUpdate) {
			Sgai.util.Util.showErrorMsg(translations['notAllInputTip']);
			return;
		}

		var jsonArrayAddUpt = [];
		var jsonArrayRemove = [];

		Ext.each(newRec, function(item) {
					item.data.sid = '';
					item.data.createdBy = Sgai.config.Runtime.getUserName();
					item.set('items',null);
					jsonArrayAddUpt.push(item.data);
				});
		Ext.each(updateRec, function(item) {
					item.data.updatedBy = Sgai.config.Runtime.getUserName();
					item.set('items',null);
					jsonArrayAddUpt.push(item.data);
				});
		Ext.each(removeRec, function(item) {
					jsonArrayRemove.push(item.data);
				})

		var listAddUpt = Ext.encode(jsonArrayAddUpt);
		var istRemove = Ext.encode(jsonArrayRemove);
		var url = 'su/orgnization/save.action';
		var params = {
			'listAddUpt' : listAddUpt,
			'listRemove' : istRemove,
			'userId' : Sgai.config.Runtime.getUserName()
		};

		// 提交确认
		Ext.Msg.confirm(translations.operateMsgWinTitle,
				translations.operateConfirm, function(btn) {
					if (btn == 'no') {
						return;
					} else {
						// 设置提交参数
						var store = gridPanel.getStore();
						Ext.getBody().mask("请稍等，正在处理中...", "x-mask-loading");
						Ext.Ajax.request({
									url : url,
									method : 'post',
									params : params,
									waitMsg : '正在提交数据...',
									success : function(response, options) {
										Ext.getBody().unmask();
										store.removeAll();
										store.load();
									},
									failure : function(response, options) {
										Ext.getBody().unmask();
									}
								});

					}
				});
	},

	//
	validRecords : function(vRecords) {
		if (vRecords == "") {
			return true;
		}

		for (var i = 0; i < vRecords.length; i++) {
			var record = vRecords[i];
			if (Ext.String.trim(record.data.orgName) == "") {
				return false;
			}
			if (Ext.String.trim(record.data.officeFlag) == "") {
				return false;
			}
		}
		return true;
	},

	onButtonClickExpandAll : function(button, e, options) {
		var treePanel = button.up('#orgnizationTreePanel');
		treePanel.expandAll();
	},
	onButtonClickCollapseAll : function(button, e, options) {
		var treePanel = button.up('#orgnizationTreePanel');
		treePanel.collapseAll();
	}
});