$(function(){
	getDate();//给出入库时间赋值
	queryOperatorPerson();//查询录入人
	//自动生成出入库单号
	queryProduct_RK_CK_OrderNoByAuto();
	//queryDeptListByLoginPerson();//查询部门下拉框 
	getDeptTree();
	queryWareCodeList();//查询仓库
	//查询某个仓库所有区域列表
	//queryAreaCodeList();
	
	showHide();//跟权限有关
	openReader();
	getItemProjectList();
});

//领用项目下拉
function getItemProjectList(){
	$.ajax({
		  url:url+"/ZX_ItemProject/getItemProjectList",
		  type:"POST",
		  dataType:"json",
		  contentType:"application/json",
		  success:function(data){
			  console.log(data)
			 $("#projectid option:not(:first)").remove();
			  if(!data.flag){
				  return;
			  }
			  var html="";
			  $.each(data.result,function(i,val){
				  var id=(val.id==undefined?"":val.id);
				  var projectname=(val.projectname==undefined?"":val.projectname);
				  html+="<option value='"+id+"'>"+projectname+"</option>"
			  }) 
			  $("#projectid").append(html);
		  }
	}) 
}


//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#save1").hide();
	$("#printOutProduct_SDData").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="15003"){
			list.push(item);
		}
		
	})
	for(var item of list){
		if(item.Code=="add"){
			$("#save1").show();
		}
		if(item.Code=="print"){
			$("#printOutProduct_SDData").show();
		}
	}
}//end

//获取当前日期时间
function getDate(){
	var date=new Date();
	var year = date.getFullYear();
	var month = (date.getMonth()+1)<=9?("0"+(date.getMonth()+1)):(date.getMonth()+1);
	var day =(date.getDate())<=9?("0"+(date.getDate())):(date.getDate());
	var hour=(date.getHours())<=9?("0"+(date.getHours())):(date.getHours());//date.getHours();
	var minute=(date.getMinutes())<=9?("0"+(date.getMinutes())):(date.getMinutes());//date.getMinutes();
	var second=(date.getSeconds())<=9?("0"+(date.getSeconds())):(date.getSeconds());//date.getSeconds();
	var html=year+"-"+month+"-"+day;
	var html2=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	$("#test1").val(html)//给出入库日期 赋值
}//end


//数量失焦事件
$(".quantity").blur(function(){
	var quantity=$(this).val();
	var price=$(this).parent().parent().children().find(".price").val();
	$(this).parent().parent().children().find(".sumamount").val(floatMul(price,quantity));
})
//单价失焦事件
$(".price").blur(function(){
	var price=$(this).val();
	var quantity=$(this).parent().parent().children().find(".quantity").val();
	$(this).parent().parent().children().find(".sumamount").val(floatMul(price,quantity));
})

function floatMul(arg1,arg2)   {     
    var m=0,s1=arg1.toString(),s2=arg2.toString();     
    try{m+=s1.split(".")[1].length}catch(e){}     
    try{m+=s2.split(".")[1].length}catch(e){}     
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);     
}  



