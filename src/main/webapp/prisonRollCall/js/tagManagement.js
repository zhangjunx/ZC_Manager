$(function(){
	//获取犯人数据
	getPrisonerList();
	getPage(total);
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  //执行一个laydate实例
		  laydate.render({
		    elem: '#inStartTime' //指定元素
		  });
	});
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
					if($(".main-tab .curr a").html()=="犯人标签管理"){
						getPrisonerList();
					}else if($(".main-tab .curr a").html()=="监区标签管理"){
						getPrisonList();
					}else if($(".main-tab .curr a").html()=="区域标签管理"){
						getPrisonAreaList();
					}
					
				}
			}
		})
	})
}//end
//选项卡
$(".main-tab .label").click(function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".tag-tab").eq($(this).index()).show().siblings().hide();
	$("#test").show();
	if($(this).index()==0){
		getPrisonerList();
		getPage(total);
	}else if($(this).index()==1){
		getPrisonList();
		getPage(total);
	}else if($(this).index()==2){
		getPrisonAreaList();
		getPage(total);
	}
})
//点击监区标签搜索
$("#queryPrisonAreaByConditionBtn").click(function(){
	getPrisonList();
})

//点击犯人标签搜索
$("#queryPrisonerByConditionBtn").click(function(){
	getPrisonerList();
})

//点击发卡或换卡
$(document).on("click",".update",function(){
	var fid=$(this).attr("data-fid");
	var labelCode=$(this).attr("data-labelcode");
	layer.open({
		type:1,
		title:"卡号信息",
		content:"<div style='margin-top:25px'><label class='layui-inline' style='width:67px;text-align:center;font-size:14px;margin-left:5px'>卡号:</label><input type='text' id='cardNumber' style='width: 211px;height: 30px;line-height: 30px;border: 1px solid #ddd;color: #333;background: #fff;'/></div>",
		area:["350px","200px"],
		btn:["确定","取消"],
		success:function(){
			$("#cardNumber").focus();
		},
		yes:function(i){
			var cardNumber=$("#cardNumber").val();
			if(cardNumber==""){
				layer.msg("请刷卡",{time:2000});
				return;
			}else{
				updatePerLabel(cardNumber,fid,labelCode);
				layer.close(i);
			}
		}
	})
})
//发卡或换卡
function updatePerLabel(cardNumber,fid,labelCode){
	var obj;
	var toggle;
	if(labelCode==""){//发卡
		if($(".main-tab .curr a").html()=="犯人标签管理"){
			toggle="/prisoner/updatePerLabel";
			obj={"labelCode":cardNumber,"prisonerID":fid,"optType":1};
		}else if($(".main-tab .curr a").html()=="监区标签管理"){
			toggle="/prison/updatePrisonLabel";
			obj={"labelCode":cardNumber,"prisonID":fid,"optType":1,"changer":window.top.holderno};
		}else if($(".main-tab .curr a").html()=="区域标签管理"){
			toggle="/prisonArea/updateAreaLabel";
			obj={"labelCode":cardNumber,"prisonAreaID":fid,"optType":1,"changer":window.top.holderno};
		}
	}else{//换卡
		if($(".main-tab .curr a").html()=="犯人标签管理"){
			toggle="/prisoner/updatePerLabel";
			obj={"labelCode":cardNumber,"prisonerID":fid,"optType":2};
		}else if($(".main-tab .curr a").html()=="监区标签管理"){
			toggle="/prison/updatePrisonLabel";
			obj={"labelCode":cardNumber,"prisonID":fid,"optType":2,"changer":window.top.holderno};
		}else if($(".main-tab .curr a").html()=="区域标签管理"){
			toggle="/prisonArea/updateAreaLabel";
			obj={"labelCode":cardNumber,"prisonAreaID":fid,"optType":2,"changer":window.top.holderno};
		}
	}
	$.ajax({
		url:url+toggle,
		type:"post",
		data:obj,
		success:function(data){
			if(data.flag){
				if($(".main-tab .curr a").html()=="犯人标签管理"){
					getPrisonerList();
				}else if($(".main-tab .curr a").html()=="监区标签管理"){
					getPrisonList();
				}else if($(".main-tab .curr a").html()=="区域标签管理"){
					getPrisonAreaList();
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//获取犯人数据
function getPrisonerList(){
	var prisonerName=$("#prisonerName").val();
	var labelCode=$("#labelCode").val();
	var prisonID=$("#prisonID").val();
	var inStartTime=$("#inStartTime").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"prisonerName":prisonerName,"labelCode":labelCode,"prisonName":prisonID,"inStartTime":inStartTime};
	$.ajax({
		url:url+"/prisoner/getPrisonerList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var prisonerName=item.prisonerName==undefined?"":item.prisonerName;//姓名
					var prisonerName2=item.prisonerName2==undefined?"":item.prisonerName2;//曾用名
					var prisonName=item.prisonName==undefined?"":item.prisonName;//归属监区
					var IDCard=item.IDCard==undefined?"":item.IDCard;//身份证号
					var sex=item.sex==undefined?"":item.sex;//性别
					var inStartTime=item.inStartTime==undefined?"":item.inStartTime;//拘留时间
					var startTime=item.startTime==undefined?"":item.startTime;//刑期开始时间
					var endTime=item.endTime==undefined?"":item.endTime;//刑期结束时间
					var labelCode=item.labelCode==undefined?"":item.labelCode;//标签号
					inStartTime=timestampToTime(inStartTime);
					startTime=timestampToTime(startTime);
					endTime=timestampToTime(endTime);
					var text="";
					if(item.status=="在押"){
						 if(labelCode==""){
							 text="<a href='javascript:;' data-labelcode='"+labelCode+"' data-fid="+item.fid+" class='update layui-btn layui-btn-xs'>发卡</a>";
						}else{
							 text="<a href='javascript:;' data-labelcode='"+labelCode+"' data-fid="+item.fid+" class='update layui-btn layui-btn-xs'>换卡</a>";
						}
					}else if(item.status=="释放"){
						 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>发卡</a>";
					}
					var $tr=$("<tr><td>"+prisonerName+"</td><td>"+prisonerName2+"</td><td>"+prisonName+"</td><td>"+IDCard+"</td>" +
							"<td>"+sex+"</td><td>"+inStartTime+"</td>" +"<td>"+startTime+"</td><td>"+endTime+"</td>" +
							"<td>"+item.status+"</td><td>"+labelCode+"</td><td>"+text+"</td></tr>");
					$("#cont").append($tr);
				}
			}
		}
	})
}
//获取监区信息列表
function getPrisonList(){
	var prisonName=$("#prisonName").val();
	var location=$("#location").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"prisonName":prisonName,"localtion":location};
	$.ajax({
		url:url+"/prison/getPrisonList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont2").empty();
			if(data.flag){
				for(var item of data.result){
					var prisonName=item.prisonName==undefined?"":item.prisonName;
					var localtion=item.localtion==undefined?"":item.localtion;
					var leader=item.leader==undefined?"":item.leader;
					var labelCode=item.labelCode==undefined?"":item.labelCode;
					var str="";
					var text="";
					if(item.status=="1"){//启用
						str="已启用"
							if(labelCode==""){
								 text="<a href='javascript:;' data-labelcode='"+labelCode+"' data-fid="+item.fid+" class='update layui-btn layui-btn-xs'>发卡</a>";
							}else{
								 text="<a href='javascript:;' data-labelcode='"+labelCode+"' data-fid="+item.fid+" class='update layui-btn layui-btn-xs'>换卡</a>";
							}
					}else if(item.status==2){//禁用
						str="已禁用"
						text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>发卡</a>";
					}
					var $tr=$("<tr><td>"+prisonName+"</td><td>"+localtion+"</td>" +
							"<td>"+leader+"</td><td>"+labelCode+"</td><td>"+str+"</td>" +
							"<td>"+text+"</tr>");
					$("#cont2").append($tr);
				}
			}
		}
	})
}

