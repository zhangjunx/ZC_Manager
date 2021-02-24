$(function(){
	getDeptTree();
	queryDoorUnitList();//查询门区
	showHide();//跟权限有关
	queryWeekZoneList();//获取时间段
	getHDoorArrList();
});
//日期
function getDate() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		lay(".ipt").each(function() {
			laydate.render({
				elem : this, // 指定元素
				trigger : "click",
				type : "time",
				format:"HH:mm",
			});
		})
	})
}// end


//点击保存为模板
$(".saveMould").click(function(){
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
				insertWeekZone(modelName);
				layer.close(i);
			}
		}
	})
})
//提交模板信息
function insertWeekZone(modelName){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	//验证时间段大小
	for(var i=0;i<$(".date1").length;i++){
		var date1=new Date(year+"/"+month+"/"+day+" "+$(".date1").eq(i).val()).getTime();
		var date2=new Date(year+"/"+month+"/"+day+" "+$(".date2").eq(i).val()).getTime();
		var date3=new Date(year+"/"+month+"/"+day+" "+$(".date3").eq(i).val()).getTime();
		var date4=new Date(year+"/"+month+"/"+day+" "+$(".date4").eq(i).val()).getTime();
		var date5=new Date(year+"/"+month+"/"+day+" "+$(".date5").eq(i).val()).getTime();
		var date6=new Date(year+"/"+month+"/"+day+" "+$(".date6").eq(i).val()).getTime();
		if(date2<date1){
			var week=$(".date2").eq(i).parent().parent().prev().html();
			week=week.substring(0,2);
			var timeDuan=$(".date2").eq(i).siblings().eq(0).html();
			timeDuan=timeDuan.substring(0,3);
			layer.msg(week+timeDuan+"结束时间不能小于开始时间!",{time:2000});
			return;
		}
		if(date4<date3){
			var week=$(".date4").eq(i).parent().parent().prev().html();
			week=week.substring(0,2);
			var timeDuan=$(".date4").eq(i).siblings().eq(0).html();
			timeDuan=timeDuan.substring(0,3);
			layer.msg(week+timeDuan+"结束时间不能小于开始时间!",{time:2000});
			return;
		}
		if(date6<date5){
			var week=$(".date6").eq(i).parent().parent().prev().html();
			week=week.substring(0,2);
			var timeDuan=$(".date6").eq(i).siblings().eq(0).html();
			timeDuan=timeDuan.substring(0,3);
			layer.msg(week+timeDuan+"结束时间不能小于开始时间!",{time:2000});
			return;
		}
	}
		var len=$(".ipt").length;
		var weekzone="";
		var id=$(".weekzone_title").attr("data-id");
		for(var k=0;k<len;k++){
			if($(".ipt").eq(k).val()==""){
				var week=$(".ipt").eq(k).parent().parent().prev().html();
				week=week.substring(0,2);
				var timeDuan=$(".ipt").eq(k).siblings().eq(0).html();
				timeDuan=timeDuan.substring(0,3);
				layer.msg(week+timeDuan+"不能为空!",{time:2000});
				return;
			}
			if(k%2!=0){
				weekzone+=$(".ipt").eq(k).val()+";";
			}else{
				weekzone+=$(".ipt").eq(k).val()+"-";
			}
		}
		weekzone=weekzone.split(";");
		weekzone.pop();
		var arr=spArray(3,weekzone);
		var obj={
				"name":modelName,
				"weekzone1":arr[0][0]+";"+arr[0][1]+";"+arr[0][2],
				"weekzone2":arr[1][0]+";"+arr[1][1]+";"+arr[1][2],
				"weekzone3":arr[2][0]+";"+arr[2][1]+";"+arr[2][2],
				"weekzone4":arr[3][0]+";"+arr[3][1]+";"+arr[3][2],
				"weekzone5":arr[4][0]+";"+arr[4][1]+";"+arr[4][2],
				"weekzone6":arr[5][0]+";"+arr[5][1]+";"+arr[5][2],
				"weekzone7":arr[6][0]+";"+arr[6][1]+";"+arr[6][2],
		}
	$.ajax({
		url:url+"/DoorWeekZone/insert?holderno="+window.top.holderno,
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
			if(data.flag){
				queryWeekZoneList();
			}
		}
	})
}

