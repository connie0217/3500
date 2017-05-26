Ext.define('Sgai.model.report.grid.SelectColumn',
    {
        extend: 'Ext.data.Model',
	    autoLoad: true,
        idProperty:'sid',
        fields: [
             {name: 'colName' ,type: 'string'   ,useNull:true } ,             	    	
             {name: 'colTitle' ,type: 'string'   ,useNull:true } ,             	    	
             {name: 'colType' ,type: 'string'  ,defaultValue:null}             	    	
	 
        ]
    });