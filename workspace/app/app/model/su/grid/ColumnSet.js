Ext.define('Sgai.model.su.grid.ColumnSet', {
	extend : 'Ext.data.Model',
	uses : [ 'Sgai.model.su.grid.GridSet' ],
	idProperty : 'sid',
	fields : [ {
		name : 'sid',
		type : 'int'
	}, {
		name : 'gridSid',
		type : 'int'
	}, {
		name : 'position',
		type : 'int'
	}, {
		name : 'dataIndex',
		type : 'string'
	}, {
		name : 'text',
		type : 'string'
	}, {
		name : 'width',
		type : 'float'
	}, {
		name : 'hiddenFlag',
		type : 'int'
	}, {
		name : 'sortFlag',
		type : 'int'
	}, {
		name : 'renderer',
		type : 'string'
	}, {
		name : 'createdBy',
		type : 'string'
	}, {
		name : 'createdTimestamp',
		type : 'date'
	}, {
		name : 'updateBy',
		type : 'string'
	}, {
		name : 'updateTimestamp',
		type : 'date'
	}, {
		name : 'version',
		type : 'int'
	} ],
	belongsTo : {
		model : 'Sgai.model.su.grid.GridSet',
		foreignKey : 'gridSid'
	}
});