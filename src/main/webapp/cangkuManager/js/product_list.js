$(function(){
	//查询成品
	getList();
	getPage();
	showHide();//跟权限有关
	getItemTypeList();
})
function getItemTypeList(){
	$.ajax({
		  url:url+"/ZX_ItemType/getItemTypeList",
		  type:"POST",
		  dataType:"json",
		  contentType:"application/json",
		  success:function(data){
			  console.log(data)
			 // $("#itemtype option:not(:first)").remove();
			 $("#itemtype1 option:not(:first)").remove();
			  if(!data.flag){
				  return;
			  }
			  var html="";
			  $.each(data.result,function(i,val){
				  var id=(val.id==undefined?"":val.id);
				  var typename=(val.typename==undefined?"":val.typename);
				  html+="<option value='"+id+"'>"+typename+"</option>"
			  }) 
			  $("#itemtype1").append(html);
			  //$("#itemtype").append(html);
		  }
	}) 
}

var page;//当前页
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

//条件查询
$(document).on("click","#queryBtn",function(){//点击查询显示成品资料
	getList();
	getPage();
});
function getList(){//查询成品原材料库存
	var itemcode=$("#itemcode1").val();
	var itemname=$("#itemname1").val();
	//var itemtype=$("#itemtype1").val();
	//var obj={"itemcode":itemcode,"itemname":itemname,"itemtype":itemtype,"pageIndex":page,"pageSize":limit};
	var obj={"itemcode":itemcode,"itemname":itemname,"pageIndex":page,"pageSize":limit};
	console.log(obj);
	$.ajax({
		url:url+"/ProductData/getProductListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
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
				if(item.ModelCode=="15001"){
					list.push(item);
				}
			}
			if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 text="";
			  }else {
				 text="<a href='product_update.html' class='layui-btn layui-btn-xs' id='mo' >修改</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
				 text1="";
			  }else {
				 text1="<a href='javascript:;' class='layui-btn layui-btn-danger layui-btn-xs' id='shan' >删除</a>";
			  }
			 if(text==""&&text1==""){
				 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
				 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs'>删除</a>";
			 }
				var html="";
				var text="";
				var text1="";
				
				$.each(data.result,function(i,val){
					var itemcode=(val.itemcode==undefined?"":val.itemcode);
					var itemname=(val.itemname==undefined?"":val.itemname);
					var spec=(val.spec==undefined?"":val.spec);
					var type=(val.type==undefined?"":val.type);
					var unitname=(val.unitname==undefined?"":val.unitname);
					var itemtype=(val.itemtype==undefined?"":val.itemtype);
					var remark=(val.remark==undefined?"":val.remark);
					
					if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
						 text="";
					  }else {
						 text="<a href='product_update.html' class='layui-btn layui-btn-xs' id='mo' data-id='"+itemcode+"' data-type='"+itemtype+"'>修改</a>";
					  }
					 
					 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
						 text1="";
					  }else {
						 text1="<a href='javascript:;' class='layui-btn layui-btn-danger layui-btn-xs' id='shan' data-id='"+itemcode+"'>删除</a>";
					  }
					 if(text==""&&text1==""){
						 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
						 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs'>删除</a>";
					 }
					 
					html+="<tr><td class='center no-print'><span class='checkbox ' style='float:none'></span></td><td>"+itemcode
					+"</td><td>"+itemname
					+"</td><td>"+spec
					+"</td><td>"+type
					+"</td><td>"+unitname
					+"</td><td>"+itemtype
					+"</td><td>"+remark
					+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})
}//end

$(document).on("click","#mo",function(){// 修改成品资料
	   //var id=$(this).attr("data-id");
	   //var itemtype=$(this).attr("data-type");
	   var id=$(this).parent().siblings().eq(1).html();
	   var itemtype=$(this).parent().siblings().eq(6).html();
	   console.log(id)
	    console.log(itemtype)
	   localStorage.id=id;
	   localStorage.itemtype=itemtype;
});


//添加
$("#insertProductDataBtn").click(function(){//添加成品资料
	insert();
})
function insert(){//添加成品信息
	   var itemcode=$("#itemcode").val();
	   var itemname=$("#itemname").val(); 
	   var spec=$("#spec").val();
	   var type=$("#type").val();
	   var unitname=$("#unitname").val();
	   var itemtype=$("#itemtype").val();
	   var remark=$("#remark").val();
	   var obj={"itemcode":itemcode,"itemname":itemname,"spec":spec,"type":type,"unitname":unitname,"itemtype":itemtype,"remark":remark};
	   if(itemcode.length==0 || itemname.length==0  || unitname.length==0 || itemtype.length==0 ){
		   layer.msg("带*号的不能为空！",{time:2000});
		   return;
	   }
	   $.ajax({
		   url:url+"/ProductData/insert",
			type:"POST",
			data:obj,
			dataType:"json",
			success:function(data){
				layer.msg(data.reason,{time:2000});
			}
	   })
}//end   
//删除成品资料
   $(document).on("click","#shan",function(){
	   var itemcode=$(this).attr("data-id");
	   layer.confirm("确定删除?",{title:"提示"},function(index){
		   layer.close(index);
		   $.ajax({
			    url:url+"/ProductData/delete",
				type:"POST",
				data:{"itemcode":itemcode},
				dataType:"json",
				success:function(data){
					console.log(data)
					layer.msg(data.reason,{time:2000});
					if(!data.flag){
						return;
					}
					window.location.reload();//执行成功后刷新当前页面
				}
		   })
	   })
   })//end
  
   
   
//批量删除
$(".delMain").click(function(){
	deleteBatch();
})   
function deleteBatch(){
	   var arr=[];
	   var cks=$("#cont").children().find("span.curr");
	   for(var i=0;i<cks.length;i++){
		   var itemcode=cks.eq(i).parent().siblings().eq(0).html();
		   console.log(itemcode)
		   var obj={"itemcode":itemcode};
		   arr.push(obj);
	   }
	   if(arr.length==0){
		   layer.msg("请先选中要删除的行！")
		   return;
	   }
layer.confirm("确定删除?",{title:"提示"},function(index){
	layer.close(index);
	$.ajax({
		  url:url+"/ProductData/deleteBatch",
		  type:"POST",
		  data:JSON.stringify(arr),
		  dataType:"json",
		  contentType:"application/json",
		  success:function(data){
			  layer.msg(data.reason,{time:2000});
		    if(!data.flag){
		    	return;
			}
		    window.location.reload();//执行成功后刷新当前页面
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
   		$("#insertProductData").hide();
   		$("#deleteProductData").hide();
   		$("#printProductData").hide();
   		$("#daoruSpareParts").hide();
   		var list=[];
   		arrList.forEach(item=>{
   			if(item.ModelCode=="15001"){
				list.push(item);
			}
   			
   		})
   		for(var item of list){
   			if(item.Code=="add"){
   				$("#insertProductData").show();
   			}
   			if(item.Code=="delete"){
   				$("#deleteProductData").show();
   			}
   			if(item.Code=="print"){
   				$("#printProductData").show();
   			}
   			if(item.Code=="import"){
   				$("#daoruSpareParts").show();
   			}
   		}
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
   })

    
   
   
  