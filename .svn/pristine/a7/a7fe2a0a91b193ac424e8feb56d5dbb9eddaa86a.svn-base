$(function(){
	initPermissionTree();
	getDeptTree();
	//渲染日期
	layui.use(["laydate","form"], function(){
		  var laydate = layui.laydate;
		  var form = layui.form; 
		  //执行一个laydate实例
		  lay('.termTime').each(function() {
				laydate.render({
					elem: this,
					type:"datetime",
					format:"yyyy-MM-dd HH:mm:ss",
					trigger:"click",
				});
			});
		});
})
//选择照片
$("#logoIpt").change(function() {
	var file = document.getElementById("logoIpt").files[0];//获取文件域中选中的图片
	//file转成base64
	    var reader = new FileReader(); //实例化文件读取对象
	    reader.readAsDataURL(file); //将文件读取为 DataURL,也就是base64编码
	    reader.onload = function(ev) { //文件读取成功完成时触发
	     var  dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
	     $("#img").attr("src",dataURL);
	    }
});
//点击确定提交信息
$("#updateAccount").click(function(){
	saveInfo();
})

//提交数据
function saveInfo(){
	var index=layer.load(2);
	var corportename=$("#companyName").val();
	var loginaccount=$("#companyAccount").val();
	var ipaddress=$("#serverAddress").val();
	var loginpassword=$("#serverPassword").val();
	var validitybegintime=$("#startTime").val();
	var validityendtime=$("#endTime").val();
	var remark=$("#remark").val();
	var departmentno=$("#deptID").val();
	var peoplenumber=$("#personNumber").val();
	var facecount=$("#faceCount").val();
	var lconname=$("#logoName").val();
	var pattern = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;//正则验证ip地址
	if(corportename==""){
		layer.msg("请输入公司名称!",{time:2000});
		return;
	}
	if(!pattern.test(ipaddress)&&ipaddress!=""){
		layer.msg("请正确输入服务器IP地址!",{time:2000});
		return;
	}
	if(validitybegintime==""){
		layer.msg("请选择开始时间!",{time:2000});
		return;
	}
	if(validityendtime==""){
		layer.msg("请选择结束时间!",{time:2000});
		return;
	}
	var arr=[];
	for(var k=0;k<$(".layui-form-checked").length;k++){
			var id=$(".layui-form-checked").eq(k).parent().parent().parent().attr("data-id");
			var obj={
					"modelno":id,
			}
			arr.push(obj);
	}
	var base64=$("#img").attr("src");
	$.ajax({
		url:url+"/manage/updateAccount",
		type:"POST",
		data:JSON.stringify({
			"corportename":corportename,
			"loginaccount":loginaccount,
			"ipaddress":ipaddress,
			"loginpassword":loginpassword,
			"validitybegintime":validitybegintime,
			"validityendtime":validityendtime,
			"remark":remark,
			"departmentno":departmentno,
			"peoplenumber":peoplenumber,
			"facecount":facecount,
			"lconname":lconname,
			"logophotos":base64,
			"accountid":getUrlParam("accountid"),
			"validitystatus":getUrlParam("validitystatus"),
			"list":arr
		}),
		contentType:"application/json",
		success:function(data){
			layer.close(index);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					window.location.href="applet_Account.html";
				})
				//修改成功之后更改logo和项目名称
				parent.initLogo();
			}else{
				layer.msg(data.reason,{time:2000});
			}
		},
		error:function(){
			layer.close(index);
		}
	})
}
//初始化账户管理列表
function selectOneAccount(accountid){
	$.ajax({
		url:url+"/manage/selectOneAccount",
		type:"POST",
		data:{"accountid":accountid},
		success:function(data){
			if(data.flag){
				var res=data.result;
				var list=data.list;
					var holdername=(res.holdername==undefined?"":res.holdername);
					var departmentno=(res.departmentno==undefined?"":res.departmentno);
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
					}
				$("#logoName").val(lconname);
				$("#companyName").val(corporatename);
				$("#deptID").val(departmentno);
	        	$("#deptName").html(departmentname);
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
//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		dataType:'json',//数据类型
		data:{"res":"false"},
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#deptID").val(node.data.id);
			        	$("#deptName").html(node.data.title);
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
			});
		
		},
		error:function(data){}
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