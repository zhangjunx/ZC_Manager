$(function(){
	//初始化时间模板下拉框
	getTimeMoldelList();
	getDate();
})
//点击搜索
$("#queryPrisonerByConditionBtn").click(function(){
	getOneTimeMoldelInfo();//创建表头
})
//根据时间模板创建表头
function getOneTimeMoldelInfo(){
	var i=layer.load(2);
	var fid=$(".timeTemplate").val();
	$.ajax({
		url:url+"/callTimesModel/getOneTimeMoldelInfo",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			layer.close(i)
			$("table").find("tr:first").remove();
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var length=res.timeList.length;
				var $tr=$("<tr><td class='trackTitle'><span class='prisonName'>姓名</span><span class='location'>位置</span>" +
						"<span class='callTime'>时间</span><i class='line1'></i><i class='line2'></i></li></ul>");
				var index=1;
				for(var item of res.timeList){
					var $td=$("<td data-index="+index+" class='tdTitle'>"+item.startTime+"~"+item.endTime+"</td>");
					$tr.append($td);
					index++;
				}
				$("table").append($tr);
				getTrajectory(length);
			}
		}
	})
}
//获取轨迹
function getTrajectory(length){
	var time=$("#dateTime").val();
	var timeMoudleID=$(".timeTemplate").val();
	$.ajax({
		url:url+"/prisonCallRecord/getTrajectory",
		type:"post",
		data:{"callNameTime":time,"timeMoudleID":timeMoudleID},
		success:function(data){
			if(data.flag){
				var res=data.result;
				var arr=[];
				for(var item of res){
					var obj={
							"prisonerID":item.prisonerID,
							"prisonerName":item.prisonerName,
							"callNameTime":item.callNameTime2,
							"areaName":item.areaName
					}
					arr.push(obj);
				}
				//数组中包含的对象去重
				var hash = {}; 
				var newarr = arr.reduce((preVal, curVal) => {
					hash[curVal.prisonerID] ? '' : hash[curVal.prisonerID] = true && preVal.push(curVal); 
					return preVal 
				}, [])
				//创建表格内容,用prisonerID和索引关联表头
				for(var i=0;i<newarr.length;i++){
					var $tr=$("<tr><td>"+newarr[i].prisonerName+"</td></tr>")
					for(var k=1;k<length+1;k++){
						var $td=$("<td id="+newarr[i].prisonerID+"td"+k+"></td>");
						$tr.append($td);
					}
					$("#track").append($tr);
				}
				//表格内容赋值
				for(var item of arr){
					for(var current of newarr){
						if(item.prisonerID==current.prisonerID){
							//循环表头时间段，判断当前数据时间点是否在表头某一时间段内
							for(var i=0;i<$(".tdTitle").length;i++){
								var timeDuan=$(".tdTitle").eq(i).html();
								timeDuan=timeDuan.split("~");
								if(timeRange(timeDuan[0], timeDuan[1], item.callNameTime)){
									var index=$(".tdTitle").eq(i).attr("data-index");
									$("#"+item.prisonerID+"td"+index).html(item.areaName);
								};
							}
						}
					}
				}
				
			}
		}
	})
}
//判断时间点是否在某一时间段内
function timeRange(beginTime, endTime, nowTime) {
	  var strb = beginTime.split (":");
	  if (strb.length != 2) {
	    return false;
	  }
	 
	  var stre = endTime.split (":");
	  if (stre.length != 2) {
	    return false;
	  }
	 
	  var strn = nowTime.split (":");
	  if (stre.length != 2) {
	    return false;
	  }
	  var b = new Date ();
	  var e = new Date ();
	  var n = new Date ();
	 
	  b.setHours (strb[0]);
	  b.setMinutes (strb[1]);
	  e.setHours (stre[0]);
	  e.setMinutes (stre[1]);
	  n.setHours (strn[0]);
	  n.setMinutes (strn[1]);
	 
	  if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
	    return true;
	  } else {
	    return false;
	  }
	}
//初始化时间模板下拉框
function getTimeMoldelList(){
	$.ajax({
		url:url+"/callTimesModel/getTimeMoldelList",
		type:"post",
		success:function(data){
			$(".timeTemplate option").find("not:first").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value="+item.fid+">"+item.modelName+"</option>");
					$(".timeTemplate").append($opt);
				}
			}
			getOneTimeMoldelInfo();
		}
	})
}
//日期
function getDate() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;
			laydate.render({
				elem : "#dateTime", // 指定元素
				type : "date",
				value:new Date()
			});
	})
}// end