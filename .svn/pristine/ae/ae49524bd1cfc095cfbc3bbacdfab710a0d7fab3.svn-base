$(function(){
	showHide();//跟权限有关
	//查询部门
	getDeptTree();
	//查询班次信息
	queryshiftdata();
	
	layui.use('form', function(){
		  var form = layui.form;
		});
	
	
	//查询当前月份的所有人员和班次
	 var date = new Date();
	 var yue = date.getMonth()+1;//月份
	 if(yue<10){
		 yue="0"+yue;
	 }
	selectArrange("",yue,"","");
	
	var page=1;//当前页
	var limit=10;//每页显示条数
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
					pagination(1,10,total);
					if(!first){
						pagination(page,limit,total);
					}
				}
			})
		})
	}//end
	
	//跟权限有关
	function showHide(){
		var arrList=window.top.arr;
		if(window.top.arr.length==0){
			return;
		}
		$("#import").hide();
		$("#daochu").hide();
		$("#print").hide();
		$("#shiftsAuto").hide();
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="8003"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="print"){
				$("#print").show();
			}
			if(item.Code=="import"){
				$("#import").show();
			}
			if(item.Code=="export"){
				$("#daochu").show();
			}
			if(item.Code=="update"){
				$("#shiftsAuto").show();
			}
		}
	}//end
	
	//点击自动排班
	$("#shiftsAuto").click(function(){
		layer.confirm("确定排班？",{title:"提示信息"},function(index1){
			layer.close(index1);
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
			var month=$(".month").val();
			var year=$(".year").val();
			 if(month<10){
					month="0"+month;
				}
				var departmentno=$("#deptID").val();
				var holderno=$("#idcode1").val();
			$.ajax({
				url:url+"/KQ_Arrange/insertAutomaticShift",
				type:"post",
				data:{
					"yearno":year,
					"monthno":month,
					"departmentno":departmentno,
					"holderno":holderno
				},
				success:function(data){
					layer.close(index);
					if(data.flag){
						layer.msg(data.reason,{time:2000},function(){
							$("#queryInformation").click();
						})
					}else{
						layer.msg(data.reason,{time:2000});
					}
				},
				error:function(){
					layer.close(index);
				}
			})
		})
	})
	
	//点击搜索
	$("#queryInformation").click(function(){
		 var month=$(".month").val();
		 var year=$(".year").val();
		if(month<10){
			month="0"+month;
		}
		var departmentno=$("#deptID").val();
		var holderno=$("#idcode1").val();
		selectArrange(year,month,departmentno,holderno);
	})
	
	//查询当前月份的所有人员和班次
	var currentDay;
	var currentMonth;
	var systemYear;
	function selectArrange(year,month,departmentno,holderno){
		 var curDate = new Date(year,month,0);
		 curDate=curDate.getDate();
		 getEvryDay(curDate);
		$.ajax({
			url:url+'/KQ_Arrange/selectArrange',
			type:"post",
			data:{
					"yearno":year,
					"monthno":month,
					"departmentno":departmentno,
					"holderno":holderno
			},
			async:false,
			success:function(data){
				var res=data.result;
				var systemTime=data.systime.split("-");
				systemYear=systemTime[0];
				currentDay=systemTime[2];
				currentMonth=systemTime[1];
				$("#cont1").empty();
				if(data.flag){
					$(".dayue").html(month);
					for(var item of res){
						var $tr=$("<tr></tr>");
						var $td=$("<td></td>");
						$td.append(item.holdername+"<br>"+item.holderno)
						$tr.append($td);
						var dateLength=$(".da_date").children();
						for(var i=1;i<dateLength.length;i++){
							if(i<10){
								i="0"+i;
							}
							var $td=$("<td id="+item.holderno+i+" data-day="+i+" data-holderno="+item.holderno+" class='cellTd' style='background:#ccc'>休</td>");
							$tr.append($td);
						}
						$("#cont1").append($tr);
					}
					for(var item of res){
						for(var current of item.child){
						$("#"+current.holderno+current.day).html(current.nickname);
						if(current.codeno=="01"){
							$("#"+current.holderno+current.day).css("background","#F5222D");
						}else if(current.codeno=="02"){
							$("#"+current.holderno+current.day).css("background","#FA541C");
						}else if(current.codeno=="03"){
							$("#"+current.holderno+current.day).css("background","#722ED1");
						}else if(current.codeno=="04"){
							$("#"+current.holderno+current.day).css("background","#52C41A");
						}else if(current.codeno=="05"){
							$("#"+current.holderno+current.day).css("background","#1890FF");
						}else if(current.codeno=="06"){
							$("#"+current.holderno+current.day).css("background","#FA8C16");
						}else if(current.codeno=="07"){
							$("#"+current.holderno+current.day).css("background","#FAAD14");
						}else if(current.codeno=="08"){
							$("#"+current.holderno+current.day).css("background","#A0D911");
						}else if(current.codeno=="09"){
							$("#"+current.holderno+current.day).css("background","#13C2C2");
						}else if(current.codeno=="10"){
							$("#"+current.holderno+current.day).css("background","#FADB14");
						}
						if(current.shiftno==-1){
							$("#"+current.holderno+current.day).html("异常").css("background","#000").css("color","#fff");
						}
					}
				}
					var total=res.length;
					getPage(total);
				}else{
					$(".dayue").html(month);
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	}
	systemYearTime();//给年份下拉框赋值
	//给年份下拉框赋值
	function systemYearTime(){
		var yearPrev=systemYear-1;
		var yearNext=parseInt(systemYear)+1;
		var $opt1=$("<option value='"+systemYear+"'></option>");
		var $opt2=$("<option value='"+yearPrev+"'></option>");
		var $opt3=$("<option value='"+yearNext+"'></option>");
		$opt1.append(systemYear+"年");
		$opt2.append(yearPrev+"年");
		$opt3.append(yearNext+"年");
		$(".year").append($opt1);
		$(".year").append($opt2);
		$(".year").append($opt3);
		$(".year option[value='"+systemYear+"']").attr("selected","selected");
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
	
	
	//查询班次信息
	function queryshiftdata(){
		var obj={"holderno":window.top.holderno};
		$.ajax({
			url:url+'/KQ_Arrange/queryshiftdata',
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				var res=data.result;
				if(data.flag){
					for(var item of res){
						//给弹出框赋值
						var $dt = $("<dt class='cellDt' data-codeno='"+item.codeno+"'></dt>");
						$dt.append(item.nickname);
						$dt.attr("data-shiftno",item.shiftno);
						if(item.codeno=="01"){
							$dt.css("background","#F5222D");
						}else if(item.codeno=="02"){
							$dt.css("background","#FA541C");
						}else if(item.codeno=="03"){
							$dt.css("background","#722ED1");
						}else if(item.codeno=="04"){
							$dt.css("background","#52C41A");
						}else if(item.codeno=="05"){
							$dt.css("background","#1890FF");
						}else if(item.codeno=="06"){
							$dt.css("background","#FA8C16");
						}else if(item.codeno=="07"){
							$dt.css("background","#FAAD14");
						}else if(item.codeno=="08"){
							$dt.css("background","#A0D911");
						}else if(item.codeno=="09"){
							$dt.css("background","#13C2C2");
						}else if(item.codeno=="10"){
							$dt.css("background","#FADB14");
						}
						$(".hover").append($dt);
					}
				}
			},
			error:function(){
				console.log("error");
			}
		})
	}
	
	
	
	 //点击hover赋值
	var no;
	var holderno;
	var day;
	var txt;
    $(document).on("click",".hover .cellDt",function (){
    	var text=$(this).html();
    	var bg=$(this).css("background");
    	var shiftno=$(this).attr("data-shiftno");
    	 var monthno=$(".month").val();
		 var yearno=$(".year").val();
		 if(monthno<10 && monthno.length!=2){
			 monthno="0"+monthno;
		 }
		 if(day<10 && day.length!=2){
			 day="0"+day;
		 }
    	if(txt=="休"){
    		var joggle="/KQ_Arrange/insertArrange";
    	}else{
    		var joggle="/KQ_Arrange/updateArrange";
    	}
    	console.log(holderno,shiftno,yearno,monthno,day)
    	layer.confirm('确定修改?', {title:'提示'}, function(index){
    	    layer.close(index);
    	    $.ajax({
    	    	url:url+joggle,
    	    	type:"post",
    	    	data:{"holderno":holderno,"shiftno":shiftno,"yearno":yearno,"monthno":monthno,"day":day},
    	    	success:function(data){
    	    		if(data.flag){
    	    			$("#"+no).html(text);
    	            	$("#"+no).css("background",bg);
    	            	$("#"+no).attr("data-shiftno",shiftno);
    	            	$(".hover").hide();
    	    		}else{
    	    			layer.msg(data.reason,{time:2000});
    	    		}
    	    	}
    	    })
    	});
    })
     //点击hover随鼠标显示隐藏
    $(document).on("click", ".cellTd", function (e) {
    		no=$(this).attr("id");
    		day=$(this).attr("data-day");
        	holderno=$(this).attr("data-holderno");
        	txt=$(this).html();
        	$(".hover").css("position","absolute");
        	$(".hover").css("top",e.clientY+10+"px");
        	$(".hover").css("left",e.clientX-20+"px");
    		if ($(".hover").is(':hidden')) {
    			$(".hover").show();
    		} else {
    			$(".hover").hide();
            }
    })
	//给搜索框月份赋值
	var myDate = new Date(); 
	for(var i=1;i<=12;i++){
		var $opt=$("<option value='"+i+"'></option>");
		$opt.append(i+"月");
		$(".month").append($opt);
	}
	 var month = myDate.getMonth()+1;//月份
	 $(".month option[value='"+month+"']").attr("selected","selected");
	
	
	 //获取每月多少天数
    function getCountDays() {
	        var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var d = new Date(year, month, 0);
			return d.getDate();
	}
	var day=getCountDays();
	//获取日和周
	function getEvryDay(day){
		$(".da_date").empty();
		$(".da_week").empty();
		var myDate = new Date();             
	    var year=$(".year").val();//获取当前年
	    var month = $(".month").val();//月份
	    $(".dayue").html(month);
	    var $td2=$("<td rowspan='2'></td>")
	    $td2.append("姓名");
	    $(".da_date").append($td2);
		for (var k = 1; k <= day; k++) {
			var $td =$("<td width='100'></td>");
			$td.append(k);
			$(".da_date").append($td);
			var now=`${year}-${month}-${k}`
			var date=new Date(now);
			var week;
			if(date.getDay()==0) week="日"
		    if(date.getDay()==1) week="一"
			if(date.getDay()==2) week="二"
			if(date.getDay()==3) week="三"
			if(date.getDay()==4) week="四"
			if(date.getDay()==5) week="五"
			if(date.getDay()==6) week="六"
		    var $td1=$("<td width='100' data-no='"+k+"' class='week'></td>")
		    $td1.append(week);
			if(week=="六"||week=="日"){
				$td1.css("background","#eee");
			}
		    $(".da_week").append($td1);
		   }
		
		
		};
		//获取日和周
		getEvryDay(day);
		//分页
		function pagination(curr, limit, count) {
		    var dep = document.getElementById("cont1");
		    var departmentInfo = document.getElementsByTagName("table")
		    startRow = (curr - 1) * limit  //每页显示第一条数据的行数
		    lastRow = curr * limit //每页显示最后一条数据的行数
		    var totalRow = count
		    lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
		    for (var i = 0; i <totalRow; i++) { //遍历数据
		        var hrow = dep.rows[i]
		        if (i >= startRow && i < lastRow) {
		            hrow.style.display = ""
		        } else {
		            hrow.style.display = "none"
		        }
		    }
		}
		
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
		
})
function queryHolderDataListByDepartmentNo(deptno){
	var obj={"deptno":deptno};
	$.ajax({
		url:url+'/DepartmentData/getHolderByDept',
		type:"post",
		data:obj,
		//contentType:"application/json", // 指定这个协议很重要
	    dataType:'json',
		success:function(data){
			console.log(data)
			 $("#idcode1").find("option:not(:first)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value='"+item.holderno+"'></option>")
					$opt.append(item.holdername);
					$("#idcode1").append($opt);
				}
				layui.use('form', function(){
					  var form = layui.form;
					  form.render();
				});
			}
		}
	})
}

