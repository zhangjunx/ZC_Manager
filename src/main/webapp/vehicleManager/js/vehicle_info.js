$(function(){
	getDeptTree();
	//查询车辆信息
	queryVehicleByWheres();
	getPage();	
})	
var page;
var limit;
var total;
function getPage(){//分页
		layui.use("laypage", function () {
		var laypage = layui.laypage;
        laypage.render({
            elem: "test",
            count: total, //数据总数，从服务端得到
            limit: limit,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            jump: function (obj, first) {
                page=obj.curr; //obj包含了当前分页的所有参数
                limit=obj.limit;
                if (!first) {
                	queryVehicleByWheres();
                }
            }
        })
	})
}//end

	//点击搜索
	$("#queryCarInfo").click(function(){
		queryVehicleByWheres();
		getPage();
	})
	//查询车辆信息
	function queryVehicleByWheres(){
		var carOwnerName=$("#deptID").val();
		var carOwnerNo=$("#carOwnerNo").val();
		var carnumber=$("#carNumber").val();
		var obj={"holderno":carOwnerNo,"useunitno":carOwnerName,"strplateid":carnumber,"pageIndex":page,"pageSize":limit};
		console.log(obj)	
		$.ajax({
			url:url+"/LPR_Vehicle/queryVehicleByWheresByPage",
			type:"POST",
			data:obj,
			dataType:"json",
			async:false,
			success:function(data){
				$("#cont").empty();
				console.log(data)
				if(!data.flag){
					layer.msg(data.reason,{time:2000});
					total=0;
					return;
				}
				page=data.pageinfo.pageIndex;
				limit=data.pageinfo.pageSize;
				total=data.pageinfo.sumCount;
				var html="";
				$.each(data.result,function(i,val){
					var id=(val.id==undefined?"":val.id);
					var vehicleuse=(val.vehicleuse==undefined?"":val.vehicleuse);
					var userunit=(val.userunit==undefined?"":val.userunit);
					var vehicletype=(val.vehicletype==undefined?"":val.vehicletype);
					var strplateid=(val.strplateid==undefined?"":val.strplateid);
					var lprtype=(val.lprtype==undefined?"":val.lprtype);
					var startdate=(val.startdate==undefined?"":val.startdate);
					var enddate=(val.enddate==undefined?"":val.enddate);
					var vehiclecolor=(val.vehiclecolor==undefined?"":val.vehiclecolor);
					var vehiclebrand=(val.vehiclebrand==undefined?"":val.vehiclebrand);
					var status=(val.status==undefined?"":val.status);
					if(status=='1'){
						status="<a href='javascript:;' data-id='"+id+"' data-status='"+status+"' class='use'>停用</a>";
					}else{
						status="<a href='javascript:;' data-id='"+id+"' data-status='"+status+"' class='use'>启用</a>";
					}
					html+="<tr><td class='no-print'><span class='checkbox' data-id='"+id+"' " +
							"style='float:none'></span></td><td>"+(i+1)+"</td><td>"+vehicleuse
							+"</td><td>"+userunit+"</td><td>"+vehicletype+"</td><td>"+strplateid+"</td><td>"+lprtype
							+"</td><td>"+startdate+"</td><td>"+enddate+"</td><td>"+vehiclecolor
							+"</td><td>"+vehiclebrand+"</td><td>"+status+"</td><td class='no-print'>" 
						+"<a href='vehicle_update.html' data-id='"+id+"' class='mo layui-btn layui-btn-xs'>修改</a>" 
						+"<a href='javascript:;' data-id='"+id+"' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>" 
						+"<a href='javascript:;' data-strplateid='"+strplateid+"' data-id='"+id+"' class='layui-btn layui-btn-xs permission-config'>权限设置</a></td></tr>";
				})
				$("#cont").append(html);
				//var res=data.result;
				//createCarInfo(res);
			}
		})	
	}//end
	
	//点击表格中的状态 设置启用/停用
	$(document).on("click",".use",function(){
		var id=$(this).attr("data-id");
		var status=$(this).attr("data-status");
		layer.confirm("确定修改?",{title:"提示信息"},function(index){
			layer.close(index);
			if(status=="1"){
				status="0";
			}else{
				status="1";
			}
			
			var obj={"status":status,"id":id};
			console.log(obj);
			$.ajax({
				url:url+"/LPR_Vehicle/updateVehicleStatus",
				type:"POST",
				data:obj,
				dataType:"json",
				success:function(data){
					console.log(data);
					if(!data.flag){
						layer.msg(data.reason,{time:2000});
						return;
					}
					window.location.reload();
				}
			})
		})
	})//end
	
	/**
	 * 导出Excel
	 */
	$("#export").click(function(){
		layer.confirm("选择导出数据",{
			title:"提示信息",
			btn:["导出当前数据","导出全部数据"],
			yes:function(index,layero){
				$(".no-print").remove();
			    var table1 = document.querySelector("#dayindaju1");
			    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
			    openDownloadDialog(sheet2blob(sheet),'车辆信息.xlsx');
			    window.location.reload();
			},
			btn2:function(index,layero){
				var index=layer.load(2);
				$.ajax({
					url:url+"/LPR_Vehicle/queryVehicleByWheres",
					type:"post",
					success:function(data){
						console.log(data);
						layer.close(index);
						if(data.flag){
							var res=data.result;
							var $table = $("<table id='tableData' style='display:none'><tr><td>序号</td><td>车主姓名</td><td>部门</td><td>车辆类型</td><td>车牌号码</td>" +
									     "<td>车牌类型</td><td>有效期开始日期</td><td>有效期截止日期</td><td>车身颜色</td><td>车辆品牌</td><td>状态</td></tr></table>");
						      //循环遍历，每行加入tr标签，每个单元格加td标签
							var i=0;
						      for(var item of res){
						    	  var vehicleuse=item.vehicleuse==undefined?"":item.vehicleuse;
						    	  var userunit=item.userunit==undefined?"":item.userunit;
						    	  var vehicletype=item.vehicletype==undefined?"":item.vehicletype;
						    	  var strplateid=item.strplateid==undefined?"":item.strplateid;
						    	  var lprtype=item.lprtype==undefined?"":item.lprtype;
						    	  var startdate=item.startdate==undefined?"":item.startdate;
						    	  var enddate=item.enddate==undefined?"":item.enddate;
						    	  var vehiclecolor=item.vehiclecolor==undefined?"":item.vehiclecolor;
						    	  var vehiclebrand=item.vehiclebrand==undefined?"":item.vehiclebrand;
						    	  var status=item.status==undefined?"":item.status;
						    	  if(status=="1"){
						    		  status="停用";
						    	  }else{
						    		  status="启用";
						    	  }
						    	  var $tr=$("<tr><td>"+(i+1)+"</td><td>"+vehicleuse+"</td><td>"+userunit+"</td><td>"+vehicletype+"</td>" +
						    	  		"<td>"+strplateid+"</td><td>"+lprtype+"</td><td>"+startdate+"</td><td>"+enddate+"</td>" +
						    	  		"<td>"+vehiclecolor+"</td><td>"+vehiclebrand+"</td><td>"+status+"</td></tr>");
						    	  $table.append($tr);
						    	  i++;
						      }
						      $("body").append($table);
						      var table = document.querySelector("#tableData");
						      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
						      openDownloadDialog(sheet2blob(sheet),'车辆信息.xlsx');
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
	 

	//点击全选复选框
	$("#selectAll").click(function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			$("#cont .checkbox").removeClass("curr");
		}else{
			$(this).addClass("curr");
			$("#cont .checkbox").addClass("curr");
		}
	})
	//点击复选框
	$(document).on("click","#cont .checkbox",function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
		}else{
			$(this).addClass("curr");
		}
		if($("#cont .curr").length==$("#cont .checkbox").length){
			$("#selectAll").addClass("curr");
		}else{
			$("#selectAll").removeClass("curr");
		}
	})
	
/*	 
	//点击权限配置
	$(document).on("click",".permission-config",function(){
		$(".holder_add").fadeIn(500);
		$(".holder_box").fadeIn(500);
		var strplateid=$(this).attr("data-strplateid");
		var vehicleid=$(this).attr("data-id");
		$(".bottom_sure").attr("data-strplateid",strplateid);
		$(".bottom_sure").attr("data-id",vehicleid);
		$.ajax({
			url:url+"/DeviceUnit/queryLPRDeviceList",
			type:"POST",
			success:function(data){
				$(".door_center ul").empty();
				console.log(data);
				if(!data.flag){
					layer.msg(data.reason,{time:2000});
					return;
				}
				var html="";
				$.each(data.result,function(i,val){
					var deviceno=(val.deviceno==undefined?"":val.deviceno);
					var devicename=(val.devicename==undefined?"":val.devicename);
					html+="<li><span class='checkbox' name='"+deviceno+"'>"+devicename+"</span></li>";
				})
				$(".door_center ul").append(html);
			}
		})
	})*/
		 
	//点击权限配置
	$(document).on("click",".permission-config",function(){
		$(".holder_add").fadeIn(500);
		$(".holder_box").fadeIn(500);
		var strplateid=$(this).attr("data-strplateid");
		var vehicleid=$(this).attr("data-id");
		$(".bottom_sure").attr("data-strplateid",strplateid);
		$(".bottom_sure").attr("data-id",vehicleid);
		$.ajax({
			url:url+"/LPR_VehicleDevice/queryLPRDeviceListByVehicleid",
			type:"POST",
			data:{"vehicleid":vehicleid},
			dataType:"json",
			success:function(data){
				console.log(data);
				$(".door_center ul").empty();
				if(!data.flag){
					layer.msg(data.reason,{time:2000});
					return;
				}
				$.each(data.result,function(i,val){
					var deviceno=(val.deviceno==undefined?"":val.deviceno);
					var devicename=(val.devicename==undefined?"":val.devicename);
					var deviceno1=(val.deviceno1==undefined?"":val.deviceno1);
					var html="<li><span class='checkbox' name='"+deviceno+"' id='deviceno"+deviceno+"' >"+devicename+"</span></li>";
					$(".door_center ul").append(html);
					/*if(deviceno1.length>0){
					  //$(".door_center ul li span").addClass("curr");
				    }*/
				})
				var res=data.result;
				for(var item of res){
					$("#deviceno"+item.deviceno1).addClass("curr");
				}
				 
			}
		})
	})
	//点击弹出框的叉
	$(".quxiao").click(function(){
		$(".holder_add").fadeOut(500);
		$(".holder_box").fadeOut(500);
	})
	//点击弹出框的取消
	$(".bottom_qx").click(function(){
		$(".holder_add").fadeOut(500);
		$(".holder_box").fadeOut(500);
	})
	//点击弹出框的确定
	$(".bottom_sure").click(function(){
		var strplateid=$(this).attr("data-strplateid");
		var vehicleid=$(this).attr("data-id");
		var arr=[];
		for(var i=0;i<$(".door_center .curr").length;i++){
			var devicename=$(".door_center .curr").eq(i).html();
			var deviceno=$(".door_center .curr").eq(i).attr("name");
			var obj={"devicename":devicename,"deviceno":deviceno,"vehicleid":vehicleid}
			console.log(obj);
			arr.push(obj);
		}
		if(arr.length==0){
			layer.msg("请先选择出入位置！",{time:2000})
			return;
		}
		console.log(JSON.stringify(arr));
		$.ajax({
			url:url+"/LPR_VehicleDevice/insertVehicleDeviceBatch",
			type:"POST",
			data:JSON.stringify(arr),
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				console.log(data);
				layer.msg(data.reason,{time:2000});
				if(data.flag){
					$(".holder_add").fadeOut(500);
					$(".holder_box").fadeOut(500);
				}
			}
		})
	})
	//点击弹出框全选
	$(".door_top .checkbox").click(function(){
		if($(this).hasClass("cur")){
			$(this).removeClass("cur");
			$(".door_center .checkbox").removeClass("curr");
		}else{
			$(this).addClass("cur");
			$(".door_center .checkbox").addClass("curr");
		}
	})
	//点击弹出框中的复选框
	$(document).on("click",".door_center .checkbox",function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
		}else{
			$(this).addClass("curr");
		}
		
		if($(".door_center .checkbox").length==$(".door_center .curr").length){
			$(".door_top .checkbox").addClass("cur");
		}else{
			$(".door_top .checkbox").removeClass("cur");
		}
	})
	
	//点击删除
	$(document).on("click",".shan",function(){
		var id=$(this).attr("data-id");
		console.log(id)
	    layer.confirm("确定删除?",{title:"提示"},function(index){
			layer.close(index);
			$.ajax({
				url:url+"/LPR_Vehicle/deleteVehicle",
				type:"POST",
				data:{"id":id},
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
	})
	
	//批量删除
	$("#del").click(function(){
		var arr=[];
		for(var i=0;i<$("#cont .curr").length;i++){
			var id=$("#cont .curr").eq(i).attr("data-id");
			arr.push(id);
		}
		console.log(arr);
		if(arr.length==0){
			return;
		}
		layer.confirm("确定删除?",{title:"提示"},function(index){
			layer.close(index);
			$.ajax({
				url:url+"/LPR_Vehicle/deleteVehicles",
				type:"POST",
				data:{"ids":arr},
				dataType:"json",
				traditional:true,
				success:function(data){
					console.log(data)
					if(data.flag){
						window.location.reload();
					}else{
						layer.msg(data.reason,{time:2000})
					}
				}
			})	
		  })
	})//end
	
	//点击修改
	$(document).on("click",".mo",function(){
		var id=$(this).attr("data-id");
		localStorage.id=id;
	})

//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		data:{"res":"false"},
		dataType:'json',//数据类型
		//contentType:"application/json",
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#deptID").val(node.data.id);
			        	$("#deptName").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			            queryHolderDataListByDepartmentNo(node.data.id);
			        }
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			});
		
		},
		error:function(data){}
	})
}
	
	//根据部门查询人员
	function queryHolderDataListByDepartmentNo(deptno){
		$.ajax({
			url:url+'/HolderData/queryHolderDataListByDepartmentNo',
			type:"post",
			data:{"departmentno":deptno},
			success:function(data){
				console.log(data);
				 $("#carOwnerNo").find("option:not(:first)").remove();
				if(data.flag){
					var res=data.result;
					for(var item of res){
						var $opt=$("<option value='"+item.holderno+"'></option>")
						$opt.append(item.holdername);
						$("#carOwnerNo").append($opt);
					}
				}
			}
		})
	}
