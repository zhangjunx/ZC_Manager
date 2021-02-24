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

//向右移动
$("#shuttle_box_toRight").click(function (e) {
	$("#selectll").removeClass('curr');
    if ($("#shuttle_box_left .shuttle_box_li_act").length == 0) return false;
    for(var i=0;i<$("#shuttle_box_left .shuttle_box_li_act").length;i++){
    	for(var k=0;k<$("#shuttle_box_right .username").length;k++){
    		if($("#shuttle_box_left .shuttle_box_li_act .username").eq(i).attr("id")==$("#shuttle_box_right .username").eq(k).attr("id")){
    			layer.msg($("#shuttle_box_right .username").eq(k).html()+"已经被选中!",{time:2000});
    			return;
    		}
    	}
    }
    $("#shuttle_box_left").find('.shuttle_box_li_act').appendTo("#shuttle_box_right");
    $("#shuttle_box_right li").removeClass('shuttle_box_li_act');
    


});
//向左移动
$("#shuttle_box_toLeft").click(function () {
	$("#selectAll").removeClass('curr');
    if ($("#shuttle_box_right .shuttle_box_li_act").length == 0) return false;

    $("#shuttle_box_right .shuttle_box_li_act").appendTo("#shuttle_box_left");
    $("#shuttle_box_left li").removeClass('shuttle_box_li_act');
});

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
    data:  data.result,
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
							 html+="<li data-holderno="+val.holderno+"><img src='img/g.png'><h5><p class='username layui-elip' id='"+val.holderno+"'>"+holdername+"</p><p>"+val.holderno+"</p><p>"+departmentname+"</p></h5><span class='checkbox'  style='float: none;'></span></li>";
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







//点击确定传值
$("#sure").click(function(){
		if($(".banci").val()==""){
			layer.msg("请选择班次!",{time:2000});
			return;
		}
		
		
		var Year = $("#Year").val();//获取年
		var Month = $('span.curr').attr("data-id");//获取月
		if(Month<10){
			Month="0"+Month;
		}
		 var objList=[];
		 var personLength=$("#shuttle_box_right .username").length;
		 if(personLength==0){
			 layer.msg("请选择人员!",{time:2000});
			 return;
		 }
		 var layerMsg = layer.load(1);
		 for(var i=0;i<personLength;i++){		
			for(var j=0;j<$(".cell").length;j++){
				var day=$(".cell").eq(j).attr("data-day");
				if(day<10){
					day="0"+day;
				}
 				var obj={
 						"yearno":Year,
 						"monthno":Month,
 						"day":day,
 						"shiftno":$(".cell").eq(j).attr("data-shiftno"),
 						"holderno":$("#shuttle_box_right .username").eq(i).attr("id")
 				};
				objList.push(obj);
			 }
		}   
		 $.ajax({
			 url:url+'/KQ_Arrange/insertArrangeData',
			 type:'post',
			 contentType:'application/json', // 指定这个协议很重要
	         data:JSON.stringify(objList), 
			 dataType:'json',
			 success:function(data){
				 if(data.flag){
					 	layer.close(layerMsg); // 关闭单个
				 		layer.msg(data.reason,{time:3000});
				 		$(".select_person").fadeOut(500);
				 		$(".select_person_box").fadeOut(500);
				 }else{
					 layer.close(layerMsg); // 关闭单个
					layer.msg(data.reason,{time:2000});
				 }
			 },
			 error:function(res){
				 layer.close(layerMsg);
				layer.msg('系统未知错误',{icon:5,time:2000});
			 }
	})
		

	/*var localarr=localStorage.getItem("arr")//获取存的值
	if(localarr){//如果存在
		console.log(localarr)
		 let newarr=JSON.parse(localarr).concat(arr)//数组合并
		 console.log(newarr)
		let hash = {}; 
		newarr = newarr.reduce((preVal, curVal) => {
			hash[curVal.holderno] ? '' : hash[curVal.holderno] = true && preVal.push(curVal); 
			return preVal 
		}, [])
		console.log(newarr);
		localStorage.setItem("arr",JSON.stringify(newarr))//覆盖存储
	}else{
		localStorage.setItem("arr",JSON.stringify(arr)) //直接存储
	}*/
	
	
})
//点击取消
$("#quxiao").click(function(){
	$(".select_person").fadeOut(500);
	$(".select_person_box").fadeOut(500);
})
