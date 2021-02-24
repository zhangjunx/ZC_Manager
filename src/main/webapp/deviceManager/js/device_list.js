var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	//初始化设备厂家下拉框
	initFactoryCombo();
	//初始化所属区域下拉框
	initSelectTree();
	//初始化table
	var obj={"curpage":curpage,"pagesize":pagesize};
	initTable(obj);
	getPage(total);
	showHide();
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
					var obj={"curpage":curpage,"pagesize":pagesize};
	            	initTable(obj);
				}
			}
		})
	})
}//end
//初始化table
function initTable(obj){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="17001"){
					list.push(item);
				}
			}
			//添加表格数据
			$("#cont").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				var ConnectStatus = data.result[i].ConnectStatus == '-1' ? '离线':'在线';
				var src =  data.result[i].ConnectStatus == '-1' ? 'img/off.png':'img/on.png';
				var NetStatus = data.result[i].NetStatus == '0' ? '已连接':'未通讯';
				var DeviceCode = data.result[i].DeviceCode == undefined ? '':data.result[i].DeviceCode;
				var DeviceName = data.result[i].DeviceName == undefined ? '':data.result[i].DeviceName;
				var DeviceTypeCodeName = data.result[i].DeviceTypeCodeName == undefined ? '':data.result[i].DeviceTypeCodeName;
				var ManufacturerCodeName = data.result[i].ManufacturerCodeName == undefined ? '':data.result[i].ManufacturerCodeName;
				var ControlTypeName = data.result[i].ControlTypeName == undefined ? '':data.result[i].ControlTypeName;
				var AreaIDName = data.result[i].AreaIDName == undefined ? '':data.result[i].AreaIDName;
				var InstallLocation = data.result[i].InstallLocation == undefined ? '':data.result[i].InstallLocation;
				var IP = data.result[i].IP == undefined ? '':data.result[i].IP;
				var Port = data.result[i].Port == undefined ? '':data.result[i].Port;
				var DeviceID = data.result[i].DeviceID == undefined ? '':data.result[i].DeviceID;
				var DeviceEnabled = data.result[i].DeviceEnabled == '1' ? '启用':'禁用';
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 var text1="";
				 }else {
					 var text1="<a href='javascript:;' onclick='updateInfo("+data.result[i].DeviceNo+")' class='mo layui-btn layui-btn-xs'>修改</a>";
				 }
				 if(list.findIndex(target=>target.Code=="query")==-1&&window.top.arr.length!=0){
					 var text2="";
				  }else {
					 var text2="<a href='device_watch.html?DeviceNO="+data.result[i].DeviceNo+"' class='mo layui-btn layui-btn-xs layui-btn-warm'>查看</a>";
				  }
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 var text3="";
				  }else {
					 var text3="<a href='javascript:;' onclick='delInfo("+data.result[i].DeviceNo+")' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				  }
				 if(text1==""&&text2==""&&text3==""){
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
					 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-warm'>查看</a>";
					 text3="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				 }
				html = html + '<tr>';
				html = html + '<td>'+(i+1)+'</td>';
				html = html + '<td>'+'<span style="margin-right:5px"><image src = "'+src+'"/></span>'+ConnectStatus+'</td>';
				html = html + '<td>'+NetStatus+'</td>';
				html = html + '<td>'+DeviceCode+'</td>';
				html = html + '<td>'+DeviceName+'</td>';
				html = html + '<td>'+DeviceTypeCodeName+'</td>';
				html = html + '<td>'+ManufacturerCodeName+'</td>';
				html = html + '<td>'+ControlTypeName+'</td>';
				html = html + '<td>'+AreaIDName+'</td>';
				html = html + '<td>'+InstallLocation+'</td>';
				html = html + '<td>'+IP+'</td>';
				html = html + '<td>'+Port+'</td>';
				html = html + '<td>'+DeviceID+'</td>';
				html = html + '<td>'+DeviceEnabled+'</td>';
				html = html + '<td>'+text1+text2+text3+'</td>';
				html = html + '</tr>';
			}
			$("#cont").append(html);
		},
		error:function(data){
			
		}
	})
}

//初始化设备厂家下拉框
function initFactoryCombo(){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceFactoryList2',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			$("#ManufacturerCode").empty();
			var html = '<option value="">所有厂家</option>';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].Code+'">'+data.result[i].Name+'</option>';
			}
			$("#qManufacturerCode").append(html);
		},
		error:function(data){
			
		}
	})
}
//区域下拉树初始化
function initSelectTree(){
	$.ajax({
		url:url+'/deviceUnit2/getAreaTree',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#AreaID").val(node.data.id);
			        	$("#AreaIDName").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='AreaID']").val(node.id);
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

//点击搜索
$("#queryListBtn").click(function(){
	curpage=1;//初始化
	var obj={"ManufacturerCode":$("#qManufacturerCode").val(),"DeviceName":$("#qDeviceName").val(),"AreaID":$("#AreaID").val(),"curpage":curpage,"pagesize":pagesize};
	initTable(obj);
	getPage(total);
})

//编辑
function updateInfo(DeviceNo){
	window.location.href = 'device_add.html?DeviceNo='+DeviceNo;
}

//删除
function delInfo(DeviceNo){
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+'/deviceUnit2/delOneDeviceInfo?DeviceNO='+DeviceNo,
			dataType:'json',//数据类型
			type:'POST',//类型
			success:function(data){
				var obj={"ManufacturerCode":$("#qManufacturerCode").val(),"DeviceName":$("#qDeviceName").val()};
				initTable(obj);
			},
			error:function(data){
				
			}
		})
	})
}

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertDevice").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="17001"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertDevice").show();
			}
		}
	}
