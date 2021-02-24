$(function(){
	var total;
	var curpage=1;//当前页
	var pagesize=20;//每页显示的条数
	//查询部门
	queryDeptNoList();
	//查询当前登录人的姓名和部门
	queryLoginHolder();
	//查询出差信息
	queryAllApplyForCc();
	getPage(total);
	showHide();//权限
	$("#holdername").css("background","#f2f2f2");
	$("#dept").css("background","#f2f2f2");
	if(getUrlParam("applyType")=="qj"){//请假
		$(".main-tab .label").eq(1).addClass("curr").siblings().removeClass("curr");
		$(".overtime_con table").eq(1).show().siblings().hide();
		queryAllApplyForQj();
		getPage(total);
	}else if(getUrlParam("applyType")=="bk"){//补卡
		$(".main-tab .label").eq(2).addClass("curr").siblings().removeClass("curr");
		$(".overtime_con table").eq(2).show().siblings().hide();
		queryAllApplyForBk();
		getPage(total);
	}else if(getUrlParam("applyType")=="jb"){//加班
		$(".main-tab .label").eq(3).addClass("curr").siblings().removeClass("curr");
		$(".overtime_con table").eq(3).show().siblings().hide();
		queryAllApplyForJb();
		getPage(total);
	}else if(getUrlParam("applyType")=="tx"){//调休
		$(".main-tab .label").eq(4).addClass("curr").siblings().removeClass("curr");
		$(".overtime_con table").eq(4).show().siblings().hide();
		queryAllApplyForTx();
		getPage(total);
	}
	//选项卡
	$(".main-tab .label").click(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".overtime_con table").eq($(this).index()).show().siblings().hide();
		if($(this).index()==0){
			$("#insertOverOrInter").attr("href","insertBusinessTrip.html");
			//查询出差信息
			queryAllApplyForCc();
			getPage(total);
		}else if($(this).index()==1){
			$("#insertOverOrInter").attr("href","insertLeaveApplication.html");
			//查询请假信息
			queryAllApplyForQj();
			getPage(total);
		}else if($(this).index()==2){
			$("#insertOverOrInter").attr("href","insertReplenishmentCard.html");
			//查询补打卡信息
			queryAllApplyForBk();
			getPage(total);
		}else if($(this).index()==3){
			$("#insertOverOrInter").attr("href","insertOverTime.html");
			//查询加班信息
			queryAllApplyForJb();
			getPage(total);
		}else if($(this).index()==4){
			$("#insertOverOrInter").attr("href","insertIntermission.html");
			//查询调休信息
			queryAllApplyForTx();
			getPage(total);
		}
	})
	
	//日期插件
	layui.use("laydate",function(){
		var laydate=layui.laydate;
		lay(".dateYx").each(function(){
			laydate.render({
				elem:this,
				trigger:"click",
				type:"datetime",
				format: 'yyyy-MM-dd HH:mm'
			})
		})
		laydate.render({
				elem:"#approveTime",
				trigger:"click",
			})
		
	})
	
	//分页
	function getPage(total){
		layui.use("laypage",function(){
			var laypage=layui.laypage;
			laypage.render({
				elem:"test",
				limit:pagesize,//每页显示条数
				count:total,//总条数
				layout:['count','prev','page','next','limit','refresh','skip'],
				jump:function(obj,first){
					curpage=obj.curr;
					pagesize=obj.limit;
					if(!first){
						if($(".main-tab .curr a").html()=="加班申请"){
							queryAllApplyForJb();
						}else if($(".main-tab .curr a").html()=="调休申请"){
							queryAllApplyForTx();
						}else if($(".main-tab .curr a").html()=="出差申请"){
							queryAllApplyForCc();
						}else if($(".main-tab .curr a").html()=="请假申请"){
							queryAllApplyForQj();
						}else if($(".main-tab .curr a").html()=="补打卡申请"){
							queryAllApplyForBk();
						}
					}
				}
			})
		})
	}//end
	//跟权限有关
	function showHide(){
			if(window.top.arr.length==0){
				return;
			}
			$("#insertOverOrInter").hide();
			var arrList=window.top.arr;
			var list=[];
			arrList.forEach(item=>{
				if(item.ModelCode=="1002"){
					list.push(item);
				}
			})
			for(var item of list){
				if(item.Code=="add"){
					$("#insertOverOrInter").show();
				}
			}
		}
	//点击搜索
	$("#queryCarInfo").click(function(){
		if($(".main-tab .curr a").html()=="加班申请"){
			queryAllApplyForJb();
			getPage(total);
		}else if($(".main-tab .curr a").html()=="调休申请"){
			queryAllApplyForTx();
			getPage(total);
		}else if($(".main-tab .curr a").html()=="出差申请"){
			queryAllApplyForCc();
			getPage(total);
		}else if($(".main-tab .curr a").html()=="请假申请"){
			queryAllApplyForQj();
			getPage(total);
		}else if($(".main-tab .curr a").html()=="补打卡申请"){
			queryAllApplyForBk();
			getPage(total);
		}
	})
	
	//点击选择审批人
	$(".choose").click(function(){
		$(".vehicleInfo_shadow").fadeIn(500);
		$(".approve").fadeIn(500);
	})
	//点击弹出框的叉
	$(".quxiao").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".approve").fadeOut(500);
	})
	//点击弹出框的确定
	$(".bottom_sure").click(function(){
		if($(".door_center ul li.current").length==0){
			return;
		}
		for(var i=0;i<$(".door_center ul li.current").length;i++){
			var holderno=$(".door_center ul li.current").eq(i).attr("data-holderno");
			var holdername=$(".door_center ul li.current").eq(i).attr("data-holdername");
			if(holderno==window.top.holderno){
				layer.msg("审批人不能选择本人",{time:2000});
				return;
			}
			for(var j=0;j<$(".approval").length;j++){
				var holderno1=$(".approval").eq(j).attr("data-holderno");
				if(holderno==holderno1){
					layer.msg("审批人重复!");
					return;
				}
			}
			$(".vehicleInfo_shadow").fadeOut(500);
			$(".approve").fadeOut(500);
			var $div=$("<div class='approval curr' data-holderno='"+holderno+"'>"+holdername+"</div>");
			$div.insertBefore($(".choose"));
		}
	})
	//点击弹出框的取消
	$(".bottom_qx").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".approve").fadeOut(500);
	})
	//点击弹框中的li
	$(document).on("click",".door_center ul li",function(){
		if($(this).hasClass("current")){
			$(this).removeClass("current");
		}else{
			$(this).addClass("current");
		}
	})
	//双击审批人删除
	$(document).on("dblclick",".approval",function(){
		$(this).remove();
	})
	//点击加班申请中的确定
	$("#insertOvertime").click(function(){
		var holderno=$("#holdername").attr("data-holderno");
		var departmentno=$("#dept").attr("data-deptno");
		var detailedplace=$(".thingsReason").val();
		var begintime=$("#startTime").val()+":00";
		var endtime=$("#endTime").val()+":00";
		var arr=[];
		for(var i=0;i<$(".control .curr").length;i++){
			arr.push($(".control .curr").eq(i).attr("data-holderno"));
		}
		arr=arr.join();
		var remark=$(".remark").val();
		var obj={"holderno":holderno,"departmentno":departmentno,"detailedplace":detailedplace,"begintime":begintime,"endtime":endtime,"firstapproval":arr,"remark":remark}
		if(detailedplace==""){
			layer.msg("事由不能为空!",{time:2000});
			return;
		}
		if($("#startTime").val()==""||$("#endTime").val()==""){
			layer.msg("申请时间不能为空!",{time:2000});
			return;
		}
		var time1=new Date($("#startTime").val()).getTime();
		var time2=new Date($("#endTime").val()).getTime();
		if(time1>=time2){
			layer.msg("开始时间不能晚于结束时间!",{time:2000});
			return;
		}
		if(arr.length==0){
			layer.msg("请选择审批人!",{time:2000});
			return;
		}
		$.ajax({
			url:url+"/appeme/insertWorkOverTime",
			type:"POST",
			data:obj,
			success:(data)=>{
				//console.log(data);
				if(data.flag==true){
					layer.msg("提交成功!",{time:2000},function(){
						window.location.href="OvertimeIntermission.html?applyType=jb";
					})
				}else if(data.flag==false){
					layer.msg("提交失败!",{time:2000});
				}else if(data.flag=="no"){
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	
	})//end
	
	
	//点击调休申请中的确定
	$("#insertIntermission").click(function(){
		var holderno=$("#holdername").attr("data-holderno");
		var departmentno=$("#dept").attr("data-deptno");
		var begintime=$("#startTime").val()+":00";
		var endtime=$("#endTime").val()+":00";
		var arr=[];
		for(var i=0;i<$(".control .curr").length;i++){
			arr.push($(".control .curr").eq(i).attr("data-holderno"));
		}
		arr=arr.join();
		var remark=$(".remark").val();
		var obj={"holderno":holderno,"departmentno":departmentno,"begintime":begintime,"endtime":endtime,"firstapproval":arr,"remark":remark}
		if($("#startTime").val()==""||$("#endTime").val()==""){
			layer.msg("申请时间不能为空!",{time:2000});
			return;
		}
		var time1=new Date($("#startTime").val()).getTime();
		var time2=new Date($("#endTime").val()).getTime();
		if(time1>=time2){
			layer.msg("开始时间不能晚于结束时间!",{time:2000});
			return;
		}
		if(arr.length==0){
			layer.msg("请选择审批人!",{time:2000});
			return;
		}
		$.ajax({
			url:url+"/appeme/insertRest",
			type:"POST",
			data:obj,
			success:(data)=>{
				//console.log(data);
				if(data.flag==true){
					layer.msg("提交成功!",{time:2000},function(){
						window.location.href="OvertimeIntermission.html?applyType=tx";
					})
				}else if(data.flag==false){
					layer.msg("提交失败!",{time:2000});
				}else if(data.flag=="no"){
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	
	})//end
	//选择审批人弹窗
	$("#queryHolderInfo").click(function(){
		var deptno=$("#dept").val();
		var holderno=$(".holdername").val();
		$.ajax({
			url:url+"/appeme/queryHolder",
			type:"POST",
			data:{"departmentno":deptno,"holderno":holderno},
			success:(data)=>{
				$(".door_center ul").empty();
				if(data.flag){
					var res=data.result;
					for(var item of res){
					var $li=$("<li data-holderno='"+item.holderno+"' data-holdername='"+item.holdername+"'></li>");
					var $div1=$("<div class='personPhoto'><img src='../img/person.png'></div>");
					var $div2=$("<div class='holderInfo'><p>姓名:<span>"+item.holdername+"</span></p><p>工号:<span>"+item.holderno+"</span></p><p>部门:<span>"+item.departmentname+"</span></p></div>");
					$li.append($div1);
					$li.append($div2);
					$(".door_center ul").append($li);
					}
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})//end
	//查询部门
	function queryDeptNoList(){
		$.ajax({
			url:url+'/DepartmentData/getDeptTree',
			type:'POST',//类型
			dataType:'json',//数据类型
			data:{"res":"false"},
			success:function(data){
				layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
				    var $ = layui.jquery, tree = layui.tree;
				    tree.render({
				        elem: "#classtree",
				        data: data.result,
				        onlyIconControl:true,
				        click: function (node) {
				        	$("#dept").val(node.data.id);
				        	$("#deptName").html(node.data.title);
				            var $select = $($(this)[0].elem).parents(".layui-form-select");
				            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
				            queryHolderDataListByDepartmentNo(node.data.id);
				        }
				    });
				    $(".downpanel").on("click", ".layui-select-title", function (e) {
				        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
				        $(this).parents(".downpanel").toggleClass("layui-form-selected");
				        layui.stope(e);
				    }).on("click", "dl i", function (e) {
				        layui.stope(e);
				    });
				});
			
			},
			error:function(data){}
		})
	 }//end
	function queryHolderDataListByDepartmentNo(deptno){
		var obj={"deptno":deptno};
		$.ajax({
			url:url+'/DepartmentData/getHolderByDept',
			type:"post",
			data:obj,
			//contentType:"application/json", // 指定这个协议很重要
		    dataType:'json',
			success:function(data){
				 $(".holdername").find("option:not(:first)").remove();
				if(data.flag){
					var res=data.result;
					for(var item of res){
						var $opt=$("<option value='"+item.holderno+"'></option>")
						$opt.append(item.holdername);
						$(".holdername").append($opt);
					}
				}
			}
		})
	}
	
	//查询当前登录人的姓名和部门
	function queryLoginHolder(){
		var obj={"holderno":window.top.holderno};
		$.ajax({
			url:url+"/appeme/queryLoginHolder",
			type:"POST",
			data:obj,
			success:(data)=>{
				//console.log(data);
				if(data.flag){
					var res=data.result;
					$("#holdername").val(res[0].holdername);
					$("#holdername").attr("data-holderno",res[0].holderno);
					$("#dept").val(res[0].departmentname);
					$("#dept").attr("data-deptno",res[0].departmentno);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	}//end
	
	//查询出差信息
	function queryAllApplyForCc(){
		if($("#approveTime").val()==""||$("#approveTime").val()==undefined){
			var time="";
		}else{
			var time=$("#approveTime").val()+" 00:00:00";
		}
		var status=$("#status").val();
		var holderno=window.top.holderno;
		var obj={"topictype":"cc","applytime":time,"auditstatus":status,"holderno":holderno,"curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryAllApplyFor",
			type:"POST",
			data:obj,
			async:false,
			success:(data)=>{
				$("#cont2").empty();
				total=data.count;
				if(data.flag){
					var res=data.result;
					//权限
					var list=[];
					for(var item of window.top.arr){
						if(item.ModelCode=="1002"){
							list.push(item);
						}
					}
					for(var item of res){
						var holderno=(item.holderno==undefined?"":item.holderno);
						var holdername=(item.holdername==undefined?"":item.holdername);
						var departmentname=(item.departmentname==undefined?"":item.departmentname);
						var place=(item.place==undefined?"":item.place);
						var detailedplace=(item.detailedplace==undefined?"":item.detailedplace);
						var causetype=(item.causetype==undefined?"":item.causetype);
						var applytime=(item.applytime==undefined?"":item.applytime);
						var begintime=(item.begintime==undefined?"":item.begintime);
						var endtime=(item.endtime==undefined?"":item.endtime);
						var remark=(item.remark==undefined?"":item.remark);
						
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+holderno+"</td>");
						var $td2=$("<td>"+holdername+"</td>");
						var $td3=$("<td>"+departmentname+"</td>");
						var $td4=$("<td>"+place+"</td>");
						var $td5=$("<td>"+detailedplace+"</td>");
						var $td6=$("<td>"+causetype+"</td>");
						var $td7=$("<td>"+applytime+"</td>");
						var $td8=$("<td>"+begintime+"</td>");
						var $td9=$("<td>"+endtime+"</td>");
						var $td10=$("<td></td>");
						var $td11=$("<td>"+remark+"</td>");
						var $td12=$("<td></td>");
						var $td13=$("<td></td>");
						var $td14=$("<td></td>");
						var arr=item.firstapproval.split(",");
						for(var i=0;i<arr.length;i++){
							var $span=$("<span>"+arr[i]+"</span>");
							$td10.append($span);
						}
						var $a1="";
						var $text="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							 $a1=$("<a href='updateBusinessTrip.html' class='cc layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>修改</a>")
						  }
						 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
							 $text="";
						  }else {
							 $text=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-themeno='"+item.themeno+"'>删除</a>");
						  }
						 if($a1==""&&$text==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>");
							 $text=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>");
						 }
						 
						
						if(item.auditstatus==10){
							$td12.append("未审批").css("color","#FF9100");
							$td14.append($a1);
							$td14.append($text);
						}else if(item.auditstatus==11){
							$td12.append("审批中").css("color","#FF9100");
							$td14.append($text);
						}else if(item.auditstatus==12){
							$td12.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td12.append("驳回").css("color","#D30C0C");
							var $a=$("<a href='updateBusinessTrip.html'  class='cc layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>重新提交</a>")
							$td14.append($a);
						}
						
						if(item.operationstatus==0){
							$td13.append("已申请");
						}else if(item.operationstatus==1){
							$td13.append("一级审批");
						}else if(item.operationstatus==2){
							$td13.append("二级审批");
						}else if(item.operationstatus==3){
							$td13.append("三级审批");
						}
						
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
						$("#cont2").append($tr);
					}
				}else{
					//layer.msg(data.reason,{time:2000});
				}
			}
		})
	}//end
	
	
	//查询请假信息
	function queryAllApplyForQj(){
		if($("#approveTime").val()==""||$("#approveTime").val()==undefined){
			var time="";
		}else{
			var time=$("#approveTime").val()+" 00:00:00";
		}
		var status=$("#status").val();
		var holderno=window.top.holderno;
		//console.log(holderno)
		var obj={"topictype":"qj","applytime":time,"auditstatus":status,"holderno":holderno,"curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryAllApplyFor",
			type:"POST",
			data:obj,
			async:false,
			success:(data)=>{
				console.log(data);
				$("#cont3").empty();
				total=data.count;
				if(data.flag){
					var res=data.result;
					//权限
					var list=[];
					for(var item of window.top.arr){
						if(item.ModelCode=="1002"){
							list.push(item);
						}
					}
					for(var item of res){
						var holderno=(item.holderno==undefined?"":item.holderno);
						var holdername=(item.holdername==undefined?"":item.holdername);
						var departmentname=(item.departmentname==undefined?"":item.departmentname);
						var place=(item.place==undefined?"":item.place);
						var detailedplace=(item.detailedplace==undefined?"":item.detailedplace);
						var causetype=(item.causetype==undefined?"":item.causetype);
						var applytime=(item.applytime==undefined?"":item.applytime);
						var begintime=(item.begintime==undefined?"":item.begintime);
						var endtime=(item.endtime==undefined?"":item.endtime);
						var remark=(item.remark==undefined?"":item.remark);
						
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+holderno+"</td>");
						var $td2=$("<td>"+holdername+"</td>");
						var $td3=$("<td>"+departmentname+"</td>");
						var $td4=$("<td>"+causetype+"</td>");
						var $td5=$("<td>"+detailedplace+"</td>");
						var $td6=$("<td>"+applytime+"</td>");
						var $td7=$("<td>"+begintime+"</td>");
						var $td8=$("<td>"+endtime+"</td>");
						var $td9=$("<td></td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						var $td12=$("<td>"+remark+"</td>");
						var $td13=$("<td></td>");
						var $td14=$("<td></td>");
						var $td15=$("<td></td>")
						var arr1=item.firstapproval.split(",");
						for(var i=0;i<arr1.length;i++){
							var $span=$("<span>"+arr1[i]+"</span>");
							$td9.append($span);
						}
						
						if(item.secondapproval==undefined){
							$td10.append("");
						}else{
							var arr2=item.secondapproval.split(",");
							for(var i=0;i<arr2.length;i++){
								var $span=$("<span>"+arr2[i]+"</span>");
								$td10.append($span);
							}
						}
						
						if(item.thirdapproval==undefined){
							$td11.append("");
						}else{
							var arr3=item.thirdapproval.split(",");
							for(var i=0;i<arr3.length;i++){
								var $span=$("<span>"+arr3[i]+"</span>");
								$td11.append($span);
							}
						}
						var $a1="";
						var $text="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='updateLeaveApplication.html' class='qj layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>修改</a>")
						  }
						 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
							 $text="";
						  }else {
							 $text=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-themeno='"+item.themeno+"'>删除</a>");
						  }
						 if($a1==""&&$text==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>");
							 $text=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>");
						 }
						
						if(item.auditstatus==10){
							$td13.append("未审批").css("color","#FF9100");
							$td15.append($a1);
							$td15.append($text);
						}else if(item.auditstatus==11){
							$td13.append("审批中").css("color","#FF9100");
							$td15.append($text);
						}else if(item.auditstatus==12){
							$td13.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td13.append("驳回").css("color","#D30C0C");
							var $a=$("<a href='updateLeaveApplication.html' class='qj layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>重新提交</a>")
							$td15.append($a);
						}
						
						if(item.operationstatus==0){
							$td14.append("等待一级审批");
						}else if(item.operationstatus==1&&item.auditstatus==12){
							$td14.append("一级审批同意");
						}else if(item.operationstatus==1&&item.auditstatus==13){
							$td14.append("一级审批拒绝");
						}else if(item.operationstatus==1&&item.auditstatus==11){
							$td14.append("一级审批已通过，等待二级审批");
						}else if(item.operationstatus==2&&item.auditstatus==12){
							$td14.append("二级审批同意");
						}else if(item.operationstatus==2&&item.auditstatus==13){
							$td14.append("二级审批拒绝");
						}else if(item.operationstatus==2&&item.auditstatus==11){
							$td14.append("二级审批已通过，等待三级审批");
						}else if(item.operationstatus==3&&item.auditstatus==12){
							$td14.append("三级审批同意");
						}else if(item.operationstatus==3&&item.auditstatus==13){
							$td14.append("三级审批拒绝");
						}
						
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
						$("#cont3").append($tr);
					}
				}else{
					//layer.msg(data.reason,{time:2000});
				}
			}
		})
	}//end
	
	//查询补打卡信息
	function queryAllApplyForBk(){
		if($("#approveTime").val()==""||$("#approveTime").val()==undefined){
			var time="";
		}else{
			var time=$("#approveTime").val()+" 00:00:00";
		}
		var status=$("#status").val();
		var holderno=window.top.holderno;
		var obj={"topictype":"bk","applytime":time,"auditstatus":status,"holderno":holderno,"curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryAllApplyFor",
			type:"POST",
			data:obj,
			async:false,
			success:(data)=>{
				//console.log(data);
				$("#cont4").empty();
				total=data.count;
				if(data.flag){
					var res=data.result;
					//权限
					var list=[];
					for(var item of window.top.arr){
						if(item.ModelCode=="1002"){
							list.push(item);
						}
					}
					for(var item of res){
						var holderno=(item.holderno==undefined?"":item.holderno);
						var holdername=(item.holdername==undefined?"":item.holdername);
						var departmentname=(item.departmentname==undefined?"":item.departmentname);
						var place=(item.place==undefined?"":item.place);
						var detailedplace=(item.detailedplace==undefined?"":item.detailedplace);
						var causetype=(item.causetype==undefined?"":item.causetype);
						var applytime=(item.applytime==undefined?"":item.applytime);
						var begintime=(item.begintime==undefined?"":item.begintime);
						var endtime=(item.endtime==undefined?"":item.endtime);
						var remark=(item.remark==undefined?"":item.remark);
						
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+holderno+"</td>");
						var $td2=$("<td>"+holdername+"</td>");
						var $td3=$("<td>"+departmentname+"</td>");
						var $td4=$("<td></td>");
						var $td5=$("<td></td>");
						var $td6=$("<td>"+applytime+"</td>");
						var $td7=$("<td>"+item.punchtime+"</td>");
						var $td8=$("<td></td>");
						var $td9=$("<td>"+remark+"</td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						var $td12=$("<td></td>");
						$.ajax({
							url:url+"/DoorUnit/queryDoorByDoorNo",
							type:"POST",
							data:{"doorno":place},
							async:false,
							success:(data)=>{
								//console.log(data);
								if(data.flag){
									var res=data.result;
									$td4.append(res[0].doorname);
								}
							}
							
						})
						if(causetype==19){
							$td5.append("外出");
						}else if(causetype==18){
							$td5.append("进入");
						}
						var arr=item.firstapproval.split(",");
						for(var i=0;i<arr.length;i++){
							var $span=$("<span>"+arr[i]+"</span>");
							$td8.append($span);
						}
						
						
						var $a1="";
						var $text="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='updateReplenishmentCard.html' class='bk layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>修改</a>");
						  }
						 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
							 $text="";
						  }else {
							 $text=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-themeno='"+item.themeno+"'>删除</a>");
						  }
						 if($a1==""&&$text==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>");
							 $text=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>");
						 }
						
						if(item.auditstatus==10){
							$td10.append("未审批").css("color","#FF9100");
							$td12.append($a1);
							$td12.append($text);
						}else if(item.auditstatus==11){
							$td10.append("审批中").css("color","#FF9100");
							$td12.append($text);
						}else if(item.auditstatus==12){
							$td10.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td10.append("驳回").css("color","#D30C0C");
							var $a=$("<a href='updateReplenishmentCard.html' class='bk layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>重新提交</a>")
							$td12.append($a);
						}
						
						if(item.operationstatus==0){
							$td11.append("已申请");
						}else if(item.operationstatus==1){
							$td11.append("一级审批");
						}else if(item.operationstatus==2){
							$td11.append("二级审批");
						}else if(item.operationstatus==3){
							$td11.append("三级审批");
						}
						
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
						
						$("#cont4").append($tr);
					}
				}else{
					//layer.msg(data.reason,{time:2000});
				}
			}
		})
	}//end
	
	
	//查询加班信息
	function queryAllApplyForJb(){
		//console.log($("#approveTime").val())
		if($("#approveTime").val()==""||$("#approveTime").val()==undefined){
			var time="";
		}else{
			var time=$("#approveTime").val()+" 00:00:00";
		}
		var status=$("#status").val();
		var holderno=window.top.holderno;
		var obj={"topictype":"jb","applytime":time,"auditstatus":status,"holderno":holderno,"curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryAllApplyFor",
			type:"POST",
			data:obj,
			async:false,
			success:(data)=>{
				//console.log(data);
				$("#cont").empty();
				total=data.count;
				if(data.flag){
					var res=data.result;
					//权限
					var list=[];
					for(var item of window.top.arr){
						if(item.ModelCode=="1002"){
							list.push(item);
						}
					}
					for(var item of res){
						var holderno=(item.holderno==undefined?"":item.holderno);
						var holdername=(item.holdername==undefined?"":item.holdername);
						var departmentname=(item.departmentname==undefined?"":item.departmentname);
						var place=(item.place==undefined?"":item.place);
						var detailedplace=(item.detailedplace==undefined?"":item.detailedplace);
						var causetype=(item.causetype==undefined?"":item.causetype);
						var applytime=(item.applytime==undefined?"":item.applytime);
						var begintime=(item.begintime==undefined?"":item.begintime);
						var endtime=(item.endtime==undefined?"":item.endtime);
						var remark=(item.remark==undefined?"":item.remark);
						
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+holderno+"</td>");
						var $td2=$("<td>"+holdername+"</td>");
						var $td3=$("<td>"+departmentname+"</td>");
						var $td4=$("<td>"+detailedplace+"</td>");
						var $td5=$("<td>"+applytime+"</td>");
						var $td6=$("<td>"+begintime+"</td>");
						var $td7=$("<td>"+endtime+"</td>");
						var $td8=$("<td></td>");
						var $td9=$("<td>"+remark+"</td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						var $td12=$("<td></td>");
						var arr=item.firstapproval.split(",");
						for(var i=0;i<arr.length;i++){
							var $span=$("<span>"+arr[i]+"</span>");
							$td8.append($span);
						}
						
						
						var $a1="";
						var $text="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='updateOverTime.html' class='mo layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>修改</a>");
						  }
						 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
							 $text="";
						  }else {
							 $text=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-themeno='"+item.themeno+"'>删除</a>");
						  }
						 if($a1==""&&$text==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>");
							 $text=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>");
						 }
						
						if(item.auditstatus==10){
							$td10.append("未审批").css("color","#FF9100");
							$td12.append($a1);
							$td12.append($text);
						}else if(item.auditstatus==11){
							$td10.append("审批中").css("color","#FF9100");
							$td12.append($text);
						}else if(item.auditstatus==12){
							$td10.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td10.append("驳回").css("color","#D30C0C");
							var $a=$("<a href='updateOverTime.html' class='mo layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>重新提交</a>")
							$td12.append($a);
						}
						
						if(item.operationstatus==0){
							$td11.append("已申请");
						}else if(item.operationstatus==1){
							$td11.append("一级审批");
						}else if(item.operationstatus==2){
							$td11.append("二级审批");
						}else if(item.operationstatus==3){
							$td11.append("三级审批");
						}
						
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
						
						$("#cont").append($tr);
					}
				}else{
					//layer.msg(data.reason,{time:2000});
				}
			}
		})
	}//end
	
	
	//查询调休信息
	function queryAllApplyForTx(){
		if($("#approveTime").val()==""||$("#approveTime").val()==undefined){
			var time="";
		}else{
			var time=$("#approveTime").val()+" 00:00:00";
		}
		var status=$("#status").val();
		var holderno=window.top.holderno;
		var obj={"topictype":"tx","applytime":time,"auditstatus":status,"holderno":holderno,"curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryAllApplyFor",
			type:"POST",
			data:obj,
			async:false,
			success:(data)=>{
				//console.log(data);
				$("#cont1").empty();
				total=data.count;
				if(data.flag){
					var res=data.result;
					//权限
					var list=[];
					for(var item of window.top.arr){
						if(item.ModelCode=="1002"){
							list.push(item);
						}
					}
					for(var item of res){
						var holderno=(item.holderno==undefined?"":item.holderno);
						var holdername=(item.holdername==undefined?"":item.holdername);
						var departmentname=(item.departmentname==undefined?"":item.departmentname);
						var place=(item.place==undefined?"":item.place);
						var detailedplace=(item.detailedplace==undefined?"":item.detailedplace);
						var causetype=(item.causetype==undefined?"":item.causetype);
						var applytime=(item.applytime==undefined?"":item.applytime);
						var begintime=(item.begintime==undefined?"":item.begintime);
						var endtime=(item.endtime==undefined?"":item.endtime);
						var remark=(item.remark==undefined?"":item.remark);
						
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+holderno+"</td>");
						var $td2=$("<td>"+holdername+"</td>");
						var $td3=$("<td>"+departmentname+"</td>");
						var $td4=$("<td>"+applytime+"</td>");
						var $td5=$("<td>"+begintime+"</td>");
						var $td6=$("<td>"+endtime+"</td>");
						var $td7=$("<td></td>");
						var $td8=$("<td>"+remark+"</td>");
						var $td9=$("<td></td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						var arr=item.firstapproval.split(",");
						for(var i=0;i<arr.length;i++){
							var $span=$("<span>"+arr[i]+"</span>");
							$td7.append($span);
						}
						
						
						var $a1="";
						var $text="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='updateIntermission.html' class='tiaoxiu layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>修改</a>");
						  }
						 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
							 $text="";
						  }else {
							 $text=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-themeno='"+item.themeno+"'>删除</a>");
						  }
						 if($a1==""&&$text==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>");
							 $text=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>");
						 }
						
						if(item.auditstatus==10){
							$td9.append("未审批").css("color","#FF9100");
							$td11.append($a1);
							$td11.append($text);
						}else if(item.auditstatus==11){
							$td9.append("审批中").css("color","#FF9100");
							$td11.append($text);
						}else if(item.auditstatus==12){
							$td9.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td9.append("驳回").css("color","#D30C0C");
							var $a=$("<a href='updateIntermission.html' class='tiaoxiu layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>重新提交</a>")
							$td11.append($a);
						}
						
						if(item.operationstatus==0){
							$td10.append("已申请");
						}else if(item.operationstatus==1){
							$td10.append("一级审批");
						}else if(item.operationstatus==2){
							$td10.append("二级审批");
						}else if(item.operationstatus==3){
							$td10.append("三级审批");
						}
						
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
						
						$("#cont1").append($tr);
					}
				}
			}
		})
	}//end

	
	//点击取消
	$(document).on("click",".shan",function(){
		var themeno=$(this).attr("data-themeno");
		var obj={"themeno":themeno};
		console.log(obj);
		layer.confirm("确定删除？",{title:"提示信息"},function(index){
			layer.close(index);
			$.ajax({
				url:url+"/appeme/delTheme",
				type:"POST",
				data:obj,
				success:(data)=>{
					if(data.flag){
						layer.msg("删除成功!",{time:2000},function(){
							if($(".main-tab .curr a").html()=="加班申请"){
								queryAllApplyForJb();
							}else if($(".main-tab .curr a").html()=="调休申请"){
								queryAllApplyForTx();
							}else if($(".main-tab .curr a").html()=="出差申请"){
								queryAllApplyForCc();
							}else if($(".main-tab .curr a").html()=="请假申请"){
								queryAllApplyForQj();
							}else if($(".main-tab .curr a").html()=="补打卡申请"){
								queryAllApplyForBk();
							}
						})
					}else{
						layer.msg(data.reason,{time:2000});
					}
				}
				
			})
		})
		
	})
	//点击出差修改
	$(document).on("click",".cc",function(){
		var themeno=$(this).attr("data-themeno");
		localStorage.themeno=themeno;
	})
	//点击请假修改
	$(document).on("click",".qj",function(){
		var themeno1=$(this).attr("data-themeno");
		localStorage.themeno1=themeno1;
	})
	
	//点击补打卡修改
	$(document).on("click",".bk",function(){
		var themeno2=$(this).attr("data-themeno");
		localStorage.themeno2=themeno2;
	})
	
	//点击加班修改
	$(document).on("click",".mo",function(){
		var themeno3=$(this).attr("data-themeno");
		localStorage.themeno3=themeno3;
		
	})
	//点击调休修改
	$(document).on("click",".tiaoxiu",function(){
		var themeno4=$(this).attr("data-themeno");
		localStorage.themeno4=themeno4;
	})
	
//url解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
	
	
})
