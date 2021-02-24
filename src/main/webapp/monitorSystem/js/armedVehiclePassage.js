$(function(){
})
$(document).mousemove(function(event){
	var x=event.clientX; 
	var y=event.clientY;//监听鼠标位置;
	var width=document.body.clientWidth;
	var wx=width-x;
	if(wx<300&&y<85){
		//弹出关闭按钮
		$(".closeYeMian").css({
			"top":"12px",
			"transition":"all 0.5s ease"
		})
	}else{
		$(".closeYeMian").css({
			"top":"-100px",
			"transition":"all 0.5s ease"
		})
	}
})
$(".closeYeMian").click(function(){
	parent.layer.closeAll();
})
