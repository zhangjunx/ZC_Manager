$(function(){
	//查询原材料
	getList();	
	getPage();
	getItemTypeList();
	showHide();//跟权限有关
});

//物品类别下拉
function getItemTypeList(){
	$.ajax({
		  url:url+"/ZX_ItemType/getItemTypeList",
		  type:"POST",
		  dataType:"json",
		  contentType:"application/json",
		  success:function(data){
			  console.log(data)
			 $("#itemtype option:not(:first)").remove();
			 $("#itemtype1 option:not(:first)").remove();
			 $("#itemtype2 option:not(:first)").remove();
			  if(!data.flag){
				  return;
			  }
			  var html="";
			  $.each(data.result,function(i,val){
				  var id=(val.id==undefined?"":val.id);
				  var typename=(val.typename==undefined?"":val.typename);
				  html+="<option value='"+id+"'>"+typename+"</option>"
			  }) 
			  $("#itemtype").append(html);
			  $("#itemtype1").append(html);
			  $("#itemtype2").append(html);
		  }
	}) 
}
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
	var itemcode=$("#itemcode1").val();
	var itemname=$("#itemname1").val();
	var itemtype=$("#itemtype1").val()
	var obj={"itemcode":itemcode,"itemname":itemname,"itemtype":itemtype,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/MaterialData/getMaterialListByPage",
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
			limit=data.limit;
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
					var itemcode=(val.itemcode==undefined?"":val.itemcode);
					var itemname=(val.itemname==undefined?"":val.itemname);
					var spec=(val.spec==undefined?"":val.spec);
					var type=(val.type==undefined?"":val.type);
					var unitname=(val.unitname==undefined?"":val.unitname);			
					var itemtype=(val.itemtype==undefined?"":val.itemtype);
					var remark=(val.remark==undefined?"":val.remark);										
					html+="<tr><td class='no-print'><span class='checkbox' style='float:none'></span></td><td>"+itemcode+"</td><td>"+itemname+"</td><td>"+spec+"</td><td>"+type+"</td><td>"+unitname
					+"</td><td>"+itemtype+"</td><td>"+remark
					+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})
}//end


//批量删除
$(".delMain").click(function(){
	deleteBatch();
})
function deleteBatch(){
	var arr=[];
	var cks=$("#cont").children().find("span.curr");
	for(var i=0;i<cks.length;i++){
		var itemcode=cks.eq(i).parent().siblings().eq(0).html();
		var obj={"itemcode":itemcode};
		arr.push(obj);
	}
	if(arr.length==0){
		layer.msg("请先选中要删除的行！");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/MaterialData/deleteBatch",
			type:"POST",
			data:JSON.stringify(arr),
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(!data.flag){
					return;
				}
				window.location.reload();
			}
		})
	})
}//end

//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#insertMaterialData").hide();
	$("#deleteMaterialData").hide();
	$("#printMaterialData").hide();
	$("#daoruMaterial").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="14002"){
			list.push(item);
		}
	})
	for(var item of list){
		if(item.Code=="add"){
			$("#insertMaterialData").show();
		}
		if(item.Code=="delete"){
			$("#deleteMaterialData").show();
		}
		if(item.Code=="print"){
			$("#printMaterialData").show();
		}
		if(item.Code=="import"){
			$("#daoruMaterial").show();
		}
	}
}//end
  // 复选
$(document).on('click', '.checkbox', function () {
    if ($(this).attr("id") == "selectAll") { // 全选
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            console.log($("#cont").children())
            $("#cont").children().each(function () {
                $('span.checkbox').removeClass('curr');
            })
        } else {
            $(this).addClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').addClass('curr');
            })
        }
    } else {
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $('#selectAll').removeClass('curr');
        } else {
            $(this).addClass('curr');
            var arr=$("#cont").children().find("span.checkbox")
           	var str=$("#cont").children().find("span.curr")
           	if(arr.length==str.length){
           		$('#selectAll').addClass('curr');
           	}
        }
    }
})            

            
//搜索下拉框
$(".ipt").click(function() {
	$(this).siblings().slideToggle();
})
$(document).on("click", ".sel li", function() {
	$(this).parent().siblings().val($(this).html());
	$(this).parent().css("display", "none");
})
$(".ipt").blur(function() {
	$(this).siblings().slideUp();
})	
// 点击编辑
$(document).on("click", "#update", function() {
	localStorage.itemcode = $(this).parent().siblings().eq(1).html();
	localStorage.itemname = $(this).parent().siblings().eq(2).html();
	localStorage.spec = $(this).parent().siblings().eq(3).html();
	localStorage.type = $(this).parent().siblings().eq(4).html();
	localStorage.unitname = $(this).parent().siblings().eq(5).html();
	localStorage.itemtype = $(this).parent().siblings().eq(6).html();
	localStorage.remark = $(this).parent().siblings().eq(7).html();
})
$("#itemcode2").val(localStorage.itemcode).css("background","#f2f2f2");
$("#itemname2").val(localStorage.itemname);
$("#spec2").val(localStorage.spec);
$("#type2").val(localStorage.type);
$("#unitname2").val(localStorage.unitname);
$("#itemtype2").val(localStorage.itemtype);
$("#remark2").val(localStorage.remark);	


// 点击删除
$(document).on("click","#del",function(){//删除原材料信息
	var itemcode=$(this).parent().siblings().eq(1).html()
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
	 		url:url+"/MaterialData/delete",
			type:"POST",
			data:{"itemcode":itemcode},
			success:function(data){	
				layer.msg(data.reason,{time:2000});
				if(!data.flag){
					return;
				}
				window.location.reload();
			}
	 	})
	})
	
})	

 

	
//点击编辑后的保存提交
$("#insertMbasedatabtn").click(function(){
	insert();
})
function insert(){//添加原材料信息
	var itemcode=$("#itemcode").val();
	var itemname=$("#itemname").val();
	var spec=$("#spec").val();
	var type=$("#type").val();
	var unitname=$("#unitname").val();
	var itemtype=$("#itemtype").val();
	var remark=$("#remark").val();
	var obj={"itemcode":itemcode,"itemname":itemname,"spec":spec,"type":type,"unitname":unitname,"itemtype":itemtype,"remark":remark}
	if(itemcode.length==0 || itemname.length==0  || unitname.length==0 || itemtype.length==0){
		layer.msg("带*号的不能为空!",{time:2000});
		return;
	}
	$.ajax({
		url:url+"/MaterialData/insert",
		type:"POST",
		data:obj,
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
		}
	})
}//end

//点击编辑后的保存提交
$("#updateMbasedataBtn").click(function(){
	update();
})
function update(){//编辑之后提交
	var itemcode=$("#itemcode2").val();
	var itemname=$("#itemname2").val();
	var spec=$("#spec2").val();
	var type=$("#type2").val();
	var unitname=$("#unitname2").val();
	var itemtype=$("#itemtype2").val();
	var remark=$("#remark2").val();
	var obj={"itemcode":itemcode,"itemname":itemname,"spec":spec,"type":type,
			"unitname":unitname,"itemtype":itemtype,"remark":remark,};
	$.ajax({
		url:url+"/MaterialData/update",
		type:"POST",
		data:obj,
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}//end




