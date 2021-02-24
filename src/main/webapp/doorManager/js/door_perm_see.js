$(function(){
	//getAreaDeviceDoorTree();
	getDeptTree();
	getDoorTree();
	showHide();//跟权限有关
	queryWeekZoneList();
});

//日期
function getDate() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		lay(".ipt").each(function() {
			laydate.render({
				elem : this, // 指定元素
				trigger : "click",
				type : "time",
				format:"HH:mm",
			});
		})
	})
}// end
//穿梭框左侧全选
$("#selectAll").click(function (){
	if ($("#selectAll").hasClass('curr')) {
		$("#selectAll").removeClass('curr');
		//最里层的复选框如果被选中，就点击一次
    	for(var i=0;i<$("#door_see #shuttle_box_left .layui-icon-file").length;i++){
    		if($("#door_see #shuttle_box_left .layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")==true){
    			$("#door_see #shuttle_box_left .layui-icon-file").eq(i).parent().next().next().click();
    		}
    	}
    } else {
    	$("#selectAll").addClass('curr');
    	//最里层的复选框如果被选中，就点击一次
    	for(var i=0;i<$("#door_see #shuttle_box_left .layui-icon-file").length;i++){
    		if($("#door_see #shuttle_box_left .layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")!=true){
    			$("#door_see #shuttle_box_left .layui-icon-file").eq(i).parent().next().next().click();
    		}
    	}
    }
})

//分割数组
function spArray(N,Q){
	var R = [],F;
	for (F = 0;F < Q.length;) {
		R.push(Q.slice(F,F += N))
	}
	return R
}

