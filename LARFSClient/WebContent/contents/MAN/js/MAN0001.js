LEMP.addEvent("backbutton", "page.callbackBackButton");

var page = {

	init : function(event) {
		page.initInterface();
	},

	initInterface : function() {
		$(".barcodeReader").click(function() {
			LEMP.Window.open({
				"_sPagePath" : "PAGE/html/BAR0001.html",
				"_sTitleBar" : "BBS001"
			});
		});
		
		$(".shoppingCart").click(function() {
			LEMP.Window.open({
				"_sPagePath" : "PAGE/html/CART0001.html",
				"_sTitleBar" : "BBS001"
			});
		});
		
		$(".shoppingStock").click(function() {
			LEMP.Window.open({
				"_sPagePath" : "PAGE/html/STOCK0001.html",
				"_sTitleBar" : "BBS001"
			});
		});
		
		$(".myInfo").click(function() {
			LEMP.Window.open({
				"_sPagePath" : "PAGE/html/INFO0001.html",
				"_sTitleBar" : "BBS001"
			});
		});
	},

	callbackBackButton : function() {
		
		// confirm 창 만들기
		// text button 2개 create(확인, 취소)
		var textButton1 = LEMP.Window.createElement({
			"_sElementName" : "TextButton"
		});
		
		var textButton2 = LEMP.Window.createElement({
			"_sElementName" : "TextButton"
		});

		textButton1.setProperty({
			"_sText" : "확인",
			"_fCallback" : function() {
				LEMP.Window.open({
					"_sPagePath" : "LGN/html/LGN0001.html"
				})
			}
		});

		textButton2.setProperty({
			"_sText" : "취소"
		});

		LEMP.Window.confirm({
			"_sTitle" : "알림",
			"_vMessage" : "로그아웃 하시겠습니까?",
			"_aTextButton" : [ textButton1, textButton2 ]
		});
	}
};