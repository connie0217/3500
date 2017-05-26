Ext.define('Sgai.store.su.orgnization.OrgTreeStore',{
	extend: 'Ext.data.TreeStore',
	autoLoad: false,
	model: 'Sgai.model.su.orgnization.OrgModel',
	
	remoteSort: 'true',
	folderSort: true,
	
	nodeParam : 'qm.parentSid',
	
	root: {
	    name: 'sgaiRootNode',
	    text: 'sgaiRootNode',
	    sid: 0
	},
	
    proxy:
    {
        type:'ajax',
        actionMethods:{read: 'POST'},
        api:
        {
            read:'su/orgnization!findByConnect.action'
        },
        reader:
        {
			type:'json',
			rootProperty:'items',
            totalProperty:'totalProperty',
            successProperty:'success',
            messageProperty:'message'
        }
    }
});