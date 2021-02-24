$(function(){
	var page=1;//当前页
	var limit=20;//每页显示条数
	var total;
	getTime();
	//查询所有路线
	queryRoute();
	showHide();
	getPage(total);
	function getTime(){
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		if(month<10){
			month="0"+month;
		}
		$(".year").val(year+"年").attr("data-year",year);
		$(".month").val(month);
		//创建表格
		createRecord(year,month,"","",page,limit);
	}
	$("#search").click(function(){
		var routename=$("#selectRoute").val();
		var xgzt=$("#selectZT").val();
		var yearno=$(".year").attr("data-year");
		var monthno=$(".month").val();
		createRecord(yearno,monthno,routename,xgzt);
	})
	//创建表格
	function createRecord(yearno,monthno,routename,xgzt,page,limit){
		var obj={"routename":routename,"yearno":yearno,"monthno":monthno,"datatype":xgzt,"pageNo":page,"pageSize":limit};
		console.log(obj);
		$.ajax({
			url:url+"/record/pastrecord",
			type:"post",
			dataType:"json",
			data:obj,
			async:false,
			success:function(data){
				$("#cont").empty();
				console.log(data);
				if(data.flag){
				var res=data.result.list;
				total=data.result.total;
				for(var i=0;i<res.length;i++){
	    			var $tr=$("<tr></tr>");
	    			var $td1=$("<td></td>");
	    			var $td2=$("<td></td>");
	    			var $td3=$("<td></td>");
	    			var $td4=$("<td></td>");
	    			var $td5=$("<td></td>");
	    			var $td6=$("<td></td>");
	    			var $td7=$("<td></td>");
	    			var $td8=$("<td></td>");
	    			var $td9=$("<td></td>");
	    			$td1.append(res[i].recordid);
	    			$td2.append(res[i].routename);
	    			$td3.append(res[i].doorname);
	    			$td4.append(res[i].classname);
	    			$td5.append(res[i].patrolstartingtime);
	    			$td6.append(res[i].patrolendingtime);
	    			$td7.append(res[i].cardswipetime);
	    			if(res[i].cardswipedesc=="zc"){
	    				$td8.append("正常");
	    			}else if(res[i].cardswipedesc=="lx"){
	    				$td8.append("漏巡");
	    			}else if(res[i].cardswipedesc=="qx"){
	    				$td8.append("报警");
	    			}
	    			//$td9.append("");
	    			$tr.append($td1);
	    			$tr.append($td2);
	    			$tr.append($td4);
	    			$tr.append($td3);
	    			$tr.append($td5);
	    			$tr.append($td6);
	    			$tr.append($td7);
	    			$tr.append($td8);
	    			$("#cont").append($tr);
	    		}
				}else{
					layer.msg(data.reason,{time:2000});
				}
				
			},
			error:function(){
				console.log("error")
			}
		
		})
		
	}
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
					if(!first){
						createRecord("","","","",page,limit)
					}
				}
			})
		})
	}//end

	//查询所有路线
function queryRoute(){
		$.ajax({
			url:url+"/card/queryUserRoute",
			type:"post",
			success:function(data){
				console.log(data);
				var res=data.result;
				if(data.flag){
					for(var item of res){
						var $opt=$("<option value='"+item.RouteName+"'></option>");
						$opt.append(item.RouteName);
						$("#selectRoute").append($opt);
					}
				}
			}
		})
	}
	
	
	
	
//时间戳转为时间
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
   var Y = date.getFullYear() + '-';
   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
   var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
   var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
   var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
   var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}


//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#print").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="10006"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="print"){
				$("#print").show();
			}
		}
	}
})