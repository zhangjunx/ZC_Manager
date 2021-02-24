$(function(){
	//读卡
	openReader();	
	getTime();
	expires();//根据生效时间给失效时间设置默认值
	queryDoorUnitList();
	getVDoorArrList();
	queryDictDataList();
	/*$("#idcardno").css("background","#edf5fd");
	$("#visitorsname").css("background","#edf5fd");
	$("#visitorssextext").css("background","#edf5fd");
	$("#nationality").css("background","#edf5fd");
	$("#visitorsaddress").css("background","#edf5fd");
	$("#cardid").css("background","#edf5fd");
	$("#startdate").css("background","#edf5fd");
	$("#receiversname").css("background","#edf5fd");
	$("#receiversposition").css("background","#edf5fd");
	$("#receiversphone").css("background","#edf5fd");*/
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  //执行一个laydate实例
		  laydate.render({
		    elem: '#startdate', //指定元素
		    trigger:"click",
		    type:"datetime",
		    done: function(value){
		        	//生效时间的内容改变事件
		        	var num=$(".delay_time").val();
		        	var date=new Date(value);
		        	var time=date.getTime();
		        	var ms=num*3600000;
		        	var date1=new Date(time+ms);
		        	var year=date1.getFullYear();
		        	var month=date1.getMonth()+1;
		        	var day=date1.getDate();
		        	var hour=date1.getHours();
		        	var minute=date1.getMinutes();
		        	var second=date1.getSeconds();
		        	if(month<=9){
		        		month="0"+month;
		        	}
		        	if(day<=9){
		        		day="0"+day;
		        	}
		        	if(hour<=9){
		        		hour="0"+hour;
		        	}
		        	if(minute<=9){
		        		minute="0"+minute;
		        	}
		        	if(second<=9){
		        		second="0"+second;
		        	}
		        	var currdate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+"00";
		        	$("#enddate").val(currdate);
		      }
		  });
	});
	
})
var sn;
var timer;
var websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket(ws+"/SyrisFactory/websocket2");
}
else {
    layer.msg('当前浏览器 Not support websocket',{time:2000});
}

//连接发生错误的回调方法
websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
};
//连接成功建立的回调方法
websocket.onopen = function () {
    console.log("WebSocket连接成功");
}
//接收到消息的回调方法
websocket.onmessage = function (event) {
    var res=JSON.parse(event.data);
    if(sn==undefined){
    	layer.msg("请选择设备!",{time:2000});
    }
    if(res.device_id==sn){
    	$("#idphoto1").attr("src","data:image/png;base64,"+res.id_image);
    	$("#dataphoto1").attr("src","data:image/png;base64,"+res.face_image);
    	$("#idcardno").val(res.id_number);
    	$("#visitorsname").val(res.name);
    	if(res.sex=="0"){
    		$("#visitorssextext").val("男");
    	}else{
    		$("#visitorssextext").val("女");
    	}
    	$("#nationality").val(res.nation+"族");
    	$("#visitorsaddress").val(res.address);
    }
}
//连接关闭的回调方法
websocket.onclose = function () {
    console.log("WebSocket连接关闭");
}
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
	 websocket.close();
}
//发送消息
function send() {
    websocket.send(message);
}

//点击人证比对
$("#personPapers").click(function(){
	getDeviceSn();
	layer.open({
		type:1,
		title:"人证比对",
		content:$("#teminal"),
		area:["350px","200px"],
		btn:["确定","取消"],
		yes:function(i){
			sn=$("#deviceSn").val();
			layer.close(i);
		}
	})
})
//获取设备sn
function getDeviceSn(){
	$.ajax({
		url:url+"/senseID/getEquipmentCode",
		type:"post",
		success:function(data){
			$("#deviceSn").empty();
			if(data.code=="200"){
				for(var item of data.result){
					if(item!=null){
						var $opt=$("<option vlaue='"+item+"'>"+item+"</option>");
						$("#deviceSn").append($opt);
					}
				}
				$("#deviceSn").val(sn);
			}
		}
	})
}

//查询字典数据 民族
function queryDictDataList(){
	$.ajax({
		url:url+"/DictionaryData/queryDictDataList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			if(!data.flag){
				return;
			}
			var htm="";
			$.each(data.result,function(i,val){
				var typename=(val.typename==undefined?"":val.typename);
				var value=(val.value==undefined?"":val.value);
				if(typename=='nationname'){
					htm+="<option value='"+value+"'>"+value+"</option>";
				}
			})
			$("#nationality").append(htm).val("汉族");
		}
	})
}//end