//点击选择模板下拉框
$(".selectMoudle").change(function(){
	var id=$(this).val();
	queryWeekZoneListById(id);
})
//根据下拉框的值获取时间模板
function queryWeekZoneListById(id){
	$.ajax({
		url:url+"/DoorWeekZone/queryWeekZoneList",
		type:"post",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			$(".weekzonelist .ipt").val("00:00");
			if(data.flag){
				var res=data.result;
				var arrlist=[];
				for(var item of res){
						var obj={
								"id":item.id,"name":item.name,
								"weekzone":item.weekzone1+";"+item.weekzone2+";"+item.weekzone3+";"+item.weekzone4+";"+item.weekzone5+";"+item.weekzone6+";"+item.weekzone7
						}
						arrlist.push(obj);
						$(".weekzone_title").attr("data-id",item.id).html(item.name);
				}
				for(var item of arrlist){
					var list=item.weekzone.split(";");
					list=list.join("-");
					var array=list.split("-");
					for(var i=0;i<array.length;i++){
						if(array[i]==""){
							$(".ipt").eq(i).val("00:00");
						}else{
							$(".ipt").eq(i).val(array[i]);
						}
					}
				}
				getDate();
			}
		}
	})
}
//获取时间段
function queryWeekZoneList(){
	$.ajax({
		url:url+"/DoorWeekZone/queryWeekZoneList",
		type:"post",
		success:function(data){
			console.log(data);
			$(".selectMoudle").empty();
			//$(".selectMoudle option").not(":first").remove();
			$(".weekzonelist .ipt").val("00:00");
			if(data.flag){
				var res=data.result;
				var arrlist=[];
				var index=0;
				for(var item of res){
					var $opt=$("<option value="+item.id+">"+item.name+"</option>");
					$(".selectMoudle").append($opt);
					if(index==0){
						var obj={
								"id":item.id,"name":item.name,
								"weekzone":item.weekzone1+";"+item.weekzone2+";"+item.weekzone3+";"+item.weekzone4+";"+item.weekzone5+";"+item.weekzone6+";"+item.weekzone7
						}
						arrlist.push(obj);
						$(".weekzone_title").attr("data-id",item.id).html(item.name);
						
					}
					index++;
				}
				for(var item of arrlist){
					var list=item.weekzone.split(";");
					list=list.join("-");
					var array=list.split("-");
					for(var i=0;i<array.length;i++){
						if(array[i]==""){
							$(".ipt").eq(i).val("00:00");
						}else{
							$(".ipt").eq(i).val(array[i]);
						}
					}
				}
				/*for(var item of arrlist){
					var list=item.weekzone.split(";");
					var array=spArray(3,list);
					$(".weekzone_title").attr("data-id",item.id).html(item.name);
					console.log(array)
					for(var i=0;i<array.length;i++){
						for(var k=0;k<array[i].length;k++){
							var arr2=array[i][k].split("-");
							for(var m=0;m<arr2.length;m++){
								
							}
						}
					}
				}*/
				getDate();
			}
		}
	})
}
//分割数组
function spArray(N,Q){
	var R = [],F;
	for (F = 0;F < Q.length;) {
		R.push(Q.slice(F,F += N))
	}
	return R
}
//选择出入门区模板
$(".selectDoorMoudle").change(function(){
	$(".doorUnit span").removeClass("cur");
	var doorarr=$(this).val();
	if(doorarr==""){
		return;
	}
	doorarr=doorarr.split(",");
	for(var item of doorarr){
		$("span[data-doorno="+item+"]").addClass("cur");
	}
})
//获取门区模板
function getHDoorArrList(){
	$.ajax({
		url:url+"/DoorArrModule/getHDoorArrList",
		type:"post",
		success:function(data){
			$('.selectDoorMoudle option').not('option:first').remove();
			if(data.flag){
				var res=data.reason;
				for(var item of res){
					var modelName=item.name==undefined?"":item.name;
					var $opt=$("<option value="+item.doorarr+">"+modelName+"</option>");
					$(".selectDoorMoudle").append($opt);
				}
			}
		}
	})
}

