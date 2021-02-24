var page=1;//当前页
var limit=20;//每页显示条数
var total;
$(function(){
	//获取人员班次信息
	selectDistributionShift();
	//部门下拉菜单
	getDeptTree();
})
//点击上层菜单切换状态
$(".main-tab .label").click(function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".main-table").hide();
	$(".main-table").eq($(this).index()).show();
	if($(this).index()==0){
		$(".subbtn").hide();
	}else{
		$(".subbtn").show();
	}
})


layui.use('form', function(){
  var form = layui.form;
});

//点击全选
$("#checkAll").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		$(".bodyCheck").removeClass("curr");
	}else{
		$(this).addClass("curr");
		$(".bodyCheck").addClass("curr");
	}
})

//点击tbody里面的复选框
$(document).on("click",".bodyCheck",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
	if($(".bodyCheck").length==$(".bodyCheck.curr").length){
		$("#checkAll").addClass("curr");
	}else{
		$("#checkAll").removeClass("curr");
	}
})
//点击批量删除
$("#delMore").click(function(){
	var arr=[];
	for(var i=0;i<$(".bodyCheck.curr").length;i++){
		var holderno=$(".bodyCheck.curr").eq(i).attr("data-holderno");
		var obj={"holderno":holderno};
		arr.push(obj);
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/KQ_Arrange/deleteDistributionShift",
			type:"post",
			data:{"list":JSON.stringify(arr)},
			success:function(data){
				if(data.flag){
					layer.close(index);
					layer.msg("删除成功!",{time:1000},function(){
						selectDistributionShift();
					});
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})



//点击搜索
$("#queryInformation").click(function(){
	selectDistributionShift();
})

//双击删除
$(document).on("dblclick",".field",function(){
	var holderno=$(this).attr("data-holderno");
	var shiftno=$(this).attr("data-shiftno");
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/KQ_Arrange/deleteOneShift",
			type:"post",
			data:{"holderno":holderno,"shiftno":shiftno},
			success:function(data){
				if(data.flag){
					layer.close(index);
					selectDistributionShift();
				}else{
					layer.msg("删除失败!",{time:2000});
					layer.close(index);
				}
			}
		})
	})
})
//点击加号
$(document).on("click",".addShift",function(){
	var holderno=$(this).attr("data-holderno");
	$.ajax({
		url:url+"/KQ_ShiftData/queryShiftAndSection",
		type:"post",
		data:{"holderno":window.top.holderno},
		success:function(data){
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $li=$("<li data-shiftno="+item.shiftno+"></li>");
					var $h5=$("<h5>"+item.shiftname+"</h5>");
					var $span=$("<span class='checkbox'  style='float: none;'></span>");
					$li.append($h5);
					$li.append($span);
					$(".shiftInfo").append($li);
					if(item.codeno=="01"){
						$h5.css("color","#F5222D");
					}else if(item.codeno=="02"){
						$h5.css("color","#FA541C");
					}else if(item.codeno=="03"){
						$h5.css("color","#722ED1");
					}else if(item.codeno=="04"){
						$h5.css("color","#52C41A");
					}else if(item.codeno=="05"){
						$h5.css("color","#1890FF");
					}else if(item.codeno=="06"){
						$h5.css("color","#FA8C16");
					}else if(item.codeno=="07"){
						$h5.css("color","#FAAD14");
					}else if(item.codeno=="08"){
						$h5.css("color","#A0D911");
					}else if(item.codeno=="09"){
						$h5.css("color","#13C2C2");
					}else if(item.codeno=="10"){
						$h5.css("color","#FADB14");
					}
				}
			}
		}
	})
	layer.open({
		type:1,
		title:"班次信息",
		area:["350px","400px"],
		btn: ['确定', '取消'],
		content:"<div class='shiftInfo'></div>",
		yes:function(index,layero){
			//确定回调
			if($(".shiftInfo li.curr").length==0){
				layer.msg("请选择班次",{time:2000});
			}else{
				var arr=[];
				for(var i=0;i<$(".shiftInfo li.curr").length;i++){
					var obj={
							"shiftno":$(".shiftInfo li.curr").eq(i).attr("data-shiftno"),
							"holderno":holderno
					}
					arr.push(obj);
				}
				$.ajax({
					 url:url+'/KQ_Arrange/insertDistributionShift',
					 type:'post',
					 contentType:'application/json', // 指定这个协议很重要
			         data:JSON.stringify({
			        	 "list":arr
			         }), 
			         async:false,
					 dataType:'json',
					 success:function(data){
							 if(data.flag){
								 layer.close(index);
								 selectDistributionShift();
							 }else{
								 var res=data.result;
								 var html="";
								 for(var item of res){
									 html+=item.shiftname+"、";
								 }
								 layer.msg(html+"已存在,不能重复添加",{time:2000});
							 }
						 }
					 })
				
			}
		},
	})
})
//点击弹出层的li
$(document).on("click",".shiftInfo li",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})

