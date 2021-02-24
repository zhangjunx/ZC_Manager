$(function(){
	//点击待我审批
	$(".unaudited").click(function(){
		window.parent.$(".menu-item span").parent().removeClass("curr").parent().removeClass("open");
		window.parent.$(".submenu").removeClass("curr");
		for(var i=0;i<window.parent.$(".menu-item").length;i++){
			if(window.parent.$(".menu-item span").eq(i).html()=="外来自助登记"){
				window.parent.$(".menu-item span").eq(i).parent().addClass("curr").parent().addClass("open");
			}
		}
		for(var k=0;k<window.parent.$(".submenu").length;k++){
			if(window.parent.$(".submenu").eq(k).html()=="待我审批"){
				window.parent.$(".submenu").eq(k).addClass("curr");
			}
		}
		
	})
	//点击我已审批
	$(".audited").click(function(){
		window.parent.$(".menu-item span").parent().removeClass("curr").parent().removeClass("open");
		window.parent.$(".submenu").removeClass("curr");
		for(var i=0;i<window.parent.$(".menu-item").length;i++){
			if(window.parent.$(".menu-item span").eq(i).html()=="外来自助登记"){
				window.parent.$(".menu-item span").eq(i).parent().addClass("curr").parent().addClass("open");
			}
		}
		for(var k=0;k<window.parent.$(".submenu").length;k++){
			if(window.parent.$(".submenu").eq(k).html()=="待我审批"){
				window.parent.$(".submenu").eq(k).addClass("curr");
			}
		}
		
	})
})
