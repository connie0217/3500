Ext.ns('Sgai.cmp');
Ext.define('Sgai.cmp.WmPannarGraphsUtil', {
	requires : ['Sgai.util.Util', 'Sgai.view.Translation'],
	statics : {
		drawPatten : null,
		/**
		 * 图象比例尺参数对象结构
		 */
		scaleParams : {
			x : 30, // 外围图形起始横坐标
			y : 30, // 外围图形起始纵坐标
			width : 800, // 外围图形宽度（像素）
			height : 400, // 外围图形高度（像素）
			hNum : 10, // 横向比例尺格数
			vNum : 5, // 纵向比例尺格数
			scaleInterval : 40, // 比例尺距离外围图形距离
			scaleLengthInterval : 15, // 比例尺总长度描述距离比例尺的距离
			scaleUnitInterval : 10, // 比例尺单位长度描述距离比例尺的距离
			scaleStrokeWidth : '1.5', // 比例尺划线的宽度
			scaleStroke : "blue", // 比例尺划线的颜色
			scaleLengthStrokeWidth : '0.8',// 比例尺总长度描述划线宽度
			scaleLengthStroke : 'black',// 比例尺总长度划线颜色
			fontColor : 'black', // 文字颜色
			storeWidth : 1200, // 外围图形默认实际长度（对应图形中的宽度）
			storeHeight : 600  // 外围图形默认实际宽度（对应图形中的高度）
		},

		/**
		 * 图象核心图形参数对象结构
		 */
		storeParams : {
			x : 30, // 外围图形起始横坐标
			y : 30, // 外围图形起始横纵标
			width : 800, // 外围图形宽度（对应实际仓库的长度）
			height : 400, // 外围图形高度（对应实际仓库的宽度）
			storeFillColor : 'orange',
			storeStrokeWidth : '2',
			storeStroke : 'red',
			storeCode : 'StoreCode',
			storeName : '库区名称'
		},

		resetParams : function(params) {
			// 标尺参数
			if (params.x)
				this.scaleParams.x = params.x;
			if (params.x)
				this.scaleParams.y = params.y;
			if (params.width)
				this.scaleParams.width = params.width;
			if (params.height)
				this.scaleParams.height = params.height;
			if (params.hNum)
				this.scaleParams.hNum = params.hNum;
			if (params.vNum)
				this.scaleParams.vNum = params.vNum;
			if (params.scaleInterval)
				this.scaleParams.scaleInterval = params.scaleInterval;
			if (params.scaleLengthInterval)
				this.scaleParams.scaleLengthInterval = params.scaleLengthInterval;
			if (params.scaleUnitInterval)
				this.scaleParams.scaleUnitInterval = params.scaleUnitInterval;
			if (params.scaleStrokeWidth)
				this.scaleParams.scaleStrokeWidth = params.scaleStrokeWidth;
			if (params.scaleStroke)
				this.scaleParams.scaleStroke = params.scaleStroke;
			if (params.scaleLengthStrokeWidth)
				this.scaleParams.scaleLengthStrokeWidth = params.scaleLengthStrokeWidth;
			if (params.scaleLengthStroke)
				this.scaleParams.scaleLengthStroke = params.scaleLengthStroke;
			if (params.fontColor)
				this.scaleParams.fontColor = params.fontColor;
			if (params.storeWidth)
				this.scaleParams.storeWidth = params.storeWidth;
			if (params.storeHeight)
				this.scaleParams.storeHeight = params.storeHeight;
			if (params.drawCmpItemId)
				this.scaleParams.drawCmpItemId = params.drawCmpItemId;

			// 库存平面参数
			if (params.x)
				this.storeParams.x = params.x;
			if (params.x)
				this.storeParams.y = params.y;
			if (params.width)
				this.storeParams.width = params.width;
			if (params.height)
				this.storeParams.height = params.height;
			if (params.storeFillColor)
				this.storeParams.storeFillColor = params.storeFillColor;
			if (params.storeStrokeWidth)
				this.storeParams.storeStrokeWidth = params.storeStrokeWidth;
			if (params.storeStroke)
				this.storeParams.storeStroke = params.storeStroke;
			if (params.storeCode)
				this.storeParams.storeCode = params.storeCode;
			if (params.storeName)
				this.storeParams.storeName = params.storeName;
			if (params.drawCmpItemId)
				this.storeParams.drawCmpItemId = params.drawCmpItemId;
		},
		/**
		 * 画堆
		 */
		getLayerItems : function(layerArray, items) {
			if (!Ext.isEmpty(layerArray)) {
				for (var i = 0; i < layerArray.length; i++) {
					var layerParams = layerArray[i];
					var tempX = this.scaleParams.x
							+ this.scaleParams.width
							* (layerParams.xStartPos / this.scaleParams.storeWidth);
					var tempY = this.scaleParams.y
							+ this.scaleParams.height
							* (layerParams.yStartPos / this.scaleParams.storeHeight);
					var width = this.scaleParams.width
							* (layerParams.xEndPos - layerParams.xStartPos)
							/ this.scaleParams.storeWidth;
					var height = this.scaleParams.height
							* (layerParams.yEndPos - layerParams.yStartPos)
							/ this.scaleParams.storeHeight;
					var matInfo = layerParams.matinfo;
					var spriteParams = {
						type : 'rect',
						group : 'layerBox',
						id : layerParams.layerId,
						x : tempX,
						y : tempY,
						width : width,
						height : height,
						fill : layerParams.layerFillColor,
						'stroke-width' : layerParams.layerStrokeWidth,
						stroke : layerParams.layerStroke,
						layerId : layerParams.layerId,
						layerName : layerParams.layerName,
						matName : matInfo != null? matInfo.matName : '',
						matMass : matInfo != null? matInfo.matMass : '',
						weightedHeatevalue : matInfo != null? matInfo.weightedHeatevalue : '',
						weightedSpercent : matInfo != null? matInfo.weightedSpercent : '',
						listeners : {
							/*'mouseover' : function(e, t, eOpts) {
								e.addCls('svg-area-mouseover');
								e.redraw();
								var text = '';
								text += '堆号:' + e.layerId + "<br/>";
								text += '堆名称:' + e.layerName + "<br/>";
								text += '物料名称:' + e.matName + "<br/>";
								text += '物料重量:' + e.matMass + "<br/>";
								text += '热值:' + e.weightedHeatevalue + "<br/>";
								text += '硫份:' + e.weightedSpercent + "<br/>";
								//alert(text);
								Ext.tip.QuickTipManager.register({
											target : e.id,
											cls : 'stock_graph_pop',
											text : text
										});
							}*/
						
							'render': function(e){
						        e.tip = Ext.create('Ext.tip.ToolTip', {
						            target: e.el,
						            delegate: e.itemSelector,
						            trackMouse: true,
						            listeners: {
						                beforeshow: function updateTipBody(tip) {
							            	e.addCls('svg-area-mouseover');
											e.redraw();
											var text = '';
											text += '堆号:' + e.layerId + "<br/>";
											text += '堆名称:' + e.layerName + "<br/>";
											text += '物料名称:' + e.matName + "<br/>";
											text += '物料重量:' + e.matMass + "<br/>";
											text += '热值:' + e.weightedHeatevalue + "<br/>";
											text += '硫份:' + e.weightedSpercent + "<br/>";						            	
						                    tip.update(text);
						                }
						            }
						        });
						    }

						}
					}
					items.push(spriteParams);
				}
			}
		},
		/**
		 * 画段
		 */
		getRowItems : function(rowArray, items) {
			if (!Ext.isEmpty(rowArray)) {
				for (var i = 0; i < rowArray.length; i++) {
					var rowParams = rowArray[i];
					var tempX = this.scaleParams.x
							+ this.scaleParams.width
							* (rowParams.xStartPos / this.scaleParams.storeWidth);
					var tempY = this.scaleParams.y
							+ this.scaleParams.height
							* (rowParams.yStartPos / this.scaleParams.storeHeight);
					var width = this.scaleParams.width
							* (rowParams.xEndPos - rowParams.xStartPos)
							/ this.scaleParams.storeWidth;
					var height = this.scaleParams.height
							* (rowParams.yEndPos - rowParams.yStartPos)
							/ this.scaleParams.storeHeight;
					var spriteParams = {
						type : 'rect',
						group : 'rowBox',
						id : rowParams.rowId,
						width : width,
						height : height,
						fill : rowParams.rowFillColor,
						'stroke-width' : rowParams.rowStrokeWidth,
						stroke : rowParams.rowStroke,
						x : tempX,
						y : tempY
					}
					items.push(spriteParams);

					if (true == rowParams.lastZoneFlag) {
						continue;
					}
					
					// ROW显示标线
					// 左侧箭头指向的竖线
					var _tempY = this.scaleParams.y + this.scaleParams.height
							+ 15;
					var _leftX = tempX;
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + _leftX + ' ' + _tempY + ' L' + _leftX
								+ ' ' + (_tempY + 10),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 左侧箭头上斜线
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + _leftX + ' ' + (_tempY + 5) + ' L'
								+ (_leftX + 5) + ' ' + (_tempY + 2),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 左侧箭头下斜线
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + _leftX + ' ' + (_tempY + 5) + ' L'
								+ (_leftX + 5) + ' ' + (_tempY + 8),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 右侧箭头指向的竖线
					var _rightX = this.scaleParams.x + this.scaleParams.width
							* (rowParams.xEndPos / this.scaleParams.storeWidth);
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + _rightX + ' ' + _tempY + ' L' + _rightX
								+ ' ' + (_tempY + 10),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 右侧箭头上斜线
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + _rightX + ' ' + (_tempY + 5) + ' L'
								+ (_rightX - 5) + ' ' + (_tempY + 2),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 右侧箭头下斜线
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + _rightX + ' ' + (_tempY + 5) + ' L'
								+ (_rightX - 5) + ' ' + (_tempY + 8),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 连接左箭头的横线
					var textLen = (rowParams.rowName + '').length * 10;// 计算ROW标识文本占用的长度
					var leftX = _leftX + parseFloat((width / 2).toFixed(2))
							- parseFloat((textLen / 2).toFixed(2));
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + _leftX + ' ' + (_tempY + 5) + ' L' + leftX
								+ ' ' + (_tempY + 5),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 连接右箭头的横线
					var rightX = _rightX - parseFloat((width / 2).toFixed(2))
							+ parseFloat((textLen / 2).toFixed(2))
					var spriteParams = {
						type : 'path',
						group : 'hScale',
						path : 'M' + rightX + ' ' + (_tempY + 5) + ' L'
								+ _rightX + ' ' + (_tempY + 5),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 段描述文本
					var textX = _leftX + parseFloat((width / 2).toFixed(2))
							- parseFloat((textLen / 2).toFixed(2));
					var spriteParams = {
						type : 'text',
						group : 'hScale',
						text : rowParams.rowName,
						x : textX,
						y : _tempY + 5
					}
					items.push(spriteParams);
				}
			}
		},
		/**
		 * 画区
		 */
		getZoneItems : function(zoneArray, items) {
			if (!Ext.isEmpty(zoneArray)) {
				for (var i = 0; i < zoneArray.length; i++) {
					var zoneParams = zoneArray[i];
					var tempX = this.scaleParams.x
							+ this.scaleParams.width
							* (zoneParams.xStartPos / this.scaleParams.storeWidth);
					var tempY = this.scaleParams.y
							+ this.scaleParams.height
							* (zoneParams.yStartPos / this.scaleParams.storeHeight);
					var width = this.scaleParams.width
							* (zoneParams.xEndPos - zoneParams.xStartPos)
							/ this.scaleParams.storeWidth;
					var height = this.scaleParams.height
							* (zoneParams.yEndPos - zoneParams.yStartPos)
							/ this.scaleParams.storeHeight;

					var spriteParams = {
						type : 'rect',
						group : 'zoneBox',
						id : zoneParams.zoneId,
						width : width,
						height : height,
						fill : zoneParams.zoneFillColor,
						'stroke-width' : zoneParams.zoneStrokeWidth,
						stroke : zoneParams.zoneStroke,
						x : tempX,
						y : tempY
					}
					items.push(spriteParams);

					// ZONE显示标线
					// 上箭头指向的横线
					var _tempX = this.scaleParams.x + this.scaleParams.width
							+ 15;
					var _upY = tempY;
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + _tempX + ' ' + _upY + ' L' + (_tempX + 10)
								+ ' ' + _upY,
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 上箭头左斜线
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + (_tempX + 5) + ' ' + _upY + ' L'
								+ (_tempX + 2) + ' ' + (_upY + 5),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 上箭头右斜线
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + (_tempX + 5) + ' ' + _upY + ' L'
								+ (_tempX + 8) + ' ' + (_upY + 5),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 下箭头指向的横线
					var _downY = this.scaleParams.y
							+ this.scaleParams.height
							* (zoneParams.yEndPos / this.scaleParams.storeHeight);
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + _tempX + ' ' + _downY + ' L'
								+ (_tempX + 10) + ' ' + _downY,
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 下箭头左斜线
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + (_tempX + 5) + ' ' + _downY + ' L'
								+ (_tempX + 2) + ' ' + (_downY - 5),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 下箭头右斜线
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + (_tempX + 5) + ' ' + _downY + ' L'
								+ (_tempX + 8) + ' ' + (_downY - 5),
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 连接上箭头的竖线
					var textLen = (zoneParams.zoneName).length * 10;// 计算ZONE标识文本占用的长度
					var upY = _upY + parseFloat((height / 2).toFixed(2))
							- parseFloat((textLen / 2).toFixed(2));
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + (_tempX + 5) + ' ' + _upY + ' L'
								+ (_tempX + 5) + ' ' + upY,
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 连接下箭头的竖线
					downY = _downY - parseFloat((height / 2).toFixed(2))
							+ parseFloat((textLen / 2).toFixed(2));
					var spriteParams = {
						type : 'path',
						group : 'vScale',
						path : 'M' + (_tempX + 5) + ' ' + downY + ' L'
								+ (_tempX + 5) + ' ' + _downY,
						fill : '#fff',
						'stroke-width' : this.scaleParams.scaleLengthStrokeWidth,
						stroke : 'green'
					}
					items.push(spriteParams);
					// 区描述文本
					var textY = _upY + parseFloat((height / 2).toFixed(2));
					var spriteParams = {
						type : 'text',
						group : 'vScale',
						text : zoneParams.zoneName,
						x : _tempX - 5,
						y : textY,
						rotate : {
							degrees : 270
						}
					}
					items.push(spriteParams);
				}
			}
		},
		/**
		 * 画库
		 */
		getStoreItems : function(items) {
			var storeParams = this.storeParams;
			// draw titel
			var text = storeParams.storeCode + '-' + storeParams.storeName;
			var tempX = storeParams.x + parseInt(storeParams.width / 2)
					- parseInt(text.length * 10 / 2);
			var spriteParams = {
				type : 'text',
				group : 'stockBox',
				text : text,
				x : tempX,
				y : storeParams.y - 20,
				font : "18px monospace"
			}
			items.push(spriteParams);

			// draw rect
			spriteParams = {
				type : 'rect',
				group : 'stockBox',
				id : storeParams.storeCode,
				width : storeParams.width,
				height : storeParams.height,
				fill : storeParams.storeFillColor,
				'stroke-width' : storeParams.storeStrokeWidth,
				stroke : storeParams.storeStroke,
				x : storeParams.x,
				y : storeParams.y
			}
			items.push(spriteParams);
		},
		/**
		 * 纵向比例尺
		 */
		getVScaleItems : function(items) {
			var scaleParams = this.scaleParams;
			// 画横向比例尺线
			var scaleUnit = parseFloat((scaleParams.storeHeight / scaleParams.vNum)
					.toFixed(2)); // 单位比例代表的实际长度
			var scaleUnitLength = parseFloat((scaleParams.height / scaleParams.vNum)
					.toFixed(2));

			// 画纵向全尺寸线段
			var tempX = scaleParams.x + scaleParams.width
					+ scaleParams.scaleInterval;
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + tempX + ' ' + scaleParams.y + ' ' + ' L' + tempX
						+ ' ' + (scaleParams.y + scaleParams.height),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleStrokeWidth,
				stroke : scaleParams.scaleStroke
			}
			items.push(spriteParams);

			// 画比例尺刻度
			for (var i = 0; i <= scaleParams.vNum; i++) {
				var mY = parseFloat((scaleParams.y + scaleUnitLength * i)
						.toFixed(2));
				var mX = scaleParams.x + scaleParams.width
						+ scaleParams.scaleInterval;
				var spriteParams = {
					type : 'path',
					group : 'vScale',
					path : 'M' + mX + ' ' + mY + ' ' + 'L' + (mX - 5) + ' '
							+ mY,
					fill : '#fff',
					'stroke-width' : scaleParams.scaleStrokeWidth,
					stroke : scaleParams.scaleStroke
				}
				items.push(spriteParams);
			}

			// 上箭头指向的横线
			var tempX = scaleParams.x + scaleParams.width
					+ scaleParams.scaleInterval
					+ scaleParams.scaleLengthInterval;
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + tempX + ' ' + scaleParams.y + ' L' + (tempX + 10)
						+ ' ' + scaleParams.y,
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 上箭头左斜线
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + (tempX + 5) + ' ' + scaleParams.y + ' L'
						+ (tempX + 2) + ' ' + (scaleParams.y + 5),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 上箭头右斜线
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + (tempX + 5) + ' ' + scaleParams.y + ' L'
						+ (tempX + 8) + ' ' + (scaleParams.y + 5),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 下箭头指向的横线
			var tempY = scaleParams.y + scaleParams.height;
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + tempX + ' ' + tempY + ' L' + (tempX + 10) + ' '
						+ tempY,
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 下箭头左斜线
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + (tempX + 5) + ' ' + tempY + ' L' + (tempX + 2)
						+ ' ' + (tempY - 5),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);
			// 下箭头右斜线
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + (tempX + 5) + ' ' + tempY + ' L' + (tempX + 8)
						+ ' ' + (tempY - 5),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 连接上箭头的竖线
			// 计算数字文本占用的长度
			var textLen = (scaleParams.storeHeight + '').length * 7;
			tempY = scaleParams.y
					+ parseFloat((scaleParams.height / 2).toFixed(2))
					- parseFloat((textLen / 2).toFixed(2));
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + (tempX + 5) + ' ' + scaleParams.y + ' L'
						+ (tempX + 5) + ' ' + tempY,
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 连接下箭头的竖线
			tempY = scaleParams.y
					+ parseFloat((scaleParams.height / 2).toFixed(2))
					+ parseFloat((textLen / 2).toFixed(2));
			var spriteParams = {
				type : 'path',
				group : 'vScale',
				path : 'M' + (tempX + 5) + ' ' + tempY + ' L' + (tempX + 5)
						+ ' ' + (scaleParams.y + scaleParams.height),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 画总宽度文本
			tempY = scaleParams.y
					+ parseFloat((scaleParams.height / 2).toFixed(2));
			var spriteParams = {
				type : 'text',
				group : 'vScale',
				text : scaleParams.storeHeight,
				x : tempX - 5,
				y : tempY,
				rotate : {
					degrees : 270
				}
			}
			items.push(spriteParams);

			// draw scale unit
			var spriteParams = {
				type : 'text',
				group : 'vScale',
				text : scaleUnit,
				x : scaleParams.x
						+ scaleParams.width
						+ scaleParams.scaleInterval
						- parseInt(scaleParams.scaleUnitInterval
								* (scaleParams.width / scaleParams.height)),
				y : scaleParams.y + parseInt(scaleUnitLength / 2)
						+ parseInt((scaleUnit + '').length),
				rotate : {
					degrees : 270
				}
			}
			items.push(spriteParams);
		},

		/**
		 * 横向标尺
		 */
		getHScaleItems : function(items) {
			var scaleParams = this.scaleParams;
			// 画横向比例尺线
			var scaleUnit = parseFloat((scaleParams.storeWidth / scaleParams.hNum)
					.toFixed(2)); // 单位比例代表的实际长度
			var scaleUnitLength = parseFloat((scaleParams.width / scaleParams.hNum)
					.toFixed(2));

			// 画横向全尺寸线段
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M'
						+ scaleParams.x
						+ ' '
						+ (scaleParams.y + scaleParams.height + scaleParams.scaleInterval)
						+ ' ' + ' H' + scaleParams.x + ' '
						+ (scaleParams.x + scaleParams.width),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleStrokeWidth,
				stroke : scaleParams.scaleStroke
			}
			items.push(spriteParams);

			// 画比例尺刻度
			for (var i = 0; i <= scaleParams.hNum; i++) {
				var mX = parseFloat((scaleParams.x + scaleUnitLength * i)
						.toFixed(2));
				var mY = scaleParams.y + scaleParams.height
						+ scaleParams.scaleInterval;
				var spriteParams = {
					type : 'path',
					group : 'hScale',
					path : 'M' + mX + ' ' + mY + ' ' + 'L' + mX + ' '
							+ (mY - 5),
					fill : '#fff',
					'stroke-width' : scaleParams.scaleStrokeWidth,
					stroke : scaleParams.scaleStroke
				}
				items.push(spriteParams);
			}

			// draw scale length
			// 左侧箭头指向的竖线
			var tempY = scaleParams.y + scaleParams.height
					+ scaleParams.scaleInterval
					+ scaleParams.scaleLengthInterval;
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + scaleParams.x + ' ' + tempY + ' L' + scaleParams.x
						+ ' ' + (tempY + 10),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 左侧箭头上斜线
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + scaleParams.x + ' ' + (tempY + 5) + ' L'
						+ (scaleParams.x + 5) + ' ' + (tempY + 2),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);
			// 左侧箭头下斜线
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + scaleParams.x + ' ' + (tempY + 5) + ' L'
						+ (scaleParams.x + 5) + ' ' + (tempY + 8),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);
			// 右侧箭头指向的竖线
			tempY = scaleParams.y + scaleParams.height
					+ scaleParams.scaleInterval
					+ scaleParams.scaleLengthInterval;
			var tempX = scaleParams.x + scaleParams.width;

			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + tempX + ' ' + tempY + ' L' + tempX + ' '
						+ (tempY + 10),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);
			// 右侧箭头上斜线
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + tempX + ' ' + (tempY + 5) + ' L' + (tempX - 5)
						+ ' ' + (tempY + 2),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);
			// 右侧箭头下斜线
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + tempX + ' ' + (tempY + 5) + ' L' + (tempX - 5)
						+ ' ' + (tempY + 8),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);
			// 连接左箭头的横线
			// 计算数字文本占用的长度
			var textLen = (scaleParams.storeWidth + '').length * 7;
			tempX = scaleParams.x
					+ parseFloat((scaleParams.width / 2).toFixed(2))
					- parseFloat((textLen / 2).toFixed(2));
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + scaleParams.x + ' ' + (tempY + 5) + ' L' + tempX
						+ ' ' + (tempY + 5),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 连接右箭头的横线
			tempX = scaleParams.x
					+ parseFloat((scaleParams.width / 2).toFixed(2))
					+ parseFloat((textLen / 2).toFixed(2))
			var spriteParams = {
				type : 'path',
				group : 'hScale',
				path : 'M' + tempX + ' ' + (tempY + 5) + ' L'
						+ (scaleParams.x + scaleParams.width) + ' '
						+ (tempY + 5),
				fill : '#fff',
				'stroke-width' : scaleParams.scaleLengthStrokeWidth,
				stroke : scaleParams.scaleLengthStroke
			}
			items.push(spriteParams);

			// 画总长度文本
			tempX = scaleParams.x
					+ parseFloat((scaleParams.width / 2).toFixed(2))
					- parseFloat((textLen / 2).toFixed(2));
			spriteParams = {
				type : 'text',
				group : 'hScale',
				text : scaleParams.storeWidth,
				x : tempX,
				y : tempY + 5
			}
			items.push(spriteParams);
			// 长度单位
			var spriteParams = {
				type : 'text',
				group : 'hScale',
				text : '(m)',
				x : scaleParams.x + scaleParams.width + 30,
				y : scaleParams.y + scaleParams.height
						+ scaleParams.scaleInterval
			}
			items.push(spriteParams);

			// draw scale unit
			var spriteParams = {
				type : 'text',
				group : 'hScale',
				text : scaleUnit,
				x : scaleParams.x + parseInt(scaleUnitLength / 2)
						- parseInt((scaleUnit + '').length * 7 / 2),
				y : scaleParams.y + scaleParams.height
						+ scaleParams.scaleInterval
						- scaleParams.scaleUnitInterval
			}
			items.push(spriteParams);
		},
		/**
		 * 平面图元素集合
		 */
		getPannarGraphsItems : function(storeParams, zoneArray, rowArray,
				layerArray) {
			var items = [];
			// 重置默认参数
			this.resetParams(storeParams);
			this.getHScaleItems(items);
			this.getVScaleItems(items);
			this.getStoreItems(items);
			this.getZoneItems(zoneArray, items);
			this.getRowItems(rowArray, items);
			this.getLayerItems(layerArray, items);
			return items;
		},
		/**
		 * draw 库区堆场平面图
		 * 
		 * @param {}
		 *            drawPatten
		 * @param {}
		 *            items
		 */
		drawPannarGraphs : function(drawPatten, items) {
			var cmp = Ext.create('Ext.draw.Component', {
						viewBox : false,
						itemId : this.scaleParams.drawCmpItemId,
						shadow : false,
						draggable : false,
						renderTo : drawPatten.body,
						items : items
					}).show();
		}
	}
});