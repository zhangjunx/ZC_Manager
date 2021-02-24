var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	getList();
	getPage(total);
	initDate();
	getGoodsTypeList();
})
//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:pagesize,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;
				pagesize=obj.limit;
				if(!first){
					getList();
				}
			}
		})
	})
}//end
//点击设备技术规范
$(document).on("click",".fileImg",function(){
	var path=$(this).attr("data-path");
	layer.confirm("设备技术规范",{
		title:"提示",
		btn:["下载","预览"],	
		yes:function(index,layero){
			layer.close(index);
			var form = $('<form method="GET" action="' + url+"/zcFileManager/downLoadFile?path="+path+'"><input type = "hidden" name = "path" value="'+path+'"> </form>');
	        form.append($('<input type="hidden">'));
	        $('body').append(form);
	        form.submit();
		},
		btn2:function(index,layero){
			layer.close(index);
			var i=layer.load(2);
			$.ajax({
				url:url+"/zcFileManager/viewFileOnLine",
				type:"post",
				data:{"path":path},
				success:function(data){
					layer.close(i);
					if(data.flag){
					  layer.open({
					        type : 2,
					        title : '<span class="layer-title-move-text">文件预览</span>',
					        shadeClose : true,
					        move : '.layer-title-move-text',
					        shade : false,
					        resize : true,
					        maxmin : true, // 开启最大化最小化按钮
					        area : ['90%', '92%'],
					        content : data.result
					    });
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(){
					layer.close(i);
				}
			})
		}
	})
	
})

//初始化日期
function initDate(){
	layui.use("laydate", function() {
	    var laydate = layui.laydate
	    lay('.test-item').each(function() {
			laydate.render({
				elem: this,
				trigger:"click"
			});
		});
	})
}
//点击搜索
$("#supplierSearch").click(function(){
	getList();
	getPage(total);
})
//初始化物品库存列表
function getList(){
	var type=$("#departmentno").val();
	var goodsName=$("#goodsName").val();
	var model=$("#model").val();
	var scrapDate=$("#scrapDate").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"type":type,"goodsName":goodsName,"model":model,"operateDate":scrapDate};
	$.ajax({
		url:url+"/zcGoodsWaring/getRetireList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var typeName=item.typeName==undefined?"":item.typeName;
					var goodsName=item.goodsName==undefined?"":item.goodsName;
					var labelCode=item.labelCode==undefined?"":item.labelCode;
					var setWaringPerName=item.setWaringPerName==undefined?"":item.setWaringPerName;
					var model=item.model==undefined?"":item.model;
					var brand=item.brand==undefined?"":item.brand;
					var specs=item.specs==undefined?"":item.specs;
					var size=item.size==undefined?"":item.size;
					var img="";
					if(item.imagePath!=""&&item.imagePath!=undefined){
						if(item.imagePath.indexOf("ZC_Manager")!=-1){
							img="<img src="+item.imagePath+" style='width:60px'>";
						}
					}
					var waringDate=item.waringDate==undefined?"":item.waringDate;
					waringDate=timestampToTime(waringDate);
					var supplierName=item.supplierName==undefined?"":item.supplierName;
					var manfacturerName=item.manfacturerName==undefined?"":item.manfacturerName;
					var remark=item.remark==undefined?"":item.remark;
					var warningLocal=item.waringLocal==undefined?"":item.waringLocal;
					
					var html="";
					if(item.filePath == undefined || item.filePath == ""){
			    		  html="";
			    	  }else if(item.filePath.indexOf(";") == -1){
			    		  html="<img src='img/file.png' class='fileImg' data-path='"+item.filePath+"' style='width:30px;cursor:pointer'>"
			    	  }else{
			    		  var patharr=item.filePath.split(";");
			    		  for(var item of patharr){
			    			  html+="<img src='img/file.png' class='fileImg' data-path='"+item+"' style='width:30px;cursor:pointer'>";
			    		  }
			    	  }
					
					var $tr=$("<tr><td>"+index+"</td><td>"+typeName+"</td><td>"+goodsName+"</td><td>"+labelCode+"</td><td>"+setWaringPerName+"</td>" +
							"<td>"+warningLocal+"</td><td>"+waringDate+"</td><td>"+model+"</td><td>"+brand+"</td>" +
							"<td>"+specs+"</td><td>"+size+"</td><td>"+html+"</td><td>"+img+"</td><td>"+manfacturerName+"</td><td>"+supplierName+"</td>" +
							"<td>"+remark+"</td></tr>");
					index++;
					$("#cont").append($tr);
				}
			}
		}
	})
}
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D;
}
//物品类别下拉树初始化
function getGoodsTypeList(){
	$.ajax({
		url:url+'/zcGoodsType/getList',
		type:'POST',//类型
		data:{"res":"true"},
		dataType:'json',//数据类型
		success:function(data){
			if(!data.flag){
				layer.msg(data.reason,{"time":2000});
				return;
			}
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			        	getGoodsList(node.data.id);
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
//获取物品资料列表
function getGoodsList(fid){
	var obj={"type":fid};
	$.ajax({
		url:url+"/zcGoods/getList",
		type:"post",
		data:obj,
		success:function(data){
			$("#goodsName option").not("option:first").remove();
			$("#model option").not("option:first").remove();
			if(data.flag){
				for(var item of data.result){
					var goodsCode=item.goodsCode==undefined?"":item.goodsCode;
					var goodsName=item.goodsName==undefined?"":item.goodsName;
					var model=item.model==undefined?"":item.model;
					var brand=item.brand==undefined?"":item.brand;
					var specs=item.specs==undefined?"":item.specs;
					var size=item.size==undefined?"":item.size;
					var upperLimit=item.upperLimit==undefined?"":item.upperLimit;
					var lowerLimit=item.lowerLimit==undefined?"":item.lowerLimit;
					var $opt=$("<option data-goodsid="+item.fid+" value="+item.goodsCode+">"+goodsName+"</option>");
					var $opt1=$("<option data-brand="+brand+" data-specs="+specs+" data-size="+size+" value="+item.fid+">"+model+"</option>")
					$("#goodsName").append($opt);
					$("#model").append($opt1);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}