Ext.define('Sgai.view.su.custom.ResourceCustomWinController', {
			extend : 'Ext.app.ViewController',
			alias : 'controller.resourcecustomwin',

			afterRender : function(component) {
				var me=this;
				var record = me.getView().record;
				var formPanel = this.lookupReference('resourceCustomForm');
				formPanel.down('textfield[name=resName]')
						.setValue(record.get('text'));
				formPanel.down('textfield[name=resSid]')
						.setValue(record.get('id'));
			},
			submitButtonClick : function(btn) {
				var me=this;
				var formPanel = this.lookupReference('resourceCustomForm');
				var resSid = formPanel.down('textfield[name=resSid]')
						.getValue();
				var parentSid = formPanel.down('textfield[name=parentSid]')
						.getValue();
				var menuCustomObj = {
					'resSid' : resSid,
					'parentSid' : parentSid
				};

				var menuCustomJson = Ext.encode(menuCustomObj);
				var url = 'system/resource-custom!addToFavorite.action';
				Sgai.util.Util.postAjaxRequestByJsonData(url, menuCustomJson,
						false, function() {
							me.getView().close();
						}, function() {
						});

			},
			cancelButtonClick : function(btn) {
				this.getView().close();
			}
		});