//点击门区里面的保存为模板
$(".saveMoudle").click(function(){
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
					url:url+"/DoorArrModule/insert?holderno="+window.top.holderno,
					type:"post",
					data:{"doorarr":arr,"name":modelName,"type":"H"},
					success:function(data){
						layer.close(i);
						if(data.flag){
							getHDoorArrList();
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






	//穿梭框左侧选中
$("#shuttle_box_left").on('click', 'li', function () {
    if ($(this).hasClass('shuttle_box_li_act')) {
        $(this).removeClass('shuttle_box_li_act');
    } else {
        $(this).addClass('shuttle_box_li_act');
    }
});
//穿梭框左侧全选
$("#selectll").click(function (){
	if ($("#selectll").hasClass('curr')) {
		$("#selectll").removeClass('curr');
		//最里层的复选框如果被选中，就点击一次
    	for(var i=0;i<$("#shuttle_box_left .layui-icon-file").length;i++){
    		if($("#shuttle_box_left .layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")==true){
    			$("#shuttle_box_left .layui-icon-file").eq(i).parent().next().next().click();
    		}
    	}
    } else {
    	$("#selectll").addClass('curr');
    	//最里层的复选框如果被选中，就点击一次
    	for(var i=0;i<$("#shuttle_box_left .layui-icon-file").length;i++){
    		if($("#shuttle_box_left .layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")!=true){
    			$("#shuttle_box_left .layui-icon-file").eq(i).parent().next().next().click();
    		}
    	}
    }
})

//穿梭框左侧反选
$("#selectInverse").click(function(){
	if ($("#selectInverse").hasClass('current')) {
		$("#selectInverse").removeClass('current');
		$("#selectll").removeClass('curr');
		$("#shuttle_box_right li span").removeClass("cur");
		for(var i=0;i<$("#shuttle_box_left li").length;i++){
			if($("#shuttle_box_left li").eq(i).hasClass("shuttle_box_li_act")){
				$("#shuttle_box_left li").eq(i).removeClass("shuttle_box_li_act");
			}else{
				$("#shuttle_box_left li").eq(i).addClass("shuttle_box_li_act")
			}
		}
    } else {
    	$("#selectInverse").addClass('current');
    	$("#selectll").removeClass('curr');
    	$("#shuttle_box_right li span").removeClass("cur");
    	for(var i=0;i<$("#shuttle_box_left li").length;i++){
			if($("#shuttle_box_left li").eq(i).hasClass("shuttle_box_li_act")){
				$("#shuttle_box_left li").eq(i).removeClass("shuttle_box_li_act");
			}else{
				$("#shuttle_box_left li").eq(i).addClass("shuttle_box_li_act")
			}
		}
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
//穿梭框右侧反选
$("#selectInvert").click(function(){
	if ($("#selectInvert").hasClass('curren')) {
		$("#selectInvert").removeClass("curren");
		$("#selectAll").removeClass("curr");
		for(var i=0;i<$("#shuttle_box_right li span").length;i++){
			if($("#shuttle_box_right li span").eq(i).hasClass("cur")){
				$("#shuttle_box_right li span").eq(i).removeClass("cur");
			}else{
				$("#shuttle_box_right li span").eq(i).addClass("cur")
			}
		}
	}else{
		$("#selectInvert").addClass("curren");
		$("#selectAll").removeClass("curr");
		for(var i=0;i<$("#shuttle_box_right li span").length;i++){
			if($("#shuttle_box_right li span").eq(i).hasClass("cur")){
				$("#shuttle_box_right li span").eq(i).removeClass("cur");
			}else{
				$("#shuttle_box_right li span").eq(i).addClass("cur")
			}
		}
	}
})
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
//选中人员，只有一人被选中时显示已被绑定的门区
$(document).on("click","#shuttle_box_left li",function(){
	if($(".shuttle_box_li_act").length==1){
		var holderno=$(".shuttle_box_li_act").find(".username").attr("id");
		console.log(holderno);
		queryDoorHolderByHolder(holderno);
	}else if($(".shuttle_box_li_act").length==0){
		$("#shuttle_box_right .checkbox").removeClass("cur");
		$("#selectAll").removeClass("curr");
	}else{
		$("#selectAll").removeClass("curr");
	}
})
//根据人员查询已被绑定的门区
function queryDoorHolderByHolder(holderno){
	var obj={"holderno":holderno};
	 $.ajax({
		  url:url+'/CAP_TimeZoneDoorHolder/queryDoorHolderByHolder',
		  type:'POST',
		  //data:JSON.stringify(obj),
		  data:obj,
		  dataType:"json",
		  //contentType:"application/json",
		  success:function(data){
			  console.log(data)
			if(data.flag){
				var res=data.result;
			for(var k=0;k<res.length;k++){
				for(var i=0;i<$("#shuttle_box_right .checkbox").length;i++){
					var doorno=$("#shuttle_box_right .checkbox").eq(i).attr("data-doorno");
					if(res[k]==doorno){
						$("#shuttle_box_right .checkbox").eq(i).addClass("cur");
					}
				}
			}
				
			}
		  }
	 })
}//end

//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#sure").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="4005"){
			list.push(item);
			$("#sure").show();
		}
	})
}//end

//获取部门数据
function getDeptTree(){
	layui.use(['tree', 'util'], function(){
		  var tree = layui.tree,
		  layer = layui.layer,
		  util = layui.util
		  $.ajax({
			 //url:url+"/DepartmentData/getDeptTree",
			//url:url+"/DepartmentData/getMyDeptTree",
			 url:url+"/ACL_Roles/getDeptTreeByMyRole",
			 type:"POST",//类型
			 data:{"holderno":window.top.holderno},
			 dataType:'json',
			 success:function(data){
				    tree.render({
				    elem: '#test12',
				    data:  data.result,
				    showCheckbox: true,  //是否显示复选框
				    id: 'demoId1',
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function(obj){
				    },
				    oncheck: function(obj){
			        	  var arrlist=[];
						  for(var i=0;i<$(".layui-form-checked").length;i++){
					  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
					  	  arrlist.push(id);
					    }
						 layui.use(['tree','util'],function(){
							 var tree=layui.tree,
							 layer=layui.layer,
							 util=layui.util
							 $.ajax({
						    	url:url+"/CardData/getCardTree",
							     type:"POSt",
							     contentType:"application/json", // 指定这个协议很重要
							     dataType:"json",
							     data:JSON.stringify(arrlist),
							     success:function(data){
							    	 tree.render({
							    		elem:"#shuttle_box_left",
							    		data:data.result,
							    		showCheckbox:true,//是否显示复选框
							    		id: 'demoId1',
									    isJump: true ,//是否允许点击节点时弹出新窗口跳转
									    click: function(obj){
									    	console.log(obj);
									    },
									    oncheck: function(obj){
									    	var len=$("#shuttle_box_left .layui-form-checked").length;
									    	var cardLength=obj.data.children.length;
									    	var holdernoLen=parseInt(len)-parseInt(cardLength);
									    	if(len==0){
									    		$("#shuttle_box_right span.checkbox").removeClass("cur");
									    	}
									    	if(len==1){//只有一个被选中，人员下无卡
									    		var holderno=$("#shuttle_box_left .layui-form-checked").prev().val();
									    		queryExistDoor(holderno);
									    	}else if(len==2&&cardLength==0&&obj.data.parent!=""&&obj.checked==true){//只有一个人被选中,人员下有卡
									    		var holderno=obj.data.parent;
									    		var cardid=obj.data.title;
									    		queryExistDoor(holderno,cardid);
									    	}
									    }
							    	 })
							    	  
							     }
						      })
							 
						 })
						     
					  }
				  });
			  }
		  })
	})
}

//选中的第一个人 根据工号 和卡号（如果有卡的话，没有就只传工号）
function queryExistDoor(holderno,cardid){
	if(cardid==undefined){
		var obj={"holderno":holderno};
	}else{
		var obj={"holderno":holderno,"cardid":cardid};
	}
	$.ajax({
		url:url+"/DoorPermHolder/queryExistDoor",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			$("#shuttle_box_right span.checkbox").removeClass("cur");
			if(data.flag){
				var res=data.result;
				for(var item of res){
					$("span[data-doorno="+item.doorno+"]").addClass("cur");
				}
			}
		}
	})
}

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
					var $li1=$("<li class='areaTitle' data-areaid="+areaList[i].areaid+" style='display:block;font-weight:400;font-size:18px;margin-left:-35px;'>"+areaList[i].areaname+"</li>");
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


//点击确定传值
$("#sure").click(function(){
	insertBatch();	
})
function insertBatch(){
	var index=layer.load(2,{shade:[0.5,'#fff']});
	//获取时段
		var id=$(".weekzone_title").attr("data-id");
		var len=$(".ipt").length;
		var weekzone="";
		for(var k=0;k<len;k++){
			if(k%2!=0){
				weekzone+=$(".ipt").eq(k).val()+";";
			}else{
				weekzone+=$(".ipt").eq(k).val()+"-";
			}
			
		}
		weekzone=weekzone.split(";");
		weekzone.pop();
		var arr=spArray(3,weekzone);
		var obj2={
				"weekzone1":arr[0][0]+";"+arr[0][1]+";"+arr[0][2],
				"weekzone2":arr[1][0]+";"+arr[1][1]+";"+arr[1][2],
				"weekzone3":arr[2][0]+";"+arr[2][1]+";"+arr[2][2],
				"weekzone4":arr[3][0]+";"+arr[3][1]+";"+arr[3][2],
				"weekzone5":arr[4][0]+";"+arr[4][1]+";"+arr[4][2],
				"weekzone6":arr[5][0]+";"+arr[5][1]+";"+arr[5][2],
				"weekzone7":arr[6][0]+";"+arr[6][1]+";"+arr[6][2],
		}
	var arr=[];
	for(var k=0;k<$("#shuttle_box_left .layui-form-checked").length;k++){
		var id=$("#shuttle_box_left .layui-form-checked").eq(k).parent().parent().parent().attr("data-id");//被选中的id
		for(var i=0;i<$("#shuttle_box_left .layui-icon-file").length;i++){
			var perssionid=$("#shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");//最底层的id
			if(id==perssionid){//被选中的最底层的id
				if(id.indexOf("d")!=-1){//最底层的被选中的卡号,有卡的人员
					var cardid=$("#shuttle_box_left .layui-form-checked").eq(k).next().html();
					var holderno=$("#shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().parent().parent().attr("data-id");
					for(var m=0;m<$("#shuttle_box_right span.cur").length;m++){
						var deviceno=$("#shuttle_box_right span.cur").eq(m).attr("data-deviceno");
						var doorno=$("#shuttle_box_right span.cur").eq(m).attr("data-doorno");
						var obj={
								"deviceno":deviceno,
								"doorno":doorno,
								"cardid":cardid,
								"holderno":holderno,
								"list":obj2
						}
						arr.push(obj);
					}
				}else{//没有卡的人员
					var holderno1=$("#shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");
					for(var m=0;m<$("#shuttle_box_right span.cur").length;m++){
						var deviceno1=$("#shuttle_box_right span.cur").eq(m).attr("data-deviceno");
						var doorno1=$("#shuttle_box_right span.cur").eq(m).attr("data-doorno");
						var obj1={
								"deviceno":deviceno1,
								"doorno":doorno1,
								"holderno":holderno1,
								"list":obj2
						}
						arr.push(obj1);
					}
				}
			}
		}
}
	console.log(arr);
	$.ajax({
		 url:url+"/DoorPermHolder/insertBatch?str="+window.top.holderno,
		 type:"POST",
         data:JSON.stringify(arr), 
		 dataType:"json",
		 contentType:"application/json", // 指定这个协议很重要
		 success:function(data){
			 console.log(data);
			 layer.close(index);
			 layer.msg(data.reason,{time:2000});
			 if(data.flag){
				    //所有人员
					var arr=[];
					var doorList=[];
					 for(var k=0;k<$("#shuttle_box_left .layui-form-checked").length;k++){
						 var id=$("#shuttle_box_left .layui-form-checked").eq(k).parent().parent().parent().attr("data-id");//被选中的id
						 if(id.indexOf("d")==-1){//人员id
							 arr.push("'"+id+"'");
						 }
					 }
					 var personArr=arr.join(",");
					 //所有门区
					 for(var m=0;m<$("#shuttle_box_right span.cur").length;m++){
						 var doorno=$("#shuttle_box_right span.cur").eq(m).attr("data-doorno");
						 doorList.push("'"+doorno+"'");
					 }
					 var doorArr=doorList.join(",");
					 //时段
					 var date=new Date();
					 var day=date.getDay();
					 var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
					 var dayTime=weekday[day];
					 var dateList=$("p[data-day="+dayTime+"]").next().find(".ipt");
					 var timeArr=[];
					 for(var i=0;i<dateList.length;i++){
						 var time=$("p[data-day="+dayTime+"]").next().find(".ipt").eq(i).val()+":00";
						 timeArr.push(time);
					 }
					 var timeList=timeArr.join(",");
					 addUserLimit(personArr,doorArr,timeList);
			 }
			 
		 }
	})
}//end
//成功回调
function addUserLimit(personArr,doorArr,timeList){
	$.ajax({
		url:url+"/ufaceOffLine/addUserLimit",
		type:"post",
		data:{"personArr":personArr,"doorArr":doorArr,"timeList":timeList},
		success:function(data){
			console.log(data);
		}
	})
}


//点击移除传值
$("#del").click(function(){
	deleteBatch();	
})
function deleteBatch(){
	var index=layer.load(2,{shade:[0.5,'#fff']});
	//获取时段
		var id=$(".weekzone_title").attr("data-id");
		var len=$(".ipt").length;
		var weekzone="";
		for(var k=0;k<len;k++){
			if(k%2!=0){
				weekzone+=$(".ipt").eq(k).val()+";";
			}else{
				weekzone+=$(".ipt").eq(k).val()+"-";
			}
			
		}
		weekzone=weekzone.split(";");
		weekzone.pop();
		var arr=spArray(3,weekzone);
		var obj2={
				"weekzone1":arr[0][0]+";"+arr[0][1]+";"+arr[0][2],
				"weekzone2":arr[1][0]+";"+arr[1][1]+";"+arr[1][2],
				"weekzone3":arr[2][0]+";"+arr[2][1]+";"+arr[2][2],
				"weekzone4":arr[3][0]+";"+arr[3][1]+";"+arr[3][2],
				"weekzone5":arr[4][0]+";"+arr[4][1]+";"+arr[4][2],
				"weekzone6":arr[5][0]+";"+arr[5][1]+";"+arr[5][2],
				"weekzone7":arr[6][0]+";"+arr[6][1]+";"+arr[6][2],
		}
	var arr=[];
	for(var k=0;k<$("#shuttle_box_left .layui-form-checked").length;k++){
		var id=$("#shuttle_box_left .layui-form-checked").eq(k).parent().parent().parent().attr("data-id");//被选中的id
		for(var i=0;i<$("#shuttle_box_left .layui-icon-file").length;i++){
			var perssionid=$("#shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");//最底层的id
			if(id==perssionid){//被选中的最底层的id
				if(id.indexOf("d")!=-1){//最底层的被选中的卡号,有卡的人员
					var cardid=$("#shuttle_box_left .layui-form-checked").eq(k).next().html();
					var holderno=$("#shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().parent().parent().attr("data-id");
					for(var m=0;m<$("#shuttle_box_right span.cur").length;m++){
						var deviceno=$("#shuttle_box_right span.cur").eq(m).attr("data-deviceno");
						var doorno=$("#shuttle_box_right span.cur").eq(m).attr("data-doorno");
						var obj={
								"deviceno":deviceno,
								"doorno":doorno,
								"cardid":cardid,
								"holderno":holderno,
								"list":obj2
						}
						arr.push(obj);
					}
				}else{//没有卡的人员
					var holderno1=$("#shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");
					for(var m=0;m<$("#shuttle_box_right span.cur").length;m++){
						var deviceno1=$("#shuttle_box_right span.cur").eq(m).attr("data-deviceno");
						var doorno1=$("#shuttle_box_right span.cur").eq(m).attr("data-doorno");
						var obj1={
								"deviceno":deviceno1,
								"doorno":doorno1,
								"holderno":holderno1,
								"list":obj2
						}
						arr.push(obj1);
					}
				}
			}
		}
}
	/*if(arr.length>123){
		layer.msg("对不起，移除数量太大，请分次移除！",{time:2000})
		return;
	}*/
	$.ajax({
		 url:url+"/DoorPermHolder/deleteBatch?str="+window.top.holderno,
		 type:"POST",
         data:JSON.stringify(arr), 
		 dataType:"json",
		 contentType:"application/json", // 指定这个协议很重要
		 success:function(data){
			 console.log(data);
			 layer.close(index);
			 layer.msg(data.reason,{time:2000});
			 if(data.flag){
				 //所有人员
					var arr=[];
					var doorList=[];
					 for(var k=0;k<$("#shuttle_box_left .layui-form-checked").length;k++){
						 var id=$("#shuttle_box_left .layui-form-checked").eq(k).parent().parent().parent().attr("data-id");//被选中的id
						 if(id.indexOf("d")==-1){//人员id
							 arr.push("'"+id+"'");
						 }
					 }
					 var personArr=arr.join(",");
					 //所有门区
					 for(var m=0;m<$("#shuttle_box_right span.cur").length;m++){
						 var doorno=$("#shuttle_box_right span.cur").eq(m).attr("data-doorno");
						 doorList.push("'"+doorno+"'");
					 }
					 var doorArr=doorList.join(",");
					 deleteUserLimit(personArr,doorArr);
			 }
		 }
	})
}//end
//成功回调
function deleteUserLimit(personArr,doorArr){
	$.ajax({
		url:url+"/ufaceOffLine/delUserLimit",
		type:"post",
		data:{"personArr":personArr,"doorArr":doorArr},
		success:function(data){
			console.log(data);
		}
	})
}