//点击弹出框的叉
$(".quxiao").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的取消
$(".bottom_qx").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的确定
$(".bottom_sure").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框中的方框
$(".door_center").click(function(){
	$(this).addClass("current").siblings().removeClass("current");
})
//点击选择  要选择的被访人信息
$(document).on("click",".door_center li",function(){
	$(this).addClass("current").siblings().removeClass("current");
})
//点击弹窗的确定按钮 获取被访人信息
$(".bottom_sure").click(function(){
	var holderno=$(".door_center li.current").attr("data-holderno");
	var holdername=$(".door_center li.current").attr("data-holdername");
	var deptno=$(".door_center li.current").attr("data-deptno");
	var deptname=$(".door_center li.current").attr("data-deptname");
	var floorroom=$(".door_center li.current").attr("data-floorroom");
	var mobilephone=$(".door_center li.current").attr("data-mobilephone");
	var fixedtelephone=$(".door_center li.current").attr("data-fixedtelephone");
	$("#receiversname").val(holdername);
	$("#receiversname").attr("data-holderno",holderno);
	$("#receiversname").attr("data-deptno",deptno);
	$("#receiversname").attr("data-deptname",deptname);
	$("#receiversname").attr("data-floorroom",floorroom);
	$("#receiversname").attr("data-mobilephone",mobilephone);
	$("#fixedtelephone").val(fixedtelephone);
	$("#receiversphone").val(mobilephone);
	$("#receiversposition").val(floorroom);
})

//获取开始时间
function getTime(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var hour=date.getHours();
	var minute=date.getMinutes();
	var second=date.getSeconds();
	if(month<=9){
		month="0"+month;
	}
	if(day<=9){
		day="0"+day;
	}
	if(hour<=9){
		hour="0"+hour;
	}
	if(minute<=9){
		minute="0"+minute;
	}
	if(second<=9){
		second="0"+second;
	}
	var currdate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+"00";
	$("#startdate").val(currdate);
}//end

//选择出入门区模板
$(".selectMoudle").change(function(){
	var doorarr=$(this).val();
	doorarr=doorarr.split(",");
	$(".doorUnit span").removeClass("cur");
	for(var item of doorarr){
		$("span[data-doorno="+item+"]").addClass("cur");
	}
})

