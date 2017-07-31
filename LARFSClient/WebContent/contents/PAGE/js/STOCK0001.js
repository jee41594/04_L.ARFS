var page = {
	
	init:function(event)
	{
		page.initLayout();
	},

	initLayout : function()
	{
		var backBtn = LEMP.Window.createElement({"_sElementName" : "ImageButton"});
		backBtn.setProperty({
			"_sImagePath" : "common/images/btn_before.png",
			"_fCallback" : function(){LEMP.Window.close();}
		});
		
		var titlebar = LEMP.Window.createTitleBar({
			 "_sTitle" : " "
		});
		
		titlebar.setProperty({
			"_sImagePath" : "common/images/titlebar.png",
			"_aLeftImageButton" : [backBtn]
		});
		
		var writeBtn = LEMP.Window.createElement({"_sElementName" : "ImageButton"});
		writeBtn.setProperty({
			"_sImagePath" : "common/images/tbb_save.png",
			"_fCallback" : function(){
				
				LEMP.Network.requestTr({
					"_sTrcode" : "DM0004",
					"_oBody" : {
						"title" : $("#bbstitle").val(),
						"contents" : $("#bbscontents").val()
					},
					_fCallback : function(resDM0002){
						if(resDM0002.header.result)
						{
							LEMP.Window.close({ "_sCallback" : "page.initData"});					
						}else{
							LEMP.Window.alert({
								"_sTitle" : "알림",
								"_vMessage" : resDM0002.header.error_text
							});
						}
					}
				});
				
			}
		});

		var toolbar = LEMP.Window.createToolBar({
			"_aImageButton" : [writeBtn]
		});
		toolbar.setProperty({
			"_sBackgroundImage" : "common/images/toolbar_bg.png" 
		});
		
		LEMP.Window.draw({
			_aElement : [titlebar, toolbar]
		});
		
	}
};