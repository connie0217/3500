Ext.define('Sgai.store.su.sec.SecurityRoleStore', {
			extend : 'Ext.data.Store',
			autoLoad : false,
			model : 'Sgai.model.su.sec.SecurityRoleModel',
			storeId : 'securityRoleStore',
			remoteSort : false,
			folderSort : false,

			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				api : {
					read : 'system/secRole/findVoByPage.action',
					create : 'system/secRole/addBatchFromJson.action',
					update : 'system/secRole/updateBatchFromJson.action',
					destroy : 'system/secRole/delSecRole.action'
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