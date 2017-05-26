Ext.define('Sgai.model.report.excel.ExcelGenerateLog',
    {
                extend: 'Sgai.model.AbstractModel',
	        autoLoad: true,
        idProperty:'sid',
        fields: [
             {name: 'rptId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'startTimestamp' ,type: 'date' ,dateFormat:'Y-m-d H:i:s'   ,defaultValue:null   } ,             	    	
             {name: 'endTimestamp' ,type: 'date' ,dateFormat:'Y-m-d H:i:s'   ,defaultValue:null   } ,             	    	
             {name: 'params' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'generateResult' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'currentPage' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'zipFile' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'totalNum' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'totalPage' ,type: 'int'   ,useNull:true }              	    	
	 
        ]
    });
