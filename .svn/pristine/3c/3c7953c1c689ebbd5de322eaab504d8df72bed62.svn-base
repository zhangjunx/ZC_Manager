/**考勤报表查询*/
$(function(){
	showHide();//跟权限有关
	//查询部门
	getDeptTree();
	//查询考勤月报
	queryStatistics();
	
})

//点击搜索
$("#queryInformation").click(function(){
	queryStatistics();
})

//点击考勤分析
$("#dataAnalyse").click(function(){
	var year=$("#year").val();
	var month=$(".month").val();
	if(month<10){
		month="0"+month;
	}
	var dept=$("#deptID").val();
	var holderno=$("#idcode1").val();
	if(holderno==""){
		var obj={"yearno":year,"monthno":month,"departmentno":dept};
	}else{
		var obj={"yearno":year,"monthno":month,"departmentno":dept,"holderno":holderno};
	}
	layer.confirm("确定分析？",{title:"提示信息"},function(index){
		layer.close(index);
		var index=layer.load(2,{shade:[0.5,'#fff']});
		$.ajax({
			url:url+'/analy/AttendanceAnalysis',
			type:"post",
			data:obj,
			success:function(data){
				console.log(data);
				layer.close(index);
				layer.msg("请点击统计分析!");
			}
		})
	})
	
	
	
})

//跟权限有关
	function showHide(){
		var arrList=window.top.arr;
		if(window.top.arr.length==0){
			return;
		}
		$("#daochu").hide();
		$("#print").hide();
		$("#secondAnalyse").hide();
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="MyKQMonly"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="print"){
				$("#print").show();
			}
			if(item.Code=="export"){
				$("#daochu").show();
			}
			if(item.Code=="static"){
				$("#secondAnalyse").show();
			}
		}
	}//end
var page=1;//当前页
var limit=20;//每页显示条数
var total;
//分页
function getPage(total){
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
				pagination(1,20,total);
				if(!first){
					pagination(page,limit,total);
				}
			}
		})
	})
}//end

//点击统计分析
$("#secondAnalyse").click(function(){
	var year=$("#year").val();
	var month=$(".month").val();
	if(month<10){
		month="0"+month;
	}
	var dept=$("#deptID").val();
	var holderno=$("#idcode1").val();
	if(holderno==""){
		var obj={"yearno":year,"monthno":month,"departmentno":dept};
	}else{
		var obj={"yearno":year,"monthno":month,"departmentno":dept,"holderno":holderno};
	}
	layer.confirm("确定分析？",{title:"提示信息"},function(index){
		layer.close(index);
		var index = layer.load(2, { //icon支持传入0-2
		    shade: [0.5, '#fff'], //0.5透明度的灰色背景
		    content: '数据正在分析中，请稍等...',
		    success: function (layero) {
		        layero.find('.layui-layer-content').css({
		            'padding-top': '39px',
		            'width': '160px',
		            'background-position': '35% 0'
		        });
		    }
		});
		$.ajax({
			url:url+'/analy/Reanalysis',
			type:"post",
			data:obj,
			success:function(data){
				layer.close(index);
			}
		})
	})
})




//点击查看
$(document).on("click",".watch",function(){
	var holderno=$(this).parent().siblings().eq(1).attr("data-holderno");
	var year=$("#year").val();
	var month=$(".month").val();
	var normal=$(this).parent().siblings().eq(3).html();
	var rest=$(this).parent().siblings().eq(4).html();
	var delay=$(this).parent().siblings().eq(5).html();
	var early=$(this).parent().siblings().eq(6).html();
	var nowork=$(this).parent().siblings().eq(7).html();
	var holiday=$(this).parent().siblings().eq(8).html();
	var business=$(this).parent().siblings().eq(9).html();
	//console.log(holderno,year,month);
	//console.log(normal,rest,delay,early,nowork,holiday,business);
	localStorage.holderno=holderno;
	localStorage.year=year;
	localStorage.month=month;
	localStorage.normal=normal;
	localStorage.rest=rest;
	localStorage.delay=delay;
	localStorage.early=early;
	localStorage.nowork=nowork;
	localStorage.holiday=holiday;
	localStorage.business=business;
})


