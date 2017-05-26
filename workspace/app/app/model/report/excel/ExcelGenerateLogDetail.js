Ext.define('Sgai.model.report.excel.ExcelGenerateLogDetail',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        idProperty:'sid',
        requires : ['Sgai.util.Util'],
        fields: [
             {name: 'sid' , type: 'int',convert:null },
             {name: 'createdBy' , type: 'string' },
             {name: 'rptId' ,type: 'string'  ,defaultValue:null   } , 
             {name: 'rptName' ,type: 'string'  ,defaultValue:null   } ,              	    	
             {name: 'startTimestamp' ,type: 'date' ,dateFormat:'Y-m-d H:i:s'   ,defaultValue:null   } ,             	    	
             {name: 'endTimestamp' ,type: 'date' ,dateFormat:'Y-m-d H:i:s'   ,defaultValue:null   } ,  
             {name: 'progress' ,type: 'float'  ,defaultValue:null   } ,     
             {name: 'params' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'generateResult' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'currentPage' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'zipFile' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'totalNum' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'totalPage' ,type: 'int'   ,useNull:true }  , 
             {
				name : 'downLoadText',
				convert : function(v, record) {
					return '下载';
				}
			}            	    	
	 
        ]
    });
