Ext.define('Sgai.util.Util', {

	statics : {

		required : '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',

		getSelectedRecords : function(grid) {
			if (grid)
				return grid.getSelection();
		},

		isAccessible : function(privilegeCode) {
			return Ext.Array.contains(Sgai.config.Runtime.getBtnPrivileges(),
					privilegeCode);
		},

		convertFlagDisplay : function(flag) {
			if (flag && flag == 1) {
				return translations.defectYess;
			}
			return translations.defectNos;
		},

		getCurrentDataAndWeekDay : function() {
			var x = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
			// var x = new Array(translations.sun, translations.mon,
			// translations.tues,translations.wed,translations.thur,
			// translations.fri,translations.sat);
			var d = new Date();
			var s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-"
					+ d.getDate() + "　";
			s += x[d.getDay()];
			return s;
		},
		decodeJSON : function(text) {

			var result = Ext.JSON.decode(text, true);

			if (!result) {
				result = {};
				result.success = false;
				result.msg = text;
			}

			return result;
		},
		// 编辑前处理
		cellBerfoeEdit : function(editor, e, eOpts) {
			var isadd = e.record.phantom;
			var iseditable = true;
			if (!isadd) {
				Ext.each(e.grid.headerCt.items.items, function(item) {
							if (item.dataIndex == e.field) {
								var updatedable = item.updatedable;
								if (updatedable != null) {
									if (updatedable == false) {
										iseditable = false;
									}
								}

							}
						});
			}
			return iseditable;
		},
		onButtonClickSave : function(button, e, options) {
			var gridPanel = button.up('gridpanel');
			// 校验必填项目
			var newRec = gridPanel.getStore().getNewRecords();
			var updateRec = gridPanel.getStore().getUpdatedRecords();
			var removeRec = gridPanel.getStore().getRemovedRecords();
			if (Sgai.util.Util.validRecords(gridPanel, newRec)
					&& Sgai.util.Util.validRecords(gridPanel, updateRec)) {
				var store = gridPanel.getStore();
				Sgai.util.Util.storeSync(store);
			}

		},

		validRecords : function(gridPanel, vRecords) {
			var falg = true;
			if (vRecords == "") {
				return true;
			}
			for (var i = 0; i < vRecords.length; i++) {
				var record = vRecords[i];
				var columns = gridPanel.columns;
				Ext.each(columns, function(item) {
							if (item.allowBlank == false) {
								var data = record.get(item.itemId);
								if (data === null || data === '') {
									Sgai.util.Util.showErrorMsg(item.text
											+ ' 不能为空!');
									falg = false;
									return false;
								}
							}
						});
			};
			return falg;
		},

		validRecordsFordataIndex : function(gridPanel, vRecords) {
			var falg = true;
			if (vRecords == "") {
				return true;
			}
			for (var i = 0; i < vRecords.length; i++) {
				var record = vRecords[i];
				var columns = gridPanel.columns;
				Ext.each(columns, function(item) {
							if (item.allowBlank == false) {
								var data = record.get(item.dataIndex);
								if (data === null || data === '') {
									Sgai.util.Util.showErrorMsg(item.text
											+ ' 不能为空!');
									falg = false;
									return false;
								}
							}
						});
			};
			return falg;
		},

		/*
		 * ForDight(Dight,How):数值格式化函数，Dight要 格式化的 数字，How要保留的小数位数。
		 */
		ForDight : function(Dight, How) {
			Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
			return Dight;
		},
		// 字符串转成Time(dateDiff)所需方法,YMDHMS
		stringToTimeYMDHMS : function(string) {
			var f = string.split(' ', 2);
			var d = (f[0] ? f[0] : '').split('-', 3);
			var t = (f[1] ? f[1] : '').split(':', 3);
			return (new Date(parseInt(d[0], 10) || null,
					(parseInt(d[1], 10) || 1) - 1, parseInt(d[2], 10) || null,
					parseInt(t[0], 10) || null, parseInt(t[1], 10) || null,
					parseInt(t[2], 10) || null)).getTime();
		},

		// 字符串转成Time(dateDiff)所需方法,YMD
		stringToTimeYMD : function(string) {
			var f = string.split(' ', 2);
			var d = (f[0] ? f[0] : '').split('-', 3);
			return (new Date(parseInt(d[0], 10) || null,
					(parseInt(d[1], 10) || 1) - 1, parseInt(d[2], 10) || null))
					.getTime();
		},
		dateDiff : function(date1, date2, format) {
			var type1 = typeof date1, type2 = typeof date2;
			if (type1 == 'string')
				date1 = format == 'YMD' ? this.stringToTimeYMD(date1) : this
						.stringToTimeYMDHMS(date1);
			else if (date1.getTime)
				date1 = date1.getTime();
			if (type2 == 'string')
				date2 = format == 'YMD' ? this.stringToTimeYMD(date2) : this
						.stringToTimeYMDHMS(date2);
			else if (date2.getTime)
				date2 = date2.getTime();
			return ((date1 - date2) / (1000 * 60 * 60)) + 24; // 结果是小时
		},

		pagingToolbarStore : function(store) {
			return Ext.create('Ext.PagingToolbar', {
						store : store,
						displayInfo : true,
						dock : 'bottom',
						beforePageText : translations.thePage,

						afterPageText : (Ext.isEmpty(translations.page)
								? ""
								: translations.page)
								+ " "
								+ (Ext.isEmpty(translations.totalPage)
										? ""
										: translations.totalPage)
								+ " {0} "
								+ (Ext.isEmpty(translations.pages)
										? ""
										: translations.pages),
						firstText : translations.firstText,
						prevText : translations.prevText,
						nextText : translations.nextText,
						lastText : translations.lastText,
						refreshText : translations.refreshText,
						displayMsg : translations.show + ' {0}-{1} '
								+ translations.rows + ',' + translations.total
								+ ' {2} ' + translations.rows,
						emptyMsg : translations.noRecord,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					});
		},
		onButtonClickQuery : function(button, e, options) {
			var gridPanel = button.up('gridpanel');
			var formPanel = gridPanel.up('panel').down('form');
			// 设置提交参数
			var params = Sgai.util.Util.getFormParams(formPanel);
			// params['qm.collectFlagNotOne'] = 1;//查询未汇总的数据,放到view中hidden
			var store = gridPanel.getStore();
			store.proxy.extraParams = params;
			store.load({});
		},
		onButtonClickReset : function(button, e, options) {
			button.up('gridpanel').up('panel').down('form').getForm().reset();
		},

		onButtonClickRemove : function(button, e, options) {
			var gridPanel = button.up('gridpanel');
			var store = gridPanel.getStore();
			var sels = gridPanel.getSelectionModel().getSelection();
			Ext.Msg.confirm('操作提示', '是否确定删除所选的' + sels.length + '条记录？',
					function(btn) {
						if (btn == 'yes') {
							for (var i = 0; i < sels.length; i++) {
								store.remove(sels[i]); // 调用 Store 的 remove 方法
							}

							store.sync({
										success : function() {
											Ext.MessageBox.show({
														title : '操作提示',
														msg : '删除成功！',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
										},
										failure : function() {
											Ext.MessageBox.show({
														title : '操作提示',
														msg : '删除失败，请检查异常信息！',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
										}
									});
						}
					});
		},
		storeSync : function(store) {
			Ext.Msg.confirm(translations.operateMsgWinTitle,
					translations.operateConfirm, function(btn) {
						if (btn == 'no') {
							return;
						} else {
							store.sync({
								success : function(batch, options) {
									Sgai.util.Util
											.showTipMsg(translations['operateSuccess']);
									store.load({});
								},
								failure : function(batch, options) {
									var errMsg = "";
									for (var i = 0; i < batch.exceptions.length; i++) {
										var error = batch.exceptions[i].error;
										var errorObj = Ext.decode(error.response.responseText);
										var errorStr = errorObj.meta.message;
										errMsg = errorStr + "<br/>";
									}
									Sgai.util.Util.showErrorMsg(errMsg);
								}
							});
						}
					});
		},
		storeSyncWithoutConfirm : function(store) {
			store.sync({
						success : function(batch, options) {
							Sgai.util.Util
									.showTipMsg(translations['operateSuccess']);
							store.load({});
						},
						failure : function(batch, options) {
							var errMsg = "";
							for (var i = 0; i < batch.exceptions.length; i++) {
								var error = batch.exceptions[i].error;
								errMsg = error + "<br/>";
							}
							Sgai.util.Util.showErrorMsg(errMsg);
							// store.load({
							//							 	               
							// });
						}
					});
		},

		pagingToolbar : function(store) {
			return Ext.create('Ext.PagingToolbar', {
						store : store,
						displayInfo : true,
						dock : 'bottom',
						beforePageText : translations.thePage,

						afterPageText : (Ext.isEmpty(translations.page)
								? ""
								: translations.page)
								+ " "
								+ (Ext.isEmpty(translations.totalPage)
										? ""
										: translations.totalPage)
								+ " {0} "
								+ (Ext.isEmpty(translations.pages)
										? ""
										: translations.pages),
						firstText : translations.firstText,
						prevText : translations.prevText,
						nextText : translations.nextText,
						lastText : translations.lastText,
						refreshText : translations.refreshText,
						displayMsg : translations.show + ' {0}-{1} '
								+ translations.rows + ',' + translations.total
								+ ' {2} ' + translations.rows,
						emptyMsg : translations.noRecord,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]
					});
		},

		datetimeFormat : function(value) {
			if (!value || typeof value === 'string')
				return value;
			else
				return Ext.Date.format(value, 'Y-m-d H:i:s');
		},

		showTipMsg : function(text) {
			return Ext.MessageBox.show({
						title : translations.operateMsgWinTitle,
						msg : text,
						maxWidth : 800,
						maxHeight : 400,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.INFO
					});
		},
		getUuid : function() {
			return new UUID().createUUID();
		},
		showErrorMsg : function(text) {
			return Ext.MessageBox.show({
						title : translations.errMsgWinTitle,
						msg : text.replace(/^\r\n$/mg,'<br/>'),
						maxWidth : 800,
						maxHeight : 400,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.ERROR
					});
		},

		getFormParams : function(form) {
			var componets = ['textfield', 'combobox', 'numberfield',
					'datefield', 'remotecombo', 'fileuploadfield',
					'commontypecombobox', 'datetimefield', 'checkcombo',
					'remotecheckcombo', 'hiddenfield', 'textareafield',
					'poptextfield', 'textarea', 'custDeptTxtSelector',
					'sgaiDeptTxtSelector', 'sgaiStaffTxtSelector',
					'periodcombobox'];
			var params = {

			};

			form.getForm().getFields().each(function(item, index, length) {
				var itemName = '';
				var itemType = item.getXType();
				if (Ext.Array.contains(componets, item.getXType())) {
					if (!Ext.isEmpty(item.getName())
							&& item.getName().indexOf("-") < 0) {
						itemName = item.getName();
					} else if (!Ext.isEmpty(item.getItemId())) {
						itemName = item.getItemId();
					}
					if (!Ext.isEmpty(itemName)) {
						if (itemType == 'datefield' && item.submitValue) {
							var submitFormat = item.submitFormat;
							if (Ext.isEmpty(submitFormat)) {
								submitFormat = 'Y-m-d H:i:s';
							}
							var itemValue = Ext.Date.format(item.getValue(),
									submitFormat);
							if (!Ext.isEmpty(itemValue)) {
								params[itemName] = itemValue;
							}
						} else if (itemType == 'datetimefield') {
							var submitFormat = item.submitFormat;
							if (Ext.isEmpty(submitFormat)) {
								submitFormat = 'Y-m-d H:i:s';
							}
							var itemValue = Ext.Date.format(item.getValue(),
									submitFormat);
							if (!Ext.isEmpty(itemValue)) {
								params[itemName] = itemValue;
							}
						} else {
							var itemValue = item.getValue();
							if (!Ext.isEmpty(itemValue)) {
								params[itemName] = itemValue;
							}
						}
					}
				}
			});
			console.log(params);
			return params;
		},
		getReportFormParams : function(form) {
			var componets = ['textfield', 'combobox', 'numberfield',
					'datefield', 'remotecombo', 'fileuploadfield',
					'commontypecombobox', 'datetimefield', 'checkcombo',
					'remotecheckcombo', 'hiddenfield', 'textareafield',
					'poptextfield', 'textarea', 'custDeptTxtSelector',
					'sgaiDeptTxtSelector', 'sgaiStaffTxtSelector',
					'periodcombobox', 'monthfield'];
			var params = {
				action : 'read',
				start : 0
			};

			form.getForm().getFields().each(function(item, index, length) {
				var itemName = '';
				var itemType = item.getXType();
				if (Ext.Array.contains(componets, item.getXType())) {
					if (!Ext.isEmpty(item.getName())
							&& item.getName().indexOf("-") < 0) {
						itemName = item.getName();
					} else if (!Ext.isEmpty(item.getItemId())) {
						itemName = item.getItemId();
					}
					if (!Ext.isEmpty(itemName)) {
						if (itemType == 'datefield' && item.submitValue) {
							var submitFormat = item.submitFormat;
							if (Ext.isEmpty(submitFormat)) {
								submitFormat = 'Y-m-d H:i:s';
							}
							var itemValue = Ext.Date.format(item.getValue(),
									submitFormat);
							if (!Ext.isEmpty(itemValue)) {
								params[itemName] = itemValue;
							}
						} else if (itemType == 'datetimefield'
								|| itemType == 'monthfield') {
							var submitFormat = item.submitFormat;
							if (Ext.isEmpty(submitFormat)) {
								submitFormat = 'Y-m-d H:i:s';
							}
							var itemValue = Ext.Date.format(item.getValue(),
									submitFormat);
							if (!Ext.isEmpty(itemValue)) {
								params[itemName] = itemValue;
							}
						} else if (itemType == 'checkcombo'
								|| itemType == 'remotecheckcombo') {
							var itemValue = item.getValue();
							if (!Ext.isEmpty(itemValue)) {
								params[itemName] = itemValue;
								params[itemName + 'Flag'] = 1;
							}
						} else {
							var itemValue = item.getValue();
							if (!Ext.isEmpty(itemValue)) {
								params[itemName] = itemValue;
							}
						}
					}
				}
			});
			// console.log(params);
			return params;
		},
		// 报表查询逻辑验证函数
		validateFormByExp : function(validateExp) {
			if (validateExp && validateExp != "") {
				var validateExpArr = validateExp.split(";");
				for (var i = 0; i < validateExpArr.length; i++) {
					var subValidateExpArr = validateExpArr[i].split("^");
					var rtn = eval(subValidateExpArr[0]);
					if (!rtn) {
						Ext.Msg.alert(subValidateExpArr[1]);
						return rtn;
					}
				}
			}
			return true;
		},
		exportExcel : function(url, grid, params) {
			var columns = grid.columns;
			var exportCols = "";
			var exportColsDesc = "";
			var convertCol = "";

			for (var i = 0; i < columns.length; i++) {
				var column = columns[i];
				if (column.xtype == 'gridcolumn' && !column.hidden) {
					exportCols = exportCols + column.dataIndex + ",";
					exportColsDesc = exportColsDesc + column.text + ",";
				}
				if (!Ext.isEmpty(column.convertCode)) {
					convertCol = convertCol + column.dataIndex + ":"
							+ column.convertCode + ",";
				}
			}
			if (exportCols.length > 0)
				exportCols = exportCols.substring(0, exportCols.length - 1);
			if (exportColsDesc.length > 0)
				exportColsDesc = exportColsDesc.substring(0,
						exportColsDesc.length - 1);
			if (convertCol.length > 0)
				convertCol = convertCol.substring(0, convertCol.length - 1);

			// get 方式提交请求在IE下会存在URL超长问题(最大2048byte)
			// 此处将get方式改为Post方式提交，以解决此问题
			var exportForm = document.createElement("form");
			document.body.appendChild(exportForm);
			exportForm.id = Sgai.util.Util.getUuid();
			exportForm.method = "POST";
			// exportForm.target = "_SELF";
			exportForm.action = url;

			for (var attr in params) {
				var varValue = params[attr];
				var varInput = document.createElement("input");
				varInput.setAttribute('type', 'hidden');
				varInput.setAttribute('name', attr);
				varInput.setAttribute('value', varValue)
				exportForm.appendChild(varInput);
			}

			// 表头列
			var exportColsInput = document.createElement("input");
			exportColsInput.setAttribute('type', 'hidden');
			exportColsInput.setAttribute('name', 'qm.col');
			exportColsInput.setAttribute('value', exportCols)
			exportForm.appendChild(exportColsInput);

			// 表头列描述
			var exportColsDescInput = document.createElement("input");
			exportColsDescInput.setAttribute('type', 'hidden');
			exportColsDescInput.setAttribute('name', 'qm.desc');
			exportColsDescInput.setAttribute('value', exportColsDesc)
			exportForm.appendChild(exportColsDescInput);

			// 列转换
			var convertColInput = document.createElement("input");
			convertColInput.setAttribute('type', 'hidden');
			convertColInput.setAttribute('name', 'qm.convertCol');
			convertColInput.setAttribute('value', convertCol)
			exportForm.appendChild(convertColInput);

			// console.log(exportForm);
			exportForm.submit();
			document.body.removeChild(exportForm);
		},
		exportExcelByRunqian : function(template, excelName, param) {
			var url = 'common/runqian-excel-down!export.action';
			var params = {};
			params['template'] = template;
			params['excelName'] = excelName;
			params['param'] = param;

			var paramStr = Ext.urlEncode(params);
			url = url + '?' + paramStr;
			if (url.length > 2048) {
				showTipMsg("请求参数超长!");
				return;
			}
			var exportExcelDiv = document.getElementById('exportExcelDiv');
			if (exportExcelDiv) {
				exportExcelDiv.parentNode.removeChild(exportExcelDiv);
			}
			var iframe4export = window.report1_printIFrame;
			iframe4export.location.href = url;
		},
		downloadFile : function(url,params) {	
			var paramStr = Ext.urlEncode(params);
			url = url + '?' + paramStr;
			if (url.length>2048) {
				showTipMsg("请求参数超长!");
				return;
			}
			var iframe4export=window.report1_printIFrame;
			iframe4export.location.href = url;
		},
		exportDynamicGridExcel : function(url, excelName, params) {
			params['excelName'] = excelName;
			var paramStr = Ext.urlEncode(params);
			url = url + '?' + paramStr;
			if (url.length > 2048) {
				showTipMsg("请求参数超长!");
				return;
			}
			var iframe4export = window.report1_printIFrame;
			iframe4export.location.href = url;
		},
		saveDynamicGrid : function(args) {
			Sgai.util.Util.saveDynamicGridData(args.grid, args.url,
					args.groupByName, args.fieldName, args.fieldValueName
							|| 'value', args.successCallback,
					args.errorCallback);
		},
		saveDynamicGridData : function(grid, url, groupByName, fieldName,
				fieldValueName, successCallback, errorCallback) {
			// 整理要提交的数据
			var modifiedCols = [];
			grid.getStore().each(function(record) {
						var modifiedMap = record.modified;
						for (var key in modifiedMap) {
							var modifiedObj = new Object();
							modifiedObj[groupByName] = record.get(groupByName);
							modifiedObj[fieldName] = key;
							modifiedObj[fieldValueName] = record.get(key);
							modifiedCols.push(modifiedObj);
						}
					});
			if (modifiedCols.length == 0) {
				Ext.Msg.alert('验证错误', '没有记录可提交！');
				return;
			}
			var modifiedColsJson = Ext.encode(modifiedCols);

			// console.log(modifiedColsJson);
			var succCalback = function() {
				grid.getStore().commitChanges();// 将grid上的修改标记去掉
				if (successCallback)
					successCallback();
			};

			Sgai.util.Util.postAjaxRequestByJsonData(url, modifiedColsJson,
					false, succCalback, errorCallback)

		},

		pageSizeComb : function(grid) {
			// return new Ext.form.ComboBox({
			return Ext.create('Ext.form.ComboBox', {
						store : new Ext.data.SimpleStore({
									fields : ['text', 'value'],
									data : [['5', 5], ['10', 10], ['15', 15],
											['30', 30], ['40', 40], ['50', 50]]
								}),
						mode : 'local',
						displayField : 'text',
						valueField : 'value',
						editable : false,
						allowBlank : false,
						triggerAction : 'all',
						width : 60,
						listeners : {
							'render' : function(comboBox) {
								comboBox.setValue(comboBox.ownerCt.pageSize); // 使得下拉菜单的默认值是初始值

							},
							'select' : function(comboBox) {
								var pSize = comboBox.getValue();
								comboBox.ownerCt.pageSize = parseInt(pSize); // 改变PagingToolbar的pageSize
								// 值
								grid.store.pageSize = pSize;
								grid.store.proxy.extraParams.limit = pSize;
								grid.store.reload({});
							}
						}
					});
		},

		pagingToolbar : function(grid, pageSize) {

			return Ext.create('Ext.panel.Panel', {
						header : false,
						dock : 'bottom',
						itemId : 'pagingToolbarPanel',
						bbar : Ext.create('Ext.PagingToolbar', {
							itemId : 'pagingToolbar',
							pageSize : pageSize, // 每页显示几条数据
							store : grid.store,
							displayInfo : true, // 是否显示数据信息
							items : ['-', translations.perPage,
									Sgai.util.Util.pageSizeComb(grid),
									translations.rows],
							displayMsg : translations.show + ' {0}-{1} '
									+ translations.rows + ','
									+ translations.total + ' {2} '
									+ translations.rows,
							emptyMsg : translations.noRecord
								// 没有数据时显示信息
							})
					});
		},
		createComboBoxItemIdByStore : function(value, name, store, readOnly,
				params) {
			if (readOnly == null || readOnly == "undifined") {
				readOnly = false;
			}
			return Ext.create('Ext.form.field.ComboBox', {
						itemId : params.itemId,
						emptyText : (params == null || params.emptyText == null)
								? translations.pleaseSelect
								: params.emptyText,
						store : store,
						queryMode : 'remote',
						valueField : value,
						displayField : name,
						editable : true,
						readOnly : readOnly,
						width : (params == null || params.width == null)
								? 220
								: params.width,
						fieldLabel : params.fieldLabel,
						fieldStyle : params.fieldStyle,
						labelWidth : (params == null || params.labelWidth == null)
								? 95
								: params.labelWidth,
						labelAlign : (params == null || params.labelAlign == null)
								? 'right'
								: params.labelAlign,
						labelCls : (params == null || params.labelCls == null)
								? Ext.baseCSSPrefix + 'form-item-label'
								: params.labelCls,
						name : (params == null || params.name == null)
								? null
								: params.name,
						allowBlank : (params == null || params.allowBlank == null)
								? true
								: params.allowBlank
					});
		},
		createComboBoxByStore : function(value, name, store, readOnly) {
			if (readOnly == null || readOnly == "undifined") {
				readOnly = false;
			}
			return Ext.create('Ext.form.field.ComboBox', {
						itemId : 'comboxByStore',
						emptyText : translations.pleaseSelect,
						store : store,
						queryMode : 'remote',
						valueField : value,
						displayField : name,
						editable : false,
						readOnly : readOnly
					});
		},

		createCommonTypeComboBox : function(typeId, itemId, label, readOnly,
				params) {
			if (Ext.isEmpty(readOnly)) {
				readOnly = false;
			}
			var disabled = (params == null || params.disabled == null)
					? false
					: params.disabled;
			var width = (params == null || params.width == null)
					? 220
					: params.width;
			var labelWidth = (params == null || params.labelWidth == null)
					? 100
					: params.labelWidth;
			var labelAlign = (params == null || params.labelAlign == null)
					? 'right'
					: params.labelAlign;
			var defaultVal = (params == null || params.defaultVal == null)
					? null
					: params.defaultVal;
			var labelCls = (params == null || params.labelCls == null)
					? Ext.baseCSSPrefix + 'form-item-label'
					: params.labelCls;
			var store = new Ext.data.Store({
						storeId : itemId + "Store",
						model : 'Sgai.model.common.commonType.MdCommonTypeModel',
						autoLoad : true,
						async : false,
						proxy : {
							type : 'ajax',
							url : 'md/md-common-type/findItemsByTypeId.action',
							extraParams : {
								'qm.typeId' : typeId
							},
							reader : {
								type : 'json',
								rootProperty : 'items'
							}
						}
					});

			var combo = Ext.create('Ext.form.field.ComboBox', {
						itemId : itemId,
						width : width,
						name : (params == null || params.name == null)
								? ''
								: params.name,
						fieldLabel : label,
						labelWidth : labelWidth,
						labelAlign : labelAlign,
						emptyText : (params == null || params.emptyText == null)
								? translations.pleaseSelect
								: params.emptyText,
						store : store,
						queryMode : 'remote',
						valueField : 'typeId',
						displayField : 'typeName',
						editable : false,
						readOnly : readOnly,
						labelCls : labelCls,
						disabled : disabled,
						allowBlank : (params == null || params.alBlank == null)
								? true
								: params.alBlank
					});

			if (defaultVal != null) {
				store.addListener("load", function(store, records, successful,
								eOpts) {
							combo.setValue(defaultVal);
						});
			}
			return combo;
		},

		createMatsComboBox : function(typeId, itemId, label, readOnly, params,
				key, value, url) {
			if (readOnly == null || readOnly == "undifined") {
				readOnly = false;
			}
			var width = (params == null || params.width == null)
					? 220
					: params.width;
			var labelWidth = (params == null || params.labelWidth == null)
					? 70
					: params.labelWidth;
			var labelAlign = (params == null || params.labelAlign == null)
					? 'right'
					: params.labelAlign;
			var defaultVal = (params == null || params.defaultVal == null)
					? 0
					: params.defaultVal;

			var store = new Ext.data.Store({
						storeId : "packingStore",
						// model:model,
						model : 'Sgai.model.mm.PackingInfo',
						autoLoad : false,
						async : false,
						proxy : {
							type : 'ajax',
							url : url,
							reader : {
								type : 'json',
								rootProperty : 'items'
							}
						}
					});

			var combo = Ext.create('Ext.form.field.ComboBox', {
						itemId : itemId,
						width : width,
						name : itemId,
						fieldLabel : label,
						labelWidth : labelWidth,
						labelAlign : labelAlign,
						emptyText : label,
						store : store,
						queryMode : 'remote',
						valueField : key,
						displayField : value,
						editable : false
					});

			store.addListener("load", function(store, records, successful,
							eOpts) {
						if (defaultVal == 1) {
							combo.setValue(store.getAt(0).get('l4Mntar'));
						}
					});
			return combo;
		},

		isJsonString : function(textStr) {
			return /^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/
					.test(textStr);
		},

		// Ext.Ajax.request封装
		postAjaxRequestByParams : function(url, params, isAsync,
				successCallback) {
			isAsync = isAsync == null ? false : isAsync;
			Ext.Ajax.request({
						method : 'POST',
						url : url,
						async : isAsync,
						params : params,
						success : function(response) {
							var reText = response.responseText;
							if (reText == "")
								return;
							var text = Ext.decode(reText);
							var msg = text.meta.message;
							Ext.MessageBox.show({
										title : translations.operateMsgWinTitle,
										msg : msg,
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
							if (text.meta.success) {
								if (successCallback)
									successCallback(response);
							}
						},
						failure : function(response, opts) {
							var reText = response.responseText;
							var text = Ext.decode(reText);
							var msg = text.meta.message;
							Ext.MessageBox.show({
										title : translations.errMsgWinTitle,
										msg : msg,
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					});
		},

		postAjaxRequestByJsonData : function(url, jsonData, isAsync,
				successCallbackFn, failedCallbackFn, button) {
			if (!Ext.isEmpty(button)) {
				button.disabled = true;
			}
			isAsync = isAsync == null ? false : isAsync;
			Ext.Ajax.request({
						method : 'POST',
						url : url,
						jsonData : jsonData,
						async : isAsync,
						success : function(response) {
							var reText = response.responseText;
							if (reText == "")
								return;
							var text = Ext.decode(reText);
							var msg = text.meta.message;
							Ext.MessageBox.show({
										title : translations.operateMsgWinTitle,
										msg : translations[msg]
												? translations[msg]
												: msg,
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
							if (text.meta.success) {
								if (successCallbackFn != null) {
									successCallbackFn(response);
								}
							} else {
								if (failedCallbackFn != null) {
									failedCallbackFn(response);
								}
							}
							if (!Ext.isEmpty(button)) {
								button.disabled = false;
							}
						},
						failure : function(response, opts) {
							var reText = response.responseText;
							Sgai.util.Util.showErrorMsg(reText);
						}
					});
		},
		// 数据验证方法
		postAjaxValidateByJsonData : function(url, params, jsonData, isAsync,
				errorCallback, waningCallback, successCallback) {
			isAsync = isAsync == null ? false : isAsync;
			Ext.Ajax.request({
				method : 'POST',
				url : url,
				params : params,
				jsonData : jsonData,
				async : isAsync,
				success : function(response) {
					var reText = response.responseText;
					if (reText == "")
						return;
					var text = Ext.decode(reText);
					var msg = text.message;
					if (text.success) {
						if (msg.errors.length > 0) {
							var errorMsg = '<span style="color:red">存在如下错误:<br/>';
							errorMsg = errorMsg + msg.errors.join('<br/>')
									+ '</span><br/>';
							if (msg.warnings.length > 0) {
								errorMsg = errorMsg + '存在如下警告:<br/>';
								errorMsg = errorMsg
										+ msg.warnings.join('<br/>');
							}
							Ext.MessageBox.show({
										title : translations.operateMsgWinTitle,
										msg : errorMsg,
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
							if (errorCallback)
								errorCallback();
						} else if (msg.warnings.length > 0) {
							var warningMsg = '存在如下警告，是否继续操作？<br/>';
							warningMsg = warningMsg
									+ msg.warnings.join('<br/>');
							if (waningCallback) { // 如果有callBack，需要确认才调用
								Ext.Msg.confirm('提示', warningMsg,
										function(btn) {
											if (btn == 'yes') {
												waningCallback();;
											}
										});
							} else {// 没有callback直接显示错误信息
								Ext.MessageBox.show({
											title : translations.operateMsgWinTitle,
											msg : warningMsg,
											maxWidth : 800,
											maxHeight : 400,
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.INFO
										});
							}

						} else {// 验证通过直接调用回调
							if (successCallback)
								successCallback(response);
						}

					} else {
						Ext.MessageBox.show({
									title : translations.operateMsgWinTitle,
									msg : msg,
									maxWidth : 800,
									maxHeight : 400,
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.INFO
								});
					}

				},
				failure : function(response, opts) {
					var reText = response.responseText;
					Ext.MessageBox.show({
								title : translations.errMsgWinTitle,
								msg : reText,
								maxWidth : 800,
								maxHeight : 400,
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			});
		},
		// 表单提交方法
		postSubmitForm : function(form, url, successCallBack, failCallBack) {
			// if(form.getForm().isValid()){
			form.getForm().submit({
						url : url,
						waitMsg : '正在提交数据...',
						method : 'POST',
						submitEmptyText : false,
						success : function(form, action) {
							Ext.Msg.alert('操作成功', action.result.meta.message);
							if (successCallBack)
								successCallBack(action.result.data);
						},
						failure : function(form, action) {
							switch (action.failureType) {
								case Ext.form.Action.CLIENT_INVALID :
									Ext.Msg.alert("错误", "提交的表单数据无效,请检查!");
									break;
								case Ext.form.Action.CONNECT_FAILURE :
									Ext.Msg.alert('错误', '连接失败');
									break;
								case Ext.form.Action.SERVER_INVALID :
									Ext.Msg.alert('业务逻辑错误',
											action.result.message);
									if (failCallBack)
										failCallBack();
							}
						}
					});
			// }
		},
		postAjaxRequestXmlData : function(url, xmlData, isAsync) {
			isAsync = isAsync == null ? false : isAsync;
			Ext.Ajax.request({
						method : 'POST',
						url : url,
						xmlData : xmlData,
						async : isAsync,
						success : function(response) {
							var reText = response.responseText;
							if (reText == "")
								return;
							var text = Ext.decode(reText);
							Ext.MessageBox.show({
										title : translations.operateMsgWinTitle,
										msg : translations[text.message],
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						},
						failure : function(response, opts) {
							var reText = response.responseText;
							Ext.MessageBox.show({
										title : translations.errMsgWinTitle,
										msg : reText,
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					});
		},

		postAjaxRequest : function(url, params, isAsync, jsonData, xmlData) {
			isAsync = isAsync == null ? false : isAsync;
			Ext.Ajax.request({
						method : 'POST',
						url : url,
						jsonData : jsonData,
						xmlData : xmlData,
						async : isAsync,
						params : params,
						success : function(response) {
							var reText = response.responseText;
							if (reText == "")
								return;
							var text = Ext.decode(reText);
							Ext.MessageBox.show({
										title : translations.operateMsgWinTitle,
										msg : translations[text.message],
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.INFO
									});
						},
						failure : function(response, opts) {
							var reText = response.responseText;
							Ext.MessageBox.show({
										title : translations.errMsgWinTitle,
										msg : reText,
										maxWidth : 800,
										maxHeight : 400,
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					});
		},

		// [liuxing]一些常量和能复用的方法[START]
		getUserNameByPin : function(pin) {
			var allUsers = Sgai.config.Runtime.getAllUserInfo();
			return pin ? (allUsers
					? (allUsers[pin] ? allUsers[pin] : pin)
					: pin) : pin;
		},
		commDateFormat : 'Y-m-d',
		commTimeFormat : 'Y-m-d H:i:s',
		defaultBoolMap : {
			'true' : '是',
			'false' : '否'
		},
		convertBooleanDisplay : function(key, boolMap) {
			if (!boolMap)
				boolMap = this.defaultBoolMap;
			return boolMap[key];
		},
		syncStore : function(store, callback, failCallback) {
			var me = this;
			store.sync({
						success : function(batch) {
							if (!batch.isComplete) {
								me.showErrorMsg(batch.exceptions);
							} else if (callback)
								callback();
						},
						failure : function(batch, options) {
							var errMsg = "";
							for (var i = 0; i < batch.exceptions.length; i++) {
								var error = batch.exceptions[i].error;
								errMsg = error + "<br/>";
							}
							Sgai.util.Util.showErrorMsg(errMsg);
							me.showErrorMsg(errMsg);
							if (failCallback)
								failCallback();
						}
					});
		},
		/**
		 * 分页表单提交
		 * 
		 * @param form
		 *            表单控件引用
		 * @param grid
		 *            表格控件引用(绑定了remote store)
		 * @param callbackFn
		 *            异步请求的回调函数,不管请求的处理过程是否成功都会被调用
		 */
		postPageForm : function(form, grid, callbackFn) {
			var me = this;
			var store = grid.getStore();
			var formFields = form.getForm().getFields();
			var params = {};

			formFields.each(function(field) {
						var fieldValue;
						if (Ext.ComponentQuery.is(field, 'datefield')|| Ext.ComponentQuery.is(field, 'datetimefield')) {
							// 日期格式通过submitFormat或者显示值来获取字符串
							if (field.submitFormat) {
								fieldValue = Ext.Date.format(field.getValue(),
										field.submitFormat);
							} else {
								fieldValue = field.getRawValue();
							}
						} else {
							fieldValue = field.getValue();
						}
						params[field.getName()] = (fieldValue != undefined)
								? fieldValue
								: '';
					});

			store.on('beforeload', function(store) {
						Ext.apply(store.proxy.extraParams, params);
					});
			store.loadPage(1, {
						callback : function(records, operation, success) {
							if (operation.exception) {
								me.showErrorMsg(operation.error);
							}
							if (callbackFn && Ext.isFunction(callbackFn)) {
								callbackFn.apply(this, records, operation,
										success);
							}
						}
					});
		},
		// 此方法模拟Ext提交form时格式化表单数据的过程,
		// 专供postPageForm使用,请勿在其他地方复用
		_getFormFieldValue : function(field) {
			if (field.xtype === 'datefield') {
				return Ext.Date.format(field.getValue(), field.submitFormat);
			} else {
				return field.getValue();
			}
		},
		/**
		 * 使用Ext.grid.plugin.RowEditing提交更新的方法
		 * 
		 * @param context
		 *            edit事件的第二个参数,上下文.
		 */
		postEditRow : function(context) {
			if (!context)
				return;
			var me = this;
			var record = context.record;
			var modified = record.modified;
			var store = record.store;
			var editedData = record.data;
			var storeRecord = store.getAt(context.rowIdx);
			if (modified) {
				for (var pro in modified) {
					if (modified.hasOwnProperty(pro))
						storeRecord.set(pro, editedData[pro]);
				}
			}
			me.syncStore(store, function() {
						store.reload();
					});
		},
		deleteColumnClick : function(grid, rowIndex) {
			var me = this;
			var store = grid.getStore();
			Ext.MessageBox.confirm(translations.del,
					translations.delRowConfirm, function(btnId) {
						if (btnId === 'yes') {
							store.removeAt(rowIndex);
							me.syncStore(store);
						}
					});
		},
		/**
		 * 使用Ext.grid.plugin.RowEditing新增行的方法
		 * 
		 * @param grid
		 */
		addNewRow : function(grid) {
			var rowEditing = grid.findPlugin('rowediting');
			rowEditing.cancelEdit();

			var store = grid.getStore();

			var r = Ext.create(store.model.getName(), {
						sid : null,
						version : null
					});
			store.insert(0, r);
			rowEditing.startEdit(0, 0);
		},
		editSelectedRow : function(grid) {
			var me = this;
			var selected = grid.getSelectionModel().getSelection();
			if (selected && selected.length > 0) {
				if (selected.length > 1) {
					me.showErrorMsg(translations.cannotEditMultiRow);
				} else {
					var rowEditing = grid.findPlugin('rowediting');
					rowEditing.startEdit(selected[0], 0);
				}
			}
		},
		/**
		 * 使用Ext.grid.plugin.RowEditing取消新增行的方法
		 * 
		 * @param context
		 */
		cancelEditRow : function(context) {
			if (!context)
				return;
			var record = context.record;
			var isadd = record.phantom;
			var store = record.store;
			// 只有新增时才删除第一行(也就是插件新增的一行)
			if (store && isadd)
				store.removeAt(0);
		},
		/**
		 * rowEditing插件新增一行,然后这一行失去焦点(插件转到别的行上)时, 清除这一行记录.
		 * 该方法仅用于rowEditing的beforeedit事件
		 * 
		 * @param editor
		 * @param context
		 */
		clearNewRow : function(editor, context) {
			var store = this.getMaingrid().getStore();
			// 如果开始编辑时grid中有新插入的记录
			var newRecords = store.getNewRecords();
			var currRecord = context.record;
			if (newRecords && newRecords.length > 0) {
				for (var i = 0; i < newRecords.length; i++) {
					var insertedRecord = newRecords[i];
					// 并且这些新插入的记录不是当前编辑的行
					if (currRecord !== insertedRecord) {
						// 删除这些废弃的新增记录
						store.remove(insertedRecord);
					}
				}
			}
		},
		deleteSeletedRow : function(grid) {
			var me = this;
			Ext.MessageBox.confirm('批量删除', '确认删除所有选中的记录吗?', function(btnId) {
						if (btnId === 'yes') {
							var store = grid.getStore();
							Ext.each(grid.getSelectionModel().getSelection(),
									function(record) {
										store.remove(record);
									});
							me.syncStore(store);
						}
					});
		},
		/**
		 * 表单的reset按钮点击事件
		 * 
		 * @param button
		 *            reset按钮引用
		 */
		formReset : function(button) {
			button.up('form').getForm().reset();
		},

		/**
		 * 修改表单元素可用状态时,也要同时修改他对表单验证的关联 否则,当一个不可用元素验证未通过,也将使表单无法提交
		 * 
		 * @param field
		 *            表单元素,需要包含setDisabld方法
		 * @param disabled
		 *            true时元素转换为不可用,false时转换为可用
		 */
		switchFormFieldDisable : function(field, disabled) {
			if (field.disabled !== disabled) {
				if (Ext.isFunction(field.setDisabled))
					field.setDisabled(disabled);
				field.up('form').getForm().clearInvalid().isValid();
			}
		},
		factoryCombo : function(form, opt) {
			var _opt = Ext.Object.merge({
				insertIndex : 0,
				branchCmpName : 'branchCmpId',
				workShopName : 'workShopName',
				workAreaName : 'workAreaName',
				branchCmpLabelField : translations.storage.matApplication.demandBranchCmp,
				workShopLabelField : translations.storage.matApplication.demandWorkshop,
				workAreaLabelField : translations.storage.matApplication.demandWorkArea,
				branchCmpAllowBlank : false,
				workShopAllowBlank : false,
				workAreaAllowBlank : true,
				itemId : new Ext.data.UuidGenerator().generate(),
				itemName : 'items',
				privilegeFlag : null
			}, opt);
			if (form && !form.hasFactoryCombo) {
				var formType = form.xtype;
				form.itemId = _opt.itemId;
				var items = form[_opt.itemName];
				var dataUrl = 'combo/combo/findBranchCompany.action';
				var rootName = 'items';

				var branchCmpStore = Ext.create('Ext.data.Store', {
							fields : [{
										name : 'key',
										type : 'string'
									}, {
										name : 'value',
										type : 'string'
									}],
							proxy : {
								type : 'ajax',
								url : dataUrl,
								reader : {
									type : 'json',
									rootProperty : rootName
								},
								extraParams : {
									type : 'branchCmp',
									privilegeFlag : _opt.privilegeFlag
								}
							}
						}), workShopStore = Ext.create('Ext.data.Store', {
							fields : [{
										name : 'key',
										type : 'string'
									}, {
										name : 'value',
										type : 'string'
									}],
							proxy : {
								type : 'ajax',
								url : dataUrl,
								reader : {
									type : 'json',
									rootProperty : rootName
								},
								extraParams : {
									privilegeFlag : _opt.privilegeFlag
								}
							}
						}), workAreaStore = Ext.create('Ext.data.Store', {
							fields : [{
										name : 'key',
										type : 'string'
									}, {
										name : 'value',
										type : 'string'
									}],
							proxy : {
								type : 'ajax',
								url : dataUrl,
								reader : {
									type : 'json',
									rootProperty : rootName
								},
								extraParams : {
									privilegeFlag : _opt.privilegeFlag
								}
							}
						});

				var branchCmpCombo = {
					xtype : 'combo',
					fieldLabel : _opt.branchCmpLabelField,
					allowBlank : _opt.branchCmpAllowBlank,
					store : branchCmpStore,
					name : _opt.branchCmpName,
					displayField : 'key',
					valueField : 'value',
					queryMode : 'local',
					editable : false,
					sgaiStoreLoaded : false,
					listeners : {
						render : function(combo) {
							if (!combo.sgaiStoreLoaded) {
								combo.getStore().load({
									callback : function(records, operation,
											success) {
										/*
										 * if(!combo.value && records &&
										 * records.length>0){
										 * combo.select(records[0]); }
										 */
									}
								});
								combo.sgaiStoreLoaded = true;
							}
						},
						change : function(combo, newValue) {
							workShopStore.load({
								params : {
									type : 'workShop',
									parentId : newValue
								},
								callback : function(records, operation, success) {
									var workShopComboRef = Ext.ComponentQuery
											.query(formType + '#' + form.itemId
													+ ' combo[name="'
													+ _opt.workShopName + '"]')[0];
									if (workShopComboRef) {
										var valueFitFlag = false;
										if (success && workShopComboRef.value
												&& records
												&& records.length > 0) {
											for (var i = 0; i < records.length; i++) {
												var record = records[i];
												if (record.get('value') == workShopComboRef.value) {
													workShopComboRef
															.select(record);
													valueFitFlag = true;
													break;
												}
											}
										}
										if (!valueFitFlag) {
											workShopComboRef.clearValue();
										}
									}
								}
							});
						}
					}
				}, workShopCombo = {
					xtype : 'combo',
					fieldLabel : _opt.workShopLabelField,
					allowBlank : _opt.workShopAllowBlank,
					store : workShopStore,
					name : _opt.workShopName,
					displayField : 'key',
					valueField : 'value',
					queryMode : 'local',
					editable : false,
					listeners : {
						change : function(combo, newValue) {
							workAreaStore.load({
								params : {
									type : 'workArea',
									parentId : newValue
								},
								callback : function(records, operation, success) {
									var workAreaComboRef = Ext.ComponentQuery
											.query(formType + '#' + form.itemId
													+ ' combo[name="'
													+ _opt.workAreaName + '"]')[0];
									if (workAreaComboRef) {
										var valueFitFlag = false;
										if (success && workAreaComboRef.value
												&& records
												&& records.length > 0) {
											for (var i = 0; i < records.length; i++) {
												var record = records[i];
												if (record.get('value') == workAreaComboRef.value) {
													workAreaComboRef
															.select(record);
													valueFitFlag = true;
													break;
												}
											}
										}
									}
									if (!valueFitFlag) {
										workAreaComboRef.clearValue();
									}
								}
							});
						}
					}
				}, workAreaCombo = {
					xtype : 'combo',
					fieldLabel : _opt.workAreaLabelField,
					displayField : 'key',
					valueField : 'value',
					queryMode : 'local',
					store : workAreaStore,
					name : _opt.workAreaName,
					allowBlank : _opt.workAreaAllowBlank,
					editable : false
				};

				var comboArray = [branchCmpCombo, workShopCombo, workAreaCombo];
				Ext.Array.insert(items, _opt.insertIndex, comboArray);
			}
			// 防止重复插入的标记.
			form.hasFactoryCombo = true;
		},
		printByRunqian : function(raqName, params) {
			if (!raqName)
				return;
			var iframe4export = window.report1_printIFrame;
			if (iframe4export) {
				var href = "reportFiles/print.jsp?raqName=" + raqName;
				if (params) {
					for (var key in params) {
						href += ('&' + key + '=' + params[key]);
					}
				}
				iframe4export.location.href = href;
			}
		},
		// [liuxing]一些常用的方法END
		createCommonTypeComboBox1 : function(typeId, itemId, name, label,
				readOnly, params) {
			if (readOnly == null || readOnly == "undifined") {
				readOnly = false;
			}
			var width = (params == null || params.width == null)
					? 220
					: params.width;
			var labelWidth = (params == null || params.labelWidth == null)
					? 70
					: params.labelWidth;
			var labelAlign = (params == null || params.labelAlign == null)
					? 'right'
					: params.labelAlign;
			var defaultVal = (params == null || params.defaultVal == null)
					? 0
					: params.defaultVal;

			var store = new Ext.data.Store({
						storeId : itemId + "Store",
						model : 'Sgai.model.common.commonType.CommonTypeItemModel',
						autoLoad : true,
						async : false,
						proxy : {
							type : 'ajax',
							url : 'md/common-type-item!getCommonTypeItems.action',
							extraParams : {
								'qm.typeId' : typeId
							},
							reader : {
								type : 'json',
								rootProperty : 'items'
							}
						}
					});

			var combo = Ext.create('Ext.form.field.ComboBox', {
						itemId : itemId,
						width : width,
						name : name,
						fieldLabel : label,
						labelWidth : labelWidth,
						labelAlign : labelAlign,
						emptyText : translations.pleaseSelect,
						store : store,
						queryMode : 'remote',
						valueField : 'itemId',
						displayField : 'itemName',
						editable : false,
						readOnly : readOnly
					});

			store.addListener("load", function(store, records, successful,
							eOpts) {
						if (defaultVal == 1) {
							combo.setValue(store.getAt(0).get('itemId'));
						}
					});
			return combo;
		},

		// form非空检验
		validateForm : function(form) {
			var flag = true;
			form.items.each(function(item, index, length) {
				var itemName = '';
				var itemType = item.getXType();
				if (!Ext.isEmpty(item.getItemId())) {
					itemName = item.getItemId();
				} else if (!Ext.isEmpty(item.getName())) {
					itemName = item.getName();
				}
				if (item.allowBlank == false) {
					var data = item.getValue();
					if ((data == null || data == '') && data != 0) {
						Sgai.util.Util.showErrorMsg(item.fieldLabel + ' 不能为空!');
						flag = false;
						return false;
					}
				}
			});
			return flag;
		},
		// 创建下拉框整合方法
		createCombo : function(value, name, store, cmpParams, queryParams) {
			// console.log('sgai.util.Util.createCombo');
			if (Ext.isEmpty(store)) {
				store = Ext
						.create('Sgai.store.common.commonType.MdCommonTypeItemStore');
			}
			// 默认值处理
			var defaultVal = (cmpParams == null || cmpParams.defaultVal == null)
					? null
					: cmpParams.defaultVal;
			if (defaultVal != null) {
				store.addListener("load", function(store, records, successful,
								eOpts) {
							combo.setValue(defaultVal);
						});
			}
			if (!Ext.isEmpty(queryParams)) {
				store.proxy.extraParams = queryParams;
			}
			var isLoad = cmpParams.isLoad == null ? false : cmpParams.isLoad;
			if (!Ext.isEmpty(cmpParams) && isLoad) {
				if (!Ext.isEmpty(queryParams)
						&& !Ext.isEmpty(queryParams.action)) {
					store.load({
								action : queryParams.action
							});
				} else {
					store.load();
				}
			}
			var combo = Ext.create('Ext.form.field.ComboBox', {
				itemId : (cmpParams == null || cmpParams.itemId == null)
						? ''
						: cmpParams.itemId,
				emptyText : translations.pleaseSelect,
				store : store,
				queryMode : 'remote',
				typeAhead : (cmpParams == null || cmpParams.typeAhead == null)
						? true
						: cmpParams.typeAhead,
				minChars : 0,
				valueField : (value == null ? 'typeId' : value),
				displayField : (name == null ? 'typeName' : name),
				editable : (cmpParams == null || cmpParams.editable == null)
						? true
						: cmpParams.editable,
				readOnly : (cmpParams == null || cmpParams.readOnly == null)
						? false
						: cmpParams.readOnly,
				width : (cmpParams == null || cmpParams.width == null)
						? 220
						: cmpParams.width,
				fieldLabel : (cmpParams == null || cmpParams.fieldLabel == null)
						? ''
						: cmpParams.fieldLabel,
				name : (cmpParams == null || cmpParams.name == null)
						? ''
						: cmpParams.name,
				labelWidth : (cmpParams == null || cmpParams.labelWidth == null)
						? 100
						: cmpParams.labelWidth,
				labelAlign : (cmpParams == null || cmpParams.labelAlign == null)
						? 'right'
						: cmpParams.labelAlign,
				labelCls : (cmpParams == null || cmpParams.labelCls == null)
						? Ext.baseCSSPrefix + 'form-item-label'
						: cmpParams.labelCls,
				allowBlank : (cmpParams == null || cmpParams.allowBlank == null)
						? true
						: cmpParams.allowBlank,
				disabled : (cmpParams == null || cmpParams.disabled == null)
						? false
						: cmpParams.disabled,
				hidden : (cmpParams == null || cmpParams.hidden == null)
						? false
						: cmpParams.hidden,
				listeners : (cmpParams == null || cmpParams.listeners == null)
						? ''
						: cmpParams.listeners
			});

			// 如果是级联下拉列表，添加监听处理
			if (!Ext.isEmpty(cmpParams) && cmpParams.isCascade) {
				// 以下三个参数是级联下拉时使用
				combo.otherComboItemId = (cmpParams == null || cmpParams.otherComboItemId == null)
						? ''
						: cmpParams.otherComboItemId;
				combo.comboKey = (cmpParams == null || cmpParams.comboKey == null)
						? ''
						: cmpParams.comboKey;
				combo.otherComboForeignKey = (cmpParams == null || cmpParams.otherComboForeignKey == null)
						? ''
						: cmpParams.otherComboForeignKey;
				combo.on('select', function(combo, records) {
							var record = combo.findRecord(combo.valueField
											|| combo.displayField, combo
											.getValue());
							var otherCombo = Ext.create('Ext.form.ComboBox');
							otherCombo = Ext.ComponentQuery
									.query('combo[itemId='
											+ combo.otherComboItemId + ']')[0];
							var store = otherCombo.getStore();
							store.removeAll();

							var otherComboForeignKey = combo.otherComboForeignKey;
							var comboKey = combo.comboKey;
							var params = {};
							params[otherComboForeignKey] = record.get(comboKey);
							params['limit'] = 500;
							store.proxy.extraParams = params;
							store.load({});
							otherCombo.clearValue();
						});
			}
			return combo;
		},

		pagingBar : function(store) {
			return Ext.create('Ext.toolbar.Paging', {
						store : store,
						dock : 'bottom',
						displayInfo : true,
						plugins : [{
									ptype : 'pagingtoolbarresizer'
								}]

					})
		},

		valditionDomId : function(domId, store) {
			var me = this;
			if (domId != 'testFuck') {
				var newRec = store.getNewRecords();
				var dd = newRec[0].get('uomId');
				if (dd == 'true') {
					newRec[0].set('uomId', '');
				}
			}

			Ext.Ajax.request({
						method : 'POST',
						url : 'dom/findByDomId.action',
						params : {
							'domId' : domId

						},
						async : false,
						success : function(response) {
							if (Ext.decode(response.responseText).data === 'OK') {
								Sgai.util.Util.showTipMsg(" 域名已存在 ，请修改！");
								return false;

							} else {
								me.storeSync(store);
							}
						}
					});

		},

		storeSyncSecond : function(store) {
			Ext.Msg.confirm(translations.operateMsgWinTitle,
					translations.operateConfirm, function(btn) {
						if (btn == 'no') {
							return;
						} else {
							store.sync({
								success : function(batch, options) {
									if (Ext
											.decode(batch.operations[0]._response.responseText).data == 'false') {

										Sgai.util.Util
												.showTipMsg('参数已经存在，不允许添加！');
									} else if (Ext
											.decode(batch.operations[0]._response.responseText).data == 'true') {
										Sgai.util.Util
												.showTipMsg('参数类别已经存在，不允许添加！');

									} else {

										Sgai.util.Util
												.showTipMsg(translations['operateSuccess']);
										store.load({});
									}

								},
								failure : function(batch, options) {
									var errMsg = "";
									for (var i = 0; i < batch.exceptions.length; i++) {
										var error = batch.exceptions[i].error;
										errMsg = error + "<br/>";
									}
									Sgai.util.Util.showErrorMsg(errMsg);
								}
							});
						}
					});
		},
		mdParCheck : function(store){
        	var err;
        	 store.each(function(record){
				 store.each(function(inrecord) {
					    if(inrecord.get('parPos')===undefined){
					    	if (store.indexOf(record) != store.indexOf(inrecord)
									&& record.get('parId') === inrecord.get('parId')) {
								
								err ='参数ID不能重复';
								
							}
					    }else{
					    	if (store.indexOf(record) != store.indexOf(inrecord)
									&& (record.get('parId') === inrecord.get('parId') || record
											.get('parPos') == inrecord.get('parPos'))) {
								
								err ='参数ID或POS不能重复';
					          }
					    }
					});
				 if(!err){
					 // 测试界面验证
					 if(record.get('requiredYn')==='N' &&  record.get('cellValue')=="" ){
						   err ='R为否时,条件必填！';
					   }
					 //par 验证
					 if(record.get('highValue')=='' && record.get('lowValue')==''){
				    	 err ='上限下限不能同时为空';
				     }else if(record.get('valueType')=='C'){
						 if(record.get('highValue')!=''  && record.get('rangeType')==''){
							 err ='常量上限有值时,范围不能为空';
						 }else if(record.get('rangeType')!='' && record.get('highValue')!='' && isNaN(record.get('highValue'))){
							 err ='常量范围不为空,上限只能是数字';
						 }else if(record.get('rangeType')!='' && record.get('lowValue')!='' && isNaN(record.get('lowValue'))){
							 err ='常量范围不为空,下限只能是数字';
					     }else if(record.get('highValue')!='' && record.get('lowValue')!='' && parseFloat(record.get('highValue'))<=parseFloat(record.get('lowValue'))){
							 err ='上限要大于下限';
					     }
					 
					 }else if(record.get('valueType')=='D' && record.get('derColSid')==null){
						 err ='数值类型为追溯表时,请在下限选择追溯表值';
					 }else if(record.get('valueType')=='E' && record.get('highValue')!='' && record.get('rangeType')==''){
						
						 err ='表达式上限不为空，需要录入范围';
					 }else if(record.get('valueType')=='E' && record.get('highValue')=='' && record.get('lowValue')==''){
						
						 err ='上限下限不能同时为空';
					 }
				 }
				 
				
			    });
			
			
            return err;
             
		},
		//应用于 资源 产品 作业 物料形变 的参数校验
		mdParSameCheck : function(store,type){
        	var err;
        	var parType=type+'ParType';
        	 store.each(function(record){
				 store.each(function(inrecord) {
					 if(record.get('sid')!=inrecord.get('sid') 
							 && record.get('parId')===inrecord.get('parId')
							 &&record.get(parType)===inrecord.get(parType)
							 &&record.get('parPos')===inrecord.get('parPos')
							 &&record.get('valueType')===inrecord.get('valueType')
							 &&record.get('derColSid')===inrecord.get('derColSid')
							 &&record.get('derCellSid')===inrecord.get('derCellSid')
							 &&record.get('derCtxSid')===inrecord.get('derCtxSid')
							 &&record.get('lowValue')===inrecord.get('lowValue')
							 &&record.get('highValue')===inrecord.get('highValue')
							 &&record.get('rangeType')===inrecord.get('rangeType')){
						 err="参数ID："+record.get('parId')+" 对应两条相同的参数记录，请修改后保存！";
					 }
					 
				 });
				 if(!err){
					 // 测试界面验证
					 if(record.get('requiredYn')==='N' &&  record.get('cellValue')=="" ){
						   err ='R为否时,条件必填！';
					   }
					 //par 验证
					 if(record.get('highValue')=='' && record.get('lowValue')==''){
				    	 err ='上限下限不能同时为空';
				     }else if(record.get('valueType')=='C'){
						 if(record.get('highValue')!=''  && record.get('rangeType')==''){
							 err ='常量上限有值时,范围不能为空';
						 }else if(record.get('rangeType')!='' && record.get('highValue')!='' && isNaN(record.get('highValue'))){
							 err ='常量范围不为空,上限只能是数字';
						 }else if(record.get('rangeType')!='' && record.get('lowValue')!='' && isNaN(record.get('lowValue'))){
							 err ='常量范围不为空,下限只能是数字';
					     }else if(record.get('highValue')!='' && record.get('lowValue')!='' && parseFloat(record.get('highValue'))<=parseFloat(record.get('lowValue'))){
							 err ='上限要大于下限';
					     }
					 
					 }else if(record.get('valueType')=='D' && record.get('derColSid')==null){
						 err ='数值类型为追溯表时,请在下限选择追溯表值';
					 }else if(record.get('valueType')=='E' && record.get('highValue')!='' && record.get('rangeType')==''){
						
						 err ='表达式上限不为空，需要录入范围';
					 }else if(record.get('valueType')=='E' && record.get('highValue')=='' && record.get('lowValue')==''){
						
						 err ='上限下限不能同时为空';
					 }
				 }
				 
				
			    });
			
			
            return err;
             
		},
		getMax:function(store,field){
			var max =1;
			store.each(function(rec){
				if(parseFloat(max)<parseFloat(rec.get(field))){
					max = rec.get(field);
				}
			});
			return max;
		}
	}

});