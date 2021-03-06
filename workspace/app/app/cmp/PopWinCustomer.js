Ext.ns('Sgai.cmp');
Ext.define('Sgai.cmp.PopWinCustomer', {
	statics : {    
		//测试用items
		conditions:[
		    {
	        	xtype:'textfield',
	            name:'qm.custId',
	            reference:'custId',
	            labelWidth:70,
	            labelAlign:'right',
	            fieldLabel:'客户编码',
	            maxLength:32,
				width:200
	        },
	    	{
	        	xtype:'textfield',
	            name:'qm.custShortName',
	            reference:'custShortName',
	            labelWidth:70,
	            labelAlign:'right',
	            fieldLabel:'客户简称',
	            maxLength:32,
				width:200
	        },
	        {
	        	xtype:'textfield',
	            name:'qm.custName',
	            reference:'custName',
	            labelWidth:70,
	            labelAlign:'right',
	            fieldLabel:'客户名称',
	            maxLength:128,
				width:200
	        },
	        {
	        	xtype:'hidden',
	            name:'qm.delFlag',
	            reference:'delFlag',
	            labelWidth:70,
	            labelAlign:'right',
	            fieldLabel:'删除标志',
	            maxLength:128,
	            value:0,
				width:200
	        }
		],	
		columns:[
	    	{
	            xtype: 'rownumberer',
	            width:50,
	            align:'center',
	            text:translations.rowNumber
	        },
	        {
	            text:'客户编码',
	            dataIndex:'custId'
	        },  
	        {
	            text:'客户简称',
	            dataIndex:'custShortName'
	        },  
	        {
	            text:'客户名称',
	            dataIndex:'custName'
	        },  
	        {
	            text:'客户地址',
	            dataIndex:'custAddress'
	        },  
	        {
	            text:'客户负责人',
	            dataIndex:'custManagerName'
	        },  
	        {
	            text:'联系人',
	            dataIndex:'contactPersion'
	        },  
	        {
	            text:'固定电话',
	            dataIndex:'contactTel'
	        },  
	        {
	            text:'移动电话',
	            dataIndex:'contactPhone'
	        },
	        {
	            text:'sid',
	            dataIndex:'sid',
	            hidden:true
	        }
	   ]
	}
});