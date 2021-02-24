$(function(){
	getMenuTree();
	showHide();//跟权限有关
});

//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#addMenuBtn").hide();
	/*$("#addModelBtn").hide();
	$("#addPermBtn").hide();
	$("#updateMenuBtn").hide();
	$("#updateModelBtn").hide();
	$("#updatePermBtn").hide();
	$("#delMenuBtn").hide();
	$("#delModelBtn").hide();
	$("#delPermBtn").hide();*/
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="18002"){
			list.push(item);
		}
	})
	for(var item of list){
		if(item.Code=="add"){
			$("#addMenuBtn").show();
			/*$("#addModelBtn").show();
			$("#addPermBtn").show();*/
		}
		
		/*if(item.Code=="update"){
			$("#updateMenuBtn").show();
			$("#updateModelBtn").show();
			$("#updatePermBtn").show();
		}
		
		if(item.Code=="delete"){
			$("#delMenuBtn").show();
			$("#delModelBtn").show();
			$("#delPermBtn").show();
		}*/
		
	}
}//end



//新增菜单
$(document).on("click","#addMenuBtn",function(){
	addMenu();
})
//点击菜单列表下的新增
function addMenu(){
	$("#menu_title").html("新增菜单");
	$("#menucode").val("");
	$("#menuname").val("");
	$("#menupath").val("");
	$("#menuimg").val("");
	$("#orderid1").val("");
	$("#remark1").val("");
	layer.open({
		type:1,
		title:"信息",
		content:$("#menu_add_update"),
		area:["600px","500px"],
		btn:["确定","取消"],
		success: function(layero, index){
			for(var i=1;i<$("div.layui-layer-shade").length;i++){
				$("div.layui-layer-shade").eq(i).remove();
			}
		  },
		yes:function(index,layero){//点击弹窗确定的回调
			layer.close(index);
			var menucode=$("#menucode").val();
			var menuname=$("#menuname").val();
			var orderid=$("#orderid1").val();
			var remark=$("#remark1").val();
			var menupath=$("#menupath").val();
			var menuimg=$("#menuimg").val();
			var obj={"menucode":menucode,"menuname":menuname,"menupath":menupath,"menuimg":menuimg,"orderid":orderid,"remark":remark};
			if(menucode.length==0){
				layer.msg("菜单编码不能为空！",{time:2000})
				return;
			}
			if(menuname.length==0){
				layer.msg("菜单名称不能为空！",{time:2000})
				return;
			}
			$.ajax({
				url:url+"/ACL_MenuData/insert",
				type:"POST",
				data:obj,
				dataType:"json",
				success:function(data){
					//layer.msg(data.reason,{time:2000});
					layer.msg(data.reason,{time:2000},function(){
						getMenuTree();
					});
					/*if(!data.flag){
						return;
					}
					getMenuTree();*/
				}
			})
		}
	})
}//end
//点击菜单列表下的编辑，修改菜单
function updateMenu(id){
	$("#menu_title").html("修改菜单");
	layer.open({
		type:1,
		title:"信息",
		content:$("#menu_add_update"),
		area:["600px","500px"],
		btn:["确定","取消"],
		success: function(layero, index){
			for(var i=1;i<$("div.layui-layer-shade").length;i++){
				$("div.layui-layer-shade").eq(i).remove();
			}
		  },
		yes:function(index,layero){//点击弹窗确定的回调
			layer.close(index);
			var menucode=$("#menucode").val();
			var menuname=$("#menuname").val();
			var orderid=$("#orderid1").val();
			var remark=$("#remark1").val();
			var menupath=$("#menupath").val();
			var menuimg=$("#menuimg").val();
			var obj={"id":id,"menucode":menucode,"menuname":menuname,"menupath":menupath,"menuimg":menuimg,"orderid":orderid,"remark":remark};
			if(menucode.length==0){
				layer.msg("菜单编码不能为空！",{time:2000})
				return;
			}
			if(menuname.length==0){
				layer.msg("菜单名称不能为空！",{time:2000})
				return;
			}
			$.ajax({
				url:url+"/ACL_MenuData/update",
				type:"POST",
				data:obj,
				dataType:"json",
				success:function(data){
					layer.msg(data.reason,{time:2000});
					if(!data.flag){
						return;
					}
					getMenuTree();
					
				}
			})
		}
	})
}//end

