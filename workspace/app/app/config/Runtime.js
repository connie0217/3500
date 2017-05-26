
Ext.define('Sgai.config.Runtime',{
    singleton : true,
    config: {
        serverUrl:'http://10.88.254.63:8080/sadp-report-app',
        userName:'',
        token:'',
        btnPrivileges: ['P1001-01','p1001-02'],
        userName:'',
        shiftId:1,
        crewId:1,
        allUserInfo:{},
        activitiAuth:'',
        commonTypeItems:{},
        comboxValues:[]
    },
    constructor: function(cfg){
        this.initConfig(cfg);
    }
});