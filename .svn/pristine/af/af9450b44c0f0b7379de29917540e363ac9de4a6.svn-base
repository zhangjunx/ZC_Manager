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
		$(".loading").css("display","block");
		$.ajax({
	        url:url+"/HolderData/checkExcelData",//后台检查Excel表格中的数据
	        type:'POST',
	        //async:false,
	        data:formData,
	        // 告诉jQuery不要去处理发送的数据
	        processData:false,
	        // 告诉jQuery不要去设置Content-Type请求头
	        contentType:false,
	        success : function(data) {
	        	console.log(data);
	          $(".loading").css("display","none");
	          $("#dayindaju1 tr").eq(0).nextAll().remove();
	          var res=data.result;
	          if(!data.flag){
				
				}else{
					for(var item of res){
							var holderno=(item[0]==undefined?"":item[0]);
							var holdername=(item[1]==undefined?"":item[1]);
							var sexname=(item[2]==undefined?"":item[2]);
							var departmentno=(item[3]==undefined?"":item[3]);
							var emptype=(item[4]==undefined?"":item[4]);
							//var titleno=(item[5]==undefined?"":item[5]);
							var holdercard=(item[5]==undefined?"":item[5]);
							var idcode=(item[6]==undefined?"":item[6]);
							var startdate=(item[7]==undefined?"":item[7]);
							//startdate=getTaskTime(startdate)
							var $tr=$("<tr></tr>");
							var $td1=$("<td class='holderno'></td>");
							var $td2=$("<td class='holdername'></td>");
							var $td3=$("<td class='sex'></td>");
							var $td4=$("<td class='dept'></td>");
							var $td5=$("<td class='emptype'></td>");
							var $td6=$("<td class='job'></td>");
							var $td7=$("<td class='holdercard'></td>");
							var $td8=$("<td class='idcode'></td>");
							var $td9=$("<td class='inJobTime'></td>");
							if(holderno==""){
								holderno="请填写";
								$td1.css("color","red");
							}
							if(holdername==""){
								holdername="请填写";
								$td2.css("color","red");
							}
							if(sexname==""){
								sexname="请填写";
								$td3.css("color","red");
							}
							if(departmentno==""){
								departmentno="请填写";
								$td4.css("color","red");
							}
							if(emptype==""){
								emptype="请填写";
								$td5.css("color","red");
							}
							/*if(titleno==""){
								titleno="请填写";
								$td6.css("color","red");
							}*/
							/*if(holdercard==""){
								holdercard="请填写";
								$td7.css("color","red");
							}*/
							if(idcode==""){
								idcode="请填写";
								$td8.css("color","red");
							}
							if(idcode.length!=18){
								$td8.css("color","red");
							}
							
							if(startdate==""){
								startdate="请填写";
								$td9.css("color","red");
							}
							$td1.append(holderno);
							$td2.append(holdername);
							$td3.append(sexname);
							$td4.append(departmentno);
							$td5.append(emptype);
							//$td6.append(titleno);
							$td7.append(holdercard);
							$td8.append(idcode);
							$td9.append(startdate);
							$tr.append($td1);
							$tr.append($td2);
							$tr.append($td3);
							$tr.append($td4);
							$tr.append($td5);
							//$tr.append($td6);
							$tr.append($td7);
							$tr.append($td8);
							$tr.append($td9);
							$("#dayindaju1").append($tr);
					};
					
					 //判断工号是否重复
					  var arr1=[];
					  for(var i=0;i<$(".holderno").length;i++){
						  arr1.push($(".holderno").eq(i).html());
					  }
					  arr1=arr1.sort();
					  for(var k=0;k<arr1.length;k++){
						  if(arr1[k]==arr1[k+1]){
							for(var m=0;m<$(".holderno").length;m++){
								if(arr1[k]==$(".holderno").eq(m).html()&&arr1[k]!="请填写"){
									$(".holderno").eq(m).css("color","red");
								}
							}  
						  }
					  }
					
					
					
					 //判断身份证号是否重复
					  var arr2=[];
					  for(var i=0;i<$(".idcode").length;i++){
						  if($(".idcode").eq(i).html()!="请填写"){
							  arr2.push($(".idcode").eq(i).html());
						  }
						  
					  }
					  arr2=arr2.sort();
					  for(var k=0;k<arr2.length;k++){
						  if(arr2[k]==arr2[k+1]){
							  for(var m=0;m<$(".idcode").length;m++){
								  if(arr2[k]==$(".idcode").eq(m).html()){
									  $(".idcode").eq(m).css("color","red");
										/*layer.msg("身份证号重复!",{time:2000});
										return;*/
								  }
							  }
						  }
					  }
					  
					  
					/*//判断卡号是否重复
					  var arr3=[];
					  for(var i=0;i<$(".holdercard").length;i++){
						  arr3.push($(".holdercard").eq(i).html());
					  }
					  arr3=arr3.sort();
					  for(var k=0;k<arr3.length;k++){
						  if(arr3[k]==arr3[k+1]){
							for(var m=0;m<$(".holdercard").length;m++){
								if(arr3[k]==$(".holdercard").eq(m).html()&&arr3[k]!="请填写"){
									$(".holdercard").eq(m).css("color","red");
								}
							}  
						  }
					  }*/
					  
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
			  if($("td").eq(i).css("color")=="rgb(255, 0, 0)"){
					 layer.msg("请检查页面加红的数据!",{time:2000});
					 return;
				 }
		  }
		  $(".loading").css("display","block");
		  //从页面获取全部数据
		  var arr=[];
		  for(var i=0;i<$(".holderno").length;i++){
			  var obj={
					  "holderno":$(".holderno").eq(i).html(),
					  "holdername":$(".holdername").eq(i).html(),
					  "sexname":$(".sex").eq(i).html(),
					  "deptno":$(".dept").eq(i).html(),
					  "emptype":$(".emptype").eq(i).html(),
					  //"titleno":$(".job").eq(i).html(),
					  "holdercard":$(".holdercard").eq(i).html(),
					  "idcode":$(".idcode").eq(i).html(),
					  "startdate":$(".inJobTime").eq(i).html(),
			  };
			  arr.push(obj);
		  }
		  console.log(arr)
		  //从页面获取全部工号
		  var holdernoList=[];
		  var reg=/^[0-9a-zA-Z]+$/;
		  for(var i=0;i<$(".holderno").length;i++){
			  var holderno=$(".holderno").eq(i).html();
			  console.log(holderno);
			  if(!reg.test(holderno)){
				  $(".holderno").eq(i).css("color","red");
				  layer.msg("工号格式错误!",{time:2000});
				  $(".loading").css("display","none");
				  return;
			  }
			  var obj={
					  "holderno":$(".holderno").eq(i).html()
			  }
			  holdernoList.push(obj);
		  }
		  console.log(holdernoList)
		  //从页面获取全部部门
		  var deptList=[];
		  for(var i=0;i<$(".dept").length;i++){
			  var obj={
					  "dept":$(".dept").eq(i).html()
			  }
			  deptList.push(obj);
		  }
		  console.log(deptList)
		  //从页面获取全部身份证号
		  var idcodeList=[];
		  var reg1=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
		  for(var i=0;i<$(".idcode").length;i++){
			  if(!reg1.test($(".idcode").eq(i).html())){
				  $(".idcode").eq(i).css("color","red");
				  layer.msg("身份证号格式错误!");
				  $(".loading").css("display","none");
				  return;
			  }
			  var obj={
					  "idcode":$(".idcode").eq(i).html()
			  }
			  idcodeList.push(obj);
		  }
		  console.log(idcodeList)
		  //从页面获取全部卡号
		  var holdercardList=[];
		  var reg2=/^[0-9a-zA-Z]+$/;
		  for(var i=0;i<$(".holdercard").length;i++){
			  var obj={
					  "holdercard":$(".holdercard").eq(i).html()
			  }
			  holdercardList.push(obj);
		  }
		  console.log(holdercardList)
	    $.ajax({ 
	        url : url+"/HolderData/ExcelAdd",
	        type : 'POST',
	        contentType:"application/json", // 指定这个协议很重要
	        data:JSON.stringify({
	        	"Deptlist":deptList,
	        	"IDlist":idcodeList,
	        	"NOlist":holdernoList,
	        	"Datalist":arr,
	        	"Cardlist":holdercardList
	        	
	        }),
	        dataType:"json",
	        success : function(data) {
	        	 $(".loading").css("display","none");
	        	console.log(data);
	        	if(data.flag){
	        		layer.msg(data.reason,{icon:1,time:2000});
				}else{
					//给重复的部门或不存在的部门加红
					var notdeptList=data.notdeptlist;
					notdeptList=Array.from(new Set(notdeptList));
					//console.log(notdeptList);
					for(var i=0;i<$(".dept").length;i++){
						 for(var k=0;k<notdeptList.length;k++){
							 if($(".dept").eq(i).html()==notdeptList[k]){
								 $(".dept").eq(i).css("color","red");
							 }
						 }
					  }
					
					
					//给重复的工号加红
					var holdernolist=data.holdernolist;
					holdernolist=Array.from(new Set(holdernolist));
					for(var i=0;i<$(".holderno").length;i++){
						for(var k=0;k<holdernolist.length;k++){
							if($(".holderno").eq(i).html()==holdernolist[k]){
								$(".holderno").eq(i).css("color","red");
							}
						}
					}
					
					/*//给重复的卡号加红
					var Cardlist=data.cardlist;
					Cardlist=Array.from(new Set(Cardlist));
					for(var i=0;i<$(".holdercard").length;i++){
						for(var k=0;k<Cardlist.length;k++){
							if($(".holdercard").eq(i).html()==Cardlist[k]){
								$(".holdercard").eq(i).css("color","red");
							}
						}
					}*/
					
					//给重复的身份证加红
					var IDnumberlist=data.idnumberlist;
					IDnumberlist=Array.from(new Set(IDnumberlist));
					for(var i=0;i<$(".idcode").length;i++){
						for(var k=0;k<IDnumberlist.length;k++){
							if($(".idcode").eq(i).html()==IDnumberlist[k]){
								$(".idcode").eq(i).css("color","red");
							}
						}
					}
					layer.msg(data.reason,{icon:2,time:2000});
					
				}
	        }
	     })
});