//获取模板
function getVDoorArrList(){
	$.ajax({
		url:url+"/DoorArrModule/getVDoorArrList",
		type:"post",
		success:function(data){
			$('.selectMoudle option').not('option:first').remove();
			if(data.flag){
				var res=data.reason;
				for(var item of res){
					var modelName=item.name==undefined?"":item.name;
					var $opt=$("<option value="+item.doorarr+">"+modelName+"</option>");
					$(".selectMoudle").append($opt);
				}
			}
		}
	})
}
//点击保存为模板
$(".saveMould").click(function(){
	if($("#shuttle_box_right span.cur").length==0){
		layer.msg("请选择门区",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$("#shuttle_box_right span.cur").length;i++){
		var doorno=$("#shuttle_box_right span.cur").eq(i).attr("data-doorno");
		arr.push(doorno);
	}
	arr=arr.join();
	layer.open({
		type:1,
		title:"请填写模板名称",
		content:"<div style='margin-top:25px'><label class='layui-inline' style='width:67px;text-align:center;font-size:14px;margin-left:5px'>模板名称:</label><input type='text' id='moudlName' style='width: 211px;height: 30px;line-height: 30px;border: 1px solid #ddd;color: #333;background: #fff;'/></div>",
		area:["350px","200px"],
		btn:["确定","取消"],
		yes:function(i){
			var modelName=$("#moudlName").val();
			if(modelName==""){
				layer.msg("请输入模板名称",{time:2000});
				return;
			}else{
				$.ajax({
					url:url+"/DoorArrModule/insert",
					type:"post",
					data:{"doorarr":arr,"name":modelName,"type":"V"},
					success:function(data){
						layer.close(i);
						if(data.flag){
							getVDoorArrList();
							layer.msg("保存成功",{time:2000});
						}else{
							layer.msg(data.reason,{time:2000});
						}
					}
				})
			}
		}
	})
	
})

//门区框里面区域名称的点击
$(document).on("click","li.areaTitle",function(){
	var areaid=$(this).attr("data-areaid");
	if($(this).hasClass("current")){
		$(this).removeClass("current");
		$("span[data-areaid="+areaid+"]").removeClass("cur");
	}else{
		$(this).addClass("current");
		$("span[data-areaid="+areaid+"]").addClass("cur");
	}
})
//穿梭框右侧选中
$("#shuttle_box_right").on('click', 'li span', function () {
    if ($(this).hasClass('cur')) {
        $(this).removeClass('cur');
    } else {
        $(this).addClass('cur');
    }
});
//穿梭框右侧全选
$("#selectAll").click(function (){
	if ($("#selectAll").hasClass('curr')) {
		$("#selectAll").removeClass('curr');
		$("#shuttle_box_right li span").removeClass("cur");
    } else {
    	$("#selectAll").addClass('curr');
    	$("#shuttle_box_right li span").addClass("cur");
    }
	
})

//查询门区
function queryDoorUnitList(){
	$.ajax({
		//url:url+"/DoorUnit/queryDoorAndDeviceList",
		url:url+"/DoorUnit/queryAreaAndDoorList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			var res=data.result;
			if(data.flag){
				var areaList=[];
				for(var i=0;i<res.length;i++){
			    	if(res[i].AreaID!=undefined){
			    		var obj={
				    			"areaid":res[i].AreaID,
				    			"areaname":res[i].AreaName
				    	}
			    		areaList.push(obj);
			    	}
			    }
				var  hash = {}; 
				areaList = areaList.reduce((preVal, curVal) => {
					hash[curVal.areaid] ? '' : hash[curVal.areaid] = true && preVal.push(curVal); 
					return preVal 
				}, [])
				for(var i=0;i<areaList.length;i++){
					var $li1=$("<li class='areaTitle' data-areaid="+areaList[i].areaid+" style='width:100%;font-weight:400;font-size:18px;margin-left:-35px;'>"+areaList[i].areaname+"</li>");
					$("#shuttle_box_right").append($li1);
					for(var k=0;k<res.length;k++){
						if(areaList[i].areaid==res[k].AreaID){
							var doorno=(res[k].DoorNo==undefined?"":res[k].DoorNo);
							var doorname=(res[k].DoorName==undefined?"":res[k].DoorName);
							var doorchannel=(res[k].DoorChannel==undefined?"":res[k].DoorChannel);
							var deviceno=(res[k].DeviceNo==undefined?"":res[k].DeviceNo);
							var devicename=(res[k].DeviceName==undefined?"":res[k].DeviceName);
							var $li=$("<li></li>");
							var $span=$("<span  title='"+doorname+"' class='checkbox' data-areaid="+res[k].AreaID+" data-doorchannel='"+doorchannel+"' data-doorno='"+doorno+"' data-deviceno='"+deviceno+"' data-devicename='"+devicename+"'></span>");
							var $div=$("<div class='layui-elip'></div>");
							$div.append(doorname);
							$li.append($span);
							$li.append($div);
							$("#shuttle_box_right").append($li);
						}
					}
				}
			}
		}
	})
}//end

//给生效时间后的下拉框添加点击事件
$(".delay_time").change(function(){
	var num=$(this).val();
	var nowTime=$("#startdate").val();
	var date=new Date(nowTime);
	var time=date.getTime();
	var ms=num*3600000;
	var date1=new Date(time+ms);
	var year=date1.getFullYear();
	var month=date1.getMonth()+1;
	var day=date1.getDate();
	var hour=date1.getHours();
	var minute=date1.getMinutes();
	var second=date1.getSeconds();
	if(month<=9){
		month="0"+month;
	}
	if(day<=9){
		day="0"+day;
	}
	if(hour<=9){
		hour="0"+hour;
	}
	if(minute<=9){
		minute="0"+minute;
	}
	if(second<=9){
		second="0"+second;
	}
	var currdate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+"00";
	$("#enddate").val(currdate);
})
//根据生效时间给失效时间设置默认值
function expires(){
	//获取当前时间
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var hour=date.getHours();
	var minute=date.getMinutes();
	var second=date.getSeconds();
	if(month<=9){
		month="0"+month;
	}
	if(day<=9){
		day="0"+day;
	}
	if(hour<=9){
		hour="0"+hour;
	}
	if(minute<=9){
		minute="0"+minute;
	}
	if(second<=9){
		second="0"+second;
	}
	var currdate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+"00";
	var date=new Date(currdate);
	var time=date.getTime();
	var ms=2*3600000;
	var date1=new Date(time+ms);
	var year1=date1.getFullYear();
	var month1=date1.getMonth()+1;
	var day1=date1.getDate();
	var hour1=date1.getHours();
	var minute1=date1.getMinutes();
	var second1=date1.getSeconds();
	if(month1<=9){
		month1="0"+month1;
	}
	if(day1<=9){
		day1="0"+day1;
	}
	if(hour1<=9){
		hour1="0"+hour1;
	}
	if(minute1<=9){
		minute1="0"+minute1;
	}
	if(second1<=9){
		second1="0"+second1;
	}
	var currdate1=year1+"-"+month1+"-"+day1+" "+hour1+":"+minute1+":"+"00";
	$("#enddate").val(currdate1)
}//end

