$(function(){
	showHide();//跟权限有关
	//查询部门
	getDeptTree();
	//查询班次信息
	queryshiftdata();
	
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
		$("#print").hide();
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="MyBanbiao"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="print"){
				$("#print").show();
			}
		}
	}//end
	
	//点击搜索
	$("#queryInformation").click(function(){
		$(".da_date").empty();
		$(".da_week").empty();
		 var month=$(".month").val();
		 var year=$(".year").val();
		 var curDate = new Date(year,month,0);
		 curDate=curDate.getDate();
		 getEvryDay(curDate);
		if(month<10){
			month="0"+month;
		}
		var departmentno=$("#deptID").val();
		var holdername=$("#idcode1").val();
		//console.log(year,month,departmentno,holdername);
		selectArrange(year,month,departmentno,holdername);
	})
	
	//查询当前月份的所有人员和班次
	var currentDay;
	var currentMonth;
	var systemYear;
	function selectArrange(year,month,departmentno,holdername){
		$.ajax({
			url:url+'/KQ_Arrange/selectArrange',
			type:"post",
			data:{
					"yearno":year,
					"monthno":month,
					"departmentno":departmentno,
					"holdername":holdername
			},
			async:false,
			success:function(data){
				console.log(data);
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
						$td.append(item.holdername)
						$tr.append($td);
						for(var current of item.child){
							var $td1=$("<td class='cell' id='cell"+current.holderno+current.datano+"' data-datano='"+current.datano+"'></td>");
							if(current.nickname==undefined){
								$td1.append("休");
							}else{
								$td1.append(current.nickname);
							}
							
							
							if(current.codeno=="01"){
								$td1.css("background","#F5222D");
							}else if(current.codeno=="02"){
								$td1.css("background","#FA541C");
							}else if(current.codeno=="03"){
								$td1.css("background","#722ED1");
							}else if(current.codeno=="04"){
								$td1.css("background","#52C41A");
							}else if(current.codeno=="05"){
								$td1.css("background","#1890FF");
							}else if(current.codeno=="06"){
								$td1.css("background","#FA8C16");
							}else if(current.codeno=="07"){
								$td1.css("background","#FAAD14");
							}else if(current.codeno=="08"){
								$td1.css("background","#A0D911");
							}else if(current.codeno=="09"){
								$td1.css("background","#ccc");
							}else if(current.codeno=="10"){
								$td1.css("background","#FADB14");
							}else if(current.codeno==undefined){
								$td1.css("background","#ccc");
							}
							$tr.append($td1);
						}
						
						$("#cont1").append($tr);
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
	
	
	
	
	systemYearTime();
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
				console.log(data);
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
							$dt.css("background","#ccc");
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
	var datano;
    $(document).on("click",".hover .cellDt",function (){
    	var text=$(this).html();
    	var bg=$(this).css("background");
    	var shiftno=$(this).attr("data-shiftno");
    	layer.confirm('确定修改?', {title:'提示'}, function(index){
    	    //do something
    	    layer.close(index);
    	    $.ajax({
    	    	url:url+'/KQ_Arrange/updateShiftArrange',
    	    	type:"post",
    	    	data:{"datano":datano,"shiftno":shiftno},
    	    	success:function(data){
    	    		console.log(data);
    	    		if(data.flag){
    	    			$("#"+no).html(text);
    	            	$("#"+no).css("background",bg);
    	            	$("#"+no).attr("data-shiftno",shiftno);
    	            	$(".hover").hide();
    	    		}
    	    	}
    	    })
    	    
    	});

    	
    })
    //点击hover随鼠标显示隐藏
    $(document).on("click", ".cell", function (e) {
    		no=$(this).attr("id");
        	datano=$(this).attr("data-datano");
        	console.log(no);
        	$(".hover").css("position","absolute");
        	$(".hover").css("top",e.clientY+10+"px");
        	$(".hover").css("left",e.clientX-20+"px");
    		if ($(".hover").is(':hidden')) {
    			$(".hover").show();
    		} else {
    			$(".hover").hide();
            }
    	
    })
	
	
	
	
	
	
	
	
	//给搜索框年份赋值
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
		

		
		/**
		 * 导出Excel
		 */
		$("#daochu").click(function(){
		    var table1 = document.querySelector("#dayindaju1");
		    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
		    openDownloadDialog(sheet2blob(sheet),'员工班次信息.xlsx');
		});
		
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

