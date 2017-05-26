Ext.define('Sgai.view.demo.WebSocketDemoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.websocketdemo',
	pushMessage : function() {
		Sgai.util.Util.postSubmitForm(this.lookupReference('pushForm'),'demo/web-socket-demo/send-message.action');
	}
});
