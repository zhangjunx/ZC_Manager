$(function(){
	//查询签到人员
	getSignList(getUrlParam("meetingid"),getUrlParam("roomtype"));
})
//查询签到人员
function getSignList(meetingid,roomtype){
	$.ajax({
		url:url+"/meeting/getSignList",
		type:"post",
		data:{"meetingid":meetingid,"quarytype":"1","roomtype":roomtype},
		success:function(data){
			console.log(data);
			$(".alreadyPerson").empty();
			$(".unsignInPerson").empty();
			if(data.flag){
				var res=data.result;
				var arr1=[];
				var arr2=[];
				for(var item of res){
					if(item.signinstatus=="1"){//已签到
						var $li=$("<li><div class='img'><img src='img/person.png'></div><p>"+item.HolderName+"</p></li>");
						$(".alreadyPerson").append($li);
						arr1.push(item);
					}
					if(item.signinstatus=="3"){//迟到
						var $li=$("<li><div class='img'><img src='img/person.png'></div><p>"+item.HolderName+"<span>迟</span></p></li>");
						$(".alreadyPerson").append($li);
						arr1.push(item);
					}
					if(item.signinstatus=="0"){//未签到
						var $li=$("<li><div class='img'><img src='img/person.png'></div><p>"+item.HolderName+"</p></li>");
						$(".unsignInPerson").append($li);
						arr2.push(item);
					}
				}
				$(".singIn1").html(res.length);
				$(".singIn2").html(arr1.length);
				$(".singIn3").html(arr2.length);
				
			}
		}
	})
}



//url解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}