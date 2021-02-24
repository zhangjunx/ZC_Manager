$(function(){
	//获取所有班次信息
	queryShifts();
}) 
//穿梭框左侧选中
$("#shuttle_box_left").on('click', 'li', function () {
    if ($(this).hasClass('shuttle_box_li_act')) {
        $(this).removeClass('shuttle_box_li_act');
    } else {
        $(this).addClass('shuttle_box_li_act');
    }
});
//穿梭框左侧全选
$("#selectll").click(function (){
	if ($("#selectll").hasClass('curr')) {
		$("#selectll").removeClass('curr');
		$("#shuttle_box_left li").removeClass('shuttle_box_li_act')
    } else {
    	$("#selectll").addClass('curr');
    	$("#shuttle_box_left li").addClass('shuttle_box_li_act')
    }
})
//穿梭框右侧选中
$("#shuttle_box_right").on('click', 'li', function () {
    if ($(this).hasClass('shuttle_box_li_act')) {
        $(this).removeClass('shuttle_box_li_act');
    } else {
        $(this).addClass('shuttle_box_li_act');
    }
});
//穿梭框右侧全选
$("#selectAll").click(function (){
	if ($("#selectAll").hasClass('curr')) {
		$("#selectAll").removeClass('curr');
		$("#shuttle_box_right li").removeClass('shuttle_box_li_act')
    } else {
    	 $("#selectAll").addClass('curr');
    	 $("#shuttle_box_right li").addClass('shuttle_box_li_act')
    }
})
//获取部门数据
layui.use(['tree', 'util'], function(){
  var tree = layui.tree,
  layer = layui.layer,
  util = layui.util
  
  $.ajax({
	  url:url+'/DepartmentData/getDeptTree',
	  type:'post',
	  dataType:'json',
	  data:{"res":"false"},
	  success:function(data){
  tree.render({
    elem: '#test12',
    data: data.result,
    showCheckbox: true,  //是否显示复选框
    id: 'demoId1',
    isJump: true ,//是否允许点击节点时弹出新窗口跳转
    click: function(obj){
//      var data = obj.data;  //获取当前点击的节点数据
//      layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
    },
    oncheck: function(obj){
	    /*console.log(obj.data); //得到当前点击的节点数据
	    console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
	    console.log(obj.elem); //得到当前节点元素
*/	    var arr=[];
		  for(var i=0;i<$(".layui-form-checked").length;i++){
	  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
	  	  var obj={"departmentno":id};
	  	  arr.push(obj);
	    }
		   var arrs = JSON.stringify(arr);
		      $.ajax({
		    	 url:url+'/KQ_Arrange/queryDapartmentStaff',
			     type:'post',
			     contentType:"application/json", // 指定这个协议很重要
			     dataType:'json',
			     data:arrs,
			     success:function(data){
			    	 $("#shuttle_box_left").empty();
			    	 if(data.flag){
			    		 var html="";
			    		 $.each(data.result,function(i,val){
			    			 var departmentname=(val.departmentname==undefined?"":val.departmentname);
							 var holdername=(val.holdername==undefined?"":val.holdername);
							 html+="<li data-holderno="+val.holderno+"><img src='img/g.png'><h5><p class='username layui-elip' title="+holdername+" id='"+val.holderno+"'>"+holdername+"</p><p>"+val.holderno+"</p><p class='layui-elip' title="+departmentname+">"+departmentname+"</p></h5><span class='checkbox'  style='float: none;'></span></li>";
			    		 })
			    		 $("#shuttle_box_left").append(html);
			    	 }else{
			    		 layer.msg(data.reason,{icon:2,time:3000});
			    	 }
			     }
		      })
	    
	  }
  });
	  }
  })
});
//获取班次信息
function queryShifts(){
	$.ajax({
		url:url+"/KQ_ShiftData/queryShiftAndSection",
		type:"post",
		data:{"holderno":window.top.holderno},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $li=$("<li data-shiftno="+item.shiftno+"></li>");
					var $h5=$("<h5>"+item.shiftname+"</h5>");
					var $span=$("<span class='checkbox'  style='float: none;'></span>");
					$li.append($h5);
					$li.append($span);
					$("#shuttle_box_right").append($li);
					if(item.codeno=="01"){
						$h5.css("color","#F5222D");
					}else if(item.codeno=="02"){
						$h5.css("color","#FA541C");
					}else if(item.codeno=="03"){
						$h5.css("color","#722ED1");
					}else if(item.codeno=="04"){
						$h5.css("color","#52C41A");
					}else if(item.codeno=="05"){
						$h5.css("color","#1890FF");
					}else if(item.codeno=="06"){
						$h5.css("color","#FA8C16");
					}else if(item.codeno=="07"){
						$h5.css("color","#FAAD14");
					}else if(item.codeno=="08"){
						$h5.css("color","#A0D911");
					}else if(item.codeno=="09"){
						$h5.css("color","#13C2C2");
					}else if(item.codeno=="10"){
						$h5.css("color","#FADB14");
					}
				}
			}
		}
	})
}
//点击确定传值
$("#sure").click(function(){
		 var objList=[];
		 var personLength=$("#shuttle_box_left .shuttle_box_li_act").length;
		 if(personLength==0){
			 layer.msg("请选择人员!",{time:2000});
			 return;
		 }
		 if($("#shuttle_box_right .shuttle_box_li_act").length==0){
			 layer.msg("请选择班次!",{time:2000});
			 return;
		 }
		 var layerMsg = layer.load(1);
		 for(var i=0;i<personLength;i++){		
			for(var j=0;j<$("#shuttle_box_right .shuttle_box_li_act").length;j++){
 				var obj={
 						"shiftno":$("#shuttle_box_right .shuttle_box_li_act").eq(j).attr("data-shiftno"),
 						"holderno":$("#shuttle_box_left .shuttle_box_li_act").eq(i).attr("data-holderno")
 				};
				objList.push(obj);
			 }
		}
		 $.ajax({
			 url:url+'/KQ_Arrange/insertDistributionShift',
			 type:'post',
			 contentType:'application/json', // 指定这个协议很重要
	         data:JSON.stringify({
	        	 "list":objList
	         }), 
	         async:false,
			 dataType:'json',
			 success:function(data){
				 console.log(data)
				 $(".username").css("color","#666");
				 if(data.flag){
					 	layer.close(layerMsg); // 关闭单个
				 		layer.msg(data.reason,{time:3000});
				 		$(".select_person").fadeOut(500);
				 		$(".select_person_box").fadeOut(500);
				 }else{
					 layer.close(layerMsg); // 关闭单个
					layer.msg("加红人员已经被排班，不允许重复!",{time:2000});
					var res=data.result;
					for(var item of res){
						$("#"+item.holderno).css("color","red");
					}
				 }
			 },
			 error:function(res){
				layer.close(layerMsg);
				layer.msg('系统未知错误',{icon:5,time:2000});
				
			 }
	})
})
//点击取消
$("#quxiao").click(function(){
	$(".select_person").fadeOut(500);
	$(".select_person_box").fadeOut(500);
})
