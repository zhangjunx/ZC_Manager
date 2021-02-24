$(function(){
	queryHolderDataListByPage();
	getPage();
	showHide();//跟权限有关
	getDeptTree();
	getDeptTree2();
	openReader();
	getDate();
})//end
function getDate(){
	layui.use('laydate', function () {
		var laydate = layui.laydate;
		//日期
		lay('.test-item').each(function () {
			laydate.render({
				elem: this,
				trigger: 'click'
			});
		});
	});
}//获取日期

//点击人事调动
$(document).on("click",".transfer",function(){
	var holderno=$(this).data("holderno");
	var deptno=$(this).data("deptno");
	var idcode=$(this).data("idcode");
	
	layer.open({
		type:1,
		title:"人事调动",
		content:$("#holderTransfer"),
		area:["400px","380px"],
		btn:["确定","取消"],
		yes:function(index){
			var departmentno2=$("#departmentno2").val();
			if(departmentno2==""){
				layer.msg("请选择部门!",{time:2000});
				return;
			}
			var obj={"holderno":holderno,"deptno1":deptno,"idcode":idcode,"deptno2":departmentno2,"updateperson":window.top.holderno}
			//接口调用
			
			layer.close(index);
			$("#holderTransfer").css("display","none");
		},
		btn2:function(index){
			layer.close(index);
			$("#holderTransfer").css("display","none");
		}
	})
})

//点击离职扫描表选择图片
$("#upload1").change(function(event){
	var imgUrl=$(this).val();
	$("#filename1").val(imgUrl);
})
//点击交接扫描表选择图片
$("#upload2").change(function(event){
	var imgUrl=$(this).val();
	$("#filename2").val(imgUrl);
})

var page;//当前页
var limit;//每页显示条数
var total;//总条数
//分页
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					queryHolderDataListByPage();
				}
			}
		})
	})
}//end

//条件查询人员列表
$(document).on("click","#queryHolderDataByConditionBtn",function(){
	queryHolderDataListByPage();
	getPage();
})//end
function queryHolderDataListByPage(){//查询用户列表
	var holderno=$("#holderno1").val();
	var holdername=$("#holdername1").val();
	var departmentno=$("#departmentno").val();
	var idcode=$("#idcode1").val();
	var obj={"holderno":holderno,"holdername":holdername,
			"departmentno":departmentno,"idcode":idcode,
			"pageIndex":page,"pageSize":limit};
	var str=window.top.holderno;
	$.ajax({
		url:url+"/HolderData/queryHolderDataListByPage?str="+str,
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		success:function(data){
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:3000});
				total=0;
				return;
			}
				page=data.pageinfo.pageIndex;
				limit=data.pageinfo.pageSize;
				total=data.pageinfo.sumCount;
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="2002"){
						list.push(item);
					}
				}
				var html="";
				var text="";
				var text1="";
				var text2="";
				 if(list.findIndex(target=>target.Code=="query")==-1&&window.top.arr.length!=0){
					 text="";
				 }else {
					 text="<a href='holderdata_see.html' class='layui-btn layui-btn-xs layui-btn-warm see'>查看</a>";
				 }
				 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a href='holderdata_update.html' class='layui-btn layui-btn-xs mo'>修改</a>";
				  }
				 
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 text2="";
				  }else {
					 text2="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-danger departure'>删除</a>";
				  }
				 
				 if(text==""&&text1==""&&text2==""){
					 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-warm'>查看</a>";
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
					 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				 }
				$.each(data.result,function(i,val){
					var holderno=(val.holderno==undefined?"":val.holderno);
					var holdername=(val.holdername==undefined?"":val.holdername);
					var sexname=(val.sexname==undefined?"":val.sexname);
					var holdercard=(val.holdercard==undefined?"":val.holdercard);
					var titlename=(val.titlename==undefined?"":val.titlename);
					var emptype=(val.emptype==undefined?"":val.emptype);
					var departmentname=(val.departmentname==undefined?"":val.departmentname);
					var departmentno=(val.departmentno==undefined?"":val.departmentno);
					var companyno=(val.companyno==undefined?"":val.companyno);
					var startdate=(val.startdate==undefined?"":val.startdate);
					var idcode=(val.idcode==undefined?"":val.idcode);
					var idcode2=(val.idcode==undefined?"":val.idcode);
					if(idcode.length==18){
					    idcode=idcode.replace(idcode.substring(6,14),"********");	
					}
					var rolename=(val.rolename==undefined?"":val.rolename);
					var holderstatus=(val.holderstatus==undefined?"":val.holderstatus);
					var html1="";
					if(holderstatus=='11'){
						html1="<a href='javascript:;' class='shou' name='"+holderstatus+"'>授权</a>";
					}else{
						html1="<a href='javascript:;' class='shou' name='"+holderstatus+"'>未授权</a>";
					}
					html+="<tr><td class='no-print'><span class='checkbox' style='float:none'></span></td><td>"
						+holderno+"</td><td>"+holdername+"</td><td>"+sexname+"</td><td>"+companyno
						+"</td><td>"+departmentname+"</td><td>"+emptype
					+"</td><td>"+rolename
					+"</td><td>"+html1+"</td><td class='center no-print'>"+text+text1+text2+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})
}//end

 
//授权登录权限 修改
$(document).on("click",".shou",function(){
	var holderno=$(this).parent().siblings().eq(1).html();
	var holderstatus=$(this).attr("name");
	layer.confirm("确定修改?",{title:"提示"},function(index){
		layer.close(index);
		if(holderstatus=='11'){
			holderstatus="12";
		}else{
			holderstatus="11";
		}
		var obj={"holderno":holderno,"holderstatus":holderstatus};
		$.ajax({
			url:url+"/HolderData/updateHolderStatus",
			type:"POST",
			data:obj,
			dataType:"json",
			success:function(data){
				if(data.flag){
					window.location.reload();
				}else{
					layer.msg(data.reason,{time:2000})
				}
			}
		})
	})
})//end

