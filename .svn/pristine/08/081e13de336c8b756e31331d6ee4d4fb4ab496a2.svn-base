$(function(){
	querySupplier();//查询供应商资料
	showHide();
	//点击搜索
	$("#querySparePartsDataListBtn").click(function(){
		querySupplier();
	})
})

//查询供应商资料
function querySupplier(){
	var companycode=$("#companycode").val();
	var companyname=$("#companyname").val();
	$.ajax({
		url:url+"/SupplierData/querySupplierDataList",
		type:"POST",
		data:{"type":"m","companycode":companycode,"companyname":companyname},
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="14001"){
						list.push(item);
					}
				}
				for(var i=0;i<res.length;i++){
					var companycode=(res[i].companycode==undefined?"":res[i].companycode);
					var companyname=(res[i].companyname==undefined?"":res[i].companyname);
					var companyaddress=(res[i].companyaddress==undefined?"":res[i].companyaddress);
					var suppliername=(res[i].suppliername==undefined?"":res[i].suppliername);
					var phone=(res[i].phone==undefined?"":res[i].phone);
					var email=(res[i].email==undefined?"":res[i].email);
					var bankname=(res[i].bankname==undefined?"":res[i].bankname);
					var bankcard=(res[i].bankcard==undefined?"":res[i].bankcard);
					if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
						 var text1="";
					  }else {
						 var text1="<a href='m_supplier_add.html?datano="+res[i].datano+"' class='mo layui-btn layui-btn-xs'>修改</a>";
					  }
					 
					 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
						 var text2="";
					  }else {
						 var text2="<a href='javascript:;' data-datano='"+res[i].datano+"' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					  }
					 if(text1==""&&text2==""){
						 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
						 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					 }
					
					var $tr=$("<tr><td>"+(i+1)+"</td><td>"+companycode+"</td><td>"+companyname+"</td><td>"+suppliername+"</td>" +
							"<td>"+phone+"</td><td>"+email+"</td><td>"+bankname+"</td><td>"+bankcard+"</td><td>"+companyaddress+"</td><td>"+text1+text2+"</td></tr>");
					$("#cont").append($tr);
				}
			}
		},
		error:function(data){
			
		}
	})
}
//点击删除
$(document).on("click",".shan",function(){
	var datano=$(this).attr("data-datano");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		deleteSupplier(datano);
	})
})
function deleteSupplier(datano){
	$.ajax({
		url:url+"/SupplierData/deleteSupplierData",
		type:"POST",
		data:{"datano":datano},
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg("删除成功!",{time:1000},function(){
					window.location.reload();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		},
		error:function(data){
			
		}
	})
}


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