//点击菜单列表下的添加，添加子模块
function addModel(){
	$("#modelcode").val("");
	$("#modelname").val("");
	$("#modelpath").val("");
	$("#menuno").val("");
	$("#orderid2").val("");
	$("#remark2").val("");
	$("#model_title").html("新增模块");
	layer.open({
		type:1,
		title:"信息",
		content:$("#model_add_update"),
		area:["600px","500px"],
		btn:["确定","取消"],
		success: function(layero, index){
			for(var i=1;i<$("div.layui-layer-shade").length;i++){
				$("div.layui-layer-shade").eq(i).remove();
			}
		  },
		yes:function(index,layero){//点击弹窗确定的回调
			layer.close(index);
			var modelcode=$("#modelcode").val();
			var modelname=$("#modelname").val();
			var modelpath=$("#modelpath").val();
			var menuno=$("#menuno").val();
			var orderid=$("#orderid2").val();
			var remark=$("#remark2").val();
			var obj={"modelcode":modelcode,"modelname":modelname,"modelpath":modelpath,"menucode":menuno,"orderid":orderid,"remark":remark};
			if(modelcode.length==0){
				layer.msg("模块编码不能为空！",{time:2000})
				return;
			}
			if(modelname.length==0){
				layer.msg("模块名称不能为空！",{time:2000})
				return;
			}
			$.ajax({
				url:url+"/ACL_ModelData/insert",
				type:"POST",
				data:obj,
				dataType:"json",
				success:function(data){
					layer.msg(data.reason,{time:2000});
					
					/*layer.msg(data.reason,{time:2000},function(){
						window.location.reload();
					});*/
					if(!data.flag){
						return;
					}
					$("#modelcode").val("");
					$("#modelname").val("");
					$("#menuno").val("");
					$("#orderid2").val("");
					$("#remark2").val("");
					$("#modelpath").val("");
					getMenuTree();
				}
			})
		}
	})
}//end
 
//点击模块列表下的编辑，修改模块
function updateModel(id){
	$("#model_title").html("修改模块");
	layer.open({
		type:1,
		title:"信息",
		content:$("#model_add_update"),
		area:["600px","500px"],
		btn:["确定","取消"],
		success: function(layero, index){
			for(var i=1;i<$("div.layui-layer-shade").length;i++){
				$("div.layui-layer-shade").eq(i).remove();
			}
		  },
		yes:function(index,layero){//点击弹窗确定的回调
			layer.close(index);
			var modelcode=$("#modelcode").val();
			var modelname=$("#modelname").val();
			var modelpath=$("#modelpath").val();
			var menuno=$("#menuno").val();
			var orderid=$("#orderid2").val();
			var remark=$("#remark2").val();
			var obj={"id":id,"modelcode":modelcode,"modelname":modelname,"modelpath":modelpath,"menucode":menuno,"orderid":orderid,"remark":remark};
			console.log(obj)
			$.ajax({
				url:url+"/ACL_ModelData/update",
				type:"POST",
				data:obj,
				dataType:"json",
				success:function(data){
					console.log(data)
					if(!data.flag){
						layer.msg(data.reason,{time:2000});
						return;
					}
                    /*layer.msg(data.reason,{time:2000},function(){
						window.location.reload();
					});*/
					getMenuTree();
				}
			})
		}
	})
}//end
//点击模块列表下的添加，添加功能
function addPerm(){
	$("#code").val("");
	$("#name").val("");
	$("#permpath").val("");
	$("#modelno").val("");
	$("#orderid3").val("");
	$("#remark3").val("");
	$("#perm_title").html("新增功能");
	layer.open({
		type:1,
		title:"信息",
		content:$("#perm_add_update"),
		area:["600px","500px"],
		btn:["确定","取消"],
		success: function(layero, index){
			for(var i=1;i<$("div.layui-layer-shade").length;i++){
				$("div.layui-layer-shade").eq(i).remove();
			}
		  },
		yes:function(index,layero){//点击弹窗确定的回调
			layer.close(index);
			var code=$("#code").val();
			var name=$("#name").val();
			var modelno=$("#modelno").val();
			var orderid=$("#orderid3").val();
			var description=$("#remark3").val();
			var permpath=$("#permpath").val();
			var obj={"code":code,"name":name,"permpath":permpath,"modelcode":modelno,"orderid":orderid,"description":description};
			$.ajax({
				url:url+"/ACL_Permissions/insert",
				type:"POST",
				data:obj,
				dataType:"json",
				success:function(data){
					layer.msg(data.reason,{time:2000});
					/*layer.msg(data.reason,{time:2000},function(){
						window.location.reload();
					});*/
					if(!data.flag){
						return;
					}
					$("#code").val("");
					$("#name").val("");
					$("#modelno").val("");
					$("#orderid3").val("");
					$("#remark3").val("");
					$("#permpath").val("");
					getMenuTree();
				}
			})
		}
	})
}//end

