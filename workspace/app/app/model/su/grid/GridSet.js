Ext.define('Sgai.model.su.grid.GridSet', {
	extend : 'Ext.data.Model',
	idProperty : 'sid',
	autoLoad : true,
	fields : [ {
		name : 'sid',
		type : 'int'
	}, {
		name : 'gridId',
		type : 'int'
	}, {
		name : 'gridDesc',
		type : 'string'
	}, {
		name : 'gridType',
		type : 'string'
	}, {
		name : 'queryType',
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
	hasMany : {
		model : 'Sgai.model.su.grid.ColumnSet',
		foreignKey : 'gridId',
		name : 'columnList'
	}
});
