Ext.define('Sgai.view.report.grid.GridController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.grid',

	gridListRender : function(component) {
		component.getStore().load();
	},
	queryButtonClick : function(button) {
		Sgai.util.Util.postPageForm(this.lookupReference('queryForm'), this
						.getMaingrid());
	},
	resetButtonClick : function(button) {
		this.lookupReference('queryForm').getForm().reset();
	},
	getMaingrid : function() {
		return this.lookupReference('mainGrid');
	},
	rowEditFired : function(editor, context) {
		Sgai.util.Util.postEditRow(context);
	},
	addButtonClick : function(btn) {
		Sgai.util.Util.addNewRow(this.getMaingrid());
	},
	editButtonClick : function(btn) {
		Sgai.util.Util.editSelectedRow(this.getMaingrid());
	},
	deleteButtonClick : function(btn) {
		Sgai.util.Util.deleteSeletedRow(this.getMaingrid());
	},
	rowEditCancel : function(btn, context) {
		Sgai.util.Util.cancelEditRow(context);
	},
	rowDeleteFired : function(grid, rowIndex) {
		Sgai.util.Util.deleteColumnClick(grid, rowIndex);
	},
	selectionChange : function(model, selected) {
		this.lookupReference('editBtn').setDisabled(selected.length == 0);
		this.lookupReference('deleteBtn').setDisabled(selected.length == 0);
		this.lookupReference('paramsCustomBtn').setDisabled(selected.length == 0);
		this.lookupReference('columnsCustomBtn').setDisabled(selected.length == 0);

		var columnStore = this.lookupReference('columnGrid').getStore();
		var selectColumnStore = this.lookupReference('selectColumnGrid')
				.getStore();
		columnStore.removeAll();
		selectColumnStore.removeAll();

		var queryParamStore = this.lookupReference('queryParamGrid').getStore();
		var selectParamStore = this.lookupReference('selectParamGrid')
				.getStore();
		queryParamStore.removeAll();
		selectParamStore.removeAll();

		var selectedRecordSid;
		if (selected && selected.length > 0
				&& !Ext.isEmpty(selected[0].get('sid'))) {
			selectedRecordSid = selected[0].get('sid');
		} else {
			return;
		}
		// 查询grid下的列
		var params = {
			'qm.gridSid' : selectedRecordSid
		};
		columnStore.on('beforeload', function(store) {
					Ext.apply(store.proxy.extraParams, params);
				});
		columnStore.load();

		// 查询Select下的不在grid中的列
		var selectParams = {
			'gridSid' : selectedRecordSid,
			'selectId' : selected[0].get('selectId')
		};
		selectColumnStore.on('beforeload', function(store) {
					Ext.apply(store.proxy.extraParams, selectParams);
				});
		selectColumnStore.load();

		// 查询grid下的查询参数
		queryParamStore.on('beforeload', function(store) {
					Ext.apply(store.proxy.extraParams, params);
				});
		queryParamStore.load();

		// 查询Select下的不在grid中的参数
		selectParamStore.on('beforeload', function(store) {
					Ext.apply(store.proxy.extraParams, selectParams);
				});
		selectParamStore.load();
	},
	columnSaveButtonClick : function(btn) {

		var columnGrid = this.lookupReference('columnGrid');

		// 校验必填项目
		var newRec = columnGrid.getStore().getNewRecords();
		var updateRec = columnGrid.getStore().getUpdatedRecords();
		var removeRec = columnGrid.getStore().getRemovedRecords();

		if (newRec == "" && updateRec == "" && removeRec == "") {
			Ext.Msg.alert('验证错误', '没有记录可提交！');
			return false;
		}

		Sgai.util.Util.storeSyncWithoutConfirm(columnGrid.getStore());
	},
	getSelectedGrid : function() {
		var selectGrids = this.getMaingrid().getSelectionModel().getSelection();
		if (!selectGrids || selectGrids.length == 0) {
			return;
		}
		return selectGrids[0];
	},
	columnGridBeforeDrop : function(node, obj, overModel, dropPosition, opts) {
		var me = this;
		var currentGrid = me.getSelectedGrid();
		if (!currentGrid) {
			Ext.Msg.alert('操作错误', '必须先选择Grid');
			return false;
		}

		var columnStore = me.lookupReference('columnGrid').getStore();
		var selectColumnStore = me.lookupReference('selectColumnGrid')
				.getStore();

		var record = obj.records[0];
		if (record.get('colName')) {
			Ext.Array.each(obj.records, function(selectColumnRecord) {
				var columnRecord = Ext.create(columnStore.model.getName());
				columnRecord.set('gridSid', currentGrid.get('sid'));
				columnRecord
						.set('dataIndex', selectColumnRecord.get('colName'));
				columnRecord.set('text', selectColumnRecord.get('colTitle'));
				columnRecord.set('xtype', me.convertColType2Xtype(selectColumnRecord.get('colType')));
				columnRecord.set('width', 100);
				var count = columnStore.getCount();
				columnRecord.set('position', count + 1);
				columnStore.insert(count, columnRecord);
				selectColumnStore.remove(selectColumnRecord);
			});
			return false;
		} else {
			return true;
		}
	},
	convertColType2Xtype: function(colType){		
		if(colType==='NUM'){
			return 'numbercolumn'
		}
		else if(colType==='DATE'||colType==='DATETIME'){
			return 'datecolumn'
		}else{
			return '';
		}
	},
	
	convertXType2ColType: function(xtype){
		if(xtype==='numbercolumn'){
			return 'NUM'
		}
		else if(xtype==='datecolumn'){
			return 'DATE'
		}else{
			return 'STR';
		}
	},
	columnGridDrop : function(node, data, dropRec, dropPosition) {
		var me = this;
		var columnStore = this.lookupReference('columnGrid').getStore();
		for (var i = 0; i < columnStore.getCount(); i++) {
			columnStore.getAt(i).set('position', i + 1);
		}

	},
	selectColumnGridBeforeDrop : function(node, obj, overModel, dropPosition,
			opts) {
		var me = this;

		var columnStore = me.lookupReference('columnGrid').getStore();
		var selectColumnStore = me.lookupReference('selectColumnGrid')
				.getStore();

		var record = obj.records[0];
		if (record.get('dataIndex')) {
			Ext.Array.each(obj.records, function(columnRecord) {
						var selectColRecord = Ext
								.create(selectColumnStore.model.getName());
						selectColRecord.set('paramType', columnRecord
										.get('name'));
						selectColRecord.set('colTitle', columnRecord
										.get('text'));
						selectColRecord.set('colType', me.convertXType2ColType(columnRecord.get('xtype')));
						var count = selectColumnStore.getCount();
						selectColumnStore.insert(count, selectColRecord);
						columnStore.remove(columnRecord);
					});
			selectColumnStore.commitChanges();
			return false;
		} else {
			return true;
		}
	},
	paramSaveButtonClick : function(btn) {

		var queryParamGrid = this.lookupReference('queryParamGrid');

		// 校验必填项目
		var newRec = queryParamGrid.getStore().getNewRecords();
		var updateRec = queryParamGrid.getStore().getUpdatedRecords();
		var removeRec = queryParamGrid.getStore().getRemovedRecords();

		if (newRec == "" && updateRec == "" && removeRec == "") {
			Ext.Msg.alert('验证错误', '没有记录可提交！');
			return false;
		}

		Sgai.util.Util.storeSyncWithoutConfirm(queryParamGrid.getStore());

	},
	paramGridBeforeDrop : function(node, obj, overModel, dropPosition, opts) {
		var me = this;
		var currentGrid = me.getSelectedGrid();
		if (!currentGrid) {
			Ext.Msg.alert('操作错误', '必须先选择Grid');
			return false;
		}

		var queryParamStore = me.lookupReference('queryParamGrid').getStore();
		var selectParamStore = me.lookupReference('selectParamGrid')
				.getStore();

		var record = obj.records[0];
		if (!record.get('dispSeq')) {
			Ext.Array.each(obj.records, function(selectParamRecord) {
				var paramRecord = Ext.create(queryParamStore.model.getName());
				paramRecord.set('gridSid', currentGrid.get('sid'));
				paramRecord
						.set('paramId', selectParamRecord.get('paramId'));
				paramRecord.set('paramType', selectParamRecord.get('paramType'));
				var count = queryParamStore.getCount();
				paramRecord.set('dispSeq', count + 1);
				queryParamStore.insert(count, paramRecord);
				selectParamStore.remove(selectParamRecord);
			});
			return false;
		} else {
			return true;
		}
	},
	paramGridDrop : function(node, data, dropRec, dropPosition) {
		var me = this;
		var queryParamStore = this.lookupReference('queryParamGrid').getStore();
		for (var i = 0; i < queryParamStore.getCount(); i++) {
			queryParamStore.getAt(i).set('dispSeq', i + 1);
		}

	},
	selectParamGridBeforeDrop : function(node, obj, overModel, dropPosition,
			opts) {
		var me = this;

		var queryParamStore = me.lookupReference('queryParamGrid').getStore();
		var selectParamStore = me.lookupReference('selectParamGrid')
				.getStore();

		var record = obj.records[0];
		if (record.get('dispSeq')) {
			Ext.Array.each(obj.records, function(paramRecord) {
						var selectParamRecord = Ext
								.create(selectParamStore.model.getName());
						selectParamRecord.set('paramId', paramRecord
										.get('paramId'));
						selectParamRecord.set('paramType', paramRecord
										.get('paramType'));
						var count = selectParamStore.getCount();
						selectParamStore.insert(count, selectParamRecord);
						queryParamStore.remove(paramRecord);
					});
			selectParamStore.commitChanges();
			return false;
		} else {
			return true;
		}
	},
	paramsCustomButtonClick : function(btn) {
		Sgai.util.Util.deleteColumnClick(grid, rowIndex);
	},
	columnsCustomButtonClick : function(btn) {
		Sgai.util.Util.deleteColumnClick(grid, rowIndex);
	}
	

});
