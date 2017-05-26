Ext.define('Sgai.model.report.log.AccessLogStatByUser',
    {
        extend: 'Ext.data.Model',
	    autoLoad: true,
        idProperty:'sid',
        fields: [           	    	
             {name: 'userId' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'userName' ,type: 'string'  ,defaultValue:null   } ,           	    	
             {name: 'accessCount' ,type: 'int'  ,defaultValue:null   } ,             	    	
             {name: 'successCount' ,type: 'int'  ,defaultValue:null   } ,             	    	
             {name: 'failerCount' ,type: 'int'  ,defaultValue:null   } 
	 
        ]
    });
