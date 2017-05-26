Ext.define('Sgai.view.common.commonType.MdCommonTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mdCommonTypeCtrl',
    //展开树所有节点
    expandAll:function(btn, event) {
    	var tree = this.lookupReference('mdCommonTypeTree');
    	var rootNode = tree.getRootNode();
    	if (rootNode.hasChildNodes()) {
    		tree.expandAll();
    	}
    },
    collapseAll:function(btn, event) {
    	var tree = this.lookupReference('mdCommonTypeTree');
    	tree.collapseAll();
    },
    //保存
    save:function(btn, event) {
    	var tree = this.lookupReference('mdCommonTypeTree');
    	var treeStore = tree.getStore();
		//校验必填项目
		var newRec = treeStore.getNewRecords();
		var updateRec = treeStore.getUpdatedRecords();
		var removeRec= treeStore.getRemovedRecords();
		if (newRec.length==0 && updateRec.length==0 && removeRec.length==0) {
			Sgai.util.Util.showTipMsg('没有数据发生变化，无需提交!');
			return;
		}
		var isValidNew = Sgai.util.Util.validRecords(tree, newRec);
		var isValidUpdate = Sgai.util.Util.validRecords(tree, updateRec);
		if (!isValidNew||!isValidUpdate) {
			return;
		}
		treeStore.on('load',onStoreLoad=function(store, records, successful, eOpts){
			var rootNode = tree.getRootNode();
			if (rootNode.hasChildNodes()) {
				rootNode.firstChild.expand();
			}
			treeStore.un('load', onStoreLoad);
		});
		Sgai.util.Util.storeSync(treeStore);		
    },
    //树右键菜单
    itemcontextmenuclick:function(menutree,record,items,index,e){  
        e.preventDefault();  
        e.stopEvent();  
        //判断是否为叶子结点 
        var treePanel = this.lookupReference('mdCommonTypeTree');
        if(record.data.leaf==false){  	
        	
        	var nodemenu = Ext.ComponentQuery.query('menu#nodemenu')[0];
			if (nodemenu != null) {
				nodemenu.close();
			} 
				
    		nodemenu = Ext.create('Ext.menu.Menu', {
        	itemId : 'nodemenu',
            floating:true,  
            closeAction : 'destroy',
            items:[
                {  
                    text:translations.addNode,		
                    handler:function(){
                    	//叶子结点不允许新增结点
                    	var nodeType = record.data.nodeType;
                    	if(nodeType==0){
                    		Sgai.util.Util.showTipMsg(translations['leftNodeCannotAddChild']);
                    		return;
                    	}
                    	if (!record.isExpanded()) {
							treePanel.expandNode(record);
						}
                    	var mdCommonTypeModel = new Sgai.model.common.commonType.MdCommonTypeModel();
                    	mdCommonTypeModel.set('sid',null);
                    	mdCommonTypeModel.set('typeLevel',record.data.typeLevel +1);
                    	mdCommonTypeModel.set('parentSid',record.data.sid);
                    	record.appendChild(mdCommonTypeModel);
                    }  
                },
                {  
                    text:translations.delNode, 
                    handler:function(){  
                        if (record.hasChildNodes()) {
                        	Ext.MessageBox.show({
							    title:translations.operateMsgWinTitle,
							    msg:translations.hasChildCanNotDel,
							    buttons:Ext.Msg.OK,
							    icon:Ext.MessageBox.INFO
							});
                        } else {					                       
                        	record.remove();						                      
                        }
                    }  
                }]  					                  
	        });  
	        nodemenu.showAt(e.getXY());  
        }  
    },
    
    //释放节点
    dropNode:function(node, data, overModel, dropPosition, eOpts) {
    	var me = this;

    	var tree = me.lookupReference('mdCommonTypeTree');
    	var treeStore = tree.getStore();
    	
    	var srcNode = treeStore.findRecord('sid', data.records[0].data.sid);
    	srcNode.set('parentSid', overModel.data.sid);
    	srcNode.set('typeLevel', overModel.data.typeLevel + 1);
    	me.modifyChildrenRecursively(srcNode, treeStore);
    	
    },
    //释放节点确认
    beforeDropNode:function(node, data, overModel, dropPosition, dropHandlers) {
    	dropHandlers.wait = true; 
    	var fromNodeName = data.records[0].data.typeName;
    	var toNodeName = overModel.data.typeName;
	    Ext.MessageBox.confirm('公共类型节点移动', '你确认要移动' + fromNodeName + '到' + toNodeName + '？', function(btn){
	        if (btn === 'yes') {
	            dropHandlers.processDrop();
	        } else {
	            dropHandlers.cancelDrop();
	        }
	    });
    },
    
    //递归节点修改部门层级
    modifyChildrenRecursively:function(node, store) { 
    	var me = this;
		if (node.hasChildNodes()) {	     	
			var childnodes = node.childNodes;
			for(var i=0;i<childnodes.length;i++){  
				var childnode = childnodes[i];
				var srcNode = store.findRecord('sid', childnode.data.sid);
			    srcNode.set('typeLevel', node.data.typeLevel + 1);
				if(childnode.childNodes.length>0){  					
					me.modifyChildrenRecursively(childnode, store);    
				}   
			}
		}
    },
    
    treeAfterrender :function(tree, eOpts) { 
    	var me = this;
    	var treeStore = tree.getStore();						
		treeStore.on('load',onStoreLoad=function(store, records, successful, eOpts){
								var rootNode = tree.getRootNode();
								if (rootNode.hasChildNodes()) {
									var firstNode = rootNode.firstChild;
									firstNode.expand();			
									me.lookupReference('btnExpandAll').setDisabled(false);
		    						me.lookupReference('btnCollapseAll').setDisabled(false);
		       					    me.lookupReference('btnSave').setDisabled(false); 
								}else{
									me.lookupReference('btnExpandAll').setDisabled(true);
		    						me.lookupReference('btnCollapseAll').setDisabled(true);
		       					    me.lookupReference('btnSave').setDisabled(true);
								}
						});
		treeStore.load();
    }
});
