$(function(){
	queryHolderInfoByHolder(localStorage.info);
	
})//end


//通过住建  查看实体信息
function queryHolderInfoByHolder(text){
	var obj={"holderno":text};
	$.ajax({
		url:url+"/HolderData/queryHolderInfoByHolder",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				return;
			}
			var val=data.result;
			var holderno=(val.holderno==undefined?"":val.holderno);
			var deptname=(val.departmentname==undefined?"":val.departmentname);
			var titlename=(val.titlename==undefined?"":val.titlename);
			var holdercard=(val.holdercard==undefined?"":val.holdercard);
			var holdername=(val.holdername==undefined?"":val.holdername);
			var idcode=(val.idcode==undefined?"":val.idcode);
			var sexname=(val.sexname==undefined?"":val.sexname);
			var nationname=(val.nationname==undefined?"":val.nationname);
			var birthday=(val.birthday==undefined?"":val.birthday);
			var superiorno2=(val.superiorno2==undefined?"":val.superiorno2);
			var nativeplace=(val.nativeplace==undefined?"":val.nativeplace);
			var startdate=(val.startdate==undefined?"":val.startdate);
			var emptype=(val.emptype==undefined?"":val.emptype);
			var bankcard=(val.bankcard==undefined?"":val.bankcard);
			var mobilephone=(val.mobilephone==undefined?"":val.mobilephone);
			var email=(val.email==undefined?"":val.email);
			var politicface=(val.politicface==undefined?"":val.politicface);
			var maxeducation=(val.maxeducation==undefined?"":val.maxeducation);
			var graduateschool=(val.graduateschool==undefined?"":val.graduateschool);
			var majorsubject=(val.majorsubject==undefined?"":val.majorsubject);
			var marrystatus=(val.marrystatus==undefined?"":val.marrystatus);
			var loginpassword=(val.loginpassword==undefined?"":val.loginpassword);
			var holderstatus=(val.holderstatus==undefined?"":val.holderstatus);
			var rolename=(val.rolename==undefined?"":val.rolename);
			var warningname=(val.warningname==undefined?"":val.warningname);
			var fixedtelephone=(val.fixedtelephone==undefined?"":val.fixedtelephone);
			var floorroom=(val.floorroom==undefined?"":val.floorroom);
			$("#holderno").val(holderno);
			$("#departmentno").val(deptname);
			//$("#titleno").val(titlename);
			$("#holdername").val(holdername);
			$("#idcode").val(idcode);
			$("#sexname").val(sexname);
			$("#nationname").val(nationname);
			$("#birthday").val(birthday);
			$("#superiorno2").val(superiorno2);
			$("#nativeplace").val(nativeplace);
			$("#startdate").val(startdate);
			$("#emptype").val(emptype);
			$("#mobilephone").val(mobilephone);
			$("#email").val(email);
			//$("#politicface").val(politicface);
			$("#maxeducation").val(maxeducation);
			$("#graduateschool").val(graduateschool);
			$("#majorsubject").val(majorsubject);
			//$("#marrystatus").val(marrystatus);
			$("#loginpassword").val(loginpassword);
			$("#fixedtelephone").val(fixedtelephone);
			$("#floorroom").val(floorroom);
			if(holderstatus=='11'){
				$("#holderstatus").val("授权");
			}else{
				$("#holderstatus").val("未授权");
			}
			$("#roleid").val(rolename);
		}
	})
}//end

 
 
 
