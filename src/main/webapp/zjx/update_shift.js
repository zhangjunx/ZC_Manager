$(function(){
	$(".datee").attr("disabled","disabled");
	$(".date").attr("disabled","disabled");
})
	//线路一时间跟随改变
	$("#workfirsttime").change(function(){
		$(".time1").html($("#workfirsttime").val())
		//console.log($(".time1").html())
	})
	jeDate('#workfirsttime', {
   	    ishmsVal:true,      
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#workfirsttime").change();
	                	}
	})

	$("#starttime").change(function(){
		$(".time2").html($("#starttime").val())
		console.log($(".time2").html())
	})
	jeDate('#starttime', {
 		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#starttime").change();
	                	}
	})

	$("#worklasttime").change(function(){
		
		$(".time3").html($("#worklasttime").val())
		console.log($(".time3").html())
	})
	jeDate('#worklasttime', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#worklasttime").change();
	                	}
	})

	$("#leavefirsttime").change(function(){
		
		$(".time4").html($("#leavefirsttime").val())
		console.log($(".time4").html())
	})
	jeDate('#leavefirsttime', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#leavefirsttime").change();
	                	}
	})

	$("#endtime").change(function(){
		
		$(".time5").html($("#endtime").val())
		console.log($(".time5").html())
	})
	jeDate('#endtime', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#endtime").change();
	                	}
	})

	$("#leavelasttime").change(function(){
		
		$(".time6").html($("#leavelasttime").val())
		console.log($(".time6").html())
	})
	jeDate('#leavelasttime', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#leavelasttime").change();
	                	}
	})
	//线路二时间跟随改变
	$("#workfirsttime2").change(function(){
		
		$(".time7").html($("#workfirsttime2").val())
		console.log($(".time7").html())
	})
	jeDate('#workfirsttime2', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#workfirsttime2").change();
	                	}
	})

	$("#starttime2").change(function(){
		
		$(".time8").html($("#starttime2").val())
		console.log($(".time8").html())
	})
	jeDate('#starttime2', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#starttime2").change();
	                	}
	})

	$("#worklasttime2").change(function(){
		
		$(".time9").html($("#worklasttime2").val())
		console.log($(".time9").html())
	})
	jeDate('#worklasttime2', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#worklasttime2").change();
	                	}
	})

	$("#leavefirsttime2").change(function(){
		
		$(".time10").html($("#leavefirsttime2").val())
		console.log($(".time10").html())
	})
	jeDate('#leavefirsttime2', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#leavefirsttime2").change();
	                	}
	})

	$("#endtime2").change(function(){
		
		$(".time11").html($("#endtime2").val())
		console.log($(".time11").html())
	})
	jeDate('#endtime2', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#endtime2").change();
	                	}
	})

	$("#leavelasttime2").change(function(){
		
		$(".time12").html($("#leavelasttime2").val())
		console.log($(".time12").html())
	})

	jeDate('#leavelasttime2', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#leavelasttime2").change();
	                	}
	})

	//线路三时间跟随改变
	$("#workfirsttime3").change(function(){
		
		$(".time13").html($("#workfirsttime3").val())
		console.log($(".time13").html())
	})
	jeDate('#workfirsttime3', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#workfirsttime3").change();
	                	}
	})

	$("#starttime3").change(function(){
		
		$(".time14").html($("#starttime3").val())
		console.log($(".time14").html())
	})
	jeDate('#starttime3', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#starttime3").change();
	                	}
	})

	$("#worklasttime3").change(function(){
		
		$(".time15").html($("#worklasttime3").val())
		console.log($(".time15").html())
	})
	jeDate('#worklasttime3', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#worklasttime3").change();
	                	}
	})

	$("#leavefirsttime3").change(function(){
		
		$(".time16").html($("#leavefirsttime3").val())
		console.log($(".time16").html())
	})
	jeDate('#leavefirsttime3', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#leavefirsttime3").change();
	                	}
	})

	$("#endtime3").change(function(){
		
		$(".time17").html($("#endtime3").val())
		console.log($(".time17").html())
	})
	jeDate('#endtime3', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#endtime3").change();
	                	}
	})

	$("#leavelasttime3").change(function(){
		
		$(".time18").html($("#leavelasttime3").val())
		console.log($(".time18").html())
	})

	jeDate('#leavelasttime3', {
//		isinitVal:true, 
	    format:"hh:mm",
	                donefun:function(obj){
	                	$("#leavelasttime3").change();
	                	}
	})

	//不选中不能改变input框的值
	$(".checkbox").click(function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			for(var i=0;i<3;i++){
				$(this).siblings().eq(i).children().eq(1).attr("disabled","disabled");
				$(this).siblings().eq(i).children().eq(2).attr("disabled","disabled");
			}
			
		}else{
			$(this).addClass("curr");
			for(var i=0;i<3;i++){
			$(this).siblings().eq(i).children().eq(1).removeAttr("disabled");
			$(this).siblings().eq(i).children().eq(2).removeAttr("disabled");
			}
		}
	})

	//通过shiftno查询对应的班次信息
	queryShiftUnionSection();
	var val;
	//通过shiftno查询对应的班次信息
	function queryShiftUnionSection(){
		var shiftno=localStorage.shiftno;
		$.ajax({
			url:url+"/KQ_ShiftData/queryShiftUnionSection",
			type:"post",
			data:{"shiftno":shiftno},
			success:function(data){
				if(data.status=="real"){
					layer.msg("班次正在被使用，请谨慎修改!",{time:3000});
				}
				console.log(data);
				var res=data.result;
				if(data.flag){
					val=res[1].codeno;
					$(".CheckF").find(".img_s").removeClass("block");
					$("#shiftname").val(res[1].shiftname).attr("data-shiftno",res[1].shiftno);
					$("#Abbreviation").val(res[1].nickname);
					$("#remark").val(res[1].remark);
					var codeno=res[1].codeno;
					codeno=codeno.substring(1,2);
					codeno=codeno-1;
					$(".CheckF").eq(codeno).find(".img_s").addClass("block");
					for(var item of res[1].child){
						if(item.classno=="班段一"){
							if(item.sectionstatus=="上班"){
								$("#workfirsttime").val(item.workearliest);
								$("#starttime").val(item.worktime);
								$("#worklasttime").val(item.worklatest);
								$("#workfirsttime").prev().find("option:selected").html(item.whichday);
								$("#checkbox1").click();
								$(".time1").html(item.workearliest);
								$(".time2").html(item.worktime);
								$(".time3").html(item.worklatest);
								$("#checkbox1").attr("data-sectionno",item.sectionno);
							}else{
								$("#leavefirsttime").val(item.workearliest);
								$("#endtime").val(item.worktime);
								$("#leavelasttime").val(item.worklatest);
								$("#leavefirsttime").prev().find("option:selected").html(item.whichday);
								$("#checkbox2").click();
								$(".time4").html(item.workearliest);
								$(".time5").html(item.worktime);
								$(".time6").html(item.worklatest);
								$("#checkbox2").attr("data-sectionno",item.sectionno);
							}
						}else if(item.classno=="班段二"){
							if(item.sectionstatus=="上班"){
								$("#workfirsttime2").val(item.workearliest);
								$("#starttime2").val(item.worktime);
								$("#worklasttime2").val(item.worklatest);
								$("#workfirsttime2").prev().find("option:selected").html(item.whichday);
								$("#checkbox3").click();
								$(".time7").html(item.workearliest);
								$(".time8").html(item.worktime);
								$(".time9").html(item.worklatest);
								$("#checkbox3").attr("data-sectionno",item.sectionno);
							}else{
								$("#leavefirsttime2").val(item.workearliest);
								$("#endtime2").val(item.worktime);
								$("#leavelasttime2").val(item.worklatest);
								$("#leavefirsttime2").prev().find("option:selected").html(item.whichday);
								$("#checkbox4").click();
								$(".time10").html(item.workearliest);
								$(".time11").html(item.worktime);
								$(".time12").html(item.worklatest);
								$("#checkbox4").attr("data-sectionno",item.sectionno);
							}
						}else{
							if(item.sectionstatus=="上班"){
								$("#workfirsttime3").val(item.workearliest);
								$("#starttime3").val(item.worktime);
								$("#worklasttime3").val(item.worklatest);
								$("#workfirsttime3").prev().find("option:selected").html(item.whichday);
								$("#checkbox5").click();
								$(".time13").html(item.workearliest);
								$(".time14").html(item.worktime);
								$(".time15").html(item.worklatest);
								$("#checkbox5").attr("data-sectionno",item.sectionno);
							}else{
								$("#leavefirsttime3").val(item.workearliest);
								$("#endtime3").val(item.worktime);
								$("#leavelasttime3").val(item.worklatest);
								$("#leavefirsttime3").prev().find("option:selected").html(item.whichday);
								$("#checkbox6").click();
								$(".time16").html(item.workearliest);
								$(".time17").html(item.worktime);
								$(".time18").html(item.worklatest);
								$("#checkbox6").attr("data-sectionno",item.sectionno);
							}
						}
						
					}
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	}
	//点击选中颜色
	var coden;
	$(".CheckF").click(function(){
		$(".img_s").removeClass("block")
		$(this).children().eq(1).addClass("block");
		coden= $(this).children().eq(0).val()
		
	})

	//班次简称  失焦事件
	$("#Abbreviation").blur(function(){
		 if($("#Abbreviation").val().length>2){
	 		$("#Abbreviation").next().css("display","inline-block");
	 	 }else{
	 		$("#Abbreviation").next().css("display","none");
	 	 }
	})

	//添加班次
	$("#sure").click(function(){
					 var shiftno=$("#shiftname").attr("data-shiftno"); 
					 var myDate = new Date();             
				     var year=myDate.getFullYear();//获取当前年
				     var month = myDate.getMonth()+1;
				     var day = myDate.getDate();
				     //班段一
					 var workfirst = $("#workfirsttime").val();//上班允许最早打卡时间
					 var worktime = $("#starttime").val();//上班正常工作时间
					 var worklasttime=$("#worklasttime").val();
					 var leavefirst=$("#leavefirsttime").val();
					 var leaveend=$("#endtime").val();
					 var leavelast=$("#leavelasttime").val();
					 var workfirsttime = new Date(year+"/"+month+"/"+day+"/"+workfirst);
					 var worknormaltime = new Date(year+"/"+month+"/"+day+"/"+worktime);
					 worklasttime = new Date(year+"/"+month+"/"+day+"/"+worklasttime);
					 leavefirst = new Date(year+"/"+month+"/"+day+"/"+leavefirst);
					 leaveend = new Date(year+"/"+month+"/"+day+"/"+leaveend);
					 leavelast = new Date(year+"/"+month+"/"+day+"/"+leavelast);
					 workfirsttime = workfirsttime.getTime();
					 worknormaltime = worknormaltime.getTime();
					 worklasttime = worklasttime.getTime();
					 leavefirst = leavefirst.getTime();
					 leaveend = leaveend.getTime();
					 leavelast = leavelast.getTime();
					 console.log(leavefirst);
					 if($("#checkbox1").hasClass("curr")){
						 if(worknormaltime<workfirsttime){
							 layer.msg("班段一上班打卡工作时间不能小于最早打卡时间!",{time:2000});
							 return;
						 }
						 if(worklasttime<worknormaltime){
							 layer.msg("班段一上班最晚打卡时间不能小于工作打卡时间!",{time:2000});
							 return;
						 }
					 }
					 if($("#checkbox2").hasClass("curr")){
						 if($(".datee1 option:selected").html()=="当日"){
							 if(leavefirst<worklasttime){
								 layer.msg("班段一下班最早打卡时间不能小于上班最晚打卡时间!",{time:2000});
								 return;
							 }
						 }
						 if(leaveend<leavefirst){
							 layer.msg("班段一下班打卡时间不能小于最早打卡时间!",{time:2000});
							 return;
						 }
						 if(leavelast<leaveend){
							 layer.msg("班段一下班最晚打卡时间不能小于下班打卡时间!",{time:2000});
							 return;
						 }
						 
					 }
					 
					
					//班段二
					 var workfirst1 = $("#workfirsttime2").val();//上班允许最早打卡时间
					 var worknormal1 = $("#starttime2").val();//上班正常工作时间
					 var worklasttime1=$("#worklasttime2").val();
					 var leavefirst1=$("#leavefirsttime2").val();
					 var leaveend1=$("#endtime2").val();
					 var leavelast1=$("#leavelasttime2").val();
					 workfirst1 = new Date(year+"/"+month+"/"+day+"/"+workfirst1);
					 worknormal1 = new Date(year+"/"+month+"/"+day+"/"+worknormal1);
					 worklasttime1 = new Date(year+"/"+month+"/"+day+"/"+worklasttime1);
					 leavefirst1 = new Date(year+"/"+month+"/"+day+"/"+leavefirst1);
					 leaveend1 = new Date(year+"/"+month+"/"+day+"/"+leaveend1);
					 leavelast1 = new Date(year+"/"+month+"/"+day+"/"+leavelast1);
					 workfirst1 = workfirst1.getTime();
					 worknormal1 = worknormal1.getTime();
					 worklasttime1 = worklasttime1.getTime();
					 leavefirst1 = leavefirst1.getTime();
					 leaveend1 = leaveend1.getTime();
					 leavelast1 = leavelast1.getTime();
					 console.log(leavefirst);
					 if($("#checkbox3").hasClass("curr")){
						 if(worknormal1<workfirst1){
							 layer.msg("班段二上班打卡工作时间不能小于最早打卡时间!",{time:2000});
							 return;
						 }
						 if(worklasttime1<worknormal1){
							 layer.msg("班段二上班最晚打卡时间不能小于工作打卡时间!",{time:2000});
							 return;
						 }
					 }
					 if($("#checkbox4").hasClass("curr")){
						 if($(".datee4 option:selected").html()=="当日"){
							 if(leavefirst1<worklasttime1){
								 layer.msg("班段二下班最早打卡时间不能小于上班最晚打卡时间!",{time:2000});
								 return;
							 }
						 }
						 if(leaveend1<leavefirst1){
							 layer.msg("班段二下班打卡时间不能小于最早打卡时间!",{time:2000});
							 return;
						 }
						 if(leavelast1<leaveend1){
							 layer.msg("班段二下班最晚打卡时间不能小于下班打卡时间!",{time:2000});
							 return;
						 }
					 }
					 
					 
					 
					 
					 
					//班段三
					 var workfirst2 = $("#workfirsttime3").val();//上班允许最早打卡时间
					 var worknormal2 = $("#starttime3").val();//上班正常工作时间
					 var worklasttime2=$("#worklasttime3").val();
					 var leavefirst2=$("#leavefirsttime3").val();
					 var leaveend2=$("#endtime3").val();
					 var leavelast2=$("#leavelasttime3").val();
					 workfirst2 = new Date(year+"/"+month+"/"+day+"/"+workfirst2);
					 worknormal2 = new Date(year+"/"+month+"/"+day+"/"+worknormal2);
					 worklasttime2 = new Date(year+"/"+month+"/"+day+"/"+worklasttime2);
					 leavefirst2 = new Date(year+"/"+month+"/"+day+"/"+leavefirst2);
					 leaveend2 = new Date(year+"/"+month+"/"+day+"/"+leaveend2);
					 leavelast2 = new Date(year+"/"+month+"/"+day+"/"+leavelast2);
					 workfirst2 = workfirst2.getTime();
					 worknormal2 = worknormal2.getTime();
					 worklasttime2 = worklasttime2.getTime();
					 leavefirst2= leavefirst2.getTime();
					 leaveend2 = leaveend2.getTime();
					 leavelast2 = leavelast2.getTime();
					 console.log(leavefirst);
					 if($("#checkbox5").hasClass("curr")){
						 if(worknormal2<workfirst2){
							 layer.msg("班段三上班打卡工作时间不能小于最早打卡时间!",{time:2000});
							 return;
						 }
						 if(worklasttime2<worknormal2){
							 layer.msg("班段三上班最晚打卡时间不能小于工作打卡时间!",{time:2000});
							 return;
						 }
					 }
					 if($("#checkbox6").hasClass("curr")){
						 if($(".datee7 option:selected").html()=="当日"){
							 if(leavefirst2<worklasttime2){
								 layer.msg("班段三下班最早打卡时间不能小于上班最晚打卡时间!",{time:2000});
								 return;
							 }
						 }
						 if(leaveend2<leavefirst2){
							 layer.msg("班段三下班打卡时间不能小于最早打卡时间!",{time:2000});
							 return;
						 }
						 if(leavelast2<leaveend2){
							 layer.msg("班段三下班最晚打卡时间不能小于下班打卡时间!",{time:2000});
							 return;
						 }
					 }
					
					 
					 
			    	 var shiftname =  $("#shiftname").val();//班次名称
			    	 var emptype =  $("#Abbreviation").val();//班次简称
			    	 var remark = $("#remark").val();//备注
			    	 var codeno = coden; //选中颜色
			    	 if(coden==undefined){
			    		 codeno=val;
			    	 }
			    	 console.log(localStorage.shiftno,codeno)
			    	 if(shiftname==""||emptype==""){
			    		 layer.msg("请输入班次名称和班次简称!",{time:2000});
			    		 return;
			    	 }
			    	 if($("#Abbreviation").val().length>2){
			    		 $("#Abbreviation").focus();
			    		 return;
			    	 }
			    	 var arr=[];
			    	 for(var i=0;i<$(".checkbox").length;i++){
			    		 if($(".checkbox").eq(i).hasClass("curr")){
			    			 if($(".checkbox").eq(i).html()=="上班打卡："){
			    				 var text="上班";
			    			 }else{
			    				 var text="下班";
			    			 }
			    			 var sectionno=$(".checkbox").eq(i).attr("data-sectionno");
			    			 var workearliest=$(".checkbox").eq(i).siblings().eq(0).children().eq(2).val();
			    			 if(workearliest==""){
			    				layer.msg("请完善班段信息!",{time:2000});
			    				return;
			    			 }else if(workearliest.length!=8){
			    				 workearliest=workearliest+":00";
			    			 }
			    			 var worktime=$(".checkbox").eq(i).siblings().eq(1).children().eq(1).val();
			    			 if(worktime==""){
			    				 layer.msg("请完善班段信息!",{time:2000});
				    			 return;
			    			 }else if(worktime.length!=8){
			    				 worktime=worktime+":00";
			    			 }
			    			 var worklatest=$(".checkbox").eq(i).siblings().eq(2).children().eq(1).val();
			    			 if(worklatest==""){
			    				 layer.msg("请完善班段信息!",{time:2000});
				    			 return;
			    			 }else if(worklatest.length!=8){
			    				 worklatest=worklatest+":00";
			    			 }
			    			 var obj={
			    					 "classno":$(".checkbox").eq(i).parent().siblings().eq(0).html(),
			    					 "sectionstatus":text,
			    					 "whichday":$(".checkbox").eq(i).siblings().eq(0).children().eq(1).find("option:selected").html(),
			    					 "workearliest":workearliest,
			    					 "worktime":worktime,
			    					 "worklatest":worklatest,
			    					/* "sectionno":parseInt(sectionno),*/
			    					 "nodeorder":i+1,
			    					 "shiftno":shiftno
			    					 }
			    			 arr.push(obj);
			    		 }
			    	 }
			    	 console.log(arr)
			    	 if(arr.length==0){
			    		 layer.msg("请完善班段信息!",{time:2000});
			    		 return;
			    	 }
			    		var date=new Date();
			    		var month=date.getMonth()+1;
			    		if(month<10){
			    			month="0"+month;
			    		}
			    	 $.ajax({
			        		type:"post",
							url:url+"/KQ_ShiftData/updateShiftUnionSection",
							data:JSON.stringify({
								"shiftname":shiftname,
								"nickname":emptype,
								"remark":remark,
								"codeno":codeno,
								"monthno":month,
								"shiftno":localStorage.shiftno,
								 "list":arr,
							    }),
							contentType: "application/json;charset=utf-8",
							dataType: "json",
							async:false,
							success:function(data){
								console.log(data);
								if(data.flag){
									layer.msg(data.reason,{time:2000})
								}else{
									layer.msg(data.reason,{time:2000});
								}
							 }
					 })
	});//end