//点击删除
$(document).on("click",".departure",function(){
	var holderno=$(this).parent().siblings().eq(1).html();
	console.log("holderno=="+holderno)
	layer.confirm("确定删除?",{title:"提示"},function(index){
		$.ajax({
			url:url+"/DepartureRecord/delOneHolder",
			type:"POST",
			data:{"holderNo":holderno},
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.flag){
					layer.msg(data.reason,{time:1000},function(){
						queryHolderDataListByPage();
						getPage();
					})
				}else{
					layer.msg(data.reason,{time:2000})
				}
			}
		})
	})
})//end
//点击离职弹出框的取消
$(".bottom_qx").click(function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})//end
//点击离职弹出框右上角的叉
$(".quxiao").click(function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})//end
//点击离职弹出框的确定
$(".bottom_sure").click(function(){
	//点离职按钮时  执行三个方法
	//$(".holder_add").fadeOut(500);
	//$(".holder_box").fadeOut(500);
	var holderno=$(this).attr("data-holderno");
	var leavetype=$("#leavetype").val();
	var leavetypename=$("#leavetype option:selected").html();
	var expiredate=$("#expiredate").val();
	var leavereason=$("#leavereason").val();
	var handoverscan=$("#filename2").val();//交接扫描表
	var dimissionscan=$("#filename1").val();//离职扫描表
	var loginholderno=window.top.holderno;
	var obj={"holderno":holderno,"leavetype":leavetype,"leavetypename":leavetypename,
			"expiredate":expiredate,"leavereason":leavereason,"loginholderno":loginholderno,"handoverscan":handoverscan,"dimissionscan":dimissionscan,};
	console.log(obj)
	$.ajax({
		url:url+"/DepartureRecord/insert",
		type:"POST",
		data:JSON.stringify(obj),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			if(data.flag){
				window.location.reload();
			}else{
				layer.msg(data.reason,{time:2000})
			}
			$(".holder_add").fadeOut(500);
			$(".holder_box").fadeOut(500);
			
		}
	})
})//end
 



/**
 * 导出全部数据Excel
 */
