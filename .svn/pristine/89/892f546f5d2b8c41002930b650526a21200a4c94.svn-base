var thisTreeData = '';//跳转至新增页面所带参数，10:新增是展示门区信息，其他：展示通道页面
$(function(){
	initTree();
	showHide();
})
/*IP正则校验*/
function checkIsIp(ip) {
    var pattern = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/;
    if (!pattern .exec(ip)){
    	return false
    }else{
    	return true
    }
}
//初始化树菜单
var treeText="";
function initTree(){
	$.ajax({
		url:url+'/doorUnit2/getDeviceTreeList',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			layui.use('tree', function(){
			    var tree = layui.tree;
			    //渲染
			    var inst1 = tree.render({
			        elem: '#DeviceTree',
			        data: data.result,
			        onlyIconControl:true,
					click: function(obj){
						$(".layui-tree-txt").css("color","#555");
				    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");	
				    	treeText=obj.data.title;
						thisTreeData = obj.data;
						if(!checkIsIp(obj.data.ip)){
							$("#tableList1").hide();
					    	$("#tableList2").hide();
					    	$("#tableList3").show();
					    	initDoorList3();
					    	return;
						}
					    if(obj.data.DeviceTypeCode != '10' && obj.data.id.indexOf("d") != -1){
					    	$("#tableList1").hide();
					    	$("#tableList3").hide();
					    	$("#tableList2").show();
					    	var obj = {'ChannelName':$("#qDoorName").val(),"queryType":1,'DeviceNo':obj.data.id.substring(1)};
					    	initDoorList2(obj);
					    }else{
					    	$("#tableList1").show();
					    	$("#tableList2").hide();
					    	$("#tableList3").hide();
					    	var obj = {'DoorName':$("#qDoorName").val(),"queryType":1,'DeviceNo':obj.data.id.substring(1)};
					    	initDoorList1(obj);
					    }
					}
			    });
			});
		},
		error:function(data){
			
		}
	})
}

//初始化列表1
function initDoorList1(obj){
	$.ajax({
		url:url+'/doorUnit2/getDoorLit',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		success:function(data){
			$("#cont1").empty();
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="17002"){
					list.push(item);
				}
			}
			var html = '';
			for(var i=0;i<data.result.length;i++){
				var DoorChannel = (data.result[i].DoorChannel==undefined?"":data.result[i].DoorChannel);
				var DoorName = (data.result[i].DoorName==undefined?"":data.result[i].DoorName);
				var EntryReaderCH = (data.result[i].EntryReaderCH==undefined?"":data.result[i].EntryReaderCH);
				var EntryReaderTypeName = (data.result[i].EntryReaderTypeName==undefined?"":data.result[i].EntryReaderTypeName);
				var ExitReaderCH = (data.result[i].ExitReaderCH==undefined?"":data.result[i].ExitReaderCH);
				var ExitReaderTypeNme = (data.result[i].ExitReaderTypeNme==undefined?"":data.result[i].ExitReaderTypeNme);
				var ifPrisonerDoor = (data.result[i].ifPrisonerDoor==undefined?"":data.result[i].ifPrisonerDoor);
				if(ifPrisonerDoor=="0"){
					ifPrisonerDoor="否";
				}else if(ifPrisonerDoor=="1"){
					ifPrisonerDoor="是";
				}
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 var text1="";
				 }else {
					 var text1="<a href='javascript:;' onclick='updateInfo("+data.result[i].DoorNo+",10"+")' class='mo layui-btn layui-btn-xs'>修改</a>";
				 }
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 var text2="";
				  }else {
					 var text2="<a href='javascript:;' onclick='delInfo("+data.result[i].DoorNo+",10,this)' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				  }
				 if(text1==""&&text2==""){
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
					 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				 }
				
				html = html+'<tr>';
				html = html+'<td>'+(i+1)+'</td>';
				html = html+'<td>'+DoorChannel+'</td>';
				html = html+'<td>'+DoorName+'</td>';
				html = html+'<td>'+EntryReaderCH+'</td>';
				html = html+'<td>'+EntryReaderTypeName+'</td>';
				html = html+'<td>'+ExitReaderCH+'</td>';
				html = html+'<td>'+ExitReaderTypeNme+'</td>';
				html = html+'<td>'+ifPrisonerDoor+'</td>';
				html = html+'<td>'+text1+text2+'</td>';
				html = html+'</tr>';
			}
			$("#cont1").append(html);
		},
		error:function(data){
		}
	})
}

