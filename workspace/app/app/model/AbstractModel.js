Ext.define('Sgai.model.AbstractModel', {
	extend : 'Ext.data.Model',
	autoLoad : true,
	idProperty : 'sid',
	requires : [ 'Sgai.util.Util' ],
	fields : [ {
		name : 'sid',
		type : 'int',
		defaultValue : null,
        persist: false
		
	}, {
		name : 'createdBy',
		type : 'string'
	}, {
		name : 'createdDt',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'createdTimestamp',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'version',
		type : 'int',
		defaultValue : 1,
		critical : true
	}, {
		name : 'updatedBy',
		type : 'string'
	}, {
		name : 'updatedDt',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'updatedTimestamp',
		type : 'date'
	} ]
});