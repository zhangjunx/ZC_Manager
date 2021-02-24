$(function() {
	//查询所有路线
	queryAllRoute();
	//查询所有用户
	querySignHolder();
	//点击确定提交数据
	/*$("#btn_save").click(function(){
		updateRoute();
	})
	function updateRoute(){
		var userid=$(".current").attr("id");
		var arr=[];
		for(var i=0;i<$("input").length;i++){
			if($("input").eq(i).attr("checked")){
				var obj={
						"userid":userid,
						"routeid":$("input").eq(i).attr("name")
				}
				arr.push(obj);
			}
		}
		console.log(arr);
		$.ajax({
	        type: "post",
	        url: url + "/route/insertRights", 
	        dataType: "json",
	        contentType: "application/json;charset=utf-8",
	        data:JSON.stringify(arr),
	        success: function(data) {
	          console.log(data);
	         if(data.flag){
	        	 layer.msg('添加成功！',{time:2000},function(){window.location.reload()});
	         }
	        },
	        error: function(data) {
	            console.log("error")
	        }
	    })
	}*/
	
	
	/*//点击取消
	$("#btn_quxiao").click(function(){
		$("input").attr("checked",false);
	})*/
	
	
	
	
	
	//点击用户
	$(document).on("click",".user_con li",function(){
		$("input").attr("checked",false);
		//设置input被选中之后，要重新渲染
  	  layui.use('form', function(){
			var form = layui.form; 
			form.render('checkbox');
		})
		$(this).addClass("current").siblings().removeClass("current");
		var holderno=$(this).attr("id");
		queryRouteIdByUserId(holderno);
		
	})
	//通过用户id查询路线id
	function queryRouteIdByUserId(holderno){
		$.ajax({
	        type: "post",
	        url: url + "/route/queryRightsRouteID",
	        dataType: "json",
	        data:{"holderno":holderno},
	        success: function(data) {
	          console.log(data);
	          var res=data.result;
	          if(data.flag){
	        	  for(var i=0;i<$("input").length;i++){
	        		  for(var k=0;k<res.length;k++){
	        			  var routeid=$("input").eq(i).attr("name");
	        			  if(routeid==res[k].routeid){
	        				  $("input").eq(i).attr("checked",true);
	        			  }
	        			 // $("input[name='"+id+"']").attr("checked",true);
	        		  }
	        	  }
	        	  //设置input被选中之后，要重新渲染
	        	  layui.use('form', function(){
	      			var form = layui.form; 
	      			form.render('checkbox');
	      		})
	          }else{
	        	  layer.msg(data.reason,{time:2000});
	          }
	         
	        },
	        error: function(data) {
	            console.log("error")
	        }
	    })
	}

    //查询所有用户
	function querySignHolder(){
		$.ajax({
	        type: "post",
	        url: url + "/route/querySignHolder",
	        dataType: "json",
	        data:{"holderno":window.top.holderno},
	        success: function(data) {
	          console.log(data);
	          var res=data.result;
	         if(data.flag){
	        	 createUser(res);
	         }
	        },
	        error: function(data) {
	            console.log("error")
	        }
	    })
	}
    
	function createUser(data){
		for(var i=0;i<data.length;i++){
			$li=$("<li id='"+data[i].holderno+"'></li>");
			$li.append(data[i].holdername);
			$(".user_con").append($li);
		}
}      
    	    
    
    
    //用户路线管理查询所有路线
    function queryAllRoute(){
    	$.ajax({
	        type: "post",
	        url: url + "/route/queryAllRoute",
	        dataType: "json",
	        success: function(data) {
	          console.log(data);
	          var res=data.result;
	         if(data.flag){
	        	 createRoute(res);
	         }
	        },
	        error: function(data) {
	            console.log("error")
	        }
	    })

    }//end
    
    function createRoute(data){
    	for(var i=0;i<data.length;i++){
    		var $div=$("<div class='layui-form'></div>");
    		var $ipt=$("<input type='checkbox'  lay-filter='formDemo' lay-skin='switch' lay-text='启用|禁用' name='"+data[i].RouteID+"'>");
    		var $span=$("<div class='layui-form-label'></div>");
    		$span.append(data[i].RouteName)
    		$div.append($ipt);
    		$div.append($span);
    		$(".user_r_in").append($div);
    	}
    	layui.use('form', function(){
			var form = layui.form; 
			form.render('checkbox');
			 form.on('switch(formDemo)', function(data){
				 var holderno=$(".user_con li.current").attr("id");
				 var routeid=$(this).attr("name");
				 if(data.elem.checked==true){
					 var str=url+"/route/insertRights";
				 }else{
					 var str=url+"/route/deleteRights"
				 }
				 var obj={"holderno":holderno,"routeid":routeid};
				 console.log(obj)
				 $.ajax({
					 url:str,
				 	 type:"post",
				 	 data:obj,
				 	 success:function(data){
				 		console.log(data);
				 	}
				 })
			 });
		})
    }//end
    
    
    
});