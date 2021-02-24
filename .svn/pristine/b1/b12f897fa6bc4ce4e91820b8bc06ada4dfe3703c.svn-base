$(function(){
	queryRoleNoList();//查询角色list
	//queryTitleNoList();//修改用户时职务下拉框
	queryDictDataList();//修改用户时 民族，政治面貌，工种，学历下拉框
	getDeptTree();
	queryHolderInfoByHolder(localStorage.infos);
	getDate();//初始化时间控件
})//end
$(document).on("click","#startUse",function(){
	var cardno=$(this).attr("data-id");
	var cardflag=$(this).html();
	
	var flag="";
	if(cardflag=="已启用"){
		cardflag='0'; //0 禁用
		flag="确定禁用？";
	}else{
		cardflag='1';//1 启用
		flag="确定启用？";
	}
	var obj={"cardno":cardno,"cardflag":cardflag};
	console.log(obj);
	
	layer.confirm(flag,{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/CardData/updateStatus",
			type:"POST",
			data:obj,
			dataType:"json",
			success:function(data){
				console.log(data);
				$("#cont").empty();
				if(!data.flag){
					layer.msg(data.reason,{time:2000});
					return;
				}
				queryCardList(localStorage.infos);
			}
		})
	})
})



//当点击文本框 可以选择时间
function getDate(){
	layui.use(['laydate'], function () {
		var laydate = layui.laydate;
		//日期
		lay('.test-item').each(function () {
			laydate.render({
				elem: this,
				trigger: 'click'
			});
		});		
	});
}//end
	

//联系电话输入框的失焦事件
$("#mobilephone").blur(function(){
	var reg=/^1[3456789]\d{9}$/;
	if(!reg.test($("#mobilephone").val())&&$("#mobilephone").val()!=""){
		layer.msg("请正确输入手机号",{time:2000});
		$("#mobilephone").css("border-color","red");
	}else{
		$("#mobilephone").css("border-color","#ddd");
	}
})
//修改页面点击保存提交信息
$("#UpdateSave").click(function(){
	updateHolderData();
});//end

function updateHolderData(){
	var holderno=$("#holderno").val();//工号
	//var holdercard=$("#holdercard").val();//卡号
	//var titleno=$("#titleno").val();//职务
	var departmentno=$("#departmentno").val();//部门
	var holdername=$("#holdername").val();//姓名
	var idcode=$("#idcode").val();//身份证号
	var loginpassword=$("#loginpassword").val();//登录密码
	//var bankcard=$("#bankcard").val();//银行卡号
	var sexname=$("#sexname").val();//性别
	var nationname=$("#nationname").val();//民族
	var birthday=$("#birthday").val();//出生日期
	var superiorno2=$("#superiorno2").val();//家庭地址
	var nativeplace=$("#nativeplace").val();//籍贯
	var startdate=$("#startdate").val();//入职日期
	var emptype=$("#emptype").val();//员工工种
	var mobilephone=$("#mobilephone").val();//联系电话
	var email=$("#email").val();//电子邮箱
	//var politicface=$("#politicface").val();//政治面貌
	var maxeducation=$("#maxeducation").val();//学历
	var graduateschool=$("#graduateschool").val();//毕业院校
	var majorsubject=$("#majorsubject").val();//所学专业
	//var marrystatus=$("#marrystatus").val();//婚姻状况
	var holderstatus=$("#holderstatus").val();//登录权限
	var roleid=$("#roleid").val();//角色名称
	//var warningname=$("#warningname").val();//退休预警
	var fixedtelephone=$("#fixedtelephone").val();//分机号
	var floorroom=$("#floorroom").val();//楼层位置
	var reg=/^1[3456789]\d{9}$/;
	if(!reg.test($("#mobilephone").val())&&$("#mobilephone").val()!=""){
		layer.msg("请正确输入手机号",{time:2000});
		$("#mobilephone").css("border-color","red");
		return;
	}else{
		$("#mobilephone").css("border-color","#ddd");
	}
	 //验证密码
	 var reg6=/^[\w]{6,12}$/;
	 if(!reg6.test($("#loginpassword").val())){
		 layer.msg("请输入6~12位的数字或字母!",{time:2000});
		 $("#loginpassword").css("border-color","red");
		 return;
	 }else{
		 $("#loginpassword").css("border-color","#ddd");
	 }
	 if($("#holdername").val().length==0){
		 layer.msg("请填写姓名!",{time:2000});
		 return;
	 }
	 var obj={"holderno":holderno,"holdername":holdername,
				"departmentno":departmentno,"loginpassword":loginpassword,
				"sexname":sexname,"nationname":nationname,"birthday":birthday,
				"superiorno2":superiorno2,"nativeplace":nativeplace,
				"startdate":startdate,"mobilephone":mobilephone,"email":email,
				"maxeducation":maxeducation,
				"graduateschool":graduateschool,
				"majorsubject":majorsubject,
				"idcode":idcode,
				"emptype":emptype,
				"holderstatus":holderstatus,"roleid":roleid};
	 console.log(obj);
    var formData = new FormData();
    formData.append("str",JSON.stringify(obj));
    formData.append("str1",window.top.holderno);
	$.ajax({
     url: url+"/HolderData/updateHolderData",
     //url: url+"/HolderPhoto/updateHolderInfoAndPhoto",
     type: "POST",
     data: formData,
     cache:false,
     async:false,
     contentType: false,
     processData: false,
     //mimeType: "multipart/form-data",
     success: function (data) {
    	 console.log(data)
    	 layer.msg(data.reason,{time:2000});
     }
 })
}//end
$("#avatarSlect").change(function(){
	 var imgUrl=getObjectURL(this.files[0]);
	 $("#digitalPhoto").attr("src",imgUrl);
 }); 
