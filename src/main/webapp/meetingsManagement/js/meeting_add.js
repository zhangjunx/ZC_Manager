var optType=0;

var roomtimeList=[];//会议室时间选择结果
var firstroomno="";//会议室id
var firstroomname="";//会议室名称
var firstroomdate="";//会议室对应日期

//操作类型，1：编辑，2：查看
var _opttype = getQueryString("opttype");
var _meetingno = getQueryString("meetingno");

$(function(){
	//日期初始化
	dateInit();
	
	//组织架构初始化
	initTreeList();
	
	//加载会议类型
	initMeetingType();	
	
	//加载通知时间下拉框
	initMeetingNoticeTime();
	
	//编辑初始化一条数据
	if(_meetingno != null && _meetingno != ''){
		$(".main-tab .label a").html("修改会议");
		initOneMeetingInfo();
	}
	
}) 

//=================================================初始化start
//日期初始化
function dateInit() {
	var nowDate = getNowDate();
	layui.use('laydate', function(){
		var laydate = layui.laydate;
		//执行一个laydate实例
		lay('.date').each(function() {
			laydate.render({
				elem: this,
				type:"datetime",
				trigger:"click"
			});
		});
		
		laydate.render({
		  elem: '#meetingdate',
		  value: nowDate,
		  done:function(value,date){
			  //改变单元个的属性值
			  for(var i=0;i<$("#tabledata td").length;i++){
				  if($("#tabledata td").eq(i).find("img").length>0){
					  $("#tabledata td").eq(i).attr("querydate",value);
				  }
			  }
			  //改变日期列
			  for(var j=0;j<$(".tddate").length;j++){
				  $(".tddate").eq(j).html(value);
			  }
			  
			  //重新渲染图片
			  var curtime = getCurTime();
			  getUsedTime(value,curtime);
		   }
		});
	});
}// end

function initTreeList(){
	layui.use(['tree', 'util'], function(){
	  var tree = layui.tree,
	  layer = layui.layer,
	  util = layui.util;
	  
	  $.ajax({
		  url:url+'/DepartmentData/getDeptTree',
		  type:'post',
		  dataType:'json',
		  data:{"res":true},
		  success:function(data){
			    tree.render({
				    elem:'#test12',
				    data:data.result,
				    showCheckbox: true,  //是否显示复选框
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function(obj){
				    	
				    },
				    oncheck: function(obj){
					      var arr=[];
						  for(var i=0;i<$(".layui-form-checked").length;i++){
						  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
						  	  arr.push(id);
						   }
						   var arrs = JSON.stringify(arr);
					       $.ajax({
					    	 url:url+'/DepartmentData/getHolderByDeptBatch',
						     type:'post',
						     contentType:"application/json", // 指定这个协议很重要
						     dataType:'json',
						     data:arrs,
						     success:function(data){
						    	 console.log(data);
						    	 $("#shuttle_box_left").empty();
						    	 if(data.flag){
						    		 var html="";
						    		 $.each(data.result,function(i,val){
						    			 var departmentname=(val.departmentname==undefined?"":val.departmentname);
										 var holdername=(val.holdername==undefined?"":val.holdername);
										 var holderno=(val.holderno==undefined?"":val.holderno);
										 var departmentno=(val.departmentno==undefined?"":val.departmentno);
										 html+="<li><img src='../img/g.png'><h5><p class='username' id='"+holderno+"'>"+holdername+"</p><p>"+departmentname+"</p></h5><span class='checkbox'  style='float: none;'></span></li>";
						    		 })
						    		 $("#shuttle_box_left").append(html);
						    	 }else{
						    		 layer.msg(data.reason,{time:3000});
						    	 }
						     }
					      })
					  }
			  });
		  }
	  })
	});
}
function initMeetingType(){
	$.ajax({
		url:url+'/meeting/getComboList?typeName=meetingtype',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data,status){
			var html='';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].name+'">'+data.result[i].value+'</option>';
			}
			$("#meetingtype").append(html);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}

function initMeetingNoticeTime(){
	$.ajax({
		url:url+'/meeting/getComboList?typeName=meetingNotice',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data,status){
			var html='';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].name+'">'+data.result[i].value+'</option>';
			}
			$("#remind").append(html);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}

