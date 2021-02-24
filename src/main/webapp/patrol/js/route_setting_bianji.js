$(function(){
	//查询数据
	queryRouteAndNode(getUrlParam("routeid"));
	// 添加
    $(document).on("click", ".add", function() {
    	createTable();
    })
    // 删除
    $(document).on("click", ".delete", function() {
    	if($(".delete").length==1){
    		return;
    	}
        $(this).parent().parent().remove();
    })
    // 单选按钮  进出方向
    $(document).on("click", ".radio", function() {
        $(this).addClass("curr").siblings().removeClass("curr")
    })
     //确定 
        $(document).on("click", "#route_save", function() {
        	var routeid=$(".info-text").attr("data-routeid");
            var arrList = [];
            for (var i = 0; i < $(".patrol").length; i++) {
                var nodedirection;
                if ($("#radio .curr").eq(i).hasClass("ra")) {
                    nodedirection = 0 //进
                } else {
                    nodedirection = 1 //出
                }
                var obj=$(".sel").eq(i).find("option:selected").html();
                obj=obj.split("&nbsp;");
                var dat = {
                    "direction": nodedirection,
                    "doorname":obj[6],
                    "doorno":obj[0],
                    "deviceno":obj[12],
                    "nodeorder":i+1,
                    "routeid":routeid
             }
                arrList.push(dat)
            }
            console.log(arrList)
            $.ajax({
                type: "POST",
                url: url + "/route/updateRouteAndNode",
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data:JSON.stringify({
                		"routeid":parseInt(routeid),
                		"placeseveral":$(".patrol").length,
                		 "list":arrList
                	}),
                success: function(data) {
                    console.log(data);
                    if(data.flag){
                    	layer.msg("修改成功!",{time:2000},function(){
                    		window.location.href="route_setting.html";
                    	})
                    }else{
                    	layer.msg(data.reason,{time:2000});
                    }
                }
            })
})
     
//查询数据
function queryRouteAndNode(routeid){
    	console.log(routeid)
    $.ajax({
   		url:url+"/route/queryRouteAndNode",
       	type:"POST",
       	data:{"routeid":routeid},
       	success:function(data){
       		console.log(data);
       		if(data.flag){
       			var res=data.result;
       			$(".info-text").html(res[0].routename).attr("data-routeid",res[0].routeid);
       			for(var item of res[0].child){
       				create(item);
       			}
       			
       		}
       	}
   	})
    	
}
    
//url中解析参数
function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]); return null;
}
    
//创建标签
function create(res) {
            var $txt = $("<div class='patrol'></div>")
            var $txt2 = $("<div class='tip'><div class='write clearfix' id='radio'><span>进出方向：</span><span class='radio ra'>进</span><span class='radio'>出</span></div></div>")
            var $txt3 = $("<div class='operation'><a href='javascript:;' class='add operation-btn fl' title='新增' id='add'><img src='images/icons/add.png'></a><a href='javascript:;' class='delete operation-btn fl' title='删除'><img src='images/icons/remove.png'></a></div>")
            var $txt4 = $("<select class='sel'></select>")
            var $txt5 = $("<div class='form-term clearfix '></div>")
            var $txt6 = $("<div class='lable'><span>*</span>选择巡更点：</div>")
            var $txt7 = $("<div class='control clearfix'></div>")
            $txt7.append($txt4)
            $txt5.append($txt6)
            $txt5.append($txt7)
            $txt.append($txt5)
            $txt.append($txt2)
            $txt.append($txt3)
            $.ajax({
                type: "post",
                url: url + "/DoorUnit/queryDoorUnit",
                dataType: "json",
                success: function(data) {
                     var val=data.result;
                    if(data.flag){
                    	for (var i = 0; i < val.length; i++) {
                            $opt = $("<option value='"+val[i].doorno+"'></option>");
                            $opt.append(val[i].doorno+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+val[i].doorname+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+val[i].deviceno);
                            $txt4.append($opt);
                        }
                    	$txt4.val(res.doorno);
                    }
                    
                },
                error: function(request) {
                    console.log("error")
                }
            })
            
            $(".main-form").append($txt)
            if(res.direction=="1"){
            	$txt2.find(".radio").eq(1).addClass("curr");
            }else if(res.direction=="0"){
            	$txt2.find(".radio").eq(0).addClass("curr");
            }
            
           
            	
          
            
}    

function createTable(){
	var $txt = $("<div class='patrol'></div>")
    var $txt2 = $("<div class='tip'><div class='write clearfix' id='radio'><span>进出方向：</span><span class='radio ra'>进</span><span class='radio curr'>出</span></div></div>")
    var $txt3 = $("<div class='operation'><a href='javascript:;' class='add operation-btn fl' title='新增' id='add'><img src='images/icons/add.png'></a><a href='javascript:;' class='delete operation-btn fl' title='删除'><img src='images/icons/remove.png'></a></div>")
    var $txt4 = $("<select class='sel'></select>")
    var $txt5 = $("<div class='form-term clearfix '></div>")
    var $txt6 = $("<div class='lable'><span>*</span>选择巡更点：</div>")
    var $txt7 = $("<div class='control clearfix'></div>")
    
    $txt7.append($txt4)
    $txt5.append($txt6)
    $txt5.append($txt7)
    $txt.append($txt5)
    $txt.append($txt2)
    $txt.append($txt3)
    $.ajax({
             type: "post",
             url: url + "/DoorUnit/queryDoorUnit",
             dataType: "json",
             success: function(data) {
                 var val=data.result;
                 if(data.flag){
                  for (var i = 0; i < val.length; i++) {
                       $opt = $("<option value='"+val[i].doorno+"'></option>");
                       $opt.append(val[i].doorno+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+val[i].doorname+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+val[i].deviceno);
                       $txt4.append($opt);
                     }
                  }
                    
                },
                error: function(request) {
                    console.log("error")
                }
            })
    $(".main-form").append($txt)

}





})