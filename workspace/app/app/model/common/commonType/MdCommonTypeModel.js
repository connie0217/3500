
Ext.define('Sgai.model.common.commonType.MdCommonTypeModel',
    {
        extend: 'Ext.data.Model',
        autoLoad: false,
        idProperty:'sid',
        fields: [
            {name: 'sid' , type: 'int',critical:true },      
            {name: 'parentSid' , type: 'int',defaultValue:1},  
            {name: 'typeId' , type: 'string'},  
            {name: 'typeName', type: 'string'},
            {name: 'typeDesc', type: 'string'},
            {name: 'typeLevel', type: 'int'},
            {name: 'extCol1', type: 'string'},
            {name: 'extCol1Desc', type: 'string'},
            {name: 'extCol2', type: 'string'},
            {name: 'extCol2Desc', type: 'string'},
            {name: 'extCol3', type: 'string'},
            {name: 'extCol3Desc', type: 'string'},
            {name: 'nodeType' , type: 'int' }, 
            {name: 'sequence' , type: 'int'}, 
            {name: 'createdBy', type: 'string'},
            {name: 'createdDt', type: 'date'},
            {name: 'updatedBy', type: 'string'},
            {name: 'updatedDt', type: 'date'},
            {name: 'version', type: 'int',critical:true}
        ]
    });
