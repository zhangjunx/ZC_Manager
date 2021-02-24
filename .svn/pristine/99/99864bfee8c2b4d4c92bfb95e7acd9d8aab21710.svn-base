var list = [];
var i=0;
$(function(){
	//树形表格
	getList();
	//查询角色
	queryRoleList();

})//end
layui.config({
    base: '../'
}).extend({
    treeTable: 'treeTable/treeTable'
}).use(['treeTable'], function () {
    var treeTable = layui.treeTable;
});

var parentName="";

//是否新增菜单下拉框的内容改变事件
$(".selectYZ").change(function(){
	if($(this).val()==1){//否，表示新增页面
		$("#add_menu").hide();
		$("#add_button").hide();
		$("#add_yemian").show();
		$("#parentName2").val(parentName);
	}else if($(this).val()==0){//是，表示新增菜单
		$("#add_menu").show();
		$("#add_button").hide();
		$("#add_yemian").hide();
		$("#parentName1").val(parentName);
	}
})
//图标选择
$(document).on("change","#upload",function(){
	var imgUrl = getObjectURL(this.files[0]);
	$(".iconSelect").attr("src", imgUrl);
})
function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) {
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}//end
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
                iconIndex: 1,  // 折叠图标显示在第几列
                arrowType: 'arrow2', 
                idName: 'id',
                pidName: 'parent',
                isPidData: true,
               //openName: 'open',
                treeLinkage: false,
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
            	{type:"checkbox",width:"50"},
                {field: 'title', title: '名称',width:"250"},
                {field: 'orderId', title: '序号',width:"60"},
                {field: 'uuid', title: 'uid',width:"200"},
                {field: 'menuImg', title: '图标',width:"60",templet:function(d){
                	if(d.menuImg==undefined||d.menuImg==""){
                		return "";
                	}else{
                		return "<img src='data:image/png;base64,"+d.menuImg+"' style='width:30px'>";
                		
                	}
                }},
                {field: 'modelPath', title: '路径',width:"350"},
                {field: 'type', title: '类型',width:"80",templet:function(d){
                	if(d.id.indexOf("z")!=-1){
                		return "菜单";
                	}else if(d.id.indexOf("y")!=-1){
                		return "页面";
                	}else if(d.id.indexOf("o")!=-1){
                		return "操作";
                	}
                }},
                {field: 'remark', title: '备注'},
                {align:"center",title:"操作",width:"170",templet:function(d){
                	if(d.id=="z_0"){
		                return '<a href="javascript:;" class="layui-btn layui-btn-xs" lay-event="add">新增</a>'+
		             		   '<a href="javascript:;" class="layui-btn layui-btn-xs layui-bg-gray" >修改</a>'+
		             		   '<a href="javascript:;" class="layui-btn layui-btn-xs layui-btn-danger layui-bg-gray">删除</a>';
                	}else if(d.id.indexOf("o")!=-1){
	                    return '<a href="javascript:;" class="layui-btn layui-btn-xs layui-bg-gray">新增</a>'+
		             		   '<a href="javascript:;" class="layui-btn layui-btn-xs" lay-event="edit">修改</a>'+
		             		   '<a href="javascript:;" class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>';
                	}else{
	                    return '<a href="javascript:;" class="layui-btn layui-btn-xs" lay-event="add">新增</a>'+
		             		   '<a href="javascript:;" class="layui-btn layui-btn-xs" lay-event="edit">修改</a>'+
		             		   '<a href="javascript:;" class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>';
                	}
                }}
            ],
        });
        //insTb.expandAll();//展开所有
        treeTable.on('tool(dayindaju1)', function(obj){
            var event=obj.event;
            if(event=="del"){
            	var menuList=[];
        		var pageList=[];
        		var btnList=[];
        		list = [];
        		var res3 = getList12(obj.data.children,obj.data.id)
            	if(obj.data.id.indexOf("z_")!=-1){ //删除菜单
            		menuList.push({"menuCode":obj.data.id});
            		for(var item of res3){
            			if(item.id.indexOf("z_")!=-1){
            				menuList.push({"menuCode":item.id});
            			}else if(item.id.indexOf("y_")!=-1){
            				pageList.push({"modelCode":item.id});
            			}else if(item.id.indexOf("o_")!=-1){
            				btnList.push({"ID":item.id});
            			}
            		}
    			}else if(obj.data.id.indexOf("y_")!=-1){//删除页面
    				pageList.push({"modelCode":obj.data.id});
            		for(var item of res3){
            			if(item.id.indexOf("z_")!=-1){
            				menuList.push({"menuCode":item.id});
            			}else if(item.id.indexOf("y_")!=-1){
            				pageList.push({"modelCode":item.id});
            			}else if(item.id.indexOf("o_")!=-1){
            				btnList.push({"ID":item.id});
            			}
            		}
    			}else if(obj.data.id.indexOf("o_")!=-1){//删除按钮
    				btnList.push({"ID":obj.data.id});
            		for(var item of res3){
            			if(item.id.indexOf("z_")!=-1){
            				menuList.push({"menuCode":item.id});
            			}else if(item.id.indexOf("y_")!=-1){
            				pageList.push({"modelCode":item.id});
            			}else if(item.id.indexOf("o_")!=-1){
            				btnList.push({"ID":item.id});
            			}
            		}
    			}
        		if(menuList.length == 0){
        			menuList.push({"menuCode":"-1"})
        		}
        		if(pageList.length == 0){
        			pageList.push({"modelCode":"-1"})
        		}
        		if(btnList.length == 0){
        			btnList.push({"ID":"-1"})
        		}
        		var obj3=JSON.stringify({"menuList":menuList,"pageList":pageList,"btnList":btnList});
            	layer.confirm("确定删除?",{title:'提示'},function(index){
            		layer.close(index);
            		$.ajax({
            			url:url+"/limit_menu/delOneMenu",
            			type:"POST",
            			data:obj3,
            			contentType:"application/json",
            			success:function(data){
            				if(data.flag){
            					layer.msg(data.reason,{time:1000},function(){
            						obj.del();
            					})
            				}else{
            					layer.msg(data.reason,{time:2000});
            				}
            			}
            		})
            	})
            }else if(event=="edit"){
            	console.log(obj)
            	//清空弹出层表单
            	$(".ifScreenFull").val("0");
            	$file =$("#upload");
            	 $file.remove();
            	 $('#filespan').append("<input type='file' id='upload' title='点击更换图片' accept = '.jpg,.png,.gif'>");
            	$("#parentName1").val("");
            	$("#parentName2").val("");
            	$("#parentName3").val("");
            	$("#title1").val("");
            	$("#orderId1").val("");
            	 $(".iconSelect").attr("src","img/iconSelect.png");
            	 $("#remark1").val("");
            	 $("#title2").val("");
            	 $("#orderId2").val("");
            	 $("#modelPath2").val("");
            	 $("#remark2").val("");
            	 $("#title3").val("");
            	 $("#code3").val("");
            	 $("#orderId3").val("");
            	 $("#remark3").val("");
            	if(obj.data.id.indexOf("z")!=-1){ //编辑菜单
            		$("#add_menu").show();
            		$("#add_menu_select").hide();
            		$("#add_yemian").hide();
            		$("#add_button").hide();
            		$("#title1").val(obj.data.title);
            		var parentname=$(".layui-table tr[data-id="+obj.data.parent+"] .ew-tree-pack span").html();
            		$("#parentName1").val(parentname);
            		$("#orderId1").val(obj.data.orderId);
            		if(obj.data.menuImg!=""&&obj.data.menuImg!=undefined){
            			$(".iconSelect").attr("src","data:image/png;base64,"+obj.data.menuImg);
            		}
            		$("#remark1").html(obj.data.remark);
    			}else if(obj.data.id.indexOf("y")!=-1){//编辑页面
    				$("#add_menu_select").hide();
            		$("#add_yemian").show();
            		$("#add_button").hide();
            		$("#add_menu").hide();
            		$("#title2").val(obj.data.title);
            		var parentname=$(".layui-table tr[data-id="+obj.data.parent+"] .ew-tree-pack span").html();
            		$("#parentName2").val(parentname);
            		$("#orderId2").val(obj.data.orderId);
            		$("#modelPath2").val(obj.data.modelPath);
            		$("#remark2").html(obj.data.remark);
            		if(obj.data.ifScreenFull=="1"){
            			$(".ifScreenFull").val("1");
            		}else{
            			$(".ifScreenFull").val("0");
            		}
    			}else if(obj.data.id.indexOf("o")!=-1){//编辑按钮
    				$("#add_button").show();
            		$("#add_menu").hide();
            		$("#add_menu_select").hide();
            		$("#add_yemian").hide();
            		$("#title3").val(obj.data.title);
            		$("#code3").val(obj.data.code);
            		var parentname=$(".layui-table tr[data-id="+obj.data.parent+"] .ew-tree-pack span").html();
            		$("#parentName3").html(parentname);
            		$("#orderId3").val(obj.data.orderId);
            		$("#remark3").html(obj.data.remark);
    			}
            	layer.open({
            		type:1,
            		title:"修改",
            		content:$("#menu_add_update"),
            		area:["450px","550px"],
            		btn:["确定","取消"],
            		yes:function(index){
            			var formData = new FormData();
            			if(obj.data.id.indexOf("z")!=-1){//编辑菜单
            				var menuName=$("#title1").val();
                			var parentID=obj.data.parent;
                			var orderID=$("#orderId1").val();
                			var remark1=$("#remark1").val();
                			var src=$(".iconSelect").attr("src");
                			if(src.indexOf('data:image')>-1){
                		    	 // base64 图片操作
                		    	 var file=dataUrlToFile(src,"icon.png");
                		    	 formData.append("file", file);	
                		     }else if(src!="img/iconSelect.png"&&src.indexOf('data:image')==-1){
                		    	 formData.append("file", $("#upload")[0].files[0]);
                		     }
            				var obj1={"optType":"z","menuName1":menuName,"parentID1":parentID,"orderID1":orderID,"remark1":remark1,"menuCode1":obj.data.id};
            			}else if(obj.data.id.indexOf("y")!=-1){//编辑页面
            				  var title2=$("#title2").val();
            				  var menuCode2=obj.data.parent;
            				  var orderID2=$("#orderId2").val();
            				  var modelPath2=$("#modelPath2").val();
            				  var remark2=$("#remark2").val();
            				  var ifScreenFull=$(".ifScreenFull").val();
            				  //formData.append("file", $("#upload")[0].files[0]);
            				  var obj1={"optType":"y","ifScreenFull":ifScreenFull,"modelCode2":obj.data.id,"modelName2":title2,"menuCode2":menuCode2,"orderID2":orderID2,"modelPath2":modelPath2,"remark2":remark2};
            			}else if(obj.data.id.indexOf("o")!=-1){//编辑按钮
            				var code3=$("#code3").val();
            				var name3=$("#title3").val();
            				var description3=$("#remark3").val();
            				var modelCode3=obj.data.parent;
            				var orderID3=$("#orderId3").val();
            				 //formData.append("file", null);
            				var obj1={"optType":"o","code3":code3,"ID3":obj.data.id,"name3":name3,"description3":description3,"modelCode3":modelCode3,"orderID3":orderID3};
            			}
            			formData.append("str",JSON.stringify(obj1));
            			$.ajax({
            				url:url+"/limit_menu/addMenu",
            				type:"post",
            				cache: false,
            				data:formData,
            				processData: false,
            				contentType: false,
            				success:function(data){
            					if(data.flag){
            						layer.msg(data.reason,{time:1000},function(){
            							layer.close(index);
            							getList();
            						});
            					}else{
            						layer.msg(data.reason,{time:2000});
            					}
            				}
            			})
            		}
            	})
            }else if(event=="add"){
            	//清空弹出层表单
            	$file =$("#upload");
            	 $file.remove();
            	 $('#filespan').append("<input type='file' id='upload' title='点击更换图片' accept = '.jpg,.png,.gif'>");
            	$("#title1").val("");
            	$("#orderId1").val("");
            	 $(".iconSelect").attr("src","img/iconSelect.png");
            	 $("#remark1").val("");
            	 $("#title2").val("");
            	 $("#orderId2").val("");
            	 $("#modelPath2").val("");
            	 $("#remark2").val("");
            	 $("#title3").val("");
            	 $("#code3").val("");
            	 $("#orderId3").val("");
            	 $("#remark3").val("");
            	if(obj.data.id=="z_0"){//新增菜单
            		$("#parentName1").val(obj.data.title);
            		$("#add_menu").show();
            		$("#add_menu_select").hide();
            		$("#add_yemian").hide();
            		$("#add_button").hide();
            		parentName=obj.data.title;
            	}else if(obj.data.id.indexOf("z")!=-1){//新增页面或者菜单
            		$(".selectYZ").val("1");
            		$("#add_menu_select").show();
            		$("#add_yemian").show();
            		$("#add_button").hide();
            		$("#add_menu").hide();
            		parentName=obj.data.title;
            		$("#parentName2").val(obj.data.title);
            	}else if(obj.data.id.indexOf("y")!=-1){//新增按钮
            		$("#add_button").show();
            		$("#add_menu").hide();
            		$("#add_menu_select").hide();
            		$("#add_yemian").hide();
            		parentName=obj.data.title;
            		$("#parentName3").val(obj.data.title);
            	}
            	layer.open({
            		type:1,
            		title:"新增",
            		content:$("#menu_add_update"),
            		area:["450px","550px"],
            		btn:["确定","取消"],
            		yes:function(index){
            			var formData = new FormData();
            			if(obj.data.id=="z_0"){//新增菜单
            				var menuName=$("#title1").val();
                			var parentID=obj.data.id;
                			var orderID=$("#orderId1").val();
                			var remark1=$("#remark1").val();
                			formData.append("file", $("#upload")[0].files[0]);
            				var obj1={"optType":"z","menuName1":menuName,"parentID1":parentID,"orderID1":orderID,"remark1":remark1};
            			}else if(obj.data.id.indexOf("z")!=-1){
            			  if($(".selectYZ").val()==0){//新增菜单
            				var menuName=$("#title1").val();
                  			var parentID=obj.data.id;
                  			var orderID=$("#orderId1").val();
                  			var remark1=$("#remark1").val();
                  			formData.append("file", $("#upload")[0].files[0]);
            				 var obj1={"optType":"z","menuName1":menuName,"parentID1":parentID,"orderID1":orderID,"remark1":remark1};
            			   }else if($(".selectYZ").val()==1){//新增页面
            				  var title2=$("#title2").val();
            				  var menuCode2=obj.data.id;
            				  var orderID2=$("#orderId2").val();
            				  var modelPath2=$("#modelPath2").val();
            				  var remark2=$("#remark2").val();
            				  var ifScreenFull=$(".ifScreenFull").val();
            				  //formData.append("file", $("#upload")[0].files[0]);
            				  var obj1={"optType":"y","ifScreenFull":ifScreenFull,"modelName2":title2,"menuCode2":menuCode2,"orderID2":orderID2,"modelPath2":modelPath2,"remark2":remark2};
            			   }
            			}else if(obj.data.id.indexOf("y")!=-1){//新增按钮
            				var code3=$("#code3").val();
            				var name3=$("#title3").val();
            				var description3=$("#remark3").val();
            				var modelCode3=obj.data.id;
            				var orderID3=$("#orderId3").val();
            				 //formData.append("file", null);
            				var obj1={"optType":"o","code3":code3,"name3":name3,"description3":description3,"modelCode3":modelCode3,"orderID3":orderID3};
            			}
            			formData.append("str",JSON.stringify(obj1));
            			$.ajax({
            				url:url+"/limit_menu/addMenu",
            				type:"post",
            				cache: false,
            				data:formData,
            				processData: false,
            				contentType: false,
            				success:function(data){
            					if(data.flag){
            						layer.msg(data.reason,{time:1000},function(){
            							layer.close(index);
            							getList();
            						});
            					}else{
            						layer.msg(data.reason,{time:2000});
            					}
            				}
            			})
            		},
            	})
            }
        });
        //监听复选框
        treeTable.on('checkbox(dayindaju1)', function(obj){
        	var roleID=$(".approval_role li.current").data("id");
        	if(roleID==undefined){
        		layer.msg("请先选择角色！",{time:2000})
       		    return;
        	}
        	var index=layer.load(2);
        	list = [];
    		var res4 = getList12(obj.data.children,obj.data.id);
    		var perMissionList=[];
    		if(obj.data.id.indexOf("o_")!=-1){
    			perMissionList.push({"ID":obj.data.id.replace("o_","")});
    		}
    		for(var item of res4){
    			if(item.id.indexOf("o_")!=-1){
    				perMissionList.push({"ID":item.id.replace("o_","")});
    			}
    		}
    		if(obj.checked==true){//分配权限
    			 var optType=1;
    		}else{//取消权限
    			 var optType=2;
    		}
    		var obj2=JSON.stringify({"optType":optType,"roleID":roleID,"perMissionList":perMissionList});
        	$.ajax({
        		url:url+"/limit_menu/addUserLimit",
        		type:"POST",
        		data:obj2,
        		dataType:"json",
        		contentType:"application/json",
        		success:function(data){
        			layer.msg(data.reason,{time:2000});
        			layer.close(index);
        		},
        		error:function(){
        			layer.close(index);
        		}
        	})
        })
	});
}
function getList12(childList,pid){
	if(childList != undefined && childList.length>0){
		for(var i =0;i<childList.length;i++){
			list.push(childList[i]);
			if(childList[i].children == undefined){
				continue;
			}
			var thisPid = childList[i].id;
			var thisChildList = childList[i].children;
			var thisParent = childList[i].parent;
			getList12(thisChildList,thisPid);
		}
	}
	return list;
}
//将base64转file文件
function dataUrlToFile(dataurl,filename){
	/*dataUrlToFile(dataurl,filename)*/
		var arr=dataurl.split(',');
		var mime=arr[0].match(/:(.*?);/)[1];
		var bstr=atob(arr[1]);
		//var bstr=window.atob(arr[1]);
		var n=bstr.length;
		var u8arr=new Uint8Array(n);
		while(n--){
			u8arr[n]=bstr.charCodeAt(n);
		}
		//转换成file对象
		var obj= new File([u8arr],filename,{type:mime});
		//转换成blob对象
		//var obj=new Blob([u8arr],{type:mime});
		return obj;
}//end
//查询权限列表
function getList(){
	$.ajax({
		url:url+"/limit_menu/getList",
		type:"POST",
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			initTreeTable(data.result);
		}
	})
}//end

