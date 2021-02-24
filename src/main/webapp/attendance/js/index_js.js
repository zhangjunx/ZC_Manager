$(function(){
	//从url地址中解析holderno
	var holderno="";
	var holdername="";
	var deptno="";
	$("#holderno").text(window.top.holdername);
});

function flush(){
	queryRetireList();
	totalMessage();
}
//总消息条数
function totalMessage(){
	var yuJing=$(".retireMsg .tips").html();
	var shenPi=$(".approveMsg .tips").html();
	var meeting=$(".meetingMsg .tips").html();
	if(shenPi==""){
		shenPi=0;
	}
	if(yuJing==""){
		yuJing=0;
	}
	if(meeting==""){
		meeting=0;
	}
	var total=parseInt(yuJing)+parseInt(shenPi)+parseInt(meeting);
	if(total==0){
		total="";
	}
	$(".new>a>span.tips").html(total);
}//end
 


//点击消息框中的审批消息
$(".approveMsg").click(function(){
	$(".menu-item span").parent().removeClass("curr").parent().removeClass("open");
	$(".submenu").removeClass("curr");
	for(var i=0;i<$(".menu-item").length;i++){
		if($(".menu-item span").eq(i).html()=="个人中心"){
			$(".menu-item span").eq(i).parent().addClass("curr").parent().addClass("open");
		}
	}
	
	for(var k=0;k<$(".submenu").length;k++){
		if($(".submenu").eq(k).html()=="待我审批"){
			$(".submenu").eq(k).addClass("curr");
		}
	}
	
})

//点击消息框中的退休预警
$(".retireMsg").click(function(){
	$(".menu-item span").parent().removeClass("curr").parent().removeClass("open");
	$(".submenu").removeClass("curr");
	for(var i=0;i<$(".menu-item").length;i++){
		if($(".menu-item span").eq(i).html()=="人事管理"){
			$(".menu-item span").eq(i).parent().addClass("curr").parent().addClass("open");
		}
	}
	
	for(var k=0;k<$(".submenu").length;k++){
		if($(".submenu").eq(k).html()=="退休提醒"){
			$(".submenu").eq(k).addClass("curr");
		}
	}
})

//获取待审批的消息
function queryApprovalMsg(){
	$.ajax({
		url:url+"/appeme/queryApprovalMsg",
		type:"post",
		data:{"holderno":window.top.holderno},
		async:false,
		success:function(data){
			//console.log(data);
			if(data.flag){
				var res=data.result;
				//console.log(res)
				$(".approveMsg .tips").html(res.length);
			}else{
				$(".approveMsg .tips").html("");
			}
		}
	})
}//end
//获取会议未读消息
function getMeeingNoticeList(){
	$.ajax({
		url:url+"/noticeData/getMeeingNoticeList?thisuserid="+window.top.holderno,
		type:"POST",
		async:false,
		success:function(data){
			//console.log(data);
			var html='';
			var index=0;
			for(var i=0;i<data.result.length;i++){
				if(data.result[i].status=="0"){//未读
					index++;
				}
			}
			if(index==0){
				$(".meetingMsg .tips").html("");
			}else{
				$(".meetingMsg .tips").html(index);
			}
			
		}
	})
}



function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
holderno=getUrlParam("holderno");
holdername=getUrlParam("holdername");
deptno=getUrlParam("deptno");
//判断是否登陆
/*if(holderno==null){
	window.location.href="login.html";
}*/




//查询退休要提示的消息
function queryRetireList(){
	$.ajax({
		url:url+"/HolderData/queryRetireList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			if(!data.flag){
				/*if(data.result==0){
					window.location.href="login.html";
					return;
				}*/
				$(".retireMsg .tips").html("");
			}else{
				var arrs=[];
				$.each(data.result,function(i,val){
					var holdername=(val.holdername==undefined?"":val.holdername);
					var warningname=(val.warningname==undefined?"":val.warningname);
					var res=false;
					if(warningname=="N"){
						res=true;
					}
					if(!res){
						arrs.push(holdername);
					}
				})
				//console.log(arrs.length)
				$(".retireMsg span").html(arrs.length);
			}
		}
	})
}//end

//根据登录人查询其权限
var arr=[];
function queryACLRolePermListByLoginPerson(){
	$.ajax({
		url:url+"/ACL_Roles_Permissions/queryACLRolePermListByLoginPerson",
		type:"POST",
		success:function(data){
			//console.log(data);
			var res=data.result;
			if(data.flag){
			arr=data.result;
			$(".menu-item").hide();
			$(".submenu").hide();
			for(var k=0;k<$(".menu").length;k++){
				for(var i=0;i<res.length;i++){
					var menu=$(".menu").eq(k).children("span").html();
					if(menu==res[i].MenuName){
						$(".menu").eq(k).parent().show();
					}
				}
			}
			for(var j=0;j<$(".submenu").length;j++){
				for(var m=0;m<res.length;m++){
					var submenu=$(".submenu").eq(j).html();
					if(submenu==res[m].ModelName){
						$(".submenu").eq(j).show();
					}
				}
			}
		  }
		}
	})
}//end

function fullScreen(el) {
	//console.log(el)
	var el = document.documentElement;
	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el
		.msRequestFullScreen,
		wscript;
	if (typeof rfs != "undefined" && rfs) {
		rfs.call(el);
		return;
	}

	if (typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if (wscript) {
			wscript.SendKeys("{F11}");
		}
	}
}//end

function exitFullScreen() {
	var el = document;
	var cfs = el.cancelFullScreen ||
		el.webkitCancelFullScreen ||
		el.mozCancelFullScreen ||
		el.exitFullScreen;
	if (cfs) {
		//typeof cfs != "undefined" && cfs 
		cfs.call(el);
	} else if (typeof window.ActiveXObject != "undefined") {
		//for IE，这里和fullScreen相同，模拟按下F11键退出全屏 
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript != null) {
			wscript.SendKeys("{F11}");
		}
	}
}//end

$(".lock").click(function(){
	loginExit();
})
/*退出系统*/
function loginExit(){
	$.ajax({
		url:url+"/HolderData/loginExit",
		type:"POST",
		success:function(data){
			//console.log(data.flag);
			layer.msg(data.reason,{time:3000});
			if(data.flag){
				window.location.href="login.html";
			}else{
				layer.msg(data.reason,{time:3000});
			}
		} 
	})  	
}//end
//左侧切换一级导航
$(document).on("click", ".menubar .menu-item>a", function () {
	if (!$(this).parents(".menu-item").hasClass("open")) {
		$(".level-box").hide()
		$('.menubar .menu-item .menu').removeClass("curr")
		$(this).addClass("curr").parents(".menu-item").addClass("open").siblings().removeClass(
			"open");
	}else {
        $(this).parent().removeClass("open")
    }
});
//二级导航
$(document).on("click", ".level-item .submenu", function () {
	$(".level-box").hide() //所有的三级列表隐藏
	$(".level-item .submenu").removeClass("curr") //所有二级列表的取消选中
	$(this).addClass("curr") //当前添加选中
	//判断下一个元素是否是列表
	if ($(this).next().hasClass("level-box")) {
		//判断下一个元素是否显示隐藏
		$(this).next().is(":hidden") ? $(this).next().show() : ''
	}

});//end
//全屏 和退出全屏
$(document).on("click", ".qp", function (e) {
	fullScreen();
	exitFullScreen();
})//end
