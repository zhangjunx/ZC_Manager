$(function(){
	queryPersonInfo();
	queryPhoto();
});

//获取照片
function queryPhoto(){
	$.ajax({
		url:url+"/HolderPhoto/queryPhoto",
		type:"POST",
		data:{"holderno":window.top.holderno},
		dataType:"json",
		//contentType:"application/json",
		success:function(data){
			//console.log(data)
			if(!data.flag){
				$("#avatarPreview").attr("src","img/person.png");
				return;
			}
			var dataphoto=(data.result.dataphoto==undefined?"":data.result.dataphoto);
			var idphoto=(data.result.idphoto==undefined?"":data.result.idphoto);
			if(idphoto.length>0){
				$("#avatarPreview").attr("src","data:image/png;base64,"+idphoto);
				
			}else{
				$("#avatarPreview").attr("src","img/person.png");
			}
			if(dataphoto.length>0){
				$("#digitalPhoto").attr("src","data:image/png;base64,"+dataphoto);
				
			}else{
				$("#digitalPhoto").attr("src","img/person.png");
			}
		}
	})
}//end
//查询个人信息
function queryPersonInfo(){
	$.ajax({
		//url:url+"/HolderData/queryPersonInfo",
		url:url+"/HolderData/queryHolderInfoByHolder",
		type:"POST",
		data:{"holderno":window.top.holderno},
		dataType:"json",
		//contentType:"application/json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				$("#content").append(data.reason);
				return;
			} 
			var html="";
			var val=data.result;
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var departmentno=(val.departmentname==undefined?"":val.departmentname);
				var companyname=(val.companyno==undefined?"":val.companyno);
				var holdercard=(val.holdercard==undefined?"":val.holdercard);
				var loginpassword=(val.loginpassword==undefined?"":val.loginpassword);
				var idcode=(val.idcode==undefined?"":val.idcode);
				var birthday=(val.birthday==undefined?"":val.birthday);
				var startdate=(val.startdate==undefined?"":val.startdate);
				var nativeplace=(val.nativeplace==undefined?"":val.nativeplace);
				var maxeducation=(val.maxeducation==undefined?"":val.maxeducation);
				var titleno=(val.titlename==undefined?"":val.titlename);
				var bankcard=(val.bankcard==undefined?"":val.bankcard);
				var emptype=(val.emptype==undefined?"":val.emptype);
				var superiorno2=(val.superiorno2==undefined?"":val.superiorno2);
				var mobilephone=(val.mobilephone==undefined?"":val.mobilephone);
				var email=(val.email==undefined?"":val.email);
				var nationname=(val.nationname==undefined?"":val.nationname);
				var politicface=(val.politicface==undefined?"":val.politicface);
				var graduateschool=(val.graduateschool==undefined?"":val.graduateschool);
				var majorsubject=(val.majorsubject==undefined?"":val.majorsubject);
				var sexname=(val.sexname==undefined?"":val.sexname);
				var marrystatus=(val.marrystatus==undefined?"":val.marrystatus);
				var holderpower=(val.holderpower==undefined?"":val.holderpower);
				html="<dt><time class='fist'>"+"工&ensp;&ensp;&emsp;号："+"<span>"+holderno+"</span></time><time>"+"所属部门："+"<span>"
				+departmentno+"</span></time></dt><dt><time>"+"职&ensp;&ensp;&emsp;务："+"<span  id='titleno'>"+titleno+"</span></time><time>"+"卡&ensp;&ensp;&emsp;号："+"<span id='holdercard'>"
				+holdercard+"</span></time></dt><dt><time>"+"姓&ensp;&ensp;&emsp;名："+"<span>"+holdername+"</span></time><time>"+"身份证号："+"<span id='idcode'>"
				+idcode+"</span></time></dt><dt><time>"+"性&ensp;&ensp;&emsp;别："+"<span  id='sexname'>"+sexname+"</span></time><time>"+"民&ensp;&ensp;&emsp;族："+"<span ' id='nationname'>"
				+nationname+"</span></time></dt><dt><time>"+"入职日期："+"<span id='startdate'>"+startdate+"</span></time><time>"+"员工工种："+"<span  id='emptype'>"
				+emptype+"</span></time></dt><dt><time>"+"银行卡号："+"<span id='bankcard'>"+bankcard+"</span></time><time>"+"联系电话："+"<span  id='mobilephone'>"
				+mobilephone+"</span></time></dt><dt><time>"+"籍&ensp;&ensp;&emsp;贯："+"<span  id='nativeplace'>"+nativeplace+"</span></time><time>"+"家庭地址："+"<span id='superiorno2'>"
				+superiorno2+"</span></time></dt><dt><time>"+"电子邮箱："+"<span id='email'>"+email+"</span></time><time>"+"学&ensp;&ensp;&emsp;历："+"<span id='maxeducation'>"
				+maxeducation+"</span></time></dt><dt><time>"+"政治面貌："+"<span id='politicface'>"+politicface+"</span></time><time>"+"毕业院校："+"<span  id='graduateschool'>"
				+graduateschool+"</span></time></dt><dt><time>"+"所学专业："+"<span id='majorsubject'>"+majorsubject+"</span></time><time>"+"婚姻状况："+"<span id='marrystatus'>"
				+marrystatus+"</span></time></dt><dt><time>"+"个人密码："+"<span  id='loginpassword'>"+"******"+"</span></time></dt>"
			$("#content").append(html);
			
		}
	})
}//end

