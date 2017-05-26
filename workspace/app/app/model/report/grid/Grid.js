Ext.define('Sgai.model.report.grid.Grid',
    {
                extend: 'Sgai.model.AbstractModel',
	        autoLoad: true,
        idProperty:'sid',
        fields: [
             {name: 'gridId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'gridDesc' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'gridType' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'queryType' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'selectId' ,type: 'string'  ,defaultValue:null   }  ,             	    	
             {name: 'validateExpr' ,type: 'string'  ,defaultValue:null   }   ,             	    	
             {name: 'customDefine' ,type: 'string'  ,defaultValue:null   }  ,             	    	
             {name: 'parentResourceSid' ,type: 'int'  ,defaultValue:null   }    ,             	    	
             {name: 'limitPerPage' ,type: 'int'  ,defaultValue:null   }       ,             	    	
             {name: 'pageFlag' ,type: 'string'  ,defaultValue:null }        ,             	    	
             {name: 'summaryFlag' ,type: 'string'  ,defaultValue:null }               	    	
	 
        ]
    });
