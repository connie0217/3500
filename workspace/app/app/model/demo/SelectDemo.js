Ext.define('Sgai.model.demo.SelectDemo',
    {
                extend: 'Sgai.model.AbstractModel',
	        autoLoad: true,
        idProperty:'sid',
        fields: [
             {name: 'name' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'pin' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'password' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'gender' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'phone1' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'phone2' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'tel' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'email' ,type: 'string'  ,defaultValue:null   } ,             	    	
             {name: 'state' ,type: 'int'   ,useNull:true } ,             	    	
             {name: 'userPost' ,type: 'string'  ,defaultValue:null   }              	    	
	 
        ]
    });
