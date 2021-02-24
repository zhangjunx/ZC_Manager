$(function(){
	//班次管理首页显示
	queryShiftAndSection();
	showHide();//跟权限有关
	//分页
	var res;
	var limit=20;
	var page=1;
	layui.use("laypage", function () {
        var laypage = layui.laypage;
        if(res==undefined){
        	return;
        }
        laypage.render({
            elem: "test",
            count: res.length, //数据总数，从服务端得到
            limit: limit,
            curr:page,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数
                page=obj.curr;
                limit=obj.limit;
                pagination(page,limit,res.length);
                if (!first) {
                    // do something
                	pagination(page,limit,res.length);
                }
            }
        })
    })
    
    //分页
function pagination(curr, limit, count) {
    var dep = document.getElementById("page");
    var departmentInfo = document.getElementsByTagName("table")
    startRow = (curr - 1) * limit + 1 //每页显示第一条数据的行数
    lastRow = curr * limit //每页显示最后一条数据的行数
    var totalRow = count
    lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
    for (var i = 1; i < totalRow+1; i++) { //遍历数据
        var hrow = dep.rows[i]
        if (i >= startRow && i <= lastRow) {
            hrow.style.display = ""
        } else {
            hrow.style.display = "none"
        }
    }
}
	
	//跟权限有关
	function showHide(){
		var arrList=window.top.arr;
		if(window.top.arr.length==0){
			return;
		}
		$("#insertAttendance").hide();
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="8001"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertAttendance").show();
			}
		}
	}//end
	
	//点击编辑
	$(document).on("click",".updata",function(){
		var shiftno=$(this).parent().siblings().eq(0).html();
		console.log(shiftno);
		localStorage.shiftno=shiftno;
	})
	
	
	
	//删除
	$(document).on("click",".del",function(){
		/*var date=new Date();
		var month=date.getMonth()+1;
		if(month<10){
			month="0"+month;
		}*/
		var shiftno=$(this).parent().siblings().eq(0).html();
		layer.confirm("确定删除?",{title:"提示"},function(index){
			layer.close(index);
			deleteShiftAndSection(shiftno);
		})
	})
	//删除
	function deleteShiftAndSection(shiftno){
		$.ajax({
			url:url+"/KQ_ShiftData/deleteShiftAndSection",
			type:"post",
			data:{
				"shiftno":shiftno
			},
			success:function(data){
				console.log(data);
				if(data.flag){
				layer.msg("删除成功!",{time:2000},function(){
					window.location.reload();
				})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(){
				console.log("error");
			}
		})
	}
	//班次管理首页显示
	function queryShiftAndSection(){
		var obj={"holderno":window.top.holderno};
		$.ajax({
			url:url+"/KQ_ShiftData/queryShiftAndSection",
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="8001"){
						list.push(item);
					}
				}
				 res=data.result;
				if(data.flag){
					$("tbody").attr("id","page")
					for(var i=0;i<res.length;i++){
						var $tr=$("<tr></tr>");
						var $td1=$("<td></td>");
						var $td2=$("<td></td>");
						var $td3=$("<td></td>");
						var $td4=$("<td></td>");
						var $td5=$("<td></td>");
						var $a1="";
						var $a2="";
						if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
							 $a1="";
						  }else {
							  $a1=$("<a href='attendance_update_shift.html' class='layui-btn layui-btn-xs updata'>编辑</a>");
						  }
						 
						 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
							 $a2="";
						  }else {
							  $a2=$("<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-danger del'>删除</a>");
						  }
						 if($a1==""&&$a2==""){
							 $a1=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>编辑</a>");
							 $a2=$("<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>");
						 }
						$td5.append($a1);
						$td5.append($a2);
						$td1.append(res[i].shiftno);
						$td2.append(res[i].shiftname);
						$td3.append(res[i].nickname);
						if(res[i].codeno=="01"){
							$td2.css("color","#F5222D");
							$td3.css("color","#F5222D");
						}else if(res[i].codeno=="02"){
							$td2.css("color","#FA541C");
							$td3.css("color","#FA541C");
						}else if(res[i].codeno=="03"){
							$td2.css("color","#722ED1");
							$td3.css("color","#722ED1");
						}else if(res[i].codeno=="04"){
							$td2.css("color","#52C41A");
							$td3.css("color","#52C41A");
						}else if(res[i].codeno=="05"){
							$td2.css("color","#1890FF");
							$td3.css("color","#1890FF");
						}else if(res[i].codeno=="06"){
							$td2.css("color","#FA8C16");
							$td3.css("color","#FA8C16");
						}else if(res[i].codeno=="07"){
							$td2.css("color","#FAAD14");
							$td3.css("color","#FAAD14");
						}else if(res[i].codeno=="08"){
							$td2.css("color","#A0D911");
							$td3.css("color","#A0D911");
						}else if(res[i].codeno=="09"){
							$td2.css("color","#13C2C2");
							$td3.css("color","#13C2C2");
						}else if(res[i].codeno=="10"){
							$td2.css("color","#FADB14");
							$td3.css("color","#FADB14");
						}
						for(var k=0;k<res[i].child.length;k++){
							var $div1=$("<div></div>");
							var $span1=$("<span></span>");
							var $span2=$("<span></span>");
							var $span3=$("<span></span>");
							var $span4=$("<span></span>");
							var whichearliest=res[i].child[k].whichearliest;
							var whichwork=res[i].child[k].whichwork;
							var whichlatest=res[i].child[k].whichlatest;
							if(whichearliest=="z"){
								whichearliest="昨日";
							}else if(whichearliest=="d"){
								whichearliest="当日";
							}else{
								whichearliest="次日";
							}
							
							if(whichwork=="z"){
								whichwork="昨日";
							}else if(whichwork=="d"){
								whichwork="当日";
							}else{
								whichwork="次日";
							}
							
							if(whichlatest=="z"){
								whichlatest="昨日";
							}else if(whichlatest=="d"){
								whichlatest="当日";
							}else{
								whichlatest="次日";
							}
							$span1.append(res[i].child[k].classno+res[i].child[k].sectionstatus+":");
							$span2.append("最早打卡:"+whichearliest+res[i].child[k].workearliest);
							$span3.append("工作打卡:"+whichwork+res[i].child[k].worktime);
							$span4.append("最晚打卡:"+whichlatest+res[i].child[k].worklatest);
							$div1.append($span1);
							$div1.append($span2);
							$div1.append($span3);
							$div1.append($span4);
							$td4.append($div1);
							
						}
						$tr.append($td1);
						$tr.append($td2);
						$tr.append($td3);
						$tr.append($td4);
						$tr.append($td5);
						$("#banCi").append($tr);
					}
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(){
				console.log("error");
			}
		})
	}
})