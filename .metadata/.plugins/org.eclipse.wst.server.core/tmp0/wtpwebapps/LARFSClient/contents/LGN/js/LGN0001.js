var page = {
		
	init:function()
	{
		page.initInterface();
	},
	
	initInterface : function()
	{

		$(".bt_login").click(function(){
			if($(".loginBox").LPValidate("check")){
				var id = $("#user_id").val().trim();
				var pwd = $("#user_pw").val().trim();
				
				LEMP.Network.requestLogin({
					"_sUserId" : id,
					"_sPassword" : pwd,
					"_sTrcode" : "DM0001",
					"_oBody" : {
				    	"userId" : id,
				    	"password" : pwd
				    },
				    "_fCallback" : function(resDM0001){
				    	// Login Success
				    	if(resDM0001.header.result){
				    		LEMP.Logger.debug({
				    			"_sMessage" : resDM0001.body.userName
				    		});
				    		
				    		LEMP.Window.open({
				    			"_sPagePath" : "MAN/html/MAN0001.html",
				    			"_sName" : "main"
				    		});		    		
				    	}
				    	// Login Fail
				    	else{
				    		LEMP.Window.alert({
				    			"_sTitle" : "알림",
				    			"_vMessage" : "패스워드와 아이디를 확인해주십시오."
				    		});
				    		LEMP.Logger.error({
				    			"_sMessage" : [resDM0001.header.error_code]+resDM0001.header.error_text
				    		});
				    	}
				    }
				});
			}
		});
	}
};