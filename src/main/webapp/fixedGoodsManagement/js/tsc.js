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
//点击搜索
$("#createInStorage").click(function(){
	getList();
})

//点击新增弹出层
$("#insertWareHouseData").click(function(){
	$("#file").val("");
	layer.open({
		type:1,
		title:"新增",
		content:$("#wareHouse"),
		area:["500px","200px"],
		btn:["确定","取消"],
		yes:function(index){
			saveInfo(index);
		}
	})
})

//点击删除
$(document).on("click",".shan",function(){
	var path=$(this).attr("data-path");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		$.ajax({
			url:url+"/zcFileManager/delFile",
			type:"post",
			data:{"fileName":path},
			success:function(data){
				layer.close(index);
				if(data.flag){
					layer.msg(data.reason,{time:1000},function(){
						getList();
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})
//点击下载
$(document).on("click",".download",function(){
	var path=$(this).attr("data-path");
	var form = $('<form method="GET" action="' + url+"/zcFileManager/downLoadFile?path="+path+'"><input type = "hidden" name = "path" value="'+path+'"> </form>');
    form.append($('<input type="hidden">'));
    $('body').append(form);
    form.submit();
})
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
//提交信息
function saveInfo(index){
	var fileArr=document.getElementById("upload").files;
	var formData = new FormData();
	for(var item of fileArr){
		formData.append("files", item);
	}
	$.ajax({
		url:url+"/zcFileManager/uploadFile",
		type:"post",
		 data: formData,
	     dataType:"json",
	     cache:false,
	     contentType: false,
	     processData: false,
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					layer.close(index);
					getList();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//点击选择文件
$("#upload").change(function(e){
	var imgUrl=this.files[0];
	var filename="";
	for(var item of this.files){
		filename+=item.name+";";
	}
	$("#file").val(filename);
})
//初始化设备技术规范库
function getList(){
	var fileName=$("#fileName").val();
	var obj={"fileName":fileName};
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
					var $tr=$("<tr><td>"+index+"</td><td>"+fileName+"</td><td>"+path+"</td><td>"+updateTime+"</td><td>" +
						    "<a href='javascript:;' data-path='"+item.path+"' class='layui-btn layui-btn-xs download'>下载</a>" +
						    "<a href='javascript:;' data-path='"+item.path+"' class='layui-btn layui-btn-xs watch'>在线预览</a><a href='javascript:;' data-path='"+item.path+"' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>");
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