//权限下拉框内容改变事件
$("#limitType").change(function(){
	if($(this).val()==2){//次数权限
		$("#limitCount").fadeIn(200);
	}else{
		$("#limitCount").fadeOut(200);
	}
})

//访客登记 添加数据
$("#visitor_sure").click(function(){
	insertVisitorsInfo();
})
function insertVisitorsInfo(){
	var reg2=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
	var idcardno=$("#idcardno").val();//证件号码
	var visitorsname=$("#visitorsname").val();//姓名
	var visitorssextext=$("#visitorssextext").val();//性别
	var nationality=$("#nationality").val();//民族
	var visitorsaddress=$("#visitorsaddress").val();//地址
	var carno=$("#carno").val();//卡号
	var cardid=$("#cardid").val();//证件内码
	var startdate=$("#startdate").val();//生效时间
	var enddate=$("#enddate").val();//失效时间
	var visitorsreasontext=$("#visitorsreasontext").val();//来访事由
	var visitorsdepartmentsname=$("#visitorsdepartmentsname").val();//单位名称
	var dringmodels=$(".province").html()+$("#dringmodels").val();//车牌号
	var phone=$("#phone").val();//联系电话
	var limitType=$("#limitType").val();
	var limitCount=$("#limitCount").val();
	if($("#dringmodels").val()==""){
		dringmodels=="";
	}
	if(visitorsname.length==0){
		layer.msg("访客姓名不能为空！",{time:2000});
		return;
	}
	if(idcardno.length==0){
		layer.msg("证件号码不能为空！",{time:2000});
		return;
	}
	if(!reg2.test(idcardno)){
		layer.msg("请正确输入身份证号！",{time:2000});
		return;
	}
	if(limitType==""){
		layer.msg("请选择权限！",{time:2000});
		return;	
	}
	if(limitType==1){
		limitCount="";
	}else if(limitType==3){
		limitCount=1;
	}
	var receiversname=$("#receiversname").val();
	var holderno=$("#receiversname").attr("data-holderno");
	var deptno=$("#receiversname").attr("data-deptno");
	var deptname=$("#receiversname").attr("data-deptname");
	var receiversphone=$("#receiversphone").val();
	var fixedtelephone=$("#fixedtelephone").val();
	var receiversposition=$("#receiversposition").val();
	var note=$("#note").val();
	if(receiversname.length=="0"){
		layer.msg("请填写被访人姓名!",{time:2000});
		return;
	}
	var cks=$(".box1_ipt span.checkbox.curr");
	var arr=[];
	for(var i=0;i<cks.length;i++){
		var goodsinfo=cks.eq(i).html();
		if(goodsinfo=="其他"){
			goodsinfo=$("#elseThings").val();
		}
		arr.push(goodsinfo);
	}
	var str=arr.toString();
	var applystatus=$(".visitor_box2 span.checkbox").hasClass("cur");
	var applystatusname="";
	
	var formData=new FormData();
	var idphoto=$("#idphoto1").attr("src");
	if(idphoto=="image/person.png"){
		layer.msg("证件照不能为空!",{time:2000});
		return;
	}
	var file=dataURLtoFile(idphoto,"idphoto.png");
	formData.append('photo',file);
	if(applystatus){
		applystatus="10";
		applystatusname="待审批";
	}else{
		applystatus="20";
		applystatusname="不审批";
	}
	//获取选中的门区
	var list=[];
	for(var i=0;i<$(".doorUnit span.cur").length;i++){
		var doorno=$(".doorUnit span.cur").eq(i).attr("data-doorno");
		list.push(doorno);
	}
	list=list.join(",").toString();
	var obj={
			"idcardno":idcardno,
			"visitorsname":visitorsname,
			"visitorssextext":visitorssextext,
			"nationality":nationality,
			"visitorsaddress":visitorsaddress,
			"carno":carno,
			"cardid":cardid,
			"startdate":startdate,
			"enddate":enddate,
			"visitorsreasontext":visitorsreasontext,
			"visitorsdepartmentsname":visitorsdepartmentsname,
			"dringmodels":dringmodels,
			"phone":phone,
			"limitType":limitType,
			"limitCount":limitCount,
			"receiverpeopleid":holderno,
			"receiversname":receiversname,
			"departments":deptno,
			"departmentsname":deptname,
			"receiversphone":receiversphone,
			"fixedtelephone":fixedtelephone,
			"receiversposition":receiversposition,
			"note":note,
			"goodsinfo":str,
			"applystatus":applystatus,
			"applystatusname":applystatusname,
			"doorarr":list
	}
	formData.append("str",JSON.stringify(obj));
	$.ajax({
		url:url+"/VisitorsInfo/insertVisitorsInfoAndPhoto?holderno="+window.top.holderno,
		type:"POST",
		data:formData,
		cache:false,
		async:false,
		contentType:false,
		processData:false,
		//mimeType:"multipart/form-data",
		success:function(data){
			layer.msg(data.reason,{time:2000});
			if(!data.flag){
				return;
			}
			 
		}
	})
}//end