//点击功能列表下的编辑
function updatePerm(id){
	$("#perm_title").html("修改功能");
	layer.open({
		type:1,
		title:"信息",
		content:$("#perm_add_update"),
		area:["600px","500px"],
		btn:["确定","取消"],
		success: function(layero, index){
			for(var i=1;i<$("div.layui-layer-shade").length;i++){
				$("div.layui-layer-shade").eq(i).remove();
			}
		  },
		yes:function(index,layero){//点击弹窗确定的回调
			layer.close(index);
			var code=$("#code").val();
			var name=$("#name").val();
			var modelno=$("#modelno").val();
			var orderid=$("#orderid3").val();
			var description=$("#remark3").val();
			var permpath=$("#permpath").val();
			var obj={"id":id,"code":code,"name":name,"permpath":permpath,"modelcode":modelno,"orderid":orderid,"description":description};
			$.ajax({
				url:url+"/ACL_Permissions/update",
				type:"POST",
				data:obj,
				dataType:"json",
				success:function(data){
					//layer.msg(data.reason,{time:2000});
					layer.msg(data.reason,{time:2000},function(){
						//window.location.reload();
						getMenuTree();
					});
					/*if(!data.flag){
						return;
					}
					getMenuTree();*/
				}
			})
		}
	})
}//end
//菜单下拉树初始化
function getMenuTree(){
	$.ajax({
		url:url+'/ACL_MenuData/getMenuTree',
		type:'POST',//类型
		data:{"res":"true"},
		dataType:'json',//数据类型
		async:false,
		success:function(data){
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
				    	$(".layui-tree-txt").css("color","#555");
				    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
				      var id=obj.data.id.substring(1);
				      var title=obj.data.title;
				      var parent=obj.data.parent.substring(1);
				      var parentcode=obj.data.parentcode;
				      var children=obj.data.children;
				      var orderid=obj.data.orderid;
				      var remark=obj.data.remark;
				      var code=obj.data.code;
				      var path=obj.data.path;
				      var navimg=obj.data.navimg;
				      var s=obj.data.id.substring(0,1);
				     console.log(id+";title=="+title+";code="+code+";parent=="+parent+";children=="+children)
				      console.log(obj.data)
				      if(s=="e"){//选中的菜单
				    	  $("table").eq(0).show();
				    	  $("table").eq(1).hide();
				    	  $("table").eq(2).hide();
				    	  queryMenuList(id);
				    	  //删除操作
				    	  $(document).on("click",".del",function(){
				    	  	var src="/ACL_MenuData/delete";
				    	  	delFun(id,src)
				    	  })
				    	   //点击菜单列表下的添加操作
				    	  $(document).on("click",".addMenu",function(){
				    		  getMenuList(code);
				    	  	  addModel();
				    	  })
				    	  //修改操作
				    	  $(document).on("click",".updataMenu",function(){
				    	  	$("#menucode").val(code)
				    	  	$("#menuname").val(title)
				    	  	$("#orderid1").val(orderid)
				    	  	$("#remark1").val(remark)
				    	  	$("#menupath").val(path)
				    	  	$("#menuimg").val(navimg)
				    	  	updateMenu(id);
				    	  })
				      }else if(s=="o"){//选中的模块
				    	  $("table").eq(0).hide();
				    	  $("table").eq(1).show();
				    	  $("table").eq(2).hide();
				    	  queryModelList(id);
				        	//删除操作
				    	  $(document).on("click",".del",function(){
				    	  	var src="/ACL_ModelData/delete";
				    	  	delFun(id,src)
				    	  })
				    	  
				    	  //添加操作
				    	  $(document).on("click",".addModel",function(){
				    		  getModelList(code);
				    	  	  addPerm();
				    	  })
				    	  
				    	  // 修改操作
				    	  $(document).on("click",".updataModel",function(){
				    		  getMenuList(parentcode);
				    		  $("#modelcode").val(code);
				    		  $("#modelname").val(title);
				    		  $("#orderid2").val(orderid)
				    		  $("#remark2").val(remark)
				    		   $("#modelpath").val(path);
				    		  updateModel(id);
				    	  })
				      }else if(s=="p"){//选中的功能
				    	  $("table").eq(0).hide();
				    	  $("table").eq(1).hide();
				    	  $("table").eq(2).show();
				    	  queryPermList(id);
				    	 //删除操作
				    	  $(document).on("click",".del",function(){
				    	  	var src="/ACL_Permissions/delete";
				    	  	delFun(id,src)
				    	  })
				    	  	//修改操作
				    	  $(document).on("click",".updataPerm",function(){
				    		  getModelList(parentcode);
				    		  $("#code").val(code);
				    		  $("#name").val(title);
				    		  $("#permpath").val(path);
				    		  $("#orderid3").val(orderid)
				    		  $("#remark3").val(remark)
				    		  updatePerm(id);
				    	  })
				      }
				    },
				  });
			})
		},
		error:function(data){}
	})
}
//删除操作
function delFun(id,src){
	var obj={"id":id};
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+src,
			type:"POST",
			data:obj,
			dataType:"json",
			success:function(data){
				layer.msg(data.reason,{time:2000},function(){
					window.location.reload();
				});
			}
		})
	})
}
//查询菜单列表
function queryMenuList(idd){
	var obj = {"id":idd};
	$.ajax({
		url:url+"/ACL_MenuData/queryMenuList",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			$("#cont").empty();
			if(!data.flag){
				return;
			}
			//权限
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="18002"){
					list.push(item);
				}
			}
			
			var html="";
			var txt="";
			var txt1="";
			var txt2="";
			 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 txt="编辑";
			  }else {
				 txt="<a href='javascript:;' class='layui-btn layui-btn-xs updataMenu' lay-event='edit'>编辑</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
				 txt1="删除";
			  }else {
				 txt1="<a  class='layui-btn layui-btn-danger layui-btn-xs del' lay-event='del'>删除</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="add")==-1&&window.top.arr.length!=0){
				 txt2="添加";
			  }else {
				 txt2="<a href='javascript:;' class='layui-btn layui-btn-xs addMenu' lay-event='add'>添加</a>";
			  }
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var menucode=(val.menucode==undefined?"":val.menucode);
				var menuname=(val.menuname==undefined?"":val.menuname);
				
				var menupath=(val.menupath==undefined?"":val.menupath);
				var parentid=(val.parentid==undefined?"":val.parentid);
				var menuimg=(val.menuimg==undefined?"":val.menuimg);
				
				var orderid=(val.orderid==undefined?"":val.orderid);
				var remark=(val.remark==undefined?"":val.remark);
				html+="<tr><td class='no-print'>"+id+"</td><td>"+menucode
				+"</td><td>"+menuname
				+"</td><td>"+menupath
				+"</td><td>"+menuimg
				+"</td><td>"+parentid
				+"</td><td>"+orderid
				+"</td><td>"+remark
				+"</td><td class='center no-print' data-id='"+id+"'>"+txt+txt1+txt2+"</td></tr>";
			})
			$("#cont").append(html);	
		}
	})
}//end

