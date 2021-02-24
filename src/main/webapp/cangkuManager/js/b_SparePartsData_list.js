$(function(){
	getList();//查询备品备件的基本资料信息
	getPage();
	query(localStorage.itemcode);
	getItemTypeList();
	showHide();//跟权限有关
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
			   var list=[];
			   for(var item of window.top.arr){
				   if(item.ModelCode=="13002"){
						list.push(item);
					}
			   }
			   
			   var html="";
			   var text="";
			   var text1="";
				if(list.findIndex(target=>target.Code=="update")==-1 && window.top.arr.length!=0){
					 text="";
				  }else {
					 text="<a href='b_SparePartsData_update.html' class='layui-btn layui-btn-xs update' >编辑</a>";
				  }
				 
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a class='layui-btn layui-btn-danger layui-btn-xs del'>删除</a>";
				  }   
				 if(text==""&&text1==""){
					 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs' >编辑</a>";
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs'>删除</a>";
				 }
				 $.each(data.result,function(i,val){
				 var itemcode= (val.itemcode==undefined?"":val.itemcode); 
				 var itemname= (val.itemname==undefined?"":val.itemname); 
				 var spec= (val.spec==undefined?"":val.spec); 
				 var type= (val.type==undefined?"":val.type); 
				 var unitname= (val.unitname==undefined?"":val.unitname); 
				 var itemtype= (val.itemcode==undefined?"":val.itemtype); 
				 var remark= (val.remark==undefined?"":val.remark); 
				   html+="<tr><td class='no-print'><span class='checkbox' style='float:none'></span></td><td>"
					   +itemcode+"</td><td>"+itemname+"</td><td>"+spec+"</td><td>"+type
				   +"</td><td>"+unitname+"</td><td>"+itemtype+"</td><td>"+remark
				   +"</td><td class='center no-print'>"+text+text1+"</td></tr>";
				   })
				   $("#cont").append(html);
		   }
	  })
}//end


//添加备品备件
$("#insertSparePartsDataBtn").click(function(){
	insert();
});//end
function insert(){
	var itemcode =  $("#itemcode").val();
	 var itemname = $("#itemname").val();
	 var spec = $("#spec").val();
	 var type  = $("#type").val();
	 var unitname =	$("#unitname").val();
	 var itemtype =	$("#itemtype").val();
	 var remark = $("#remark").val(); 
	 var obj = {"itemcode":itemcode,"itemname":itemname,"type":type,"unitname":unitname,"itemtype":itemtype,"remark":remark,"spec":spec};
	if(itemcode=="" || itemname==""  || unitname=="" || itemtype==""){
		layer.msg("带*号的不能为空！",{time:2000});
		 return;
	}
	$.ajax({
		url:url+"/SparePartsData/insert", 
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
		  }
	    })
}//end

//查询方法
function query(text){
	   $.ajax({
			url:url+'/SparePartsData/query', 
			type:'post',
			data:{"itemcode":itemcode},
			dataType:'json',
			success:function(data){
				if(data.flag){
					$("#itemcode2").val(data.result.itemcode).css("background","#f2f2f2");
					$("#itemname2").val(data.result.itemname);
					$("#spec2").val(data.result.spec);
					$("#type2").val(data.result.type);
					$("#unitname2").val(data.result.unitname);
					$("#itemtype2").val(data.result.itemtype);
					$("#remark2").val(data.result.remark);
				}
			}
	   })
}//end



//修改方法
$("#updateSparePartsdataBtn").click(function(){
	update();
})//end
function update(){
	var itemcode =  $("#itemcode2").val();
	 var itemname = $("#itemname2").val();
	 var spec = $("#spec2").val();
	 var type  = $("#type2").val();
	 var unitname =	$("#unitname2").val();
	 var itemtype =	$("#itemtype2").val();
	 var remark = $("#remark2").val(); 
	 var obj = {"itemcode":itemcode,"itemname":itemname,"type":type,"unitname":unitname,"itemtype":itemtype,"remark":remark,"spec":spec};
	 if(itemcode=="" || itemname==""  || unitname=="" || itemtype==""){
			layer.msg("带*号的不能为空！",{time:2000});
			 return;
		}
	 $.ajax({
		url:url+'/SparePartsData/update', 
		type:'post',
		data:obj,
		dataType:'json',
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
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
	console.log(cks.length)
	for(var i=0;i<cks.length;i++){
		var itemcode=cks.eq(i).parent().siblings().eq(0).html();
		var obj={"itemcode":itemcode};
		arr.push(obj);
	}
	if(arr.length==0){
		layer.msg("请先选择要删除的行!");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/SparePartsData/deleteBatch", 
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
		$("#insertSparePartsData").hide();
		$("#deleteSparePartsData").hide();
		$("#printSparePartsData").hide();
		$("#daoruSpareParts").hide();
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="13002"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertSparePartsData").show();
			}
			if(item.Code=="delete"){
				$("#deleteSparePartsData").show();
			}
			if(item.Code=="print"){
				$("#printSparePartsData").show();
			}
			if(item.Code=="import"){
				$("#daoruSpareParts").show();
			}
		}
}//end


//点击编辑
$(document).on("click", ".update", function() {
	localStorage.itemcode = $(this).parent().siblings().eq(1).html();
})	
var itemcode = localStorage.itemcode;


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
//点击删除
$(document).on("click", ".del", function() {
	var itemcode = $(this).parent().siblings().eq(1).html();
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
	 		url:url+"/SparePartsData/delete",
			type:"POST",
			data:{"itemcode":itemcode},
			dataType:"json",
			success:function(data){	
				console.log(data)
				layer.msg(data.reason1,{time:2000});
				if(!data.flag){
					return;
				}
				window.location.reload();
			}
	 	})
	})
	
})//end



