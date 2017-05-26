Ext.define('Sgai.view.demo.LeaveApply', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.leaveapply',
	requires : [ 'Sgai.view.demo.LeaveApplyList',
			'Sgai.view.demo.LeaveApplyController' ],
	controller : 'leaveapply',
	layout : {
		type : 'fit'
	},

	items : [ {
		xtype : 'leaveapplylist'
	} ],
	dockedItems : [ {
		xtype : 'panel',
		iconCls : 'look',
		title : translations.queryCond,
		collapsible : true,
		layout : 'fit',
		items : [ {
			xtype : 'form',
			layout : 'column',
			bodyPadding : 5,
			defaultType : 'textfield',
			reference : 'queryForm',
			items : [

			{
				name : 'qm.applyBy',
				itemId : 'applyBy',
				labelWidth : 70,
				labelAlign : 'right',
				fieldLabel : '申请人',
				width : 200
			}, {
				name : 'qm.leaveState',
				xtype : 'commontypecombobox',
				itemId : 'leaveStateCombo',
				fieldLabel : '请假状态',
				labelAlign : 'right',
				typeId : 'DEMO_LEAVE_APPLY_STATE',				
				width : 200
			},

			{
				xtype : 'button',
				text : translations.query,
				margin : '0 0 0 10',
				itemId : 'queryBtn',
				iconCls : 'find',
				listeners : {
					click : 'queryButtonClick'
				}
			}, {
				xtype : 'button',
				text : translations.reset,
				margin : '0 0 0 10',
				itemId : 'resetBtn',
				iconCls : 'reset'
			} ]
		} ]
	}, {
		xtype : 'toolbar',
		flex : 1,
		dock : 'top',
		items : [ {
			xtype : 'button',
			text : translations.add,
			itemId : 'add',
			iconCls : 'add',
			reference : 'addBtn',
			listeners : {
				click : 'addButtonClick'
			}
		}, {
			xtype : 'button',
			text : translations.update,
			itemId : 'edit',
			iconCls : 'edit',
			reference : 'editBtn',
			disabled : true,
			listeners : {
				click : 'editButtonClick'
			}
		}, {
			xtype : 'button',
			text : translations.del,
			itemId : 'delete',
			iconCls : 'delete',
			reference : 'deleteBtn',
			disabled : true,
			listeners : {
				click : 'deleteButtonClick'
			}
		}, {
			xtype : 'button',
			text : '提报',
			itemId : 'apply',
			iconCls : 'app_link',
			reference : 'applyBtn',
			listeners : {
				click : 'applyButtonClick'
			}
		}, {
			xtype : 'button',
			text : '取消申请',
			itemId : 'cancelApply',
			iconCls : 'app_link',
			reference : 'cancelApplyBtn',
			listeners : {
				click : 'cancelApplyButtonClick'
			}
		} ]
	} ]
});
