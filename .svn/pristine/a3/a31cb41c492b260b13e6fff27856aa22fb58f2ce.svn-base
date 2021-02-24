$(function(){
	//获取犯人数据
	getTrajectory();
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  
		  //执行一个laydate实例
		  laydate.render({
		    elem: '#inStartTime' //指定元素
		  });
	});
})
var limit=20;
var page=1;
//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				 page=obj.curr;
	             limit=obj.limit;
				if(!first){
					pagination(page,limit,count);
				}
			}
		})
	})
}//end
//点击搜索
$("#queryPrisonerByConditionBtn").click(function(){
	getTrajectory();
})
//获取点名记录
function getTrajectory(){
	var prisonerName=$("#prisonerName").val();
	var labelCode=$("#labelCode").val();
	var obj={"prisonerName":prisonerName,"labelCode":labelCode};
	$.ajax({
		url:url+"/prisonCallRecord/getTrajectory",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $tr=$("<tr><td>"+item.prisonerName+"</td><td>"+item.prisonName+"</td><td>"+item.areaName+"</td><td>"+item.callNameTime2+"</td>" +
							"<td>"+item.callerName+"</td></tr>");
					$("#cont").append($tr);
				}
				count=res.length;
				pagination(1,20,count)
				getPage(count);
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
//分页
function pagination(curr, limit, count) {
    var dep = document.getElementById("cont")
    var departmentInfo = document.getElementsByTagName("table")
    startRow = (curr - 1) * limit //每页显示第一条数据的行数
    lastRow = curr * limit-1 //每页显示最后一条数据的行数
    var totalRow = count
    lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
    for (var i = 0; i < totalRow; i++) { //遍历数据
        var hrow = dep.rows[i]
        if (i >= startRow && i <= lastRow) {
            hrow.style.display = ""
        } else {
            hrow.style.display = "none"
        }
    }
}