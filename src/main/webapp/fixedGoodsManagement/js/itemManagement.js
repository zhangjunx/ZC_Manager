$(function(){
	getGoodsList("");
	getPage(total);
	getList();
});
var pid="";
var fid="";
var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
//分页查询
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:pagesize,//每页显示条数
			count:total,//数据总条数，从服务端得到
			curr:curpage,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;//改变当前页
				pagesize=obj.limit;//每页显示数
				//首次不执行
				if(!first){
					getGoodsList(fid);
				}
			}
		})
	})
}//end
//点击选择图片
$(document).on("change",".companyLogo",function(){
	var imgUrl = getObjectURL(this.files[0]);
	$("#img").attr("src", imgUrl);
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

//点击物品类别新增
$(".addCategory").click(function(){
	$("#typeName").val("");
	fid="";
	layer.open({
		type:1,
		title:"新增物品",
		content:$("#thingsCategroy"),
		area:["400px","200px"],
		btn:["确定","取消"],
		yes:function(index){
			addInfo(index);
		}
	})
})
//点击物品类别修改
$(".updateCategory").click(function(){
	$("#typeName").val("");
	if(fid==""){
		layer.msg("请选择物品!",{time:2000});
		return;
	}
	selectOne(fid);
	layer.open({
		type:1,
		title:"修改物品",
		content:$("#thingsCategroy"),
		area:["400px","200px"],
		btn:["确定","取消"],
		yes:function(index){
			addInfo(index);
		}
	})
})

//提交物品类别信息
function addInfo(index){
	var typeName=$("#typeName").val();
	if(typeName==""){
		layer.msg("请填写物品名称!",{time:2000});
		return;
	}
	var obj;
	if(pid==""){
		obj={"fid":fid,"pId":0,"typeName":typeName,"remark":"","operator":window.top.holderno};
	}else{
		obj={"fid":fid,"pId":pid,"typeName":typeName,"remark":"","operator":window.top.holderno};
	}
	console.log(obj);
	$.ajax({
		url:url+"/zcGoodsType/addInfo",
		type:"post",
		data:obj,
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					layer.close(index);
					getList();
					pid="";
					fid="";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//修改物品类别时获取一条信息
function selectOne(fid){
	$.ajax({
		url:url+"/zcGoodsType/getOneInfo",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			console.log(data);
			if(data.flag){
				var typeName=data.result.title;
				$("#typeName").val(typeName);
				pid=data.result.parent;
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//物品类别删除
$(".delCategory").click(function(){
	if(fid==""){
		layer.msg("请选择物品!",{time:2000});
		return;
	}
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/zcGoodsType/delOneInfo",
			type:"post",
			data:{"type":fid},
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(data.flag){
					getList();
				}
			}
		})
	})
})


//点击物品资料新增
$("#insertItemData").click(function(){
	var $file =$("#logoIpt");
	 $file.remove();
	 $('.chooseBox').append("<input type='file' id='logoIpt' class='companyLogo' title='点击更换图片' accept = '.jpg,.png,.gif'>");
	$("#img").attr("src","img/add_img.png");
	$("#goodsCode").val("");
	$("#goodsName").val("");
    $("#model").val("");
	$("#specs").val("");
	$("#size").val("");
	$("#brand").val("");
	$("#upperLimit").val("");
	$("#lowerLimit").val("");
	$("#fid").val("");
	layer.open({
		type:1,
		title:"新增物品资料",
		content:$("#thingsModel"),
		area:["450px","600px"],
		btn:["确定","取消"],
		yes:function(index){
			addGoodsInfo(index)
		}
	})
})
//点击物品资料修改
$(document).on("click",".mo",function(){
	var fid=$(this).attr("data-fid");
	var $file =$("#logoIpt");
	 $file.remove();
	 $('.chooseBox').append("<input type='file' id='logoIpt' class='companyLogo' title='点击更换图片' accept = '.jpg,.png,.gif'>");
	$("#img").attr("src","img/add_img.png");
	$("#goodsCode").val("");
	$("#goodsName").val("");
	$("#DeviceNo").val("");
    $("#model").val("");
	$("#specs").val("");
	$("#size").val("");
	$("#brand").val("");
	$("#upperLimit").val("");
	$("#lowerLimit").val("");
	$("#fid").val("");
	getOneGoods(fid);
	layer.open({
		type:1,
		title:"修改物品资料",
		content:$("#thingsModel"),
		area:["450px","600px"],
		btn:["确定","取消"],
		yes:function(index){
			addGoodsInfo(index)
		}
	})
})
//点击删除
$(document).on("click",".shan",function(){
	var fid=$(this).attr("data-fid");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		$.ajax({
			url:url+"/zcGoods/delOne",
			type:"post",
			data:{"fid":fid},
			success:function(data){
				layer.close(index);
				if(data.flag){
					layer.msg(data.reason,{time:1000},function(){
						getGoodsList();
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})

//修改物品资料时获取一条数据
function getOneGoods(fid){
	$.ajax({
		url:url+"/zcGoods/getOne",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			console.log(data);
			if(data.flag){
				$("#goodsCode").val(data.result.goodsCode);
				$("#goodsName").val(data.result.goodsName);
				$("#DeviceNo").val(data.result.type);
				$("#DeviceNoName").html(data.result.typeName);
			    $("#model").val(data.result.model);
				$("#specs").val(data.result.specs);
				$("#size").val(data.result.size);
				$("#brand").val(data.result.brand);
				$("#upperLimit").val(data.result.upperLimit);
				$("#lowerLimit").val(data.result.lowerLimit);
				if(data.result.imagePath!=""&&data.result.imagePath!=undefined){
					if(data.result.imagePath.indexOf("ZC_Manager")!=-1){
						$("#img").attr("src",data.result.imagePath);
					}
				}
				$("#fid").val(fid);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//提交物品资料数据
function addGoodsInfo(index){
	var goodsCode=$("#goodsCode").val();
	var goodsName=$("#goodsName").val();
	var type=$("#DeviceNo").val();
	var model=$("#model").val();
	var specs=$("#specs").val();
	var size=$("#size").val();
	var brand=$("#brand").val();
	var upperLimit=$("#upperLimit").val();
	var lowerLimit=$("#lowerLimit").val();
	var fid1=$("#fid").val();
	if(goodsCode==""){
		layer.msg("物品编码不能为空!",{time:2000});
		return;
	}
	if(goodsName==""){
		layer.msg("物品名称不能为空!",{time:2000});
		return;
	}
	if(type==""){
		layer.msg("请选择物品类别",{time:2000});
		return;
	}
	if(model==""){
		layer.msg("型号不能为空!",{time:2000});
		return;
	}
	if(brand==""){
		layer.msg("品牌不能为空!",{time:2000});
		return;
	}
	if(specs==""){
		layer.msg("规格不能为空!",{time:2000});
		return;
	}
	if(size==""){
		layer.msg("尺寸不能为空!",{time:2000});
		return;
	}
	/*if(upperLimit==""){
		layer.msg("预警上限不能为空!",{time:2000});
		return;
	}*/
	if(lowerLimit==""){
		layer.msg("预警下限不能为空!",{time:2000});
		return;
	}
	var obj={"goodsCode":goodsCode,"goodsName":goodsName,"type":type,"model":model,"specs":specs,"size":size,
			"brand":brand,"upperLimit":upperLimit,"lowerLimit":lowerLimit,"fid":fid1,"operator":window.top.holderno,"imagePath":""};
	 var formData = new FormData();
	//新增
	if(fid1==""){
		 formData.append("file", $("#logoIpt")[0].files[0]);
	}else{//编辑
		var src=$("#img").attr("src");
		if(src.indexOf("ZC_Manager")!=-1){
			obj.imagePath=src;
			formData.append("file", $("#logoIpt")[0].files[0]);
		}else{
		   formData.append("file", $("#logoIpt")[0].files[0]);
		}
	}
	 formData.append("str",JSON.stringify(obj));
	$.ajax({
		url:url+"/zcGoods/addInfo",
		type:"post",
		cache: false,
		data:formData,
		processData: false,
		contentType: false,
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					layer.close(index);
					getGoodsList(fid);
					getPage(total);
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
//获取物品资料列表
function getGoodsList(fid){
	var obj={"type":fid,"curpage":curpage,"pagesize":pagesize};
	$.ajax({
		url:url+"/zcGoods/getList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				$(".delCategory").addClass("layui-bg-gray").addClass("layui-disabled");
				var index=1;
				for(var item of data.result){
					var goodsCode=item.goodsCode==undefined?"":item.goodsCode;
					var goodsName=item.goodsName==undefined?"":item.goodsName;
					var model=item.model==undefined?"":item.model;
					var brand=item.brand==undefined?"":item.brand;
					var specs=item.specs==undefined?"":item.specs;
					var size=item.size==undefined?"":item.size;
					var upperLimit=item.upperLimit==undefined?"":item.upperLimit;
					var lowerLimit=item.lowerLimit==undefined?"":item.lowerLimit;
					var remark=item.remark==undefined?"":item.remark;
					var img="";
					if(item.imagePath!=""&&item.imagePath!=undefined){
						if(item.imagePath.indexOf("ZC_Manager")!=-1){
							img="<img src="+item.imagePath+" style='width:60px'>";
						}
					}
					var $tr=$("<tr><td>"+index+"</td><td>"+goodsCode+"</td><td>"+goodsName+"</td><td>"+model+"</td><td>"+brand+"</td>" +
							"<td>"+specs+"</td><td>"+size+"</td><td>"+lowerLimit+"</td><td>"+img+"</td><td>" +remark+ "</td>"+
							"<td><a href='javascript:;' data-fid="+item.fid+" class='mo layui-btn layui-btn-xs'>修改</a>" +
						    "<a href='javascript:;' data-fid="+item.fid+" class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>")
						    index++;
				$("#cont").append($tr);
				}
			}else{
				layer.msg(data.reason,{time:2000});
				$(".delCategory").removeClass("layui-bg-gray").removeClass("layui-disabled");
			}
		}
	})
}
//物品类别下拉树初始化
function getList(){
	$.ajax({
		url:url+'/zcGoodsType/getList',
		type:'POST',//类型
		data:{"res":"false"},
		dataType:'json',//数据类型
		success:function(data){
			console.log(data);
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
				      var id=obj.data.id;
				      pid=id;
				      fid=id;
				      $("#DeviceNo").val(fid);
				      $("#DeviceNoName").html(obj.data.title);
				      getGoodsList(fid);
				      getPage(total);
				    },
				  });
			})
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#DeviceNo").val(node.data.id);
			        	$("#DeviceNoName").html(node.data.title);
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

