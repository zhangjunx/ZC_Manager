$(function(){
	console.log(localStorage.info)
	//根据工号查询离职人员
	queryPersonList(localStorage.info);
})
//根据工号查询离职人员
function queryPersonList(holderno){
	var obj={"holderno":holderno};
	console.log(obj)
	$.ajax({
 		url:url+"/DepartureData/queryDepartureByHolderNo",
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
			var holdername=(val.holdername==undefined?"":val.holdername);
			var deptname=(val.departmentname==undefined?"":val.departmentname);
			var titlename=(val.titlename==undefined?"":val.titlename);
			var sexname=(val.sexname==undefined?"":val.sexname);
			var holdercard=(val.holdercard==undefined?"":val.holdercard);
			var emptype=(val.emptype==undefined?"":val.emptype);
			var mobilephone=(val.mobilephone==undefined?"":val.mobilephone);
			var email=(val.email==undefined?"":val.email);
			var startdate=(val.startdate==undefined?"":val.startdate);
			var idcode=(val.idcode==undefined?"":val.idcode);
			var birthday=(val.birthday==undefined?"":val.birthday);
			var nationname=(val.nationname==undefined?"":val.nationname);
			var nativeplace=(val.nativeplace==undefined?"":val.nativeplace);
			var superiorno2=(val.superiorno2==undefined?"":val.superiorno2);
			var bankcard=(val.bankcard==undefined?"":val.bankcard);
			var maxeducation=(val.maxeducation==undefined?"":val.maxeducation);
			var politicface=(val.politicface==undefined?"":val.politicface);
			var graduateschool=(val.graduateschool==undefined?"":val.graduateschool);
			var majorsubject=(val.majorsubject==undefined?"":val.majorsubject);
			var marrystatus=(val.marrystatus==undefined?"":val.marrystatus);
			var loginpassword=(val.loginpassword==undefined?"":val.loginpassword);
			var holderstatus=(val.holderstatus==undefined?"":val.holderstatus);
			var rolename=(val.rolename==undefined?"":val.rolename);
			var warningname=(val.warningname==undefined?"":val.warningname);
			if(holderstatus=="11"){
				holderstatus="已授权";
			}else{
				holderstatus="未授权";
			}
			if(warningname=="N"){
				warningname="不提示";
			}else{
				warningname="提示";
			}
			$("#holderno").val(holderno);
			$("#departmentno").val(deptname);
			$("#titleno").val(titlename);
			$("#emptype").val(emptype);
			$("#holdercard").val(holdercard);
			$("#holdername").val(holdername);
			$("#sexname").val(sexname);
			$("#nationname").val(nationname);
			$("#idcode").val(idcode);
			$("#birthday").val(birthday);
			$("#nativeplace").val(nativeplace);
			$("#mobilephone").val(mobilephone);
			$("#superiorno2").val(superiorno2);
			$("#startdate").val(startdate);
			$("#bankcard").val(bankcard);
			$("#email").val(email);
			$("#maxeducation").val(maxeducation);
			$("#politicface").val(politicface);
			$("#graduateschool").val(graduateschool);
			$("#majorsubject").val(majorsubject);
			$("#marrystatus").val(marrystatus);
			$("#loginpassword").val(loginpassword);
			$("#holderstatus").val(holderstatus);
			$("#rolename").val(rolename);
			$("#warningname").val(warningname);
		}
 	})
}//end
