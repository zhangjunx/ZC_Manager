/***
 * import-file.html页面引入本文件
 * 用于处理表格数据和导入
 */




/**
 * 选择导入文件时的onchange事件(excelimport)
 * 用于把Excel提交到后台,让后台先对表格数据进行查询和检查 
 */
//分页
$("#excelimport").change(function(e){
	postData();
	//清空input
	e.target.value = '';
});//end


var limit=20;
var page=1;

function getPage(count){
  layui.use("laypage", function () {
        var laypage = layui.laypage;
        laypage.render({
            elem: "test",
            count: count, //数据总数，从服务端得到
            limit: limit,
            curr:page,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数
                console.log(obj) //得到当前页，以便向服务端请求对应页的数据。
                page=obj.curr;
                limit=obj.limit;
                if (!first) {
                    // do something
                	pagination(page,limit,count);
                }
            }
        })
    })
}


function postData(){
	 var formData = new FormData();
	 var excle = $("#excelimport").val();
	 formData.append("file",$("#excelimport")[0].files[0]);
	//文件名可以带空格
    var reg = /^.*\.(?:xls|xlsx)$/i;
    
	//校验不通过
	if(!reg.test(excle)) {
		layer.msg("请上传excel格式的文件!",{icon:3,time:4000}); 
		$("#dayindaju1 tr").eq(0).nextAll().remove();
	}else{
		var index=layer.load(2,{shade:[0.5,'#fff']});
		$.ajax({
	        url:url+"/SparePartsData/checkExcelData",//后台检查Excel表格中的数据
	        type:'POST',
	        //async:false,
	        data:formData,
	        // 告诉jQuery不要去处理发送的数据
	        processData:false,
	        // 告诉jQuery不要去设置Content-Type请求头
	        contentType:false,
	        success : function(data) {
	          console.log(data);
	          layer.close(index);
	          $("#dayindaju1 tr").eq(0).nextAll().remove();
	          var res=data.result;
	          if(!data.flag){
				
				}else{
					for(var item of res){
							var itemcode=(item[0]==undefined?"":item[0]);
							var itemname=(item[1]==undefined?"":item[1]);
							var spec=(item[2]==undefined?"":item[2]);
							var type=(item[3]==undefined?"":item[3]);
							var unitname=(item[4]==undefined?"":item[4]);
							var itemtype=(item[5]==undefined?"":item[5]);
							var remark=(item[6]==undefined?"":item[6]);
							var $tr=$("<tr></tr>");
							var $td1=$("<td class='itemcode'></td>");
							var $td2=$("<td class='itemname'></td>");
							var $td3=$("<td class='spec'></td>");
							var $td4=$("<td class='type'></td>");
							var $td5=$("<td class='unitname'></td>");
							var $td6=$("<td class='itemtype'></td>");
							var $td7=$("<td class='remark'></td>");
							if(itemcode==""){
								itemcode="请填写";
								$td1.css("color","red");
							}
							if(itemname==""){
								itemname="请填写";
								$td2.css("color","red");
							}
							if(unitname==""){
								unitname="请填写";
								$td5.css("color","red");
							}
							if(itemtype==""){
								itemtype="请填写";
								$td6.css("color","red");
							}
							$td1.append(itemcode);
							$td2.append(itemname);
							$td3.append(spec);
							$td4.append(type);
							$td5.append(unitname);
							$td6.append(itemtype);
							$td7.append(remark);
							$tr.append($td1);
							$tr.append($td2);
							$tr.append($td3);
							$tr.append($td4);
							$tr.append($td5);
							$tr.append($td6);
							$tr.append($td7);
							$("#dayindaju1").append($tr);
					};
					
					 //判断条码是否重复
					  var arr1=[];
					  for(var i=0;i<$(".itemcode").length;i++){
						  arr1.push($(".itemcode").eq(i).html());
					  }
					  arr1=arr1.sort();
					  for(var k=0;k<arr1.length;k++){
						  if(arr1[k]==arr1[k+1]){
							for(var m=0;m<$(".itemcode").length;m++){
								if(arr1[k]==$(".itemcode").eq(m).html()&&arr1[k]!="请填写"){
									$(".itemcode").eq(m).css("color","red");
								}
							}  
						  }
					  }
					$("tbody").attr("id","page")
					layer.msg(data.reason,{icon:1,time:1000});
					count=res.length;
					pagination(1,20,count)
					getPage(count);
				}
	        }
	     })
	 }
	
}


//分页
function pagination(curr, limit, count) {
    var dep = document.getElementById("page")
    var departmentInfo = document.getElementsByTagName("table")
    startRow = (curr - 1) * limit + 1 //每页显示第一条数据的行数
    lastRow = curr * limit //每页显示最后一条数据的行数
    var totalRow = count
    lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
    for (var i = 1; i < totalRow + 1; i++) { //遍历数据
        var hrow = dep.rows[i]
        if (i >= startRow && i <= lastRow) {
            hrow.style.display = ""
        } else {
            hrow.style.display = "none"
        }
    }
}

//对CST格式的时间字符串进行分段截取，重新拼接为GMT格式，然后显示
function getTaskTime(strDate) {
    if(null==strDate || ""==strDate){
        return "";
    }
    var dateStr=strDate.trim().split(" ");
    var strGMT = dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";
    var date = new Date(Date.parse(strGMT));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y+"-"+m+"-"+d;
};
/**
 * 确定导入按钮的点击事件(determine)
 * 点击后提交至后台进行处理
 */
	  $("#determine").click(function(){
		  if($("tr").length==1){
			  layer.msg("请先上传文件!",{time:2000});
			  return;
		  }
		  for(var i=0;i<$("td").length;i++){
			  if($("td").eq(i).css("color")=="rgb(255, 0, 0)"){
					 layer.msg("请检查页面加红的数据!",{time:2000});
					 return;
				 }
		  }
		  var index=layer.load(2,{shade:[0.5,'#fff']});
		  //从页面获取全部数据
		  var arr=[];
		  for(var i=0;i<$(".itemcode").length;i++){
			  var obj={
					  "itemcode":$(".itemcode").eq(i).html(),
					  "itemname":$(".itemname").eq(i).html(),
					  "spec":$(".spec").eq(i).html(),
					  "type":$(".type").eq(i).html(),
					  "unitname":$(".unitname").eq(i).html(),
					  "itemtype":$(".itemtype").eq(i).html(),
					  "remark":$(".remark").eq(i).html(),
			  };
			  arr.push(obj);
		  }
		  console.log(arr)
	    $.ajax({ 
	        url : url+"/MaterialData/insertExcelMaterial",
	        type : 'POST',
	        contentType:"application/json", // 指定这个协议很重要
	        data:JSON.stringify({
	        	"list":arr,
	        }),
	        dataType:"json",
	        success : function(data) {
	        	layer.close(index);
	        	if(data.flag){
	        		layer.msg(data.reason,{icon:1,time:2000});
				}else{
					//给重复的编码加红
					var itemcodeList=data.result;
					itemcodeList=Array.from(new Set(itemcodeList));
					for(var i=0;i<$(".itemcode").length;i++){
						 for(var k=0;k<itemcodeList.length;k++){
							 if($(".itemcode").eq(i).html()==itemcodeList[k]){
								 $(".itemcode").eq(i).css("color","red");
							 }
						 }
					  }
					layer.msg(data.reason,{icon:1,time:2000});
				}
	        },
	        error:function(data){
	        	layer.close(index);
	        	layer.msg(data.reason,{icon:2,time:2000});
	        }
	     })
});