//自动生成入库单号
function queryProduct_RK_CK_OrderNoByAuto(){
	$.ajax({
 		url:url+"/Product_SDData/queryProduct_RK_CK_OrderNoByAuto",
		type:"POST",
		success:function(data){	
			$("#out_sdbill").val(data.out_sdbill);
		}
 	})
}///end

 
 
 
//点击保存出库
$("#save1").click(function(){
	var sdstatus="12";
	var statusname="出库";
	var sdbill=$("#out_sdbill").val();
	
	$(".chuku").html($("#sdperson option:selected").html());
	$(".bumen").html($("#departmentname").html());
	$(".riqi").html($("#test1").val());
	$(".danhao").html($("#out_sdbill").val());
	$("#product").empty();
	for(var i=0;i<$(".itemcode").length;i++){
		if($(".itemcode").eq(i).val()!=""){
			var $tr=$("<tr></tr>")
			var $td1=$("<td></td>");
			var $td2=$("<td></td>");
			var $td3=$("<td></td>");
			var $td4=$("<td></td>");
			var $td5=$("<td></td>");
			var $td6=$("<td></td>");
			var $td7=$("<td></td>");
			var $td8=$("<td></td>");
			var $td9=$("<td></td>");
			//var $td10=$("<td></td>");
			//var $td11=$("<td></td>");
			$td1.append($(".itemcode").eq(i).val());
			$td2.append($(".itemcode").eq(i).parent().siblings().eq(1).html());
			$td3.append($(".itemcode").eq(i).parent().siblings().eq(5).html());
			$td4.append($(".itemcode").eq(i).parent().siblings().eq(6).html());
			$td5.append($(".itemcode").eq(i).parent().siblings().eq(2).children().eq(0).val());
			$td6.append($(".itemcode").eq(i).parent().siblings().eq(3).children().eq(0).val());
			$td7.append($(".itemcode").eq(i).parent().siblings().eq(4).children().eq(0).val());
			$td8.append($(".itemcode").eq(i).parent().siblings().eq(7).html());
			$td9.append($(".itemcode").eq(i).parent().siblings().eq(8).html());
			//$td10.append($(".itemcode").eq(i).parent().siblings().eq(9).html());
			//$td11.append($(".itemcode").eq(i).parent().siblings().eq(10).children().eq(0).find("option:selected").html());
			//$tr.append($td1);
			$tr.append($td2);
			$tr.append($td8);
			$tr.append($td3);
			$tr.append($td4);
			$tr.append($td5);
			//$tr.append($td6);
			//$tr.append($td7);
			
			//$tr.append($td9);
			//$tr.append($td10);
			//$tr.append($td11);
			
			$("#product").append($tr);
			//$(".bumen").append($("#sdpersondept option:selected").html());
			
			
		}
	}
	
	insertProductSDDataBatch(sdstatus,statusname,sdbill);
})


//点击保存，提交入库
function insertProductSDDataBatch(sdstatus,statusname,sdbill){
	var operator=$("#operator").val();
	var sddate=$("#test1").val();
	var sdperson=$("#sdperson").val();
	var sdpersonname=$("#sdperson option:selected").html();
	var sdpersondept=$("#departmentno").val();
	var sdpersondeptname=$("#departmentname").html();
	//var supplierno=$("#supplierno").val()
	//var suppliername=$("#supplierno option:selected").html();
	var warecode=$("#warecode").val();
	var warename=$("#warecode option:selected").html();
	if(sdpersondept==""){
		layer.msg("请选择所属部门!",{time:2000});
		return;
	}
	if(sdperson==""){
		layer.msg("请选择入库人员!",{time:2000});
		return;
	}
	if(warecode==""){
		layer.msg("请选择所在仓库!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$(".itemcode").length;i++){
		if($(".itemcode").eq(i).val()!=""){
			var storage=$(".storage").eq(i).html();
			var quantity=$(".quantity").eq(i).val();
			storage=parseInt(storage);
			quantity=parseInt(quantity);
			if(storage<quantity){
				layer.msg("出库数量不能大于当前库存量",{time:2000});
				return;
			}
		/*var obj={
				"itemcode":$(".itemcode").eq(i).val(),
				"itemname":$(".itemname").eq(i).html(),
				"quantity":$(".quantity").eq(i).val(),
				"price":$(".price").eq(i).val(),
				"sumamount":$(".sumamount").eq(i).val(),
				"spec":$(".spec").eq(i).html(),
				"type":$(".type").eq(i).html(),
				"unitname":$(".unitname").eq(i).html(),
				"itemtype":$(".itemtype").eq(i).html(),
				"remark":$(".remark").eq(i).html(),
				"areacode":$(".areacode").eq(i).val(),
				"areaname":$(".areacode").eq(i).find("option:selected").html(),
				"operator":operator,"sdbill":sdbill,"sddate":sddate,"sdstatus":sdstatus,"statusname":statusname,
				"sdperson":sdperson,"sdpersonname":sdpersonname,"sdpersondept":sdpersondept,
				"sdpersondeptname":sdpersondeptname,"supplierno":supplierno,
				"suppliername":suppliername,"warecode":warecode,"warename":warename,
				"storage":$(".storage").eq(i).html()
		}*/
			var obj={
					"itemcode":$(".itemcode").eq(i).val(),
					"itemname":$(".itemname").eq(i).html(),
					"quantity":$(".quantity").eq(i).val(),
					"price":$(".price").eq(i).val(),
					"sumamount":$(".sumamount").eq(i).val(),
					"spec":$(".spec").eq(i).html(),
					"type":$(".type").eq(i).html(),
					"unitname":$(".unitname").eq(i).html(),
					"itemtype":$(".itemtype").eq(i).html(),
					"remark":$(".remark").eq(i).html(),
					"operator":operator,"sdbill":sdbill,"sddate":sddate,"sdstatus":sdstatus,"statusname":statusname,
					"sdperson":sdperson,"sdpersonname":sdpersonname,"sdpersondept":sdpersondept,
					"sdpersondeptname":sdpersondeptname,"warecode":warecode,"warename":warename,
					"storage":$(".storage").eq(i).html()
			}
		arr.push(obj);
		}
	}
	if(arr.length==0){
		layer.msg("请将信息填写完整，谢谢！",{time:2000})
		return;
	}
	console.log(arr)
	$.ajax({
		url:url+"/Product_SDData/outProductSDDataBatch",
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		traditional:true,//阻止深度序列化
		async:false,//默认是true 异步
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:2000});
				queryProduct_RK_CK_OrderNoByAuto();
				$(".itemcode").val("");
				$(".itemname").html("");
				$(".quantity").val("");
				$(".price").val("");
				$(".sumamount").val("");
				$(".spec").html("");
				$(".type").html("");
				$(".storage").html("");
				$(".unitname").html("");
				$(".itemtype").html("");
				$(".remark").html("");
				//$(".areacode option:selected").html("");
			}else{
				/*if(data.result==undefined){
					layer.msg(data.reason,{time:2000});
					return;
				}
				var html="";
				$.each(data.result,function(i,val){
					var itemname=(val.itemname==undefined?"":val.itemname);
					html+=itemname+",";
				})
				layer.msg(data.reason+html,{time:3000});*/
				layer.msg(data.reason,{time:3000});
			}
		}
	})
}//end

