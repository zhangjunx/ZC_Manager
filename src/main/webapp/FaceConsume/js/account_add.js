$(function(){
	getDeptTree();
	getHolderList();
	getConsumeTypeList();
})
//点击人员下的全选
$(".toolbar_all").click(function(){
	$("#holder li").addClass("current");
})
//点击清空
$(".toolbar_empty").click(function(){
	$("#holder li").removeClass("current");
})
//点击人员下的li
$(document).on("click","#holder li",function(){
	if($(this).hasClass("current")){
		$(this).removeClass("current");
	}else{
		$(this).addClass("current");
	}
})

//点击消费模式下的li选项
$(document).on("click",".face_resturant li",function(){
	$(this).addClass("current").siblings().removeClass("current");
})

//获取所有的消费模式
function getConsumeTypeList(){
	$.ajax({
		url:url+'/consumeType/getConsumeTypeList',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log(data)
			$("#consumptionPattern").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $li=$("<li data-fid="+item.fid+">"+item.consumeName+"</li>");
					$("#consumptionPattern").append($li);
				}
			}
		}
	})
}

//点击确定提交数据
$("#sure").click(function(){
	addAccountList();
})
//提交数据
function addAccountList(){
	if($("#holder li.current").length==0){
		layer.msg("请选择人员!",{time:2000});
		return;
	}
	if($("#consumptionPattern li.current").length==0){
		layer.msg("请选择消费模式!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$("#holder li.current").length;i++){
		var holderno=$("#holder li.current").eq(i).attr("data-holderno");
		var iDNumber=$("#holder li.current").eq(i).attr("data-idnumber");
		var holdername=$("#holder li.current").eq(i).attr("data-holdername");
		var idcardNum=$("#holder li.current").eq(i).attr("data-idcardnum");
		holderno=(holderno=="undefined"?"":holderno);
		iDNumber=(iDNumber=="undefined"?"":iDNumber);
		holdername=(holdername=="undefined"?"":holdername);
		idcardNum=(idcardNum=="undefined"?"":idcardNum);
		var obj={
				"holderNo":holderno,
				"idcardNum":idcardNum,
				"name":holdername,
				"iDNumber":iDNumber,
		}
		arr.push(obj);
	}
	var consumeRoleID=$("#consumptionPattern li.current").attr("data-fid");
	$.ajax({
		url:url+"/holderAccount/addAccountList",
		type:"post",
		data:{"list":JSON.stringify(arr),"consumeRoleID":consumeRoleID},
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg("添加成功!",{time:2000},function(){
					//window.location.href="accountManagement.html";
					$.ajax({
						url:url+"/facePayRecord/updateAddAccount",
						type:"post",
						data:{"data":data.resultList},
						success:function(res){
							console.log(res);
						}
					})
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}


//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		data:{"res":"true"},
		dataType:'json',//数据类型
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        showCheckbox: true,  //是否显示复选框
			        click: function (node) {
			        },
			        oncheck: function(obj){
			          var arr=[];
			  		  for(var i=0;i<$(".layui-form-checked").length;i++){
				  	  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
				  	  	  arr.push(id);
			  		  }
			  		   var arrs = arr.join();
			  		 $.ajax({
				    	 url:url+'/holderAccount/getHolderList',
					     type:'post',
					     dataType:'json',
					     data:{"departmentNo":arrs},
					     success:function(data){
					    	 $("#holder").empty();
					    	 if(data.flag){
					    		 var html="";
					    		 $.each(data.result,function(i,val){
					    			 var holderno=(val.HolderNo==undefined?"":val.HolderNo);
									 var holdername=(val.name==undefined?"":val.name);
									 html+="<li data-holdername="+holdername+" data-idnumber="+val.iDNumber+" data-idcardnum="+val.idcardNum+" data-holderno="+holderno+"><img src='../img/g.png'><h5><p class='username layui-elip' title="+holdername+" id='"+holderno+"'>"+holdername+"</p>" +
									 		"<p>"+holderno+"</p></h5></li>";
					    		 })
					    		 $("#holder").append(html);
					    	 }else{
					    		 layer.msg(data.reason,{time:2000});
					    	 }
					     }
				      })
			        }
			    });
			});
		},
		error:function(data){}
	})
}

function getHolderList(){
	 $.ajax({
    	 url:url+'/holderAccount/getHolderList',
	     type:'post',
	     dataType:'json',
	     data:{"departmentNo":""},
	     success:function(data){
	    	 console.log(data)
	    	 $("#holder").empty();
	    	 if(data.flag){
	    		 var html="";
	    		 $.each(data.result,function(i,val){
	    			 var holderno=(val.HolderNo==undefined?"":val.HolderNo);
					 var holdername=(val.name==undefined?"":val.name);
					 html+="<li data-holdername="+holdername+" data-idnumber="+val.iDNumber+" data-idcardnum="+val.idcardNum+" data-holderno="+holderno+"><img src='../img/g.png'><h5><p class='username layui-elip' title="+holdername+" id='"+holderno+"'>"+holdername+"</p>" +
					 		"<p>"+holderno+"</p></h5></li>";
	    		 })
	    		 $("#holder").append(html);
	    	 }else{
	    		 layer.msg(data.reason,{time:2000});
	    	 }
	     }
      })
}
