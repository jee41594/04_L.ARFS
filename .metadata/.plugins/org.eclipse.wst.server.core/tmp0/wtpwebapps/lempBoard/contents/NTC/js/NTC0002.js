
var page = {
		
	init : function(event) {
		page.initData(event.data);
		page.initLayout(event.data);
	},
	initData : function(data) {
	
		LEMP.Network.requestTr({
		    "_sTrcode" : "DM0003",
		    "_oBody" : {
		        "docId" : Number(data.docId)
		    },
		    "_fCallback" : function(resDM0003){
		    	page.renderDetail(resDM0003.body);
		    }
		});
	},
	initLayout : function(data) {
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
		
		
		
		
		
		var homeBtn = LEMP.Window.createElement({ 
		    "_sElementName" : "ImageButton"
		});
		
		homeBtn.setProperty({
		    "_sImagePath" : "common/images/tbb_home.png",
		    "_fCallback" : function()   {
		    	LEMP.Window.open({
				    "_sPagePath" : "MAN/html/MAN0001.html"
				});
		    }
		});
		 
		
		
		var delBtn = LEMP.Window.createElement({ 
		    "_sElementName" : "ImageButton"
		});
		
		delBtn.setProperty({
		    "_sImagePath" : "common/images/tbb_del.png",
		    "_fCallback" : function()   {
		    	LEMP.Network.requestTr({
				    "_sTrcode" : "DM0005",
				    "_oBody" : {
				        "docId" : Number(data.docId)
				    },
				    "_fCallback" : function(){
				    	LEMP.Window.open({
						    "_sPagePath" : "NTC/html/NTC0001.html"
						});
				    }
				});
		    	
		    }
		});
		
		var toolBar = LEMP.Window.createToolBar({
		    "_aImageButton" : [ homeBtn, delBtn ]
		});

		
		
		
		LEMP.Window.draw({
		    "_aElement" : [titleBar,toolBar]
		});
		
	},renderDetail : function(data) {
		$(".tit").text(data.title);
		$(".regDept").text(data.deptName);
		$(".regName").text(data.userName);
		$(".date").text(data.regDate);
		$(".board_cont").text(data.contents);
	}
		
	
}