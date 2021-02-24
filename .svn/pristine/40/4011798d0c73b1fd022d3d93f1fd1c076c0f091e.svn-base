$(function(){
	//设备类型combo
	initDeviceTypeCombo();
	//初始化设备厂家下拉框
	var DeviceTypeCode = $("#DeviceTypeCode").val();
	initFactoryCombo(DeviceTypeCode);
	//设备型号初始化
	var DataNo = $("#ManufacturerCode").val();
	initDeviceModel(DataNo);
})
/***
 * import-file.html页面引入本文件
 * 用于处理表格数据和导入
 */
/**
 * 选择导入文件时的onchange事件(excelimport)
 * 用于把Excel提交到后台,让后台先对表格数据进行查询和检查 
 */
//分页
$("#excelimport").change(function(e){
	postData();
	//清空input
	e.target.value = '';
});//end


var limit=20;
var page=1;

function getPage(count){
  layui.use("laypage", function () {
        var laypage = layui.laypage;
        laypage.render({
            elem: "test",
            count: count, //数据总数，从服务端得到
            limit: limit,
            curr:page,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数
                page=obj.curr;
                limit=obj.limit;
                if (!first) {
                    // do something
                	pagination(page,limit,count);
                }
            }
        })
    })
}
function postData(){
	 var formData = new FormData();
	 var excle = $("#excelimport").val();
	 formData.append("file",$("#excelimport")[0].files[0]);
	//文件名可以带空格
    var reg = /^.*\.(?:xls|xlsx)$/i;
	//校验不通过
	if(!reg.test(excle)) {
		layer.msg("请上传excel格式的文件!",{icon:3,time:4000}); 
		$("#dayindaju1 tr").eq(0).nextAll().remove();
	}else{
		var idx=layer.load(2);
		$.ajax({
	        url:url+"/deviceUnit2/checkExcelData",//后台检查Excel表格中的数据
	        type:'POST',
	        //async:false,
	        data:formData,
	        // 告诉jQuery不要去处理发送的数据
	        processData:false,
	        // 告诉jQuery不要去设置Content-Type请求头
	        contentType:false,
	        success : function(data) {
	        	console.log(data)
	          layer.close(idx);
	          $("#dayindaju1 tr").eq(0).nextAll().remove();
	          var res=data.result;
	          if(data.flag){
	        	  	var index=1;
					for(var item of res){
							var DeviceName=(item[0]==undefined?"":item[0]);
							var IP=(item[1]==undefined?"":item[1]);
							var Port=(item[2]==undefined?"":item[2]);
							var deviceID=(item[3]==undefined?"":item[3]);
							var DeviceCode=(item[4]==undefined?"":item[4]);
							var InstallLocation=(item[5]==undefined?"":item[5]);
							var ControlSN=(item[6]==undefined?"":item[6]);
							var DoorChannel1=(item[7]==undefined?"":item[7]);
							var DoorName1=(item[8]==undefined?"":item[8]);
							var DoorChannel2=(item[9]==undefined?"":item[9]);
							var DoorName2=(item[10]==undefined?"":item[10]);
							var $div=$("<div class='layui-unselect layui-form-select downpanel' style='width: 210px;margin: 0 auto;'><div class='control clearfix layui-select-title layui-input layui-unselect'>" +
									"<span id='AreaIDName"+index+"' class='areaname'></span><input type='hidden' class='AreaID"+index+"'><i class='layui-edge'></i></div><dl class='layui-anim layui-anim-upbit' style='left: 0px;top:34px;min-width: 211px;'><dd>" +
									"<ul id='classtree"+index+"' class='input'></ul></dd></dl></div>");
							index++;
							var $tr=$("<tr></tr>");
							var $td1=$("<td class='DeviceTypeCode'></td>")
							var $td2=$("<td class='ManufacturerCode'></td>")
							var $td3=$("<td class='ControlType'></td>")
							var $td4=$("<td class='DeviceName'></td>");
							var $td5=$("<td class='AreaID'></td>")
							var $td6=$("<td class='IP'></td>");
							var $td7=$("<td class='Port'></td>");
							var $td8=$("<td class='InstallLocation'></td>");
							var $td9=$("<td class='ControlSN'></td>");
							var $td10=$("<td class='DoorChannel1'></td>");
							var $td11=$("<td class='DoorName1'></td>");
							var $td12=$("<td class='DoorChannel2'></td>");
							var $td13=$("<td class='DoorName2'></td>");
							var $td14=$("<td class='deviceID'></td>");
							var $td15=$("<td class='DeviceCode'></td>");
							if(DeviceName==""){
								DeviceName="请填写";
								$td4.css("color","red");
							}
							if(IP==""){
							   IP="请填写";
							   $td6.css("color","red");
						     }
							if(Port==""){
								Port="请填写";
								$td7.css("color","red");
							 }
							if(InstallLocation==""){
								InstallLocation="请填写";
								$td8.css("color","red");
							 }
							if(deviceID==""){
								deviceID="请填写";
								$td14.css("color","red");
							}
							if(DeviceCode==""){
								DeviceCode="请填写";
								$td15.css("color","red");
							}
							if(DoorChannel1==""&&DoorName1==""&&DoorChannel2==""&&DoorName2==""){
								DoorChannel1="请填写";
								DoorName1="请填写";
								$td10.css("color","red");
								$td11.css("color","red");
							 }
							if(DoorChannel1==DoorChannel2){
								$td10.css("color","red");
								$td12.css("color","red");
							}
							if(DoorName1==DoorName2){
								$td11.css("color","red");
								$td13.css("color","red");
							}
							$td4.append(DeviceName);
							$td6.append(IP);
							$td7.append(Port);
							$td8.append(InstallLocation);
							$td9.append(ControlSN);
							$td10.append(DoorChannel1);
							$td11.append(DoorName1);
							$td12.append(DoorChannel2);
							$td13.append(DoorName2);
							$td14.append(deviceID);
							$td15.append(DeviceCode);
							$td5.append($div);
							$tr.append($td1);
							$tr.append($td2);
							$tr.append($td3);
							$tr.append($td4);
							$tr.append($td5);
							$tr.append($td6);
							$tr.append($td7);
							$tr.append($td14);
							$tr.append($td15);
							$tr.append($td8);
							$tr.append($td9);
							$tr.append($td10);
							$tr.append($td11);
							$tr.append($td12);
							$tr.append($td13);
							$("#dayindaju1").append($tr);
					};
					//判断ip是否重复
					  var arr1=[];
					  for(var i=0;i<$(".IP").length;i++){
						  arr1.push($(".IP").eq(i).html());
					  }
					  arr1=arr1.sort();
					  for(var k=0;k<arr1.length;k++){
						  if(arr1[k]==arr1[k+1]){
							for(var m=0;m<$(".IP").length;m++){
								if(arr1[k]==$(".IP").eq(m).html()&&arr1[k]!="请填写"){
									$(".IP").eq(m).css("color","red");
								}
							}  
						  }
					  }
					//判断sn是否重复
					  var arr2=[];
					  for(var i=0;i<$(".ControlSN").length;i++){
						  if($(".ControlSN").eq(i).html()!=""){
							  arr2.push($(".ControlSN").eq(i).html());
						  }
					  }
					  arr2=arr2.sort();
					  for(var k=0;k<arr2.length;k++){
						  if(arr2[k]==arr2[k+1]){
							for(var m=0;m<$(".ControlSN").length;m++){
								if(arr2[k]==$(".ControlSN").eq(m).html()&&arr2[k]!="请填写"){
									$(".ControlSN").eq(m).css("color","red");
								}
							}  
						  }
					  }
					//判断设备编号是否重复
					  var arr3=[];
					  for(var i=0;i<$(".DeviceCode").length;i++){
						  if($(".DeviceCode").eq(i).html()!=""){
							  arr3.push($(".DeviceCode").eq(i).html());
						  }
					  }
					  arr3=arr3.sort();
					  for(var k=0;k<arr3.length;k++){
						  if(arr3[k]==arr3[k+1]){
							for(var m=0;m<$(".DeviceCode").length;m++){
								if(arr3[k]==$(".DeviceCode").eq(m).html()&&arr3[k]!="请填写"){
									$(".DeviceCode").eq(m).css("color","red");
								}
							}  
						  }
					  }
					  
					initSelectTree(index);
					$("tbody").attr("id","page");
					layer.msg(data.reason,{time:1000});
					count=res.length;
					pagination(1,20,count);
					getPage(count);
				}
	        }
	     })
	 }
}
//设备类型选择
$("#DeviceTypeCode").change(function(){
	var DeviceTypeCode = $("#DeviceTypeCode").val();
	initFactoryCombo(DeviceTypeCode);
	var ManufacturerCode = $("#ManufacturerCode").val();
	initDeviceModel(ManufacturerCode);
});
//设备型号选择
$("#ManufacturerCode").change(function(){
	var ManufacturerCode = $("#ManufacturerCode").val();
	initDeviceModel(ManufacturerCode);
});

