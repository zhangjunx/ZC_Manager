$(function(){
	//查询离职人员列表
	queryDepartureDataList();
	getPage();
	showHide();
	getDeptTree();
});
var page;//当前页数
var limit;//每页显示条数
var total;//总条数
//分页查询
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"demo7",
			count:total,
			limit:limit,//每页显示条数
			layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
			jump:function(obj,first){
				page=obj.curr;//当前页数
				limit=obj.limit;//每页显示条数
				if(!first){
					queryDepartureDataList();
				}
			}
		})
	})
}//end
//点击搜索
$("#sear").click(function(){
	queryDepartureDataList();
	getPage();
});
function queryDepartureDataList(){//查询离职人员列表
	var holdername=$("#holdername").val();
	var holderno=$("#holderno").val();
	var departmentno=$("#departmentno").val();
	var obj={"holderno":holderno,"holdername":holdername,"departmentno":departmentno,
			"pageIndex":page,"pageSize":limit};
	var str=window.top.holderno;
	$.ajax({
		url:url+"/DepartureData/queryDepartureDataListByPage?str="+str,
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		success:function(data){
			console.log(data)
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				total=0;
				return;
			}
				page=data.pageinfo.pageIndex;
				limit=data.pageinfo.pageSize;
				total=data.pageinfo.sumCount;
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="2003"){
						list.push(item);
					}
				}
				var html="";
				var text="";
				var text1="";
				 if(list.findIndex(target=>target.Code=="query")==-1&&window.top.arr.length!=0){
					 text="";
				  }else {
					 text="<a href='departure_see.html' class='layui-btn layui-btn-xs leavePerson'>详细</a>";
				  }
				 
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-warm leavePerson'>再次入职</a>";
				  }
				 
				 if(text==""&&text1==""){
					 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs '>详细</a>";
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-warm '>再次入职</a>";
				 }
				$.each(data.result,function(i,val){
					var holderno=(val.holderno==undefined?"":val.holderno);
					var holdername=(val.holdername==undefined?"":val.holdername);
					var sexname=(val.sexname==undefined?"":val.sexname);
					var companyname=(val.companyname==undefined?"":val.companyname);
					var departmentname=(val.departmentname==undefined?"":val.departmentname);
					var titlename=(val.titlename==undefined?"":val.titlename);
					var emptype=(val.emptype==undefined?"":val.emptype);
					var holdercard=(val.holdercard==undefined?"":val.holdercard);	
					var idcode=(val.idcode==undefined?"":val.idcode);
					if(idcode.length==18){
					    idcode=idcode.replace(idcode.substring(6,14),"********");	
					}
					var startdate=(val.startdate==undefined?"":val.startdate);
					var rolename=(val.rolename==undefined?"":val.rolename);
					html+="<tr><td>"+holderno+"</td><td>"+holdername+"</td><td>"+sexname
					+"</td><td>"+companyname+"</td><td>"+departmentname+"</td><td>"+titlename
					+"</td><td>"+emptype+"</td><td>"+holdercard
					+"</td><td>"+idcode+"</td><td>"+startdate+"</td><td>"+rolename
					+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})	
}//end
//查看详情前  获取工号
$(document).on("click",".leavePerson",function(){
	var holderno=$(this).parent().siblings().eq(0).html();
	localStorage.info=holderno;
})   
//跟权限有关
function showHide(){
	if(window.top.arr.length==0){
		return;
	}
	$("#printDepartureData").hide();
	var arrList=window.top.arr;
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="2003"){
			list.push(item);
		}
	})
	for(var item of list){
		if(item.Code=="print"){
			$("#printDepartureData").show();
		}
	}
}//end

//点击再次入职
$(document).on("click",".leavePerson",function(){
	var holderno=$(this).parent().siblings().eq(0).html();
	console.log(holderno)
	$(".bottom_sure").attr("data-holderno",holderno);
	queryDepartureRecordByHolderNo(holderno);
	$(".holder_add").fadeIn(500);
	$(".holder_box").fadeIn(500);
})//end
//根据工号 查离职记录的信息
function queryDepartureRecordByHolderNo(holderno){
	$.ajax({
		url:url+"/DepartureRecord/queryDepartureRecordByHolderNo",
		type:"POST",
		data:{"holderno":holderno},
		dataType:"json",
		async:false,//很重要
		success:function(data){
			console.log(data)
			//$(".top_name").html("");
			$(".top_date").html("");
			$(".top_type").html("");
			$(".top_reason").html("");
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			var holdername=(data.result.holdername==undefined?"":data.result.holdername);
			var expiredate=(data.result.expiredate==undefined?"":data.result.expiredate);
			var leavetypename=(data.result.leavetypename==undefined?"":data.result.leavetypename);
			var leavereason=(data.result.leavereason==undefined?"":data.result.leavereason);
			//$(".top_name").html(holdername);
			$("#top_date").val(expiredate);
			$("#top_type").val(leavetypename);
			$(".top_reason").val(leavereason);
		}
	})
}//end

//点击再次入职弹出框的确定
$(".bottom_sure").click(function(){
	//$(".holder_add").fadeOut(500);
	//$(".holder_box").fadeOut(500);
	var holderno=$(this).attr("data-holderno");
	deleteByPrimaryKey(holderno);
})//end
//点确定 再次入职  离职表执行删除操作  员工表执行添加操作
function deleteByPrimaryKey(holderno){
	var loginholderno=window.top.holderno;
	console.log("login=="+loginholderno);
	$.ajax({
		url:url+"/DepartureData/deleteByPrimaryKey",
		type:"POST",
		data:{"holderno":holderno,"loginholderno":loginholderno},
		dataType:"json",
		async:false,//很重要
		success:function(data){
			console.log(data)
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			$(".holder_add").fadeOut(500);
			$(".holder_box").fadeOut(500);
			window.location.reload();//刷新当前页面
		}
	})
}//end


//点击再次入职弹出框的取消
$(".bottom_qx").click(function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})//end
//点击再次入职弹出框右上角的叉
$(".quxiao").click(function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})//end

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



