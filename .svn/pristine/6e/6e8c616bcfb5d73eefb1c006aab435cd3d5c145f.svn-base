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

//选择文件  即是导入Excel文件
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
	        url:url+"/DepartmentData/readExcelData",//后台检查Excel表格中的数据
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
				  return;
				}
	          for(var item of res){
					var departmentno=(item[0]==undefined?"":item[0]);
					var departmentname=(item[1]==undefined?"":item[1]);
					var underno=(item[2]==undefined?"":item[2]);
					var undername=(item[3]==undefined?"":item[3]);
					var description=(item[4]==undefined?"":item[4]);
					var html="<tr><td class='departmentno'>"+departmentno
					+"</td><td class='departmentname'>"+departmentname
					+"</td><td class='underno'>"+underno
					+"</td><td class='undername'>"+undername
					+"</td><td class='description'>"+description+"</td></tr>";
				
					$("#dayindaju1").append(html);
			};
			
			 //判断部门号是否重复
			  var arr1=[];
			  for(var i=0;i<$(".departmentno").length;i++){
				  arr1.push($(".departmentno").eq(i).html());
			  }
			  arr1=arr1.sort();
			  for(var k=0;k<arr1.length;k++){
				  if(arr1[k]==arr1[k+1]){
					for(var m=0;m<$(".departmentno").length;m++){
						if(arr1[k]==$(".departmentno").eq(m).html()){
							$(".departmentno").eq(m).css("color","red");
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
		  for(var i=0;i<$(".departmentno").length;i++){
			  if($(".departmentno").eq(i).html()==""){
				  layer.msg("部门号不能为空!",{time:2000});
				  return;
			  }
			  if($(".departmentname").eq(i).html()==""){
				  layer.msg("部门名称不能为空!",{time:2000});
				  return;
			  }
			  var obj={
					  "departmentno":$(".departmentno").eq(i).html(),
					  "departmentname":$(".departmentname").eq(i).html(),
					  "underno":"00"+$(".underno").eq(i).html(),
					  "description":$(".description").eq(i).html(),
			  };
			  arr.push(obj);
		  }
		  console.log(arr)
		  //从页面获取全部工号
		  /*var holdernoList=[];
		  var reg=/^[0-9a-zA-Z]+$/;
		  for(var i=0;i<$(".departmentno").length;i++){
			  var departmentno=$(".departmentno").eq(i).html();
			  console.log(departmentno);
			  if(!reg.test(departmentno)){
				  $(".departmentno").eq(i).css("color","red");
				  layer.msg("工号格式错误!",{time:2000});
				  $(".loading").css("display","none");
				  return;
			  }
			  var obj={"departmentno":$(".departmentno").eq(i).html()};
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
		  console.log(holdercardList)*/
	    $.ajax({ 
	        url : url+"/DepartmentData/ajaxUploadExcel",
	        type : 'POST',
	        contentType:"application/json", // 指定这个协议很重要
	        data:JSON.stringify(arr),
	        dataType:"json",
	        success : function(data) {
	        	console.log(data)
	        	 $(".loading").css("display","none");
	        	if(data.flag){
	        		layer.msg(data.reason,{time:2000});
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
					layer.msg(data.reason,{time:2000});
				}
	        }
	     })
});
