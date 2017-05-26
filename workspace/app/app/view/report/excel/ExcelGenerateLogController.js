Ext.define('Sgai.view.report.excel.ExcelGenerateLogController', {
			extend : 'Ext.app.ViewController',
			alias : 'controller.excelgeneratelog',

			excelGenerateLogListRender : function(component) {
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
			downLoadButtonClick : function(btn) {
				var rec = btn.getWidgetRecord();
				if(rec.get('zipFile')&&rec.get('generateResult')==1){
					var url='report/excel-download/download.action';
					var params={fname:rec.get('zipFile')};
					Sgai.util.Util.downloadFile(url,params);
				}else{
					Ext.Msg.alert("Excel生成完毕才能下载!");					
				}
			}

		});
