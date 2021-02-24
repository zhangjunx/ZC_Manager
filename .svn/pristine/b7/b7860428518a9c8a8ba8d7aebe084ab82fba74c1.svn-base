$(function(){
	getList();//查询备品备件的基本资料信息
	getPage();
	getItemTypeList();
})
//点击确定生成入库物品
$("#insertBP").click(function(){
	if($("#cont span.checkbox.curr").length==0){
		layer.msg("请选择物品!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$("#cont span.curr").length;i++){
		var obj={
				"BPCode":$("#cont span.curr").eq(i).parent().siblings(".BPCode").html(),
				"BPName":$("#cont span.curr").eq(i).parent().siblings(".BPName").html(),
				"BPSpec":$("#cont span.curr").eq(i).parent().siblings(".BPSpec").html(),
				"BPType":$("#cont span.curr").eq(i).parent().siblings(".BPType").html(),
				"BPUnitName":$("#cont span.curr").eq(i).parent().siblings(".BPUnitName").html(),
				"BPItemType":$("#cont span.curr").eq(i).parent().siblings(".BPItemType").html(),
				"BPremark":$("#cont span.curr").eq(i).parent().siblings(".BPremark").html(),
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
var page;//当前页
var limit;//每页显示条数
var total;//总条数
//分页
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,//总条数
			limit:limit,//每页条数
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
//查询备品备件基本资料信息
$("#queryBtn").click(function(){
	getList();
	getPage();
});
function getList(){
	var itemcode = $("#itemcode1").val();
	var itemname = $("#itemname1").val();
	var itemtype = $("#itemtype1").val();
	var obj={"itemcode":itemcode,"itemname":itemname,"itemtype":itemtype,"pageIndex":page,"pageSize":limit};
	$.ajax({
		   url:url+"/SparePartsData/getSparepartsListByPage",
		   type:"POST",
		   data:obj,
		   dataType:"json",
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
				 var itemcode= (val.itemcode==undefined?"":val.itemcode); 
				 var itemname= (val.itemname==undefined?"":val.itemname); 
				 var spec= (val.spec==undefined?"":val.spec); 
				 var type= (val.type==undefined?"":val.type); 
				 var unitname= (val.unitname==undefined?"":val.unitname); 
				 var itemtype= (val.itemcode==undefined?"":val.itemtype); 
				 var remark= (val.remark==undefined?"":val.remark); 
				   html+="<tr><td class='no-print'><span class='checkbox' style='float:none'></span></td><td class='BPCode'>"
					   +itemcode+"</td><td class='BPName'>"+itemname+"</td><td class='BPSpec'>"+spec+"</td><td class='BPType'>"+type
				   +"</td><td class='BPUnitName'>"+unitname+"</td><td class='BPItemType'>"+itemtype+"</td><td class='BPremark'>"+remark
				   +"</td></tr>";
				   })
				   $("#cont").append(html);
		   }
	  })
}//end



//复选
$(document).on('click', '.checkbox', function () {
    if ($(this).attr("id") == "selectAll") { //全选
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
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
})//end



