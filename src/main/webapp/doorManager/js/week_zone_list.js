$(function(){
	queryWeekZoneList();
})

//获取所有时段
function queryWeekZoneList(){
	$.ajax({
		url:url+"/DoorWeekZone/queryWeekZoneList",
		type:"post",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var timeName=item.name==undefined?"":item.name;
					var updateperson=item.updateperson==undefined?"":item.updateperson;
					var updatedate=item.updatedate==undefined?"":item.updatedate;
					var $tr=$("<tr><td>"+item.id+"</td><td>"+timeName+"</td></tr>");
					var arr1=item.weekzone1.split(";");
					var arr2=item.weekzone2.split(";");
					var arr3=item.weekzone3.split(";");
					var arr4=item.weekzone4.split(";");
					var arr5=item.weekzone5.split(";");
					var arr6=item.weekzone6.split(";");
					var arr7=item.weekzone7.split(";");
					
					var $td1=$("<td><p>周一: <span>"+arr1[0]+"</span><span>"+arr1[1]+"</span><span>"+arr1[2]+"</span></p>" +
							"<p>周二: <span>"+arr2[0]+"</span><span>"+arr2[1]+"</span><span>"+arr2[2]+"</span></p>" +
							"<p>周三: <span>"+arr3[0]+"</span><span>"+arr3[1]+"</span><span>"+arr3[2]+"</span></p>" +
							"<p>周四: <span>"+arr4[0]+"</span><span>"+arr4[1]+"</span><span>"+arr4[2]+"</span></p>" +
							"<p>周五: <span>"+arr5[0]+"</span><span>"+arr5[1]+"</span><span>"+arr5[2]+"</span></p>" +
							"<p>周六: <span>"+arr6[0]+"</span><span>"+arr6[1]+"</span><span>"+arr6[2]+"</span></p>" +
							"<p>周日: <span>"+arr7[0]+"</span><span>"+arr7[1]+"</span><span>"+arr7[2]+"</span></p></td>");
					var $td2=$("<td>"+updateperson+"</td><td>"+updatedate+"</td><td><a href='week_zone_add.html?id="+item.id+"' class='layui-btn layui-btn-xs  update'>修改</a>" +
							"<a href='javascript:;' data-id="+item.id+" class='layui-btn layui-btn-xs layui-btn-danger del'>删除</a></td>")
					$tr.append($td1);
					$tr.append($td2);
					$("#cont").append($tr);
				}
			}
		}
	})
}
//点击删除
$(document).on("click",".del",function(){
	var id=$(this).attr("data-id");
	var that=this;
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		$.ajax({
			url:url+"/DoorWeekZone/delete",
			type:"post",
			data:{"id":id},
			success:function(data){
				layer.close(index);
				if(data.flag){
					$(that).parent().parent().remove();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})