//获取人员班次信息
function selectDistributionShift(){
	var deptno=$("#deptID").val();
	var holderno=$("#idcode1").val();
	var obj={"departmentno":deptno,"holderno":holderno};
	$.ajax({
		url:url+"/KQ_Arrange/selectDistributionShift",
		type:"post",
		data:obj,
		success:function(data){
			 $("#page tr:gt(0)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=item.holderno==undefined?"":item.holderno;
					var holdername=item.holdername==undefined?"":item.holdername;
					var deptname=item.departmentname==undefined?"":item.departmentname;
					var $tr=$("<tr><td><span class='checkbox bodyCheck' data-holderno="+holderno+"  style='float:none'></span></td><td>"+holderno+"</td><td>"+holdername+"</td><td>"+deptname+"</td></tr>")
					var $td=$("<td></td>");
					for(var list of item.child){
						var $span=$("<span class='field' data-holderno="+list.holderno+" data-shiftno="+list.shiftno+">"+list.shiftname+"</span>");
						$td.append($span);
						if(list.codeno=="01"){
							$span.css("color","#F5222D");
						}else if(list.codeno=="02"){
							$span.css("color","#FA541C");
						}else if(list.codeno=="03"){
							$span.css("color","#722ED1");
						}else if(list.codeno=="04"){
							$span.css("color","#52C41A");
						}else if(list.codeno=="05"){
							$span.css("color","#1890FF");
						}else if(list.codeno=="06"){
							$span.css("color","#FA8C16");
						}else if(list.codeno=="07"){
							$span.css("color","#FAAD14");
						}else if(list.codeno=="08"){
							$span.css("color","#A0D911");
						}else if(list.codeno=="09"){
							$span.css("color","#13C2C2");
						}else if(list.codeno=="10"){
							$span.css("color","#FADB14");
						}
					}
					var $add=$("<span class='addShift' data-holderno="+holderno+">+</span>");
					$td.append($add);
					$tr.append($td);
					$("#page").append($tr);
				}
				total=res.length;
				getPage(total);
			}
		}
	})
}

//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		dataType:'json',//数据类型
		data:{"res":"false"},
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#deptID").val(node.data.id);
			        	$("#deptName").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			            queryHolderDataListByDepartmentNo(node.data.id);
			        }
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			});
		
		},
		error:function(data){}
	})
}
function queryHolderDataListByDepartmentNo(deptno){
	var obj={"departmentno":deptno};
	$.ajax({
		url:url+'/HolderData/queryHolderDataListByDepartmentNo',
		type:"post",
		data:obj,
		//contentType:"application/json", // 指定这个协议很重要
	    dataType:'json',
		success:function(data){
			 $("#idcode1").find("option:not(:first)").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value='"+item.holderno+"'></option>")
					$opt.append(item.holdername);
					$("#idcode1").append($opt);
				}
				layui.use('form', function(){
					  var form = layui.form;
					  form.render();
				});
				
				
			}
		}
	})
}

//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				pagination(1,20,total);
				if(!first){
					pagination(page,limit,total);
				}
			}
		})
	})
}//end

//分页
function pagination(curr, limit, count) {
    var dep = document.getElementById("page")
    var departmentInfo = document.getElementsByTagName("table")
    var startRow = (curr - 1) * limit + 1 //每页显示第一条数据的行数
    var lastRow = curr * limit //每页显示最后一条数据的行数
    var totalRow = count;
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