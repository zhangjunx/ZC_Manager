$(function(){
	//根据路线id查询班次，并赋值
	queryXGClass();
	//点击确定提交数据
	 $(document).on("click","#timecon",function(){
		 updateClass();
	    })
	
	  //点击确定提交排班信息
	    function updateClass(){
	    	var arr=[];
	    	for(var i=0;i<$(".hang").length;i++){
	    		var timeLength=$(".timeLength").eq(i).val();
	    		var jianGe=$(".jianGe").eq(i).val();
	    		var classid=$(".banci").eq(i).attr("data-classid");
	    		var range=$(".range").eq(i).val();
	    		var startTime=$(".begin").eq(i).val();
	    		var endTime=$(".end").eq(i).val();
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
	    				"classname":$(".shiftName").eq(i).val(),
	    				"startingtimeofshift":$(".begin").eq(i).val(),
	    				"closingtimeofshift":$(".end").eq(i).val(),
	    				"patrolduration":$(".timeLength").eq(i).val(),
	    				"patrolintervallength":$(".jianGe").eq(i).val(),
	    				"classerrorrange":parseInt(range),
	    				"classid":parseInt(classid)
	    		}
	    		arr.push(obj);
	    	}
	    	//arr=JSON.stringify(arr);
	    	console.log(arr);
			$.ajax({
				url:url+"/Class/updateClass",
				type:"post",
				data:JSON.stringify(arr),
				contentType: "application/json",
				success:function(data){
					console.log(data);
					var res=data.result;
					if(data.flag){
						layer.msg("修改成功!",{time:2000},function(){
							window.location.href="time_setting.html";
						})
					}
				}
			})
		}//end
	    
	
	
	
	function queryXGClass(){
		var classid=localStorage.info;
		$.ajax({
			url:url+"/Class/queryXGClass",
			type:"post",
			data:{"classid":classid},
			success:function(data){
				console.log(data);
				var res=data.result;
				if(data.flag){
					$("#lx").val(res[0].routename);
					createBan(res);
					for(var i=0;i<$(".range").length;i++){
						$(".range").eq(i).val(res[i].classerrorrange);
					}
					layui.use("laydate", function() {
			            var laydate = layui.laydate
			            lay('.datetime').each(function() {
							laydate.render({
								elem: this,
								type:"time",
								trigger: 'click'
							});
						});

			        })
				}
			}
		})
	}
	
	
	
	
	 function createBan(res) {
	        $(".grade").remove()
	        $(".form-btn").remove()
	        var index = 1
	        var starttime = $("#startTime").val()
	        var period = $("#period").val()
	        var err = $("#err").val()
	        var luxian = $("#lx").val()
	        var $tab = $("<table class='grade'></table>");
	        var $tr = $("<tr></tr>");
	        var $th = $("<td>路线</td> <td>班次</td> <td>开始时间</td><td>结束时间</td><td>巡更时长(分)</td><td>巡更时间间隔（分）</td> <td>巡更最短时长（分）</td>");
	        var $div = $("<div class='form-btn'><a href='javascript:;' id='timecon'>确定</a><a href='time_setting.html' class='orange'>取消</a></div>")
	        $tab.append($tr);
	        $tr.append($th);
	        for (var i = 0; i < res.length; i++) {
	            var $tr1 = $("<tr class='hang'></tr>")
	            var $td1 = $("<td class='center'></td>")
	            var $td2 = $("<td class='center banci' data-classid='"+res[i].classid+"'><input type='text' class='shiftName' style='width:100px;'></td>")
	            var $td3 = $("<td class='center'></td>")
	            var $td4 = $("<td class='center'><input type='text' class='end datetime' placeholder='请输入结束时间' style='width:100px;'></td>")
	            var $td5 = $("<input type='text' class='begin datetime' placeholder='请输入开始时间' style='width:160px;'>")
	            var $td6 = $("<td class='center'><input type='number' min='0' value='0' class='timeLength' placeholder='请输入巡更时长' style='width:100px;padding-right:0'></td>")
	            var $td7 = $("<td class='center'><input type='number' min='0' value='0' class='jianGe' placeholder='请输入时间间隔' style='width:100px; padding-right:0'></td>")
	            var $td8 = $("<td class='center'></td>")
	            var $ipt=$("<input type='number' class='range' min='0' value='0' placeholder='请输入时间误差' style='width:100px;padding-right:0'>")
	            $td1.append(luxian)
	            $td2.find(".shiftName").val(res[i].classname);
	            $td3.append($td5);
	            $td5.val(res[i].startingtimeofshift);
	            $td4.find(".end").val(res[i].closingtimeofshift);
	            $td6.find(".timeLength").val(res[i].patrolduration);
	            $td7.find(".jianGe").val(res[i].patrolintervallength);
	            $td8.append($ipt);
	            $ipt.val(res[i].classerrorrange);
	            $tr1.append($td1);
	            $tr1.append($td2);
	            $tr1.append($td3);
	            $tr1.append($td4);
	            $tr1.append($td6);
	            $tr1.append($td7);
	            $tr1.append($td8);
	            
	            $tab.append($tr1);

	        }
	        $(".add-table").append($tab);
	        $(".add-table").append($div)
	    }
	
	
})