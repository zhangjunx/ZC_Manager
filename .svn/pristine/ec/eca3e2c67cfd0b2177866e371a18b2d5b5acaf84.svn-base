$(function() {
        setInterval(getTime, 1000);

        getTime();
        // 点击人员自助登记
        $(".first").click(function() {
                window.location.href = "personRegistration.html";
            })
            //点击车辆自助登记
        $(".second").click(function() {
                window.location.href = "vehicleRegistration.html"
            })
            //点击已审核
        $(".third").click(function() {
                window.location.href = "audited.html";
            })
            //点击未审核
        $(".fourth").click(function() {
            window.location.href = "unaudited.html";
        })
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
    //获取当前时间
function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (second < 10) {
    	second = "0" + second;
    }
    $(".hour").html(hour + ":" + minute+":"+second);
    $(".date").html(year + "-" + month + "-" + day);


}