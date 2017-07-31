var page = {
		
	init:function()
	{
		page.initInterface();
	},
	
	initInterface : function()
	{
		$("#btnNotice").click(function(){
			LEMP.Window.open({
			    "_sPagePath" : "NTC/html/NTC0001.html"
			});
		});
	}
};