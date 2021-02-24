$(function(){
	//queryTitleNoList();//添加用户时职务下拉框
	queryDictDataList();//添加用户时 民族，政治面貌，工种，学历下拉框
	getNextHolder();//获取下一个holderno值
	getDeptTree();
	queryRoleNoList();//添加用户时 角色名称下拉框
	getTime();
	getDate();
})//end

//点击卡片状态复选框
$("span.checkbox").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
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
//获取年月日时间 初始化入职日期获取当前日期
function getTime(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	var html=year+"-"+month+"-"+day;
	$("#startdate").val(html);
	$("#effectivedate").val(html);
	$("#expiredate").val(html);
	
}//end
//工号输入框的失焦事件
$("#holderno").blur(function(){
	var reg3=/^[0-9a-zA-Z]*$/g;
	var holderno=$("#holderno").val();
	if(!reg3.test(holderno)&&holderno!=""){
		layer.msg("请输入数字或字母！",{time:2000});
		$("#holderno").css("border-color","red")
	}else{
		$("#holderno").css("border-color","#ddd")
	}
})
/*//身份证号输入框的失焦事件
$("#idcode").blur(function(){
	var reg2=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
	var idcode=$("#idcode").val();
	if(!reg2.test(idcode)&&idcode!=""){
		layer.msg("请正确输入身份证号！",{time:2000});
		$("#idcode").css("border-color","red");
	}else{
		$("#idcode").css("border-color","#ddd");
	}	
})*/
/*//卡号输入框的失焦事件
$("#holdercard").blur(function(){
	var reg4=/^[0-9a-zA-Z]*$/g;
	var holdercard=$("#holdercard").val();
	if(!reg4.test(holdercard)&&holdercard!=""){
		layer.msg("请输入数字或字母！",{time:2000});
		$("#holdercard").css("border-color","red");
	}else{
		$("#holdercard").css("border-color","#ddd");
	}
})*/
//联系电话输入框的失焦事件
$("#mobilephone").blur(function(){
	var reg=/^1[3456789]\d{9}$/;
	var mobilephone=$("#mobilephone").val();
	if(!reg.test(mobilephone)&&mobilephone!=""){
		layer.msg("请正确输入手机号",{time:2000});
		$("#mobilephone").css("border-color","red");
	}else{
		$("#mobilephone").css("border-color","#ddd");
	}
})
/*//银行卡号输入框的失焦事件
$("#bankcard").blur(function(){
	var reg5=/^([1-9]{1})(\d{14}|\d{18})$/;
	var bankcard=$("#bankcard").val();
	if(!reg5.test(bankcard)&&bankcard!=""){
		layer.msg("请正确输入银行卡号",{time:2000});
		$("#bankcard").css("border-color","red");
	}else{
		$("#bankcard").css("border-color","#ddd");
	}
})*/
//姓名输入框的失焦事件
$("#holdername").blur(function(){
	if($("#holdername").val()!=""){
		$("#holdername").css("border-color","#ddd");
	}
})


//添加新人员
$("#insertHolderDataSureBtn").click(function(){
	insertHolderData();
});

//添加人员带照片的
function insertHolderData(){
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
	if(departmentno==""){
		layer.msg("请选择部门！",{time:2000});
		$("#departmentno").css("border-color","red");
		return;
	}
	
	var reg3=/^[0-9a-zA-Z]*$/g;
	if(!reg3.test(holderno)||holderno==""){
		layer.msg("请输入工号！",{time:2000});
		$("#holderno").css("border-color","red");
		return;
	}else{
		$("#holderno").css("border-color","#ddd");
	}
	if(holdername==""){
		layer.msg("请输入姓名！",{time:2000});
		$("#holdername").css("border-color","red");
		return;
	}else{
		$("#holdername").css("border-color","#ddd");
	}
	var reg=/^1[3456789]\d{9}$/;
	if(!reg.test($("#mobilephone").val())&&$("#mobilephone").val()!=""){
		layer.msg("请正确输入手机号",{time:2000});
		$("#mobilephone").css("border-color","red");
		return;
	}else{
		$("#mobilephone").css("border-color","#ddd");
	}
	var obj={"holderno":holderno,"holdername":holdername,
			"departmentno":departmentno,
			"loginpassword":loginpassword,"sexname":sexname,
			"nationname":nationname,"birthday":birthday,
			"superiorno2":superiorno2,"nativeplace":nativeplace,
			"startdate":startdate,"mobilephone":mobilephone,"email":email,
			"maxeducation":maxeducation,
			"graduateschool":graduateschool,
			"majorsubject":majorsubject,
			"idcode":idcode,
			"emptype":emptype,
			"holderstatus":holderstatus,"roleid":roleid};
 
	 var formData = new FormData();
     formData.append("str", JSON.stringify(obj));
     formData.append("holderno", window.top.holderno);
	 $.ajax({
     url: url+"/HolderData/insertHolderData",
     type: "POST",
     data: formData,
     dataType:"json",
     cache:false,
     async:false,
     contentType: false,
     processData: false,
     //mimeType: "multipart/form-data",
     success: function (data) {
    	 console.log(data);
    	 layer.msg(data.reason,{time:2000},function(){
    		 window.location.reload();
    	 });
     } 
 });
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
//点击弹出框的取消
$(document).on("click",".bottom_qx",function(){
	 $(".holder_add").css("display","none");
     $(".holder_box").css("display","none");
})
//点击弹出框的确定
$(document).on("click",".bottom_sure",function(){
	 $(".holder_add").css("display","none");
     $(".holder_box").css("display","none");
})
//点击弹出框的叉
$(document).on("click",".quxiao",function(){
	 $(".holder_add").css("display","none");
     $(".holder_box").css("display","none");
})


var imgFile = "";
$("#avatarSlect").change(function() {
	var imgUrl = getObjectURL(this.files[0]);
	console.log("imgurl==")
	console.log(imgUrl)
	$("#digitalPhoto").attr("src", imgUrl);
});

function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) {
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
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
			        	console.log(node)
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

function queryDictDataList(){//查询字典数据 包括政治面貌，民族，学历，工种等
	$.ajax({
		url:url+"/DictionaryData/queryDictDataList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			//$("#politicface").find("option:not(:first)").remove();
			//$("#maxeducation").find("option:not(:first)").remove();
			//$("#emptype").find("option:not(:first)").remove();
			//$("#nationname").find("option:not(:first)").remove();
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

//获取holderno值
function getNextHolder(){
	$.ajax({
		url:url+"/HolderData/getNextHolder",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			$("#holderno").val("");
			if(!data.flag){
				return;
			}
			$("#holderno").val(data.result);
		}
	})
}//end