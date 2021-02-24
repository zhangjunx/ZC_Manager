$(function(){
	//查询卡号
	queryCardData();
	//点击确定提交数据
	$("#btn_save").click(function(){
		insertCardInfor();
	})
	function insertCardInfor(){
		var arr=[];
		for(var i=0;i<$(".sel").length;i++){
			if($(".sel").eq(i).val()!=""){
				var val=$(".sel").eq(i).find("option:selected").html();
				val=val.split("&nbsp;");
				console.log(val)
				var obj={
						"routeid":$("#luxian").val(),
						"cardno":val[4],
						"cardid":$(".sel").eq(i).val(),
						"holderno":val[2],
				}
				arr.push(obj);
			}
		}
		//判断数组中的对象是否重复
		for(var i=0;i<arr.length;i++){
			for(var j=i+1;j<arr.length;j++){
				if(arr[i].cardno==arr[j].cardno){
					layer.msg("不能添加重复的卡!",{time:2000});
					return;
				}
			}
		}
		console.log(arr)
		if($(".sel").length==1&&$(".sel").val()==""){
			layer.msg("请选择卡号!",{time:2000});
			return;
		}
		if(arr.length==0){
			layer.msg("请选择卡号!",{time:2000});
			return;
		}
		$.ajax({
	        type: "post",
	        url: url + "/card/insertCardInfor",
	        dataType: "json",
	        contentType: "application/json;charset=utf-8",
	        data:JSON.stringify(arr),
	        success: function(data) {
	          console.log(data);
	          if(data.flag){
	        	  layer.msg('添加成功！',{time:2000},function(){window.location.href="card_setting.html"});
	          }else{
	        	  layer.msg(data.reason,{time:2000});
	          }
	        },
	        error: function(data) {
	            console.log("error");
	        }
	    })
	}
	
	var val;
	//查询所有路线
	$.ajax({
        type: "post",
        url: url + "/card/queryUserRoute",
        dataType: "json",
        success: function(data) {
          console.log(data);
          val=data.result;
          var res=data.result;
          if(data.flag){
        	  for(var i=0;i<res.length;i++){
        		  var  $opt = $("<option value='"+res[i].RouteId+"'></option>");
        		  $opt.append(res[i].RouteName);
        		  $("#luxian").append($opt);
        	  }
          }
        },
        error: function(data) {
            console.log("error")
        }
    })//end
    //查询卡号
    function queryCardData(){
		$.post(url+"/card/queryCardData",function(data){
        	console.log(data);
        	$(".sel option").not(":first").remove();
        	if(data.flag){
        		var res=data.result;
        		for(var item of res){
        			var $opt=$("<option value='"+item.cardid+"'>"+item.holdername+"&nbsp;&nbsp;"+item.holderno+"&nbsp;&nbsp;"+item.cardno+"</option>");
            		$(".sel").append($opt);
        		}
        	}
        })
	}//end
	
	
	
	 // 添加
        $(document).on("click", ".add", function() {
            create();
        })
        //创建标签
        function create() {
            var $txt = $("<div class='patrol'></div>")
            var $txt3 = $("<div class='operation'><a href='javascript:;' class='add operation-btn fl' title='新增' id='add'><img src='images/icons/add.png'></a><a href='javascript:;' class='delete operation-btn fl' title='删除'><img src='images/icons/remove.png'></a></div>")
            var $txt4 = $("<select class='sel'><option value=''>姓名&nbsp;&nbsp;&nbsp;&nbsp;工号&nbsp;&nbsp;&nbsp;&nbsp;卡号</option></select>")
            var $txt5 = $("<div class='form-term clearfix '></div>")
            var $txt6=$("<div class='lable'><span>*</span>输入卡号：</div>")
            var $txt7 = $("<div class='control clearfix'></div>")
            $.post(url+"/card/queryCardData",function(data){
            	console.log(data);
            	if(data.flag){
            		var res=data.result;
            		for(var item of res){
            			var $opt=$("<option value='"+item.cardid+"'>"+item.holdername+"&nbsp;&nbsp;"+item.holderno+"&nbsp;&nbsp;"+item.cardno+"</option>");
            			$txt4.append($opt);
            		}
            	}
            })
            $txt7.append($txt4)
            $txt5.append($txt6)
            $txt5.append($txt7)
            $txt.append($txt5)
            $txt.append($txt3)
            
            $(".main-form").append($txt)

        }
        // 删除
        $(document).on("click", ".delete", function() {
        	if($(".delete").length==1){
        		return;
        	}
            $(this).parent().parent().remove();
        })
})