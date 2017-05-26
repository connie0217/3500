
Ext.define('Sgai.store.report.grid.Grids',
{
        extend: 'Ext.data.Store',
        autoLoad: false,  
        pageSize:15,
        model: 'Sgai.model.report.grid.Grid',
        storeId: 'ui.gridgrids',			        	
        remoteSort: true,
        proxy:
        {
	    type:'ajax',
	    actionMethods:  
            {
                read:'POST'
            },
            api:
            {
            	                 read:'ui/grid/findByPage.action',
                                create:'ui/grid/insertGrids.action',
                update:'ui/grid/update.action',
                destroy:'ui/grid/destroy.action'
            },

            reader:
            {
                type:'json',
				rootProperty :'data.items',
				totalProperty :'data.totalProperty',
				successProperty : 'meta.success',
				messageProperty : 'meta.message'
            }
        } 
    });
