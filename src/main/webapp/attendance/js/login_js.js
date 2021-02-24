$(function(){
	$('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
	$(window).resize(function(){  
    $('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
    }) 
    if ($.cookie("rmbUser") == "true") { 
        $(".lab span").addClass("curr"); 
        $("#holderno").val($.cookie("userName")); 
        $("#loginpassword").val($.cookie("passWord")); 
    } 
   
})


//点击忘记密码
$(".missPwd").click(function(){
	window.location.href="../lookForPwd/lookForPwd.html";
})

//点击登录界面的复选框
$(".checkbox").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})

 //点击登录
$("#loginCheckBtn").click(function(){
    queryLoginCheck();
    //记住密码
    saveUserInfo();
});
//登录的回车事件
$("#loginpassword").on("keyup",function(event){
	if(event.keyCode=="13"){
		 queryLoginCheck();
		    //记住密码
		    saveUserInfo();
	}
})
function queryLoginCheck(){
	var name=$("#holderno").val();
	var pwd=$("#loginpassword").val();
	var obj={"holderno":name,"loginpassword":pwd};
	if(name.length==0){
		layer.msg("用户名不能为空！",{time:2000});
		return;
	}
	if(pwd.length==0){
		layer.msg("密码不能为空！",{time:2000});
		return;
	}
	var index = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
	$.ajax({
		url:url+"/HolderData/queryLoginCheck",
		type:"POST",
		data:JSON.stringify(obj),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			if(data.flag){
				layer.close(index);
				var res=data.result;
				var holderno=res.holderno;
				window.location.replace("index.html?holderno="+holderno+"&holdername="+res.holdername+"&deptno="+res.departmentno+"");
			}else{
				layer.close(index);
				layer.msg(data.reason,{time:3000});
			} 
		} 
	})  	
}//end

    //保存用户信息 
    function saveUserInfo() { 
        if ($(".lab span").hasClass("curr")) { 
            var userName = $("#holderno").val(); 
            var passWord = $("#loginpassword").val(); 
            $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie 
            $.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie 
            $.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie 
        } 
        else 
        { 
            $.cookie("rmbUser", "false", { expires: -1 }); 
            $.cookie("userName", '', { expires: -1 }); 
            $.cookie("passWord", '', { expires: -1 }); 
        }
    }

function queryDeptNoListByLoginPerson(){
	$.ajax({
		url:url+"/ACL_Roles/queryDeptNoListByLoginPerson",
		type:"POST",
		dataType:"json",
		success:function(data){
			if(data.flag){
				window.location.replace("index.html");
			}else{
				layer.msg(data.reason,{time:3000});
			} 
		} 
	})  	
}//end

