
Ext.define('Sgai.model.su.res.RoleResourceModel',
    {
        extend: 'Ext.data.Model',
        autoLoad: true,
        fields: [
             {name: 'sid' , type: 'int' , critical:true},    
             {name: 'resId', type:'string'},
             {name: 'resName', type:'string'},
             {name: 'resType',type:'string'},
             {name: 'resUri', type:'string'},
             {name: 'resLevel', type:'int' },
             {name: 'checked' , type: 'boolean'},
             {name: 'parentSid' , type: 'int' },
             {name: 'createdBy', type: 'string'},
             {name: 'createdTimestamp', type: 'date'},
             {name: 'updatedBy', type: 'string'},
             {name: 'updatedTimestamp', type: 'date'},
             {name: 'version', type: 'int', critical:true}
        ]
    });
