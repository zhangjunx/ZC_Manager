//opttype = getQueryString("opttype");//操作类型，1：编辑
$(function(){
	//下拉树初始化
	initSelectTree();
	//不为空为表单赋值
	if(getQueryString("editID") != null && getQueryString("editID") != '' && getQueryString("editID") != undefined){
		setFormVal();
	}
	//商汤平台通道编辑
	if(getQueryString("doorno")!=undefined){
		$(".main-tab .label a").html("修改通道");
		$("#snNumber").attr("readonly","readonly");
		$("#terminalName").remove();
		var $ipt=$("<input type='text' class='input' id='terminalName'/>");
		$(".terminalName").append($ipt);
		$("#form1").hide();
		$("#form2").hide();
		$("#form3").show();
		initTerminal();//初始化终端设备
		//初始化关联门区
    	initDoorNo("stDoortree");
    	//初始化通道编号
    	initDvsChannelNum();
    	initGrop();
    	$("#DeviceTypeCode").val("0");
    	$("#AreaID").val("");
		selectByPrimaryKey(getQueryString("doorno"));
	}
	if(parent.treeText!=""){
		for(var i=0;i<$(".layui-tree-txt").length;i++){
			if($(".layui-tree-txt").eq(i).html()==parent.treeText){
				$(".layui-tree-txt").eq(i).click();
			}
		}
	}
})
layui.use('form', function(){
  var form = layui.form;
});
//商汤平台通道编辑
function selectByPrimaryKey(doorno){
	$.ajax({
		url:url+"/DoorUnit/selectByPrimaryKey",
		type:"post",
		data:{"doorno":doorno},
		success:function(data){
			console.log(data);
			if(data.code=="200"){
				var res=data.result;
				var doorchannel=res.doorchannel;//通道编号
				var doorname=res.doorname;//门区名称
				var doorno=res.doorno;//门区编号
				var description=res.description;//终端名称
				if(res.entryreadersn!=undefined){
					var sn=res.entryreadersn;//进入
					$(":radio[value='进入']").click()
				}else if(res.exitreadersn!=undefined){
					var sn=res.exitreadersn;//外出
					$(":radio[value='外出']").click()
				}
				var group=res.emergencygroup.split(",");
				var holderGroup=group[0];//员工组
				var visitorGroup=group[1];//访客组
				$("#stChannelNum").val(doorchannel);
				$("#stChannelName").val(doorname).attr("data-doorno",doorno);
				$("#terminalName").val(description);
				$("#snNumber").val(sn);
				$("#holderGrop").val(holderGroup);
				$("#visitorGrop").val(visitorGroup);
				$("#DeviceNoName").html(res.devicename);
				for(var i=0;i<$(".terminalName option").length;i++){
					if(description==$(".terminalName option").eq(i).html()){
						$("#terName").html("");
						$("#identifier").html("");
						$("#description").html("");
						$("#location").html("");
						$("#ip").html("");
						$("#terDescription").html("");
						$("#soft_ware").html("");
						var str=$(".terminalName option").eq(i).attr("value");
						var arr=str.split(",");
						var arr2=[];
						for(var item of arr){
							if(item=="undefined"||item=="null"){
								item="";
							}
							arr2.push(item)
						}
						$("#terName").html(arr2[0]);
						$("#identifier").html(arr2[1]);
						$("#description").html(arr2[2]);
						$("#location").html(arr2[4]);
						$("#ip").html(arr2[5]);
						$("#terDescription").html(arr2[6]);
						$("#snNumber").val(arr2[7]);
						$("#terminalId").html(arr2[8]);
						$("#soft_ware").html(arr2[9]);
					}
				}
			}
		}
	})
}