var index=5;
//点击追加一行
$("#addTab").click(function(){
	console.log("run");
	createTr(index);
	index++;
	//queryAreaCodeList();
});
function createTr(index){//创建表格行
	var $tr=$("<tr></tr>");
	var $td1=$("<td></td>");
	var $td2=$("<td><input type='text' name='itemcode' class='itemcode' autocomplete='off'></td>");
	var $td3=$("<td class='itemname'></td><td class='center storage'></td>");
	var $td4=$("<td><input type='text' name='quantity' class='quantity' autocomplete='off'></td>");
	var $td5=$("<td><input type='text' name='price' class='price' autocomplete='off'></td>");
	var $td6=$("<td><input type='text' name='sumamount' class='sumamount' autocomplete='off'></td>");
	var $td7=$("<td class='spec'></td>");
	var $td8=$("<td class='type'></td>");
	var $td9=$("<td class='unitname'></td>");
	var $td10=$("<td class='itemtype'></td>");
	var $td11=$("<td class='remark'></td>");
	//var $td12=$("<td><select class='areacode' name='areacode'><option value=''>请选择</option></select></td>");
	//var $td13=$("<td><a class='layui-btn layui-btn-danger layui-btn-xs'>删除</a></td>")
	$td1.append(index+1);
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
	//$tr.append($td12);
	//$tr.append($td13)
	$("#cont").append($tr);
}


//查询录入人 即登录用户
function queryOperatorPerson(){
	var html="<option value='"+window.top.holderno+"'>"+window.top.holdername+"</option>";
	$("#operator").append(html);
	$(".caozuo").html(window.top.holdername);
}//end


//查询仓库列表
function queryWareCodeList(){
	 $.ajax({
	  url:url+"/WareHouseData/queryWareHouseList",
	  type:"POST",
	  data:{"str":window.top.holderno},
	  dataType:"json",
	  //contentType:"application/json",
	  success:function(data){
	   $("#warecode").find("option:not(:first)").remove();//出入库的仓库下拉框
	   if(!data.flag){
		   return;
	   }
	    var html="";
	    $.each(data.result,function(i,val){
	     var warecode=(val.warecode==undefined?"":val.warecode);
	     var warename=(val.warename==undefined?"":val.warename);
	     html+="<option value='"+warecode+"'>"+warename+"</option>";
	    })
	    $("#warecode").append(html);
	  }
	 })
}//end

