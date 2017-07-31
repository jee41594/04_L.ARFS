var page = {

	init : function(event) {
		page.initData(event.data);
		page.initLayout(event.data);
	},

	initData : function(data) {
		LEMP.Network.requestTr({
			"_sTrcode" : "reqCart0001",
			"_oBody" : {
				"docId" : Number(data.docId)
			},
			"_fCallback" : function(resCart0001) {
				if (resCart0001.header.result) {
					page.renderDetail(resCart0001.body);
				} else {
					LEMP.Window.alert({
						"_sTitle" : "알림",
						"_vMessage" : "상세정보를 읽어올 수 없습니다."
					});
				}
			}

		});
	},

	initLayout : function(data) {
		var backBtn = LEMP.Window.createElement({
			"_sElementName" : "ImageButton"
		});
		backBtn.setProperty({
			"_sImagePath" : "common/images/btn_before.png",
			"_fCallback" : function() {
				LEMP.Window.close();
			}
		});

		var titlebar = LEMP.Window.createTitleBar({
			"_sTitle" : " "
		});

		titlebar.setProperty({
			"_sImagePath" : "common/images/titlebar.png",
			"_aLeftImageButton" : [ backBtn ]
		});

		var homeBtn = LEMP.Window.createElement({
			"_sElementName" : "ImageButton"
		});
		homeBtn.setProperty({
			"_sImagePath" : "common/images/tbb_home.png",
			"_fCallback" : function() {
				LEMP.Window.go({
					"_sName" : "main"
				});
			}
		});

		var delBtn = LEMP.Window.createElement({
			"_sElementName" : "ImageButton"
		});
		delBtn.setProperty({
			"_sImagePath" : "common/images/tbb_del.png",
			"_fCallback" : function() {
				LEMP.Network.requestTr({
					"_sTrcode" : "DM0005",
					"_oBody" : {
						"docId" : Number(data.docId)
					},
					"_fCallback" : function(resCart0001) {
						if (resCart0001.header.result) {
							LEMP.Window.close({
								"_sCallback" : "page.initData"
							});
						}
					}
				});

			}
		});

		var toolbar = LEMP.Window.createToolBar({
			"_aImageButton" : [ homeBtn, delBtn ]
		});
		toolbar
				.setProperty({
					"_sBackgroundImage" : "common/images/toolbar_bg.png"
				});

		LEMP.Window.draw({
			_aElement : [ titlebar, toolbar ]
		});

	},

	renderDetail : function(data) {
		$(".tit").text(data.goods_name);
		$(".regDept").text(data.comp_name);
		$(".regName").text(data.cart_id);
		$(".date").text(data.goods_price);
//		$(".board_cont").text(data.contents);
	}
};