var imgFile="";
function getObjectURL(file){
	 var url=null;
	 if(window.createObjectURL!=undefined){
		 url=window.createObjectURL(file);
	 }else if(window.URL!=undefined){
		 url=window.URL.createObjectURL(file);
	 }else if(window.webkitURL!=undefined){
		 url=window.webkitURL.createObjectURL(file);
	 }
	 return url;
}//end

//将base64转file文件
function dataUrlToFile(dataurl,filename){
	/*dataUrlToFile(dataurl,filename)*/
		var arr=dataurl.split(',');
		var mime=arr[0].match(/:(.*?);/)[1];
		var bstr=atob(arr[1]);
		//var bstr=window.atob(arr[1]);
		var n=bstr.length;
		var u8arr=new Uint8Array(n);
		while(n--){
			u8arr[n]=bstr.charCodeAt(n);
		}
		//转换成file对象
		var obj= new File([u8arr],filename,{type:mime});
		//转换成blob对象
		//var obj=new Blob([u8arr],{type:mime});
		return obj;
}//end
 
	
function queryHolderInfoByHolder(text){
	var obj={"holderno":text};
	$.ajax({
		url:url+"/HolderData/queryHolderInfoByHolder",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			if(!data.flag){
				return;
			}
			var val=data.result;
			var holderno=(val.holderno==undefined?"":val.holderno);
			var deptno=(val.departmentno==undefined?"":val.departmentno);
			var deptname=(val.departmentname==undefined?"":val.departmentname);
			//var titleno=(val.titleno==undefined?"":val.titleno);
			//var titlename=(val.titlename==undefined?"":val.titlename);
			//var holdercard=(val.holdercard==undefined?"":val.holdercard);
			var holdername=(val.holdername==undefined?"":val.holdername);
			var idcode=(val.idcode==undefined?"":val.idcode);
			var sexname=(val.sexname==undefined?"":val.sexname);
			var nationname=(val.nationname==undefined?"":val.nationname);
			var birthday=(val.birthday==undefined?"":val.birthday);
			var superiorno2=(val.superiorno2==undefined?"":val.superiorno2);
			var nativeplace=(val.nativeplace==undefined?"":val.nativeplace);
			var startdate=(val.startdate==undefined?"":val.startdate);
			var emptype=(val.emptype==undefined?"":val.emptype);
			//var bankcard=(val.bankcard==undefined?"":val.bankcard);
			var mobilephone=(val.mobilephone==undefined?"":val.mobilephone);
			var email=(val.email==undefined?"":val.email);
			//var politicface=(val.politicface==undefined?"":val.politicface);
			var maxeducation=(val.maxeducation==undefined?"":val.maxeducation);
			var graduateschool=(val.graduateschool==undefined?"":val.graduateschool);
			var majorsubject=(val.majorsubject==undefined?"":val.majorsubject);
			//var marrystatus=(val.marrystatus==undefined?"":val.marrystatus);
			var loginpassword=(val.loginpassword==undefined?"":val.loginpassword);
			var holderstatus=(val.holderstatus==undefined?"":val.holderstatus);
			var roleid=(val.roleid==undefined?"":val.roleid);
			//var warningname=(val.warningname==undefined?"":val.warningname);
			var fixedtelephone=(val.fixedtelephone==undefined?"":val.fixedtelephone);
			var floorroom=(val.floorroom==undefined?"":val.floorroom);
			$("#holderno").val(holderno).css("background","#f2f2f2");
			$("#departmentno").val(deptno);
			$("#departmentname").html(deptname);
			//$("#titleno").val(titleno);
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
			$("#maxeducation").attr(maxeducation);
			$("#graduateschool").val(graduateschool);
			$("#majorsubject").val(majorsubject);
			//$("#marrystatus").val(marrystatus);
			$("#loginpassword").val(loginpassword);
			$("#holderstatus").val(holderstatus);
			$("#roleid").val(roleid);
			$("#fixedtelephone").val(fixedtelephone);
			$("#floorroom").val(floorroom);
		}
	})
}//end