//给搜索框年份赋值
	var myDate = new Date(); 
    var year=myDate.getFullYear(); 
	for(var i=1;i<=12;i++){
		var $opt=$("<option value='"+i+"'></option>");
		$opt.append(i+"月");
		$(".month").append($opt);
	}
	 var month = myDate.getMonth()+1;//月份
	 $(".month option[value='"+month+"']").attr("selected","selected");
	 for(var m=0;m<2;m++){
		 var $opt=$("<option value='"+year+"'></option>");
		 $opt.append(year+"年");
		 year--;
		 $("#year").append($opt);
	 }


//查询考勤月报
function queryStatistics(){
	var year=$("#year").val();
	var month=$(".month").val();
	if(month<10){
		month="0"+month;
	}
	var dept=$("#deptID").val();
	var holderno=$("#idcode1").val();
	var obj={"yearno":year,"monthno":month,"departmentno":dept,"holderno":holderno};
	console.log(obj)
	$.ajax({
		url:url+'/KQ_MonthData/querySummary',
		type:"post",
		data:obj,
		success:function(data){
			console.log(data);
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="MyKQMonly"){
					list.push(item);
				}
			}
			$("#dayindaju1 tr:gt(0)").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $tr=$("<tr></tr>");
					var $td1=$("<td data-holderno='"+item.holderno+"'></td>");
					var $td2=$("<td></td>");
					var $td3=$("<td></td>");
					var $td4=$("<td></td>");
					var $td5=$("<td></td>");
					var $td6=$("<td></td>");
					var $td7=$("<td></td>");
					var $td8=$("<td></td>");
					var $td9=$("<td class='no-print'></td>");
					var $td10=$("<td>"+item.holderno+"</td>");
					var $td11=$("<td>"+item.departmentname+"</td>")
					var $a="";
					if(list.findIndex(target=>target.Code=="query")==-1&&window.top.arr.length!=0){
						$a="";
					  }else {
						  $a=$("<a href='attendance_monthly_details.html' class='layui-btn layui-btn-xs layui-btn-warm watch'>查看</a>");
					  }
					 $td9.append($a);
					
					$td9.append($a);
					$td2.html("0");
					$td3.html("0");
					$td4.html("0");
					$td5.html("0");
					$td6.html("0");
					$td7.html("0");
					$td8.html("0");
					
					for(var i=0;i<item.child.length;i++){
						if(item.child[i].status=="正常"){
							$td2.html(item.child[i].frequency);
						}else if(item.child[i].status=="休息"){
							$td3.html(item.child[i].frequency);
						}else if(item.child[i].status=="迟到"){
							$td4.html(item.child[i].frequency);
						}else if(item.child[i].status=="早退"){
							$td5.html(item.child[i].frequency);
						}else if(item.child[i].status=="旷工"){
							$td6.html(item.child[i].frequency);
						}else if(item.child[i].status=="请假"){
							$td7.html(item.child[i].frequency);
						}else if(item.child[i].status=="出差"){
							$td8.html(item.child[i].frequency);
						}
					}
					$td1.append(item.holdername);
					$tr.append($td10)
					$tr.append($td1);
					$tr.append($td11)
					$tr.append($td2);
					$tr.append($td3);
					$tr.append($td4);
					$tr.append($td5);
					$tr.append($td6);
					$tr.append($td7);
					$tr.append($td8);
					$tr.append($td9);
					$("#dayindaju1").append($tr);
				}
				$("tbody").attr("id","page")
				total=res.length;
				getPage(total);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//查询部门
function queryDepartmentData(){
	$.ajax({
		url:url+'/KQ_Arrange/queryDepartmentData',
		type:"post",
		success:function(data){
			console.log(data);
			var res=data.result;
			if(data.flag){
				for(var item of res){
					var $opt=$("<option value='"+item.id+"'></option>")
					$opt.append(item.title);
					$(".department").append($opt);
				}
			}else{
				layer.msg("查询部门失败!",{time:2000});
			}
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
    for (var i = 1; i < totalRow+1; i++) { //遍历数据
        var hrow = dep.rows[i]
        if (i >= startRow && i <= lastRow) {
            hrow.style.display = ""
        } else {
            hrow.style.display = "none"
        }
    }
}

/**
 * 导出全部数据Excel
 * 
 */
$("#export").click(function(){
	layer.confirm("选择导出数据",{
		title:"提示信息",
		btn:["导出当前数据","导出全部数据"],
		yes:function(index,layero){
			$(".no-print").remove();
		    var table1 = document.querySelector("#dayindaju1");
		    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
		    openDownloadDialog(sheet2blob(sheet),'考勤月报.xlsx');
		    window.location.reload();
		},
		btn2:function(index,layero){
			var year=$("#year").val();
			var month=$(".month").val();
			if(month<10){
				month="0"+month;
			}
			var obj={"yearno":year,"monthno":month};
			var index=layer.load(2);
			$.ajax({
				url:url+"/KQ_MonthData/querySummary",
				type:"post",
				data:obj,
				success:function(data){
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table = $("<table id='tableData' style='display:none'><tr><td>工号</td><td>姓名</td><td>部门</td><td>正常(天)</td>" +
								"<td>休息(天)</td><td>迟到(天)</td><td>早退(天)</td><td>旷工(天)</td><td>请假(天)</td><td>出差(天)</td></tr></table>");
							for(var item of res){
								var $tr=$("<tr></tr>");
								var $td1=$("<td data-holderno='"+item.holderno+"'></td>");
								var $td2=$("<td></td>");
								var $td3=$("<td></td>");
								var $td4=$("<td></td>");
								var $td5=$("<td></td>");
								var $td6=$("<td></td>");
								var $td7=$("<td></td>");
								var $td8=$("<td></td>");
								var $td10=$("<td>"+item.holderno+"</td>");
								var $td11=$("<td>"+item.departmentname+"</td>")
								$td2.html("0");
								$td3.html("0");
								$td4.html("0");
								$td5.html("0");
								$td6.html("0");
								$td7.html("0");
								$td8.html("0");
								
								for(var i=0;i<item.child.length;i++){
									if(item.child[i].status=="正常"){
										$td2.html(item.child[i].frequency);
									}else if(item.child[i].status=="休息"){
										$td3.html(item.child[i].frequency);
									}else if(item.child[i].status=="迟到"){
										$td4.html(item.child[i].frequency);
									}else if(item.child[i].status=="早退"){
										$td5.html(item.child[i].frequency);
									}else if(item.child[i].status=="旷工"){
										$td6.html(item.child[i].frequency);
									}else if(item.child[i].status=="请假"){
										$td7.html(item.child[i].frequency);
									}else if(item.child[i].status=="出差"){
										$td8.html(item.child[i].frequency);
									}
								}
								$td1.append(item.holdername);
								$tr.append($td10)
								$tr.append($td1);
								$tr.append($td11)
								$tr.append($td2);
								$tr.append($td3);
								$tr.append($td4);
								$tr.append($td5);
								$tr.append($td6);
								$tr.append($td7);
								$tr.append($td8);
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


//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		dataType:'json',//数据类型
		data:{"res":"false"},
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
function queryHolderDataListByDepartmentNo(deptno){
	var obj={"departmentno":deptno};
	$.ajax({
		url:url+'/HolderData/queryHolderDataListByDepartmentNo',
		type:"post",
		data:obj,
		//contentType:"application/json", // 指定这个协议很重要
	    dataType:'json',
		success:function(data){
			console.log(data);
			 $("#idcode1").find("option:not(:first)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value='"+item.holderno+"'></option>")
					$opt.append(item.holdername);
					$("#idcode1").append($opt);
				}
			}
		}
	})
}