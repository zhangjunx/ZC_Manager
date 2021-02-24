$(function() {
	queryRouteNode();
	setInterval(function(){
		queryLineTime(arr);
		queryXGRecord();
		queryCaution();
	},2000)
	queryXGRecord();
	queryCaution();//查询报警记录
	function queryXGRecord(){
		$.ajax({
            type: "post",
            url: url + "/record/queryXGRecord",
            dataType: "json",
            async:false,
            success: function(data) {
            	//console.log(data);
            	$(".shifts").empty();
            	$(".time").empty();
            	$(".node").empty();
            	var res=data.result
            	if(data.flag){
            		for(var i=0;i<res.length;i++){
                		for(var k=0;k<res[i].child.length;k++){
                			var nodecode=res[i].child[k].doorno;
                			var RouteNum=res[i].routeid
                			var patrolStart=res[i].child[k].patrolStartingtime;
                			var patrolEnd=res[i].child[k].patrolendingtime;
                			//var classname=res[i].child[k].ClassName;
                			//$("#time-"+nodecode).html(res[i].child[k].CardSwipeTime);
                			var date=new Date(res[i].child[k].cardswipetime);
                			var datetime=date.getTime();
                			if($("#time-"+RouteNum+nodecode).html()==""){
                				$("#time-"+RouteNum+nodecode).html(res[i].child[k].cardswipetime)
                			}
                			var date1=new Date($("#time-"+RouteNum+nodecode).html());
                			var datetime1=date1.getTime();
                			if(datetime1<datetime){
                				$("#time-"+RouteNum+nodecode).html(res[i].child[k].cardswipetime);
                			}
                			/*$("#patrolStart"+RouteNum).html(patrolStart);
                			$("#patrolEnd"+RouteNum).html(patrolEnd);*/
                			//$("#shifts"+RouteNum).html("班次："+classname);
                			
                			if(res[i].child[k].datatype=="zc"){
                				$("#node-"+RouteNum+nodecode).addClass("green");
                			}else if(res[i].child[k].datatype=="lx"){
                				$("#node-"+RouteNum+nodecode).addClass("orange");
                			}
                		}
                	}
            	}else{
            		$(".node").removeClass("orange");
            		$(".node").removeClass("green");
            	}
            	
            	
            }
		})
	}
	
	
	
	
	var val;
	var arr;
	function queryRouteNode(){
    	$.ajax({
            type: "post",
            url: url + "/route/queryRouteAndNode",
            dataType: "json",
            //async:false,
            success: function(data) {
            	//console.log(data);
            	val=data.result;
            	var res=data.result;
            	if(data.flag){
            		var index=1;
            		var $di=$("<div></div>");
            		arr=[];
            		for(var i=0;i<res.length;i++){
            			arr.push(res[i].routeid);
            			 /*var $div1 = $("<div class='main-process'></div>")*/
            			        var $div2 = $("<div class=main-line></div>")
            			        var $div7 = $("<div class='main-process-left fl'></div>")
            			        var $div8 = $("<div class='timeline-content'></div>")
            			        var $div9 = $("<div class='timeline-box'></div>")
            			        var $div10 = $("<div class='main-process-right fl'></div>")
            			        var $div11 = $("<div class='sub-process clearfix'></div>")
            			        var $div12 = $("<span class='time-line' id='time-line"+res[i].routeid+"' style='width:560px;'></span>")
            			        var $ul = $("<ul class='timeline-list clearfix'></ul>")
            			        var $span1 = $("<span class='route'></span>")
            			        var $span2 = $("<span class='shifts' id='shifts"+res[i].routeid+"'></span>")
            			        var $span3= $("<span class='bj' data-routid='"+res[i].routeid+"' id='bj"+res[i].routeid+"' style='color:skyblue;cursor:pointer;display:none'>取消报警</span>")
            			        var $div20=$("<div class='patrolStart'>巡更开始：</div>")
            			        var $span20=$("<span id='patrolStart"+res[i].routeid+"'></span>")
            			        var $div21=$("<div class='patrolEnd'>巡更结束：</div>")
            			        var $span21=$("<span id='patrolEnd"+res[i].routeid+"'></span>")
            			        $div20.append($span20)
            			        $div8.append($div20)
            			        $div21.append($span21)
            			        $div11.append($div7)
            			        $div11.append($div10)
            			        $div10.append($div9)
            			        $div9.append($div8)
            			        $div8.append($div2)
            			        $div2.append($div12)
            			        $div8.append($ul)
            			        $div8.append($div21)
            			        $span1.append("路线："+res[i].routename)
            			        $span2.append("")
            			        $div7.append($span1)
            			        $div7.append($span2)
            			        $div7.append($span3)
            			                for (var k = 0; k< res[i].child.length; k++) {
            			                    var $li = $("<li class='list'></li>")
            			                    var $div3 = $("<div class='time' id='time-"+res[i].routeid+res[i].child[k].doorno+"'></div>")
            			                    var $div4 = $("<div class='node' id='node-"+res[i].routeid+res[i].child[k].doorno+"'></div>")
            			                    var $div5 = $("<div class='info'><div class='arrow'>&nbsp;</div></div>")
            			                    var $div6 = $("<div class='name' id='name-"+res[i].child[k].doorno+"'></div>")
            			                    $div6.append(res[i].child[k].doorname)
            			                    /*$div3.append(res[i].nodeTime)*/
            			                    $li.append($div3)
            			                    $li.append($div4)
            			                    $li.append($div5)
            			                    $div5.append($div6)
            			                    $ul.append($li)
            			                       
            			                }
            			 $di.append($div11)
            			 if(index==2){
             				  $(".main-process").append($di)
             				  $di=$("<div></div>");
             				  index=1;
             			}else{
             				index++;
             			} 
            		}
            		if(index==2){
            			var  $di1=$("<div class='sub-process clearfix'></div>");
            			 $di.append($di1)
       				  $(".main-process").append($di)
       				  
            		}
            		
            		
            		
            	}
            	
            },
            error: function(data) {
                console.log("error")
            }

        })
      
    }
	
	//查询班次时间
	function queryLineTime(arr){
		$.ajax({
			url:url+"/route/queryLineTime",
		   type:"POST",
			data:{"id":arr},
			success:function(data){
				//console.log(data);
				if(data.flag){
					var res=data.result;
					for(var item of res){
						$("#patrolStart"+item.routeid).html(item.starttime);
            			$("#patrolEnd"+item.routeid).html(item.endtime);
					}
				}
			}
		})
	}
	
	//点击取消报警
	$(document).on("click",".bj",function(){
		var auto = $("#auto");
		var au=auto.get(0);
		var recordid=$(this).attr("data-recordid");
		var routeid=$(this).attr("data-routid");
		$.ajax({
			url:url + "/record/updateCaution",
			type:"post",
			async:false,
			data:{"RecordID":recordid},
			success:function(data){
				//console.log(data)
				if(data.flag){
						$("#bj"+routeid).css("display","none");
						$("#time-line"+routeid).css("background","#6496e1");
					}
				}
				
			})
	})
	
	
	
	
	//查询报警记录
	function queryCaution(){
		$.ajax({
			url:url + "/record/queryCaution",
			type:"post",
			async:false,
			success:function(data){
				//console.log(data);
				var res=data.result;
				if(data.flag){
					for(var i=0;i<res.length;i++){
						var RouteNum=res[i].routeid;
						$("#time-line"+RouteNum).css("background","red");
        				$("#bj"+RouteNum).css("display","inline-block");
        				$("#bj"+RouteNum).attr("data-recordid",res[i].recordid)
        				var auto = $("#auto");
        				auto.attr("src","audio/bj.mp3");
        				//au.play();
					}
				}else{
					var auto = $("#auto");
					var au=auto.get(0);
					au.pause();
					$(".bj").css("display","none");
					$(".time-line").css("background","#6496e1");
				}
			}
		})
	}
	
	
   
});