var page = {
		
	init:function()
	{
		page.initData();
		page.initInterface();
		page.initLayout();
	},
	
	
	initData : function()
	{
//		LEMP.Network.requestTr({
//			"_sTrcode" : "DM0002",
//			"_oBody" : {
//				"startIndex" : 0,
//				"endIndex" : 20
//			},
//			_fCallback : function(resDM0002){
//				
//				//alert(JSON.stringify(resDM0002));
//				if(resDM0002.header.result)
//				{
//					page.renderList(resDM0002.body);
//				}else{
//					LEMP.Window.alert({
//						"_sTitle" : "알림",
//						"_vMessage" : resDM0002.header.error_text
//					});
//				}
//			}
//		});
		LEMP.Window.openCodeReader({
		    "_fCallback" : function(resOpenCodeReader)  {
		        alert("바코드 읽었음" + JSON.stringify(resOpenCodeReader));
		        
		        LEMP.Network.requestTr({
		            "_sTrcode" : "readBarcode",
		            "_oBody" : {
		                "barcode" : resOpenCodeReader
		            },
		            "_fCallback" : function(resDM0002){
		                alert(JSON.stringify(resDM0002));
		            }
		        });
		    }
		});
		
	},
	
	initInterface : function()
	{
		$("#listSection").delegate("li", "click", function(){
			LEMP.Window.open({
				"_sPagePath" : "NTC/html/NTC0002.html",
				"_oMessage" : {
					"docId" : $(this).attr("docId")
				}
					
				});
			
		});
		
	},
	
	initLayout : function()
	{
		var backBtn = LEMP.Window.createElement({"_sElementName" : "ImageButton"});
		
		backBtn.setProperty({
			"_sImagePath" : "common/images/btn_before.png",
			"_fCallback" : function(){
				LEMP.Window.close();
			}
		});
		
		var titlebar = LEMP.Window.createTitleBar({});
		
		titlebar.setProperty({
			"_sImagePath" : "common/images/titlebar.png",
			"_aLeftImageButton" : [backBtn]
		});
		
		var homeBtn = LEMP.Window.createElement({"_sElementName" : "ImageButton"});
		homeBtn.setProperty({
			"_sImagePath" : "common/images/tbb_home.png",
			"_fCallback" : function(){LEMP.Window.go({"_sName" : "main"});}
		});
		
		var writeBtn = LEMP.Window.createElement({"_sElementName" : "ImageButton"});
		writeBtn.setProperty({
			"_sImagePath" : "common/images/tbb_day_registration.png",
			"_fCallback" : function(){
				LEMP.Window.open({
					"_sPagePath" : "NTC/html/NTC0003.html"
				});
			}
		});
		
		var toolbar = LEMP.Window.createToolBar({
			"_aImageButton" : [homeBtn,writeBtn]
		});
		
		toolbar.setProperty({
			"_sBackgroundImage" : "common/images/toolbar_bg.png" 
		});
		
		LEMP.Window.draw({
			"_aElement" : [titlebar, toolbar]
		});
	},
	
	renderList : function(data){
		
		var dir = [
		{
			 "type" : "loop",
			 "target" : ".record",
			 "value" : "list",
			 "detail" :
				 [
				  { "type" : "single", "target" : "@docId", "value" : "docId" },
				  { "type" : "single", "target" : ".titleName", "value" : "title" },
				  { "type" : "single", "target" : ".date", "value" : 
					  function(arg) { return (arg.item.regDate).LPToFormatDate("yyyy-mm-dd"); }},
				  { "type" : "single", "target" : ".name", "value" : "userName" },
				  { "type" : "single", "target" : ".division", "value" : "deptName" }
				 ]
		 }
		];
		
		$("#list01").LPRender(data, dir);
	}
};