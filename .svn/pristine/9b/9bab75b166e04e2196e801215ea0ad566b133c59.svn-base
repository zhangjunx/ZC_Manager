$(function(){
	$(".info-text").html(localStorage.infos);
	queryview();
})
var res;
//查询门区
function queryview(){
	$.ajax({
        type: "post",
        url: url + "/DoorUnit/queryDoorUnit",
        dataType: "json",
        success: function(data) {
             console.log(data)
             res=data.result;
             var val=data.result;
            if(data.flag){
            	for (var i = 0; i < val.length; i++) {
                    $opt = $("<option></option>");
                    $opt.append(val[i].doorno+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+val[i].doorname+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+val[i].deviceno);
                    $(".sel").append($opt);
                }
            }
        },
        error: function(request) {
            console.log("error")
        }
    })
}
		
       
       


        // 添加
        $(document).on("click", ".add", function() {
            create(res);

        })

        //创建标签
        function create(res) {

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
            for (var i = 0; i < res.length; i++) {
            	 $opt = $("<option></option>");
                 $opt.append(res[i].doorno+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+res[i].doorname+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+res[i].deviceno);
                 $txt4.append($opt);
            }
            $(".main-form").append($txt)

        }
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
        	var routename=$(".info-text").html();
        	if(routename==""){
        		layer.msg("路线名称不能为空!",{time:2000});
        		return;
        	}
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
                    "nodeorder":i+1
             }
                arrList.push(dat)
            }
            //arrList = JSON.stringify(arrList)
            console.log(arrList)
            $.ajax({
                type: "POST",
                url: url + "/route/insertRouteAndNode",
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data:JSON.stringify({
                		"routename":routename,
                		"placeseveral":$(".patrol").length,
                		 "list":arrList
                	}),
                success: function(data) {
                    console.log(data);
                    if(data.flag){
                    	layer.msg("添加成功!",{time:2000},function(){
                    		window.location.href="route_setting.html";
                    	})
                    }else{
                    	layer.msg(data.reason,{time:2000});
                    }
                }
            })

        })