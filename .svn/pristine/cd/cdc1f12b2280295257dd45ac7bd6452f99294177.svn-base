$(function(){
	querySparePartsStockList();//页面加载查询列表
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
					querySparePartsStockList();
				}
			}
		})
	})
}//end

//条件查询
$("#sousuo").click(function(){
	querySparePartsStockList();
	getPage();
})
function querySparePartsStockList(){//页面加载查询列表
	var itemcode = $("#itemcode").val();
	var warename = $("#warename").val();
	var obj={"itemcode":itemcode,"warename":warename,"pageIndex":page,"pageSize":limit};
	   $.ajax({
		   //url:url+'/SpareParts_SDData/querySparePartsSDStockList',
		   url:url+'/SpareParts_StockData/querySparePartsStockDataList',
		   type:"POST",
		   data:obj,
		   datatype:'json',
		   async:false,//很重要
		   success:function(data){
			   $("#cont").empty();
			   if(!data.flag){
				   layer.msg(data.reason,{time:1500});
				   total=0;
				   $("#storageNumber").html("0");
				   return;
			   }
				  page=data.pageinfo.pageIndex;
				  limit=data.pageinfo.pageSize;
				  total=data.pageinfo.sumCount;
				  var html="";
				  var storageNumber=0;
				  $.each(data.result,function(i,val){
					     var datano= (val.datano==undefined?"":val.datano);
	    				 var itemcode= (val.itemcode==undefined?"":val.itemcode);
	    				 var itemname= (val.itemname==undefined?"":val.itemname);
	    				 var itemtype= (val.itemtype==undefined?"":val.itemtype);
	    				 var spec= (val.spec==undefined?"":val.spec);
	    				 var type= (val.type==undefined?"":val.type);
	    				 var unitname= (val.unitname==undefined?"":val.unitname);
	    				 var storage= (val.storage==undefined?"":val.storage);
	    				 var price= (val.price==undefined?"":val.price);
	    				 var summoney=(val.summoney==undefined?"":val.summoney);
	    				 var remark= (val.remark==undefined?"":val.remark);
	    				 var warename= (val.warename==undefined?"":val.warename);
	    				 var createperson=(val.createperson==undefined?"":val.createperson);
	 					var createdate=(val.createdate==undefined?"":val.createdate);
	 					var updateperson=(val.updateperson==undefined?"":val.updateperson);
	 					var updatedate=(val.updatedate==undefined?"":val.updatedate);
	    				 storageNumber+=parseFloat(storage);
						html+="<tr><td>"+(i+1)+"</td><td>"+warename
						+"</td><td>"+itemcode+"</td><td>"+itemname
						+"</td><td>"+spec+"</td><td>"+type+"</td><td>"+unitname
						+"</td><td>"+storage+"</td><td>"+price+"</td><td>"+summoney
						+"</td><td>"+itemtype+"</td><td>"+remark
						+"</td><td>"+createperson+"</td><td>"+createdate
						+"</td><td>"+updateperson+"</td><td>"+updatedate
						+"</td></tr>";
				  });
				  $("#cont").append(html);
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
		if(item.ModelCode=="13005"){
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
		    openDownloadDialog(sheet2blob(sheet),'备品件库存.xlsx');
		    window.location.reload();
		},
		btn2:function(index,layero){
			var index=layer.load(2);
			$.ajax({
				url:url+"/SpareParts_StockData/querySparePartsStockDataList",
				type:"post",
				success:function(data){
					console.log(data);
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table = $("<table id='tableData' style='display:none'><tr><td>序号</td><td>所在仓库名称</td><td>备品件条码</td><td>备品件名称</td><td>规格</td>" +
								     "<td>型号</td><td>计量单位</td><td>库存数量</td><td>物品单价</td><td>总金额</td><td>所属类别</td><td>备注</td><td>第一次录入人</td><td>第一次录入时间</td>" +
								     "<td>最后一次修改人</td><td>最后一次修改时间</td></tr></table>");
					      //循环遍历，每行加入tr标签，每个单元格加td标签
						  var i=0;
						  var storageNumber=0;
					      for(var val of res){
					    	  var datano= (val.datano==undefined?"":val.datano);
			    				 var itemcode= (val.itemcode==undefined?"":val.itemcode);
			    				 var itemname= (val.itemname==undefined?"":val.itemname);
			    				 var itemtype= (val.itemtype==undefined?"":val.itemtype);
			    				 var spec= (val.spec==undefined?"":val.spec);
			    				 var type= (val.type==undefined?"":val.type);
			    				 var unitname= (val.unitname==undefined?"":val.unitname);
			    				 var storage= (val.storage==undefined?"":val.storage);
			    				 var price= (val.price==undefined?"":val.price);
			    				 var summoney=(val.summoney==undefined?"":val.summoney);
			    				 var remark= (val.remark==undefined?"":val.remark);
			    				 var warename= (val.warename==undefined?"":val.warename);
			    				 var createperson=(val.createperson==undefined?"":val.createperson);
			 					var createdate=(val.createdate==undefined?"":val.createdate);
			 					var updateperson=(val.updateperson==undefined?"":val.updateperson);
			 					var updatedate=(val.updatedate==undefined?"":val.updatedate);
			 					storageNumber+=parseFloat(storage);
			 					var $tr=$("<tr><td>"+(i+1)+"</td><td>"+warename
										+"</td><td>"+itemcode+"</td><td>"+itemname
										+"</td><td>"+spec+"</td><td>"+type+"</td><td>"+unitname
										+"</td><td>"+storage+"</td><td>"+price+"</td><td>"+summoney
										+"</td><td>"+itemtype+"</td><td>"+remark
										+"</td><td>"+createperson+"</td><td>"+createdate
										+"</td><td>"+updateperson+"</td><td>"+updatedate
										+"</td></tr>");
					    	  $table.append($tr);
					    	  i++;
					      }
					      var $tfoot=$("<tfoot><tr><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td><td>"+storageNumber+"</td><td></td><td></td>" +
					      		"<td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot>");
					      $table.append($tfoot);
					      $("body").append($table);
					      var table = document.querySelector("#tableData");
					      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
					      openDownloadDialog(sheet2blob(sheet),'备品件库存.xlsx');
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
 