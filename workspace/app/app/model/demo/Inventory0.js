Ext.define('Sgai.model.demo.Inventory0',
    {
                extend: 'Sgai.model.AbstractModel',
	        autoLoad: true,
        idProperty:'matId',
        fields: [
             {name: 'slotId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'holdFlag' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'scrapFlag' ,type: 'string'  ,useNull:true   } ,             	    	
             {name: 'matType' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'layer' ,type: 'string',defaultValue:'' } ,             	    	
             {name: 'poId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'sourcePoId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'soId' ,type: 'string'  ,defaultValue:null   } ,
             {name: 'soItemId' ,type: 'string'  ,defaultValue:null   } ,    
             {name: 'matMass' ,type: 'string'  ,defaultValue:null   } ,    
             {name: 'steelgradeId' ,type: 'string'  ,defaultValue:null   } ,
             {name: 'l4Matnr' ,type: 'string'  ,defaultValue:null   } ,
             {name: 'fqcResult' ,type: 'string'  ,defaultValue:null   } ,    
             {name: 'storeDt' ,type: 'string'  ,defaultValue:null   } ,  
             {name: 'l4StgPlace' ,type: 'string'  ,defaultValue:null   } ,    
             {name: 'facilityId' ,type: 'string'  ,defaultValue:null   } ,
             {name: 'createDt' ,type: 'date'} ,
             {name: 'holdReason' ,type: 'string'  ,defaultValue:null   } ,    
             {name: 'prodReportFlag' ,type: 'string'  ,defaultValue:null   } ,  
             {name: 'settlementMass' ,type: 'string'  ,defaultValue:null   } ,
             {name: 'xnStg' ,type: 'string'   ,defaultValue:null }              	                 	    	
	 
        ]
    });
