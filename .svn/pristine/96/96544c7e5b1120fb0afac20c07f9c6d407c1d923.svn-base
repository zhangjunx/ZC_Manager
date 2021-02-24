$(function(){
	//查询部门下拉框
	getDeptTree();
	//统计查询
	getList();
	getPage();
	queryWareCodeList();//查询仓库
	getItemProjectList();
	showHide();//跟权限有关
});

	layui.use(['laydate'], function () {
		var laydate = layui.laydate;
		//日期
		lay('.date').each(function () {
			laydate.render({
				elem: this,
				trigger: 'click'
			});
		});		
	});
	
//领用项目列表下拉	
function getItemProjectList(){
	$.ajax({
		  url:url+"/ZX_ItemProject/getItemProjectList",
		  type:"POST",
		  dataType:"json",
		  contentType:"application/json",
		  success:function(data){
			  console.log(data)
			 $("#projectid option:not(:first)").remove();
			  if(!data.flag){
				  return;
			  }
			  var html="";
			  $.each(data.result,function(i,val){
				  var id=(val.id==undefined?"":val.id);
				  var projectname=(val.projectname==undefined?"":val.projectname);
				  html+="<option value='"+id+"'>"+projectname+"</option>"
			  }) 
			  $("#projectid").append(html);
		  }
	}) 		
}

	

var page;//当前页
var limit;//每页显示条数
var total;//总条数
//分页
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,
			limit:limit,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					getList();
				}
			}
		})
	})
}//end

  //点击搜索
$("#queryBtn").click(function(){
	 getList();
	 getPage();
 });
function getList(){//搜索
	var sdbill=$("#sdbill1").val();
	var startdate=$("#startdate").val();
	var enddate=$("#enddate").val();
	var sdperson=$("#sdperson").val();
	var sdpersondept=$("#departmentno").val();
	var warecode=$("#warecode").val();
	var itemcode=$("#itemcode").val();
	var itemname=$("#itemname").val();
	var unitname=$("#unitname").val();
	var res={"sdbill":sdbill,"startdate":startdate,"enddate":enddate,"sdperson":sdperson,"sdpersondept":sdpersondept,
			"sdstatus":"12","warecode":warecode,"itemname":itemname,"unitname":unitname,
			"itemcode":itemcode,"pageIndex":page,"pageSize":limit};
	//console.log(res);
	var str=window.top.holderno;
	$.ajax({
		  url:url+"/Product_SDData/queryProductSDDataListByPage?str="+str,
		  type:"POST",
		  data:res,
		  dataType:"json",
		  async:false,//很重要
		  success:function(data){
			  //console.log(data)
			  $("#cont1").empty();
			  if(!data.flag){
				  layer.msg(data.reason,{time:2000});
				  total=0;
				  $("#quantity").html("0");
				  $("#univalence").html("0");
				  $("#totalMoney").html("0");
				  return;
			  }
			  page=data.pageinfo.pageIndex;
			  limit=data.pageinfo.pageSize;
			  total=data.pageinfo.sumCount;
			  var list=[];
			  for(var item of window.top.arr){
				  if(item.ModelCode=="15005"){
					  list.push(item);
				  }
			  }
			  var html="";
				var shuLiang=0;
				var univalence=0;
				var totalMoney=0;
				$.each(data.result,function(i,val){
					 var datano=(val.datano==undefined?"":val.datano);
				     var sdbill=(val.sdbill==undefined?"":val.sdbill);
				     var itemcode=(val.itemcode==undefined?"":val.itemcode);
				     var itemname=(val.itemname==undefined?"":val.itemname);
				     var price=(val.price==undefined?"":val.price);
				     var quantity=(val.quantity==undefined?"":val.quantity);
				     var sumamount=(val.sumamount==undefined?"":val.sumamount);
				     var operator=(val.operator==undefined?"":val.operator);
				     var sdperson=(val.sdpersonname==undefined?"":val.sdpersonname);
				     var sdpersondept=(val.sdpersondeptname==undefined?"":val.sdpersondeptname);
				     var warename=(val.warename==undefined?"":val.warename);
				     var areaname=(val.areaname==undefined?"":val.areaname);
				     //var suppliername=(val.suppliername==undefined?"":val.suppliername);
				     var spec=(val.spec==undefined?"":val.spec);
				     var type=(val.type==undefined?"":val.type);
				     var unitname=(val.unitname==undefined?"":val.unitname);
				     var itemtype=(val.itemtype==undefined?"":val.itemtype);
				     var sddate=(val.sddate==undefined?"":val.sddate);
				     var deleted=(val.deleted==undefined?"":val.deleted);
				     var delreason=(val.delreason==undefined?"":val.delreason);
				     var remark=(val.remark==undefined?"":val.remark);
				     var txt="";
					 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
						txt="";
					 }else {
						txt="<a href='javascript:;' class='layui-btn layui-btn-xs update'>红冲</a>";
				     }
				     if(deleted=="0"){
				    	 txt="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-danger'>已红冲</a>";
				     }
				     if(txt==""){
				    	 txt="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>红冲</a>"
				     }
				     shuLiang+=parseFloat(quantity);
				     univalence+=parseFloat(price);
				     totalMoney+=parseFloat(sumamount);
				     html+="<tr><td>"+datano
				       +"</td><td>"+sdbill
				       +"</td><td>"+itemcode
				       +"</td><td>"+itemname
				       +"</td><td>"+spec
						+"</td><td>"+type
						+"</td><td>"+quantity
						+"</td><td>"+price
						+"</td><td>"+sumamount
						+"</td><td>"+operator
						+"</td><td>"+sdperson
						+"</td><td>"+sdpersondept
						+"</td><td>"+warename
						+"</td><td>"+unitname
						+"</td><td>"+itemtype
						+"</td><td>"+sddate
						+"</td><td>"+remark
						+"</td><td class='center no-print'>"+txt+"</td></tr>";
				})
				 $("#cont1").append(html);
				$("#quantity").html(shuLiang.toFixed(4));
				$("#univalence").html(univalence.toFixed(4));
				$("#totalMoney").html(totalMoney.toFixed(4));
			  } 
	})
}//end
 
