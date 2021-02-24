$(function(){
	queryDeptList();
	//getPage();
	getDeptTree();
	showHide();
});
layui.config({
    base: '../'
}).extend({
    treeTable: 'treeTable/treeTable'
}).use(['treeTable'], function () {
    var treeTable = layui.treeTable;
});
var page;//设置首页页面
var limit;//每页显示的条数
var total;//总条数
//分页查询
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//数据总条数，从服务端得到
			curr:page,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;//改变当前页
				limit=obj.limit;//每页显示数
				//首次不执行
				if(!first){
					queryDeptList();
				}
			}
		})
	})
}//end

//点击新增
$("#insertDepartmentData").click(function(){
	layer.open({
		type:2,
		title:"新增部门",
		content:"dept_add.html",
		area:["550px","450px"]
	})
})

function initTreeTable(res){
	layui.use(['layer','util','treeTable'], function () {
		var $=layui.jquery;
		var util=layui.util;
	    var treeTable = layui.treeTable;
	    // 渲染表格
        var insTb = treeTable.render({
            elem: '#dayindaju1',
            data: res,  // 数据
            tree: {
                iconIndex: 0,  // 折叠图标显示在第几列
                arrowType: 'arrow2', 
                idName: 'departmentno',
                pidName: 'underno',
                isPidData: true,
                getIcon: function(d) {  // 自定义图标
                    // d是当前行的数据
                   if (d.children) {  // 判断是否有子集
                	   return '<i class="ew-tree-icon ew-tree-icon-folder"></i>';
                    } else {
                    	 return '<i class="ew-tree-icon ew-tree-icon-file"></i>';
                    }
                }
            },
            cols: [
            	{field: 'departmentname', title: '部门名称',width:"360"},
                {field: 'departmentno', title: '部门编号'},
                {field: 'undername', title: '上级部门名称'},
                {field: 'underno', title: '上级部门编号'},
                {field: 'description', title: '部门介绍'},
                {align:"center",toolbar:"#demoTreeTableBar1",title:"操作",width:"120"}
            ]
        });
        
        treeTable.on('tool(dayindaju1)', function(obj){
            console.log(obj) // 得到当前行数据
            var event=obj.event;
            if(event=="del"){
            	var departmentno=obj.data.departmentno;
            	layer.confirm("确定删除?",{title:'提示'},function(index){
            		layer.close(index);
            		$.ajax({
            			url:url+"/DepartmentData/deleteDeptData",
            			type:"POST",
            			data:{"departmentno":departmentno},
            			success:function(data){
            				if(data.flag){
            					obj.del();
            					getDeptTree();
            				}else{
            					layer.msg(data.reason,{time:2000});
            				}
            			}
            		})
            	})
            }else if(event=="edit"){
            	var departmentname=obj.data.departmentname;
            	var departmentno=obj.data.departmentno;
            	var underno=obj.data.underno;
            	var undername=(obj.data.undername==undefined?"":obj.data.undername);
            	var description=obj.data.description;
            	localStorage.departmentno=departmentno;
            	localStorage.departmentname=departmentname;
            	localStorage.underno=underno;
            	localStorage.undername=undername;
            	localStorage.description=description; 
            	layer.open({
            		type:2,
            		title:"修改部门",
            		content:"dept_update.html",
            		area:["550px","450px"]
            	})
            }
        });
	});
}



