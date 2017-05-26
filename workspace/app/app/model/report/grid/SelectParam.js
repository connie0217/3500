Ext.define('Sgai.model.report.grid.SelectParam',
    {
        extend: 'Ext.data.Model',
	    autoLoad: true,
        idProperty:'sid',
        fields: [
             {name: 'paramId' ,type: 'string'   ,useNull:true } ,             	    	
             {name: 'paramType' ,type: 'string'   ,useNull:true }          	    	
	 
        ]
    });