/*//根据出入库人员部门查询人员
$(document).on("change","#sdpersondept",function(){
	queryHolderListByDeptno();
})*/
function queryHolderListByDeptno(){//查询出入库人员列表
	var sdpersondept=$("#departmentno").val();
	var obj={"departmentno":sdpersondept};
 $.ajax({
  url:url+"/Product_SDData/queryHolderListByDeptno",
  type:"POST",
  dataType:"json",
  data:obj,
  success:function(data){
   $("#sdperson").find("option:not(:first)").remove();
   if(data.flag){
    var html="";
    $.each(data.result,function(i,val){
     var holderno=(val.holderno==undefined?"":val.holderno);
     var holdername=(val.holdername==undefined?"":val.holdername);
     html+="<option value='"+holderno+"'>"+holdername+"</option>";
    })
    $("#sdperson").append(html);
   }else{
    return;
   }
  }
 })
}//end

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
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			            queryHolderListByDeptno();
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


 
//查询仓库列表
function queryWareCodeList(){
	$.ajax({
	  url:url+"/WareHouseData/queryWareHouseList",
	  type:"POST",
	  data:{"str":window.top.holderno},
	  dataType:"json",
	  //contentType:"application/json",
	  success:function(data){
		  console.log(data)
	      $("#warecode").find("option:not(:first)").remove();//条件仓库下拉框
	      if(!data.flag){
	          return;
	       }
	        var html="";
		    $.each(data.result,function(i,val){
		     var warecode=(val.warecode==undefined?"":val.warecode);
		     var warename=(val.warename==undefined?"":val.warename);
		     html+="<option value='"+warecode+"'>"+warename+"</option>";
		    })
		    $("#warecode").append(html);
	  }
  })
}//end



 
//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#printProduct_SDDataList").hide();
	$("#export").hide();
	var list=[];
	arrList.forEach(item=>{
		 if(item.ModelCode=="15005"){
			  list.push(item);
		  }
		
	})
	for(var item of list){
		if(item.Code=="print"){
			$("#printProduct_SDDataList").show();
		}
		if(item.Code=="export"){
			$("#export").show();
		}
	}
}//end

 

//点击红冲
$(document).on("click",".update",function(){
	var datano=$(this).parent().siblings().eq(0).html();
	$(".bottom_sure").attr("data-datano",datano);
	$("#leavereason").val("");
	$(".holder_add").fadeIn(500);
	$(".holder_box").fadeIn(500);
})
//点击弹出框的确定
$(document).on("click",".bottom_sure",function(){
	var datano=$(this).attr("data-datano");
	var val=$("#leavereason").val();
	if(val==""){
		layer.msg("请填写红冲原因",{time:2000});
		return;
	}
	 $.ajax({
		  url:url+"/Product_SDData/updateProductSDData",
		  type:"POST",
		  data:{"datano":datano,"holderno":window.top.holderno,"delreason":val},
		  dataType:"json",
		  success:function(data){
			  if(data.flag){
				  $(".holder_add").fadeOut(500);
				  $(".holder_box").fadeOut(500);
				  layer.msg(data.reason,{time:1000},function(){
					  window.location.reload();
				  });
			  }else{
				  layer.msg(data.reason,{time:2000});
			  }
		  }
	  })
})
//点击弹出框的取消
$(document).on("click",".bottom_qx",function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})
//点击弹出框的叉
$(document).on("click",".quxiao",function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})

