Ext.ns('Sgai.cmp');
Ext.define('Sgai.cmp.TaoBaoGraph', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.taobaograph',
	layout:'fit',
	data:[],
	graphTitle:'客户关系行动计划',
	radius:10,

	listeners:{
		afterrender:function() {
			//此处必须让子弹飞一会儿
			var task = new Ext.util.DelayedTask(this.drawGraph.bind(this));
			task.delay(200);
		}
	},
	
	initComponent : function() {
		var me = this;
		me.enableBubble('mouseOverNode');
		me.enableBubble('mouseOutNode');
		me.canvasId = Sgai.util.Util.getUuid();
		me.html= '<canvas id="' + this.canvasId +'" width="' + me.width + '" height="' + me.height + '">您的浏览器不支持此功能</canvas>';
		this.callParent(arguments);
	},
	
	initEvents : function() {
		var me = this;
		me.callParent(arguments);
		me.mon(me.getEl(), 'dblclick', this.onDblClick, this);		
	},
	
	onDblClick : function(e) {
		this.ownerCt.close();
	},
	
	drawGraph:function() {
		
		//this.initTestNodes();
		if (this.data.length==0) {
			this.html = '请输入绘图数据!';
			return;
		}
		
		var canvas = document.getElementById(this.canvasId);	
		canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
		var context = canvas.getContext("2d");	
		
		var graphWidth = canvas.width - Math.round(canvas.width * 0.1) *2;
		
		var firstNodeX =0;//首节点x坐标
		var firstNodeY =0;//首节点y坐标
		var nodeSpacing = 0//节点间距
		
		if (this.data.length<=1) {
			firstNodeX = Math.round(canvas.width / 2);
			firstNodeY = Math.round(canvas.height / 2);
		} else {
			firstNodeX = Math.round(canvas.width * 0.1);
			firstNodeY = Math.round(canvas.height / 2);
			nodeSpacing = Math.round(graphWidth / (this.data.length-1));
			this.drawHorizontalAxis(context, firstNodeX, firstNodeY, firstNodeX + graphWidth, firstNodeY);
		}
		
		this.drawTitle(this.graphTitle, Math.round(canvas.width * 0.1), Math.round(canvas.height / 2), graphWidth, context);
		this.drawNode(context, this.data, nodeSpacing, firstNodeX, firstNodeY);
		this.drawCloseTip(canvas, context);	
	},
	
	currentNode:null,
	onMouseMove:function(event) {
		var x = event.pageX;
		var y = event.pageY;
		var canvas = event.target;
		var loc = this.getPointOnCanvas(canvas, x, y);
		var pointNode = this.getPointNode(this.data, loc.x, loc.y);
		if (pointNode!=null) {
			if (this.currentNode==null || this.currentNode.id != pointNode.id) {
				this.currentNode = pointNode;
				this.fireEvent('mouseOverNode', pointNode);
			}
		} else {
			if (this.currentNode!=null) {
				this.fireEvent('mouseOutNode', this.currentNode);
				this.currentNode = null;				
			}
		}
	},
	
	getPointOnCanvas:function(canvas, x, y) {
		var bbox =canvas.getBoundingClientRect();
		return { 
			x: x- bbox.left *(canvas.width / bbox.width),
			y:y - bbox.top * (canvas.height / bbox.height)
		};
	},
	
	getPointNode:function(nodes, x, y) {
		for (var i=0;i<nodes.length;i++) {
			var node = nodes[i];
			if (x>node.x-this.radius && x<node.x + this.radius) {
				if (y>node.y-this.radius && y<node.y+this.radius) {
					return node;
				}
			}
		}
		return null;
	},
	
	drawHorizontalAxis:function(context, sX, sY, eX, eY) {
		context.beginPath();
		context.moveTo(sX, sY); 
		context.lineTo(eX, eY);     
		context.strokeStyle = 'blue'; 
		context.lineCap= 'round'
		context.stroke();
	},
	
	drawCloseTip:function(canvas, context) {
		context.beginPath();
		var txt = '双击以关闭窗口';
		var fontMetrics  = context.measureText(txt);
		var x = canvas.width - Math.round(fontMetrics.width*2);
		var y = canvas.height - Math.round(canvas.height/8);
		context.fillStyle = "red";
		context.font = "bold 9px Arial";
		context.fillText(txt, x, y);		
		context.stroke();
	},
	
	drawTitle:function(title, firstNodeX, firstNodeY, graphWidth, context) {
		context.beginPath();
		var fontMetrics  = context.measureText(title);
		var x = Math.round((firstNodeX + graphWidth)/2);
		var y = Math.round(firstNodeY / 4);
		context.fillStyle = "black";
		context.font = "bold 16px 新宋体";
		context.fillText(title,x-(fontMetrics.width/2), y);		
		context.stroke();
	},
	
	drawNode:function(context, nodes, nodeSpacing, x, y) {
		//var radius = 10;
		var graphTextSpacing = 25;
		var dateTextSpacing = 15;
		for(var i=0;i<nodes.length;i++) {
			var node = nodes[i];
			node.index = i+1;
			node.x = x;
			node.y = y;
			var storkeStyle = this.findStrokeStypeByStatus(node.status);
			context.beginPath();
			context.arc(x, y, this.radius, 0, 2 * Math.PI, false);         
			context.fillStyle = "#000000";

			context.fill();         
			context.lineWidth = 3;         
			context.strokeStyle = storkeStyle;
			
			
			var txt = (i+1).toString();
			var fontMetrics  = context.measureText(txt);
			//var fondMetrics = Ext.draw.TextMeasurer.measureText(txt, 'bold 14px Arial');
			context.fillStyle = "yellow";
			context.font = "bold 10px Arial";
			
			context.fillText(txt,x-(fontMetrics.width/2), y + (fontMetrics.width/2));		
			context.stroke();
			
			context.beginPath();
			txt= node.title;
			fontMetrics = context.measureText(txt);
			//如果title长度大于两个节点之间的长度，则截取title
			if (nodeSpacing!=0 && fontMetrics.width > nodeSpacing*0.8*2) {
				txt = txt.substr(0, Math.round(txt.length * (nodeSpacing*0.8 - this.radius)*2/fontMetrics.width)) + '…';
				fontMetrics = context.measureText(txt);
			}
			
			//fondMetrics = Ext.draw.TextMeasurer.measureText(txt, 'bold 14px Arial');
			context.fillStyle  = storkeStyle;
			context.font = "bold 10px Arial";			
			context.fillText(txt, x-(fontMetrics.width/2), (i%2==0)?(y + this.radius + graphTextSpacing):(y - this.radius - graphTextSpacing))
			context.stroke();
			
			txt = node.date;
			if (!Ext.isEmpty(txt)) {
				context.beginPath();
				fontMetrics = context.measureText(txt);
				context.fillStyle  = storkeStyle;
				context.font = "bold 10px Arial";			
				context.fillText(txt, x-(fontMetrics.width/2), (i%2==0)?(y + this.radius + graphTextSpacing + dateTextSpacing):(y - this.radius - graphTextSpacing + dateTextSpacing))
				context.stroke();
			}
			
			x = x + nodeSpacing;
			y = y;
		}
	},
	
	findStrokeStypeByStatus:function (status) {
		if (status==0) {
			return 'gray';
		} else if (status==1) {
			return 'red';
		} else if (status==2) {
			return '#8ED0FF';
		} else {
			return 'black';
		}
	},
	
	initTestNodes:function() {
		this.data=[];
		var node = {
			id:Sgai.util.Util.getUuid(),
			title:'第一个节点',
			status:0,
			x:0,
			y:0
		};
		this.data.push(node);
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第二个节点',
			status:1,
			x:0,
			y:0
		};
		this.data.push(node);		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第三个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第四个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第五个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第六个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第七个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第八个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第九个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
		
		node = {
			id:Sgai.util.Util.getUuid(),
			title:'第十个节点',
			status:2,
			x:0,
			y:0
		};
		this.data.push(node);
	}
});
