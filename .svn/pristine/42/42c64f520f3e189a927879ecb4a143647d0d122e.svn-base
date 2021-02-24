$(function() {
	queryDoorUnitList();
	$("#name2").val(localStorage.name);
	$("#type2").val(localStorage.type);
	
})//end
//点击门区选择
$("#openDoorList").click(function(){
	$("#shuttle_box_right span").removeClass("cur");
	if($("span.doorName").length!=0){
		for(var i=0;i<$("span.doorName").length;i++){
			var doorno=$("span.doorName").eq(i).attr("data-doorno");
			$("#shuttle_box_right span[data-doorno="+doorno+"]").addClass("cur");
		}
	}
	layer.open({
		type:1,
		content:$("#DoorList"),
		area:["650px","600px"],
		btn:["确定","取消"],
		yes:function(index){
			if($("#shuttle_box_right span.cur").length==0){
				layer.msg("请选择通行门区",{time:2000});
				return;
			}
			$("span.doorName").remove();
			for(var i=0;i<$("#shuttle_box_right span.cur").length;i++){
				var doorno=$("#shuttle_box_right span.cur").eq(i).attr("data-doorno");
				var doorname=$("#shuttle_box_right span.cur").eq(i).attr("title");
				var $span=$("<span class='doorName' data-doorno="+doorno+">"+doorname+"</span>");
				$span.insertBefore($("#openDoorList"));
			}
			layer.close(index);
		}
	})
})
//通行门区双击删除
$(document).on("dblclick","span.doorName",function(){
	$(this).remove();
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
				if(getUrlParam("id")==0){//修改页面
					var doorList=localStorage.doorarr.split(",");
					for(var i=0;i<doorList.length;i++){
						$("#shuttle_box_right span[data-doorno="+doorList[i]+"]").addClass("cur");
						var doorname=$("#shuttle_box_right span[data-doorno="+doorList[i]+"]").attr("title");
						var $span=$("<span class='doorName' data-doorno="+doorList[i]+">"+doorname+"</span>");
						$span.insertBefore($("#openDoorList"));
					}
				}
				
			}
		}
	})
}//end
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}


//修改
$("#updateBtn").click(function(){
	update();
})//end
function update(){//修改
	var id=localStorage.id;
	var name=$("#name2").val();
	var type=$("#type2").val();
	var doorarr=[];
	if($("span.doorName").length==0){
		layer.msg("请选择通行门区！",{time:2000})
		return;
	}else{
		for(var i=0;i<$("span.doorName").length;i++){
			var doorno=$("span.doorName").eq(i).attr("data-doorno");
			doorarr.push(doorno);
		}
	}
	doorarr=doorarr.join(",");
	var obj={"id":id,"name":name,"type":type,"doorarr":doorarr};
	console.log(obj)
	$.ajax({
		url:url+"/DoorArrModule/update?holderno="+window.top.holderno,
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
		}
	})
}//end
//新增
$("#addBtn").click(function(){
	insert();
})//end
function insert(){//添加角色
	var name=$("#name").val();
	var type=$("#type").val();
	var doorarr=[];
	if($("span.doorName").length==0){
		layer.msg("请选择通行门区！",{time:2000})
		return;
	}else{
		for(var i=0;i<$("span.doorName").length;i++){
			var doorno=$("span.doorName").eq(i).attr("data-doorno");
			doorarr.push(doorno);
		}
	}
	doorarr=doorarr.join(",");
	var obj={"name":name,"type":type,"doorarr":doorarr};
	if(name.length==0 ){
		layer.msg("模板名称不能为空！",{time:2000})
		return;
	}
	if(type.length==0){
		layer.msg("模板类别不能为空！",{time:2000})
		return;
	}
	console.log(obj)
	$.ajax({
		url:url+"/DoorArrModule/insert?holderno="+window.top.holderno,
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}//end


