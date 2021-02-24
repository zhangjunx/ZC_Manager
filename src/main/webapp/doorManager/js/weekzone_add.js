$(function(){
	//getDate();
	if(getUrlParam("id")!=undefined){
		$(".main-tab .curr a").html("修改");
		queryWeekZoneListById(getUrlParam("id"));
	}
	$(".door_span .ipt").val("00:00");
})
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
//点击确定提交数据
$("#addBtn").click(function(){
	saveInfo();
})
//
function saveInfo(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	if($("#name").val()==""){
		layer.msg("请填写模板名称!");
		return;
	}
	//验证时间段大小
	for(var i=0;i<$(".date1").length;i++){
		var date1=new Date(year+"/"+month+"/"+day+" "+$(".date1").eq(i).val()).getTime();
		var date2=new Date(year+"/"+month+"/"+day+" "+$(".date2").eq(i).val()).getTime();
		var date3=new Date(year+"/"+month+"/"+day+" "+$(".date3").eq(i).val()).getTime();
		var date4=new Date(year+"/"+month+"/"+day+" "+$(".date4").eq(i).val()).getTime();
		var date5=new Date(year+"/"+month+"/"+day+" "+$(".date5").eq(i).val()).getTime();
		var date6=new Date(year+"/"+month+"/"+day+" "+$(".date6").eq(i).val()).getTime();
		if(date2<date1){
			var week=$(".date2").eq(i).parent().prev().html();
			week=week.substring(0,2);
			var timeDuan=$(".date2").eq(i).siblings().eq(0).html();
			timeDuan=timeDuan.substring(0,3);
			layer.msg(week+timeDuan+"结束时间不能小于开始时间!",{time:2000});
			return;
		}
		if(date4<date3){
			var week=$(".date4").eq(i).parent().prev().html();
			week=week.substring(0,2);
			var timeDuan=$(".date4").eq(i).siblings().eq(0).html();
			timeDuan=timeDuan.substring(0,3);
			layer.msg(week+timeDuan+"结束时间不能小于开始时间!",{time:2000});
			return;
		}
		if(date6<date5){
			var week=$(".date6").eq(i).parent().prev().html();
			week=week.substring(0,2);
			var timeDuan=$(".date6").eq(i).siblings().eq(0).html();
			timeDuan=timeDuan.substring(0,3);
			layer.msg(week+timeDuan+"结束时间不能小于开始时间!",{time:2000});
			return;
		}
	}
		var len=$(".door_span .ipt").length;
		var weekzone="";
		for(var k=0;k<len;k++){
			if($(".door_span .ipt").eq(k).val()==""){
				var week=$(".door_span .ipt").eq(k).parent().prev().html();
				week=week.substring(0,2);
				var timeDuan=$(".door_spanc .ipt").eq(k).siblings().eq(0).html();
				timeDuan=timeDuan.substring(0,3);
				layer.msg(week+timeDuan+"不能为空!",{time:2000});
				return;
			}
			if(k%2!=0){
				weekzone+=$(".door_span .ipt").eq(k).val()+";";
			}else{
				weekzone+=$(".door_span .ipt").eq(k).val()+"-";
			}
		}
		weekzone=weekzone.split(";");
		weekzone.pop();
		var arr=spArray(3,weekzone);
		if(getUrlParam("id")!=undefined){//修改
			var obj={
					"name":$("#name").val(),
					"id":getUrlParam("id"),
					"weekzone1":arr[0][0]+";"+arr[0][1]+";"+arr[0][2],
					"weekzone2":arr[1][0]+";"+arr[1][1]+";"+arr[1][2],
					"weekzone3":arr[2][0]+";"+arr[2][1]+";"+arr[2][2],
					"weekzone4":arr[3][0]+";"+arr[3][1]+";"+arr[3][2],
					"weekzone5":arr[4][0]+";"+arr[4][1]+";"+arr[4][2],
					"weekzone6":arr[5][0]+";"+arr[5][1]+";"+arr[5][2],
					"weekzone7":arr[6][0]+";"+arr[6][1]+";"+arr[6][2],
			}
			var toggle="/DoorWeekZone/update?holderno="+window.top.holderno;
		}else{//新增
			var obj={
					"name":$("#name").val(),
					"weekzone1":arr[0][0]+";"+arr[0][1]+";"+arr[0][2],
					"weekzone2":arr[1][0]+";"+arr[1][1]+";"+arr[1][2],
					"weekzone3":arr[2][0]+";"+arr[2][1]+";"+arr[2][2],
					"weekzone4":arr[3][0]+";"+arr[3][1]+";"+arr[3][2],
					"weekzone5":arr[4][0]+";"+arr[4][1]+";"+arr[4][2],
					"weekzone6":arr[5][0]+";"+arr[5][1]+";"+arr[5][2],
					"weekzone7":arr[6][0]+";"+arr[6][1]+";"+arr[6][2],
			}
			var toggle="/DoorWeekZone/insert?holderno="+window.top.holderno;
		}
	$.ajax({
		url:url+toggle,
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					window.location.href="week_zone_list.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
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
//从url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
//获取一条数据
function queryWeekZoneListById(id){
	$.ajax({
		url:url+"/DoorWeekZone/queryWeekZoneList",
		type:"post",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			if(data.flag){
				var res=data.result;
				$("#name").val(res[0].name);
				var arrlist=[];
				for(var item of res){
						var obj={
								"id":item.id,"name":item.name,
								"weekzone":item.weekzone1+";"+item.weekzone2+";"+item.weekzone3+";"+item.weekzone4+";"+item.weekzone5+";"+item.weekzone6+";"+item.weekzone7
						}
						arrlist.push(obj);
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

