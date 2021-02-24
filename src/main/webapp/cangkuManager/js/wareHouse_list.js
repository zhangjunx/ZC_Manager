$(function(){
	queryWareHouseList();
	getPage();
	getDeptTree();//添加仓库时  选择部门下拉列表
	showHide();//跟权限有关
});
var page;//当前页
var limit;//每页显示条数
var total;//总条数
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,
			count:total,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					queryWareHouseList();
				}
			}
		})
	})
}//end

//搜索
$("#waresearch").click(function(){
	queryWareHouseList();
	getPage();
})//end
function queryWareHouseList(){
	var warename = $("#warename1").val();
	var waretype = $("#waretype1").val();
	var deptname = $("#departmentname").html();
	var obj = {"warename":warename,"waretype":waretype,"deptname":deptname,"pageIndex":page,"pageSize":limit};
	console.log(obj)
	var str=window.top.holderno;
	$.ajax({
		url:url+"/WareHouseData/queryWareHouseListByPage?str="+str,
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		success:function(data){
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
				if(item.ModelCode=="16001"){
					list.push(item);
				}
			}
			var html="";
			var text="";
			var text1="";
			if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 text="";
			  }else {
				 text="<a href='wareHouse_update.html' class='layui-btn layui-btn-xs updata' lay-event='edit'>编辑</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
				 text1="";
			  }else {
				 text1="<a  class='layui-btn layui-btn-danger layui-btn-xs del' lay-event='del'>删除</a>";
			  }
			 if(text==""&&text1==""){
				 text="<a href='javascript:;'  class='layui-bg-gray layui-btn layui-btn-xs' lay-event='edit'>编辑</a>";
				 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
			 }
			 
			$.each(data.result,function(i,val){
				var warecode=(val.warecode==undefined?"":val.warecode);
				var warename=(val.warename==undefined?"":val.warename);
				var wareaddress=(val.wareaddress==undefined?"":val.wareaddress);
				var deptno=(val.deptno==undefined?"":val.deptno);
				var deptname=(val.deptname==undefined?"":val.deptname);
				var remark=(val.remark==undefined?"":val.remark);
				var waretype=(val.waretype==undefined?"":val.waretype);
				html+="<tr><td class='center no-print'><span class='checkbox ' style='float:none' name='"+warecode+"'></span><td>"
				+warename+"</td><td>"+wareaddress
				+"</td><td name='"+deptno+"'>"+deptname
				+"</td><td>"+waretype+"</td><td>"+remark
				+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
			})
			$("#cont").append(html);	
		}
	})
}//end


//批量删除
$("#deleteWareHouseData").click(function(){
	deleteWareHouseDataBatch();
})
function deleteWareHouseDataBatch(){
	var arr=[];
	var cks=$("#cont").children().find("span.curr");
	for(var i=0;i<cks.length;i++){
		var warecode=cks.eq(i).attr("name");
		console.log("warecode=="+warecode)
		var obj={"warecode":warecode};
		arr.push(obj);
	}
	if(arr.length==0){
		layer.msg("请先选中要删除的行！");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/WareHouseData/deleteWareHouseDataBatch",
			type:"POST",
			data:JSON.stringify(arr),
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				layer.msg(data.reason,{time:2000})
				if(data.flag){
					window.location.reload();
				}
			}
		})
	})
	
}//end

//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#insertWareHouseData").hide();
	$("#deleteWareHouseData").hide();
	$("#printWareHouseData").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="16001"){
			list.push(item);
		}
		
	})
	for(var item of list){
		if(item.Code=="add"){
			$("#insertWareHouseData").show();
		}
		if(item.Code=="delete"){
			$("#deleteWareHouseData").show();
		}
		if(item.Code=="print"){
			$("#printWareHouseData").show();
		}
	}
}//end

//复选
$(document).on('click', '.checkbox', function () {
    if ($(this).attr("id") == "selectAll") { // 全选
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').removeClass('curr');
            })
        } else {
            $(this).addClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').addClass('curr');
            })
        }
    } else {
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $('#selectAll').removeClass('curr');
        } else {
            $(this).addClass('curr');
            var arr=$("#cont").children().find("span.checkbox")
           	var str=$("#cont").children().find("span.curr")
           	if(arr.length==str.length){
           		$('#selectAll').addClass('curr');
           	}
        }
    }
})//end

