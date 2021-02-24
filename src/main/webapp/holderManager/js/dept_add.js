$(function(){
	//queryDeptNoList();
	getDeptTree();
	queryDeptNoByAuto();//自动获取部门编号
	if(parent.treeText!=""){
		for(var i=0;i<$(".layui-tree-txt").length;i++){
			if($(".layui-tree-txt").eq(i).html()==parent.treeText){
				$(".layui-tree-txt").eq(i).click();
			}
		}
	}
});
//点击取消
$("#abolish").click(function(){
	parent.layer.closeAll();
})

//添加数据
$("#insertDeptBtn").click(function(){
	insertDeptData();
});
function insertDeptData(){//添加部门
	var departmentno=$("#departmentno").val();
	var departmentname=$("#departmentname").val();
	var underno=$("#underno").val();
	var description=$("#description").val();
	if(departmentno.length==0 || departmentname.length==0){
		layer.msg("带*号的不能为空！",{time:2000});
		return;
	}
	var obj={"departmentno":departmentno,"departmentname":departmentname,"underno":underno,"description":description};
	$.ajax({
		url:url+"/DepartmentData/insertDeptData",
		type:"POST",
		data:obj,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					parent.getDeptTree();
					parent.layer.closeAll();
					if(parent.treeText!=""){
						for(var i=0;i<$(".layui-tree-txt",parent.document).length;i++){
							if($(".layui-tree-txt",parent.document).eq(i).html()==parent.treeText){
								$(".layui-tree-txt",parent.document).eq(i).click();
							}
						}
					}
				});
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}//end


/*function queryDeptNoList(){//查询部门列表
	$.ajax({
		url:url+"/DepartmentData/queryDeptList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			$("#underno").find("option:not(:first)").remove();
			if(data.flag){
				var html="";
				var li="";
				$.each(data.result,function(i,val){
					var departmentno=(val.departmentno==undefined?"":val.departmentno);
					var departmentname=(val.departmentname==undefined?"":val.departmentname);
					var underno=(val.underno==undefined?"":val.underno);
					html+="<option value='"+departmentno+"'>"+departmentname+"</option>";
				});
				$("#underno").append(html);
			}
		}

		})
}//end
*/
//根据上级部门自动获取部门编号
/*$(document).on("click","#underno",function(){
	queryDeptNoByAuto();
})*/

function queryDeptNoByAuto(){//自动获取部门编号
	var underno=$("#underno").val();
	var obj={"underno":underno};
	$.ajax({
		url:url+"/DepartmentData/queryMaxDeptNo",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			  $("#departmentno").val("");
			if(data.flag){
				 $("#departmentno").val(data.result);
			}else{
				layer.msg(data.reason,{time:2000});
				$("#departmentno").val(data.result);
			}
		}
	})
}//end

//区域下拉树初始化
function getDeptTree(){
	$.ajax({
		//url:url+"/DepartmentData/getDeptTree",
		//url:url+"/DepartmentData/getMyDeptTree",
		url:url+"/ACL_Roles/getDeptTreeByMyRole",
		type:'POST',//类型
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
		async:false,
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
			        	$("#underno").val(node.data.id);
			        	$("#undername").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='underno']").val(node.id);
			            queryDeptNoByAuto();
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
