Ext.define('Sgai.model.report.select.SelectDefConfig',
    {
                extend: 'Sgai.model.AbstractModel',
	        autoLoad: true,
        idProperty:'sid',
        fields: [
             {name: 'selectId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'selectName' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'selectDesc' ,type: 'string'  ,defaultValue:null   }/* ,             	    	
             {name: 'defineDetail' ,type: 'string'  ,defaultValue:null   } */             	    	
	 
        ]
    });