/*//根据人员部门查询人员
$(document).on("change","#sdpersondept",function(){
	queryHolderListByDeptno();
})*/
//查询人员列表
function queryHolderListByDeptno(){
	var sdpersondept=$("#departmentno").val();
	var obj={"departmentno":sdpersondept};
 $.ajax({
  url:url+"/Product_SDData/queryHolderListByDeptno",
  type:"POST",
  data:obj,
  dataType:"json",
  success:function(data){
   $("#sdperson").find("option:not(:first)").remove();
   if(!data.flag){ 
     return;
   }
   var html="";
   $.each(data.result,function(i,val){
    var holderno=(val.holderno==undefined?"":val.holderno);
    var holdername=(val.holdername==undefined?"":val.holdername);
    html+="<option value='"+holderno+"'>"+holdername+"</option>";
   })
   $("#sdperson").append(html);
  }
 })
}//end

//区域下拉树初始化
function getDeptTree(){
	$.ajax({
		//url:url+"/DepartmentData/getDeptTree",
		//url:url+"/DepartmentData/getMyDeptTree",
		url:url+"/ACL_Roles/getDeptTreeByMyRole",
		type:"POST",//类型
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node.data.id)
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			            queryHolderListByDeptno();
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


/*//根据入库页面中的仓库编码获得数据
$(document).on("change","#warecode",function(){
	queryAreaCodeList();
});
//查询仓库区域列表
function queryAreaCodeList(){
	var warecode=$("#warecode").val();
	 $.ajax({
	  url:url+"/WareHouse_AreaData/queryAreaCodeListByWareCode",
	  type:"POST",
	  data:{"warecode":warecode},
	  dataType:"json",
	  success:function(data){
	     $(".areacode").find("option:not(:first)").remove();
	     if(!data.flag){
	    	 return;
	     }
	        var html="";
	        $.each(data.result,function(i,val){
	           var areacode=(val.areacode==undefined?"":val.areacode);
	           var areaname=(val.areaname==undefined?"":val.areaname);
	           html+="<option value='"+areacode+"'>"+areaname+"</option>";
	        })
	        for(var k=0;k<$(".areacode").length;k++){
	      	 $(".areacode").eq(k).append(html);
	        }
	    }
    })
}//end
*/
//根据入库页面中的物品编码获得数据,回车事件
$(".itemcode").bind("keypress",function(event){
	var itemcode=$(this).val();
	var warecode=$("#warecode").val();
    if(event.keyCode == "13")
    {
    	if(warecode==""){
    		layer.msg("请选择仓库!",{time:2000});
    		return;
    	}
    	queryProductSDStockByItemCodeAndWareCode(itemcode,warecode,this);
    }
});
//根据入库页面中的原材料条码查询数据
function queryProductSDStockByItemCodeAndWareCode(itemcode,warecode,that){
	$(that).parent().siblings().eq(1).html("");
	$(that).parent().siblings().eq(2).html("");
	$(that).parent().parent().children().find(".quantity").val("");
	$(that).parent().parent().children().find(".price").val("");
	$(that).parent().parent().children().find(".sumamount").val("");
	$(that).parent().siblings().eq(6).html("");
	$(that).parent().siblings().eq(7).html("");
	$(that).parent().siblings().eq(8).html("");
	$(that).parent().siblings().eq(9).html("");
	$(that).parent().siblings().eq(10).html("");
	var obj={"itemcode":itemcode,"warecode":warecode};
	console.log(obj)
	$.ajax({
		url:url+"/Product_SDData/queryProductSDStockByItemCodeAndWareCode",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				$(that).val("");
				return;
			}
			$(that).parent().siblings().eq(1).html(data.result[0].itemname);
			$(that).parent().siblings().eq(2).html(data.result[0].storage);
			$(that).parent().parent().children().find(".quantity").val(data.result[0].storage);
			$(that).parent().parent().children().find(".price").val(data.result[0].price);
			$(that).parent().parent().children().find(".sumamount").val(data.result[0].summoney);
			$(that).parent().siblings().eq(6).html(data.result[0].spec);
			$(that).parent().siblings().eq(7).html(data.result[0].type);
			$(that).parent().siblings().eq(8).html(data.result[0].unitname);
			$(that).parent().siblings().eq(9).html(data.result[0].itemtype);
			$(that).parent().siblings().eq(10).html(data.result[0].remark);
		},
		error:function(res){
			console.log("error")
		}
	})
}//end


