$(function(){
})



//密码的显示与隐藏
$("#eyesHide").click(function(){
	if($("#password").attr("type")=="password"){
        $("#password").attr('type','text');
        $("#eyesShow").show();
        $("#eyesHide").hide();
    }
})

$("#eyesShow").click(function(){
    if($("#password").attr("type")=="text"){
        $("#password").attr('type','password');
        $("#eyesShow").hide();
        $("#eyesHide").show();
    }
});

$("#eyesHide1").click(function(){
	if($("#repassword").attr("type")=="password"){
        $("#repassword").attr('type','text');
        $("#eyesShow1").show();
        $("#eyesHide1").hide();
    }
})

$("#eyesShow1").click(function(){
    if($("#repassword").attr("type")=="text"){
        $("#repassword").attr('type','password');
        $("#eyesShow1").hide();
        $("#eyesHide1").show();
    }
});


//点击下一步
var no;
$(".sure").click(function(){
	var holderno=$("#holderno").val();
	var idcode=$("#idcode").val();
	if(holderno==""){
		layer.msg("请输入工号!",{time:2000});
		return;
	}
	if(idcode==""){
		layer.msg("请输入身份证号!",{time:2000});
		return;
	}
	var reg=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
	if(!reg.test(idcode)){
		layer.msg("请正确输入身份证号!",{time:2000});
		return;
	}
	var index = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
	var obj={"holderno":holderno,"idcode":idcode};
	$.ajax({
		url:url+"/appeme/queryLoginHolder",
		type:"POST",
		data:obj,
		success:function(data){
			console.log(data)
			if(data.flag){
				$("ul li").eq(1).addClass("current").siblings().removeClass("current");
				$(".cur").eq(1).parent().show().siblings().hide();
				no=holderno;
				layer.close(index);
			}else{
				layer.msg(data.reason,{time:3000});
				layer.close(index);
			} 
		} 
	})  	
})//end

//验证密码
var reg=/^[\w]{6,12}$/;
$("#password").blur(function(){
	var password=$("#password").val();
	if(!reg.test(password)&&password!=""){
		layer.msg("请输入6~12位字母或数字!",{time:2000});
		$(this).focus();
		return;
	}
})
$("#repassword").blur(function(){
	var repassword=$("#repassword").val();
	if(!reg.test(repassword)&&repassword!=""){
		layer.msg("请输入6~12位字母或数字!",{time:2000});
		$(this).focus();
		return;
	}
})
//点击重置
$(".complete").click(function(){
	var password=$("#password").val();
	var repassword=$("#repassword").val();
	var reg = /^[\w]{6,12}$/;
	if(password==""){
		layer.msg("请输入密码!",{time:2000});
		return;
	}
	if(repassword==""){
		layer.msg("请再次输入密码!",{time:2000});
		return;
	}
	if(password!=repassword){
		layer.msg("请确认密码一致!",{time:2000});
		return;
	}
	var index = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
	var obj={"loginpassword":password,"holderno":no};
	console.log(obj);
	$.ajax({
		url:url+"/HolderData/updateForget",
		type:"POST",
		data:obj,
		success:function(data){
			console.log(data)
			if(data.flag){
				$("ul li").eq(2).addClass("current").siblings().removeClass("current");
				$(".cur").eq(2).parent().show().siblings().hide();
				layer.close(index);
			}else{
				layer.msg(data.reason,{time:3000});
				layer.close(index);
			} 
		} 
	})  	
	
})//end
//点击立即登录
$(".login").click(function(){
	window.location.href="../login.html";
})//end