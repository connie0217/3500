
Ext.define('Sgai.model.common.operateLog.OperateLog',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        fields: [
            {name: 'sid' , type: 'int'},               
            {name: 'requestId' , type: 'string'},  
            {name: 'classId', type: 'string'},
            {name: 'methodId', type: 'string'},
            {name: 'eventDesc', type: 'string'},           
            {name: 'startTimestamp', type: 'string'},
            {name: 'endTimestamp', type: 'string'},
            {name: 'runMilli', type: 'int'},
            {name: 'parameters', type: 'string'},
            {name: 'createdBy', type: 'string'},
            {name: 'createdTimestamp', type: 'date'},
            {name: 'updateBy', type: 'string'},
            {name: 'updateTimestamp', type: 'date'},
            {name: 'version', type: 'int'}
        ]
    });
