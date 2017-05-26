var globleInputParams;
function dayDiff(dateStr1,dateStr2){
	var date1 = globleInputParams[dateStr1];
	var date2 = globleInputParams[dateStr2];
	var dateEnd = new Date(); //终止日期
	var dateBegin = new Date("2014","12","01");//开始日期
	
	var dateArr = "";
	if(date1 && date1!=""){
		dateArr = date1.substring(0,10).split("-");
		dateEnd = new Date(dateArr[0],dateArr[1],dateArr[2]);
	}
	if(date2 && date2!=""){
		dateArr = date2.substring(0,10).split("-");
		dateBegin = new Date(dateArr[0],dateArr[1],dateArr[2]);
	}
	iDays = parseInt(Math.abs(dateEnd - dateBegin)/1000/60/60/24);
	if((dateEnd - dateBegin)<0){
		return -iDays;
    }
 return iDays; 
}

//必输项函数
function required(fieldName){
	var fieldValue = globleInputParams[fieldName];
	if(!fieldValue || fieldValue===""){
		return false;
	}
	return true;
	
}