$(document).on("click",".del",function(){//删除仓库
	var warecode=$(this).parent().siblings().find("span").attr("name");
	//console.log("warecode=="+warecode)
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/WareHouseData/deleteWareHouseData",
			type:"POST",
			data:{"warecode":warecode},
			success:function(data){
				if(data.flag){
					window.location.reload();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})//end

$(document).on("click",".updata",function(){
	var warecode = $(this).parent().siblings().eq(0).find("span").attr("name");
	var warename = $(this).parent().siblings().eq(1).text();
	var wareaddress = $(this).parent().siblings().eq(2).text();
	var deptno = $(this).parent().siblings().eq(3).attr("name");
	var deptname = $(this).parent().siblings().eq(3).text();
	var waretype = $(this).parent().siblings().eq(4).text();
	var remark = $(this).parent().siblings().eq(5).text();
	localStorage.warecode=warecode;
	localStorage.warename=warename;
	localStorage.wareaddress=wareaddress;
	localStorage.deptno=deptno;
	localStorage.deptname=deptname;
	localStorage.waretype=waretype;
	localStorage.remark=remark;
});//点击修改传值
 
$("#warename2").val(localStorage.warename);
$("#wareaddress2").val(localStorage.wareaddress);
$("#departmentno2").val(localStorage.deptno);
$("#departmentname2").text(localStorage.deptname);
$("#waretype2").val(localStorage.waretype);
$("#waretype2 option:selected").html(localStorage.waretype);
$("#remark2").val(localStorage.remark);

//修改
$("#updateWareHouseBtn").click(function(){
	updateWareHouse();
})//end
function updateWareHouse(){//修改
	var warecode=localStorage.warecode;
	var warename=$("#warename2").val();
	var wareaddress=$("#wareaddress2").val();
	var deptno=$("#departmentno2").val();
	var deptname=$("#departmentname2").text();
	var waretype=$("#waretype2").val(); 
	var remark=$("#remark2").val();
	var obj={"warecode":warecode,"warename":warename,"wareaddress":wareaddress,"deptno":deptno,"deptname":deptname,"waretype":waretype,"remark":remark};
	if(warename.length==0){
		layer.msg("仓库名称不能为空！",{time:2000});
		return;
	}
	if(wareaddress.length==0){
		layer.msg("仓库地址不能为空！",{time:2000});
		return;
	}
	if(deptno.length==0){
		layer.msg("仓库所属部门不能为空！",{time:2000});
		return;
	}
	if(waretype.length==0){
		layer.msg("仓库类别不能为空！",{time:2000});
		return;
	}
	console.log(obj);
	$.ajax({
		url:url+"/WareHouseData/updateWareHouseData",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	});
}//end

$("#insertWareHouseBtn").click(function(){
	insertWareHouse();
})//end
function insertWareHouse(){//添加仓库
	var warename=$("#warename").val();
	var wareaddress=$("#wareaddress").val();
	var deptno=$("#departmentno").val();
	var deptname=$("#departmentname").text();
	var waretype=$("#waretype").val(); 
	var remark=$("#remark").val();
	/*if(warename.length==0 || deptno.length==0 || wareaddress.length==0 || waretype.length==0){
		layer.msg("带*标记的不能为空！",{time:2000});
		return;
	}*/
	if(warename.length==0){
		layer.msg("仓库名称不能为空！",{time:2000});
		return;
	}
	if(wareaddress.length==0){
		layer.msg("仓库地址不能为空！",{time:2000});
		return;
	}
	if(deptno.length==0){
		layer.msg("仓库所属部门不能为空！",{time:2000});
		return;
	}
	if(waretype.length==0){
		layer.msg("仓库类别不能为空！",{time:2000});
		return;
	}
	var obj={"warename":warename,"wareaddress":wareaddress,"deptno":deptno,"deptname":deptname,"waretype":waretype,"remark":remark};
	console.log(obj);
	$.ajax({
		url:url+"/WareHouseData/insertWareHouseData",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
			if(!data.flag){
				return;
			}
			$("#warename").val("");
			$("#wareaddress").val("");
			$("#departmentno").val("");
			$("#departmentname").text("");
			$("#waretype").val(""); 
			$("#remark").val("");
		}
	})
}//end


/**
 * 导出Excel
 */
$("#exportWareHouseData").click(function(){
    var table1 = document.querySelector("#dayindaju1");
    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
    openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
});

//区域下拉树初始化
function getDeptTree(){
	$.ajax({
		//url:url+"/DepartmentData/getDeptTree",
		//url:url+"/DepartmentData/getMyDeptTree",
		url:url+"/ACL_Roles/getDeptTreeByMyRole",
		type:"POST",//类型
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
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
			        	$("#departmentno2").val(node.data.id);
			        	$("#departmentname2").html(node.data.title);
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



