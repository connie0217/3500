Ext.define('Sgai.controller.su.password.Password',{
    extend:'Ext.app.Controller',
    requires:['Sgai.store.su.user.User'],
    views:[
        'su.password.Password'
    ],
    stores : [ 'su.user.User' ],
    refs:[
        {
            ref:'mainframe',
            selector:'password'
        },
        {
            ref:'queryform',
            selector:'password form'
        },
        {
            ref:'submit',
            selector:'password  button#submit'
        },
         {
             ref:'newPassword',
             selector:'password textfield#newPassword'
         },
         {
        	 ref:'sureNewPassword',
        	 selector:'password textfield#sureNewPassword'
         },
         {
        	 ref:'passwordWin',
        	 selector:'window#Password'
         }
    ],
    init:function(){
        this.control({
        	 'password  button#submit':{
             	click:this.submitClick
             },
             'password  button#cancelBtn':{
              	click:this.cancelClick
              }
        });
    },
     submitClick:function(){
    	var me = this;
    	var form=me.getQueryform();
    	var newPassword=form.down('textfield#newPassword').getValue();
    	var sureNewPassword=form.down('textfield#sureNewPassword').getValue();
    	var password = form.down('textfield#password').getValue();
    	if(newPassword!=sureNewPassword){
    		Ext.Msg.alert("提示","两次密码不一致，请重新输入！");
    	}else{
    		Ext.Ajax.request({
				method : 'POST',
				url : 'system/user/updatepassword.action',
				params:{
					password:password,
					newPassword: newPassword,
					pin2 : Sgai.config.Runtime.getUserName()
				},
				success:function(response){
	   	  			var reText = response.responseText;
    				if (reText == "")
    					return;
    				var text = Ext.decode(reText);
    				var msg = text.message;
    				if (text.success) {
    					Ext.Msg.alert("恭喜", msg,function(){
    						me.getPasswordWin().close();
    					});
    				} else {
    					Ext.Msg.alert("原密码输入错误,请重新输入", msg);
	   	  			}
		          },
                  failure:function (response)
                  {
                	  Sgai.util.Util.showErrorMsg("原密码输入错误,请重新输入!");
                  }
    	});
    	}
    },
  cancelClick:function(){
	 this.getPasswordWin().close();
    }
});