//点击省份
$(".province").click(function(){
	$(".vehicleInfo_shadow").fadeIn(500);
	$(".provinceJc").fadeIn(500);
})
//点击省份弹出框的叉
$(".provinceJc .quxiao").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".provinceJc").fadeOut(500);
})
//点击省份弹出框中的简称赋值
$(".province_center ul li").click(function(){
	$(".province").html($(this).html());
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".provinceJc").fadeOut(500);
})
//点击允许出入位置弹出框的叉
$(".visitor_box .layer_top .quxiao").click(function(){
	$(".visitor").fadeOut(500);
	$(".visitor_box").fadeOut(500);
})//end
//点击弹出框取消
$(".cancel").click(function(){
	$(".visitor").fadeOut(500);
	$(".visitor_box").fadeOut(500);
})//end
//点击弹出框的全选
$(".door_top .checkbox").click(function(){
	if($(this).hasClass("cur")){
		$(this).removeClass("cur");
		$(".door_vertical ul li .checkbox").removeClass("curr");
	}else{
		$(this).addClass("cur");
		$(".door_vertical ul li .checkbox").addClass("curr");
	}
})//end
//点击弹出框的复选框
$(document).on("click",".door_vertical ul li .checkbox",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
	if($(".door_vertical ul li .curr").length==$(".door_vertical ul li .checkbox").length){
		$(".door_top .checkbox").addClass("cur");
	}else{
		$(".door_top .checkbox").removeClass("cur");
	}
})//end

//点击携带物品下的复选框
$(".box1_l span.checkbox").click(function(){
	if($(this).hasClass("curr")){
		if($(this).html()=="其他"){
			$("#elseThings").hide();
		}
		$(this).removeClass("curr");
	}else{
		if($(this).html()=="其他"){
			$("#elseThings").show();
		}
		$(this).addClass("curr");
	}
	
})//end
//点击被访人信息   是否审批复选框
$(".visitor_box2 span.checkbox").click(function(){
	if($(this).hasClass("cur")){
		$(this).removeClass("cur");
	}else{
		$(this).addClass("cur");
	}
})//end


//根据人员姓名查被访人信息
function queryVisitoredHolderByName(str){
	var obj={"str":str};
	$.ajax({
		url:url+"/VisitorsInfo/queryVisitoredHolderByName",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			$(".door_center ul").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:3000});
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var departmentno=(val.departmentno==undefined?"":val.departmentno);
				var departmentname=(val.departmentname==undefined?"":val.departmentname);
				var mobilephone=(val.mobilephone==undefined?"":val.mobilephone);
				var fixedtelephone=(val.fixedtelephone==undefined?"":val.fixedtelephone);
				var floorroom=(val.floorroom==undefined?"":val.floorroom);
			     html+="<li data-holderno='"+holderno+"' data-holdername='"+holdername+"' " +
			     	"data-deptno='"+departmentno+"' " +
			     	"data-deptname='"+departmentname+"' " +
			     	"data-mobilephone='"+mobilephone+"' " +
			     	"data-fixedtelephone='"+fixedtelephone+"' " +
			     	"data-floorroom='"+floorroom+"'>" +
			     	"<div class='personPhoto'><img src='image/person.png'>" +
					"</div><div class='holderInfo'>" +
					"<p>工号:<span>"+holderno+"</span></p>" +
					"<p>姓名:<span>"+holdername+"</span></p>" +
					"<p>部门:<span>"+departmentname+"</span></p>"+
					"</div></li>";
			})
			$(".door_center ul").append(html);
		}
	})
}//end

