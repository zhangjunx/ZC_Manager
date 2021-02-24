var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	//初始化账户管理列表
	selectAppletAccount();
	getPage(total);
	//初始化部门下拉树
	getDeptTree();
	showHide();
})
//点击搜索
$("#queryBtn").click(function(){
	selectAppletAccount();
	getPage(total);
})
//点击删除
$(document).on("click",".del",function(){
	var accountid=$(this).attr("data-accountid");
	layer.confirm("确定删除关于此账户的一切数据吗?",{title:"提示信息"},function(index){
		layer.close(index);
		var index1=layer.load(2);
		$.ajax({
			url:url+"/manage/deleteAccount",
			type:"post",
			data:{"accountid":accountid},
			success:function(data){
				layer.close(index1);
				if(data.flag){
					window.location.reload();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(){
				layer.close(index1);
			}
		})
	})
})
//点击修改状态
$(document).on("click",".mo",function(){
	var accountid=$(this).attr("data-accountid");
	if($(this).html()=="禁用"){
		var validitystatus="1";
	}else if($(this).html()=="启用"){
		var validitystatus="0";
	}
	updateAccountStatus(accountid,validitystatus);
})

//修改状态
function updateAccountStatus(accountid,validitystatus){
	var index=layer.load(2);
	$.ajax({
		url:url+"/manage/updateAccountStatus",
		type:"POST",
		data:{"accountid":accountid,"validitystatus":validitystatus},
		success:function(data){
			layer.close(index);
			if(data.flag){
				selectAppletAccount();
			}else{
				layer.msg(data.reason,{time:2000});
			}
		},
		error:function(){
			layer.close(index);
		}
	})
}
//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:pagesize,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;
				pagesize=obj.limit;
				if(!first){
					selectAppletAccount();
				}
			}
		})
	})
}//end
//初始化账户管理列表
function selectAppletAccount(){
	var departmentno=$("#deptID").attr("value");
	var holderno=$("#holderno").val();
	var validitystatus=$("#validitystatus").val();
	$.ajax({
		url:url+"/manage/selectAppletAccount",
		type:"POST",
		data:JSON.stringify({"departmentno":departmentno,"holderno":holderno,"validitystatus":validitystatus,"curpage":curpage,"pagesize":pagesize}),
		contentType:"application/json",
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="12002"){
						list.push(item);
					}
				}
				for(var item of res){
					var accountid=(item.accountid==undefined?"":item.accountid);
					var holderno=(item.holderno==undefined?"":item.holderno);
					var holdername=(item.holdername==undefined?"":item.holdername);
					var departmentname=(item.departmentname==undefined?"":item.departmentname);
					var peoplenumber=(item.peoplenumber==undefined?"":item.peoplenumber);
					var facecount=(item.facecount==undefined?"":item.facecount);
					var corporatename=(item.corporatename==undefined?"":item.corporatename);
					var ipaddress=(item.ipaddress==undefined?"":item.ipaddress);
					var loginaccount=(item.loginaccount==undefined?"":item.loginaccount);
					var loginpassword=(item.loginpassword==undefined?"":item.loginpassword);
					var validitybegintime=(item.validitybegintime==undefined?"":item.validitybegintime);
					var validityendtime=(item.validityendtime==undefined?"":item.validityendtime);
					var validitystatus=(item.validitystatus==undefined?"":item.validitystatus);
					var remark=(item.remark==undefined?"":item.remark);
					var logophotos=(item.logophotos==undefined?"":item.logophotos);
					var lconname=(item.lconname==undefined?"":item.lconname);
					if(logophotos==""){
						var img="";
					}else{
						var img="<img src="+logophotos+" style='width:60px'>";
					}
					if(validitystatus=="0"){
						var validity="已通过";
						var text1="<a href='javascript:;' data-accountid='"+accountid+"' class='mo layui-btn layui-btn-xs layui-btn-danger'>禁用</a>"
					}else{
						var validity="已申请";
						var text1="<a href='javascript:;' data-accountid='"+accountid+"' class='mo layui-btn layui-btn-xs'>启用</a>";
					}
					if(list.findIndex(target=>target.Code=="query")==-1&&window.top.arr.length!=0){
						 text2="";
					 }else{
						 text2="<a href='applet_Account_detail.html?accountid="+accountid+"' class='layui-btn layui-btn-xs layui-btn-warm see'>查看</a>";
					 }
					if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
						 var text3="";
					  }else {
						 var text3="<a href='applet_Account_update.html?accountid="+accountid+"&&validitystatus="+validitystatus+"' class='layui-btn layui-btn-xs'>修改</a>";
					  }
					if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
						 var text4="";
					  }else {
						 var text4="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-danger del' data-accountid="+accountid+">删除</a>";
					  }
					if(list.findIndex(target=>target.Code=="forbid")==-1&&window.top.arr.length!=0){
						 text1="";
					  }
					if(text1==""&&text2==""&&text3==""&&text4==""){
						text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>禁用</a>";
						text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-warm'>查看</a>";
						text3="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
						text4="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					}
					var $tr=$("<tr><td>"+accountid+"</td><td>"+holderno+"</td><td>"+holdername+"</td><td>"+departmentname+"</td>" +
							"<td>"+peoplenumber+"</td><td>"+facecount+"</td><td>"+corporatename+"</td><td>"+img+"</td><td>"+lconname+"</td><td>"+ipaddress+"</td>" +
							"<td>"+loginaccount+"</td><td>"+loginpassword+"</td><td>"+validitybegintime+"</td><td>"+validityendtime+"</td><td>"+validity+"</td><td>"+remark+"</td>" +
							"<td class='center no-print'>"+text2+text3+text4+text1+"</td></tr>");
					$("#cont").append($tr);
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
			            queryHolderDataListByDepartmentNo(node.data.id);
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
//根据部门查询人员
function queryHolderDataListByDepartmentNo(deptno){
	$.ajax({
		url:url+'/HolderData/queryHolderDataListByDepartmentNo',
		type:"post",
		data:{"departmentno":deptno},
		success:function(data){
			 $("#holderno").find("option:not(:first)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value='"+item.holderno+"'></option>")
					$opt.append(item.holdername);
					$("#holderno").append($opt);
				}
			}
		}
	})
}

