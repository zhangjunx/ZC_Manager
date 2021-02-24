$(function(){
	//初始化权限
	initPermissionTree();
})
//初始权限树
function initPermissionTree(){
	$.ajax({
		url:url+"/manage/selectAppletManage",
		type:"POST",
		data:{"spread":"true"},
		success:function(data){
			if(data.flag){
				layui.use(['tree', 'util'], function(){
					 var tree = layui.tree;
					 var layer = layui.layer;
					 var util = layui.util;
					 //开启节点操作图标
					  tree.render({
					    elem: '#test1',
					    data: data.result,
					    edit: ['add', 'update', 'del'], //操作节点的图标
					    click: function(obj){
					      /*console.log(JSON.stringify(obj.data));*/
					    },
					    //操作节点的回调
					    operate: function(obj){
					        var type = obj.type; //得到操作类型：add、edit、del
					        var data = obj.data; //得到当前节点的数据
					        var elem = obj.elem; //得到当前节点元素
					        //Ajax 操作
					        var id=data.id;
					        if(type === 'add'){ //增加节点
					        	 var modelname="未命名";
					        	 id=id.substr(1);
					        	insertAppletModel(id,modelname);
					        } else if(type === 'update'){ //修改节点
					        	var modelname=elem.find('.layui-tree-txt').html(); //得到修改后的内容
					        	id=id.substr(1);
					        	updateAppletModel(id,modelname);
					        } else if(type === 'del'){ //删除节点
					        	id=id.substr(1);
					        	deleteAppletModel(id);
					        };
					      }
					  });
				})
				//找到最底层节点，设置不显示新增图标
				for(var i=0;i<$(".layui-icon-file").length;i++){
					$(".layui-icon-file").eq(i).parent().parent().next().find(".layui-icon-add-1").css("display","none")
				}
			}
		}
	})
}
//新增节点
function insertAppletModel(menuno,modelname){
	$.ajax({
		url:url+"/manage/insertAppletModel",
		type:"POST",
		data:{"menuno":menuno,"modelname":modelname},
		success:function(data){
			console.log(data);
			if(data.flag){
				initPermissionTree();
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//删除节点
function deleteAppletModel(menuno){
	$.ajax({
		url:url+"/manage/deleteAppletModel",
		type:"POST",
		data:{"modelno":menuno},
		success:function(data){
			console.log(data);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//修改节点
function updateAppletModel(menuno,modelname){
	$.ajax({
		url:url+"/manage/updateAppletModel",
		type:"POST",
		data:{"modelno":menuno,"modelname":modelname},
		success:function(data){
			console.log(data);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