//查询模块列表
function queryModelList(idd){
	var obj = {"id":idd};
	$.ajax({
		url:url+"/ACL_ModelData/queryModelList",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			$("#cont2").empty();
			if(!data.flag){
				return;
			}
			//权限
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="18002"){
					list.push(item);
				}
			}
			
			var html="";
			var txt="";
			var txt1="";
			var txt2="";
			 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 txt="编辑";
			  }else {
				 txt="<a href='javascript:;' class='layui-btn layui-btn-xs updataModel' lay-event='edit'>编辑</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
				 txt1="删除";
			  }else {
				 txt1="<a  class='layui-btn layui-btn-danger layui-btn-xs del' lay-event='del'>删除</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="add")==-1&&window.top.arr.length!=0){
				 txt2="添加";
			  }else {
				 txt2="<a href='javascript:;' class='layui-btn layui-btn-xs addModel' lay-event='add'>添加</a>";
			  }
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var modelcode=(val.modelcode==undefined?"":val.modelcode);
				var modelname=(val.modelname==undefined?"":val.modelname);
				var remark=(val.remark==undefined?"":val.remark);
				var modelpath=(val.modelpath==undefined?"":val.modelpath);
				var orderid=(val.orderid==undefined?"":val.orderid);
				var menuno=(val.menuno==undefined?"":val.menuno);
				var menucode=(val.menucode==undefined?"":val.menucode);
				var menuname=(val.menuname==undefined?"":val.menuname);
				html+="<tr><td class='no-print'>"+id+"</td><td>"+modelcode
				+"</td><td>"+modelname
				+"</td><td>"+modelpath
				+"</td><td>"+menucode
				+"</td><td>"+menuname
				+"</td><td>"+orderid
				+"</td><td>"+remark
				+"</td><td class='center no-print' data-id='"+id+"' data-menuno='"+menuno+"'>"+txt+txt1+txt2+"</td></tr>";
			})
			$("#cont2").append(html);	
			
		}
	})
}//end

