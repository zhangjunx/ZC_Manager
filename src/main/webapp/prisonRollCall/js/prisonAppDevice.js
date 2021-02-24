$(function(){
	//获取终端列表
	getAppDeviceList();
	getPage(total);
	getDeptTree();
	getHolderByDeptBatch("");
})
var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
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
					getAppDeviceList();
				}
			}
		})
	})
}//end
//点击人员
$(document).on("click","#holder li",function(){
	if($("#cont span.curr").length==0){
		layer.msg("请选择设备!",{time:2000});
		return;
	}
	var fid=$("#cont span.curr").attr("data-fid");
	var holderno=$(this).attr("data-holderno");
	if($(this).hasClass("cur")){
		$(this).removeClass("cur");
		addAppUserRelation(fid,holderno,2);
	}else{
		$(this).addClass("cur");
		addAppUserRelation(fid,holderno,1);
	}
})
function addAppUserRelation(fid,holderno,optType){
	$.ajax({
		url:url+"/prisonAppDevice/addAppUserRelation",
		type:"post",
		data:{"deviceAppID":fid,"holderNo":holderno,"operator":window.top.holderno,"optType":optType},
		success:function(data){
		    layer.msg(data.reason,{time:1000});
		}
	})
}
//点击复选框
$(document).on("click","#cont span.checkbox",function(){
	var status=$(this).attr("data-status");
	if(status==3){
		layer.msg("未审核的设备不能被选择!",{time:2000});
		return;
	}
	$("#cont span.checkbox").removeClass("curr");
	$(this).addClass("curr");
	var fid=$(this).attr("data-fid");
	getHolderList(fid);
})
function getHolderList(deviceAppID){
	$.ajax({
		url:url+"/prisonAppDevice/getHolderList",
		type:"post",
		data:{"deviceAppID":deviceAppID},
		success:function(data){
			 $("#holder").empty();
		    	if(!data.flag){
		    		return;
		    	}
		    	var html="";
	   		    $.each(data.result,function(i,val){
					 var holdername=(val.holderName==undefined?"":val.holderName);
					 var holderno=(val.holderNo==undefined?"":val.holderNo);
					 if(val.resultType==1){
						 html+="<li class='cur' data-holderno="+holderno
						 +"><div class='personPhoto'><img src='../img/person.png'></div>" +
						 "<div class='holderInfo'><p>工号:<span class='holderno'>"+holderno+"</span></p>" +
						 "<p>姓名:<span class='holdername'>"+holdername+"</span></p></div></li>";
					 }else if(val.resultType==2){
						 html+="<li data-holderno="+holderno
						 +"><div class='personPhoto'><img src='../img/person.png'></div>" +
						 "<div class='holderInfo'><p>工号:<span class='holderno'>"+holderno+"</span></p>" +
						 "<p>姓名:<span class='holdername'>"+holdername+"</span></p></div></li>";
					 }
	   	    	 })
	   		   $("#holder").append(html);
		}
	})
}
/*//点击添加终端
$("#insertAppDevice").click(function(){
	$("#deviceAppName1").val("");
	$("#deviceAppSn1").val("");
	$("#deviceAppIp1").val("");
	$("#deviceAppPort1").val("");
	$("#deviceStatus").val("1");
	layer.open({
		type:1,
		title:"添加终端",
		content:$("#appDeviceLayer"),
		area:["450px","400px"],
		btn:["确定","取消"],
		yes:function(index){
			addAppDevice(index);
		}
	})
})
//点击修改终端
$(document).on("click",".update",function(){
	$("#deviceAppName1").val("");
	$("#deviceAppSn1").val("");
	$("#deviceAppIp1").val("");
	$("#deviceAppPort1").val("");
	$("#deviceStatus").val("1");
	var fid=$(this).attr("data-fid");
	$("#fid").val(fid);
	getOneAppDevice(fid);
	layer.open({
		type:1,
		title:"修改终端",
		content:$("#appDeviceLayer"),
		area:["450px","400px"],
		btn:["确定","取消"],
		yes:function(index){
			addAppDevice(index);
		}
	})
})
//获取一条设备信息
function getOneAppDevice(fid){
	$.ajax({
		url:url+"/prisonAppDevice/getOneAppDevice",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			console.log(data)
			if(data.flag){
				var deviceAppName=data.result.deviceAppName==undefined?"":data.result.deviceAppName;
				var deviceAppSn=data.result.deviceAppSn==undefined?"":data.result.deviceAppSn;
				var deviceAppIp=data.result.deviceAppIp==undefined?"":data.result.deviceAppIp;
				var deviceAppPort=data.result.deviceAppPort==undefined?"":data.result.deviceAppPort;
				$("#deviceAppName1").val(deviceAppName);
				$("#deviceAppSn1").val(deviceAppSn);
				$("#deviceAppIp1").val(deviceAppIp);
				$("#deviceAppPort1").val(deviceAppPort);
				$("#deviceStatus").val(data.result.status);
			}
		}
	})
}
//IP正则验证
function checkIsIp(ip) {
    var pattern = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/;
    if (!pattern .exec(ip)){
    	return false
    }else{
    	return true
    }
}
//添加终端
function addAppDevice(index){
	var deviceAppName=$("#deviceAppName1").val();//终端名称
	var deviceAppSn=$("#deviceAppSn1").val();//终端SN
	var deviceAppIp=$("#deviceAppIp1").val();//终端IP
	var deviceAppPort=$("#deviceAppPort1").val();//终端端口
	var status=$("#deviceStatus").val();
	var fid=$("#fid").val();
	if(deviceAppName==""){
		layer.msg("请输入终端名称!",{time:2000});
		return;
	}
	if(deviceAppSn==""){
		layer.msg("请输入终端SN!",{time:2000});
		return;
	}
	if(deviceAppIp==""){
		layer.msg("请输入终端IP!",{time:2000});
		return;
	}
	if(!checkIsIp(deviceAppIp)&&deviceAppIp!=""){
		layer.msg("请正确输入IP！",{time:2000});
		return;
	}
	if(deviceAppPort==""){
		layer.msg("请输入终端端口!",{time:2000});
		return;
	}
	var obj={"fid":fid,"status":status,"deviceAppName":deviceAppName,"deviceAppSn":deviceAppSn,"deviceAppIp":deviceAppIp,"deviceAppPort":deviceAppPort};
	$.ajax({
		url:url+"/prisonAppDevice/addAppDevice",
		type:"post",
		data:obj,
		success:function(data){
			if(data.flag){
				layer.close(index);
				getAppDeviceList();
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}*/
//点击审核
$(document).on("click",".update",function(){
	var fid=$(this).attr("data-fid");
	$.ajax({
		url:url+"/prisonAppDevice/updateAppDeviceStatus",
		type:"post",
		data:{"fid":fid,"status":1},
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					getAppDeviceList();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})
//点击删除
$(document).on("click",".del",function(){
	var fid=$(this).attr("data-fid");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		$.ajax({
			url:url+"/prisonAppDevice/delOneAppDevice",
			type:"post",
			data:{"fid":fid},
			success:function(data){
				console.log(data);
				layer.close(index);
				if(data.flag){
					layer.msg(data.reason,{time:2000},function(){
						getAppDeviceList();
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
	
})
//点击搜索
$("#queryPrisonAppDeviceBtn").click(function(){
	getAppDeviceList();
})
//获取终端设备列表
function getAppDeviceList(){
	var deviceAppName=$("#deviceAppName").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"deviceAppName":deviceAppName};
	$.ajax({
		url:url+"/prisonAppDevice/getAppDeviceList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var deviceAppName=item.deviceAppName==undefined?"":item.deviceAppName;//终端名称
					var deviceAppSn=item.deviceAppSn==undefined?"":item.deviceAppSn;//终端sn
					var deviceAppIp=item.deviceAppIp==undefined?"":item.deviceAppIp;//终端IP
					var deviceAppPort=item.deviceAppPort==undefined?"":item.deviceAppPort;//终端端口
					var str="";
					var text="";
					if(item.status==1){
						str="已审核";
						text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>审核</a>";
					}else if(item.status==3){
						str="未审核";
						text="<a href='javascript:;' data-fid="+item.fid+" class='update layui-btn layui-btn-xs'>审核</a>";
					}
					var $tr=$("<tr><td><span class='checkbox' data-status="+item.status+" data-fid="+item.fid+" style='float:none'></span></td><td>"+deviceAppName+"</td><td>"+deviceAppSn+"</td><td>"+deviceAppIp+"</td><td>"+deviceAppPort+"</td>" +
						    "<td>"+str+"</td><td>"+text+"<a href='javascript:;' data-fid="+item.fid+" class='del layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>");
					$("#cont").append($tr);
				}
			}
		}
	})
}
//获取部门数据
function getDeptTree(){
	layui.use(['tree', 'util'], function(){
		  var tree = layui.tree,
		  layer = layui.layer,
		  util = layui.util
		  $.ajax({
			  url:url+'/DepartmentData/getDeptTree',
			  type:'post',
			  dataType:'json',
			  data:{"res":true},
			  success:function(data){
				    tree.render({
				    elem: '#classtree',
				    data:  data.result,
				    showCheckbox: true,  //是否显示复选框
				    id: 'demoId1',
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function (node) {
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			        },
			        oncheck: function(obj){
			        	  var arrlist=[];
						  for(var i=0;i<$(".layui-form-checked").length;i++){
					  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
					  	  arrlist.push(id);
					    }
						  arrlist=arrlist.join(",");
						  getHolderByDeptBatch(arrlist);
					  }
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });
			  }
		  })
	})
}
function getHolderByDeptBatch(arrlist){
	 $.ajax({
	    	 url:url+"/prisonAppDevice/getHolderList",
		     type:"POSt",
		     dataType:"json",
		     data:{"departmentNo":arrlist},
		     success:function(data){
		    	 var arr=[];
		    	 for(var i=0;i<$("#holder li.cur").length;i++){
		    		 var holderno=$("#holder li.cur").eq(i).attr("data-holderno");
		    		 arr.push(holderno);
		    	 }
		    	    $("#holder").empty();
			    	if(!data.flag){
			    		return;
			    	}
			    	var html="";
		   		    $.each(data.result,function(i,val){
						 var holdername=(val.holderName==undefined?"":val.holderName);
						 var holderno=(val.holderNo==undefined?"":val.holderNo);
						 html+="<li data-holderno="+holderno
						 +"><div class='personPhoto'><img src='../img/person.png'></div>" +
						 "<div class='holderInfo'><p>工号:<span class='holderno'>"+holderno+"</span></p>" +
						 "<p>姓名:<span class='holdername'>"+holdername+"</span></p></div></li>";
		   	    	 })
		   		   $("#holder").append(html);
		   		    for(var item of arr){
		   		    	$("#holder li[data-holderno="+item+"]").addClass("cur");
		   		    }
		     }
	      })
}

//时间戳转换日期
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10?"0"+date.getDate():date.getDate() + ' ';
    return Y+M+D;
}