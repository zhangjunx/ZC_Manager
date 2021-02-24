/**
 * 备品备件详细库存
 */
//页面加载事件
$(function(){
	getList();//页面加载查询列表
	getPage();
	showHide();//跟权限有关
});//end
var page;//当前页
var limit;//每页显示数
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

//条件查询
$("#sousuo").click(function(){
	getList();
	getPage();
})
function getList(){//页面加载查询列表
	var itemcode = $("#itemcode").val();
	var itemname = $("#itemname").val();
	var obj={"itemcode":itemcode,"itemname":itemname,"pageIndex":page,"pageSize":limit};
	   $.ajax({
		   url:url+'/SpareParts_SDData/querySparePartsSDStockList',
		   type:'post',
		   data:obj,
		   datatype:'json',
		   async:false,//很重要
		   success:function(data){
			   console.log(data)
			   $("#cont").empty();
			   
			   if(!data.flag){
				   layer.msg(data.reason,{time:1500});
				   total=0;
				   $("#insertStorage").html("0");
				   $("#outStorage").html("0");
				   $("#storageNumber").html("0");
				   return;
			   }
				  page=data.pageinfo.pageIndex;
				  limit=data.pageinfo.pageSize;
				  total=data.pageinfo.sumCount;
				  var html="";
				  var insertStorageNumber=0;
				  var outStorageNumber=0;
				  var storageNumber=0;
				  $.each(data.result,function(i,val){
					     var datano= (val.datano==undefined?"":val.datano);
	    				 var itemcode= (val.itemcode==undefined?"":val.itemcode);
	    				 var itemname= (val.itemname==undefined?"":val.itemname);
	    				 var itemtype= (val.itemtype==undefined?"":val.itemtype);
	    				 var spec= (val.spec==undefined?"":val.spec);
	    				 var type= (val.type==undefined?"":val.type);
	    				 var unitname= (val.unitname==undefined?"":val.unitname);
	    				 var storage1= (val.storage1==undefined?"":val.storage1);
	    				 var storage2= (val.storage2==undefined?"":val.storage2);
	    				 var storage= (val.storage==undefined?"":val.storage);
	    				 var price= (val.price==undefined?"":val.price);
	    				 var sum= (val.sum==undefined?"":val.sum);
	    				 var remark= (val.remark==undefined?"":val.remark);
	    				 var warename= (val.warename==undefined?"":val.warename);
	    				 insertStorageNumber+=parseFloat(storage1);
	    				 outStorageNumber+=parseFloat(storage2);
	    				 storageNumber+=parseFloat(storage);
						html+="<tr><td>"+(i+1)+"</td><td>"+itemcode+"</td><td>"+itemname
						+"</td><td>"+spec+"</td><td>"+type+"</td><td>"+unitname
						+"</td><td>"+storage1+"</td><td>"+storage2+"</td><td>"+storage
						+"</td><td>"+price+"</td><td>"+sum
						+"</td><td>"+itemtype+"</td><td>"+warename
						+"</td><td>"+remark+"</td></tr>";
				  });
				  $("#cont").append(html);
				  $("#insertStorage").html(insertStorageNumber.toFixed(4));
				  $("#outStorage").html(outStorageNumber.toFixed(4));
				  $("#storageNumber").html(storageNumber.toFixed(4));
		   }
	   })
}//end

//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#export").hide();
	$("#printSparePartsStock").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="13007"){
			list.push(item);
		}
		
	})
	for(var item of list){
		if(item.Code=="print"){
			$("#printSparePartsStock").show();
		}
		if(item.Code=="export"){
			$("#export").show();
		}
	}
}//end

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
		    openDownloadDialog(sheet2blob(sheet),'备品件出入库统计.xlsx');
		    window.location.reload();
		},
		btn2:function(index,layero){
			var index=layer.load(2);
			$.ajax({
				url:url+"/SpareParts_SDData/querySparePartsSDStockList",
				type:"post",
				success:function(data){
					console.log(data);
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table = $("<table id='tableData' style='display:none'><tr><td>序号</td><td>备品件条码</td><td>备品件名称</td><td>规格</td>" +
								     "<td>型号</td><td>计量单位</td><td>入库数量</td><td>出库数量</td><td>库存数量</td><td>物品单价</td><td>总金额</td><td>所属类别</td><td>所在仓库名称</td>" +
								     "<td>备注</td></tr></table>");
					      //循环遍历，每行加入tr标签，每个单元格加td标签
						  var insertStorageNumber=0;
						  var outStorageNumber=0;
						  var storageNumber=0;
						  var i=0;
					      for(var val of res){
					    	  var datano= (val.datano==undefined?"":val.datano);
			    				 var itemcode= (val.itemcode==undefined?"":val.itemcode);
			    				 var itemname= (val.itemname==undefined?"":val.itemname);
			    				 var itemtype= (val.itemtype==undefined?"":val.itemtype);
			    				 var spec= (val.spec==undefined?"":val.spec);
			    				 var type= (val.type==undefined?"":val.type);
			    				 var unitname= (val.unitname==undefined?"":val.unitname);
			    				 var storage1= (val.storage1==undefined?"":val.storage1);
			    				 var storage2= (val.storage2==undefined?"":val.storage2);
			    				 var storage= (val.storage==undefined?"":val.storage);
			    				 var price= (val.price==undefined?"":val.price);
			    				 var sum= (val.sum==undefined?"":val.sum);
			    				 var remark= (val.remark==undefined?"":val.remark);
			    				 var warename= (val.warename==undefined?"":val.warename);
			    				 insertStorageNumber+=parseFloat(storage1);
			    				 outStorageNumber+=parseFloat(storage2);
			    				 storageNumber+=parseFloat(storage);
			 					var $tr=$("<tr><td>"+(i+1)+"</td><td>"+itemcode+"</td><td>"+itemname
										+"</td><td>"+spec+"</td><td>"+type+"</td><td>"+unitname
										+"</td><td>"+storage1+"</td><td>"+storage2+"</td><td>"+storage
										+"</td><td>"+price+"</td><td>"+sum
										+"</td><td>"+itemtype+"</td><td>"+warename
										+"</td><td>"+remark+"</td></tr>");
					    	  $table.append($tr);
					    	  i++;
					      }
					      var $tfoot=$("<tfoot><tr><td>合计</td><td></td><td></td><td></td><td></td><td></td><td>"+insertStorageNumber+"</td><td>"+outStorageNumber+"</td><td>"+storageNumber+"</td><td></td>" +
					      		"<td></td><td></td><td></td><td></td></tr></tfoot>");
					      $table.append($tfoot);
					      $("body").append($table);
					      var table = document.querySelector("#tableData");
					      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
					      openDownloadDialog(sheet2blob(sheet),'备品件出入库统计.xlsx');
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