//点击搜索 根据工号、姓名、电话、分机号查被访人信息
$("#queryVisitorsedHolderInfo").click(function(){
	var str=$("#str").val();
	queryVisitoredHolderByName(str);
	//queryVisitorsInfoByIDCardNo();
})	

//点击选择   查看已访问过的被访人 历史被访人
$(".choose").click(function(){
	$(".vehicleInfo_shadow").fadeIn(500);
	$(".vehicleInfo").fadeIn(500);
	$(".vehicle_top_query").val("");
	$(".door_center ul").empty();
	queryVisitorsInfoByIDCardNo();
})
//根据访客身份证号查访客信息
function queryVisitorsInfoByIDCardNo(){
	var idcardno=$("#idcardno").val();
	var str=$("#str").val();
	var obj={"idcardno":idcardno,"str":str};
	console.log(obj)
	$.ajax({
		url:url+"/VisitorsInfo/queryVisitorsInfoByIDCardNo",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			$(".door_center ul").empty();
			if(!data.flag){
				$(".door_center ul").html("暂无历史被访人可查！");
				return;
			}
				var html="";
				$.each(data.result,function(i,val){
					var receiverpeopleid=(val.receiverpeopleid==undefined?"":val.receiverpeopleid);
					var receiversname=(val.receiversname==undefined?"":val.receiversname);
					var departments=(val.departments==undefined?"":val.departments);
					var departmentsname=(val.departmentsname==undefined?"":val.departmentsname);
					var receiversphone=(val.receiversphone==undefined?"":val.receiversphone);
					var fixedtelephone=(val.fixedtelephone==undefined?"":val.fixedtelephone);
					var receiversposition=(val.receiversposition==undefined?"":val.receiversposition);
				     html+="<li data-holderno='"+receiverpeopleid+"' data-holdername='"+receiversname+"' " +
				     	"data-deptno='"+departments+"' " +
				     	"data-deptname='"+departmentsname+"' " +
				     	"data-mobilephone='"+receiversphone+"' " +
				     	"data-fixedtelephone='"+fixedtelephone+"'" +
				     	"data-floorroom='"+receiversposition+"'>" +
				     	"<div class='personPhoto'><img src='image/person.png'>" +
						"</div><div class='holderInfo'>" +
						"<p>工号:<span>"+receiverpeopleid+"</span></p>" +
						"<p>姓名:<span>"+receiversname+"</span></p>" +
						"<p>部门:<span>"+departmentsname+"</span></p>"+
						"</div></li>";
				})
				$(".door_center ul").append(html);
			
		}
	})
}//end

var stream;
var media=0;
//访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }
}

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');	

function success(stream) {
    //兼容webkit核心浏览器
    let CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源   
    stream = stream;
    //video.src = CompatibleURL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
    
    $(".vehicleInfo_shadow").fadeIn(500);
	$(".personFace2").fadeIn(500);
	timer=setInterval(function(){
		contrastFace()
	},2000);
}

function error(error) {
    layer.msg("访问用户媒体设备失败!",{time:2000});
}