/**
 * 导出Excel
 */
$("#export").click(function(){
	layer.confirm("选择导出数据",{
		title:"提示信息",
		btn:["导出当前数据","导出全部数据"],
		yes:function(index,layero){
			$(".no-print").remove();
		    var table1 = document.querySelector("#dayindaju1");
		    var sheet = XLSX.utils.table_to_sheet(table1,{raw:true});//将一个table对象转换成一个sheet对象
		    openDownloadDialog(sheet2blob(sheet),'账户信息.xlsx');
		    window.location.reload();
		},
		btn2:function(index,layero){
			var index=layer.load(2);
			$.ajax({
				url:url+"/manage/selectAppletAccount",
				type:"post",
				data:JSON.stringify({"curpage":"","pagesize":""}),
				contentType:"application/json",
				success:function(data){
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table = $("<table id='tableData' style='display:none'><tr><td>编号</td><td>申请人工号</td><td>申请人姓名</td><td>作用部门</td><td>最多使用人数</td>" +
								     "<td>刷脸次数</td><td>公司名称</td><td>服务器IP地址</td><td>服务器账号</td><td>服务器密码</td><td>有效期开始时间</td><td>有效期截止时间</td><td>状态</td><td>备注</td></tr></table>");
					      //循环遍历，每行加入tr标签，每个单元格加td标签
					      for(var item of res){
					    	  var accountid=item.accountid==undefined?"":item.accountid;
					    	  var holderno=item.holderno==undefined?"":item.holderno;
					    	  var holdername=item.holdername==undefined?"":item.holdername;
					    	  var departmentname=item.departmentname==undefined?"":item.departmentname;
					    	  var peoplenumber=item.peoplenumber==undefined?"":item.peoplenumber;
					    	  var facecount=item.facecount==undefined?"":item.facecount;
					    	  var corporatename=item.corporatename==undefined?"":item.corporatename;
					    	  var ipaddress=item.ipaddress==undefined?"":item.ipaddress;
					    	  var loginaccount=item.loginaccount==undefined?"":item.loginaccount;
					    	  var loginpassword=item.loginpassword==undefined?"":item.loginpassword;
					    	  var validitybegintime=item.validitybegintime==undefined?"":item.validitybegintime;
					    	  var validityendtime=item.validityendtime==undefined?"":item.validityendtime;
					    	  var validitystatus=item.validitystatus==undefined?"":item.validitystatus;
					    	  var remark=item.remark==undefined?"":item.remark;
					    	  if(validitystatus=="0"){
					    		  validitystatus="已通过";
					    	  }else{
					    		  validitystatus="已申请";
					    	  }
					    	  var $tr=$("<tr><td>"+accountid+"</td><td>"+holderno+"</td><td>"+holdername+"</td><td>"+departmentname+"</td>" +
					    	  		"<td>"+peoplenumber+"</td><td>"+facecount+"</td><td>"+corporatename+"</td><td>"+ipaddress+"</td>" +
					    	  		"<td>"+loginaccount+"</td><td>"+loginpassword+"</td><td>"+validitybegintime+"</td><td>"+validityendtime+"</td>" +
					    	  		"<td>"+validitystatus+"</td><td>"+remark+"</td></tr>");
					    	  $table.append($tr);
					      }
					      $("body").append($table);
					      var table = document.querySelector("#tableData");
					      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
					      openDownloadDialog(sheet2blob(sheet),'账户信息.xlsx');
					      $("#tableData").remove();
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(){
					layer.close(index);
				}
			})
		}
	})
});

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#export").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="12002"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="export"){
				$("#export").show();
			}
		}
	}