/*//单行删除
$(document).on("click",".shan",function(){
	var that=this;
	var departmentno=$(this).parent().siblings().eq(0).html();
	layer.confirm("确定删除?",{title:'提示'},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/DepartmentData/deleteDeptData",
			type:"POST",
			data:{"departmentno":departmentno},
			success:function(data){
				if(data.flag){
					$(that).parent().parent().remove();
					getDeptTree();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})//end
*///修改部门
$(document).on("click",".mo",function(){
	var departmentno=$(this).parent().siblings().eq(0).html();
	var departmentname=$(this).parent().siblings().eq(1).text();
	var underno=$(this).parent().siblings().eq(2).html();
	var undername=$(this).parent().siblings().eq(3).text();
	var description=$(this).parent().siblings().eq(4).text();
	localStorage.departmentno=departmentno;
	localStorage.departmentname=departmentname;
	localStorage.underno=underno;
	localStorage.undername=undername;
	localStorage.description=description; 
});
//部门下拉树初始化
var treeText="";
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		data:{"res":"true"},
		dataType:'json',//数据类型
		async:false,
		success:function(data){
			console.log(data)
			if(!data.flag){
				layer.msg(data.reason,{"time":2000});
				return;
			}
			layui.use(['tree', 'util'], function(){
				 var tree = layui.tree;
				 var layer = layui.layer;
				 var util = layui.util;
				  tree.render({
				    elem: '#test1',
				    data: data.result,
				    onlyIconControl:true,
				    click: function(obj){
				    	treeText=obj.data.title;
				    	$(".layui-tree-txt").css("color","#555");
				    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
				      var id=obj.data.id;
				      queryDeptList(id);
				      getPage();
				    },
				  });
			})
		},
		error:function(data){}
	})
}
//生成部门列表
function queryDeptList(departmentno){//查询部门列表
	//var obj={"pageIndex":page,"pageSize":limit,"departmentno":departmentno};
	var obj={"departmentno":departmentno};
	$.ajax({
		//url:url+"/DepartmentData/queryDeptListByPage",
		url:url+"/DepartmentData/queryDeptList",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			initTreeTable(data.result);
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				/*total=0;*/
				return;
			}
			console.log(data)
			/*page=data.pageinfo.pageIndex;
			limit=data.pageinfo.pageSize;
			total=data.pageinfo.sumCount;*/
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="2001"){
					list.push(item);
				}
			}
				var html="";
				var text="";
				var text1="";
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 text="";
				  }else {
					 text="<a href='dept_update.html' class='mo layui-btn layui-btn-xs'>修改</a>";
				  }
				 
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				  }
				 
				 if(text==""&&text1==""){
					 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				 }
				$.each(data.result,function(i,val){
					var departmentno=(val.departmentno==undefined?"":val.departmentno);
					var departmentname=(val.departmentname==undefined?"":val.departmentname);
					var description=(val.description==undefined?"":val.description);
					var underno=(val.underno==undefined?"":val.underno);
					var undername=(val.undername==undefined?"":val.undername);
					html+="<tr><td>"+departmentno+"</td><td>"+departmentname
					+"</td><td>"+underno+"</td><td>"+undername+"</td><td>"+description
					+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})
}//end

/**
 * 导出全部数据Excel
 */
$("#export").click(function(){
	/*layer.confirm("选择导出数据",{
		title:"提示信息",
		btn:["导出当前数据","导出全部数据"],
		yes:function(index,layero){
			$(".no-print").remove();
		    var table1 = document.querySelector("#dayindaju1");
		    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
		    openDownloadDialog(sheet2blob(sheet),'部门信息.xlsx');
		    window.location.reload();
		},
		btn2:function(index,layero){*/
			var index=layer.load(2);
			$.ajax({
				url:url+"/DepartmentData/queryDeptList",
				type:"post",
				success:function(data){
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table = $('<table id="tableData" style="display:none"><tr><td>部门编号</td><td>部门名称</td><td>上级部门</td><td>上级部门名称</td><td>部门介绍</td></tr></table>');
					      //循环遍历，每行加入tr标签，每个单元格加td标签
					      for(var item of res){
					    	  var departmentno=item.departmentno==undefined?"":item.departmentno;
					    	  var departmentname=item.departmentname==undefined?"":item.departmentname;
					    	  var underno=item.underno==undefined?"":item.underno;
					    	  var undername=item.undername==undefined?"":item.undername;
					    	  var description=item.description==undefined?"":item.description;
					    	  var $tr=$("<tr><td>"+departmentno+"</td><td>"+departmentname+"</td><td>"+underno+"</td>" +
					    	  		"<td>"+undername+"</td><td>"+description+"</td></tr>");
					    	  $table.append($tr);
					      }
					      $("body").append($table);
					      var table = document.querySelector("#tableData");
					      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
					      openDownloadDialog(sheet2blob(sheet),'部门信息.xlsx');
					      $("#tableData").remove();
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(){
					layer.close(index);
				}
			})
			//}
		/*})*/
});
 
//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertDepartmentData").hide();
		$("#daoRuDept").hide();
		$("#export").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="2001"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertDepartmentData").show();
			}
			if(item.Code=="import"){
				$("#daoRuDept").show();
			}
			if(item.Code=="export"){
				$("#export").show();
			}
		}
	}