//初始化列表2
function initDoorList2(obj){
	$.ajax({
		url:url+'/doorUnit2/getDoorLit',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		success:function(data){
			console.log(data);
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="17002"){
					list.push(item);
				}
			}
			$("#cont2").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				var DoorChannel =(data.result[i].DoorChannel==undefined?"":data.result[i].DoorChannel);
				var DoorName = (data.result[i].DoorName==undefined?"":data.result[i].DoorName);
				var MacCode=(data.result[i].MacCode==undefined?"":data.result[i].MacCode);
				var MacName=(data.result[i].MacName==undefined?"":data.result[i].MacName);
				var DoorLimit=(data.result[i].DoorLimit==undefined?"":data.result[i].DoorLimit);
				var ifPrisonerDoor = (data.result[i].ifPrisonerDoor==undefined?"":data.result[i].ifPrisonerDoor);
				if(ifPrisonerDoor=="0"){
					ifPrisonerDoor="否";
				}else if(ifPrisonerDoor=="1"){
					ifPrisonerDoor="是";
				}
				if(DoorLimit==0){
					DoorLimit="否";
				}else if(DoorLimit==1){
					DoorLimit="是";
				}
				if(data.result[i].ExitReaderCH!=0){
					var readID=data.result[i].ExitReaderCH;
				}else{
					var readID=data.result[i].EntryReaderCH;
				}
				if(data.result[i].IOType==1){
					var IOType="进入";
				}else{
					var IOType="外出";
				}
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 var text1="";
				 }else {
					 var text1="<a href='javascript:;' onclick='updateInfo("+data.result[i].DoorNo+",20"+")' class='mo layui-btn layui-btn-xs'>修改</a>";
				 }
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 var text2="";
				  }else {
					 var text2="<a href='javascript:;' onclick='delInfo("+data.result[i].DoorNo+",20,this)' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				  }
				 if(text1==""&&text2==""){
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
					 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				 }
				html = html+'<tr>';
				html = html+'<td>'+(i+1)+'</td>';
				html = html+'<td>'+DoorChannel+'</td>';
				html = html+'<td>'+DoorName+'</td>';
				html = html+'<td>'+readID+'</td>';
				html = html+'<td>'+MacCode+'</td>';
				html = html+'<td>'+MacName+'</td>';
				html = html+'<td>'+DoorLimit+'</td>';
				html = html+'<td>'+IOType+'</td>';
				html = html+'<td>'+ifPrisonerDoor+'</td>';
				html = html+'<td>'+text1+text2+'</td>';
				html = html+'</tr>';
			}
			$("#cont2").append(html);
		},
		error:function(data){
			
		}
	})
}
//初始化列表三
function initDoorList3(){
	$.ajax({
		url:url+"/link/getSenseLinkDevice",
		type:"post",
		success:function(data){
			$("#cont3").empty();
			if(data.code=="200"){
				//获取设备员工组和访客组信息
				$.ajax({
					url:url+"/link/selectGroup",
					type:"post",
					success:function(res){
						if(JSON.parse(res).code==200){
							var value=JSON.parse(res).data.data;
							var val=data.result;
							var list=[];
							for(var item of window.top.arr){
								if(item.ModelCode=="17002"){
									list.push(item);
								}
							}
							console.log(val)
							for(var item of val){
								var doorname=item.doorname==undefined?"":item.doorname;
								var description=item.description==undefined?"":item.description;
								var sn=item.sn==undefined?"":item.sn;
								var group=item.emergencygroup==undefined?"":item.emergencygroup;
								var groupArr=group.split(",");
								for(var current of value){
									if(current.id==groupArr[0]){
										var holder=current.name;
									}else if(current.id==groupArr[1]){
										var visitor=current.name;
									}
								}
								
								if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
									 var text1="";
								 }else {
									 var text1="<a href='javascript:;' data-doorno="+item.doorno+"  class='senseUpdate layui-btn layui-btn-xs'>修改</a>";
								 }
								 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
									 var text2="";
								  }else {
									 var text2="<a href='javascript:;' onclick='delInfo("+item.doorno+",20,this)'  data-doorno="+item.doorno+" class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
								  }
								 if(text1==""&&text2==""){
									 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
									 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
								 }
								
								var $tr=$("<tr><td>"+item.doorno+"</td><td>"+doorname+"</td><td>"+description+"</td><td>"+sn+"</td>" +
										"<td>"+holder+"</td><td>"+visitor+"</td><td>"+text1+text2+"</td></tr>");
								$("#cont3").append($tr);
							}
						}
					}
				})
				
			}
		}
	})
}
//页面跳转到新增页面
$("#addInfoBtn").click(function(){
	//window.location.href = 'door_add.html?DeviceTypeCode='+thisTreeData.DeviceTypeCode+'&DeviceNo='+thisTreeData.DeviceNo+'&AreaID='+thisTreeData.AreaID;
	if(getQueryString("editID") != null && getQueryString("editID") != '' && getQueryString("editID") != undefined){//修改页面
	}
	layer.open({
		type:2,
		title:"添加通道",
		content:"door_add2.html?DeviceTypeCode="+thisTreeData.DeviceTypeCode+"&DeviceNo="+thisTreeData.DeviceNo+"&AreaID="+thisTreeData.AreaID,
		area:["500px","520px"]
	})
})

//编辑
function updateInfo(editID,editType){
	//window.location.href = 'door_add.html?editID='+editID+'&editType='+editType;
	layer.open({
		type:2,
		title:"修改通道",
		content:"door_add2.html?editID="+editID+"&editType="+editType,
		area:["500px","520px"]
	})
}
//点击商汤列表编辑
$(document).on("click",".senseUpdate",function(){
	var doorno=$(this).attr("data-doorno");
	layer.open({
		type:2,
		title:"修改通道",
		content:"door_add2.html?doorno="+doorno,
		area:["500px","520px"]
	})
})

function delInfo(id,type,that){
	if(type=="10"){
		var obj={"DoorNo":id,"tableType":type};
	}else if(type=="20"){
		var obj={"DoorNo":id,"tableType":type};
	}
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/doorUnit2/delOneDoorInfo",
			type:"POST",
			data:obj,
			success:function(data){
				if(data.flag){
					layer.msg("删除成功!",{time:1000},function(){
						$(that).parent().parent().remove();
					})
				}
			}
		})
	})
}
//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#addInfoBtn").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="17002"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#addInfoBtn").show();
			}
		}
	}
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