/**
 * 导出Excel
 */
$("#daochu").click(function(){
	layer.confirm("选择导出数据",{
		title:"提示信息",
		btn:["导出当前数据","导出全部数据"],
		yes:function(index,layero){
		    var table1 = document.querySelector("#dayindaju1");
		    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
		    openDownloadDialog(sheet2blob(sheet),'班次信息.xlsx');
		},
		btn2:function(index,layero){
			var index=layer.load(2);
			var month=$(".month").val();
			 var year=$(".year").val();
			 var curDate = new Date(year,month,0);
			 curDate=curDate.getDate();
			if(month<10){
				month="0"+month;
			}
			var departmentno=$("#deptID").val();
			var holderno=$("#idcode1").val();
			$.ajax({
				url:url+"/KQ_Arrange/selectArrange",
				type:"post",
				data:{
					"yearno":year,
					"monthno":month,
					"departmentno":departmentno,
					"holderno":holderno
				},
				success:function(data){
					layer.close(index);
					if(data.flag){
						var res=data.result;
						var $table =$("<table id='tableData' style='display:none'></table>");
						var $tr1=$("<tr class='da_date'></tr>");
						var $tr2=$("<tr class='da_week'></tr>");
					    var $td2=$("<td rowspan='2'></td>");
					    $table.append($tr1);
					    $table.append($tr2);
					    $td2.append("姓名");
					    $tr1.append($td2);
						for (var k = 1; k <= curDate; k++) {
							var $td =$("<td width='100'></td>");
							$td.append(k);
							$tr1.append($td);
							var now=`${year}-${month}-${k}`
							var date=new Date(now);
							var week;
							if(date.getDay()==0) week="日"
						    if(date.getDay()==1) week="一"
							if(date.getDay()==2) week="二"
							if(date.getDay()==3) week="三"
							if(date.getDay()==4) week="四"
							if(date.getDay()==5) week="五"
							if(date.getDay()==6) week="六"
						    var $td1=$("<td width='100' data-no='"+k+"' class='week'></td>")
						    $td1.append(week);
							if(week=="六"||week=="日"){
								$td1.css("background","#eee");
							}
						    $tr2.append($td1);
						   }
						for(var item of res){
							var $tr=$("<tr></tr>");
							var $td=$("<td></td>");
							$td.append(item.holdername+"<br>"+item.holderno)
							$tr.append($td);
							var dateLength=$tr1.children();
							for(var i=1;i<dateLength.length;i++){
								var $td=$("<td id="+item.holderno+i+" data-day="+i+" data-holderno="+item.holderno+" class='cellTd' style='background:#ccc'>休</td>");
								$tr.append($td);
							}
							$table.append($tr);
						}
						 $("body").append($table);
						for(var item of res){
							for(var current of item.child){
							$("#tableData #"+current.holderno+parseInt(current.day)).html(current.nickname);
							if(current.codeno=="01"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#F5222D");
							}else if(current.codeno=="02"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#FA541C");
							}else if(current.codeno=="03"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#722ED1");
							}else if(current.codeno=="04"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#52C41A");
							}else if(current.codeno=="05"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#1890FF");
							}else if(current.codeno=="06"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#FA8C16");
							}else if(current.codeno=="07"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#FAAD14");
							}else if(current.codeno=="08"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#A0D911");
							}else if(current.codeno=="09"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#13C2C2");
							}else if(current.codeno=="10"){
								$("#"+current.holderno+parseInt(current.day)).css("background","#FADB14");
							}
							if(current.shiftno==-1){
								$("#tableData #"+current.holderno+parseInt(current.day)).html("异常").css("background","#000").css("color","#fff");
							}
						}
					}
					      var table = document.querySelector("#tableData");
					      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
					      openDownloadDialog(sheet2blob(sheet),'班次信息.xlsx');
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



