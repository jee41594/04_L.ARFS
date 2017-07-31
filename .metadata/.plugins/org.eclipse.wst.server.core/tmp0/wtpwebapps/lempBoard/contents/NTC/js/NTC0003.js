var page = {
	init : function() {

		page.initLayout();
		
	},
	initLayout : function() {

		// 타이틀 바, 툴바를  만듬
		// 타이틀 바
		var backBtn = LEMP.Window.createElement({
		    "_sElementName" : "ImageButton"
		});
		
		backBtn.setProperty({
		    "_sImagePath" : "common/images/btn_before.png",
		    "_fCallback" : function()   {
		    	LEMP.Window.close();
		    }
		});
		
		
		var titleBar = LEMP.Window.createTitleBar();
		
		titleBar.setProperty({
			"_sImagePath": "common/images/titlebar.png",
			"_aLeftImageButton" :[backBtn]
		});
		
		
		var svaeBtn = LEMP.Window.createElement({ 
		    "_sElementName" : "ImageButton"
		});
		
		svaeBtn.setProperty({
		    "_sImagePath" : "common/images/tbb_save.png",
		    "_fCallback" : function()   {
		    	page.initdata();
		    }
		});
		
		var toolBar = LEMP.Window.createToolBar({
		    "_aImageButton" : [ svaeBtn ]
		});
		
		LEMP.Window.draw({
		    "_aElement" : [titleBar,toolBar]
		});
		
	},
	initdata : function() {
		LEMP.Network.requestTr({
		    "_sTrcode" : "DM0004",
		    "_oBody" : {
		        "contents" : $("#bbscontents").val(),
		        "title" : $("#bbstitle").val()
		    },
		    "_fCallback" : function(resDM0004){
		    	LEMP.Window.open({
				    "_sPagePath" : "NTC/html/NTC0002.html"
				});
		    }
		});
		
	}
}