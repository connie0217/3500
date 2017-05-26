Ext.define('Sgai.model.su.custom.ResourceCustom',
    {
    	extend: 'Ext.data.TreeModel',  
        idProperty:'sid',    	
        fields: [
             {name: 'sid' , type: 'int' ,critical:true,defaultValue:null ,convert: function(value, row) {
                 return (value == null) ? null : parseInt(value);
             } },   
             {name: 'customName' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'resSid' ,type: 'string'   ,defaultValue:null,useNull:true } ,             	    	
             {name: 'customLevel' ,type: 'int'   ,defaultValue:null,useNull:true } ,             	    	
             {name: 'parentSid' ,type: 'string'   ,defaultValue:null,useNull:true } ,             	    	
             {name: 'dispSeq' ,type: 'int'   ,defaultValue:null,useNull:true }    ,
             {name: 'createdBy', type: 'string'},
             {name: 'createdTimestamp', type: 'date'},
             {name: 'updatedBy', type: 'string'},
             {name: 'updatedTimestamp', type: 'date'},
             {name: 'version', type: 'int',critical:true}  	
	 
        ]
    });
