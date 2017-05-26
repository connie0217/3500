Ext.define('Sgai.model.report.log.AccessLogStatByRpt',
    {
        extend: 'Ext.data.Model',
	    autoLoad: true,
        idProperty:'sid',
        fields: [           	    	
             {name: 'rptId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'rptName' ,type: 'string'  ,defaultValue:null   } ,           	    	
             {name: 'accessCount' ,type: 'int'  ,defaultValue:null   } ,             	    	
             {name: 'successCount' ,type: 'int'  ,defaultValue:null   } ,             	    	
             {name: 'failerCount' ,type: 'int'  ,defaultValue:null   } 
	 
        ]
    });
