$(function(){
	//查询考勤详情
	queryStatistics();
	
	//给页面上的正常、休息等上班情况赋值
	$(".normal").html(localStorage.normal);
	$(".rest").html(localStorage.rest);
	$(".delay").html(localStorage.delay);
	$(".early").html(localStorage.early);
	$(".nowork").html(localStorage.nowork);
	$(".holiday").html(localStorage.holiday);
	$(".business").html(localStorage.business);
	
	/*function (){
		var year=localStorage.year;
		var month=localStorage.month;
		var holderno=localStorage.holderno;
		var obj={"yearno":year,"monthno":month,"holderno":holderno};
		$.ajax({
			url:url+'/daily/queryStatistics',
			type:"post",
			data:obj,
			success:function(data){
				console.log(data);
			}
		})
	}*/
	//查询考勤详情
	function  queryStatistics(){
		var year=localStorage.year;
		var month=localStorage.month;
		var holderno=localStorage.holderno;
		var obj={"yearno":year,"monthno":month,"holderno":holderno};
		console.log(obj);
		$.ajax({
			url:url+'/daily/queryStatistics',
			type:"post",
			data:obj,
			success:function(data){
				console.log(data);
				var res=data.result;
				var monthlist=data.monthlist;
				if(data.flag){
					for(var m=0;m<res.length;m++){
						$(".dept").html(res[m].departmentname);
						$(".holderno").html(res[m].holderno);
						$(".holdername").html(res[m].holdername);
						var $tr=$("<tr></tr>");
						var $td1=$("<td></td>");
						var $td2=$("<td></td>");
						var $td3=$("<td></td>");
						var $td5=$("<td></td>");
						for(var item of monthlist){
							if(res[m].analydate==item.analydate){
								$td5.append(item.status);
							}
						}
						var eunite=res[m].eunite;
						console.log(eunite)
						if(eunite==undefined){
							
						}else{
							eunite=eunite.split(",");
							var arr=spArray(6,eunite);
							for(var item of arr){
								item.splice(5,1);
							}
							console.log(arr)
							for(var i=0;i<arr.length;i++){
								var $div1=$("<div></div>");
								var $span1=$("<span></span>");
								var $span2=$("<span></span>");
								var $span3=$("<span style='display:inline-block;width:120px;'></span>");
								$span1.append(arr[i][0]+arr[i][1]+":&nbsp;&nbsp;&nbsp;&nbsp;"+arr[i][2]);
								$span2.append("状态:"+arr[i][3]);
								$span3.append(arr[i][4]);
								$div1.append($span1);
								$div1.append($span3);
								$div1.append($span2);
								$div1.css("display","inline-block");
								$td3.append($div1); 
							}
						}
						
						$td3.css("text-align","left")
						var myDate=new Date(res[m].analydate);
						var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]; 
						$td1.append(res[m].analydate+"("+weekDay[myDate.getDay()]+")");
						$td2.append(res[m].shiftname);
						$tr.append($td1);
						$tr.append($td2);
						$tr.append($td5);
						$tr.append($td3);
						$("#cont").append($tr);
					}
				}
			}
		})
	}
	
	//分割数组
	 function spArray(N,Q){
		var R = [],F;
		for (F = 0;F < Q.length;) {
			R.push(Q.slice(F,F += N))
		}
		return R
	}
})