//点击确定给页面表格赋值
$("#queryListBtn").click(function(){
	 var DeviceTypeCode=$("#DeviceTypeCode").find("option:selected").html();
     var ManufacturerCode=$("#ManufacturerCode").find("option:selected").html();
     var ControlType=$("#ControlType").find("option:selected").html();
     $(".DeviceTypeCode").html(DeviceTypeCode);
     $(".ManufacturerCode").html(ManufacturerCode);
     $(".ControlType").html(ControlType);
})
//区域下拉树初始化
function initSelectTree(index){
	$.ajax({
		url:url+'/deviceUnit2/getAreaTree',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			if(data.flag){
				layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
				    var $ = layui.jquery, tree = layui.tree;
				    for(let i=1;i<index;i++){
				    	tree.render({
					        elem: "#classtree"+i,
					        data: data.result,
					        onlyIconControl:true,
					        click: function (node) {
					        	$("#AreaIDName"+i).html(node.data.title).attr("data-id",node.data.id);
					            var $select = $($(this)[0].elem).parents(".layui-form-select");
					            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='AreaID']").val(node.id);
					        }
					    });
				    }
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
			}
		},
		error:function(data){}
	})
}
//设备类型combo
function initDeviceTypeCombo(){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceTypeList',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			$("#DeviceTypeCode").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].Code+'">'+data.result[i].TypeName+'</option>';
			}
			$("#DeviceTypeCode").append(html);
		},
		error:function(data){
			
		}
	})
}

