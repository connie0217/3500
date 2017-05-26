Ext.define('Sgai.view.common.fileupload.FileUploadView', {
	extend : 'Ext.Container',
	alias : 'widget.fileUploadView',
	layout:'fit', 
    itemId: 'fileUploadPanel',
    
    requires: [
        'Sgai.util.Util',
        'Sgai.view.Translation',
        'Ext.form.field.File',
    	'Ext.form.Panel',
   		'Ext.window.MessageBox',
   		'Ext.ux.layout.Center'
    ],

	initComponent : function() {
		var me = this;
        
		Ext.applyIf(me, {
			
            items: [        		
            {   
            	layout:'ux.center',
                items: [
                    {
                        xtype: 'form',
                        bodyStyle:"padding:10px 10px 0x",
						border:0,
						widthRatio:0.45,
						heightRatio:0.3,
						collapsible:false,
						frame : true,
						itemId: 'formPanel',
                        title: translations.CM0103,
                        fileUpload : true,

                        defaults: {
				            anchor: '100%',
				            allowBlank: false,
				            msgTarget: 'side',
				            labelWidth: 70
				        },
				        items: [
				        	{
					            xtype: 'textfield',
					            itemId:'fileName',
					            name:'fileName',
					            emptyText:translations.pleaseInputFileName,
					            fieldLabel:translations.fileName
					        },
					        {
					            xtype: 'combo',
					            name:'fileType',
					            forceSelection: true,
					            triggerAction: 'all',
					            hiddenName:'Value',
					            displayField:'text',
					            valueField:'value',
					            editable:false,
					            emptyText:translations.pleaseSelectFileType,
					            fieldLabel:translations.fileType,
					           store:new Ext.data.SimpleStore({
					                    fields:['value','text']	,
					                    data:[
					                          ['message.format.file.save.path','Socket消息格式定义文件'],
						                      ['other.file.save.path','其他文件']
					                     ]
				               })
					        },
					        {
					            xtype: 'filefield',
					            id: 'upload',
					            itemId:'upload',
					            emptyText:translations.pleaseSelectFile,
					            fieldLabel: translations.filePath,
					            name: 'upload',
					            buttonText: translations.selectFile,
					            buttonConfig: {
					                icon: 'images/icons/fam/add.gif',
					                textAlign:'center'
				           		 }
				        	}
				        ],
				        buttons: [{
				            text: translations.upload,
				            handler: function(){
				                var form = this.up('form').getForm();
				                if(form.isValid()){
				                    form.submit({
				                        url: 'system/file-upload!upload.action',
				                        waitMsg: translations.uploadingFileWait,
				                        success: function(fp, o) {
				                        	Ext.MessageBox.show({
											    title:translations.operateMsgWinTitle,
											    msg:translations.uploadFileSuccess,
											    buttons:Ext.Msg.OK,
											    icon:Ext.MessageBox.INFO
											});
				                        },
				                        failure: function() {
				                        	Ext.MessageBox.show({
											    title:translations.errMsgWinTitle,
											    msg:translations[Ext.JSON.decode(this.response.responseText).message],
											    buttons:Ext.Msg.OK,
											    icon:Ext.MessageBox.ERROR
											});
				                        }
				                    });
				                }
				            }
				        },
				       {
				            text: translations.reset,
				            handler: function() {
				                this.up('form').getForm().reset();
				            }
				        }]
                    }]
           	 }]
        });
		this.callParent(arguments);
	}
});