/**
 * 导出Excel
 */
$("#export").click(function(){
	layer.confirm("选择导出数据",{
		title:"提示信息",
		btn:["导出当前数据","导出全部数据"],
		yes:function(index,layero){
			$(".no-print").remove();
		    var table1 = document.querySelector("#dayindaju1");
		    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
		    openDownloadDialog(sheet2blob(sheet),'成品出入库记录.xlsx');
		    window.location.reload();
		},
		btn2:function(index,layero){
			var index=layer.load(2);
			$.ajax({
				url:url+"/Product_SDData/queryProductSDDataList",
				type:"post",
				success:function(data){
					console.log(data);
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table = $("<table id='tableData' style='display:none'><tr><td>序号</td><td>订单号</td><td>成品条码</td><td>成品名称</td><td>规格</td>" +
								     "<td>型号</td><td>数量</td><td>单价</td><td>总金额</td><td>录入人员</td><td>出入库人员</td><td>所属部门</td><td>所在仓库</td><td>仓库分区</td>" +
								     "<td>供应商</td><td>计量单位</td><td>所属类别</td><td>出入库日期</td><td>出入库状态</td><td>备注</td></tr></table>");
					      //循环遍历，每行加入tr标签，每个单元格加td标签
						  var shuLiang=0;
						  var univalence=0;
						  var totalMoney=0;
					      for(var val of res){
					    	  var datano=(val.datano==undefined?"":val.datano);
							     var sdbill=(val.sdbill==undefined?"":val.sdbill);
							     var itemcode=(val.itemcode==undefined?"":val.itemcode);
							     var itemname=(val.itemname==undefined?"":val.itemname);
							     var price=(val.price==undefined?"":val.price);
							     var quantity=(val.quantity==undefined?"":val.quantity);
							     var sumamount=(val.sumamount==undefined?"":val.sumamount);
							     var operator=(val.operator==undefined?"":val.operator);
							     var sdperson=(val.sdpersonname==undefined?"":val.sdpersonname);
							     var sdpersondept=(val.sdpersondeptname==undefined?"":val.sdpersondeptname);
							     var warename=(val.warename==undefined?"":val.warename);
							     var areaname=(val.areaname==undefined?"":val.areaname);
							     //var suppliername=(val.suppliername==undefined?"":val.suppliername);
							     var spec=(val.spec==undefined?"":val.spec);
							     var type=(val.type==undefined?"":val.type);
							     var unitname=(val.unitname==undefined?"":val.unitname);
							     var itemtype=(val.itemtype==undefined?"":val.itemtype);
							     var remark=(val.remark==undefined?"":val.remark);
							     var sddate=(val.sddate==undefined?"":val.sddate);
							     var statusname=(val.statusname==undefined?"":val.statusname);
							     var deleted=(val.deleted==undefined?"":val.deleted);
							     var delreason=(val.delreason==undefined?"":val.delreason);
							     shuLiang+=parseFloat(quantity);
							     univalence+=parseFloat(price);
							     totalMoney+=parseFloat(sumamount);
							     var $tr=$("<tr><td>"+datano+"</td><td>"+sdbill+"</td><td>"+itemcode+"</td><td>"+itemname+"</td><td>"+spec
										+"</td><td>"+type+"</td><td>"+quantity+"</td><td>"+price
										+"</td><td>"+sumamount+"</td><td>"+operator+"</td><td>"+sdperson
										+"</td><td>"+sdpersondept+"</td><td>"+warename+"</td><td>"+areaname
										+"</td><td>"+unitname+"</td><td>"+itemtype+"</td><td>"
										+sddate+"</td><td>"+statusname+"</td><td>"+remark
										+"</td></tr>");
					    	  $table.append($tr);
					      }
					      var $tfoot=$("<tfoot><tr><td>合计</td><td></td><td></td><td></td><td></td><td></td><td>"+shuLiang+"</td><td>"+univalence+"</td><td>"+totalMoney+"</td><td></td>" +
					      		"<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot>");
					      $table.append($tfoot);
					      $("body").append($table);
					      var table = document.querySelector("#tableData");
					      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
					      openDownloadDialog(sheet2blob(sheet),'成品出入库记录.xlsx');
					      $("#tableData").remove();
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(){
					layer.close(index);
				}
			})
		}
	})
});