//初始化设备厂家下拉框
function initFactoryCombo(DeviceTypeCode){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceFactoryList?DeviceTypeCode='+DeviceTypeCode,
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			console.log(data)
			$("#ManufacturerCode").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option data-code="'+data.result[i].Code+'" value="'+data.result[i].DataNo+'">'+data.result[i].Name+'</option>';
			}
			$("#ManufacturerCode").append(html);
		},
		error:function(data){
			
		}
	})
}

//设备型号下拉框
function initDeviceModel(DataNo){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceModelList?DataNo='+DataNo,
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			$("#ControlType").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].Code+'">'+data.result[i].Name+'</option>';
			}
			$("#ControlType").append(html);
		},
		error:function(data){
			
		}
	})
}

//分页
function pagination(curr, limit, count) {
    var dep = document.getElementById("page")
    var departmentInfo = document.getElementsByTagName("table")
    startRow = (curr - 1) * limit + 1 //每页显示第一条数据的行数
    lastRow = curr * limit //每页显示最后一条数据的行数
    var totalRow = count
    lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
    for (var i = 1; i < totalRow + 1; i++) { //遍历数据
        var hrow = dep.rows[i]
        if (i >= startRow && i <= lastRow) {
            hrow.style.display = ""
        } else {
            hrow.style.display = "none"
        }
    }
}

//对CST格式的时间字符串进行分段截取，重新拼接为GMT格式，然后显示
function getTaskTime(strDate) {
    if(null==strDate || ""==strDate){
        return "";
    }
    var dateStr=strDate.trim().split(" ");
    var strGMT = dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";
    var date = new Date(Date.parse(strGMT));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y+"-"+m+"-"+d;
};



