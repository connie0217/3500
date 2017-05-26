Ext.define('Sgai.model.report.grid.GridColumn',
    {
        extend: 'Sgai.model.AbstractModel',
	    autoLoad: true,
        idProperty:'sid',
        fields: [
             {name: 'gridSid' ,type: 'int'   ,useNull:true } ,         	    	
             {name: 'xtype' ,type: 'string'  ,defaultValue:null},           	    	
             {name: 'position' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'dataIndex' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'text' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'width' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'hiddenFlag' ,type: 'int'   ,useNull:true } ,         	    	
             {name: 'sortFlag' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'renderer' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'summaryType' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'summaryFormatter' ,type: 'string'  ,defaultValue:null },          	    	
             {name: 'others' ,type: 'string'  ,defaultValue:null   }           	    	
	 
        ]
    });