//控制展示的表单
function formView(type){
	if(type == '10'){
		$("#form1").show();
    	$("#form2").hide();
    	$("#form3").hide();
    	//初始化门区编号下拉框
    	initDoorChannel();
    	
    	selDoorChannel();
    	
    	//初始化进入读卡器类型
    	initEntryReaderType();
    	
    	//初始化外出读卡器类型
    	initExitReaderType();
    	
    }else{
    	$("#form1").hide();
    	$("#form2").show();
    	$("#form3").hide();
    	/*//初始化关联门区
    	initDoorNo("classtree2");
    	
    	//初始化通道编号
    	initDvsChannelNum();*/
    	//初始化门区编号下拉框
    	initDoorChannel();
    	//给读卡器ID赋值
    	readID();
    }
}
/*IP正则校验*/
function checkIsIp(ip) {
    var pattern = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/;
    if (!pattern .exec(ip)){
    	return false
    }else{
    	return true
    }
}
//点击查看设备信息
$("#terminalWatch").click(function(){
	layer.open({
		type:1,
		content:$("#terminalInformation"),
		area:["300px","300px"]
	})
})
//获取设备员工组和访客组信息
function initGrop(){
	$.ajax({
		url:url+"/link/selectGroup",
		type:"get",
		success:function(res){
			$("#holderGrop").empty();
			$("#visitorGrop").empty();
			if(JSON.parse(res).code==200){
				var val=JSON.parse(res).data.data;
				for(var item of val){
					var $opt=$("<option value="+item.id+">"+item.name+"</option>");
					if(item.type==1){//员工组
						$("#holderGrop").append($opt);
					}else if(item.type==2){//访客组
						$("#visitorGrop").append($opt);
					}
				}
			}
		}
	})
}
//终端名称内容改变事件
$("#terminalName").change(function(){
	$("#terName").html("");
	$("#identifier").html("");
	$("#description").html("");
	$("#location").html("");
	$("#ip").html("");
	$("#terDescription").html("");
	$("#soft_ware").html("");
	var str=$(this).val();
	var arr=str.split(",");
	var arr2=[];
	for(var item of arr){
		if(item=="undefined"||item=="null"){
			item="";
		}
		arr2.push(item)
	}
	$("#terName").html(arr2[0]);
	$("#identifier").html(arr2[1]);
	$("#description").html(arr2[2]);
	$("#location").html(arr2[4]);
	$("#ip").html(arr2[5]);
	$("#terDescription").html(arr2[6]);
	$("#snNumber").val(arr2[7]);
	$("#terminalId").html(arr2[8]);
	$("#soft_ware").html(arr2[9]);
})

//初始化终端名称
function initTerminal(){
	$.ajax({
		url:url+"/link/selectDevice",
		type:"get",
		success:function(res){
			var val=JSON.parse(res).data.data;
			$("#terminalName option").not(":first").remove(); ;
			if(JSON.parse(res).code=="200"){
				var $opt=$("<option value=''>请选择</option>");
				$("#ControlType").append($opt);
				for(var item of val){
					var $opt1=$("<option value='"+item.device_type.name+","+item.device_type.identifier+","
							+item.device_type.description+","+item.device.direction+","+item.device.location+","+
							item.device.ip+","+item.device.description+","+item.device.sn+","+item.device.id+","+item.device.software_version+"'>"+item.device.name+"</option>");
					$("#terminalName").append($opt1);
				}
			}
		}
	})
}

//设备下拉树初始化
function initSelectTree(){
	$.ajax({
		url:url+'/doorUnit2/getDeviceTreeList',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	if(node.data.id.indexOf("d") != -1){
			        		$("#DeviceNo").val(node.data.id.substr(1));
				        	$("#DeviceNoName").html(node.data.title);
				        	if(!checkIsIp(node.data.ip)){
				        		$("#form1").hide();
				        		$("#form2").hide();
				        		$("#form3").show();
				        		initTerminal();//初始化终端设备
				        		//初始化关联门区
				            	initDoorNo("stDoortree");
				            	//初始化通道编号
				            	initDvsChannelNum();
				            	initGrop();
				            	$("#DeviceTypeCode").val("0");
				            	$("#AreaID").val("");
				        	}else{
				        		formView(node.data.DeviceTypeCode);
				        		$("#AreaID").val(node.data.AreaID);
				        		$("#DeviceTypeCode").val(node.data.DeviceTypeCode);
				        	}
			        	}else{
			        		//提示
			        		layer.msg("请选择具体的设备！！",{time:1000})
			        	}
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='DeviceNo']").val(node.id);
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
			});
		
		},
		error:function(data){}
	})
}

//初始化门区编号下拉框
function initDoorChannel(){
	$("#DoorChannel").empty();
	$("#DoorChannel1").empty();
	var html = '';
	for(var i=1;i<=16;i++){
		html = html+'<option value="'+i+'">'+i+'</option>';
	}
	$("#DoorChannel").append(html);
	$("#DoorChannel1").append(html);
}
function selDoorChannel(){
	var thisVal = parseInt($("#DoorChannel").val());
	var m = parseInt(thisVal/4);
	var num = m*6;
	var entry = num+thisVal;
	var exit = num+thisVal+4;
	$("#EntryReaderCH").val(entry);
	$("#ExitReaderCH").val(exit);
}
function readID(){
	$("#EntryReaderCH1").val($("#DoorChannel1").val());
}
//初始化进入读卡器类型
function initEntryReaderType(){
	$.ajax({
		url:url+'/doorUnit2/getRederType',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			$("#EntryReaderType").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].Code+'">'+data.result[i].TypeName+'</option>';
			}
			$("#EntryReaderType").append(html);
		},
		error:function(data){
			
		}
	})
}
//初始化外出读卡器类型
function initExitReaderType(){
	$.ajax({
		url:url+'/doorUnit2/getRederType',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			$("#ExitReaderType").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].Code+'">'+data.result[i].TypeName+'</option>';
			}
			$("#ExitReaderType").append(html);
		},
		error:function(data){
			
		}
	})
}

