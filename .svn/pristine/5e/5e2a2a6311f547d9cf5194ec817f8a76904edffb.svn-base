$(function(){
	//获取犯人数据
	getPrisonerList();
	getPage(total);
	getPrisonList();//获取监区信息
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  
		  //执行一个laydate实例
		  laydate.render({
		    elem: '#inStartTime' //指定元素
		  });
	});
})
var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:pagesize,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;
				pagesize=obj.limit;
				if(!first){
					getPrisonerList();
				}
			}
		})
	})
}//end
//点击搜索
$("#queryPrisonerByConditionBtn").click(function(){
	getPrisonerList();
})
//点击删除
$(document).on("click",".shan",function(){
	var fid=$(this).attr("data-fid");
	var that=this;
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/prisoner/delOnePrison",
			type:"post",
			data:{"fid":fid},
			success:function(data){
				if(data.flag){
					$(that).parent().parent().remove();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})
//获取犯人数据
function getPrisonerList(){
	var prisonerName=$("#prisonerName").val();
	var labelCode=$("#labelCode").val();
	var prisonID=$("#prisonID").val();
	var inStartTime=$("#inStartTime").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"prisonerName":prisonerName,"labelCode":labelCode,"prisonID":prisonID,"inStartTime":inStartTime};
	$.ajax({
		url:url+"/prisoner/getPrisonerList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data)
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var prisonerName=item.prisonerName==undefined?"":item.prisonerName;//姓名
					var prisonerName2=item.prisonerName2==undefined?"":item.prisonerName2;//曾用名
					var prisonName=item.prisonName==undefined?"":item.prisonName;//归属监区
					var IDCard=item.IDCard==undefined?"":item.IDCard;//身份证号
					var age=item.age==undefined?"":item.age;//年龄
					var sex=item.sex==undefined?"":item.sex;//性别
					var inStartTime=item.inStartTime==undefined?"":item.inStartTime;//拘留时间
					var arrestingOrgan=item.arrestingOrgan==undefined?"":item.arrestingOrgan;//逮捕机关
					var judgmentOrgan=item.judgmentOrgan==undefined?"":item.judgmentOrgan;//判决机关
					var startTime=item.startTime==undefined?"":item.startTime;//刑期开始时间
					var endTime=item.endTime==undefined?"":item.endTime;//刑期结束时间
					var labelCode=item.labelCode==undefined?"":item.labelCode;//标签号
					inStartTime=timestampToTime(inStartTime);
					startTime=timestampToTime(startTime);
					endTime=timestampToTime(endTime);
					var $tr=$("<tr><td>"+prisonerName+"</td><td>"+prisonerName2+"</td><td>"+prisonName+"</td><td>"+IDCard+"</td>" +
							"<td>"+age+"</td><td>"+sex+"</td><td>"+inStartTime+"</td>" +
							"<td>"+arrestingOrgan+"</td><td>"+judgmentOrgan+"</td><td>"+startTime+"</td><td>"+endTime+"</td>" +
							"<td>"+item.status+"</td><td>"+labelCode+"</td><td><a href='prisoner_watch.html?fid="+item.fid+"' class='layui-btn layui-btn-xs layui-btn-warm'>查看详情</a>" +
						    "<a href='prisoner_add.html?fid="+item.fid+"' class='layui-btn layui-btn-xs'>修改</a>" +
						    "<a href='javascript:;' data-fid="+item.fid+" class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>");
					$("#cont").append($tr);
				}
			}
		}
	})
}
//获取监区信息
function getPrisonList(){
	$.ajax({
		url:url+"/prison/getPrisonList",
		type:"post",
		success:function(data){
			$("#prisonID").find("not:first").remove();
			if(data.flag){
				for(var item of data.result){
					var $opt=$("<option value="+item.fid+">"+item.prisonName+"</option>");
					$("#prisonID").append($opt);
				}
			}
		}
	})
}
//时间戳转换日期
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10?"0"+date.getDate():date.getDate() + ' ';
    return Y+M+D;
}