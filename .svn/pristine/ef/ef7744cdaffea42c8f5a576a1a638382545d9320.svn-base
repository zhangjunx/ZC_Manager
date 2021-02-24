$(function() {
	 var page=1;//当前页
	 var limit=20;//每页显示条数
	 var total;
	//查询所有路线
	queryUserRoute();
	//查询所有班次
	queryAllClass(page,limit);
	showHide();
	if(total==undefined){
		getPage(1);
	}else{
	getPage(total);}
    //点击搜索
    $("#search").click(function(){
    	var routeid=$("#road").val();
    	queryXGClass(routeid)
    })//end
    
    function queryXGClass(routeid){
    	$.ajax({
			url:url+"/Class/queryXGClass",
			type:"post",
			data:{"routeid":routeid},
			success:function(data){
				$("#shift").empty();
				console.log(data);
				var res=data.result;
				if(data.flag){
					createShifts(res);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
    }//end
    //点击编辑
    $(document).on("click",".update",function(){
    	localStorage.info=$(this).attr("data-classid");
    	console.log(localStorage.info)
    })//end
    //点击删除
    $(document).on("click",".deleteShifts",function(){
    	var classid=$(this).attr("data-classid");
    	layer.confirm("确定删除?",{title:"提示信息"},function(index){
    		layer.close(index);
        	console.log(classid);
        	deleteClassInfor(classid)
    	})
    	
    })
    
    function deleteClassInfor(shiftid){
    	$.ajax({
			url:url+"/Class/deleteClassInfor",
			type:"post",
			data:{"classid":shiftid},
			success:function(data){
				console.log(data);
				var res=data.result;
				if(data.flag){
					layer.msg(data.reason,{time:1000},function(){
						window.location.reload();
					});
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
    }//end
    //查询所有班次
    function queryAllClass(page,limit){
    	console.log(page,limit);
    	$.ajax({
			url:url+"/Class/queryAllClass",
			type:"post",
			data:{"pageNo":page,"pageSize":limit},
			async:false,
			success:function(data){
				$("#shift").empty();
				console.log(data);
				if(data.flag){
					var res=data.result.list;
					total=data.result.total;
					createShifts(res);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
    }//end
    function createShifts(res){
    	var list=[];
    	for(var item of window.top.arr){
    		if(item.ModelCode=="10003"){
    			list.push(item);
    		}
    	}
    	var $tab = $("<table class='grade'></table>");
        var $tr = $("<tr></tr>");
        var $th = $("<td>路线</td> <td>班次</td> <td>开始时间</td><td>结束时间</td><td>巡更时长(分)</td><td>巡更时间间隔（分）</td> <td>巡更最短时长（分）</td><td>操作</td>");
    	$tr.append($th);
        $tab.append($tr);
        var text1="";
    	var text2="";
        for(var item of res){
        	if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
   			     text1="";
	   		 }else {
	   			 text1="<a href='time_setting_update.html' data-classid='"+item.classid+"' class='update layui-btn layui-btn-xs'>编辑</a>";
	   		 }
	   		 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
	   			 text2="";
	   		  }else {
	   			 text2="<a href='javascript:;' data-classid='"+item.classid+"' class='deleteShifts layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
	   		  }
	   		 if(text1==""&&text2==""){
	   			 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>编辑</a>";
	   			 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
	   		 }
    		var $tr1=$("<tr></tr>");
    		var $td1=$("<td></td>");
    		var $td2=$("<td></td>");
    		var $td3=$("<td></td>");
    		var $td4=$("<td></td>");
    		var $td5=$("<td></td>");
    		var $td6=$("<td></td>");
    		var $td7=$("<td></td>");
    		var $td8=$("<td>"+text1+text2+"</td>");
    		$td1.append(item.routename);
    		$td2.append(item.classname);
    		$td3.append(item.startingtimeofshift);
    		$td4.append(item.closingtimeofshift);
    		$td5.append(item.patrolduration);
    		$td6.append(item.patrolintervallength);
    		$td7.append(item.classerrorrange);
    		$tr1.append($td1);
    		$tr1.append($td2);
    		$tr1.append($td3);
    		$tr1.append($td4);
    		$tr1.append($td5);
    		$tr1.append($td6);
    		$tr1.append($td7);
    		$tr1.append($td8);
    		$tab.append($tr1);
    	}
        $("#shift").append($tab);
        
    }
   
	//分页
	function getPage(total){
		layui.use("laypage",function(){
			var laypage=layui.laypage;
			laypage.render({
				elem:"test1",
				limit:limit,//每页显示条数
				count:total,//总条数
				layout:['count','prev','page','next','limit','refresh','skip'],
				jump:function(obj,first){
					page=obj.curr;
					limit=obj.limit;
					if(!first){
						queryAllClass(page,limit);
					}
				}
			})
		})
	}//end
    
    //排班设置新增页面
    //提交排班信息
    $(document).on("click","#timecon",function(){
    	insertClassInfor();
    })
    
    
    //点击确定提交排班信息
    function insertClassInfor(){
    	var routeid=$("#luxian").val();
    	var arr=[];
    	for(var i=0;i<$(".hang").length;i++){
    		var timeLength=$(".timeLength").eq(i).val();
    		var jianGe=$(".jianGe").eq(i).val();
    		var range=$(".range").eq(i).val();
    		var shiftName=$(".shiftName").eq(i).val();
    		if(timeLength==""){
    			layer.msg(shiftName+"巡更时长不能为空!",{time:2000});
    			return;
    		}else if(timeLength<0){
    			layer.msg(shiftName+"巡更时长只能为正整数!",{time:2000});
    			return;
    		}else if(timeLength.indexOf(".")!=-1){
    			layer.msg(shiftName+"巡更时长只能为正整数!",{time:2000});
    			return;
    		}
    		if(jianGe==""){
    			layer.msg(shiftName+"巡更时间间隔不能为空!",{time:2000});
    			return;
    		}else if(jianGe<0){
    			layer.msg(shiftName+"巡更时间间隔只能为正整数!",{time:2000});
    			return;
    		}else if(jianGe.indexOf(".")!=-1){
    			layer.msg(shiftName+"巡更时间间隔只能为正整数!",{time:2000});
    			return;
    		}
    		if(range==""){
    			layer.msg(shiftName+"巡更最短时长不能为空!",{time:2000});
    			return;
    		}else if(range<0){
    			layer.msg(shiftName+"巡更最短时长只能为正整数!",{time:2000});
    			return;
    		}else if(range.indexOf(".")!=-1){
    			layer.msg(shiftName+"巡更最短时长只能为正整数!",{time:2000});
    			return;
    		}
    		//判断开始时间不能大于结束时间
    		var startTime=$(".begin").eq(i).val();
    		var endTime=$(".end").eq(i).val();
    		if(startTime==""&&endTime==""){
    			layer.msg("请输入'"+shiftName+"'开始时间和结束时间!",{time:2000});
    			return;
    		}
    		if(endTime=="00:00:00"){
    			endTime="24:00:00";
    		}
    		var date=new Date();
    		var year=date.getFullYear();
    		var month=date.getMonth()+1;
    		var day=date.getDate();
    		var time1=new Date(year+"/"+month+"/"+day+"/"+startTime);
    		var time2=new Date(year+"/"+month+"/"+day+"/"+endTime);
    		time1=time1.getTime();
    		time2=time2.getTime();
    		if(time2<=time1){
    			layer.msg(shiftName+"结束时间不能小于开始时间!",{time:2000});
    			return;
    		}
    		var reg =/^[^\s]*$/;//正则验证不能输入空格
    		//判断班次名称不能为空
    		if(shiftName==""||!reg.test(shiftName)){
    			layer.msg("班次名称不能为空!",{time:2000});
    			return;
    		}
    		var obj={
    				"routeid":parseInt(routeid),
    				"classname":shiftName,
    				"startingtimeofshift":$(".begin").eq(i).val(),
    				"closingtimeofshift":$(".end").eq(i).val(),
    				"patrolduration":timeLength,
    				"patrolintervallength":jianGe,
    				"classerrorrange":range,
    				"holderno":window.top.holderno
    		}
    		arr.push(obj);
    	}
    	//arr=JSON.stringify(arr);
    	console.log(arr);
		$.ajax({
			url:url+"/Class/insertClassInfor",
			type:"post",
			data:JSON.stringify(arr),
			contentType: "application/json",
			success:function(data){
				console.log(data);
				var res=data.result;
				if(data.flag){
					layer.msg("添加成功!",{time:2000},function(){
						window.location.href="time_setting.html";
					})
				}
			}
		})
	}
	
	
     $("#produce").click(function() {
    	 var shiftsNumber=$("#bc").val();
    	 if(shiftsNumber>10||shiftsNumber<=0){
    		 layer.msg("班次数量最大为10,最小为1!",{time:2000});
    		 return;
    	 }
        createBan();
        layui.use("laydate", function() {
            var laydate = layui.laydate
            lay('.datetime').each(function() {
				laydate.render({
					elem: this,
					type:"time",
					trigger:"click"
				});
			});

        })
    })
    
    
     function createBan() {
        $(".grade").remove()
        $(".form-btn").remove()
        var index = 1
        var bc = parseInt($("#bc").val())
        var starttime = $("#startTime").val()
        var period = $("#period").val()
        var err = $("#err").val()
        var luxian = $("#luxian option:selected").html()
        var $tab = $("<table class='grade'></table>");
        var $tr = $("<tr></tr>");
        var $th = $("<td>路线</td> <td>班次</td> <td>开始时间</td><td>结束时间</td><td>巡更时长(分)</td><td>巡更时间间隔（分）</td> <td>巡更最短时长（分）</td>");
        var $div = $("<div class='form-btn'><a href='javascript:;' id='timecon'>确定</a><a href='time_setting.html' class='orange'>取消</a></div>")
        $tab.append($tr);
        $tr.append($th);
        for (var i = 0; i < bc; i++) {
            var $tr1 = $("<tr class='hang'></tr>")
            var $td1 = $("<td class='center'></td>")
            var $td2 = $("<td class='center banci'><input type='text' class='shiftName' style='width:100px;'></td>")
            var $td3 = $("<td class='center'></td>")
            var $td4 = $("<td class='center'><input type='text' class='end datetime' placeholder='请输入结束时间' style='width:100px;'></td>")
            var $td5 = $("<input type='text' class='begin datetime' placeholder='请输入开始时间' style='width:160px;'>")
            var $td6 = $("<td class='center'><input type='number' class='timeLength' min='0' value='0' style='width:100px;padding-right:0'></td>")
            var $td7 = $("<td class='center'><input type='number' class='jianGe' min='0' value='0' style='width:100px;padding-right:0'></td>")
            var $td8 = $("<td class='center'><input type='number' class='range' min='0' value='0' style='width:100px;padding-right:0'></td>")
            $td1.append(luxian)
            $td2.find(".shiftName").val("班次" + index++)
            $td3.append($td5)
                /*// 时间和时间戳的相互转换
                // console.log(starttime)
            var now = new Date();
            var time = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1) + "-" + (now.getDate() < 10 ? "0" : "") + now.getDate();
            // console.log(time);
            var newTime = `${time} ${starttime}`
                // console.log(newTime)
            var end = new Date(newTime)
            var newNow = end.getTime()
            var endTime = newNow + period * 60 * 1000
            var newEnd = new Date(endTime)
            $td5.val(starttime)
            var periodTime = (newEnd.getHours() < 10 ? "0" : "") + newEnd.getHours() + ":" + (newEnd.getMinutes() < 10 ? "0" : "") + newEnd.getMinutes() + ":" + (newEnd.getSeconds() < 10 ? "0" : "") + newEnd.getSeconds();
            // console.log(periodTime)
            starttime = periodTime
*/
            $tr1.append($td1);
            $tr1.append($td2);
            $tr1.append($td3);
            $tr1.append($td4);
            $tr1.append($td6);
            $tr1.append($td7);
            $tr1.append($td8);
            
            $tab.append($tr1);

        }

        // if (!($("body").find("th").is("th"))) {
        $(".add-table").append($tab);
        $(".add-table").append($div)
        // }
    }
    
   //查询所有路线
     function queryUserRoute(){
    	 $.ajax({
             type: "post",
             url: url + "/card/queryUserRoute",
             dataType: "json",
             success: function(data) {
               var res=data.result;
               if(data.flag){
             	  for(var i=0;i<res.length;i++){
             		  var  $opt = $("<option value='"+res[i].RouteId+"'></option>");
             		  $opt.append(res[i].RouteName);
             		  $("#luxian").append($opt);
             		  $("#road").append($opt);
             	  }
               }else{
            	   layer.msg("查询路线失败!",{time:2000});
               }
             },
             error: function(data) {
                 console.log("error")
             }
         })//end
     }
     
     //跟权限有关
     function showHide(){
     		if(window.top.arr.length==0){
     			return;
     		}
     		$(".blue").hide();
     		var list=[];
     		var arrList=window.top.arr;
     		arrList.forEach(item=>{
     			if(item.ModelCode=="7001"){
     				list.push(item);
     			}
     		})
     		for(var item of list){
     			if(item.Code=="add"){
     				$(".blue").show();
     			}
     		}
     	}
 	
    

})