//查询功能列表
function queryPermList(idd){//获取职务列表
	var obj = {"id":idd};
	$.ajax({
		url:url+"/ACL_Permissions/queryPermList",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			$("#cont3").empty();
			if(!data.flag){
				return;
			}
			//权限
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="18002"){
					list.push(item);
				}
			}
			
			var html="";
			var txt="";
			var txt1="";
			 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 txt="编辑";
			  }else {
				 txt="<a href='javascript:;' class='layui-btn layui-btn-xs updataPerm' lay-event='edit'>编辑</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
				 txt1="删除";
			  }else {
				 txt1="<a  class='layui-btn layui-btn-danger layui-btn-xs del' lay-event='del'>删除</a>";
			  }
			
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var code=(val.code==undefined?"":val.code);
				var name=(val.name==undefined?"":val.name);
				var modelno=(val.modelno==undefined?"":val.modelno);
				var modelcode=(val.modelcode==undefined?"":val.modelcode);
				var modelname=(val.modelname==undefined?"":val.modelname);
				var description=(val.description==undefined?"":val.description);
				var orderid=(val.orderid==undefined?"":val.orderid);
				var permpath=(val.permpath==undefined?"":val.permpath);
				html+="<tr><td class='no-print'>"+id+"</td><td>"+code
				+"</td><td>"+name
				+"</td><td>"+permpath
				+"</td><td>"+modelcode
				+"</td><td>"+modelname
				+"</td><td>"+orderid
				+"</td><td>"+description
				+"</td><td class='center no-print' data-id='"+id+"' data-modelno='"+modelno+"'>"+txt+txt1+"</td></tr>";
			})
			$("#cont3").append(html);
		}
	})
}//end
//菜单下拉列表
function getMenuList(menuno){
	$.ajax({
		url:url+"/ACL_MenuData/queryMenuList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			$("#menuno option").not("option:first ").remove();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var menucode=(val.menucode==undefined?"":val.menucode);
				var menuname=(val.menuname==undefined?"":val.menuname);
				html+="<option value='"+menucode+"'>"+menuname+"</option>";
			})
			$("#menuno").append(html).val(menuno);
		}
	})
}//end

//模块下拉列表
function getModelList(modelno){
	$.ajax({
		url:url+"/ACL_ModelData/queryModelList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			//$("#modelno").empty();
			$("#modelno option").not("option:first ").remove();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var modelcode=(val.modelcode==undefined?"":val.modelcode);
				var modelname=(val.modelname==undefined?"":val.modelname);
				html+="<option value='"+modelcode+"'>"+modelname+"</option>";
			})
			$("#modelno").append(html).val(modelno);
		}
	})
}