//查询角色列表
function queryRoleList(){
	$.ajax({
		url:url+"/ACL_Roles/queryRoleList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			$(".approval_role").empty();
			var res=data.result
			if(data.flag){
				for(var i=0;i<res.length;i++){
					var $li=$("<li data-id='"+res[i].id+"'>"+res[i].name+"</li>");
					$(".approval_role").append($li);
				}
			}
		}
	})
}//end
$(document).on("click",".approval_role li",function(){	
	$(this).addClass("current").siblings().removeClass("current");
	var roleid=$(this).attr("data-id");
	//最里层的复选框如果被选中，就点击一次
	for(var i=0;i<$(".ew-tree-icon-file").length;i++){
		if($("tr td .layui-form-checkbox").eq(i).hasClass("layui-form-checked")==true){
			$("tr td .layui-form-checkbox").eq(i).removeClass("layui-form-checked");
		}
	}
	queryPermTreeListByRoleId(roleid);
})
function queryPermTreeListByRoleId(roleid){
	var loadIndex = layer.load(1,{
		shade:[0.1,"#fff"]
	});
	var obj={"roleID":roleid};
	$.ajax({
		url:url+"/limit_menu/getHasLimitList",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			if(!data.flag){
				layer.close(loadIndex);
				layer.msg(data.reason,{time:2000});
				return;
			}
			var res=data.result;
			//根据后台数据渲染表格
			var hash = {}; 
			res = res.reduce((preVal, curVal) => {
				hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal); 
				return preVal 
			}, []);
			for(var item of res){
				$("tr[data-id="+item.id+"] td .layui-form-checkbox").addClass("layui-form-checked");
			}
			layer.close(loadIndex);
		}
	})
}//end
