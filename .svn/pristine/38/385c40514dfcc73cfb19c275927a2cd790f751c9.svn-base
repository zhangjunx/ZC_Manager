$(function(){
	//查询离职人员列表
	queryDepartureRecordList();
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
					queryDepartureRecordList();
				}
			}
		})
	})
}//end
//点击搜索
$("#sear").click(function(){
	queryDepartureRecordList();
	getPage();
});
function queryDepartureRecordList(){//查询离职人员列表
	var holdername=$("#holdername").val();
	var holderno=$("#holderno").val();
	var departmentno=$("#departmentno").val();
	var obj={"holderno":holderno,"holdername":holdername,"departmentno":departmentno,
			"pageIndex":page,"pageSize":limit};
	var str=window.top.holderno;
	console.log(obj)
	$.ajax({
		url:url+"/DepartureRecord/queryDepartureRecordListByPage?str="+str,
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
				var html="";
				$.each(data.result,function(i,val){
					var holderno=(val.holderno==undefined?"":val.holderno);
					var holderno1=(val.holderno1==undefined?"":val.holderno1);
					var holdername=(val.holdername==undefined?"":val.holdername);
					var idcard=(val.idcard==undefined?"":val.idcard);
					if(idcard.length==18){
						idcard=idcard.replace(idcard.substring(6,14),"********");	
					}
					var startdate=(val.startdate==undefined?"":val.startdate);
					var expiredate=(val.expiredate==undefined?"":val.expiredate);
					var leavetypename=(val.leavetypename==undefined?"":val.leavetypename);
					var leavereason=(val.leavereason==undefined?"":val.leavereason);
					var id=(val.id==undefined?"":val.id);
					var deptname=(val.deptname==undefined?"":val.deptname);
					var compname=(val.compname==undefined?"":val.compname);
					var txt="";
					 if(holderno==holderno1){
						 //txt="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-warm leavePerson'>离职状态</a>";
						 txt="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-warm'>离职状态</a>";
					  }else {
						 //txt="<a href='javascript:;' class='layui-btn layui-btn-xs leavePerson'>在职状态</a>";
						 txt="<a href='javascript:;' class='layui-btn layui-btn-xs'>在职状态</a>";
					  }			
					html+="<tr><td>"+id+"</td><td>"+holderno+"</td><td>"+holdername
					+"</td><td>"+compname
					+"</td><td>"+deptname
					+"</td><td>"+idcard+"</td><td>"+startdate+"</td><td>"
					+expiredate+"</td><td>"+leavetypename+"</td><td>"+leavereason
					+"</td><td class='center no-print'>"+txt+"</td></tr>";
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
		if(item.ModelCode=="2004"){
			list.push(item);
		}
	})
	for(var item of list){
		if(item.Code=="print"){
			$("#printDepartureData").show();
		}
	}
}//end


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