$("#export").click(function(){
	layer.confirm("选择导出数据",{
		title:"提示信息",
		btn:["导出当前数据","导出全部数据"],
		yes:function(index,layero){
			$(".no-print").remove();
		    var table1 = document.querySelector("#dayindaju1");
		    var sheet = XLSX.utils.table_to_sheet(table1,{raw:true});//将一个table对象转换成一个sheet对象
		    openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
		    window.location.reload();
		},
		btn2:function(index,layero){
			var index=layer.load(2);
			var str=window.top.holderno;
			$.ajax({
				url:url+"/HolderData/queryHolderDataList?str="+str,
				type:"post",
				success:function(data){
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table = $("<table id='tableData' style='display:none'><tr><td>工号</td><td>姓名</td><td>性别</td><td>所属公司</td>" +
								"<td>部门</td><td>职务</td><td>工种</td><td>卡号</td><td>身份证号</td><td>入职日期</td><td>用户角色</td><td>登录权限</td></tr></table>");
					      for(var item of res){
					    	  var holderno=item.holderno==undefined?"":item.holderno;
					    	  var holdername=item.holdername==undefined?"":item.holdername;
					    	  var sexname=item.sexname==undefined?"":item.sexname;
					    	  var companyno=item.companyno==undefined?"":item.companyno;
					    	  var departmentname=item.departmentname==undefined?"":item.departmentname;
					    	  var titlename=item.titlename==undefined?"":item.titlename;
					    	  var emptype=item.emptype==undefined?"":item.emptype;
					    	  var holdercard=item.holdercard==undefined?"":item.holdercard;
					    	  var idcode=item.idcode==undefined?"":item.idcode;
					    	  var startdate=item.startdate==undefined?"":item.startdate;
					    	  var rolename=item.rolename==undefined?"":item.rolename;
					    	  var holderstatus=item.holderstatus==undefined?"":item.holderstatus;
					    	  if(holderstatus=="11"){
					    		  holderstatus="授权";
					    	  }else{
					    		  holderstatus="未授权";
					    	  }
					    	  var $tr=$("<tr><td>"+holderno+"</td><td>"+holdername+"</td><td>"+sexname+"</td>" +
					    	  		"<td>"+companyno+"</td><td>"+departmentname+"</td><td>"+titlename+"</td>" +
					    	  		"<td>"+emptype+"</td><td>"+holdercard+"</td><td>"+idcode+"</td>" +
					    	  		"<td>"+startdate+"</td><td>"+rolename+"</td><td>"+holderstatus+"</td></tr>");
					    	  $table.append($tr);
					      }
					      $("body").append($table);
					      var table = document.querySelector("#tableData");
					      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
					      openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
					      $("#tableData").remove();
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(){
					layer.close(index);
				}
			})
			}
		})
});


//批量删除
$(".delMain").click(function(){
	deleteHolderDataBatch();
})
function deleteHolderDataBatch(){
	var arr=[];
	var cks=$("#cont").children().find("span.curr");
	for(i=0;i<cks.length;i++){
		var holderno=cks.eq(i).parent().siblings().eq(0).html();
		console.log("holderno=="+holderno);
		var obj={"holderno":holderno};
		arr.push(obj);
	}
	if(arr.length==0){
		layer.msg("请先选中要删除的行！");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/HolderData/updateHolderDataBatchs",
			type:"POST",
			data:JSON.stringify(arr),
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				if(data.flag){
					window.location.reload();
				}else{
					layer.msg(data.reason,{time:2000})
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
		$("#insertHolderData").hide();
		$("#daoruHolder").hide();
		$("#daochu").hide();
		$("#printHolderData").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="2002"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertHolderData").show();
			}
			if(item.Code=="import"){
				$("#daoruHolder").show();
			}
			if(item.Code=="export"){
				$("#daochu").show();
			}
			if(item.Code=="print"){
				$("#printHolderData").show();
			}
		}
	}
//复选
$(document).on('click', '.checkbox', function () {
	if ($(this).attr("id") == "selectAll") { //全选
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').removeClass('curr');
            })
        } else {
            $(this).addClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').addClass('curr');
            })
        }
    } else {
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $('#selectAll').removeClass('curr');
        } else {
            $(this).addClass('curr');
            var arr=$("#cont").children().find("span.checkbox")
           	var str=$("#cont").children().find("span.curr");
           	if(arr.length==str.length){
           		$('#selectAll').addClass('curr');
           	}
        }
    }           	
})//end               			

//点击查看获取工号
$(document).on("click",".see",function(){
	var holderno=$(this).parent().siblings().eq(1).html();
	localStorage.info=holderno;
});//end


//点击修改获取信息
$(document).on("click",".mo",function(){
	var holderno=$(this).parent().siblings().eq(1).html();
	localStorage.infos=holderno;
})//end


//删除
$(document).on("click",".shan",function(){
	var holderno=$(this).parent().siblings().eq(1).html();
	$.ajax({
		url:url+"/HolderData/deleteHolderData",
		type:"POST",
		data:{"holderno":holderno},
		success:function(data){
			if(data.flag){
				window.location.reload();
				layer.msg(data.reason,{time:2000})
			}else{
				layer.msg(data.reason,{time:2000})
			}
		}
	})
})//end
//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		//url:url+"/DepartmentData/getDeptTree",
		//url:url+"/DepartmentData/getMyDeptTree",
		url:url+"/ACL_Roles/getDeptTreeByMyRole",
		type:'POST',//类型
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
		//contentType:"application/json",
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node)
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
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

