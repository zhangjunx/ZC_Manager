$(function(){
	query(localStorage.id);
})//end

//点击返回上一页
$(document).on("click",".goBack",function(){
	window.history.go(-1);
})

//通过住建  查看实体信息
function query(id){
	var obj={"datano":id};
	console.log(obj)
	$.ajax({
		url:url+"/VisitorsInfo/getVisitorsIORecord",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				return;
			}
			var val=data.result;
			var datano=(val.datano==undefined?"":val.datano);
			var holderno=(val.holderno==undefined?"":val.holderno);
			var holdername=(val.holdername==undefined?"":val.holdername);
			var doorname=(val.doorname==undefined?"":val.doorname);
			var iodate=(val.iodate==undefined?"":val.iodate);
			var iotime=(val.iotime==undefined?"":val.iotime);
			var iostatus=(val.iostatus==undefined?"":val.iostatus);
			var deptno=(val.deptno==undefined?"":val.deptno);
			var deptname=(val.deptname==undefined?"":val.deptname);
			var uid=(val.uid==undefined?"":val.uid);
			var cardno=(val.cardno==undefined?"":val.cardno);
			var deviceno=(val.deviceno==undefined?"":val.deviceno);
			var devicename=(val.devicename==undefined?"":val.devicename);
			var dataphoto=(val.dataphoto==undefined?"":val.dataphoto);
			var iophoto=(val.iophoto==undefined?"":val.iophoto);
			var openType=(val.opentype==undefined?"":val.opentype);
			var temperatures=(val.temperatures==undefined?"":val.temperatures);
			var visitorsphoto=(val.visitorsphoto==undefined?"":val.visitorsphoto);
			var iophoto=(val.iophoto==undefined?"":val.iophoto);
			
			
			if(openType=="4"){//指纹
				openType="指纹";
			}else if(openType=="2"){//人脸
				openType="人脸";
			}else if(openType=="1"){//刷卡
				openType="刷卡";
			}else if(openType=="6"){//蓝牙
				openType="蓝牙";
			}else if(openType=="9"){//电脑控制
				openType="电脑控制";
			}else if(openType=="3"){//开门密码
				openType="开门密码";
			}else if(doorname=='公司中间门' && openType==undefined){
				openType="二维码";
			}
			
			if(iostatus=='11'){
				$("#iostatus").val("进入");
			}else if(applystatus=='12'){
				$("#iostatus").val("外出");
			}else if(applystatus=='22'){
				$("#iostatus").val("无效刷卡");
			}else{
				$("#iostatus").val(iostatus);
			}
			
			
			$("#id").val(id);
			$("#holderno").val(holderno);
			$("#holdername").val(holdername);
			$("#doorname").val(doorname);
			$("#devicename").val(devicename);
			$("#opentype").val(openType);
			$("#iostatus").val(iostatus);
			$("#iodate").val(iodate);
			$("#iotime").val(iotime);
			$("#deptname").val(deptname);
			if(visitorsphoto==""){
				$("#avatarPreview").attr("src","../img/person.png");
			}else{
				$("#avatarPreview").attr("src","data:image/png;base64,"+visitorsphoto);
			}
			if(iophoto==""){
				/*var txt="<img class='visitorPhoto' src='data:image/png;base64,"+holderphoto+"' style='width:60px;cursor:pointer'>";*/
				$("#digitalPhoto").attr("src","../img/person.png");
			}else{
				$("#digitalPhoto").attr("src","data:image/png;base64,"+iophoto);
			}
			
			 
		}
	})
}//end

 
 
 