/**
 * 确定导入按钮的点击事件(determine)
 * 点击后提交至后台进行处理
 */
	  $("#determine").click(function(){
		  if($("tr").length==1){
			  layer.msg("请先上传文件!",{time:2000});
			  return;
		  }
		  for(var i=0;i<$("td").length;i++){
			  if($("td").eq(i).css("color")=="rgb(255, 0, 0)"){
					 layer.msg("请检查页面加红的数据!",{time:2000});
					 return;
				 }
		  }
		  var index=layer.load(2);
		  //从页面获取全部数据
		  var arr=[];
		  for(var i=0;i<$(".DeviceTypeCode").length;i++){
			  if($(".DeviceTypeCode").eq(i).html()==""){
				  layer.msg("请选择设备类型!",{time:2000});
				  layer.close(index);
				  return;
			  }
			  if($(".ManufacturerCode").eq(i).html()==""){
				  layer.msg("请选择设备厂家!",{time:2000});
				  layer.close(index);
				  return;
			  }
			  if($(".ControlType").eq(i).html()==""){
				  layer.msg("请选择设备型号!",{time:2000});
				  layer.close(index);
				  return;
			  }
			  if($(".areaname").eq(i).html()==""){
				  layer.msg("请选择区域!",{time:2000});
				  layer.close(index);
				  return;
			  }
			  if($(".DoorChannel1").eq(i).html()==""||$(".DoorName1").eq(i).html()==""){
				  if($(".DoorChannel2").eq(i).html()!=""&&$(".DoorName2").eq(i).html()!=""){
					  
				  }
			  }
			  if($(".DoorChannel1").eq(i).html()!=""&&$(".DoorName1").eq(i).html()!=""&&$(".DoorChannel2").eq(i).html()!=""&&$(".DoorName2").eq(i).html()!=""){
				  var obj={
						  "DeviceTypeCode":$("#DeviceTypeCode").val(),
						  "ManufacturerCode":$("#ManufacturerCode").find("option:selected").attr("data-code"),
						  "ControlType":$("#ControlType").val(),
						  "DeviceName":$(".DeviceName").eq(i).html(),
						  "AreaID":$(".areaname").eq(i).attr("data-id"),
						  "IP":$(".IP").eq(i).html(),
						  "Port":$(".Port").eq(i).html(),
						  "InstallLocation":$(".InstallLocation").eq(i).html(),
						  "ControlSN":$(".ControlSN").eq(i).html(),
						  "deviceID":$(".deviceID").eq(i).html(),
						  "DeviceCode":$(".DeviceCode").eq(i).html(),
						  "data":[
							  {
								  "DoorChannel":$(".DoorChannel1").eq(i).html(),
								  "DoorName":$(".DoorName1").eq(i).html()
							  },
							  {
								  "DoorChannel":$(".DoorChannel2").eq(i).html(),
								  "DoorName":$(".DoorName2").eq(i).html()
							  }
						  ]
				  };
			  }else if($(".DoorChannel1").eq(i).html()==""||$(".DoorName1").eq(i).html()==""){
				  if($(".DoorChannel2").eq(i).html()!=""&&$(".DoorName2").eq(i).html()!=""){
					  var obj={
							  "DeviceTypeCode":$("#DeviceTypeCode").val(),
							  "ManufacturerCode":$("#ManufacturerCode").find("option:selected").attr("data-code"),
							  "ControlType":$("#ControlType").val(),
							  "DeviceName":$(".DeviceName").eq(i).html(),
							  "AreaID":$(".areaname").eq(i).attr("data-id"),
							  "IP":$(".IP").eq(i).html(),
							  "Port":$(".Port").eq(i).html(),
							  "InstallLocation":$(".InstallLocation").eq(i).html(),
							  "ControlSN":$(".ControlSN").eq(i).html(),
							  "deviceID":$(".deviceID").eq(i).html(),
							  "DeviceCode":$(".DeviceCode").eq(i).html(),
							  "data":[
								  {
									  "DoorChannel":$(".DoorChannel2").eq(i).html(),
									  "DoorName":$(".DoorName2").eq(i).html()
								  }
							  ]
					  };
				  }
			  }else if($(".DoorChannel2").eq(i).html()==""||$(".DoorName2").eq(i).html()==""){
				  if($(".DoorChannel1").eq(i).html()!=""&&$(".DoorName1").eq(i).html()!=""){
					  var obj={
							  "DeviceTypeCode":$("#DeviceTypeCode").val(),
							  "ManufacturerCode":$("#ManufacturerCode").find("option:selected").attr("data-code"),
							  "ControlType":$("#ControlType").val(),
							  "DeviceName":$(".DeviceName").eq(i).html(),
							  "AreaID":$(".areaname").eq(i).attr("data-id"),
							  "IP":$(".IP").eq(i).html(),
							  "Port":$(".Port").eq(i).html(),
							  "InstallLocation":$(".InstallLocation").eq(i).html(),
							  "ControlSN":$(".ControlSN").eq(i).html(),
							  "data":[
								  {
									  "DoorChannel":$(".DoorChannel1").eq(i).html(),
									  "DoorName":$(".DoorName1").eq(i).html()
								  }
							  ]
					  };
				  }
			  }else{
				  layer.msg("请检查数据,完善一组门区信息",{time:2000});
				  return;
			  }
			  arr.push(obj);
		  }
		  console.log(arr)
	    $.ajax({ 
	        url : url+"/deviceUnit2/addExcelBatchDevice",
	        type : 'POST',
	        contentType:"application/json", // 指定这个协议很重要
	        data:JSON.stringify({"list":arr}),
	        dataType:"json",
	        success : function(data) {
	        	 layer.close(index);
	        	if(data.code=="200"){
	        		layer.msg(data.reason,{time:2000});
				}else{
					for(var item of data.result){
						for(var i=0;i<$(".IP").length;i++){
							if(item.IP==$(".IP").eq(i).html()){
								$(".IP").eq(i).css("color","red");
							}
						}
						for(var k=0;k<$(".ControlSN").length;k++){
							if(item.ControlSN==$(".ControlSN").eq(k).html()){
								$(".ControlSN").eq(k).css("color","red");
							}
						}
					}
					layer.msg(data.reason,{time:2000});
				}
	        },
	        error:function(){
	        	layer.close(index);
	        }
	     })
});