function contrastFace(){
	context.drawImage(video, 27,60,433,370,0,0,533,432);
	// 获取图片base64链接
	var image = canvas.toDataURL('image/png');
	// 定义一个img
	var img = document.getElementById("dataphoto1");
	//将图片添加到页面中
	img.src = image;
	var id_image = $("#idphoto1").attr("src");
	var file1 = dataURLtoFile(image, "idphoto.png"); //现场照
	var file2 = dataURLtoFile(id_image, "dataphoto.png");//证件照
	/*var formData = new FormData();
	formData.append("photo", file1);
	formData.append("photo", file2);*/
	var obj={"file1":id_image,"file2":image};
	//console.log(formData.getAll("photo"));
	$.ajax({
		/* type:"POST", // 数据提交类型
		 url:url+"/contrast/ContrastFace", // 发送地址
	     data:formData, //发送数据
	     processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
	     contentType: false,*/
		 url: url+"/LH_FaceRecog/recog", // 发送地址
         type: "POST", // 数据提交类型
         data: obj, //发送数据
         dataType:"json",
	     success: function(data) {
	    	 console.log(data)
	 		 if(data.resultcode=="0"){
	 			//如果是0 成功
	            var score=data.score==undefined?0:data.score;
	            if(score>0.6){
	            	$(".vehicleInfo_shadow").fadeOut(500);
			 		$(".personFace2").fadeOut(500);
			 		$(".process .pass").show();
			 		$(".process .failed").hide();
			 		if(video.srcObject!=null){
			 			video.srcObject.getTracks()[0].stop(); //结束关闭流
			 		}
			 		clearInterval(timer);
	            }else{
                 	//layer.msg("识别失败，相似度太低！",{time:1000});
    	 			$(".process .pass").hide();
    		 		$(".process .failed").html("识别失败，相似度太低");
	            }
	 			
	 		 }else{
	 			layer.msg("识别失败！",{time:1000});
	 			$(".process .pass").hide();
		 		$(".process .failed").show();
	 		 }
	    },
	     error:function(data){
	    	$(".vehicleInfo_shadow").fadeOut(500);
	    	$(".personFace2").fadeOut(500);
	    	$(".process .pass").hide();
	 		$(".process .failed").show();
	    	if(video.srcObject!=null){
	    		video.srcObject.getTracks()[0].stop(); //结束关闭流
	    	}
	    	clearInterval(timer);
	    }
	})
}
//将base64转file文件
function dataURLtoFile(dataurl,filename){
		var arr=dataurl.split(',');
		var mime=arr[0].match(/:(.*?);/)[1];
		var bstr=atob(arr[1]);
		//var bstr=window.atob(arr[1]);
		var n=bstr.length;
		var u8arr=new Uint8Array(n);
		while(n--){
			u8arr[n]=bstr.charCodeAt(n);
		}
		//转换成file对象
		var obj= new File([u8arr],filename,{type:mime});
		//转换成blob对象
		//var obj=new Blob([u8arr],{type:mime});
		return obj;
}//end

