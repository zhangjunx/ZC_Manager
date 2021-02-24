$(function(){
	//查询部门
	queryDeptNoList();
	queryOneApply();
	$("#holdername").css("background","#f2f2f2");
	$("#dept").css("background","#f2f2f2");
	//日期插件
	layui.use("laydate",function(){
		var laydate=layui.laydate;
		lay(".dateYx").each(function(){
			laydate.render({
				elem:this,
				trigger:"click",
				type:"datetime",
				format: 'yyyy-MM-dd HH:mm'
			})
		})
		laydate.render({
				elem:"#approveTime",
				trigger:"click",
			})
		
	})
	
	
	
	var status;
	//根据themeno查询修改数据
	function queryOneApply(){
		$.ajax({
			url:url+"/appeme/queryOneApply",
			type:"POST",
			data:{"themeno":localStorage.themeno3},
			success:(data)=>{
				//console.log(data);
				if(data.flag){
					var res=data.result;
					status=res.auditstatus;
					$("#holdername").val(res.holdername);
					$("#holdername").attr("data-holderno",res.holderno);
					$("#dept").val(res.departmentname);
					$("#dept").attr("data-deptno",res.departmentno);
					$(".thingsReason").val(res.detailedplace);
					$("#startTime").val(res.begintime.substring(0,res.begintime.length-3));
					$("#endTime").val(res.endtime.substring(0,res.endtime.length-3));
					$(".remark").val(res.remark);
					var approvals=res.firstapproval;
				    approvals=approvals.split(",");
				    var arr=spArray(2,approvals);
				    for(var item of arr){
				    	var $div=$("<div class='approval curr' data-holderno='"+item[1]+"'>"+item[0]+"</div>");
						$div.insertBefore($(".choose"));
				    }
				}
			}
		})
	}
	
	
	
	
	
	
	
	//点击选择审批人
	$(".choose").click(function(){
		$(".vehicleInfo_shadow").fadeIn(500);
		$(".approve").fadeIn(500);
	})
	//点击弹出框的叉
	$(".quxiao").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".approve").fadeOut(500);
	})
	//点击弹出框的确定
	$(".bottom_sure").click(function(){
		if($(".door_center ul li.current").length==0){
			return;
		}
		for(var i=0;i<$(".door_center ul li.current").length;i++){
			var holderno=$(".door_center ul li.current").eq(i).attr("data-holderno");
			var holdername=$(".door_center ul li.current").eq(i).attr("data-holdername");
			if(holderno==window.top.holderno){
				layer.msg("审批人不能选择本人",{time:2000});
				return;
			}
			for(var j=0;j<$(".approval").length;j++){
				var holderno1=$(".approval").eq(j).attr("data-holderno");
				if(holderno==holderno1){
					layer.msg("审批人重复!");
					return;
				}
			}
			$(".vehicleInfo_shadow").fadeOut(500);
			$(".approve").fadeOut(500);
			var $div=$("<div class='approval curr' data-holderno='"+holderno+"'>"+holdername+"</div>");
			$div.insertBefore($(".choose"));
		}
	})
	//点击弹出框的取消
	$(".bottom_qx").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".approve").fadeOut(500);
	})
	//点击弹框中的li
	$(document).on("click",".door_center ul li",function(){
		if($(this).hasClass("current")){
			$(this).removeClass("current");
		}else{
			$(this).addClass("current");
		}
	})
	//双击审批人删除
	$(document).on("dblclick",".approval",function(){
		$(this).remove();
	})
	//点击加班申请中的确定
	$("#updateOvertime").click(function(){
		var holderno=$("#holdername").attr("data-holderno");
		var departmentno=$("#dept").attr("data-deptno");
		var detailedplace=$(".thingsReason").val();
		var begintime=$("#startTime").val()+":00";
		var endtime=$("#endTime").val()+":00";
		var arr=[];
		for(var i=0;i<$(".control .curr").length;i++){
			arr.push($(".control .curr").eq(i).attr("data-holderno"));
		}
		arr=arr.join();
		var remark=$(".remark").val();
		var obj={"holderno":holderno,"departmentno":departmentno,"detailedplace":detailedplace,"begintime":begintime,
				"endtime":endtime,"firstapproval":arr,"remark":remark,"themeno":localStorage.themeno3};
		if(detailedplace==""){
			layer.msg("事由不能为空!",{time:2000});
			return;
		}
		if($("#startTime").val()==""||$("#endTime").val()==""){
			layer.msg("申请时间不能为空!",{time:2000});
			return;
		}
		var time1=new Date($("#startTime").val()).getTime();
		var time2=new Date($("#endTime").val()).getTime();
		if(time1>=time2){
			layer.msg("开始时间不能晚于结束时间!",{time:2000});
			return;
		}
		if(arr.length==0){
			layer.msg("请选择审批人!",{time:2000});
			return;
		}
		if(status==13){
			var str=url+"/appeme/insertWorkOverTime";
		}else{
			var str=url+"/appeme/updateTheme";
		}
		$.ajax({
			url:str,
			type:"POST",
			data:obj,
			success:(data)=>{
				//console.log(data);
				if(data.flag==true){
					layer.msg("修改成功!",{time:2000},function(){
						window.location.href="OvertimeIntermission.html?applyType=jb";
					})
				}else if(data.flag==false){
					layer.msg("修改失败!",{time:2000});
				}else if(data.flag=="no"){
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	
	})//end
	
	
	

	
	//选择审批人弹窗
	$("#queryHolderInfo").click(function(){
		var deptno=$("#dept").val();
		var holderno=$(".holdername").val();
		console.log(deptno,holderno);
		$.ajax({
			url:url+"/appeme/queryHolder",
			type:"POST",
			data:{"departmentno":deptno,"holderno":holderno},
			success:(data)=>{
				$(".door_center ul").empty();
				if(data.flag){
					var res=data.result;
					for(var item of res){
					var $li=$("<li data-holderno='"+item.holderno+"' data-holdername='"+item.holdername+"'></li>");
					var $div1=$("<div class='personPhoto'><img src='../img/person.png'></div>");
					var $div2=$("<div class='holderInfo'><p>姓名:<span>"+item.holdername+"</span></p><p>工号:<span>"+item.holderno+"</span></p><p>部门:<span>"+item.departmentname+"</span></p></div>");
					$li.append($div1);
					$li.append($div2);
					$(".door_center ul").append($li);
					}
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})//end
	
	    
	//查询部门
	function queryDeptNoList(){
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
				        	$("#dept").val(node.data.id);
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
	 }//end
	function queryHolderDataListByDepartmentNo(deptno){
		var obj={"deptno":deptno};
		$.ajax({
			url:url+'/DepartmentData/getHolderByDept',
			type:"post",
			data:obj,
			//contentType:"application/json", // 指定这个协议很重要
		    dataType:'json',
			success:function(data){
				 $(".holdername").find("option:not(:first)").remove();
				if(data.flag){
					var res=data.result;
					for(var item of res){
						var $opt=$("<option value='"+item.holderno+"'></option>")
						$opt.append(item.holdername);
						$(".holdername").append($opt);
					}
				}
			}
		})
	}	
	
	//分割数组
	function spArray(N,Q){
		var R = [],F;
		for (F = 0;F < Q.length;) {
			R.push(Q.slice(F,F += N))
		}
		return R
	}
})