$("#idcode1").click(function(){
	readIDCard();
})

var socket;
function openReader() {
	var host = "ws://localhost:33666";
	if(socket == null){
		socket = new WebSocket(host);
	}else{
		console.log("已初始化.");
	}
	try {
		socket.onopen = function () {
			console.log("初始化成功.");
			//getVersion(); 
		};
		socket.onclose = function () {
			console.log("读卡服务已经断开.");
		};
		socket.onerror = function(){
			console.log("请检查控件是否正常安装.");
		};
		socket.onmessage = function (msg) {
			if (typeof msg.data == "string") {
				var msgM=msg.data+"";
				var msgJson = JSON.parse(msgM);
				//resultMsg(msgM);        
				switch(msgJson.fun) {

					case "EST_GetVersion#":
						layer.msg("版本号："+msgJson.errMsg,{time:2000})
					break;
						
					case "EST_Reader_ReadIDCard#":
						if (msgJson.rCode == "0") {
							console.log(msgJson)
							document.getElementById("idcode1").value = msgJson.certNo; //身份证号码      
							posBeep();
							//ReadCertID()
						}
						else if(msgJson.rCode == "-2"){
							layer.msg("请放身份证",{time:2000})
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_ReadCertID#":
						if (msgJson.rCode == "0") {
							document.getElementById("holdercard").value = msgJson.UID;  
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000})
						}
					break;
					
					case "EST_ReadBankCard#":
						if (msgJson.rCode == "0") {
							document.getElementById("text_Bank_ID").value = msgJson.bankCard;
							posBeep();
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_ReadM1Card#":
						if (msgJson.rCode == "0") {
							console.log(msgJson)
							document.getElementById("holdercard1").value = msgJson.UID; //IC卡卡号
							
							posBeep();
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_ReadSocialCard#":   //社保卡信息，个别地区社保卡不按国家规范来的，会读取信息不全
						if (msgJson.rCode == "0") { 
							document.getElementById("S_text_name").value = msgJson.XM;  //社保卡姓名  
							document.getElementById("S_text_sex").value = msgJson.XB;  //社保卡性别             
							document.getElementById("S_text_nation").value = msgJson.MZ;  //社保卡民族                      
							document.getElementById("S_text_birthday").value = msgJson.CSRQ; //社保卡出生日期                  
							document.getElementById("S_text_idNum").value = msgJson.SHBZHM; //社保卡身份证号      
							document.getElementById("S_text_effDate").value = msgJson.FKRQ; //社保卡有效期开始
							document.getElementById("S_text_expDate").value = msgJson.KYXQ; //社保卡有效期结束
							document.getElementById("S_text_kahao").value = msgJson.SBKH; //社保卡卡号
							posBeep();
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_IDRequest#":
							if (msgJson.rCode == "0") {
								layer.msg("找到身份证",{time:2000})
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
					break;

					default:
						break;
				}
			}
			else{
				layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
			}
		};
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}

//读取IC卡号，包括M1、CPU卡，8位16进制数据
function readM1Card() {
	try { 
		if (socket.readyState == 1) {
			socket.send("EST_ReadM1Card#");  
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}


//读取身份证物理ID，16位8进制数据，一般情况用不到，可以注释掉
function ReadCertID() {
	try { 
		if (socket.readyState == 1) {
			socket.send("EST_ReadCertID#"); 
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}



//蜂鸣器控制，可以自己选择是否蜂鸣
function posBeep() {
	if (socket.readyState == 1) {
			socket.send("EST_PosBeep#");
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
}


//读取身份证信息
function readIDCard() {
	try {
		if (socket.readyState == 1) {
			socket.send("EST_Reader_ReadIDCard#");    
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}

//部门下拉树初始化
function getDeptTree2(){
	$.ajax({
		//url:url+"/DepartmentData/getDeptTree",
		//url:url+"/DepartmentData/getMyDeptTree",
		url:url+"/ACL_Roles/getDeptTreeByMyRole",
		type:'POST',//类型
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
		//contentType:"application/json",
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree2",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node)
			        	$("#departmentno2").val(node.data.id);
			        	$("#departmentname2").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			        }
			    
			    });
			    $("#holderTransfer .downpanel").on("click", "#holderTransfer .layui-select-title", function (e) {
			        $("#holderTransfer .layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
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