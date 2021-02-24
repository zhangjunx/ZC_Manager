$(function(){
	getDate();
	getDeptTree();
	getApproverList();
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
function getDate(){
	var date=new Date();
	var year = date.getFullYear();
	var month = (date.getMonth()+1)<=9?("0"+(date.getMonth()+1)):(date.getMonth()+1);
	var day =(date.getDate())<=9?("0"+(date.getDate())):(date.getDate());
	var hour=(date.getHours())<=9?("0"+(date.getHours())):(date.getHours());//date.getHours();
	var minute=(date.getMinutes())<=9?("0"+(date.getMinutes())):(date.getMinutes());//date.getMinutes();
	var second=(date.getSeconds())<=9?("0"+(date.getSeconds())):(date.getSeconds());//date.getSeconds();
	var html=year+"-"+month+"-"+day;
	var html2=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	$("#borrowDate").val(html)//给出入库日期 赋值
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
//读取RFID标签
/*$("#labelCode").keydown(function(event){
	if(event.keyCode==13){
		$("#supplierSearch")[0].click();
		$("#labelCode").val("");
	}
})*/
//点击保存
$("#saveBorrow").click(function(){
	addScrapList();
})
function addScrapList(){
	if($(".labelCode").length==0){
		layer.msg("请添加物品!",{time:2000});
		return;
	}
	if($("#departmentno").val()==""){
		layer.msg("请选择借用单位!",{time:2000});
		return;
	}
	if($("#borrowHolder").val()==""){
		layer.msg("请选择借用人!",{time:2000});
		return;
	}
	if($("#mobilePhone").val()==""){
		layer.msg("请填写联系电话!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$(".labelCode").length;i++){
		var obj={"labelCode":$(".labelCode").eq(i).html().toUpperCase()};
		arr.push(obj);
	}
	$.ajax({
		url:url+"/zcBorrow/updateBorrowInfo",
		type:"post",
		contentType:"application/json",
		data:JSON.stringify({
			"goodsList":arr,
			"operator":window.top.holderno,
			//"borrowUnit":$("#departmentno").val(),
			"borrowPer":$("#borrowHolder").val(),
			"phone":$("#mobilePhone").val(),
			"operateDate":$("#borrowDate").val(),
			"approver":$("#holdername").val(),
			"mremark":$("#description").val()
			}),
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					window.location.href="goodsBorrow.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//点击删除
$(document).on("click",".shan",function(){
	$(this).parent().parent().remove();
})
//点击生成
$("#supplierSearch").click(function(){
	var labelCode=$("#labelCode").val();//rfid标签
	if(labelCode==""){
		layer.msg("RFID标签不能为空!",{time:2000});
		return;
	}
	for(var i=0;i<$(".labelCode").length;i++){
		if(labelCode==$(".labelCode").eq(i).html()){
			layer.msg("RFID标签重复!",{time:2000});
			return;
		}
	}
	$.ajax({
		url:url+"/zcOutStore/getOneInfoWIthRFID",
		type:"post",
		data:{"labelCode":labelCode},
		success:function(data){
			console.log(data);
			if(data.flag){
				var val=data.result;
				createTable(val);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})
function createTable(val){
	var len=$("#cont tr").length+1;
	var goodsType=val.goodsType==undefined?"":val.goodsType;
	var goodsName=val.goodsName==undefined?"":val.goodsName;
	var labelCode=val.labelCode==undefined?"":val.labelCode;
	var model=val.model==undefined?"":val.model;
	var brand=val.brand==undefined?"":val.brand;
	var specs=val.specs==undefined?"":val.specs;
	var size=val.size==undefined?"":val.size;
	var storeName=val.storeName==undefined?"":val.storeName;
	var shelf=val.shelf==undefined?"":val.shelf;
	var remark=val.remark==undefined?"":val.remark;
	var $tr=$("<tr><td>"+len+"</td><td>"+goodsType+"</td><td>"+goodsName+"</td><td class='labelCode'>"+labelCode+"</td>" +
			"<td>"+model+"</td><td>"+brand+"</td><td>"+specs+"</td><td>"+size+"</td><td>"+storeName+"</td>" +
			"<td>"+shelf+"</td><td>"+remark+"</td><td><a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>")
	$("#cont").append($tr);
	$("#labelCode").val();
}
//初始化物品库存列表
function getList(){
	var obj={"curpage":curpage,"pagesize":pagesize};
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
					var waringDate=item.waringDate==undefined?"":item.waringDate;
					waringDate=timestampToTime(waringDate);
					var supplierName=item.supplierName==undefined?"":item.supplierName;
					var manfacturerName=item.manfacturerName==undefined?"":item.manfacturerName;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr><td>"+index+"</td><td>"+typeName+"</td><td>"+goodsName+"</td><td>"+labelCode+"</td><td>"+setWaringPerName+"</td>" +
							"<td>"+waringDate+"</td><td>"+model+"</td><td>"+brand+"</td>" +
							"<td>"+specs+"</td><td>"+size+"</td><td>"+manfacturerName+"</td><td>"+supplierName+"</td>" +
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
			        elem: "#classtree2",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#deptID").val(node.data.id);
			        	$("#deptName").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			            queryHolderDataListByDepartmentNo(node.data.id);
			        }
			    });
			    $(".downpanel2").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel2").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			});
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
			            queryHolderDataList(node.data.id);
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
function getApproverList(){
	$.ajax({
		url:url+'/zcApproval/getApproverList',
		type:"post",
		success:function(data){
			 $("#holdername").find("option:not(:first)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderNo==undefined)?"":item.holderNo;
					var holdername=(item.holderName==undefined)?"":item.holderName;
					if(item.ifApproverZC=="1"){
						var $opt=$("<option value='"+holderno+"'>"+holdername+"</option>");
						$("#holdername").append($opt);
					}
				}
			}
		}
	})
}
function queryHolderDataList(deptno){
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
