var datano=getUrlParam("datano");
$(function(){
	//编辑
	if(datano!=null){
		$(".lable span").html("");
		querySupplierData(datano);
		$(".main-tab .label a").html("修改供应商");
	}
	//点击确定提交数据
	$("#insertSupplierBtn").click(function(){
		insertSupplier();
	})
	
})
//修改查询数据
function querySupplierData(datano){
	$.ajax({
		url:url+"/SupplierData/querySupplierData",
	   type:"POST",
	   data:{"datano":datano},
	   success:function(data){
		   console.log(data)
		   if(data.flag){
			   var res=data.result;
			   var companycode=res.companycode==undefined?"":res.companycode;
			   var companyname=res.companyname==undefined?"":res.companyname;
			   var companyaddress=res.companyaddress==undefined?"":res.companyaddress;
			   var suppliername=res.suppliername==undefined?"":res.suppliername;
			   var phone=res.phone==undefined?"":res.phone;
			   var email=res.email==undefined?"":res.email;
			   var bankname=res.bankname==undefined?"":res.bankname;
			   var bankcard=res.bankcard==undefined?"":res.bankcard;
			   
			   $("#companycode").val(companycode);
			   $("#companyname").val(companyname);
			   $("#companyaddress").val(companyaddress);
			   $("#suppliername").val(suppliername);
			   $("#phone").val(phone);
			   $("#email").val(email);
			   $("#bankname").val(bankname);
			   $("#bankcard").val(bankcard);
			   
		   }else{
			   layer.msg(data.reason,{time:2000});
		   }
	   },
	   error:function(data){
	   }
	})
}

//点击确定提交数据
function insertSupplier(){
	var companycode=$("#companycode").val();
	var companyname=$("#companyname").val();
	var companyaddress=$("#companyaddress").val();
	var suppliername=$("#suppliername").val();
	var phone=$("#phone").val();
	var email=$("#email").val();
	var bankname=$("#bankname").val();
	var bankcard=$("#bankcard").val();
	if(companycode.length==0){
		layer.msg("供应商编码不能为空!",{time:2000});
		return;
	}
	if(companyname.length==0){
		layer.msg("供应商名称不能为空!",{time:2000});
		return;
	}
	if(companyaddress.length==0){
		layer.msg("供应商地址不能为空!",{time:2000});
		return;
	}
	if(suppliername.length==0){
		layer.msg("联系人姓名不能为空!",{time:2000});
		return;
	}
	if(phone.length==0){
		layer.msg("联系人电话不能为空!",{time:2000});
		return;
	}
	if(datano!=null){//编辑确定
		var obj={"companycode":companycode,"companyname":companyname,"companyaddress":companyaddress,
				"suppliername":suppliername,"phone":phone,"email":email,"bankname":bankname,"bankcard":bankcard,
				"datano":datano};
		$.ajax({
			url:url+"/SupplierData/updateSupplierData",
		   type:"POST",
		   data:obj,
		   success:function(data){
			   if(data.flag){
				   layer.msg("修改成功!",{time:2000},function(){
					   window.location.href="m_supplier.html";
				   })
			   }else{
				   layer.msg(data.reason,{time:2000});
			   }
		   },
		   error:function(data){
		   }
		})
	}else{//新增确定
		var obj={"companycode":companycode,"companyname":companyname,"companyaddress":companyaddress,
				"suppliername":suppliername,"phone":phone,"email":email,"bankname":bankname,"bankcard":bankcard,
				"type":"m","typename":"原材料"};
		$.ajax({
			url:url+"/SupplierData/insertSupplierData",
		   type:"POST",
		   data:obj,
		   success:function(data){
			   if(data.flag){
				   layer.msg("添加成功!",{time:2000},function(){
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
	
}
//url解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}