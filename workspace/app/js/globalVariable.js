	var translations;
	var systemProperties;
	var loginId;
	var crewId;
	var shiftId;
	var activitiAuth;
	var appServerDate;
	var gridHeaders={};
	
	function getSystemUserName(userId) {
		if (!Ext.isEmpty(userId)) {			
			var user = Sgai.config.Runtime.getAllUserInfo()[userId];
			var userName = null;
			if(!Ext.isEmpty(user)) {
				userName=user['userNameCn'];
		    }		    
		    return userName||userId;
		} else {
			return "NA";
		}		
	 }
	 function getSystemUserGroup(crewId) {
	 	if (!Ext.isEmpty(crewId)) {		
	 		if (crewId == "1") {
	 			return "甲";
	 		}
	 		if (crewId == "2") {
	 			return "乙";
	 		}
	 		if (crewId == "3") {
	 			return "丙";
	 		}
	 		if (crewId == "4") {
	 			return "丁";
	 		}
	 	} else {
			return "NA";
	 	}
	 }
	 function getSystemUserShift(shiftId) {
	 	if (!Ext.isEmpty(shiftId)) {		
	 		if (shiftId == "1") {
	 			return "早";
	 		}
	 		if (shiftId == "3") {
	 			return "晚";
	 		}
	 	}
	 }
	 
	 function getGridHeaderByUserAndGridId(gridId) {
		 var userId = Sgai.config.Runtime.getUserName();
		 var userGrids = gridHeaders[userId];
		 var gridColumns = '';
		 if (!Ext.isEmpty(userGrids)) {
			 gridColumns = userGrids[gridId];
			 if (Ext.isEmpty(gridColumns)) {
				var adminGrids = gridHeaders[systemProperties['grid.header.user']];
				if(!Ext.isEmpty(adminGrids)){
					gridColumns = adminGrids[gridId];	
				}
			 }
		 } else {
			var adminGrids = gridHeaders[systemProperties['grid.header.user']];
			if(!Ext.isEmpty(adminGrids)){
				gridColumns = adminGrids[gridId];	
			}
		 }
		 return gridColumns;
	 }
	 
	 function getComboxValues(keyId, value) {
		var mains = Sgai.config.Runtime.getComboxValues();
		var _main;
		var _items;
		var flag = false;
		Ext.each(mains, function(main){
			if (main.keyId==keyId) {
				_main = main;
				flag=true;
				return false;
			}
		});
		if (flag) {
			_items = _main.items;
		} else {
			var url = 'combo/combo/findComboBoxValue.action';
			var params = {
				'tableName' : 'sys_dom_values',
    			'displayField' : 'high_value',
				'valueField' : 'low_value',
				'filterName' : 'dom_id',
				'filterValue' : keyId
			};
			Ext.Ajax.request({
					url : url,
					method : 'post',
					params : params,
					async : false, // 同步
					success : function(response, options) {
								var reText = response.responseText;
								if (reText == "")
									return;
								var text = Ext.decode(reText);
								var records = text.items;
								var main = {};
	                            main.keyId = keyId;
	                            main.items = records;
	                            _items = records;
	                            mains.push(main);
					},
					failure : function(response, options) {
					}
			});
		}
		var itemName = '';
		Ext.each(_items, function(item){
			if (item.value==value) {
				itemName = item.key;
				return false;
			}
		});
	    return itemName;
	 }
	 
	 //by zhaoleilei for 自定义渲染下拉框的值（不取sys_dom_values）
	function getComboxValuesByCustom(keyId, value,tableName,highValue,lowValue,filterName,filterValue) {
		var mains = Sgai.config.Runtime.getComboxValues();
		var _main;
		var _items;
		var flag = false;
		Ext.each(mains, function(main) {
					if (main.keyId == keyId) {
						_main = main;
						flag = true;
						return false;
					}
				});
		if (flag) {
			_items = _main.items;
		} else {
			var url = 'combo/combo/findComboBoxValue.action';
			var params = {
				'tableName' : tableName,
				'displayField' : highValue,
				'valueField' : lowValue,
				'filterName' : filterName,
				'filterValue' : filterValue
			};
			Ext.Ajax.request({
						url : url,
						method : 'post',
						params : params,
						async : false, // 同步
						success : function(response, options) {
							var reText = response.responseText;
							if (reText == "")
								return;
							var text = Ext.decode(reText);
							var records = text.items;
							var main = {};
							main.keyId = keyId;
							main.items = records;
							_items = records;
							mains.push(main);
						},
						failure : function(response, options) {
						}
					});
		}
		var itemName = '';
		Ext.each(_items, function(item) {
					if (item.value == value) {
						itemName = item.key;
						return false;
					}
				});
		return itemName;
	}
	 
	 function getCommonTypeItemName(typeId, value) {
		var items = Sgai.config.Runtime.getCommonTypeItems();	
	    var item = items[typeId];
	    var itemName=item[value];
	    return itemName;
	 }
	 
	 function checkBrowserVersion(){
    	var browser = {};
    	var userAgent = navigator.userAgent.toLowerCase();
    	var s;
	    (s = userAgent.match(/msie ([\d.]+)/))
	           ? browser.ie = s[1]
	            : (s = userAgent.match(/firefox\/([\d.]+)/))
	                    ? browser.firefox = s[1]
	                    : (s = userAgent.match(/chrome\/([\d.]+)/))
	                            ? browser.chrome = s[1]
	                           : (s = userAgent.match(/opera.([\d.]+)/))
	                                    ? browser.opera = s[1]
	                                    : (s = userAgent
	                                            .match(/version\/([\d.]+).*safari/))
	                                            ? browser.safari = s[1]
	                                            : 0;
		var version = "";
		var isLower = false;
		if (browser.ie) {
			version = browser.ie;
			if (parseInt(version.substring(0, version.indexOf(".")))<9) {
				isLower = true;
			}			
		} else if (browser.firefox) {
			version = browser.firefox;
			if (parseInt(version.substring(0, version.indexOf(".")))<22) {
				isLower = true;
			}
		} else if (browser.chrome) {
			version = browser.chrome;
			if (parseInt(version.substring(0, version.indexOf(".")))<22) {
				isLower = true;
			}
		} else if (browser.opera) {
			version = browser.opera;
		    if (parseInt(version.substring(0, version.indexOf(".")))<12) {
				isLower = true;
			}
		} else if (browser.safari) {
			version = browser.safari;
		    if (parseInt(version.substring(0, version.indexOf(".")))<4) {
				isLower = true;
			}
		} else {
			isLower = false;
		}
		//isLower = true;
	    return isLower;
	}
    
	function getBrowserVersion(){
    	var browser = {};
    	var userAgent = navigator.userAgent.toLowerCase();
    	var s;
	    (s = userAgent.match(/msie ([\d.]+)/))
	           ? browser.ie = s[1]
	            : (s = userAgent.match(/firefox\/([\d.]+)/))
	                    ? browser.firefox = s[1]
	                    : (s = userAgent.match(/chrome\/([\d.]+)/))
	                            ? browser.chrome = s[1]
	                           : (s = userAgent.match(/opera.([\d.]+)/))
	                                    ? browser.opera = s[1]
	                                    : (s = userAgent
	                                            .match(/version\/([\d.]+).*safari/))
	                                            ? browser.safari = s[1]
	                                            : 0;
		var version = "";
		var isLower = false;
		if (browser.ie) {
			version = 'Microsoft Internet Explorer ' + browser.ie;		
		} else if (browser.firefox) {
			version = 'Mozilla Firefox ' + browser.firefox;
		} else if (browser.chrome) {
			version = 'Google Chrome ' + browser.chrome;
		} else if (browser.opera) {
		    version = 'Opera ' + browser.opera;
		} else if (browser.safari) {
		    version = 'Safari ' + browser.safari;
		} else {
		    version = '未知的浏览器类型';
		}		
		version = "浏览器:" + version;
	    return version;
	}