//点击遮罩关闭人脸比对框
$(".vehicleInfo_shadow").click(function(){
	$(".process .pass").hide();
	$(".process .failed").show();
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".provinceJc").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
	$(".visitor").fadeOut(500);
	$(".visitor_box").fadeOut(500);
	$(".personFace2").fadeOut(500);
	if(video.srcObject!=null){
		video.srcObject.getTracks()[0].stop(); //结束关闭流
	}
	clearInterval(timer);
})
//点击无证取照
$("#Unlicensed_taking").click(function(){
	if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
	    //调用用户媒体设备, 访问摄像头
	    getUserMedia({ video: { width: 533, height: 432 } }, success, error);
	} else {
	    alert('不支持访问用户媒体');
	}
	layer.open({
		type:1,
		title:"拍摄取照",
		content:$("#personFace"),
		btn:["确定","取消"],
		area:["600px","600px"],
		yes:function(index){
			if(video.srcObject==null){
				layer.msg("请连接摄像头!",{time:2000});
				return;
			}
			context.drawImage(video, 27,60,433,370,0,0,533,432);
			// 获取图片base64链接
			var image = canvas.toDataURL('image/png');
			// 定义一个img
			var img = document.getElementById("dataphoto1");
			//将图片添加到页面中
			img.src = image;
			if(video.srcObject!=null){
	 			video.srcObject.getTracks()[0].stop(); //结束关闭流
	 		}
			layer.close(index);
		}
	})
})
//点击读卡
$(".readCard").click(function(){
	readIDCard();
})
//点击发卡
$("#carno").click(function(){
	readM1Card();
})
var socket;
function openReader() {
		var host = "ws://localhost:33666";
		if(socket == null){
			socket = new WebSocket(host);
		}else{
			console.log("已初始化.");
		}
		try {
			socket.onopen = function () {
				console.log("初始化成功.");
				//getVersion(); 
			};
			socket.onclose = function () {
				console.log("读卡服务已经断开.");
			};
			socket.onerror = function(){
				console.log("请检查控件是否正常安装.");
			};
			socket.onmessage = function (msg) {
				if (typeof msg.data == "string") {
					var msgM=msg.data+"";
					var msgJson = JSON.parse(msgM);
					//resultMsg(msgM);        
					switch(msgJson.fun) {

						case "EST_GetVersion#":
							layer.msg("版本号："+msgJson.errMsg,{time:2000})
						break;
							
						case "EST_Reader_ReadIDCard#":
							if (msgJson.rCode == "0") {
								document.getElementById("idcardno").value = msgJson.certNo; //身份证号码      
								$("#visitorsname").val(msgJson.name);
								$("#visitorssextext").val(msgJson.sex);
								$("#nationality").val(msgJson.nation);
								$("#visitorsname").val(msgJson.name);
								$("#visitorsname").val(msgJson.name);
								$("#visitorsname").val(msgJson.name);
								$("#visitorsaddress").val(msgJson.address);
								$(".person_l").attr("src","data:image/png;base64,"+msgJson.base64Data);
								posBeep();
								ReadCertID();
								if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
								    //调用用户媒体设备, 访问摄像头
								    getUserMedia({ video: { width: 533, height: 432 } }, success, error);
								} else {
								    alert('不支持访问用户媒体');
								}
								/*if(video.srcObject==null){
									layer.msg("请连接摄像头！",{time:2000});
								}*/
							}
							else if(msgJson.rCode == "-2"){
								layer.msg("请放身份证",{time:2000})
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_ReadCertID#":
							if (msgJson.rCode == "0") {
								document.getElementById("cardid").value = msgJson.UID;  
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000})
							}
						break;
						
						case "EST_ReadBankCard#":
							if (msgJson.rCode == "0") {
								document.getElementById("text_Bank_ID").value = msgJson.bankCard;
								posBeep();
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_ReadM1Card#":
							if (msgJson.rCode == "0") {
								console.log(msgJson)
								document.getElementById("carno").value = msgJson.UID; //IC卡卡号
								posBeep();
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_ReadSocialCard#":   //社保卡信息，个别地区社保卡不按国家规范来的，会读取信息不全
							if (msgJson.rCode == "0") { 
								document.getElementById("S_text_name").value = msgJson.XM;  //社保卡姓名  
								document.getElementById("S_text_sex").value = msgJson.XB;  //社保卡性别             
								document.getElementById("S_text_nation").value = msgJson.MZ;  //社保卡民族                      
								document.getElementById("S_text_birthday").value = msgJson.CSRQ; //社保卡出生日期                  
								document.getElementById("S_text_idNum").value = msgJson.SHBZHM; //社保卡身份证号      
								document.getElementById("S_text_effDate").value = msgJson.FKRQ; //社保卡有效期开始
								document.getElementById("S_text_expDate").value = msgJson.KYXQ; //社保卡有效期结束
								document.getElementById("S_text_kahao").value = msgJson.SBKH; //社保卡卡号
								posBeep();
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_IDRequest#":
								if (msgJson.rCode == "0") {
									layer.msg("找到身份证",{time:2000})
								}
								else {
									layer.msg(msgJson.errMsg,{time:2000});
								}
						break;

						default:
							break;
					}
				}
				else{
					layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
				}
			};
		}
		catch (ex) {
			layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
		}
	}

	//读取IC卡号，包括M1、CPU卡，8位16进制数据
	function readM1Card() {
		try { 
			if (socket.readyState == 1) {
				socket.send("EST_ReadM1Card#");  
			}
			else {
				layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
			}
		}
		catch (ex) {
			layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
		}
	}


	//读取身份证物理ID，16位8进制数据，一般情况用不到，可以注释掉
	function ReadCertID() {
		try { 
			if (socket.readyState == 1) {
				socket.send("EST_ReadCertID#"); 
			}
			else {
				layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
			}
		}
		catch (ex) {
			layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
		}
	}



	//蜂鸣器控制，可以自己选择是否蜂鸣
	function posBeep() {
		if (socket.readyState == 1) {
				socket.send("EST_PosBeep#");
			}
			else {
				layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
			}
	}


	//读取身份证信息
	function readIDCard() {
		try {
			if (socket.readyState == 1) {
				socket.send("EST_Reader_ReadIDCard#");    
			}
			else {
				layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
			}
		}
		catch (ex) {
			layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
		}
	}//end
	
