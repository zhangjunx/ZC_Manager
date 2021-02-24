$(function(){
	var total;
	var curpage=1;//当前页
	var pagesize=20;//每页显示的条数
	//查询出差审批
	queryApprovalMsgCC();
	getPage(total)
	//日期插件
	layui.use("laydate",function(){
		var laydate=layui.laydate;
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
						if($(".main-tab .curr a").html()=="出差审批"){
							queryApprovalMsgCC();
						}else if($(".main-tab .curr a").html()=="请假审批"){
							queryApprovalMsgQJ();
						}else if($(".main-tab .curr a").html()=="补打卡审批"){
							queryApprovalMsgBK();
						}else if($(".main-tab .curr a").html()=="加班审批"){
							queryApprovalMsgJB();
						}else if($(".main-tab .curr a").html()=="调休审批"){
							queryApprovalMsgTX();
						}
					}
				}
			})
		})
	}//end
	//选项卡
	$(".main-tab .label").click(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".approval table").eq($(this).index()).show().siblings().hide();
		if($(this).index()==0){
			//出差
			queryApprovalMsgCC();
			getPage(total);
		}else if($(this).index()==1){
			//请假
			queryApprovalMsgQJ();
			getPage(total);
		}else if($(this).index()==2){
			//补打卡
			queryApprovalMsgBK();
			getPage(total);
		}else if($(this).index()==3){
			//加班
			queryApprovalMsgJB();
			getPage(total);
		}else if($(this).index()==4){
			//调休
			queryApprovalMsgTX();
			getPage(total);
		}
	})
	
	//点击批准
	$(document).on("click",".mo",function(){
		var that=this;
		var operationstatus=$(this).attr("data-operationstatus");
		var themeno=$(this).attr("data-themeno");
		var place=$(this).attr("data-place");
		var deviceno=$(this).parent().siblings().eq(4).attr("data-deviceno");
		var holderno=window.top.holderno;
		var pholderno = $(this).parent().siblings().eq(1).html();
		var punchtime=$(this).attr("data-time");
		var causetype=$(this).attr("data-causetype");
		var departmentno=$(this).attr("data-deptno");
		var firstapproval=$(this).attr("data-first");
		var secondapproval=$(this).attr("data-second");
		var thirdapproval=$(this).attr("data-third");
		var doorname=$(this).parent().siblings().eq(4).html();
		var holdername=$(this).parent().siblings().eq(2).html();
		var deptname=$(this).parent().siblings().eq(3).html();
		
		if($(".main-tab .curr a").html()=="出差审批"){
			var obj={"topictype":"cc","themeno":themeno,"auditstatus":12,"operationstatus":operationstatus,"holderno":holderno};
		}else if($(".main-tab .curr a").html()=="请假审批"){
			//一级审批
			if(operationstatus==0){
				if(secondapproval==""){
					var obj={"topictype":"qj","themeno":themeno,"auditstatus":12,"operationstatus":1,"holderno":holderno};
				}else{
					var obj={"topictype":"qj","themeno":themeno,"auditstatus":11,"operationstatus":1,"holderno":holderno};
				}
				//二级审批
			}else if(operationstatus==1){
				if(thirdapproval==""){
					var obj={"topictype":"qj","themeno":themeno,"auditstatus":12,"operationstatus":2,"holderno":holderno};
				}else{
					var obj={"topictype":"qj","themeno":themeno,"auditstatus":11,"operationstatus":2,"holderno":holderno};
				}
				//三级审批
			}else if(operationstatus==2){
				var obj={"topictype":"qj","themeno":themeno,"auditstatus":12,"operationstatus":3,"holderno":holderno};
			}
		}else if($(".main-tab .curr a").html()=="补打卡审批"){
			var obj={"deviceno":deviceno,"pholderno":pholderno,"deptname":deptname,"holdername":holdername,"doorname":doorname,"topictype":"bk","themeno":themeno,"auditstatus":12,"operationstatus":operationstatus,"departmentno":departmentno,"causetype":causetype,"punchtime":punchtime,"place":place,"holderno":holderno};
		}else if($(".main-tab .curr a").html()=="加班审批"){
			var obj={"topictype":"jb","themeno":themeno,"auditstatus":12,"operationstatus":operationstatus,"holderno":holderno};
		}else if($(".main-tab .curr a").html()=="调休审批"){
			var obj={"topictype":"tx","themeno":themeno,"auditstatus":12,"operationstatus":operationstatus,"holderno":holderno};
		}
		$.ajax({
			url:url+"/appeme/updateOperation",
			type:"post",
			data:obj,
			success:function(data){
				console.log(data);
				if(data.flag){
					layer.msg("已批准!",{time:2000},function(){
						$(that).parent().parent().remove();
					})
				}else{
					layer.msg("操作失败!",{time:2000});
				}
			}
		})
	})
	
	
	//点击驳回
	var obj;
	$(document).on("click",".shan",function(){
		$(".holder_add").fadeIn(500);
		$(".holder_box").fadeIn(500);
		var operationstatus=$(this).attr("data-operationstatus");
		var themeno=$(this).attr("data-themeno");
		var place=$(this).attr("data-place");
		var holderno=window.top.holderno;
		var punchtime=$(this).attr("data-time");
		var causetype=$(this).attr("data-causetype");
		var departmentno=$(this).attr("data-deptno");
		var secondapproval=$(this).attr("data-second");
		var thirdapproval=$(this).attr("data-third");
		if($(".main-tab .curr a").html()=="出差审批"){
			obj={"topictype":"cc","themeno":themeno,"auditstatus":13,"operationstatus":operationstatus,"holderno":holderno};
		}else if($(".main-tab .curr a").html()=="请假审批"){
			if(operationstatus==0){
				obj={"topictype":"qj","themeno":themeno,"auditstatus":13,"operationstatus":1,"holderno":holderno};
			}else if(operationstatus==1){
				obj={"topictype":"qj","themeno":themeno,"auditstatus":13,"operationstatus":2,"holderno":holderno};
			}else if(operationstatus==2){
				obj={"topictype":"qj","themeno":themeno,"auditstatus":13,"operationstatus":3,"holderno":holderno};
			}
		}else if($(".main-tab .curr a").html()=="补打卡审批"){
			obj={"topictype":"bk","themeno":themeno,"auditstatus":13,"operationstatus":operationstatus,"causetype":causetype,"departmentno":departmentno,"punchtime":punchtime,"place":place,"holderno":holderno};
		}else if($(".main-tab .curr a").html()=="加班审批"){
			obj={"topictype":"jb","themeno":themeno,"auditstatus":13,"operationstatus":operationstatus,"holderno":holderno};
		}else if($(".main-tab .curr a").html()=="调休审批"){
			obj={"topictype":"tx","themeno":themeno,"auditstatus":13,"operationstatus":operationstatus,"holderno":holderno};
		}
	})
	
	
	//点击弹窗的叉
	$(".quxiao").click(function(){
		$(".holder_add").fadeOut(500);
		$(".holder_box").fadeOut(500);
	})
	
	//点击弹窗的确定
	$(".bottom_sure").click(function(){
		$(".holder_add").fadeOut(500);
		$(".holder_box").fadeOut(500);
		var that=this;
		var remark=$(".door_center textarea").val();
		obj.remark=remark;
		$.ajax({
			url:url+"/appeme/updateOperation",
			type:"post",
			data:obj,
			success:function(data){
				console.log(data);
				if(data.flag){
					layer.msg("驳回成功!",{time:2000},function(){
						if($(".main-tab .curr a").html()=="出差审批"){
							queryApprovalMsgCC();
						}else if($(".main-tab .curr a").html()=="请假审批"){
							queryApprovalMsgQJ();
						}else if($(".main-tab .curr a").html()=="补打卡审批"){
							queryApprovalMsgBK();
						}else if($(".main-tab .curr a").html()=="加班审批"){
							queryApprovalMsgJB();
						}else if($(".main-tab .curr a").html()=="调休审批"){
							queryApprovalMsgTX();
						}
					});
				}else{
					layer.msg("驳回失败!",{time:2000});
				}
			}
		})
	})
	
	//点击弹窗的取消
	$(".bottom_qx").click(function(){
		$(".holder_add").fadeOut(500);
		$(".holder_box").fadeOut(500);
	})
	
	
	
	function queryApprovalMsgCC(){
		var holderno=window.top.holderno;
		var obj={"holderno":holderno,"topictype":"cc","curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryApprovalMsg",
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				$("#cont1").empty();
				total=data.count;
				//权限
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="1004"){
						list.push(item);
					}
				}
				if(data.flag){
					var res=data.result;
					res.forEach(function(item,index){
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+(index+1)+"</td>");
						var $td2=$("<td>"+item.holderno+"</td>");
						var $td3=$("<td>"+item.departmentname+"</td>");
						var $td4=$("<td>"+item.holdername+"</td>");
						var $td5=$("<td>"+item.applytime+"</td>");
						var $td6=$("<td>"+item.begintime+"</td>");
						var $td7=$("<td>"+item.endtime+"</td>");
						var $td8=$("<td>"+item.causetype+"</td>");
						var $td9=$("<td>"+item.remark+"</td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						var $td12=$("<td></td>");
						var $td13=$("<td>"+item.place+"</td>");
						var $td14=$("<td>"+item.detailedplace+"</td>");
						//权限
						var $a1="";
						var $a2="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a2="";
							 $a1="";
						  }else {
							  $a1=$("<a href='javascript:;' data-themeno='"+item.themeno+"' data-auditstatus='"+item.auditstatus+"' data-operationstatus='"+item.operationstatus+"' class='mo layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>批准</a>")
							  $a2=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-operationstatus='"+item.operationstatus+"' data-themeno='"+item.themeno+"'>驳回</a>")
						  }
						 if($a1==""&&$a2==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>批准</a>")
							 $a2=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>驳回</a>");
						 }
						 $td12.append($a1);
						 $td12.append($a2);
						
						if(item.auditstatus==10){
							$td10.append("未审批").css("color","#FF9100");
						}else if(item.auditstatus==11){
							$td10.append("审批中").css("color","#FF9100");
						}else if(item.auditstatus==12){
							$td10.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td10.append("驳回").css("color","#D30C0C");
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
						$tr.append($td4);
						$tr.append($td3);
						$tr.append($td13);
						$tr.append($td14);
						$tr.append($td5);
						$tr.append($td6);
						$tr.append($td7);
						$tr.append($td8);
						$tr.append($td9);
						$tr.append($td10);
						$tr.append($td11);
						$tr.append($td12);
						$("#cont1").append($tr);
					})
				}
			}
		})
	}
	
	
	function queryApprovalMsgQJ(){
		var holderno=window.top.holderno;
		var obj={"holderno":holderno,"topictype":"qj","curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryApprovalMsg",
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				console.log(data)
				$("#cont2").empty();
				total=data.count;
				//权限
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="1004"){
						list.push(item);
					}
				}
				if(data.flag){
					var res=data.result;
					res.forEach(function(item,index){
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+(index+1)+"</td>");
						var $td2=$("<td>"+item.holderno+"</td>");
						var $td3=$("<td>"+item.departmentname+"</td>");
						var $td4=$("<td>"+item.holdername+"</td>");
						var $td5=$("<td>"+item.applytime+"</td>");
						var $td6=$("<td>"+item.causetype+"</td>");
						var $td7=$("<td>"+item.begintime+"</td>");
						var $td8=$("<td>"+item.endtime+"</td>");
						var $td9=$("<td>"+item.detailedplace+"</td>");
						var $td10=$("<td>"+item.remark+"</td>");
						var $td11=$("<td></td>");
						var $td12=$("<td></td>");
						var $td13=$("<td></td>");
						//权限
						var $a1="";
						var $a2="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
							 $a2="";
						  }else {
							  $a1=$("<a href='javascript:;' data-first='"+item.firstapproval+"' data-second='"+item.secondapproval+"' data-third='"+item.thirdapproval+"' data-themeno='"+item.themeno+"' data-auditstatus='"+item.auditstatus+"' data-operationstatus='"+item.operationstatus+"' class='mo layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>批准</a>")
							  $a2=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-operationstatus='"+item.operationstatus+"' data-second='"+item.secondapproval+"' data-third='"+item.thirdapproval+"' data-themeno='"+item.themeno+"'>驳回</a>")
						  }
						 if($a1==""&&$a2==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>批准</a>")
							  $a2=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>驳回</a>")
						 }
						 $td13.append($a1);
						 $td13.append($a2);
						
						if(item.auditstatus==10){
							$td11.append("未审批").css("color","#FF9100");
						}else if(item.auditstatus==11){
							$td11.append("审批中").css("color","#FF9100");
						}else if(item.auditstatus==12){
							$td11.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td11.append("驳回").css("color","#D30C0C");
						}
						
						if(item.operationstatus==0){
							$td12.append("已申请，待我审批");
						}else if(item.operationstatus==1){
							$td12.append("一级审批已通过，待我审批");
						}else if(item.operationstatus==2){
							$td12.append("二级审批已通过，待我审批");
						}
						$tr.append($td1);
						$tr.append($td2);
						$tr.append($td4);
						$tr.append($td3);
						$tr.append($td5);
						$tr.append($td6);
						$tr.append($td7);
						$tr.append($td8);
						$tr.append($td9);
						$tr.append($td10);
						$tr.append($td11);
						$tr.append($td12);
						$tr.append($td13);
						$("#cont2").append($tr);
					})
				}
			}
		})
	}
	
	
	
	function queryApprovalMsgBK(){
		var holderno=window.top.holderno;
		var obj={"holderno":holderno,"topictype":"bk","curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryApprovalMsg",
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				$("#cont3").empty();
				total=data.count;
				//权限
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="1004"){
						list.push(item);
					}
				}
				if(data.flag){
					var res=data.result;
					res.forEach(function(item,index){
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+(index+1)+"</td>");
						var $td2=$("<td>"+item.holderno+"</td>");
						var $td3=$("<td>"+item.departmentname+"</td>");
						var $td4=$("<td>"+item.holdername+"</td>");
						var $td5=$("<td></td>");
						var $td6=$("<td></td>");
						var $td7=$("<td>"+item.applytime+"</td>");
						var $td8=$("<td>"+item.punchtime+"</td>");
						var $td9=$("<td>"+item.remark+"</td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						var $td12=$("<td></td>");
						//权限
						var $a1="";
						var $a2="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='javascript:;' data-causetype='"+item.causetype+"' data-deptno='"+item.departmentno+"' data-time='"+item.punchtime+"' data-themeno='"+item.themeno+"' data-place='"+item.place+"' data-operationstatus='"+item.operationstatus+"' class='mo layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>批准</a>")
							  $a2=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-place='"+item.place+"' data-causetype='"+item.causetype+"' data-deptno='"+item.departmentno+"' data-time='"+item.punchtime+"' data-operationstatus='"+item.operationstatus+"' data-themeno='"+item.themeno+"'>驳回</a>")
						  }
						 if($a1==""&&$a2==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>批准</a>")
							 $a2=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>驳回</a>")
						 }
						 $td12.append($a1);
						 $td12.append($a2);
						
						if(item.causetype==18){
							$td6.append("进入");
						}else if(item.causetype==19){
							$td6.append("外出");
						}
						if(item.auditstatus==10){
							$td10.append("未审批").css("color","#FF9100");
						}else if(item.auditstatus==11){
							$td10.append("审批中").css("color","#FF9100");
						}else if(item.auditstatus==12){
							$td10.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td10.append("驳回").css("color","#D30C0C");
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
						var place=item.place;
						$.ajax({
							url:url+"/DoorUnit/queryDoorByDoorNo",
							type:"POST",
							data:{"doorno":place},
							async:false,
							success:(data)=>{
								console.log(data);
								if(data.flag){
									var res=data.result;
									$td5.append(res[0].doorname);
									$td5.attr("data-deviceno",res[0].deviceno);
								}
							}
							
						})
						$tr.append($td1);
						$tr.append($td2);
						$tr.append($td4);
						$tr.append($td3);
						$tr.append($td5);
						$tr.append($td6);
						$tr.append($td7);
						$tr.append($td8);
						$tr.append($td9);
						$tr.append($td10);
						$tr.append($td11);
						$tr.append($td12);
						$("#cont3").append($tr);
					})
				}
			}
		})
	}
	
	
	function queryApprovalMsgJB(){
		var holderno=window.top.holderno;
		var obj={"holderno":holderno,"topictype":"jb","curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryApprovalMsg",
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				$("#cont4").empty();
				total=data.count;
				//权限
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="1004"){
						list.push(item);
					}
				}
				if(data.flag){
					var res=data.result;
					res.forEach(function(item,index){
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+(index+1)+"</td>");
						var $td2=$("<td>"+item.holderno+"</td>");
						var $td3=$("<td>"+item.departmentname+"</td>");
						var $td4=$("<td>"+item.holdername+"</td>");
						var $td5=$("<td>"+item.applytime+"</td>");
						var $td6=$("<td>"+item.begintime+"</td>");
						var $td7=$("<td>"+item.endtime+"</td>");
						var $td8=$("<td>"+item.detailedplace+"</td>");
						var $td9=$("<td>"+item.remark+"</td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						var $td12=$("<td></td>");
						//权限
						var $a1="";
						var $a2="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='javascript:;' data-themeno='"+item.themeno+"' data-auditstatus='"+item.auditstatus+"' data-operationstatus='"+item.operationstatus+"' class='mo layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>批准</a>");
							  $a2=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-operationstatus='"+item.operationstatus+"' data-themeno='"+item.themeno+"'>驳回</a>")
						  }
						 if($a1==""&&$a2==""){
							 $a1=$("<a href='javascript:;'  class='layui-bg-gray layui-btn layui-btn-xs'>批准</a>");
							 $a2=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>驳回</a>")
						 }
						 $td12.append($a1);
						 $td12.append($a2);
						
						if(item.auditstatus==10){
							$td10.append("未审批").css("color","#FF9100");
						}else if(item.auditstatus==11){
							$td10.append("审批中").css("color","#FF9100");
						}else if(item.auditstatus==12){
							$td10.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td10.append("驳回").css("color","#D30C0C");
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
						$tr.append($td4);
						$tr.append($td3);
						$tr.append($td5);
						$tr.append($td6);
						$tr.append($td7);
						$tr.append($td8);
						$tr.append($td9);
						$tr.append($td10);
						$tr.append($td11);
						$tr.append($td12);
						$("#cont4").append($tr);
					})
				}
			}
		})
	}
	
	function queryApprovalMsgTX(){
		var holderno=window.top.holderno;
		var obj={"holderno":holderno,"topictype":"tx","curpage":curpage,"pagesize":pagesize};
		$.ajax({
			url:url+"/appeme/queryApprovalMsg",
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				$("#cont5").empty();
				total=data.count;
				//权限
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="1004"){
						list.push(item);
					}
				}
				if(data.flag){
					var res=data.result;
					res.forEach(function(item,index){
						var $tr=$("<tr></tr>");
						var $td1=$("<td>"+(index+1)+"</td>");
						var $td2=$("<td>"+item.holderno+"</td>");
						var $td3=$("<td>"+item.departmentname+"</td>");
						var $td4=$("<td>"+item.holdername+"</td>");
						var $td5=$("<td>"+item.applytime+"</td>");
						var $td6=$("<td>"+item.begintime+"</td>");
						var $td7=$("<td>"+item.endtime+"</td>");
						var $td8=$("<td>"+item.remark+"</td>");
						var $td9=$("<td></td>");
						var $td10=$("<td></td>");
						var $td11=$("<td></td>");
						//权限
						var $a1="";
						var $a2="";
						 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='javascript:;' data-themeno='"+item.themeno+"' data-auditstatus='"+item.auditstatus+"' data-operationstatus='"+item.operationstatus+"' class='mo layui-btn layui-btn-xs' data-themeno='"+item.themeno+"'>批准</a>")
							  $a2=$("<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger' data-operationstatus='"+item.operationstatus+"' data-themeno='"+item.themeno+"'>驳回</a>")
						  }
						 if($a1==""&&$a2==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>批准</a>")
							 $a2=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>驳回</a>")
						 }
						 $td11.append($a1);
						 $td11.append($a2);
						
						if(item.auditstatus==10){
							$td9.append("未审批").css("color","#FF9100");
						}else if(item.auditstatus==11){
							$td9.append("审批中").css("color","#FF9100");
						}else if(item.auditstatus==12){
							$td9.append("同意").css("color","#1AB6A2");
						}else if(item.auditstatus==13){
							$td9.append("驳回").css("color","#D30C0C");
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
						$tr.append($td4);
						$tr.append($td3);
						$tr.append($td5);
						$tr.append($td6);
						$tr.append($td7);
						$tr.append($td8);
						$tr.append($td9);
						$tr.append($td10);
						$tr.append($td11);
						$("#cont5").append($tr);
					})
				}
			}
		})
	}
})