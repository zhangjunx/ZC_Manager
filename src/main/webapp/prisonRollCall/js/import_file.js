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
		var index=layer.load(2);
		$.ajax({
	        url:url+"/prisoner/selectPerWithImport",//后台检查Excel表格中的数据
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
							var prisonerName=(item[0]==undefined?"":item[0]);
							var prisonerName2=(item[1]==undefined?"":item[1]);
							var prisonID=(item[2]==undefined?"":item[2]);
							var IDCard=(item[3]==undefined?"":item[3]);
							var age=(item[4]==undefined?"":item[4]);
							var sex=(item[5]==undefined?"":item[5]);
							var nationality=(item[6]==undefined?"":item[6]);
							var nation=(item[7]==undefined?"":item[7]);
							var skill=(item[8]==undefined?"":item[8]);
							var political=(item[9]==undefined?"":item[9]);
							var homeLocal=(item[10]==undefined?"":item[10]);
							var graduationSchool=(item[11]==undefined?"":item[11]);
							var major=(item[12]==undefined?"":item[12]);
							var marriage=(item[13]==undefined?"":item[13]);
							var inStartTime=(item[14]==undefined?"":item[14]);
							var inReason=(item[15]==undefined?"":item[15]);
							var arrestingOrgan=(item[16]==undefined?"":item[16]);
							var judgmentOrgan=(item[17]==undefined?"":item[17]);
							var startTime=(item[18]==undefined?"":item[18]);
							var endTime=(item[19]==undefined?"":item[19]);
							
							var $tr=$("<tr></tr>");
							var $td1=$("<td class='prisonerName'></td>");
							var $td2=$("<td class='prisonerName2'></td>");
							var $td3=$("<td class='prisonID'></td>");
							var $td4=$("<td class='IDCard'></td>");
							var $td5=$("<td class='age'></td>");
							var $td6=$("<td class='sex'></td>");
							var $td7=$("<td class='nationality'></td>");
							var $td8=$("<td class='nation'></td>");
							var $td9=$("<td class='skill'></td>");
							var $td10=$("<td class='political'></td>");
							var $td11=$("<td class='homeLocal'></td>");
							var $td12=$("<td class='graduationSchool'></td>");
							var $td13=$("<td class='major'></td>");
							var $td14=$("<td class='marriage'></td>");
							var $td15=$("<td class='inStartTime'></td>");
							var $td16=$("<td class='inReason'></td>");
							var $td17=$("<td class='arrestingOrgan'></td>");
							var $td18=$("<td class='judgmentOrgan'></td>");
							var $td19=$("<td class='startTime'></td>");
							var $td20=$("<td class='endTime'></td>");
							
							$td1.append(prisonerName);
							$td2.append(prisonerName2);
							$td3.append(prisonID);
							$td4.append(IDCard);
							$td5.append(age);
							$td6.append(sex);
							$td7.append(nationality);
							$td8.append(nation);
							$td9.append(skill);
							$td10.append(political);
							$td11.append(homeLocal);
							$td12.append(graduationSchool);
							$td13.append(major);
							$td14.append(marriage);
							$td15.append(inStartTime);
							$td16.append(inReason);
							$td17.append(arrestingOrgan);
							$td18.append(judgmentOrgan);
							$td19.append(startTime);
							$td20.append(endTime);
							$tr.append($td1);
							$tr.append($td2);
							$tr.append($td3);
							$tr.append($td4);
							$tr.append($td5);
							$tr.append($td6);
							$tr.append($td7);
							$tr.append($td8);
							$tr.append($td9);
							$tr.append($td10);
							$tr.append($td11);
							$tr.append($td12);
							$tr.append($td13);
							$tr.append($td14);
							$tr.append($td15);
							$tr.append($td16);
							$tr.append($td17);
							$tr.append($td18);
							$tr.append($td19);
							$tr.append($td20);
							$("#dayindaju1").append($tr);
					};
					 //判断身份证号是否重复
					  var arr2=[];
					  for(var i=0;i<$(".IDCard").length;i++){
						  if($(".IDCard").eq(i).html()!=""){
							  arr2.push($(".IDCard").eq(i).html());
						  }
					  }
					  arr2=arr2.sort();
					  for(var k=0;k<arr2.length;k++){
						  if(arr2[k]==arr2[k+1]){
							  for(var m=0;m<$(".IDCard").length;m++){
								  if(arr2[k]==$(".IDCard").eq(m).html()){
									  $(".IDCard").eq(m).css("color","red");
								  }
							  }
						  }
					  }
					$("tbody").attr("id","page")
					layer.msg(data.reason,{time:1000});
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
		  var index=layer.load(2);
		  //从页面获取全部身份证号
		  var idcodeList=[];
		  var reg1=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
		  for(var i=0;i<$(".idcode").length;i++){
			  if(!reg1.test($(".IDCard").eq(i).html())){
				  $(".IDCard").eq(i).css("color","red");
				  layer.msg("身份证号格式错误!");
				  layer.close(index);
				  return;
			  }
		  }
		  //从页面获取全部数据
		  var arr=[];
		  for(var i=0;i<$(".prisonerName").length;i++){
			  var obj={
					  "prisonerName":$(".prisonerName").eq(i).html().trim(),
					  "prisonerName2":$(".prisonerName2").eq(i).html().trim(),
					  "prisonID":$(".prisonID").eq(i).html().trim(),
					  "IDCard":$(".IDCard").eq(i).html().trim(),
					  "age":$(".age").eq(i).html().trim(),
					  "sex":$(".sex").eq(i).html().trim(),
					  "nationality":$(".nationality").eq(i).html().trim(),
					  "nation":$(".nation").eq(i).html().trim(),
					  "skill":$(".skill").eq(i).html().trim(),
					  "political":$(".political").eq(i).html().trim(),
					  "homeLocal":$(".homeLocal").eq(i).html(),
					  "graduationSchool":$(".graduationSchool").eq(i).html().trim(),
					  "marriage":$(".marriage").eq(i).html().trim(),
					  "inStartTime":$(".inStartTime").eq(i).html().trim(),
					  "inReason":$(".inReason").eq(i).html().trim(),
					  "arrestingOrgan":$(".arrestingOrgan").eq(i).html().trim(),
					  "judgmentOrgan":$(".judgmentOrgan").eq(i).html().trim(),
					  "startTime":$(".startTime").eq(i).html().trim(),
					  "endTime":$(".endTime").eq(i).html().trim(),
					  "operator":window.top.holderno
			  };
			  arr.push(obj);
		  }
		  console.log(arr);
	    $.ajax({ 
	        url : url+"/prisoner/insertPerWithImport",
	        type : 'POST',
	        /*contentType:"application/json", // 指定这个协议很重要
*/	        data:{"parmList":JSON.stringify(arr)},
	        dataType:"json",
	        success : function(data) {
	        	layer.close(index);
	        	console.log(data);
	        	if(data.flag){
	        		layer.msg(data.reason,{time:2000});
				}else{
					/*//给重复的部门或不存在的部门加红
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
					*/
					layer.msg(data.reason,{time:2000});
					
				}
	        },
	        error:function(){
	        	layer.close(index);
	        }
	     })
});