//编辑
function initOneMeetingInfo(){
	$.ajax({
		url:url+'/meeting/getOneMeetingInfo?meetingno='+_meetingno,
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data1,status){
			var data = JSON.parse(data1.result);
			console.log(data);
			//召集人赋值
			var promoterList=[];
			var obj1={"holderno":data.promoter,"holdername":data.promotername}
			promoterList.push(obj1);
			setPromoterVal(promoterList);
			
			//主持人赋值
			if(data.hostList != null && data.hostList != ''){
				var hostList=[];
				for(var i=0;i<data.hostList.length;i++){
					var obj={"holderno":data.hostList[i].HolderNo,"holdername":data.hostList[i].HolderName};
					hostList.push(obj);
				}
				setHostVal(hostList);
			}
			
			//参与人赋值
			if(data.person != null && data.person != ''){
				var personList=[];
				for(var i=0;i<data.person.length;i++){
					var obj={"holderno":data.person[i].holderid,"holdername":data.person[i].holdername};
					personList.push(obj);
				}
				setPersonVal(personList);
			}
			
			//审批人赋值
			if(data.ApproverList != null && data.ApproverList != ''){
				var ApproverList=[];
				for(var i=0;i<data.ApproverList.length;i++){
					var obj={"holderno":data.ApproverList[i].HolderNo,"holdername":data.ApproverList[i].HolderName};
					ApproverList.push(obj);
				}
				setApproverVal(ApproverList);
			}
			
			//-----------------内部会议室
			if(data.selectedtime != null && data.selectedtime != ''){
				for(var i=0;i<data.selectedtime.length;i++){
					var obj={"timeid":data.selectedtime[i].timeid,"timename":data.selectedtime[i].timename};
					roomtimeList.push(obj);
				}
				
				firstroomno = data.roomid;
				firstroomname = data.roomname;
				firsttimeno = data.selectedtime[0].timeid;
				firstroomdate = data.selectedtime[0].roomdate;
			}
			
			//初始化数据
			$("#meetingtitle").val(data.mettingtitle);
			$("#meetingtype").val(data.mettingtype);
			$("#startdate").val(data.startdate);
			$("#enddate").val(data.enddate);
			$("#signinstarttime").val(data.signinstarttime);
			$("#signinendtime").val(data.signinendtime);
			$("#signbackstarttime").val(data.signbackstarttime);
			$("#signbackendtime").val(data.signbackendtime);
			$("#promoterphone").val(data.promoterphone);
			$("#remindcontext").val(data.remindcontext);
			$("#remind").val(data.remind);
			$("#roomname").val(firstroomname);
			
			$("#roomname").attr("valuename",firstroomno);
			
			
			
			
			//-----------------外部会议室
			if(data.roomtype == 2){
			    $("#openroomwin").css("pointer-events","none");
				$("#roomtype").addClass("curr");
				$("#otherDiv").show();
				$("#meetinglocation").val(data.outroomname);
				
				if(data.signinSelected.length>0){
					for(var i=0;i<data.signinSelected.length;i++){
						a_signin.push(data.signinSelected.signplace);
						var obj=data.signinSelected[i].signplace+":"+data.signinSelected[i].DoorName
						a_signinmap.push(obj);
					}
				}
				
				if(data.signbckSelected.length>0){
					for(var i=0;i<data.signbckSelected.length;i++){
						a_signback.push(data.signbckSelected.signplace);
						var obj=data.signbckSelected[i].signplace+":"+data.signbckSelected[i].DoorName
						a_signbackmap.push(obj);
					}
				}
				init();
			}
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}

//召集人赋值
function setPromoterVal(promoterList){
	var html='';
	for(var i=0;i<promoterList.length;i++){
		var parm = promoterList[i].holderno;
		html=html+'<span class="selectedPersonStyle" data-dept="'+promoterList[i].deptname+'" value='+promoterList[i].holderno+'>'+promoterList[i].holdername+'</span>';
	}
	$("#selectedpromoter").append(html);
}
//参议人员员赋值
function setPersonVal(personList){
	var html='';
	for(var i=0;i<personList.length;i++){
		var parm = personList[i].holderno;
		html=html+'<span class="selectedPersonStyle" data-dept="'+personList[i].deptname+'" value='+personList[i].holderno+'>'+personList[i].holdername+'</span>';
	}
	$("#selectedperson").append(html);
}
//主持人赋值
function setHostVal(hostList){
	var html='';
	for(var i=0;i<hostList.length;i++){
		var parm = hostList[i].holderno;
		html=html+'<span class="selectedPersonStyle" data-dept="'+hostList[i].deptname+'" value='+hostList[i].holderno+'>'+hostList[i].holdername+'</span>';
	}
	$("#selectedhost").append(html);
}

//审批人赋值
function setApproverVal(ApproverList){
	var html='';
	for(var i=0;i<ApproverList.length;i++){
		var parm = ApproverList[i].holderno;
		html=html+'<span class="selectedPersonStyle" data-dept="'+ApproverList[i].deptname+'" value='+ApproverList[i].holderno+'>'+ApproverList[i].holdername+'</span>';
	}
	$("#selectedApprover").append(html);
}

//签到点赋值
function selectedsignin(signinmap){
	var html = '';
	for(var i=0;i<signinmap.length;i++){
		var keyandvalue = signinmap[i].split(":");
		html=html+'<span class="checkInPoint" value='+keyandvalue[0]+'>'+keyandvalue[1]+'</span>';
	}
	$("#selectedsignin").append(html);
}

//签退点赋值
function selectedsignback(signbackmap){
	var html = '';
	for(var i=0;i<signbackmap.length;i++){
		var keyandvalue = signbackmap[i].split(":");
		html=html+'<span class="checkInPoint" value='+keyandvalue[0]+'>'+keyandvalue[1]+'</span>';
	}
	$("#selectedsignback").append(html);
}

//外部会议室赋值
function init(){
	$("#selectedsignin span").remove();
	$("#selectedsignback span").remove();
	//根据已选择的会议室赋值
	if((a_signinmap != null && a_signinmap != '') || (a_signbackmap != null && a_signbackmap != '')){
		selectedsignin(a_signinmap);
		selectedsignback(a_signbackmap);
	}
}

function getUsedTime(selectedDate,time){
	$.ajax({
		url:url+'/meeting/getUsedTimeList?selectedDate='+selectedDate,
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data,status){
			initImgClass(selectedDate,time,data.result);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}
//=================================================初始化end

//点击其它打开隐藏的div
$(document).on("click","#roomtype",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		$("#openroomwin").css("pointer-events","auto");
		$("#otherDiv").hide();
	}else{
		$(this).addClass("curr");
		$("#openroomwin").css("pointer-events","none");
		$("#otherDiv").show();
	}
})

//弹窗确认
$("#sure").click(function(){
	 var personLength=$("#meeting_box_right .username").length;
	 var list=[];
	 for(var i=0;i<personLength;i++){	
		 var obj={
			 "holderno":$("#meeting_box_right .username").eq(i).attr("id"),
			 "holdername":$("#meeting_box_right .username").eq(i).html(),
			 "deptname":$("#meeting_box_right .username").eq(i).next().html()
		 };
		 list.push(obj);
	 }   
	 if(optType==1){
		 $("#selectedpromoter span").remove();
		 setPromoterVal(list);
	 }else if(optType == 2){
		 $("#selectedperson span").remove();
		 setPersonVal(list);
	 }else if(optType == 3){
		 $("#selectedhost span").remove();
		 setHostVal(list);
	 }else if(optType == 4){
		 $("#selectedApprover span").remove();
		 setApproverVal(list);
	 }
	 $(".select_person").fadeOut(500);
	 $(".select_person_box").fadeOut(500);
})

//===================================================================会议室弹窗start
//打开弹窗
$(document).on("click","#openroomwin",function(){
	$("#roomWin").fadeIn(500);
	$("#roomWin1").fadeIn(500);
	initTableData();
})

//会议室弹窗查询
$("#queryRoomBtn").click(function(){
	initTableData();
})

function initTableData(){
	/*firstroomno="";//第一次选中的会议室no
	firstroomname="";//会议室名称+
	firsttimeno="";//第一次选中的timeno
	firstroomdate="";//会议室对应日期
*/	$.ajax({
   	     url:url+'/meeting/getTimeTitle',
	     type:'post',
	     contentType:"application/json", // 指定这个协议很重要
	     dataType:'json',
	     success:function(data){
	    	 $("#title").empty();
	    	 var val=data.result;
	    	 var titleHtml = '<td width="80">会议室名称</td>';
	    	 titleHtml = titleHtml + '<td width="80">会议室位置</td>';
	    	 titleHtml = titleHtml + '<td width="40">容纳人数</td>';
	    	 titleHtml = titleHtml + '<td width="80">日期</td>';
     		 for(var i=0;i<data.result.length;i++){
     			titleHtml = titleHtml + '<td width="80" value='+data.result[i].name+'>'+data.result[i].value+'</td>';
     		 }
     		 var length=val.length;
     		 $("#title").append(titleHtml);
     		 $.ajax({
     			url:url+"/meetingRoom/getRoomList",
     			type:"post",
     			success:function(data){
     				$("#tabledata").empty();
     				if(data.flag){
     					var res=data.result;
     					for(var item of res){
     						if(item.status == 1){
     							var $tr=$("<tr><td>"+item.roomname+"</td><td>"+item.roomplace+"</td>" +
         								"<td>"+item.roomsize+"</td><td class=\"tddate\">"+$("#meetingdate").val()+"</td></tr>");
         						for(var i=0;i<val.length;i++){
             						var $td=$("<td querydate='"+$("#meetingdate").val()+"' date-name='"+ val[i].value +"'data-fno='"+item.fno+"' date-no='"+val[i].name+"'><image class='checkClass' src='img/uncheck.png'></td>");
             						$tr.append($td);
             					}
         						$("#tabledata").append($tr);
     						}
     					}
     					var curtime = getCurTime();
     					//initImgClass(curtime,"");
     					getUsedTime($("#meetingdate").val(),curtime);
     				}
     			}
     		})
	     }
     })
}

//重新渲染图片
function initImgClass(slectedDate,curtime,data){
	/*firstroomno="";//第一次选中的会议室no
	firstroomname="";//会议室名称+
	firsttimeno="";//第一次选中的timeno
	firstroomdate="";//会议室对应日期
*/	$("#tabledata td img").attr("src","img/uncheck.png").removeClass("nocur");
	$("#tabledata td img").attr("src","img/uncheck.png").removeClass("cur");
	$("#tabledata td img").attr("src","img/uncheck.png").removeClass("uncur");
	var selectedDate=slectedDate.replace(/-/g,"");
	var NowDate=getNowDate().replace(/-/g,"");
	//选择日期等于当前日期，大于当前时间的可选，小于当前时间的不可选
	if(selectedDate == NowDate){
		for(var i=0;i<$("#tabledata td").length;i++){
			if($("#tabledata td").eq(i).find("img").length>0){
				var thistime = ($("#tabledata td").eq(i).attr("date-name")).replace(":","");
				if(curtime > thistime){
					$("#tabledata td").eq(i).find("img").attr("src","img/nocheck.png").addClass("nocur");
				}else{
					$("#tabledata td").eq(i).find("img").attr("src","img/uncheck.png").addClass("uncur");
				}
			}
		}
	}
	//选择日期小于当天日期，全部不可选
	if(selectedDate < NowDate){
		for(var i=0;i<$("#tabledata td").length;i++){
			if($("#tabledata td").eq(i).find("img").length>0){
				$("#tabledata td").eq(i).find("img").attr("src","img/nocheck.png").addClass("nocur");
			}
		}
	}
	//选择日期大于当前日期，全部可选
	if(selectedDate > NowDate){
		for(var i=0;i<$("#tabledata td").length;i++){
			if($("#tabledata td").eq(i).find("img").length>0){
				$("#tabledata td").eq(i).find("img").attr("src","img/uncheck.png").addClass("uncur");
			}
		}
	}
	//在上面情况满足的条件下，继续判断。对于可选的，判断是否已经被占用，已经占用的不可选，未占用的可选
	if(data.length>0){
		for(var i=0;i<$("#tabledata td img.uncur").length;i++){
			var roomno = $("#tabledata td img.uncur").eq(i).parent().attr("data-fno");
			var timeno = $("#tabledata td img.uncur").eq(i).parent().attr("date-no");
			for(var j=0;j<data.length;j++){
				if(data[j].timeid == timeno && data[j].roomID == roomno){
					$("#tabledata td img.uncur").eq(i).attr("src","img/nocheck.png").addClass("nocur");
					continue;
				}
			}
		}
	}
}

//点击check图片
$(document).on("click",".checkClass",function(){
	//已经变灰的不可点击
	if($(this).hasClass("nocur")){
		return;
	}
		//1、没有选中的
		if($("#tabledata img.cur").length==0){
			$(this).attr("src","img/check.png").addClass("cur");
			return;
		}
		//2、只有一个或多个被选中的
		if($("#tabledata img.cur").length>=1){
			var fno1=$(this).parent().attr("data-fno");
			var fno2=$("#tabledata img.cur").eq(0).parent().attr("data-fno");
			if(fno1!=fno2){//不是同一个会议室
				return;
			}
			var length=$("#tabledata img.cur").length;
			var no1=$("#tabledata img.cur").eq(0).parent().attr("date-no");
			var no2=$(this).parent().attr("date-no");
			var no3=$("#tabledata img.cur").eq(length-1).parent().attr("date-no");
			no1=parseInt(no1);
			no2=parseInt(no2);
			if(no2<no1){
				for(var i=no2;i<=no3;i++){
					for(var k=0;k<$(this).parent().siblings().length;k++){
						if($(this).parent().siblings().eq(k).attr("date-no")==i){
							if($(this).parent().siblings().eq(k).find("img").hasClass("nocur")){
								return;
							}
							$(this).parent().siblings().eq(k).find("img").attr("src","img/check.png").addClass("cur");
						}
					}
				}
				$(this).attr("src","img/check.png").addClass("cur");
			}else if(no1==no2){
				$(this).attr("src","img/uncheck.png").removeClass("cur");
			}else{
				for(var i=no1;i<=no2;i++){
					for(var k=0;k<$(this).parent().siblings().length;k++){
						if($(this).parent().siblings().eq(k).attr("date-no")==i){
							if($(this).parent().siblings().eq(k).find("img").hasClass("nocur")){
								return;
							}
							$(this).parent().siblings().eq(k).find("img").attr("src","img/check.png").addClass("cur");
						}
					}
				}
				for(var i=no2;i<=no3;i++){
					for(var k=0;k<$(this).parent().siblings().length;k++){
						if($(this).parent().siblings().eq(k).attr("date-no")==i){
							if($(this).parent().siblings().eq(k).find("img").hasClass("nocur")){
								return;
							}
							$(this).parent().siblings().eq(k).find("img").attr("src","img/uncheck.png").removeClass("cur");
						}
					}
				}
				$(this).attr("src","img/check.png").addClass("cur");
			}
		}
})

//点击弹出框的确定
$("#roombtn").click(function(){
	//roomname
	for(var i = 0;i<$(".cur").length;i++){
		var obj = {"meetingdate":$(".cur").eq(i).parent().attr("querydate"),
				   "meetingid":$(".cur").eq(i).parent().attr("data-fno"),
				   "timeid":$(".cur").eq(i).parent().attr("date-no")};
		roomtimeList.push(obj);
	}
	firstroomno=$("#tabledata img.cur").eq(0).parent().attr("data-fno");//会议室id
	firstroomname=$("#tabledata img.cur").eq(0).parent().siblings().eq(0).html();//会议室名称
	firstroomdate=$("#meetingdate").val();//会议室对应日期
	$("#roomname").val(firstroomname);
	$("#roomname").attr("valuename",firstroomno);
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//===================================================================会议室弹窗end

function saveMeetingInfo(){
	//获取选中的值
	var meetingtitle = $("#meetingtitle").val();
	var meetingtype = $("#meetingtype").val();
	var startdate = $("#startdate").val();
	var enddate = $("#enddate").val();
	var signinstarttime = $("#signinstarttime").val();
	var signinendtime = $("#signinendtime").val();
	var signbackstarttime = $("#signbackstarttime").val();
	var signbackendtime = $("#signbackendtime").val();
	var promoterphone = $("#promoterphone").val();
	
	var meetinglocation = $("#meetinglocation").val();
	var remindcontext = $("#remindcontext").val();
	
	//会议提醒时间
	var remind = $("#remind option:selected").val();
	
	//会议室时间段
	var roomtime = [];
	for(var i=0;i<roomtimeList.length;i++){
		roomtime.push(roomtimeList[i].timeid);
	}
	
	//会议室id
	var roomid = firstroomno;
	
	//会议日期
	var meetingdate = firstroomdate;
	
	//外会议签到点
	var outroomin = [];
	for(var i=0;i<$("#selectedsignin .checkInPoint").length;i++){
		outroomin.push($("#selectedsignin .checkInPoint").eq(i).attr("value"));
	}
	
	//外会议签退点
	var outroomback = [];
	for(var i=0;i<$("#selectedsignback .checkInPoint").length;i++){
		outroomback.push($("#selectedsignback .checkInPoint").eq(i).attr("value"));
	}
	
	//召集人
	var promoter = [];
	for(var i=0;i<$("#selectedpromoter .selectedPersonStyle").length;i++){
		promoter.push($("#selectedpromoter .selectedPersonStyle").eq(i).attr("value"));
	}
	
	//参议人员
	var person = [];
	for(var i=0;i<$("#selectedperson .selectedPersonStyle").length;i++){
		person.push($("#selectedperson .selectedPersonStyle").eq(i).attr("value"));
	}
	
	//主持人
	var host = [];
	for(var i=0;i<$("#selectedhost .selectedPersonStyle").length;i++){
		host.push($("#selectedhost .selectedPersonStyle").eq(i).attr("value"));
	}
	
	//审批人
	var Approver = [];
	for(var i=0;i<$("#selectedApprover .selectedPersonStyle").length;i++){
		Approver.push($("#selectedApprover .selectedPersonStyle").eq(i).attr("value"));
	}
	
	//会议室类型，内部，外部
	var roomtype = ($("#roomtype.curr").attr("value")) == undefined?1:2;
	
	if(meetingtitle==""){
		layer.msg("请输入会议主题!",{time:2000});
		return;
	}
	if(startdate==""){
		layer.msg("请输入会议开始时间!",{time:2000});
		return;
	}
	if(enddate==""){
		layer.msg("请输入会议结束时间!",{time:2000});
		return;
	}
	if(signinstarttime==""){
		layer.msg("请输入会议签到开始时间!",{time:2000});
		return;
	}
	if(signinendtime==""){
		layer.msg("请输入会议签到结束时间!",{time:2000});
		return;
	}
	if(signbackstarttime==""){
		layer.msg("请输入会议签退开始时间!",{time:2000});
		return;
	}
	if(signbackendtime==""){
		layer.msg("请输入会议签退结束时间!",{time:2000});
		return;
	}
	if(promoter.length==0){
		layer.msg("请选择召集人!",{time:2000});
		return;
	}
	if(person.length==0){
		layer.msg("请选择参议人员!",{time:2000});
		return;
	}
	if(host.length==0){
		layer.msg("请选择主持人!",{time:2000});
		return;
	}
	if(Approver.length==0){
		layer.msg("请选择审批人!",{time:2000});
		return;
	}
	
	if($("#roomtype").hasClass("curr")){
		if(meetinglocation==""){
			layer.msg("请输入会议室位置!",{time:2000});
			return;
		}
		if(outroomin.length==0){
			layer.msg("请选择会议签到点!",{time:2000});
			return;
		}
		if(outroomback.length==0){
			layer.msg("请选择会议签退点!",{time:2000});
			return;
		}
		var obj = {
				"meetingtitle":meetingtitle,
				"meetingtype":meetingtype,
				"startdate":startdate,
				"enddate":enddate,
				"signinstarttime":signinstarttime,
				"signinendtime":signinendtime,
				"signbackstarttime":signbackstarttime,
				"signbackendtime":signbackendtime,
				"promoter":promoter.join(),
				"promoterphone":promoterphone,
				"meetinglocation":meetinglocation,
				"remindcontext":remindcontext,
				"remind":remind,
				"meetingdate":meetingdate,
				"person":person.join(),
				"host":host.join(),
				"Approver":Approver.join(),
				"creator":window.top.holderno,
				"creatdate":getNowFormatDate(),
				"roomtype":roomtype,
				"outroomin":outroomin.join(),
				"outroomback":outroomback.join(),
				"fno":_meetingno
		}
	}else{
		if($("#roomname").val()==""){
			layer.msg("请选择会议室!",{time:2000});
			return;
		}
		var obj = {
				"meetingtitle":meetingtitle,
				"meetingtype":meetingtype,
				"startdate":startdate,
				"enddate":enddate,
				"signinstarttime":signinstarttime,
				"signinendtime":signinendtime,
				"signbackstarttime":signbackstarttime,
				"signbackendtime":signbackendtime,
				"promoter":promoter.join(),
				"promoterphone":promoterphone,
				"remindcontext":remindcontext,
				"remind":remind,
				"roomtime":roomtime.join(),
				"roomid":roomid,
				"meetingdate":meetingdate,
				"person":person.join(),
				"host":host.join(),
				"Approver":Approver.join(),
				"creator":window.top.holderno,
				"creatdate":getNowFormatDate(),
				"roomtype":roomtype,
				"fno":_meetingno
		}
	}
	console.log(obj);
	$.ajax({
		url:url+'/meeting/saveMeetingInfo',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		success:function(data){
			window.location.href = 'meetingList.html';
		},
		error:function(data){
			console.log(data);
		}
	})
}


$(document).on("dblclick","#selectedsignin .checkInPoint",function(){
	$(this).remove();
})

$(document).on("dblclick","#selectedsignback .checkInPoint",function(){
	$(this).remove();
})

$(document).on("dblclick",".selectedPersonStyle",function(){
	$(this).remove();
})
//点击取消按钮
function returnmeetinglist(){
	$("#a").show();
	$("#b").hide();
}

//签到点选择
$("#signinplace").click(function(){
	$("#b .switchPanel").eq(0).addClass("curr").siblings().removeClass("curr");
	$("#b table span.checkbox").removeClass("curr");
	if($("#selectedsignin span").length!=0){
		var arr=[];
		a_signinmap=[];
		for(var i=0;i<$("#selectedsignin span").length;i++){
			var doorno=$("#selectedsignin span").eq(i).attr("value");
			var doorname=$("#selectedsignin span").eq(i).html();
			arr.push(doorno);
			a_signinmap.push(doorno+':'+doorname);
		}
		for(var i=0;i<$("#b table span.checkbox").length;i++){
			for(var k=0;k<arr.length;k++){
				if($("#b table span.checkbox").eq(i).attr("value")==arr[k]){
					$("#b table span.checkbox").eq(i).addClass("curr");
				}
			}
		}
		a_signin=arr;
	}else{
		a_signin=[];
		a_signinmap=[];
	}
	if($("#selectedsignback span").length!=0){
		var arr=[];
		a_signbackmap=[];
		for(var i=0;i<$("#selectedsignback span").length;i++){
			var doorno=$("#selectedsignback span").eq(i).attr("value");
			var doorname=$("#selectedsignback span").eq(i).html();
			arr.push(doorno);
			a_signbackmap.push(doorno+':'+doorname);
		}
		a_signback=arr;
	}else {
		a_signback=[];
		a_signbackmap=[];
	}
	$("#b").show();
	$("#a").hide();
})
//签退点选择
$("#signbackplace").click(function(){
	$("#b .switchPanel").eq(1).addClass("curr").siblings().removeClass("curr");
	$("#b table span.checkbox").removeClass("curr");
	if($("#selectedsignback span").length!=0){
		var arr=[];
		a_signbackmap=[];
		for(var i=0;i<$("#selectedsignback span").length;i++){
			var doorno=$("#selectedsignback span").eq(i).attr("value");
			var doorname=$("#selectedsignback span").eq(i).html();
			a_signbackmap.push(doorno+':'+doorname);
			arr.push(doorno);
		}
		for(var i=0;i<$("#b table span.checkbox").length;i++){
			for(var k=0;k<arr.length;k++){
				if($("#b table span.checkbox").eq(i).attr("value")==arr[k]){
					$("#b table span.checkbox").eq(i).addClass("curr");
				}
			}
		}
		a_signback=arr;
	}else{
		a_signback=[];
		a_signbackmap=[];
	}
	if($("#selectedsignin span").length!=0){
		var arr=[];
		a_signinmap=[];
		for(var i=0;i<$("#selectedsignin span").length;i++){
			var doorno=$("#selectedsignin span").eq(i).attr("value");
			var doorname=$("#selectedsignin span").eq(i).html();
			a_signinmap.push(doorno+':'+doorname);
			arr.push(doorno);
		}
		a_signin=arr;
	}else{
		a_signin=[];
		a_signinmap=[];
	}
	$("#b").show();
	$("#a").hide();
})

//===================================================================人员弹窗start
//打开弹窗
$("#promoter").click(function(){
	optType=1;
	promoterList=[];
	$("#shuttle_box_left").empty();
	$("#meeting_box_right").empty();
	if($("#selectedpromoter span").length!=0){
		for(var i=0;i<$("#selectedpromoter span").length;i++){
			var holderno=$("#selectedpromoter span").eq(i).attr("value");
			var holdername=$("#selectedpromoter span").eq(i).html();
			var departmentname=$("#selectedpromoter span").eq(i).attr("data-dept");
			var $li=$("<li><img src='../img/g.png'><h5><p class='username' id='"+holderno+"'>"+holdername+"</p><p>"+departmentname+"</p></h5></li>");
			var $span=$("<span class='checkbox'  style='float: none;'></span>");
			$li.append($span);
			$("#meeting_box_right").append($li);
		}
	}
	$(".select_person_box").fadeIn(500);
	$(".select_person").fadeIn(500);
	initTreeList();
})

$("#person").click(function(){
	optType=2;
	personList=[];
	$("#shuttle_box_left").empty();
	$("#meeting_box_right").empty();
	if($("#selectedperson span").length!=0){
		for(var i=0;i<$("#selectedperson span").length;i++){
			var holderno=$("#selectedperson span").eq(i).attr("value");
			var holdername=$("#selectedperson span").eq(i).html();
			var departmentname=$("#selectedperson span").eq(i).attr("data-dept");
			var $li=$("<li><img src='../img/g.png'><h5><p class='username' id='"+holderno+"'>"+holdername+"</p><p>"+departmentname+"</p></h5></li>");
			var $span=$("<span class='checkbox'  style='float: none;'></span>");
			$li.append($span);
			$("#meeting_box_right").append($li);
		}
	}
	$(".select_person_box").fadeIn(500);
	$(".select_person").fadeIn(500);
	initTreeList();
})

$("#host").click(function(){
	optType=3;
	hostList=[];
	$("#shuttle_box_left").empty();
	$("#meeting_box_right").empty();
	if($("#selectedhost span").length!=0){
		for(var i=0;i<$("#selectedhost span").length;i++){
			var holderno=$("#selectedhost span").eq(i).attr("value");
			var holdername=$("#selectedhost span").eq(i).html();
			var departmentname=$("#selectedhost span").eq(i).attr("data-dept");
			var $li=$("<li><img src='../img/g.png'><h5><p class='username' id='"+holderno+"'>"+holdername+"</p><p>"+departmentname+"</p></h5></li>");
			var $span=$("<span class='checkbox'  style='float: none;'></span>");
			$li.append($span);
			$("#meeting_box_right").append($li);
		}
	}
	$(".select_person_box").fadeIn(500);
	$(".select_person").fadeIn(500);
	initTreeList();
})

$("#Approver").click(function(){
	optType=4;
	ApproverList=[];
	$("#shuttle_box_left").empty();
	$("#meeting_box_right").empty();
	if($("#selectedhost span").length!=0){
		for(var i=0;i<$("#selectedApprover span").length;i++){
			var holderno=$("#selectedApprover span").eq(i).attr("value");
			var holdername=$("#selectedApprover span").eq(i).html();
			var departmentname=$("#selectedApprover span").eq(i).attr("data-dept");
			var $li=$("<li><img src='../img/g.png'><h5><p class='username' id='"+holderno+"'>"+holdername+"</p><p>"+departmentname+"</p></h5></li>");
			var $span=$("<span class='checkbox'  style='float: none;'></span>");
			$li.append($span);
			$("#meeting_box_right").append($li);
		}
	}
	$(".select_person_box").fadeIn(500);
	$(".select_person").fadeIn(500);
	initTreeList();
})

//取消弹窗
$("#quxiao").click(function(){
	$(".select_person").fadeOut(500);
	$(".select_person_box").fadeOut(500);
})

//穿梭框左侧选中
$("#shuttle_box_left").on('click', 'li', function () {
  if ($(this).hasClass('shuttle_box_li_act')) {
      $(this).removeClass('shuttle_box_li_act');
  } else {
      $(this).addClass('shuttle_box_li_act');
  }
});

//穿梭框右侧选中
$("#meeting_box_right").on('click', 'li', function () {
  if ($(this).hasClass('shuttle_box_li_act')) {
      $(this).removeClass('shuttle_box_li_act');
  } else {
      $(this).addClass('shuttle_box_li_act');
  }
});

//穿梭框右侧全选
$("#selectAll").click(function (){
	if ($("#selectAll").hasClass('curr')) {
		$("#selectAll").removeClass('curr');
		$("#meeting_box_right li").removeClass('shuttle_box_li_act')
  } else {
  	$("#selectAll").addClass('curr');
  	 $("#meeting_box_right li").addClass('shuttle_box_li_act')
  }
})

//向右移动
$("#shuttle_box_toRight").click(function (e) {
	$("#selectll").removeClass('curr');
  if ($("#shuttle_box_left .shuttle_box_li_act").length == 0) return false;
  for(var i=0;i<$("#shuttle_box_left .shuttle_box_li_act").length;i++){
  	for(var k=0;k<$("#meeting_box_right .username").length;k++){
  		if($("#shuttle_box_left .shuttle_box_li_act .username").eq(i).attr("id")==$("#meeting_box_right .username").eq(k).attr("id")){
  			layer.msg($("#meeting_box_right .username").eq(k).html()+"已经被选中!",{time:2000});
  			return;
  		}
  	}
  }
  $("#shuttle_box_left").find('.shuttle_box_li_act').appendTo("#meeting_box_right");
  $("#meeting_box_right li").removeClass('shuttle_box_li_act');
});

//向左移动
$("#shuttle_box_toLeft").click(function () {
	$("#selectAll").removeClass('curr');
  if ($("#meeting_box_right .shuttle_box_li_act").length == 0) return false;

  $("#meeting_box_right .shuttle_box_li_act").appendTo("#shuttle_box_left");
  $("#shuttle_box_left li").removeClass('shuttle_box_li_act');
});

//穿梭框左侧全选
$("#selectll").click(function (){
	if ($("#selectll").hasClass('curr')) {
		$("#selectll").removeClass('curr');
		$("#shuttle_box_left li").removeClass('shuttle_box_li_act')
  } else {
  	$("#selectll").addClass('curr');
  	$("#shuttle_box_left li").addClass('shuttle_box_li_act')
  }
})
//===================================================================人员弹窗end

//点击弹出框的叉
$("#roomquxiao").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的取消
$("#bottom_qx").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})

//获取页面跳转参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    } 
}

function getNowDate(){
	var d = new Date();
    var year=d.getFullYear();
    var month = d.getMonth()+1;
    var day = d.getDate();
    if(month < 10){
    	month = "0"+month;
    }
    if(day<10){
    	day="0"+day;
    }
    return year+"-"+month+"-"+day;
}

//获取当前时间
function getCurTime(){
	var d = new Date();
    var my_hours=d.getHours();
    var my_minutes=d.getMinutes();
    var hours,minutes;
    if((my_hours+"").length == 1){
    	hours = "0"+my_hours;
    }else{
    	hours = my_hours;
    }
    if((my_minutes+"").length == 1){
    	minutes = "0"+my_minutes;
    }else{
    	minutes = my_minutes;
    }
    
    return hours+""+minutes;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}