$(function(){
	querySparePartsStockList();//页面加载查询列表
	getPage();
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

//点击确定生成入库物品
$("#outBP").click(function(){
	if($("#cont span.checkbox.curr").length==0){
		layer.msg("请选择物品!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$("#cont span.curr").length;i++){
		var obj={
				"BPCode":$("#cont span.curr").eq(i).parent().siblings(".BPCode").html(),
				"BPName":$("#cont span.curr").eq(i).parent().siblings(".BPName").html(),
				"BPSpec":$("#cont span.curr").eq(i).parent().siblings(".BPSpec").html(),
				"BPType":$("#cont span.curr").eq(i).parent().siblings(".BPType").html(),
				"BPUnitName":$("#cont span.curr").eq(i).parent().siblings(".BPUnitName").html(),
				"BPStorage":$("#cont span.curr").eq(i).parent().siblings(".BPStorage").html(),
				"BPPrice":$("#cont span.curr").eq(i).parent().siblings(".BPPrice").html(),
				"BPSummoney":$("#cont span.curr").eq(i).parent().siblings(".BPSummoney").html(),
				"BPItemType":$("#cont span.curr").eq(i).parent().siblings(".BPItemType").html(),
				"BPremark":$("#cont span.curr").eq(i).parent().siblings(".BPremark").html(),
		}
		arr.push(obj);
	}
	parent.createBPTable(arr);
	parent.layer.closeAll();
})



//复选
$(document).on('click', '.checkbox', function () {
    if ($(this).attr("id") == "selectAll") { //全选
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').removeClass('curr');
            })
        } else {
            $(this).addClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').addClass('curr');
            })
        }
    } else {
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $('#selectAll').removeClass('curr');
        } else {
            $(this).addClass('curr');
            var arr=$("#cont").children().find("span.checkbox")
           	var str=$("#cont").children().find("span.curr")
           	if(arr.length==str.length){
           		$('#selectAll').addClass('curr');
           	}
        }
    }
})//end


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
						html+="<tr><td class='no-print'><span class='checkbox' style='float:none'></span></td><td>"+(i+1)+"</td><td>"+warename
						+"</td><td class='BPCode'>"+itemcode+"</td><td class='BPName'>"+itemname
						+"</td><td class='BPSpec'>"+spec+"</td><td class='BPType'>"+type+"</td><td class='BPUnitName'>"+unitname
						+"</td><td class='BPStorage'>"+storage+"</td><td class='BPPrice'>"+price+"</td><td class='BPSummoney'>"+summoney
						+"</td><td class='BPItemType'>"+itemtype+"</td><td class='BPremark'>"+remark
						+"</td><td>"+createperson+"</td><td>"+createdate
						+"</td><td>"+updateperson+"</td><td>"+updatedate
						+"</td></tr>";
				  });
				  $("#cont").append(html);
				  $("#storageNumber").html(storageNumber.toFixed(4));
		   }
	   })
}//end


