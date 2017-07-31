var page = {
	init : function() {

		page.initInterface();

	},
	initInterface : function() {

		// 1. Login 버튼 클릭
		// 2. 사용자가 입력한 ID, PWD read
		// 3. DM001전문 호출
		// 

		$(".bt_login").click(function name() {

			var userId = $("#user_id").val().trim();
			var userPwd = $("#user_pw").val().trim();

			LEMP.Network.requestLogin({
				"_sUserId" : userId,
				"_sPassword" : userPwd,
				"_sTrcode" : "DM0001",
				"_oBody" : {
					"userId" : userId,
					"password" : userPwd
				},
				"_fCallback" : function(resDM0001) {
					if(resDM0001.header.result ==true){
						LEMP.Window.open({
						    "_sPagePath" : "MAN/html/MAN0001.html"
						});
					}else{
						LEMP.Window.alert({
							"_vMessage" : "ID/PWD를 확인해주세요."
							})
					}
				}
			});
		});
	}
}