//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		//url:url+"/DepartmentData/getDeptTree",
		//url:url+"/DepartmentData/getMyDeptTree",
		url:url+"/ACL_Roles/getDeptTreeByMyRole",
		type:'POST',//类型
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
		//contentType:"application/json",
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node.data.id)
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			        }
			    
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });
			});
		
		},
		error:function(data){}
	})
}


function queryTitleNoList(){//查询职称列表
	$.ajax({
		url:url+"/TitleData/queryTitleDataList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		async:false,
		success:function(data){
			console.log(data)
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var titleno=(val.titleno==undefined?"":val.titleno);
				var titlename=(val.titlename==undefined?"":val.titlename);
				html+="<option value='"+titleno+"'>"+titlename+"</option>";
			})
			$("#titleno").append(html);	
		}
	})
}//end

function queryDictDataList(){//查询字典数据 包括政治面貌，民族，学历，工种等
	$.ajax({
		url:url+"/DictionaryData/queryDictDataList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		async:false,
		success:function(data){
			if(!data.flag){
				return;
			}
			var htm="";
			var htm2="";
			var htm3="";
			var htm4="";
			$.each(data.result,function(i,val){
				var typename=(val.typename==undefined?"":val.typename);
				var value=(val.value==undefined?"":val.value);
				if(typename=='nationname'){
					htm+="<option value='"+value+"'>"+value+"</option>";
				}else if(typename=='politicface'){
					htm2+="<option value='"+value+"'>"+value+"</option>";
				}else if(typename=='emptype'){
					htm3+="<option value='"+value+"'>"+value+"</option>";
				}else if(typename=='maxeducation'){
					htm4+="<option value='"+value+"'>"+value+"</option>";
				} 
			})
			$("#nationname").append(htm);
			$("#politicface").append(htm2);
			$("#emptype").append(htm3);
			$("#maxeducation").append(htm4);	
		}
	})
}//end

function queryRoleNoList(){//获取功能角色 名称 下拉选项 
	$.ajax({
		url:url+"/ACL_Roles/queryRoleList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		async:false,
		success:function(data){
			$("#roleid").find("option:not(:first)").remove();
			if(!data.flag){
				return;
			}
			var htm="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var code=(val.code==undefined?"":val.code);
				var name=(val.name==undefined?"":val.name);
				//htm+="<option value='"+id+"'>"+id+"_"+code+"_"+name+"</option>";
				htm+="<option value='"+id+"'>"+name+"</option>";
			});
			$("#roleid").append(htm);	
		}
	})
}//end
