$(function(){
	//初始化仓库列表
	getList();
})
var page=1;//当前页
var limit=10;//每页显示条数
var total;
//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//总条数
			curr:page,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				pagination(page,limit,total);
				if(!first){
					pagination(page,limit,total);
				}
			}
		})
	})
}//end
//点击在线预览
$(document).on("click",".watch",function(){
	var index=layer.load(2);
	var path=$(this).attr("data-path");
	$.ajax({
		url:url+"/zcFileManager/viewFileOnLine",
		type:"post",
		data:{"path":path},
		success:function(data){
			layer.close(index);
			if(data.flag){
			  layer.open({
			        type : 2,
			        title : '<span class="layer-title-move-text">文件预览</span>',
			        shadeClose : true,
			        move : '.layer-title-move-text',
			        shade : false,
			        resize : true,
			        maxmin : true, // 开启最大化最小化按钮
			        area : ['90%', '92%'],
			        content : data.result
			    });
			}else{
				layer.msg(data.reason,{time:2000});
			}
		},
		error:function(){
			layer.close(index);
		}
	})
})
//点击确定
$("#insertMbasedatabtn").click(function(){
	if($("#cont .curr").length == 0){
		layer.msg("请选择文件!",{time:2000});
		return;
	}
	parent.$("#fileBox").empty();
	for(var i=0;i<$("#cont .curr").length;i++){
		var path=$("#cont .curr").eq(i).attr("data-path");
		var filename=$("#cont .curr").eq(i).attr("data-filename");
		var $a=$("<a href="+path+" style='margin:0 5px'>"+filename+"</a>");
		parent.$("#fileBox").append($a);
	}
	parent.layer.closeAll();
})
//点击取消
$("#abolish").click(function(){
	parent.layer.closeAll();
})
//点击复选框
$(document).on("click","#cont .checkbox",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})

//点击搜索
$("#createInStorage").click(function(){
	getList();
})
//初始化设备技术规范库
function getList(){
	var fileName=$("#fileName").val();
	var obj={"fileName":fileName};
	console.log(obj);
	$.ajax({
		url:url+"/zcFileManager/getFileList",
		type:"post",
		data:obj,
		//contentType: 'application/json',
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var fileName=item.fileName==undefined?"":item.fileName;
					var path=item.path==undefined?"":item.path;
					var updateTime=item.updateTime==undefined?"":item.updateTime;
					var $tr=$("<tr><td><span class='checkbox' style='float:none' data-filename="+fileName+" data-path="+path+"></span></td>" +
							"<td>"+index+"</td><td>"+fileName+"</td><td>"+path+"</td><td>"+updateTime+"</td><td>" +
							"<a href='javascript:;' data-path="+item.path+" class='layui-btn layui-btn-xs watch'>在线预览</a></td></tr>");
					index++;
					$("#cont").append($tr);
				}
				total=res.length;
				getPage(total);
			}
		}
	})
}
//分页
function pagination(curr, limit, count) {
    var dep = document.getElementById("cont")
    var departmentInfo = document.getElementsByTagName("table")
    startRow = (curr - 1) * limit  //每页显示第一条数据的行数
    lastRow = curr * limit - 1//每页显示最后一条数据的行数
    var totalRow = count
    lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
    for (var i = 0; i < totalRow ; i++) { //遍历数据
        var hrow = dep.rows[i];
        if (i >= startRow && i <= lastRow) {
            hrow.style.display = ""
        } else {
            hrow.style.display = "none"
        }
    }
}