$("#readM1Card").click(function(){
	readM1Card();
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
						alert("版本号："+msgJson.errMsg)
					break;
						
					case "EST_Reader_ReadIDCard#":
						if (msgJson.rCode == "0") {
							console.log(msgJson)
							document.getElementById("holdername").value = msgJson.name;  //姓名  
							$("#sexname option[value="+msgJson.sex+"]").attr("selected","selected");//性别
							$("#nationname option[value="+msgJson.nation+"族]").attr("selected","selected");//民族
							//document.getElementById("text_birthday").value = msgJson.birth; //出生日期                  
							document.getElementById("superiorno2").value = msgJson.address; //住址  
							document.getElementById("idcode").value = msgJson.certNo; //身份证号码      
							document.getElementById("nativeplace").value = msgJson.department;  //签发机关    
							document.getElementById("avatarPreview").src = "data:image/jpeg;base64,"+msgJson.base64Data;  //身份证头像，base64格式数据
							posBeep();
							//ReadCertID()
						}
						else if(msgJson.rCode == "-2"){
							alert("请放身份证")
						}
						else {
							alert(msgJson.errMsg);
						}
						break;

					case "EST_ReadCertID#":
						if (msgJson.rCode == "0") {
							document.getElementById("holdercard").value = msgJson.UID;  
						}
						else {
							alert(msgJson.errMsg)
						}
					break;
					
					case "EST_ReadBankCard#":
						if (msgJson.rCode == "0") {
							document.getElementById("text_Bank_ID").value = msgJson.bankCard;
							posBeep();
						}
						else {
							alert(msgJson.errMsg);
						}
						break;

					case "EST_ReadM1Card#":
						if (msgJson.rCode == "0") {
							console.log(msgJson)
							//document.getElementById("holdercard").value = msgJson.UID; //IC卡卡号
							$.ajax({
								url:url+"/HolderData/queryHolderDataByHolderCard",
								type:"post",
								data:{"holdercard":msgJson.UID},
								success:function(data){
									console.log(data)
									if(data.flag){
										var deptno=data.result.departmentno;
										var holderno=data.result.holderno;
										$("#sdpersondept option[value='"+deptno+"']").attr("selected","selected");
										$("#sdperson option[value='"+holderno+"']").attr("selected","selected")
									}
								}
							})
							posBeep();
						}
						else {
							alert(msgJson.errMsg);
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
							alert(msgJson.errMsg);
						}
						break;

					case "EST_IDRequest#":
							if (msgJson.rCode == "0") {
								alert("找到身份证")
							}
							else {
								alert(msgJson.errMsg);
							}
					break;

					default:
						break;
				}
			}
			else{
				alert("连接异常,请检查是否成功安装控件.");
			}
		};
	}
	catch (ex) {
		alert("连接异常,请检查是否成功安装控件.");
	}
}

//读取IC卡号，包括M1、CPU卡，8位16进制数据
function readM1Card() {
	try { 
		if (socket.readyState == 1) {
			socket.send("EST_ReadM1Card#");  
		}
		else {
			alert("未找到控件，请检查控件是否安装.");
		}
	}
	catch (ex) {
		alert("连接异常,请检查是否成功安装控件.");
	}
}


//读取身份证物理ID，16位8进制数据，一般情况用不到，可以注释掉
function ReadCertID() {
	try { 
		if (socket.readyState == 1) {
			socket.send("EST_ReadCertID#"); 
		}
		else {
			alert("未找到控件，请检查控件是否安装.");
		}
	}
	catch (ex) {
		alert("连接异常,请检查是否成功安装控件.");
	}
}



//蜂鸣器控制，可以自己选择是否蜂鸣
function posBeep() {
	if (socket.readyState == 1) {
			socket.send("EST_PosBeep#");
		}
		else {
			alert("未找到控件，请检查控件是否安装.");
		}
}//end


//读取身份证信息
function readIDCard() {
	try {
		if (socket.readyState == 1) {
			socket.send("EST_Reader_ReadIDCard#");    
		}
		else {
			alert("未找到控件，请检查控件是否安装.");
		}
	}
	catch (ex) {
		alert("连接异常,请检查是否成功安装控件.");
	}
}//end
