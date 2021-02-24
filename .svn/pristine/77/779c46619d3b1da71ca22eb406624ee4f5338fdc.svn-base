$(function(){
	//查询角色
	queryApproverRoleList();
	//查询门区
	getABDoorLimit();
})
//根据页面获取门区
$(".selectY").change(function(){
	getABDoorLimit();
})
//点击用户搜索
$("#searchUser").click(function(){
	queryApproverRoleList();
})
//查询门区
function getABDoorLimit(){
	var id=$(".selectY").val();
	var holderno=$(".approval_role li.current").data("holderno");
	var obj={
			"pageID":id,
			"holderNo":holderno
	}
	$.ajax({
		url:url+"/doorUnit2/getABDoorLimit",
		type:"POST",
		data:obj,
		success:function(data){
			var res=data.result;
			$(".selectDoorList").empty();
			if(data.flag){
				if(id==1){
					for(var item of res){
						var $li=$("<li data-doorno='"+item.doorNo+"' class='layui-elip'>"+item.doorName+"</li>");
						if(item.holderNo!=undefined){//已经与人员绑定
							$li=$("<li data-doorno='"+item.doorNo+"' class='layui-elip current'>"+item.doorName+"</li>");
						}
						$(".selectDoorList").append($li);
					}
				}else if(id==2){//门禁状态控制
					var areaList=[];
					for(var i=0;i<res.length;i++){
				    	if(res[i].AreaID!=undefined){
				    		var obj={
					    			"areaid":res[i].AreaID,
					    			"areaname":res[i].areaName
					    	}
				    		areaList.push(obj);
				    	}
				    }
					var  hash = {}; 
					areaList = areaList.reduce((preVal, curVal) => {
						hash[curVal.areaid] ? '' : hash[curVal.areaid] = true && preVal.push(curVal); 
						return preVal 
					}, []);
					for(var i=0;i<areaList.length;i++){
						var $li1=$("<div class='areaTitle' style='display:block;font-weight:400;font-size:18px;margin:10px 9px;background:#eee;padding:10px;'>"+areaList[i].areaname+"</div>");
						$(".selectDoorList").append($li1);
						for(var k=0;k<res.length;k++){
							if(areaList[i].areaid==res[k].AreaID){
								var doorno=(res[k].doorNo==undefined?"":res[k].doorNo);
								var doorname=(res[k].doorName==undefined?"":res[k].doorName);
								var $li=$("<li data-doorno='"+doorno+"' class='layui-elip'>"+doorname+"</li>");
								if(res[i].holderNo!=undefined){//已经与人员绑定
									$li=$("<li data-doorno='"+doorno+"' class='layui-elip current'>"+doorname+"</li>");
								}
								$(".selectDoorList").append($li);
							}
						}
					}
				}
			}
		}
	})
}
//点击门区
$(document).on("click",".selectDoorList li",function(){
	if($(".approval_role li.current").length==0){
		layer.msg("请选择用户!",{time:2000});
		return;
	}
	var optType=1;
	if($(this).hasClass("current")){
		$(this).removeClass("current");
		optType=2;
	}else {
		$(this).addClass("current");
		optType=1;
	}
	var doorno=$(this).data("doorno");
	
	setABDoorLimit(doorno,optType);
})
function setABDoorLimit(doorno,optType){
	var pageid=$(".selectY").val();
	var holderno=$(".approval_role li.current").data("holderno");
	var obj={"pageID":pageid,"holderNo":holderno,"doorID":doorno,"optType":optType};
	$.ajax({
		url:url+"/doorUnit2/setABDoorLimit",
		type:"post",
		data:obj,
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}
//点击角色查人
$(document).on("click",".approval_role li",function(){
	$(this).addClass("current").siblings().removeClass("current");
	getABDoorLimit();
})
//查询角色
function queryApproverRoleList(){
	var holdername=$("#selectHolderno").val();
	var obj={"holdername":holdername}
	$.ajax({
		url:url+"/HolderData/queryHolderDataList?str="+window.top.holderno,
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			$(".approval_role").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderno==undefined?"":item.holderno);
					var holdername=(item.holdername==undefined?"":item.holdername);
					var $li=$("<li data-holderno='"+holderno+"'>"+holdername+"</li>");
					$(".approval_role").append($li);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

