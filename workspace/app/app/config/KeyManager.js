Ext.define("Sgai.config.KeyManager", {
    alternateClassName : "GKeyManager",
    singleton : true,

    maskBackspace : function() {
        var DOC = Ext.getDoc();
        DOC.on({
            'keydown' : maskBS,
            'keyup' : maskBS
        });
        function maskBS(event, targetHtml) {
            var keycode = event.getKey();
            var obj = targetHtml;
            if (keycode == Ext.EventObject.BACKSPACE) {
                if (obj != null && obj.tagName != null
                    && (obj.tagName.toLowerCase() == "input" || obj.tagName.toLowerCase() == "textarea")) {
                    //readOnly
                    var fieldEl, fieldCmp;
                    fieldEl = Ext.get(obj).up('table.x-form-item');
                    if (fieldEl && fieldEl.id) {
                        fieldCmp = Ext.getCmp(fieldEl.id);
                    }
                    if (fieldCmp && !isEditable(fieldCmp)) {
                        event.stopEvent();
                    }
                } else {
                    event.stopEvent();
                }
            }
        };
        function isEditable(field){
            return !field.readOnly && (field.editable===undefined || field.editable);
        }
    }
});