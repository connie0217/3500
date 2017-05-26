Ext.ns('Sgai.cmp');
Ext.define('Sgai.cmp.SgaiTextField', {
	extend : 'Ext.form.field.Text',
	alias : 'widget.sgai-text',
	initEvents : function() {
		Ext.form.TextField.superclass.initEvents.call(this);
		var me=this;
		me.mon(me.el, 'dblclick', function(e){   
			me.fireEvent('dblclick',me);
	     }, this);
	}	

});
