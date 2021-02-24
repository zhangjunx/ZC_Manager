$(function(){
	initPermissionTree();
})

//初始化账户管理列表
function selectOneAccount(accountid){
	$.ajax({
		url:url+"/manage/selectOneAccount",
		type:"POST",
		data:{"accountid":accountid},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result;
				var list=data.list;
					var holdername=(res.holdername==undefined?"":res.holdername);
					var departmentname=(res.departmentname==undefined?"":res.departmentname);
					var peoplenumber=(res.peoplenumber==undefined?"":res.peoplenumber);
					var facecount=(res.facecount==undefined?"":res.facecount);
					var corporatename=(res.corporatename==undefined?"":res.corporatename);
					var ipaddress=(res.ipaddress==undefined?"":res.ipaddress);
					var loginaccount=(res.loginaccount==undefined?"":res.loginaccount);
					var loginpassword=(res.loginpassword==undefined?"":res.loginpassword);
					var validitybegintime=(res.validitybegintime==undefined?"":res.validitybegintime);
					var validityendtime=(res.validityendtime==undefined?"":res.validityendtime);
					var remark=(res.remark==undefined?"":res.remark);
					var logophotos=(res.logophotos==undefined?"":res.logophotos);
					var lconname=(res.lconname==undefined?"":res.lconname);
					if(logophotos!=""){
						$("#img").attr("src",logophotos).css("width","auto");
						$(".chooseBox").css("width","auto").css("border","none");
					}
					$("#logoName").val(lconname);
				$("#companyName").val(corporatename);
				$("#departmentname").val(departmentname);
				$("#personNumber").val(peoplenumber);
				$("#faceCount").val(facecount);
				$("#serverAddress").val(ipaddress);
				$("#companyAccount").val(loginaccount);
				$("#serverPassword").val(loginpassword);
				$("#startTime").val(validitybegintime);
				$("#endTime").val(validityendtime);
				$("#remark").val(remark);
				
				//根据最里层复选框判断id是否相等
				for(var i=0;i<$(".layui-icon-file").length;i++){
					var perssionid=$(".layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");
					for(var k=0;k<list.length;k++){
						if(perssionid==list[k].modelno){
							$(".layui-icon-file").eq(i).parent().siblings().eq(1).click();
						}
					}
				}
			}
		}
	})
}
//初始权限树
function initPermissionTree(){
	$.ajax({
		url:url+"/struct/getAppletMenu",
		type:"POST",
		data:{"res":"true"},
		success:function(data){
			if(data.flag){
				layui.use(['tree', 'util'], function(){
					 var tree = layui.tree;
					 var layer = layui.layer;
					 var util = layui.util;
					  tree.render({
					    elem: '#test1',
					    data: data.result,
					    showCheckbox: true,
					  });
				})
				selectOneAccount(getUrlParam("accountid"));
			}
		}
	})
}
//从url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}