/***
 * Vehiceimport-file.html页面引入本文件
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
	        url:url+"/LPR_Vehicle/queryVehicleExcel",//后台检查Excel表格中的数据
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
							var holderno=(item[0]==undefined?"":item[0]);
							var holdername=(item[1]==undefined?"":item[1]);
							var deptname=(item[2]==undefined?"":item[2]);
							var carNumber=(item[3]==undefined?"":item[3]);
							var strcode=(item[4]==undefined?"":item[4]);
							var carType=(item[5]==undefined?"":item[5]);
							var startdate=(item[6]==undefined?"":item[6]);
							var enddate=(item[7]==undefined?"":item[7]);
							var  iostatus=(item[8]==undefined?"":item[8]);
							/*startdate=getTaskTime(startdate);
							enddate=getTaskTime(enddate);*/
							if(holderno==""){
								holderno="请填写";
								$td1.css("color","red");
							}
							if(holdername==""){
								holdername="请填写";
								$td2.css("color","red");
							}
							if(deptname==""){
								sexname="请填写";
								$td3.css("color","red");
							}
							if(carNumber==""){
								departmentno="请填写";
								$td4.css("color","red");
							}
							if(carType==""){
								holdercard="请填写";
								$td7.css("color","red");
							}
							if(startdate==""){
								idcode="请填写";
								$td8.css("color","red");
							}
							if(enddate==""){
								startdate="请填写";
								$td9.css("color","red");
							}
							if(iostatus==""){
								iostatus="请填写";
								$td9.css("color","red");
							}
							if(iostatus=="0"){
								iostatus="停用";
							}else if(iostatus=="1"){
								iostatus="启用";
							}
							var $tr=$("<tr></tr>");
							var $td1=$("<td class='holderno'>"+holderno+"</td>");
							var $td2=$("<td class='holdername'>"+holdername+"</td>");
							var $td3=$("<td class='deptname'>"+deptname+"</td>");
							var $td4=$("<td class='carNumber'>"+carNumber+"</td>");
							var $td5=$("<td class='strcode'>"+strcode+"</td>");
							var $td6=$("<td class='carType'>"+carType+"</td>");
							var $td7=$("<td class='startdate'>"+startdate+"</td>");
							var $td8=$("<td class='enddate'>"+enddate+"</td>");
							var $td9=$("<td class='iostatus'>"+iostatus+"</td>");
							$tr.append($td1);
							$tr.append($td2);
							$tr.append($td3);
							$tr.append($td4);
							$tr.append($td5);
							$tr.append($td6);
							$tr.append($td7);
							$tr.append($td8);
							$tr.append($td9);
							$("#dayindaju1").append($tr);
					};
					//判断车牌号是否重复
					  var arr3=[];
					  for(var i=0;i<$(".carNumber").length;i++){
						  arr3.push($(".carNumber").eq(i).html());
					  }
					  arr3=arr3.sort();
					  for(var k=0;k<arr3.length;k++){
						  if(arr3[k]==arr3[k+1]){
							for(var m=0;m<$(".carNumber").length;m++){
								if(arr3[k]==$(".carNumber").eq(m).html()&&arr3[k]!="请填写"){
									$(".carNumber").eq(m).css("color","red");
								}
							}  
						  }
					  }
					//判断卡内码是否重复
					  var arr4=[];
					  for(var i=0;i<$(".strcode").length;i++){
						  arr4.push($(".strcode").eq(i).html());
					  }
					  arr4=arr4.sort();
					  for(var k=0;k<arr4.length;k++){
						  if(arr4[k]==arr4[k+1]){
							for(var m=0;m<$(".strcode").length;m++){
								if(arr4[k]==$(".strcode").eq(m).html()&&arr4[k]!="请填写"){
									$(".strcode").eq(m).css("color","red");
								}
							}  
						  }
					  }
					$("tbody").attr("id","page")
					layer.msg(data.reason,{icon:1,time:1000});
					count=res.length;
					pagination(1,20,count)
					console.log(count);
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
			  if($("td").eq(i).css("color")=="rgb(255,0,0)"){
					 layer.msg("请检查页面加红的数据!",{time:2000});
					 return;
				 }	
		  }
		  var index=layer.load(2,{shade:[0.5,'#fff']});
		  //从页面获取全部数据
		  var arr=[];
		  for(var i=0;i<$(".holderno").length;i++){
			  var iostatus=$(".iostatus").eq(i).html();
			  if(iostatus=="启用" || iostatus=="是"){
				  iostatus="1";
			  }else if(iostatus=="停用" || iostatus=="否"){
				  iostatus="0";
			  }
			  var strcode=$(".strcode").eq(i).html();
			  if(strcode==""){
				  strcode=null;
			  }
			  
			  var obj={
					  "holderno":$(".holderno").eq(i).html(),
					  "vehicleuser":$(".holdername").eq(i).html(),
					  "userunit":$(".deptname").eq(i).html(),
					  "strplateid":$(".carNumber").eq(i).html(),
					  "strCode":strcode,
					  "vehicletype":$(".carType").eq(i).html(),
					  "startdate":$(".startdate").eq(i).html(),
					  "enddate":$(".enddate").eq(i).html(),
					  "status":iostatus
			  };
			  arr.push(obj);
		  }
		  console.log(arr)
		  //从页面获取全部工号
		  var holdernoList=[];
		  var reg=/^[0-9a-zA-Z]+$/;
		  for(var i=0;i<$(".holderno").length;i++){
			  var holderno=$(".holderno").eq(i).html();
			  if(!reg.test(holderno)){
				  $(".holderno").eq(i).css("color","red");
				  layer.msg("工号格式错误!",{time:2000});
				  layer.close(index);
				  return;
			  }
			  var obj={
					  "holderno":$(".holderno").eq(i).html()
			  }
			  holdernoList.push(obj);
		  }
		  console.log(holdernoList);
		  //从页面获取全部部门
		  var deptList=[];
		  for(var i=0;i<$(".deptname").length;i++){
			  var obj={
					  "userunit":$(".deptname").eq(i).html()
			  }
			  deptList.push(obj);
		  }
		  console.log(deptList)
		  //从页面获取全部车牌号
		  var strplateidList=[];
		  var reg2=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
		  for(var i=0;i<$(".carNumber").length;i++){
			  if(!reg2.test($(".carNumber").eq(i).html())){
				  $(".carNumber").eq(i).css("color","red");
				  layer.msg("车牌号格式错误!");
				 layer.close(index);
				  return;
			  }
			  var obj={
					  "strplateid":$(".carNumber").eq(i).html()
			  }
			  strplateidList.push(obj);
		  }
		  console.log(strplateidList);
		//从页面获取全部卡内码
		  var strcodeList=[];
		  for(var i=0;i<$(".strcode").length;i++){
			  var strcode=$(".strcode").eq(i).html();
			  var obj={};
			  if(strcode==""){
				  strcode=null;
				  obj={"strcode":null}
			  }else{
			   obj={"strcode":strcode}
			  }
			  strcodeList.push(obj);
		  }
		  console.log(strcodeList);
	    $.ajax({ 
	        url : url+"/LPR_Vehicle/insertVehicleExcel",
	        type : 'POST',
	        contentType:"application/json", // 指定这个协议很重要
	        data:JSON.stringify({
	        	"holdernoList":holdernoList,//工号
	        	"deptList":deptList,//部门
	        	"strplateidList":strplateidList,//车牌号
	        	"strcodeList":strcodeList,//卡内码
	        	"arr":arr//全部信息
	        }),
	        dataType:"json",
	        success : function(data) {
	        	layer.close(index);
	        	console.log(data);
	        	if(data.flag){
	        		layer.msg(data.reason,{time:2000});
				}else{
					var havaLicense=data.havaLicense;
					var haveVehicleInternal=data.haveVehicleInternal;
					var notholdernolist=data.notholdernolist;
					var answer1="";
					var answer2="";
					var answer3="";
					//判断卡内码是否重复
					for(var j=0;j<$(".strcode").length;j++){
						for(var m=0;m<haveVehicleInternal.length;m++){
							if($(".strcode").eq(j).html()==haveVehicleInternal[m]){
								$(".strcode").eq(j).css("color","red");
								answer2="卡内码重复,";
							}
						}
					}
					//判断车牌号是否重复
					for(var i=0;i<$(".carNumber").length;i++){
						for(var k=0;k<havaLicense.length;k++){
							if($(".carNumber").eq(i).html()==havaLicense[k]){
								$(".carNumber").eq(i).css("color","red");
								answer1="车牌号重复,";
							}
						}
					}
					//判断工号是否有问题
					for(var n=0;n<$(".holderno").length;n++){
						for(var k=0;k<notholdernolist.length;k++){
							if($(".holderno").eq(n).html()==notholdernolist[k]){
								$(".holderno").eq(n).css("color","red");
								answer3="工号存在问题,未找到对应的部门";
							}
						}
					}
					layer.msg(answer1+answer2+answer3,{time:3000});
					
				}
	        },
	        error:function(){
	        	layer.close(index);
	        }
	     })
});