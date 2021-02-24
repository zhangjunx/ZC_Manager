	$(function(){
	//获取当前年份和月份
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	$(".mon").html(month+"月");
	$(".mon").attr("data-month",month);
	for(var i=0;i<2;i++){
		var $opt=$("<option value='"+year+"'></option>");
		$opt.append(year+"年");
		$(".year").append($opt);
		year=year-1;
	}
	//考勤分析
	AttendanceAnalysis();
	//年份下拉框监听事件
	$(".year").change(function(){
		createRl();
	})
	//点击左右按钮
	$(".mychartleft").click(function(){
		$(".mon").empty();
		var month=$(".mon").attr("data-month");
		if(month==1){
			$(".mon").html("12月");
			$(".mon").attr("data-month","12");
		}else{
			$(".mon").html(month-1+"月");
			$(".mon").attr("data-month",month-1);
		}
		createRl();
		AttendanceAnalysis();
	})
	$(".mychartright").click(function(){
		$(".mon").empty();
		var month=$(".mon").attr("data-month");
		if(month==12){
			$(".mon").html("1月");
			$(".mon").attr("data-month","1");
		}else{
			$(".mon").html(parseInt(month)+1+"月");
			$(".mon").attr("data-month",parseInt(month)+1);
		}
		createRl();
		AttendanceAnalysis();
	})
	//
	function  querySummary(){
		var yearno=$(".year").val();
		var monthno=$(".mon").attr("data-month");
		var holderno=window.top.holderno;
		var obj={"yearno":yearno,"monthno":monthno,"holderno":holderno};
		$.ajax({
			url:url+'/KQ_MonthData/querySummary',
			type:"post",
			data:obj,
			success:function(data){
				$(".normal").html("0");
				$(".rest").html("0");
				$(".delay").html("0");
				$(".early").html("0");
				$(".nowork").html("0");
				$(".holiday").html("0");
				$(".business").html("0");
				if(data.flag){
					var res=data.result;
					for(var item of res[0].child){
						if(item.status=="正常"){
							$(".normal").html(item.frequency);
						}else if(item.status=="休息"){
							$(".rest").html(item.frequency)
						}else if(item.status=="迟到"){
							$(".delay").html(item.frequency)
						}else if(item.status=="早退"){
							$(".early").html(item.frequency)
						}else if(item.status=="旷工"){
							$(".nowork").html(item.frequency)
						}else if(item.status=="请假"){
							$(".holiday").html(item.frequency)
						}else if(item.status=="出差"){
							$(".business").html(item.frequency)
						}
					}
				}
			}
			
		})
	}
	
	function queryStatistics(){
		var yearno=$(".year").val();
		var monthno=$(".mon").attr("data-month");
		var holderno=window.top.holderno;
		var obj={"yearno":yearno,"monthno":monthno,"holderno":holderno};
		$.ajax({
			url:url+'/daily/queryStatistics',
			type:"post",
			data:obj,
			success:function(data){
				$(".day").prev().find("span").html("");
				$(".day").next().html("无").css("background","#EEEEEE").css("color","#333");
				if(data.flag){
					var res=data.monthlist;
					var year=$(".year").val();
					var month=$(".mon").attr("data-month");
					if(month<10){
						month="0"+month;
					}
					for(var i=0;i<$(".day").length;i++){
						for(var item of res){
							var day=$(".day").eq(i).html();
							if(day<10){
								day="0"+day;
							}
							var time=year+"-"+month+"-"+day;
							if(time==item.analydate){
								if(item.status=="休息"){
									$(".day").eq(i).prev().find("span").html("休息");
								}else{
									$(".day").eq(i).prev().find("span").html(item.shiftname);
								}
								$(".day").eq(i).next().html(item.status);
								if(item.status=="正常"){
									$(".day").eq(i).next().css("background","#EEEEEE").css("color","#32A4FF");
								}else if(item.status=="出差"){
									$(".day").eq(i).next().css("background","#FCE9D2").css("color","#EE8509");
								}else if(item.status=="请假"){
									$(".day").eq(i).next().css("background","#F9B31F").css("color","#fff");
								}else if(item.status=="迟到"){
									$(".day").eq(i).next().css("background","#FF6A65").css("color","#fff");
								}else if(item.status=="休息"){
									$(".day").eq(i).next().css("background","#eee").css("color","#666");
								}else if(item.status=="旷工"){
									$(".day").eq(i).next().css("background","#FCD1E0").css("color","#EE3F75");
								}else if(item.status=="早退"){
									$(".day").eq(i).next().css("background","#DDD6FB").css("color","#603BF5");
								}
							}
						}
					}
				}
			}
			
		})
	}
	//创建日历
	function  createRl(){
		$(".day").html("0");
		$(".day").css("color","#ccc");
		//每月的第一天是周几
		var _year=$(".year").val();
		var _month=$(".mon").attr("data-month");
		var day=new Date(_year+"-"+_month+"-"+1);
		day=day.getDay();
		var totalDay=mGetDate(_year,_month);
		//如果第一天是周一
		if(day==1){
			for(var i=0;i<totalDay;i++){
				$(".day").eq(i).html(i+1).css("color","#666");
			}
		}
		//如果第一天是周二
		if(day==2){
			for(var i=0;i<totalDay;i++){
				$(".day").eq(i+1).html(i+1).css("color","#666");
			}
		}
		//如果第一天是周三
		if(day==3){
			for(var i=0;i<totalDay;i++){
				$(".day").eq(i+2).html(i+1).css("color","#666");
			}
		}
		//如果第一天是周四
		if(day==4){
			for(var i=0;i<totalDay;i++){
				$(".day").eq(i+3).html(i+1).css("color","#666");
			}
		}
		//如果第一天是周五
		if(day==5){
			for(var i=0;i<totalDay;i++){
				$(".day").eq(i+4).html(i+1).css("color","#666");
			}
		}
		//如果第一天是周六
		if(day==6){
			for(var i=0;i<totalDay;i++){
				$(".day").eq(i+5).html(i+1).css("color","#666");
			}
		}
		//如果第一天是周日
		if(day==0){
			for(var i=0;i<totalDay;i++){
				$(".day").eq(i+6).html(i+1).css("color","#666");
			}
		}
	}
	
	
	//获取每月的天数
	function mGetDate(year, month){
	    var d = new Date(year, month, 0);
	    return d.getDate();
	}
	//点击统计分析
	function Reanalysis(){
		var index = layer.load(2, { //icon支持传入0-2
		    shade: [0.5, '#fff'], //0.5透明度的灰色背景
		    content: '数据正在分析中，请稍等...',
		    success: function (layero) {
		        layero.find('.layui-layer-content').css({
		            'padding-top': '39px',
		            'width': '160px',
		            'background-position': '35% 0'
		        });
		    }
		});
		var year=$(".year").val();
		var month=$(".mon").attr("data-month");
		if(month<10){
			month="0"+month;
		}
		var obj={"yearno":year,"monthno":month,"holderno":window.top.holderno};
			$.ajax({
				url:url+'/analy/Reanalysis',
				type:"post",
				data:obj,
				success:function(data){
					layer.close(index);
					createRl();
					queryStatistics();
					querySummary();
					if(!data.flag){
						layer.msg(data.reason,{time:2000});
					}
					
				},
				error:function(data){
					layer.close(index);
				}
			})
	}
	
	//考勤分析
	function AttendanceAnalysis(){
		var year=$(".year").val();
		var month=$(".mon").attr("data-month");
		if(month<10){
			month="0"+month;
		}
			var obj={"yearno":year,"monthno":month,"holderno":window.top.holderno};
			var index=layer.load(2,{shade:[0.5,'#fff']});
			$.ajax({
				url:url+'/analy/AttendanceAnalysis',
				type:"post",
				data:obj,
				success:function(data){
					layer.close(index);
					if(data.flag){
						layer.msg("分析成功，下面进行统计分析",{time:2000},function(){
							Reanalysis();
						});
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(data){
					layer.close(index);
				}
			})
	}
})