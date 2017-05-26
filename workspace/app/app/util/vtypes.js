	//校验日期字段输入内容
	Ext.apply (Ext.form.field.VTypes, {  		    
			timestampCheck: function(val, field) {
				var timestampRegex = new RegExp ("^(((20[0-3][0-9]-(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|(20[0-3][0-9]-(0[2469]|11)-(0[1-9]|[12][0-9]|30))) (\[0-2]{1}\[0-4]{1}):\[0-5]{1}\[0-9]{1}:\[0-5]{1}\[0-9]{1})$");
				return timestampRegex.test(val);
			},
			timestampCheckText: '日期-时间格式错误,请重新输入.',
			timestampCheckMask: /[\d\s:-]/
	});
	
	//校验端口字段输入内容
	Ext.form.VTypes["portVal"] = /^(0|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/; 
	Ext.form.VTypes["port"]=function(v){  
		return Ext.form.VTypes["portVal"].test(v);  
	}  
	Ext.form.VTypes["portText"]="端口范围 0 - 65535"  
	Ext.form.VTypes["portMask"]=/[0-9]/;
	
	//校验IP地址字段输入内容
	Ext.form.VTypes["ipVal"] = /^([1-9][0-9]{0,1}|1[013-9][0-9]|12[0-689]|2[01][0-9]|22[0-3])([.]([1-9]{0,1}[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){2}[.]([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
	Ext.form.VTypes["ip"]=function(v){  
		return Ext.form.VTypes["ipVal"].test(v);  
	}  
	Ext.form.VTypes["ipText"]="IP地址范围 1.0.0.1 - 223.255.255.254 不支持 127.x.x.x"  
	Ext.form.VTypes["ipMask"]=/[.0-9]/; 
	
	//校验用户密码输入内容
	Ext.apply(Ext.form.field.VTypes, {
   		customPass: function(val, field) {
        	return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/.test(val);        
   		},
   		customPassText: 'Not a valid password.  Length must be at least 6 characters and maximum of 20 Password must contain one digit, one letter lowercase, one letter uppercase, onse special symbol @#$% and between 6 and 20 characters.'
	});
    
	//请输入正整数
	Ext.form.VTypes["positiveIntegerVal"] = /^[0-9]*$/; 
	Ext.form.VTypes["positiveInteger"]=function(v){  
		return Ext.form.VTypes["positiveIntegerVal"].test(v);  
	};
	Ext.form.VTypes["positiveIntegerText"]="请输入正整数";  
	Ext.form.VTypes["positiveIntegerMask"]=/[0-9]/;
	
	//请输入浮点数
	Ext.form.VTypes["floatVal"] = /^(-?\d+)(\.\d+)?$/; 
	Ext.form.VTypes["float"]=function(v){  
		return Ext.form.VTypes["floatVal"].test(v);  
	};
	Ext.form.VTypes["floatText"]=translations.inputFloatNum;  
    
	
	//开始日期不能大于结束日期   
	Ext.form.VTypes["dateRange"]= function(val, field){  
            if(field.dateRange){  
                var begin = field.dateRange.begin;
                beginSelector = 'datefield[begin='+ begin +']';
                this.beginField = Ext.ComponentQuery.query(beginSelector)[0];
                var end = field.dateRange.end;  
                endSelector = 'datefield[end='+ end +']';
                this.endField = Ext.ComponentQuery.query(endSelector)[0];
                var beginDate = this.beginField.getValue();  
                var endDate = this.endField.getValue();  
            }  
            if(beginDate == null || endDate == null){
            	return true;
            }
            if(beginDate <= endDate){  
                return true;  
            }else{  
                return false;  
            }  
        };
    Ext.form.VTypes["dateRangeText"]='开始日期不能大于结束日期';
    //开始时间不能大于结束时间
    Ext.form.VTypes["timeRange"]= function(val, field){  
		           if(field.timeRange){
		            if(field.timeRange.begin){//控制结束时间要大于开始时间
		               var beginId = field.timeRange.begin;   
		               this.beginField = Ext.getCmp(beginId);   
		               var beginDate = this.beginField.getValue();   
		            field.setMinValue(beginDate);//设置结束时间的最小值
		            }
		            if(field.timeRange.end){//控制开始时间要小于结束时间
		               var endId = field.timeRange.end;   
		               this.endField = Ext.getCmp(endId);   
		               var endDate = this.endField.getValue();   
		            field.setMaxValue(endDate);//设置开始时间最大值
		            }
		            return true;
		           }   
		           return false;
		};
	Ext.form.VTypes["timeRangeText"]='开始时间不能大于结束时间';
    //校验密码一致性
    Ext.form.VTypes["password"]=function(val,field){
    	if(field.password){
    		var fresh = field.password.fresh;
    		freshSelector='textfield#newPassword';
    		this.freshField=Ext.ComponentQuery.query(freshSelector)[0];
    		var sure=field.password.sure;
    		sureSelector='textfield#sureNewPassword';
    		this.sureField=Ext.ComponentQuery.query(sureSelector)[0];
    		var newPassword=this.freshField.getValue();
    		var sureNewPassword=this.sureField.getValue();
    	}
    	if(newPassword==sureNewPassword){
    		return true;
    	}
    	else{
    	
    		return false;
    	}
    };
    Ext.form.VTypes["passwordText"]='两次密码不一样请检查!';
    
	//校验合法的包序号
	Ext.apply(Ext.form.field.VTypes, {
		ladleSeq: function(val, field) {
		return /\d{2}(((0[1-9])|(1[0-2])))(((0[1-9])|([1-2][0-9])|(3[0-1])))\d{3}/.test(val);        
		},
		ladleSeqText: '请输入合法的包序号'
	});
	
	//校验槽号
	Ext.apply(Ext.form.field.VTypes, {
		cellId: function(val, field) {
		 var isValid= /\d{4}/.test(val); 
		 if(isValid){
			 isValid =  parseInt(val)>1000&&parseInt(val)<8138?true:false;			 
		 }
		 return isValid;
		},
		cellIdText: '请输入合法的槽号'
	});
		
	//校验检测项目值
	Ext.apply(Ext.form.field.VTypes, {
		inspectedResult: function(val, field) {
		 return /^(((0\.\d*)|([1-9]+\d*\.\d+)|(\d*[1-9]\d*))|((-?((\d+\.\d+)|([1-9]+\d*)))(E-?)([1-9]{1})\d*))$/.test(val);
		},
		inspectedResultText: '请输入合法的数值',
		inspectedResultMask:/[.0-9E]/
	});
	
	//校验车号
	Ext.apply(Ext.form.field.VTypes, {
		trainNo: function(val, field) {
		 return /^[0-9]{7}$/.test(val);
		},
		trainNoText: '请输入7位数字',
		trainNoMask:/[0-9]/
	});
	
		//校验铝导杆编号
	Ext.apply(Ext.form.field.VTypes, {
		guideNo: function(val, field) {
		 return /^[1-2]{1}[0-9]{4}$/.test(val);
		},
		guideNoText: '请输入合法的铝导杆号',
		guideNoMask:/[0-9]/
	});
	
	/** dateRange:{'begin':'', 'middle':'','end':''}  为空不判断 (只应用于父组件是form)**/
	Ext.form.VTypes["threeDataCompare"]= function(val, field){
		var parent = field.ownerCt;
		if(!Ext.isEmpty(field.dateRange)&&parent.xtype=='form'){
		var begin = parent.query(field.xtype+'#'+field.dateRange.begin)[0].getValue();
		var middle = parent.query(field.xtype+'#'+field.dateRange.middle)[0].getValue();
		var end = parent.query(field.xtype+'#'+field.dateRange.end)[0].getValue();
			if(!Ext.isEmpty(begin)){
		        if(!Ext.isEmpty(middle) || !Ext.isEmpty(end)){
		        	return true;
		        }else if(middle <= end){  
		            return true;  
		        }else{  
		            return false;  
		        }
	       	} 
	    }else if(!Ext.isEmpty(middle)){
	    	if(!Ext.isEmpty(end)||begin <= end){
	    		 return false;  
	    	}else {
	    		 return true;
	    	}
	    }else{
	    	if(!Ext.isEmpty(end)){
	    		if(begin <= middle){
	    			return false;
	    		}else{
	    			return true;
	    		}
	    	}else{
	    		if(begin<=middle&&middle<=end){
	    			return false;
	    		}else{
	    			return true;
	    		}
	    	}
	    }
    };
    //
	Ext.apply(Ext.form.field.VTypes, {
		anodePosition: function(val, field) {
		return /^[A-B]((0[1-9])|(1[0-9])|(2[0-4]))$/.test(val);        
		},
		anodePositionText: '请输入合法的位置号'
	});