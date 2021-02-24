$(function(){
	//queryDeptNoList();
});

$("#departmentno2").val(localStorage.departmentno).css("background","#f2f2f2");
$("#departmentname2").val(localStorage.departmentname);
$("#underno2").val(localStorage.underno).css("background","#f2f2f2");
$("#description2").val(localStorage.description);
var departmentno=localStorage.departmentno;
var departmentname=localStorage.departmentname;
var underno=localStorage.underno;
var undername=localStorage.undername;
//点击取消
$("#abolish").click(function(){
	parent.layer.closeAll();
})

//更新数据
$("#updateDeptBtn").click(function(){
	updateDeptData();
});
function updateDeptData(){//修改部门
	var departmentno=$("#departmentno2").val();
	var departmentname=$("#departmentname2").val();
	var underno=$("#underno2").val();
	var description=$("#description2").val();
	var obj={"departmentno":departmentno,"departmentname":departmentname,"underno":underno,"description":description};
	$.ajax({
		url:url+"/DepartmentData/updateDeptData",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					parent.getDeptTree();
					parent.layer.closeAll();
					if(parent.treeText!=""){
						for(var i=0;i<$(".layui-tree-txt",parent.document).length;i++){
							if($(".layui-tree-txt",parent.document).eq(i).html()==departmentname){
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

function queryDeptNoList(){//查询部门列表
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
				$("#underno2").append(html);
				$("#underno2").val(underno);
				$("#underno2 option:selected").text(undername);
			}
		}

		})
}//end




