Ext.define('Sgai.controller.Login', {
    extend: 'Ext.app.Controller',
    
    requires: [
       'Sgai.util.MD5',
       'Sgai.util.Alert',
       'Sgai.util.Util',
       'Sgai.util.SessionMonitor',
       'Ext.util.Base64'
    ],

    views: [
       'Login',
       'Header',
       'CapsLockTooltip'
   ],
   
	refs: [
      {
          ref: 'capslockTooltip',
          selector: 'capslocktooltip'
      }, 
      {
		ref : 'msgDisplayWin',
		selector : 'appheader msgdisplaywin'
	  }, {
		ref : 'msgDisplayList',
		selector : 'appheader msgdisplaywin msgdisplaylist'
	  }, {
		ref : 'messageButton',
		selector : 'appheader button#message'
	  }
	],
	
	  init: function(application) {
	      this.control({
	          "login form button#submit": {
	              click: this.onButtonClickSubmit
	          },
	          "login form button#cancel": {
	              click: this.onButtonClickCancel
	          },
	          "login form textfield": {
	              specialkey: this.onTextfielSpecialKey
	          },
	          "login form textfield[name=password]": {
	              keypress: this.onTextfielKeyPress
	          },
	          "appheader button#update": {
	              click: this.onButtonChangePassWd
	          },
			  "appheader button#message" : {// 系统消息按钮
				click : this.onButtonClickMessage
			  },
			  'appheader msgdisplaywin button#close' : {
				click : this.msgWinClose
			  },
			  'appheader' : {
				render : this.msgDisplayWinRender
			  }
	      });

      },
      onButtonChangePassWd:function(btn){
    	 var passwordWin = Ext.widget('password');
    	 passwordWin.show();
      },
      onButtonClickSubmit: function(button, e, options) {
      	  var me = this;
          var formPanel = button.up('form');
              login = button.up('login');
              username = formPanel.down('textfield[name=username]').getValue();
              pass = formPanel.down('textfield[name=password]').getValue(); 
              crewId=formPanel.down('combo[itemId=crewId]').getValue(),
              shiftId=formPanel.down('combo[itemId=shiftId]').getValue();
              //var pageCheckCode = formPanel.down('textfield[name=pageCheckCode]').getValue();
          if (formPanel.getForm().isValid()) {

              //pass = Sgai.util.MD5.encode(pass); 
              
              Ext.get(login.getEl()).mask("用户权限认证中，请稍候...", '努力加载中');

              Ext.Ajax.request({
                  url: 'system/login/login.action',
                  params: {
                      username: username,
                      password: pass,  
                      crewId: crewId,
                      shiftId: shiftId
//                      pageCheckCode:pageCheckCode           
                  },
                  success: function(conn, response, options, eOpts) {
                      
                      Ext.get(login.getEl()).unmask();

                      var result = Sgai.util.Util.decodeJSON(conn.responseText);

                      if (result.success) {
                          login.close();
                          Sgai.config.Runtime.setUserName(username);
                          Sgai.config.Runtime.setShiftId(shiftId);
                          Sgai.config.Runtime.setCrewId(crewId);
                          Sgai.config.Runtime.setActivitiAuth("Basic " + Ext.util.Base64.encode(username + ":" + Sgai.util.MD5.encode(pass)))
                          Ext.create('Sgai.view.Main');
                          Sgai.util.SessionMonitor.start();
                      } else {
                          Sgai.util.Util.showErrorMsg(Ext.decode(conn.responseText).message);
                      }                    
                  },
                  failure: function(conn, response, options, eOpts) {

                      Ext.get(login.getEl()).unmask();
                  
                      Sgai.util.Util.showErrorMsg(conn.responseText);
                  }
              });
          }    
      },

      onButtonClickCancel: function(button, e, options) {
          button.up('form').getForm().reset();
      },

      onTextfielSpecialKey: function(field, e, options) {
          if (e.getKey() == e.ENTER){
              var submitBtn = field.up('form').down('button#submit');
              submitBtn.fireEvent('click', submitBtn, e, options);
          }
      },

      onTextfielKeyPress: function(field, e, options) {
          var charCode = e.getCharCode(); 
          
          if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
              (!e.shiftKey && charCode >= 65 && charCode <= 90)){

              if(this.getCapslockTooltip() === undefined){
                  Ext.widget('capslocktooltip');
              }

              this.getCapslockTooltip().show();

          } else {

              if(this.getCapslockTooltip() !== undefined){
                  this.getCapslockTooltip().hide();
              }
          }
      },
	onButtonClickMessage : function(button, e, options) {
		var win = this.getMsgDisplayWin();
		win.showAt(200, 100);
		this.getMessageButton().setIconCls('sgai-message-open');
	},
	msgWinClose : function() {
		this.getMsgDisplayWin().close();
	},
	msgDisplayWinRender : function() {
		SgaiMesWebSocket.addListener(this);
	},
    uuid:Ext.create('Ext.data.identifier.Uuid',{}),
	sgaiWebSocket : {
		setCurr : function(message) {
			var me=this;
			var store = this.getMsgDisplayList().getStore();
			var record = Ext.create(store.model.getName(), {
						messageId : me.uuid.generate(),
						messageTime : new Date(),
						message : message
					});
			store.insert(0, record);
			this.getMessageButton().setIconCls('sgai-message-in');
		}
	}
  });