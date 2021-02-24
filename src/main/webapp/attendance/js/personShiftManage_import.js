$(function(){
	$("#excelimport").change(function(e){
		postData();
		//清空input
		e.target.value = '';
	});//end
	layui.use('form', function(){
		  var form = layui.form;
		});
	//给搜索框年份赋值
	var myDate = new Date(); 
	for(var i=1;i<=12;i++){
		var $opt=$("<option value='"+i+"'></option>");
		$opt.append(i+"月");
		$(".month").append($opt);
	}
	 var month = myDate.getMonth()+1;//月份
	 $(".month option[value='"+month+"']").attr("selected","selected");
	
	
	var page=1;//当前页
	var limit=10;//每页显示条数
	var total;
	//分页
	function getPage(total){
		layui.use("laypage",function(){
			var laypage=layui.laypage;
			laypage.render({
				elem:"test",
				limit:limit,//每页显示条数
				count:total,//总条数
				layout:['count','prev','page','next','limit','refresh','skip'],
				jump:function(obj,first){
					page=obj.curr;
					limit=obj.limit;
					pagination(1,10,total);
					if(!first){
						pagination(page,limit,total);
					}
				}
			})
		})
	}//end
	
	function postData(){
		 var formData = new FormData();
		 var excle = $("#excelimport").val();
		 formData.append("file",$("#excelimport")[0].files[0]);
		//文件名可以带空格
	    var reg = /^.*\.(?:xls|xlsx)$/i;
		//校验不通过
		if(!reg.test(excle)) {
			layer.msg("请上传excel格式的文件!",{icon:3,time:4000}); 
			$("#cont1").empty();
		}else{
			var index=layer.load(2);
			$.ajax({
		        url:url+"/KQ_Arrange/checkExcelData",//后台检查Excel表格中的数据
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
		          $("#cont1").empty();
		          var res=data.result;
		         if(data.flag){
		        	 for(var i=1;i<res.length;i++){
		        		 var $tr=$("<tr></tr>");
		        		 for(var k=0;k<res[i].length;k++){
		        			 var $td=$("<td data-day="+k+">"+res[i][k]+"</td>");
							 if(k!=0){
								$td.attr("class","cellTd");        				 
							 }else{
								 $td.attr("class","cellHolderno")
							 }
		        			 $tr.append($td);
		        		 }
		        		 $("#cont1").append($tr);
		        	 }
		         }else{
		        	 layer.msg(data.reason,{time:2000});
		         }
		        },
		        error:function(){
		        	layer.close(index);
		        }
		     })
		 }
		
	}
//点击确定导入
	$("#determine").click(function(){
		var index=layer.load(2);
		var yearno=$(".year").val();
		var monthno=$(".month").val();
		var list=[];
		for(var k=0;k<$("#cont1 tr").length;k++){
			var holderno=$("#cont1 tr").eq(k).children().eq(0).html();
			holderno= holderno.replace(/[^0-9]/ig,"");
			for(var i=0;i<$(".cellTd").length;i++){
				var obj={
						"yearno":yearno,
						"monthno":monthno,
						"day":$(".cellTd").eq(i).attr("data-day"),
						"holderno":holderno,
						"nickname":$(".cellTd").eq(i).html()
				}
				list.push(obj);
			}
		}
		$.ajax({
			url:url+"/KQ_Arrange/ImportExcelArray",
			type:"post",
			data:JSON.stringify({
				"list":list
			}),
			contentType:"application/json",
			success:function(data){
				layer.close(index);
				layer.msg(data.reason,{time:2000});
			},
			error:function(data){
				layer.close(index);
			}
		})
	})
	//月份下拉框的改变事件
	$(".month").change(function(){
		$(".da_date").empty();
		$(".da_week").empty();
		 var month=$(".month").val();
		 var year=$(".year").val();
		 var curDate = new Date(year,month,0);
		 curDate=curDate.getDate();
		 getEvryDay(curDate);
		if(month<10){
			month="0"+month;
		}
	})
	systemYearTime();
	//给年份下拉框赋值
	function systemYearTime(){
		var date=new Date();
		var year=date.getFullYear();
		var yearPrev=year-1;
		var yearNext=parseInt(year)+1;
		var $opt1=$("<option value='"+year+"'></option>");
		var $opt2=$("<option value='"+yearPrev+"'></option>");
		var $opt3=$("<option value='"+yearNext+"'></option>");
		$opt1.append(year+"年");
		$opt2.append(yearPrev+"年");
		$opt3.append(yearNext+"年");
		$(".year").append($opt1);
		$(".year").append($opt2);
		$(".year").append($opt3);
		$(".year option[value='"+year+"']").attr("selected","selected");
	}
	
	
	 //获取每月多少天数
    function getCountDays() {
	        var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var d = new Date(year, month, 0);
			return d.getDate();
	}
	var day=getCountDays();
	//获取日和周
	function getEvryDay(day){
		var myDate = new Date();             
	    var year=$(".year").val();//获取当前年
	    var month = $(".month").val();//月份
	    $(".dayue").html(month);
	    var $td2=$("<td rowspan='2'></td>")
	    $td2.append("姓名");
	    $(".da_date").append($td2);
		for (var k = 1; k <= day; k++) {
			var $td =$("<td width='100'></td>");
			$td.append(k);
			$(".da_date").append($td);
			var now=`${year}-${month}-${k}`
			var date=new Date(now);
			var week;
			if(date.getDay()==0) week="日"
		    if(date.getDay()==1) week="一"
			if(date.getDay()==2) week="二"
			if(date.getDay()==3) week="三"
			if(date.getDay()==4) week="四"
			if(date.getDay()==5) week="五"
			if(date.getDay()==6) week="六"
		    var $td1=$("<td width='100' data-no='"+k+"' class='week'></td>")
		    $td1.append(week);
			if(week=="六"||week=="日"){
				$td1.css("background","#eee");
			}
		    $(".da_week").append($td1);
		   }
		
		
		};
		//获取日和周
		getEvryDay(day);
		//分页
		function pagination(curr, limit, count) {
		    var dep = document.getElementById("cont1");
		    var departmentInfo = document.getElementsByTagName("table")
		    startRow = (curr - 1) * limit  //每页显示第一条数据的行数
		    lastRow = curr * limit //每页显示最后一条数据的行数
		    var totalRow = count
		    lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
		    for (var i = 0; i <totalRow; i++) { //遍历数据
		        var hrow = dep.rows[i]
		        if (i >= startRow && i < lastRow) {
		            hrow.style.display = ""
		        } else {
		            hrow.style.display = "none"
		        }
		    }
		}
})


