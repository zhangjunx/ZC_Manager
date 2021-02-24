	$(function(){
	getDate();//给出库时间赋值
	initTable(res);
	getDeptTree();
	getApproverList();
});
var res=[];
//获取当前日期时间
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
	$("#outStorageDate").val(html)//给出入库日期 赋值
}//end

//物品类别下拉树初始化
function getList(){
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
		$("#createOutStorage")[0].click();
		$("#labelCode").val("");
	}
})*/
//点击保存提交数据
$("#save").click(function(){
	saveInStorage();
})
//提交数据
function saveInStorage(){
	if($("#departmentname").html()==""){
		layer.msg("请选择领用单位!",{time:2000});
		return;
	}
	if($("#receiver").val()==""){
		layer.msg("请选择领用人!",{time:2000});
		return;
	}
	if($("#mobilePhone").val()==""){
		layer.msg("请选择联系电话!",{time:2000});
		return;
	}
	
	if($("#holdername").val()==""){
		layer.msg("请选择审批人!",{time:2000});
		return;
	}
	
	var arr=[];
	for(var item of res){
		arr.push({
			"labelCode":item.RFID.toUpperCase(),
		})
	}
	var index=layer.load(2);
	$.ajax({
		url:url+"/zcOutStore/addOutStoreGoods",
		contentType:"application/json",
		type:"post",
		data:JSON.stringify({
			//"receiveUnit":$("#departmentno").val(),
			"receiver":$("#receiver").val(),
			"receiverPhone":$("#mobilePhone").val(),
			"outDate":$("#outStorageDate").val(),
			"operator":window.top.holderno,
			"approver":$("#holdername").val(),
			"remark":$("#description").val(),
			"goodsList":arr
			}),
		success:function(data){
			layer.close(index);
			console.log(data);
			if(data.flag){
				var res=data.printList;
				layer.msg(data.reason,{time:1000},function(){
					layer.confirm("是否打印出库单据?",function(index){
						layer.close(index);
						createPrintTable(res);
					})
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
function createPrintTable(res){
	$("#printDanJu tr:gt(0)").empty();
	for(var item of res){
		var $tr=$("<tr><td>"+item.bill+"</td><td>"+item.typeName+"</td><td>"+item.goodsName+"</td><td>"+item.model+"</td>" +
				"<td>"+item.brand+"</td><td>"+item.specs+"</td><td>"+item.size+"</td><td>"+item.sumval+"</td><td>"+item.outDate+"</td>" +
			    "<td>"+item.receiver+"</td></tr>");
		$("#printDanJu").append($tr);
	}
	printTable('printDanJu');
}

//点击生成
$("#createOutStorage").click(function(){
	var labelCode=$("#labelCode").val();//rfid标签
	var receiveUnitNo=$("#departmentno").val();//领用单位代码
	var receiveUnit=$("#departmentname").html();//领用单位
	var receiverNo=$("#receiver").val();//领用人工号
	var receiver=$("#receiver option:selected").html();//领用人姓名
	var receiverPhone=$("#mobilePhone").val();//联系电话
	var outDate=$("#outStorageDate").val();//出库日期
	
	if(labelCode==""){
		layer.msg("RFID标签不能为空!",{time:2000});
		return;
	}
	for(var item of res){
		if(item.RFID==labelCode){
			layer.msg("物品RFID标签不能重复!",{time:2000});
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
				res.push({
					"typeName":val.goodsType,
					"goodsName":val.goodsName,
					"RFID":labelCode,
					"receiveUnit":receiveUnit,//领用单位
					"receiveUnitNo":receiveUnitNo,//领用单位代码
					"receiver":receiver,//领用人
					"receiverNo":receiverNo,//领用人工号
					"receiverPhone":receiverPhone,
					"outDate":outDate,
					"model":val.model,
					"brand":val.brand,
					"specs":val.specs,
					"size":val.size,
					"storeName":val.storeName,
					"shelf":val.shelf,
					"remark":val.remark,
				});
				initTable(res);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
	
})
//初始化表格
function initTable(res){
	layui.use('table', function(){
		  var table = layui.table;
		  table.render({
		    elem: '#test',
		    cols: [[//标题栏
		      {field:'typeName', width:200 ,title: '物品类别', },
		      {field:'goodsName', width:200 , title: '物品名称'},
		      {field:'RFID', width:200 ,title: '物品RFID标签'},
		      {field:'outDate', width:100 , title: '出库日期'},
		      {field:'model',width:80,  title: '型号'},
		      {field:'brand', width:80, title: '品牌'},
		      {field:'specs', width:80, title: '规格'},
		      {field:'size', width:80, title: '尺寸'},
		      {field:'storeName', width:100 ,title: '所在仓库'},
		      {field:'shelf', width:120,title: '存放货架'},
		      {field:'remark', width:200,title: '备注'},
		      {fixed: 'right', title:'操作', toolbar: '#barDemo'}
		    ]],
		    data:res,
		    limit:res.length,
		    done:function(){
		    	$("#labelCode").val("");
		    }
		  });
		//监听工具条
		  table.on('tool(demo)', function(obj){
		    var data = obj.data;
		    if(obj.event === 'del'){
		      layer.confirm('确定删除?', function(index){
		        obj.del();
		        //从数组中删除此条数据
		        for(var i=0;i<res.length;i++){
		    		if(res[i].RFID==data.RFID){
		    			res.splice(i,1);
		    		}
		    	}
		        layer.close(index);
		      });
		    }
		});
    });
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
			 $("#receiver").find("option:not(:first)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value='"+item.holderno+"'></option>")
					$opt.append(item.holdername);
					$("#receiver").append($opt);
				}
			}
		}
	})
}
