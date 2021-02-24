$(function(){
	queryHolderListByDeptNos();
	//定时器
	var timer=setInterval(queryHolderListByDeptNos,2000);
	//点击刷新
	$(".realTime_refresh").click(function(){
		window.location.reload();
	})
	
	//点击实时刷新,切换复选框状态
	$(".checkbox").click(function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			clearInterval(timer);
		}else{
			$(this).addClass("curr");
			timer=setInterval(queryHolderListByDeptNos,2000);
		}
	}) 
})
$(".realTime_cover").click(function(){
	$(".realTime_layer").fadeOut(500);
	$(".realTime_cover").fadeOut(500);
})

//点击人员显示状态
$(document).on("click",".realTime_information",function(){
	$(".realTime_cover").fadeIn(500);
	$(".realTime_layer").fadeIn(500);
	$(".title").html("");
	$(".holdername").html("");
	$(".deptname").html("");
	$(".cardTime").html("");
	$(".cardLocation").html("");
	$(".cardInformation").html("");
	$("#photo").attr("src","../img/person.png");
	var datano=$(this).attr("data-datano");
	//console.log(datano);
	if(datano=="undefined"){
		$(".title").html("未打卡");
		return;
	}
	$.ajax({
		url:url+"/IOData/queryIOLastAreaByDataNo",
		type:"POST",
		data:{"datano":datano},
		success:function(data){
			console.log(data);
			if(!data.flag){
				return;
			}
			var holdername=(data.result.holdername==undefined?"":data.result.holdername);
			var deptname=(data.result.deptname==undefined?"":data.result.deptname);
			var iotime=(data.result.iotime==undefined?"":data.result.iotime);
			var doorname=(data.result.doorname==undefined?"":data.result.doorname);
			var iostatus=(data.result.iostatus==undefined?"":data.result.iostatus);
			var photo=(data.result.photo==undefined?"":data.result.photo);
			if(photo.length>0){
				$("#photo").attr("src","data:image/png;base64,"+photo);
			}else{
				$("#photo").attr("src","../img/person.png");
			}
			if(iostatus==11){
				$(".title").html("在岗信息");
				$(".holdername").html(holdername);
				$(".deptname").html(deptname);
				$(".cardTime").html(iotime);
				$(".cardLocation").html(doorname);
				$(".cardInformation").html("进入");
			}else if(iostatus==12){
				$(".title").html("离岗信息");
				$(".holdername").html(holdername);
				$(".deptname").html(deptname);
				$(".cardTime").html(iotime);
				$(".cardLocation").html(doorname);
				$(".cardInformation").html("外出");
			}/*else{
				$(".title").html("离岗信息");
				$(".holdername").html(holdername);
				$(".deptname").html(deptname);
				$(".cardTime").html(iotime);
				$(".cardLocation").html(doorname);
				$(".cardInformation").html("无效信息");
			}	*/
		 }
		})
})
//点击取消
$(".quxiao").click(function(){
	$(".realTime_layer").fadeOut(500);
	$(".realTime_cover").fadeOut(500);
})


//查询部门 以及部门下的所有人员
function queryHolderListByDeptNos(){
	  var str=window.top.holderno;
	  $.ajax({
		url:url+"/IOData/queryIOLastAreaList?str="+str,
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			$("#cont").empty();
			var res=data.result;
			var res2=data.result2;
			if(!data.flag){
				return;
			}
			var arr=[];
			for(var m=0;m<res.length;m++){
				var obj={
						"deptname":res[m].DepartmentName,
						"deptno":res[m].DepartmentNo
				}
				arr.push(obj);
			}
			//数组去重
			let hash = {}; 
			newarr = arr.reduce((preVal, curVal) => {
				hash[curVal.deptno] ? '' : hash[curVal.deptno] = true && preVal.push(curVal); 
				return preVal 
			}, [])
			var onduty=0;//在岗
			var offduty=0;//离岗
			var noPlayCard=0;//未打卡
			var cc=0;//出差
			var qj=0;//请假
			for(var i=0;i<newarr.length;i++){
				var $tr=$("<tr></tr>");
				var $td1=$("<td></td>");
				var $td2=$("<td class='text_location'></td>");
				for(var k=0;k<res.length;k++){
					if(newarr[i].deptno==res[k].DepartmentNo){
						var $div=$("<div data-datano='"+res[k].DataNo+"' class='realTime_information'></div>");
						var $span=$("<span></span>");
						var $img=$("<img src=''>");
						if(res[k].IOStatus==11){
							$img.attr("src","../img/realTime5.png");
							$div.css("background","#E4EFF9");
							onduty++;
						}else if(res[k].IOStatus==12){
							for(var j=0;j<res2.length;j++){
								if(res[k].HolderNo==res2[j].HolderNo){//请假/出差
									if(res2[j].TopicType=="cc"){
										$img.attr("src","../img/realTime1.png");
										$div.css("background","green");
										cc++;
									}else if(res2[j].TopicType=="qj"){
										$img.attr("src","../img/realTime3.png");
										$div.css("background","lightgoldenrodyellow");
										qj++;
									}
								}else{
									$img.attr("src","../img/realTime2.png");
									$div.css("background","#eee");
									offduty++;
								}
							}
						}else{
							for(var j=0;j<res2.length;j++){
								if(res[k].HolderNo==res2[j].HolderNo){//请假/出差
									if(res2[j].TopicType=="cc"){
										$img.attr("src","../img/realTime1.png");
										$div.css("background","green");
										cc++;
									}else if(res2[j].TopicType=="qj"){
										$img.attr("src","../img/realTime3.png");
										$div.css("background","lightgoldenrodyellow");
										qj++;
									}
								}else{
									$img.attr("src","../img/realTime4.png");
									$div.css("background","#FF8040");
									noPlayCard++;
								}
							}
						}
						$span.append(res[k].HolderName);
						$div.append($img);
						$div.append($span);
						$td2.append($div);
					}
				}
				$td1.append(newarr[i].deptname);
				$tr.append($td1);
				$tr.append($td2);
				$("#cont").append($tr);
			}
			$("#onduty").html(onduty);
			$("#offduty").html(offduty);
			$("#noPlayCard").html(noPlayCard);
			$("#cc").html(cc);
			$("#qj").html(qj);
		  }
		})
}//end

