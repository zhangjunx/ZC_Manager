$(function(){
	//从url地址中解析holderno
	var holderno="";
	var holdername="";
	var deptno="";
	initVersion();//初始化版本号
	initLogo();//初始化logo和项目名称
	queryPhotoPerson();//显示照片
	queryRetireList();//预警消息
	totalMessage();
	queryApprovalMsg();//获取待审批的消息
	getHolderMenuPermTree();//根据工号查询权限
	setInterval(flush,1000);//退休消息每秒刷新
	getMeeingNoticeList();
	flush();
	$("#holderno").text(window.top.holdername);
	if(sessionStorage.customerId!="hasLogin"){
		window.location.href='login.html';
	}
});
//初始化版本号
function initVersion(){
	$.ajax({
		url:url+"/DictionaryData/queryDictionaryDataListByPage",
		type:"post",
		data:{"typename":"version"},
		success:function(data){
			if(data.flag){
				var version=data.result[0].value;
				$(".top-logo .title span").html("("+version+")");
			}
		}
	})
}

//初始化logo和项目名称
function initLogo(){
	$.ajax({
		url:url+"/manage/queryNameAndLogo",
		type:"post",
		dataType:"json",
		data:{"accountid":getUrlParam("accountid")},
		success:function(data){
			if(data.flag){
				var res=data.result;
				var logophotos=(res.logophotos==undefined?"":res.logophotos);
				var lconname=(res.lconname==undefined?"":res.lconname);
				$(".logo img").attr("src",logophotos);
				$("#iconName").html(lconname);
			}
		}
	})
}


function flush(){
	//queryRetireList();
	totalMessage();
	getTime();
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
 
//进出记录
function getTime() {
   var date = new Date();
   var seperator1 = "/";
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var strDate = date.getDate();
   var hour = date.getHours(); //得到小时
   var minu = date.getMinutes(); //得到分钟
   var sec = date.getSeconds(); //得到秒
   if (hour < 10) hour = "0" + hour;
   if (minu < 10) minu = "0" + minu;
   if (sec < 10) sec = "0" + sec;
   if (month >= 1 && month <= 9) {
       month = "0" + month;
   }
   if (strDate >= 0 && strDate <= 9) {
       strDate = "0" + strDate;
   }
   var myddy = date.getDay(); //获取存储当前日期
   var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
   var currentdate = year + seperator1 + month + seperator1 + strDate+"("+weekday[myddy]+")";
   $(".date").html(currentdate);
   var currentTime = hour + ":" + minu + ":" + sec;
   $(".hours").html(currentTime);
}

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
    var paramsString = window.location.search.substring(1);
    var r = window.decodeURIComponent(window.atob(paramsString)).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
holderno=getUrlParam("holderno");
holdername=getUrlParam("holdername");
deptno=getUrlParam("deptno");
//判断是否登陆
/*if(holderno==null){
	window.location.href="login.html";
}*/



function queryPhotoPerson(){
	$.ajax({
		url:url+"/HolderPhoto/queryPhoto",
		type:"POST",
		data:{"holderno":window.top.holderno},
		dataType:"json",
		//contentType:"application/json",
		success:function(data){
			//console.log(data)
			if(data.flag){
				var idphoto=(data.result.dataphoto==undefined?"":data.result.dataphoto);
				if(idphoto.length==0){
					$("#photo").attr("src","img/person.png");
					return;
				}
			     $("#photo").attr("src","data:image/png;base64,"+idphoto);
			}else{
				$("#photo").attr("src","img/person.png");
			}
		}
	})
}//end

//查询退休要提示的消息
function queryRetireList(){
	$.ajax({
		url:url+"/HolderData/queryRetireList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			if(!data.flag){
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
function getHolderMenuPermTree() {
	 if(getUrlParam("holderno") == "administrator"
			|| getUrlParam("holderno") == "Administrator"){
		 for (var k = 0; k < $(".menu").length; k++) {
				var menu = $(".menu").eq(k).children("span").html();
				if (menu == "用户角色"||menu=="人事管理") {
					$(".menu").eq(k).parent().show();
				} else {
					$(".menu").eq(k).parent().hide();
				}
			}
		 return;
	 }
	$.ajax({
		url : url + "/ACL_Roles_Permissions/getHolderMenuPermTree",
		type : "POST",
		data : {
			"holderno" : window.top.holderno
		},
		dataType : "json",
		success : function(data) {
			console.log(data);
			var res = data.result;
			if (data.flag) {
				arr = data.result;
				if (getUrlParam("holderno") != "0014"
						&& getUrlParam("holderno") != "administrator"
						&& getUrlParam("holderno") != "Administrator") {
					$(".menu-item").hide();
					$(".submenu").hide();
					for (var k = 0; k < $(".menu").length; k++) {
						for (var i = 0; i < res.length; i++) {
							var menu = $(".menu").eq(k).children("span").html();
							if (menu == res[i].menuname) {
								$(".menu").eq(k).parent().show();
							}
						}
					}
					for (var j = 0; j < $(".submenu").length; j++) {
						for (var m = 0; m < res.length; m++) {
							var submenu = $(".submenu").eq(j).html();
							if (submenu == res[m].modelname) {
								$(".submenu").eq(j).show();
							}
						}
					}
				} else if(getUrlParam("holderno") == "0014"){
					for (var k = 0; k < $(".menu").length; k++) {
						var menu = $(".menu").eq(k).children("span").html();
						if (menu == "个人中心" || menu == "人事管理") {
							$(".menu").eq(k).parent().show();
						} else {
							$(".menu").eq(k).parent().hide();
						}
					}
				}
			}else{
				$(".menu-item").hide();
				$(".submenu").hide();
				layer.msg("没有权限!",{time:2000});
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
		$(this).addClass("curr").parents(".menu-item").addClass("open").siblings().removeClass("open");
	}else {
        $(this).parent().removeClass("open");
        $(".submenu").removeClass("curr").removeClass("current");
    }
});
//二级导航
$(document).on("click", ".level-item .submenu", function () {
	$(".level-item .submenu").removeClass("curr") //所有二级列表的取消选中
	$(this).addClass("curr") //当前添加选中
	//判断下一个元素是否是列表
	if($(this).hasClass("menus")){
		if($(this).hasClass("current")){
			$(this).next().hide();
			$(this).removeClass("current");
		}else{
			$(this).next().show().siblings(".level-box").hide();
			$(this).addClass("current").siblings().removeClass("current");
			$(".submenu-level").removeClass("curr");
		}
	}
	if($(this).attr("data-url")!=undefined&&$(this).attr("data-url")!=""&&$(this).attr("data-url")!=null){
		var src=$(this).attr("data-url");
		var title=$(this).html();
		var index =layer.open({
		    type: 2,
		    area: ['100%', '100%'],
		    fix: false,
		    shade: false,
		    closeBtn: false,
		    title: false,
		    content: src,
		    anim: 4
		});
	}
		
});//end
//三级导航
$(document).on("click", ".level-item  .submenu-level", function () {
	$(".submenu-level").removeClass("curr");
	$(this).addClass("curr");
});



//全屏 和退出全屏
$(document).on("click", ".qp", function (e) {
	fullScreen();
	exitFullScreen();
})//end