//获取区域信息列表
function getPrisonAreaList(){
	var areaName=$("#areaName").val();
	var areaSize=$("#areaSize").val();
	var labelCode2=$("#labelCode2").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"areaName":areaName,"areaSize":areaSize,"labelCode":labelCode2};
	$.ajax({
		url:url+"/prisonArea/getPrisonAreaList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont3").empty();
			if(data.flag){
				for(var item of data.result){
					var areaName=item.areaName==undefined?"":item.areaName;
					var areaSize=item.areaSize==undefined?"":item.areaSize;
					var personSize=item.personSize==undefined?"":item.personSize;
					var labelCode=item.labelCode==undefined?"":item.labelCode;
					var str="";
					var text="";
					if(item.status=="1"){//启用
						str="已启用";
							if(labelCode==""){
								 text="<a href='javascript:;' data-labelcode='"+labelCode+"' data-fid="+item.fid+" class='update layui-btn layui-btn-xs'>发卡</a>";
							}else{
								 text="<a href='javascript:;' data-labelcode='"+labelCode+"' data-fid="+item.fid+" class='update layui-btn layui-btn-xs'>换卡</a>";
							}
					}else if(item.status==2){//禁用
						str="已禁用";
						text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>发卡</a>";
					}
					var $tr=$("<tr><td>"+areaName+"</td><td>"+areaSize+"</td>" +
							"<td>"+personSize+"</td><td>"+labelCode+"</td>" +
							"<td>"+str+"</td><td>"+text+"</td></tr>");
					$("#cont3").append($tr);
				}
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