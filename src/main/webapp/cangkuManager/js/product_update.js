$(function(){
	query(localStorage.id);
	getItemTypeList(localstorage.itemtype)
	showHide();//跟权限有关
})
function getItemTypeList(id){
	$.ajax({
		  url:url+"/ZX_ItemType/getItemTypeList",
		  type:"POST",
		  data:{"id":id},
		  dataType:"json",
		  success:function(data){
			  console.log(data)
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
			  $("#itemtype2").append(html).val(id);
		  }
	}) 
}

 
function query(id){//查询成品原材料库存
	$.ajax({
		url:url+"/ProductData/query",
		type:"POST",
		data:{"itemcode":id},
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			var itemcode=(data.result.itemcode==undefined?"":data.result.itemcode);
			var itemname=(data.result.itemname==undefined?"":data.result.itemname);
			var spec=(data.result.spec==undefined?"":data.result.spec);
			var type=(data.result.type==undefined?"":data.result.type);
			var unitname=(data.result.unitname==undefined?"":data.result.unitname);
			var itemtype=(data.result.itemtype==undefined?"":data.result.itemtype);
			var remark=(data.result.remark==undefined?"":data.result.remark);
			 
			   $("#itemcode2").val(itemcode).css("background","#f2f2f2");
			   $("#itemname2").val(itemname);
			   $("#spec2").val(spec);
			   $("#type2").val(type);
			   $("#unitname2").val(unitname);
			  // $("#itemtype2").val(itemtype);
			   $("#remark2").val(remark);	
		}
	})
}//end
// 修改
$("#updateProductDataBtn").click(function(){// 修改成品资料
	update();
})
function update(){// 提交修改资料
	var itemcode=$("#itemcode2").val();
	   var itemname=$("#itemname2").val(); 
	   var spec=$("#spec2").val();
	   var type=$("#type2").val();
	   var unitname=$("#unitname2").val();
	   var itemtype=$("#itemtype2").val();
	   var remark=$("#remark2").val();
	   var obj={"itemcode":itemcode,"itemname":itemname,"spec":spec,"type":type,"unitname":unitname,"itemtype":itemtype,"remark":remark};
	   if(itemcode.length==0 || itemname.length==0  || unitname.length==0 || itemtype.length==0 ){
		   layer.msg("带*号的不能为空！",{time:2000});
		   return;
	   }
	   $.ajax({
		   url:url+"/ProductData/update",
			type:"POST",
			data:obj,
			dataType:"json",
			success:function(data){
				layer.msg(data.reason,{time:2000})
			}
	   })
}//end	   
   
