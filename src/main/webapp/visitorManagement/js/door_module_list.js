$(function(){
	//getDeptTree();//查询部门
	//getDoorTree();
	showHide();//跟权限有关
	//nowDate();
	getDoorArrList();
    getPage();//分页相关
	//日期
	layui.use("laydate", function() {
        var laydate = layui.laydate
        lay('.date').each(function() {
			laydate.render({
				elem: this,
				trigger: 'click'
			});
		});
        lay('.ipt').each(function() {
			laydate.render({
				elem: this,
				type: 'time',
				trigger: 'click'
			});
		});
     })
})

function nowDate(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	$("#date1").val(year+"-"+month+"-"+day);
	
}
 
var page;
var limit;
var total;
 //分页相关
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,
			limit:limit,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					getDoorArrList();
				}
			}
		})
	})	
}//end

//条件查询
$("#queryBtn").click(function(){
	getDoorArrList();
	getPage();
}); 
function getDoorArrList(){
	var type=$("#type").val();
	var name=$("#name").val();
	var obj={"type":type,"name":name,"pageIndex":page,"pageSize":limit};
	console.log(obj)
	$.ajax({
		url:url+"/DoorArrModule/getDoorArrListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(!data.flag){
				total=0;
				layer.msg(data.reason,{time:3000});
				return;
			}
			page=data.page;
			limit=data.limit;
			total=data.total;
			var html="";
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="5007"){
					list.push(item);
				}
			}
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var name=(val.name==undefined?"":val.name);
				var doorarr=(val.doorarr==undefined?"":val.doorarr);
				var type=(val.type==undefined?"":val.type);
				var updateperson=(val.updateperson==undefined?"":val.updateperson);
				var updatedate=(val.updatedate==undefined?"":val.updatedate);
				var typename="";
				if(type=='V'){
					typename="访客";
				}else if(type=='H'){
					typename="员工";
				}else{
					typename="其它";
				}
				
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a href='door_module_update.html?id=0' class='layui-btn layui-btn-xs  updata' data-id='"+id+"' data-type='"+type+"'>修改</a>";
				  }
				 
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 text2="";
				  }else {
					 text2="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-danger del' data-id='"+id+"'>删除</a>";
				  }
				 
				 if(text1==""&&text2==""){
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
					 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				 }
				html+="<tr><td class='no-print'><span class='checkbox' style='float:none' data-id='"+id+"'></span></td><td>"+id
				+"</td><td>"+name
				+"</td><td>"+doorarr
				+"</td><td>"+typename
				+"</td><td>"+updateperson
				+"</td><td>"+updatedate
				+"</td><td>"+text1+text2+"</td></tr>";
			})
			$("#cont").append(html);
		}
	})	
}//end

//批量删除
$("#delBtn").click(function(){
	var arr=[];
	var cks=$("#cont").children().find("span.curr");
	for(i=0;i<cks.length;i++){
		//var holderno=cks.eq(i).parent().siblings().eq(0).html();
		var id=cks.eq(i).attr("data-id");
		arr.push(id);
	}
	console.log(arr)
	if(arr.length==0){
		layer.msg("请先选中要删除的行！");
		return;
	}
	deleteBatch(arr);
})

 

//行内删除
$(document).on("click",".del",function(){
	var id=$(this).attr("data-id");
	var arr=[];
	arr.push(id);
	deleteBatch(arr);
})
//删除
function deleteBatch(arr){
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
	$.ajax({
		url:url+"/DoorArrModule/deleteBatch",
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		async:false,
		success:function(data){
			layer.msg(data.reason,{time:2000},function(){
				getDoorArrList();
				getPage();
			})
		}
	})
	})
}

//查询人员列表
function queryHolderNoList(deptno){
    var obj={"departmentno":deptno};
    $.ajax({
        url:url+"/HolderData/queryHolderDataListByDepartmentNo",
        type:"POST",
        dataType:"json",
        data:obj,
        success:function(data){
        	console.log(data)
         $(".holder").find("option:not(:first)").remove();
         if(!data.flag){
        	 return;
          }
         var html="";
         $.each(data.result,function(i,val){
             var holderno=(val.holderno==undefined?"":val.holderno);
             var holdername=(val.holdername==undefined?"":val.holdername);
              html+="<option value='"+holderno+"'>"+holdername+"</option>";
          })
       $(".holder").append(html);	
      }
  })  	
}//end

//复选
$(document).on('click', '.checkbox', function () {
	if ($(this).attr("id") == "selectAll") { //全选
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').removeClass('curr');
            })
        } else {
            $(this).addClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').addClass('curr');
            })
        }
    } else {
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $('#selectAll').removeClass('curr');
        } else {
            $(this).addClass('curr');
            var arr=$("#cont").children().find("span.checkbox")
           	var str=$("#cont").children().find("span.curr");
           	if(arr.length==str.length){
           		$('#selectAll').addClass('curr');
           	}
        }
    }           	
})//end

//初始化树菜单
function getDoorTree(){
	$.ajax({
		url:url+"/DoorUnit/getDoorTree",
		data:{"res":"true"},
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log("---"+data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#doortree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node.data.id)
			        	$("#doorno").val(node.data.id.substring(1));
			        	$("#doorname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='doorno']").val(node.id);
			        }
			    
			    });
			   /* $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });*/
			});
		
		},
		error:function(data){}
	})
}


//更新
$(document).on("click",".updata",function(){
	var id=$(this).attr("data-id");
	var type=$(this).attr("data-type");
	var name = $(this).parent().siblings().eq(2).text();
	var doorarr = $(this).parent().siblings().eq(3).text();
	var typename = $(this).parent().siblings().eq(4).text();
	localStorage.id=id;
	localStorage.name=name;
	localStorage.type=type;
	localStorage.typename=typename;
	localStorage.doorarr=doorarr;
});


//区域下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		data:{"res":"true"},
		dataType:'json',//数据类型
		//contentType:"application/json",
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node.data.id)
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			            queryHolderNoList(node.data.id);
			        }
			    
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });
			});
		
		},
		error:function(data){}
	})
}

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#addBtn").hide();
		$("#delBtn").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="5007"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#addBtn").show();
			}
			if(item.Code=="delete"){
				$("#delBtn").show();
			}
		}
	}