//初始化关联门区
function initDoorNo(el){
	$.ajax({
		url:url+'/doorUnit2/getAreaListCombo',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#"+el,
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	if(node.data.id.indexOf("d") != -1){
			        		if(el=="stDoortree"){
			        			$("#stID").val(node.data.id.substr(1));
					        	$("#stIDName").html(node.data.title);
			        		}else{
			        			$("#DvsID").val(node.data.id.substr(1));
					        	$("#DvsIDName").html(node.data.title);
			        		}
			        		
			        	}else{
			        		//提示
			        		layer.msg("请选择具体的门区！！",{time:1000})
			        	}
			            var $select = $($(this)[0].elem).parents("#treeDvsID .layui-form-select");
			            $select.removeClass("#treeDvsID layui-form-selected").find("#treeDvsID .layui-select-title span").html(node.name).end().find("#treeDvsID input:hidden[name='DvsID']").val(node.id);
			        }
			    
			    });
			    $("#treeDvsID .downpanel").on("click", "#treeDvsID .layui-select-title", function (e) {
			        $("#treeDvsID .layui-form-select").not($(this).parents("#treeDvsID .layui-form-select")).removeClass("#treeDvsID layui-form-selected");
			        $(this).parents("#treeDvsID .downpanel").toggleClass("#treeDvsID layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $("#treeDvsID .layui-form-select").removeClass("#treeDvsID layui-form-selected");
			    });
			});
		
		},
		error:function(data){
			
		}
	})
}

//初始化通道编号
function initDvsChannelNum(){
	$("#DvsChannelNum").empty();
	$("#stChannelNum").empty();
	var html = '';
	for(var i=1;i<=64;i++){
		html = html+'<option value="'+i+'">'+i+'</option>';
	}
	$("#DvsChannelNum").append(html);
	$("#stChannelNum").append(html);
}

