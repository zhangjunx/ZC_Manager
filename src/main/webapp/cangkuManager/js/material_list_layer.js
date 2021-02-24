$(function(){
	//查询原材料
	getList();	
	getPage();
	getItemTypeList();
});
//点击确定生成入库物品
$("#insertYCL").click(function(){
	if($("#cont span.checkbox.curr").length==0){
		layer.msg("请选择物品!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$("#cont span.curr").length;i++){
		var obj={
				"YCLCode":$("#cont span.curr").eq(i).parent().siblings(".YCLCode").html(),
				"YCLName":$("#cont span.curr").eq(i).parent().siblings(".YCLName").html(),
				"YCLSpec":$("#cont span.curr").eq(i).parent().siblings(".YCLSpec").html(),
				"YCLType":$("#cont span.curr").eq(i).parent().siblings(".YCLType").html(),
				"YCLUnitName":$("#cont span.curr").eq(i).parent().siblings(".YCLUnitName").html(),
				"YCLItemType":$("#cont span.curr").eq(i).parent().siblings(".YCLItemType").html(),
				"YCLremark":$("#cont span.curr").eq(i).parent().siblings(".YCLremark").html(),
		}
		arr.push(obj);
	}
	parent.createBPTable(arr);
	parent.layer.closeAll();
})




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
				var html="";
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
					+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})
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
