Ext.define('Sgai.store.su.sec.SecurityGroupStore', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			model : 'Sgai.model.su.sec.SecurityGroupModel',
			storeId : 'securityGroupStore',
			remoteSort : false,
			folderSort : false,

			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'system/secRoleGroup/findByPage.action',
					create : 'system/secRoleGroup/addBatchFromJson.action',
					update : 'system/secRoleGroup/updateBatchFromJson.action',
					destroy : 'system/secRoleGroup/destroy.action'
				},

				reader : {
					type : 'json',
					rootProperty : 'data.items',
					totalProperty : 'data.totalProperty',
					successProperty : 'meta.success',
					messageProperty : 'meta.message'
				}
			}
		});