//保存信息
function saveInfo(){
	if($("#DeviceTypeCode").val() == '10'){
		//保存门区信息
		var DoorChannel = $("#DoorChannel").val();
		var DoorName = $("#DoorName").val();
		var EntryReaderCH = $("#EntryReaderCH").val();
		var EntryReaderType = $("#EntryReaderType").val();
		var ExitReaderCH = $("#ExitReaderCH").val();
		var ExitReaderType = $("#ExitReaderType").val();
		var DeviceNo = $("#DeviceNo").val();
		var AreaID = $("#AreaID").val();
		if(DeviceNo.length=="0"){
			layer.msg("请选择归属设备!",{time:2000});
			return;
		}
		if(DoorChannel.length=="0"){
			layer.msg("请选择门区编号!",{time:2000});
			return;
		}
		if(DoorName.length=="0"){
			layer.msg("请输入门区名称!",{time:2000});
			return;
		}
		if(EntryReaderCH.length=="0"){
			layer.msg("请输入进入读卡器ID!",{time:2000});
			return;
		}
		if(ExitReaderCH.length=="0"){
			layer.msg("请输入外出读卡器ID!",{time:2000});
			return;
		}
		
		var obj={"DoorChannel":DoorChannel,
				 "DoorName":DoorName,
				 "EntryReaderCH":EntryReaderCH,
				 "EntryReaderType":EntryReaderType,
				 "ExitReaderCH":ExitReaderCH,
				 "ExitReaderType":ExitReaderType,
				 "DeviceNo":DeviceNo,
				 "AreaID":AreaID,
				 "DoorNo":getQueryString("editID"),
				 "SaveSource":'10',
		}
		$.ajax({
			url:url+'/doorUnit2/saveDoorInfo',
			dataType:'json',//数据类型
			type:'POST',//类型
			data:obj,
			success:function(data){
				if(data.flag){
					layer.msg("添加成功!",{time:1000},function(){
						//window.location.href = 'door_list.html';
						parent.layer.closeAll();
						if(parent.treeText!=""){
							for(var i=0;i<$(".layui-tree-txt",parent.document).length;i++){
								if($(".layui-tree-txt",parent.document).eq(i).html()==parent.treeText){
									$(".layui-tree-txt",parent.document).eq(i).click();
								}
							}
						}
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(data){
				
			}
		})
	}else if($("#DeviceTypeCode").val() == '0'){
		if(getQueryString("doorno")!=undefined){//修改
			var id=$("#terminalId").html();//设备id
			var location=$("#location").html();//终端位置
			var description=$("#terminalName").val();//终端名称
			var staffGroup=$("#holderGrop").val();//员工组
			var visitorGroup=$("#visitorGrop").val();//访客组
			var emergencygroup=staffGroup+","+visitorGroup;
			var doorname=$("#stChannelName").val();
			var doorchannel=$("#stChannelNum").val();
			var doorno=$("#stChannelName").attr("data-doorno");
			var sn=$("#snNumber").val();
			if($('input[name="door"]:checked').val()=="进入"){
				var obj={"staffGroup":staffGroup,"visitorGroup":visitorGroup,"emergencygroup":emergencygroup,"location":location,"id":id,"doorno":doorno,"doorchannel":doorchannel,"doorname":doorname,"description":description,"entryreadersn":sn};
			}else{
				var obj={"staffGroup":staffGroup,"visitorGroup":visitorGroup,"emergencygroup":emergencygroup,"location":location,"id":id,"doorno":doorno,"doorchannel":doorchannel,"doorname":doorname,"description":description,"exitreadersn":sn};
			}
			console.log(obj);
			$.ajax({
				url:url+'/DoorUnit/updateByPrimaryKeySelective',
				dataType:'json',//数据类型
				contentType:'application/json', //需要加contentType
				type:'POST',//类型
				data:JSON.stringify(obj),
				success:function(data){
					console.log(data);
					if(data.flag){
						layer.msg("修改成功!",{time:1000},function(){
							//window.location.href = 'door_list.html';
							parent.layer.closeAll();
							if(parent.treeText!=""){
								for(var i=0;i<$(".layui-tree-txt",parent.document).length;i++){
									if($(".layui-tree-txt",parent.document).eq(i).html()==parent.treeText){
										$(".layui-tree-txt",parent.document).eq(i).click();
									}
								}
							}
						})
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(data){
					
				}
			})
		}else{//新增
			var deviceno=$("#DeviceNo").val();
			var doorchannel=$("#stChannelNum").val();
			var doorname=$("#stChannelName").val();
			var description=$("#terminalName option:selected").html();
			var sn=$("#snNumber").val();
			var id1=$("#holderGrop").val();//员工组
			var id2=$("#visitorGrop").val();//访客组
			var id=$("#terminalId").html();//设备id
			var location=$("#location").html();//设备位置
			if(doorname==""){
				layer.msg("请输入通道名称",{time:2000});
				return;
			}
			if(description==""){
				layer.msg("请选择终端",{time:2000});
				return;
			}
			if(sn==""){
				layer.msg("请输入设备sn",{time:2000});
				return;
			}
			if($('input[name="door"]:checked').val()=="进入"){
				var obj={"emergencygroup":id1+","+id2,"location":location,"id":id,"staffGroup":id1,"visitorGroup":id2,"deviceno":deviceno,"doorchannel":doorchannel,"doorname":doorname,"description":description,"entryreadersn":sn};
			}else{
				var obj={"emergencygroup":id1+","+id2,"location":location,"id":id,"staffGroup":id1,"visitorGroup":id2,"deviceno":deviceno,"doorchannel":doorchannel,"doorname":doorname,"description":description,"exitreadersn":sn};
			}
			console.log(obj)
			$.ajax({
				url:url+'/DoorUnit/insertSenseLinkDevice',
				dataType:'json',//数据类型
				contentType:'application/json', //需要加contentType
				type:'POST',//类型
				data:JSON.stringify(obj),
				success:function(data){
					if(data.flag){
						layer.msg("添加成功!",{time:1000},function(){
							//window.location.href = 'door_list.html';
							parent.layer.closeAll();
							if(parent.treeText!=""){
								for(var i=0;i<$(".layui-tree-txt",parent.document).length;i++){
									if($(".layui-tree-txt",parent.document).eq(i).html()==parent.treeText){
										$(".layui-tree-txt",parent.document).eq(i).click();
									}
								}
							}
						})
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(data){
					
				}
			})
		}
	}else{
		//保存通道信息
		var DoorChannel = $("#DoorChannel1").val();
		var DoorName = $("#DoorName1").val();
		var DeviceNo = $("#DeviceNo").val();
		var AreaID = $("#AreaID").val();
		var EntryReaderCH1=$("#EntryReaderCH1").val();
		var MacCode=$("#MacCode").val();
		var MacName=$("#MacName").val();
		var DoorLimit=$("#DoorLimit").val();
		if(DeviceNo.length=="0"){
			layer.msg("请选择归属设备!",{time:2000});
			return;
		}
		if(DoorChannel.length=="0"){
			layer.msg("请选择门区编号!",{time:2000});
			return;
		}
		if(DoorName.length=="0"){
			layer.msg("请输入门区名称!",{time:2000});
			return;
		}
		if(EntryReaderCH1==""){
			layer.msg("请输入读卡器ID!",{time:2000});
			return;
		}
		var EntryReaderCH="";
		var ExitReaderCH="";
		if($('input[name="door1"]:checked').val()=="进入"){
			 EntryReaderCH=EntryReaderCH1;
		}else{
			 ExitReaderCH=EntryReaderCH1;
		}
		var obj={
				 "DeviceNo":DeviceNo,
				 "DoorChannel":DoorChannel,
				 "DoorName":DoorName,
				 "AreaID":AreaID,
				 "DoorNo":getQueryString("editID"),
				 "EntryReaderCH":EntryReaderCH,
				 "ExitReaderCH":ExitReaderCH,
				 "MacCode":MacCode,
				 "MacName":MacName,
				 "DoorLimit":DoorLimit,
				 "SaveSource":'20',
		}
		$.ajax({
			url:url+'/doorUnit2/saveDoorInfo',
			dataType:'json',//数据类型
			type:'POST',//类型
			data:obj,
			success:function(data){
				if(data.flag){
					layer.msg(data.reason,{time:1000},function(){
						//window.location.href = 'door_list.html';
						parent.layer.closeAll();
						if(parent.treeText!=""){
							for(var i=0;i<$(".layui-tree-txt",parent.document).length;i++){
								if($(".layui-tree-txt",parent.document).eq(i).html()==parent.treeText){
									$(".layui-tree-txt",parent.document).eq(i).click();
								}
							}
						}
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(data){
				
			}
		})
	}
}

//点击取消
$("#abolish").click(function(){
	parent.layer.closeAll();
})

//编辑赋值
function setFormVal(){
	var id = getQueryString("editID");
	var tableType = getQueryString("editType");
	var obj={"id":id,"tableType":tableType};
	$.ajax({
		url:url+'/doorUnit2/getOneDoorInfo',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			$("#DeviceNo").val(data.result[0].DeviceNo);
			$("#DeviceNoName").html(data.result[0].DeviceName);
			formView(tableType);
			if(tableType == '10'){
				//为门区赋值
				$("#DoorChannel").val(data.result[0].DoorChannel);
				$("#EntryReaderCH").val(data.result[0].EntryReaderCH);
				$("#ExitReaderCH").val(data.result[0].ExitReaderCH);
				$("#DoorName").val(data.result[0].DoorName);
				$("#EntryReaderType").val(data.result[0].EntryReaderType);
				$("#ExitReaderType").val(data.result[0].ExitReaderType);
				$("#DeviceTypeCode").val(data.result[0].DeviceTypeCode);
				$("#AreaID").val(data.result[0].AreaID);
			}else{
				$("#DoorChannel1").val(data.result[0].DoorChannel);
				$("#DoorName1").val(data.result[0].DoorName);
				var maccode=data.result[0].MacCode;
				var macname=data.result[0].MacName;
				var doorlimit=data.result[0].DoorLimit;
				maccode=maccode==undefined?"":maccode;
				macname=macname==undefined?"":macname;
				doorlimit=doorlimit==undefined?"":doorlimit;
				$("#MacCode").val(maccode);
				$("#MacName").val(macname);
				$("#DoorLimit").val(doorlimit);
				if(data.result[0].ExitReaderCH!=0){
					var readID=data.result[0].ExitReaderCH;
				}else{
					var readID=data.result[0].EntryReaderCH;
				}
				$("#EntryReaderCH1").val(readID);
				if(data.result[0].ExitReaderCH!=0){
					$(":radio[value='外出']").click()
				}else{
					$(":radio[value='进入']").click();
				}
				layui.use('form', function(){
					  var form = layui.form;
					  form.render();
				});
			}
		},
		error:function(data){
		}
	})
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
