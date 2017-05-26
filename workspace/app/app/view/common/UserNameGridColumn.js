/**
 * Created by tenderlitch on 2014/11/27.
 */
Ext.define('Sgai.view.common.UserNameGridColumn',{
    extend:'Ext.grid.column.Column',
    alias:'widget.usercolumn',
    renderer:function(value){
        return Sgai.util.Util.getUserNameByPin(value);
    }
});