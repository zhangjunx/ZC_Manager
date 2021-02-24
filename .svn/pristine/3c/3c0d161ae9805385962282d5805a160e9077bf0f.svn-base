var optType = 0;
$(function(){
	//初始化树形菜单
	initTreeList();
	
	//获取参数
	optType = getQueryString("type");
});

//获取部门数据
function initTreeList(){
	layui.use(['tree', 'util'], function(){
	  var tree = layui.tree,
	  layer = layui.layer,
	  util = layui.util;
	  
	  $.ajax({
		  url:url+'/KQ_Arrange/queryDepartmentData',
		  type:'post',
		  dataType:'json',
		  success:function(data){
			    tree.render({
				    elem:'#test12',
				    data:getTree(data.result),
				    showCheckbox: true,  //是否显示复选框
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function(obj){
				    	
				    },
				    oncheck: function(obj){
					      var arr=[];
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
						    	 console.log(data)
						    	 if(data.flag){
						    		 var html="";
						    		 $.each(data.result,function(i,val){
						    			 var departmentname=(val.departmentname==undefined?"":val.departmentname);
										 var holdername=(val.holdername==undefined?"":val.holdername);
										 var holderno=(val.holderno==undefined?"":val.holderno);
										 var departmentno=(val.departmentno==undefined?"":val.departmentno);
										 html+="<li><img src='../img/g.png'><h5><p class='username' id='"+holderno+"'>"+holdername+"</p><p class='dept' id='"+departmentno+"'>"+departmentname+"</p></h5><span class='checkbox'  style='float: none;'></span></li>";
						    		 })
						    		 $("#shuttle_box_left").append(html);
						    	 }else{
						    		 layer.msg(data.reason,{time:3000});
						    	 }
						     }
					      })
					  }
			  });
		  }
	  })
	});
}

//方法二
function getTree(list,underno = ""){
  let newTree = [];
  list.forEach(item => {
      if(item.underno == underno){
           let obj = {};
           obj.title = item.title;
           obj.id = item.id;
           obj.underno =underno;
           obj.spread=true,
           obj.children = getTree(list,item.id)
           newTree.push(obj)
       }
  });
  return newTree;
}

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

//穿梭框左侧反选
$("#selectInverse").click(function(){
	if ($("#selectInverse").hasClass('current')) {
		$("#selectInverse").removeClass('current');
		$("#selectll").removeClass('curr');
		$("#shuttle_box_right li span").removeClass("cur");
		for(var i=0;i<$("#shuttle_box_left li").length;i++){
			if($("#shuttle_box_left li").eq(i).hasClass("shuttle_box_li_act")){
				$("#shuttle_box_left li").eq(i).removeClass("shuttle_box_li_act");
			}else{
				$("#shuttle_box_left li").eq(i).addClass("shuttle_box_li_act")
			}
		}
    } else {
    	$("#selectInverse").addClass('current');
    	$("#selectll").removeClass('curr');
    	$("#shuttle_box_right li span").removeClass("cur");
    	for(var i=0;i<$("#shuttle_box_left li").length;i++){
			if($("#shuttle_box_left li").eq(i).hasClass("shuttle_box_li_act")){
				$("#shuttle_box_left li").eq(i).removeClass("shuttle_box_li_act");
			}else{
				$("#shuttle_box_left li").eq(i).addClass("shuttle_box_li_act")
			}
		}
    }
})


//点击确定传值
$("#sure").click(function(){
	insertCAPTimeZoneDoorHolder();	
})

function insertCAPTimeZoneDoorHolder(){
	var holders=$("#shuttle_box_left .shuttle_box_li_act");
	console.log(holders);
	var arr=[];
	for(var i=0;i<holders.length;i++){//先选中人 遍历人 
		var holderno=holders.eq(i).find(".username").attr("id");
		var holdername=holders.eq(i).find(".username").html();
		var obj={};
		arr.push(holderno+":"+holdername);
	}
	window.location.href = 'meeting_add.html?returnType='+optType+'&promoterInfo='+arr;
}//end

//获取页面跳转参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    } 
}

