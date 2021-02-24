var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	getList();
	getPage(total);
	initDate();
	getDeptTree();
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
//点击正常归还
$(document).on("click",".mo",function(){
	var oldLabelCode=$(this).attr("data-labelCode");
	layer.open({
		type:1,
		title:"正常归还",
		content:$("#normalBack"),
		area:["450px","200px"],
		btn:["确定","取消"],
		yes:function(index){
			var newLabelCode=$("#labelCodeBack").val();
			if(newLabelCode==""){
				layer.msg("RFID标签不能为空!",{time:2000});
				return;
			}
			if(oldLabelCode!=newLabelCode){
				layer.msg("RFID标签与借出的不同!",{time:2000});
				return;
			}
			var arr=[{"labelCode":newLabelCode}];
			$.ajax({
				url:url+"/zcBorrow/updatereturnInfo",
				type:"post",
				contentType:"application/json",
				data:JSON.stringify({"goodsList":arr}),
				success:function(data){
					if(data.flag){
						layer.msg("归还成功",{time:1000},function(){
							layer.close(index);
							getList();
							getPage(total);
						})
					}else{
						layer.msg(data.reason,{time:2000});
					}
				}
			})
		}
	})
})
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
//点击非正常归还
$(document).on("click",".shan",function(){
	var oldLabelCode=$(this).attr("data-labelCode");
	layer.open({
		type:1,
		title:"非正常归还",
		content:$("#normalBack"),
		area:["450px","200px"],
		btn:["确定","取消"],
		yes:function(index){
			var newLabelCode=$("#labelCodeBack").val();
			if(newLabelCode==""){
				layer.msg("RFID标签不能为空!",{time:2000});
				return;
			}
			$.ajax({
				url:url+"/zcBorrow/updatereturnInfo2",
				type:"post",
				data:{"newLabelCode":newLabelCode,"oldLabelCode":oldLabelCode},
				success:function(data){
					console.log(data);
					if(data.flag){
						layer.msg("归还成功",{time:1000},function(){
							layer.close(index);
							getList();
							getPage(total);
						})
					}else{
						layer.msg(data.reason,{time:2000});
					}
				}
			})
		}
	})
})

//读取RFID标签
$("#labelCode").keydown(function(event){
	if(event.keyCode==13){
		$("#supplierSearch")[0].click();
		$("#labelCode").val("");
	}
})

//点击搜索
$("#supplierSearch").click(function(){
	getList();
	getPage(total);
})
//初始化物品库存列表
function getList(){
	var bill=$("#borrowBill").val();
	var borrowUnit=$("#departmentno").val();
	var borrowPerName=$("#borrowHolder").val();
	var phone=$("#mobilePhone").val();
	var borrowDate=$("#borrowDate").val();
	var labelCode=$("#labelCode").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"bill":bill,"borrowUnit":borrowUnit,"borrowPerName":borrowPerName,"phone":phone,
			"operateDate":borrowDate,"labelCode":labelCode};
	$.ajax({
		url:url+"/zcBorrow/getBorrowedList",
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
					var bill=item.bill==undefined?"":item.bill;
					var goodsType=item.goodsType==undefined?"":item.goodsType;
					var goodsName=item.goodsName==undefined?"":item.goodsName;
					var labelCode=item.labelCode==undefined?"":item.labelCode;
					var borrowUnitName=item.borrowUnitName==undefined?"":item.borrowUnitName;
					var borrowPerName=item.borrowPer==undefined?"":item.borrowPer;
					var borrowDate=item.borrowDate==undefined?"":item.borrowDate;
					var phone=item.phone==undefined?"":item.phone;
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
					var storeName=item.storeName==undefined?"":item.storeName;
					var shelf=item.shelf==undefined?"":item.shelf;
					var remark=item.mremark==undefined?"":item.mremark;
					var borrowStatus=item.borrowStatus==1?"未归还":"已归还";
					var text1="";
					var text2="";
					if(item.borrowStatus==1){
						text1="<a href='javascript:;' data-labelCode="+labelCode+" class='mo layui-btn layui-btn-xs'>正常归还</a>";
						text2="<a href='javascript:;' data-labelCode="+labelCode+" class='shan layui-btn layui-btn-xs layui-btn-danger'>非正常归还</a>";
					}else{
						text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>正常归还</a>";
						text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>非正常归还</a>";
					}
					
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
					var $tr=$("<tr><td>"+index+"</td><td>"+bill+"</td><td>"+goodsType+"</td><td>"+goodsName+"</td><td>"+labelCode+"</td>" +
							"<td>"+borrowPerName+"</td><td>"+borrowDate+"</td><td>"+phone+"</td><td>"+model+"</td><td>"+brand+"</td>" +
							"<td>"+specs+"</td><td>"+size+"</td><td>"+html+"</td><td>"+img+"</td><td>"+storeName+"</td><td>"+shelf+"</td>" +
							"<td>"+remark+"</td><td>"+borrowStatus+"</td><td>"+text1+text2+"</td></tr>");
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
//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		dataType:'json',//数据类型
		data:{"res":"false"},
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			            queryHolderDataListByDepartmentNo(node.data.id);
			        }
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			});
		},
		error:function(data){}
	})
}
function queryHolderDataListByDepartmentNo(deptno){
	var obj={"deptno":deptno};
	$.ajax({
		url:url+'/DepartmentData/getHolderByDept',
		type:"post",
		data:obj,
		//contentType:"application/json", // 指定这个协议很重要
	    dataType:'json',
		success:function(data){
			 $("#borrowHolder").find("option:not(:first)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value='"+item.holderno+"'></option>")
					$opt.append(item.holdername);
					$("#borrowHolder").append($opt);
				}
			}
		}
	})
}