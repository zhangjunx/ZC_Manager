$(function(){
	getList();//查询供应商资料
	showHide();
})
var page;//当前页数
var limit;//每页显示数
var total;//总条数
//分页
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,
			limit:limit,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					getList();
				}
			}
		})
	})
}//end

//搜索
$("#queryBtn").click(function(){
	getList();
	getPage();
});
function getList(){//查询原材料信息
	var name=$("#name").val();
	var obj={"name":name,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/ZX_ItemType/getItemTypeListByPage",
		type:"POST",
		data:obj,
		async:false,//很重要
		success:function(data){
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				total=0;
				return;
			}
			page=data.page;
			limit=data.lilmit;
			total=data.total;
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="14002"){
					list.push(item);
				}
			}
				var html="";
				var text="";
				var text1="";
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 text="";
				  }else {
					 text="<a href='material_update.html' class='layui-btn layui-btn-xs' id='update'>编辑</a>";
				  }
				 
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a class='layui-btn layui-btn-danger layui-btn-xs' id='del'>删除</a>";
				  }
				 
				 if(text==""&&text1==""){
					 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>编辑</a>";
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs'>删除</a>";
				 }
				$.each(data.result,function(i,val){
					var id=(val.id==undefined?"":val.id);
					var name=(val.typename==undefined?"":val.typename);
					var remark=(val.remark==undefined?"":val.remark);
					var updatedate=(val.updatedate==undefined?"":val.updatedate);
					var updateperson=(val.updateperson==undefined?"":val.updateperson);			
					/*<td class='no-print'><span class='checkbox' style='float:none'></span></td>*/
					html+="<tr><td>"+id
					+"</td><td>"+name
					+"</td><td>"+remark
					+"</td><td>"+updatedate
					+"</td><td>"+updateperson
					+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})
}//end
 
//点击删除
$(document).on("click",".del",function(){
	var id=$(this).attr("data-id");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/ZX_ItemType/delete",
			type:"POST",
			data:{"id":id},
			success:function(data){
				console.log(data);
				if(data.flag){
					layer.msg(data.reason,{time:2000},function(){
						window.location.reload();
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})


//点击删除
$(document).on("click",".update",function(){
	var id=$(this).attr("data-id");
	localStorage.id=id;
})

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertSupplier").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="14001"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertSupplier").show();
			}
		}
	}