//双击删除
$(document).on("dblclick",".dblDel",function(){
	var doorno=$(this).attr("data-doorno");
	var holderno=$(this).attr("data-holderno");
	var deviceno=$(this).attr("data-deviceno");
	layer.confirm("确定删除?",{title:"提示信息"},function(i){
		$.ajax({
			url:url+"/DoorPermHolder/deleteSee",
			type:"post",
			data:{"doorno":doorno,"holderno":holderno,"str":window.top.holderno},
			success:function(data){
				console.log(data)
				if(data.flag){
					layer.close(i);
					queryHolderByDoor(doorno,deviceno);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})

//点击弹出层保存提交数据
$(".saveMould").click(function(){
	var doorno=$(this).attr("data-doorno");
	var deviceno=$(this).attr("data-deviceno");
	insertBatch(doorno,deviceno);
})
function insertBatch(doorno,deviceno){
	console.log("doorno=="+doorno+";deviceno=="+deviceno)
	//获取时段
		var id=$(".weekzone_title").attr("data-id");
		var len=$(".ipt").length;
		var weekzone="";
		for(var k=0;k<len;k++){
			if(k%2!=0){
				weekzone+=$(".ipt").eq(k).val()+";";
			}else{
				weekzone+=$(".ipt").eq(k).val()+"-";
			}
			
		}
		weekzone=weekzone.split(";");
		weekzone.pop();
		var arr=spArray(3,weekzone);
		var obj2={
				"weekzone1":arr[0][0]+";"+arr[0][1]+";"+arr[0][2],
				"weekzone2":arr[1][0]+";"+arr[1][1]+";"+arr[1][2],
				"weekzone3":arr[2][0]+";"+arr[2][1]+";"+arr[2][2],
				"weekzone4":arr[3][0]+";"+arr[3][1]+";"+arr[3][2],
				"weekzone5":arr[4][0]+";"+arr[4][1]+";"+arr[4][2],
				"weekzone6":arr[5][0]+";"+arr[5][1]+";"+arr[5][2],
				"weekzone7":arr[6][0]+";"+arr[6][1]+";"+arr[6][2],
		}
	var arr=[];
	for(var k=0;k<$("#door_see #shuttle_box_left .layui-form-checked").length;k++){
		var id=$("#door_see #shuttle_box_left .layui-form-checked").eq(k).parent().parent().parent().attr("data-id");//被选中的id
		for(var i=0;i<$("#door_see #shuttle_box_left .layui-icon-file").length;i++){
			var perssionid=$("#door_see #shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");//最底层的id
			if(id==perssionid){//被选中的最底层的id
				if(id.indexOf("c")!=-1){//最底层的被选中的卡号,有卡的人员
					var cardid=$("#door_see #shuttle_box_left .layui-form-checked").eq(k).next().html();
					var holderno=$("#door_see #shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().parent().parent().attr("data-id");
					var obj={
							"deviceno":deviceno,
							"doorno":doorno,
							"cardid":cardid,
							"holderno":holderno,
							"list":obj2
					}
					arr.push(obj);
				}else{//没有卡的人员
					var holderno1=$("#door_see #shuttle_box_left .layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");
					var obj1={
							"deviceno":deviceno,
							"doorno":doorno,
							"holderno":holderno1,
							"list":obj2
					}
					arr.push(obj1);
				}
			}
		}
}
	if(arr.length==0){
		layer.msg("请选择人员",{time:2000})
		return;
	}
	console.log(JSON.stringify(arr))
	$.ajax({
		 url:url+"/DoorPermHolder/insertBatch?str="+window.top.holderno,
		 type:"POST",
         data:JSON.stringify(arr), 
		 dataType:"json",
		 contentType:"application/json", // 指定这个协议很重要
		 success:function(data){
			 console.log(data);
			 layer.msg(data.reason,{time:2000});
			 if(data.flag){
				 layer.close(index);
				 queryHolderByDoor(doorno,deviceno);
			 }
		 }
	})
}//end
var index;
//点击加号弹出层
$(document).on("click",".add",function(){
	index=layer.open({
		type:1,
		content:$("#door_see"),
		area:["860px"]
	})
	var deptno=$(this).attr("data-deptno");
	var doorno=$(this).attr("data-doorno");
	var deviceno=$(this).attr("data-deviceno");
	$(".saveMould").attr("data-doorno",doorno);
	$(".saveMould").attr("data-deviceno",deviceno);
	getHolderCardTree(deptno);
})
//根据部门获取人员
function getHolderCardTree(deptno){
	$.ajax({
		url:url+"/CardData/getHolderCardTree",
		type:"post",
		data:{"deptno":deptno},
		success:function(data){
			if(data.flag){
				layui.use(['tree','util'],function(){
					 var tree=layui.tree,
					 layer=layui.layer,
					 util=layui.util
					 
					 tree.render({
				    	elem:"#door_see #shuttle_box_left",
				    	data:data.result,
				    	showCheckbox:true,//是否显示复选框
				    	id: 'demoId1',
					 })
				})
			}
		}
	})
}
//点击选择模板下拉框
$(".selectMoudle").change(function(){
	var id=$(this).val();
	queryWeekZoneListById(id);
})

//根据下拉框的值获取时间模板
function queryWeekZoneListById(id){
	$.ajax({
		url:url+"/DoorWeekZone/queryWeekZoneList",
		type:"post",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			$(".weekzonelist .ipt").val("00:00");
			if(data.flag){
				var res=data.result;
				var arrlist=[];
				for(var item of res){
						var obj={
								"id":item.id,"name":item.name,
								"weekzone":item.weekzone1+";"+item.weekzone2+";"+item.weekzone3+";"+item.weekzone4+";"+item.weekzone5+";"+item.weekzone6+";"+item.weekzone7
						}
						arrlist.push(obj);
						$(".weekzone_title").attr("data-id",item.id).html(item.name);
				}
				for(var item of arrlist){
					var list=item.weekzone.split(";");
					list=list.join("-");
					var array=list.split("-");
					for(var i=0;i<array.length;i++){
						if(array[i]==""){
							$(".ipt").eq(i).val("00:00");
						}else{
							$(".ipt").eq(i).val(array[i]);
						}
					}
				}
				getDate();
			}
		}
	})
}
//获取时间段
function queryWeekZoneList(){
	$.ajax({
		url:url+"/DoorWeekZone/queryWeekZoneList",
		type:"post",
		success:function(data){
			console.log(data);
			$(".selectMoudle").empty();
			//$(".selectMoudle option").not(":first").remove();
			$(".weekzonelist .ipt").val("00:00");
			if(data.flag){
				var res=data.result;
				var arrlist=[];
				var index=0;
				for(var item of res){
					var $opt=$("<option value="+item.id+">"+item.name+"</option>");
					$(".selectMoudle").append($opt);
					if(index==0){
						var obj={
								"id":item.id,"name":item.name,
								"weekzone":item.weekzone1+";"+item.weekzone2+";"+item.weekzone3+";"+item.weekzone4+";"+item.weekzone5+";"+item.weekzone6+";"+item.weekzone7
						}
						arrlist.push(obj);
						$(".weekzone_title").attr("data-id",item.id).html(item.name);
						
					}
					index++;
				}
				for(var item of arrlist){
					var list=item.weekzone.split(";");
					list=list.join("-");
					var array=list.split("-");
					for(var i=0;i<array.length;i++){
						if(array[i]==""){
							$(".ipt").eq(i).val("00:00");
						}else{
							$(".ipt").eq(i).val(array[i]);
						}
					}
				}
				getDate();
			}
		}
	})
}


//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#sure").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="MyDoorPermSet"){
			list.push(item);
		}
	})
	for(var item of list){
		if(item.Code=="save"){
			$("#sure").show();
		}
	}
}//end

//获取部门数据
function getAreaDeviceDoorTree(){
	layui.use(['tree', 'util'], function(){
		  var tree = layui.tree,
		  layer = layui.layer,
		  util = layui.util
		  $.ajax({
			  url:url+'/DoorPermHolder/getAreaDeviceDoorTree',
			  type:'post',
			  dataType:'json',
			  data:{"res":true},
			  success:function(data){
				    tree.render({
				    elem: '#test12',
				    data:  data.result,
				    showCheckbox: true,  //是否显示复选框
				    id: 'demoId1',
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function(obj){
				    },
				    oncheck: function(obj){
				    	  var arr=[];
			        	  var arrlist=[];
						  for(var i=0;i<$(".layui-form-checked").length;i++){
					  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
					  	  if(id.indexOf("do")!=-1){
					  		var doorno=id.substring(2);
						  	  arr.push(doorno);
					  	  }
					  	  arrlist.push(id);
					    }
						 if(arr.length==0){
							 layer.msg("请先选择门区！",{time:2000});
							 return;
						 }
						 $.ajax({
						    	url:url+"/DoorPermHolder/queryHolderByDoor",
							     type:"POST",
							     contentType:"application/json", // 指定这个协议很重要
							     dataType:"json",
							     data:JSON.stringify(arr),
							     success:function(data){
							    	 console.log(data)
							     }
						 })
					  }
				  });
			  }
		  })
		})
}

	
//获取部门数据
function getDeptTree(){
	layui.use(['tree', 'util'], function(){
		  var tree = layui.tree,
		  layer = layui.layer,
		  util = layui.util
		  $.ajax({
			  url:url+'/DepartmentData/getDeptTree',
			  type:'post',
			  dataType:'json',
			  data:{"res":true},
			  success:function(data){
				    tree.render({
				    elem: '#shuttle_box_left',
				    data:  data.result,
				    showCheckbox: true,  //是否显示复选框
				    id: 'demoId1',
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function(obj){
				    },
				    oncheck: function(obj){
				    	  var arr=[];
			        	  var arrlist=[];
						  for(var i=0;i<$(".layui-form-checked").length;i++){
					  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
					  	  var name=$(".layui-form-checked").eq(i).siblings("span.layui-tree-txt").text();
					  	  arrlist.push(id);
					  	  arr.push(name);
						  }
					  }
				  });
			  }
		  })
		})
}

//初始化树菜单
function getDoorTree(){
	$.ajax({
		url:url+"/DoorUnit/getDoorTree",
		//url:url+'/DoorPermHolder/getAreaDeviceDoorTree',
		data:{"res":"true"},
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			if(!data.flag){
				layer.msg(data.reason,{"time":2000});
				return;
			}
			layui.use(['tree', 'util'], function(){
				 var tree = layui.tree;
				 var layer = layui.layer;
				 var util = layui.util;
				  tree.render({
				    elem: '#test12',
				    data: data.result,
				    onlyIconControl:true,
				    click: function(obj){
				    	//最里层的复选框如果被选中，就点击一次,清空
				    	for(var i=0;i<$(".layui-icon-file").length;i++){
				    		if($(".layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")==true){
				    			$(".layui-icon-file").eq(i).parent().next().next().click();
				    		}
				    	}
				    	$(".layui-tree-txt").css("color","#555");
				    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
				        var id=obj.data.id;
				        var s=obj.data.id.substring(0,1);
				        if(s=="d"){
				        	 var doorno=id.substring(1);
				        	 var deviceno=obj.data.deviceno;
						     queryHolderByDoor(doorno,deviceno);
				        }else{
				        	layer.msg("请选择最底层的门区！",{time:2000});
				        }
				       
				    },
				  });
			});
		
		},
		error:function(data){}
	})
}


//根据人员查询已被绑定的门区
function queryHolderByDoor(doorno,deviceno){
	var obj={"doorno":doorno};
	 $.ajax({
		  url:url+'/DoorPermHolder/queryHolderByDoor',
		  type:'POST',
		  data:obj,
		  dataType:"json",
		  success:function(data){
			$("#cont").empty();
			if(!data.flag){ 
				layer.msg(data.reason,{time:2000});
				return;
			}
			//var html="";
			var res=data.result;
			
			//最里层的复选框如果被选中，就点击一次,清空
	    	for(var i=0;i<$(".person .layui-icon-file").length;i++){
	    		if($(".person .layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")==true){
	    			$(".person .layui-icon-file").eq(i).parent().next().next().click();
	    		}
	    	}
			//选中对应的部门
			for(var i=0;i<$(".person .layui-icon-file").length;i++){
				var perssionid=$(".person .layui-icon-file").eq(i).parent().next().attr("value");
				for(var k=0;k<res.length;k++){
					if(perssionid==res[k].deptno){
						$(".person .layui-icon-file").eq(i).parent().next().next().click();
					}
				}
			}
			//生成右侧表格
			for(var i=0;i<res.length;i++){
				var deptno=(res[i].deptno==undefined?"":res[i].deptno);
				var deptname=(res[i].deptname==undefined?"":res[i].deptname);
				//html+="<tr><td data-deptno='"+deptno+"' class='dept'>"+deptname+"</td><td class='text_location'></td></tr>";
				var $tr=$("<tr><td data-deptno='"+deptno+"' class='dept'>"+deptname+"</td><td class='text_location'></td></tr>")
				for(var j=0;j<res[i].arrlist.length;j++){
					var holderno=(res[i].arrlist[j].holderno==undefined)?"":res[i].arrlist[j].holderno;
					var holdername=(res[i].arrlist[j].holdername==undefined)?"":res[i].arrlist[j].holdername;
					var t=$("<span class='img"+deptno+" dblDel' data-deviceno="+deviceno+" data-doorno="+doorno+" data-holderno="+holderno+" style='border:1px solid #2f8eed'>"+holdername+"</span>");
					var $span=$("<span class='img"+deptno+" add' data-deviceno="+deviceno+" data-doorno="+doorno+" data-deptno='"+deptno+"' style='border:1px solid #2f8eed'><img src='../images/more1.png'></span>")
					$tr.find(".text_location").append(t);
				} 
				$tr.find(".text_location").append($span);
				$("#cont").append($tr);
			}
		  }
	 })
}//end
