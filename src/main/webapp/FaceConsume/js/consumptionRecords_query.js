$(function(){
	//初始化部门下拉菜单
	getDeptTree();
	//获取消费记录
	var date=new Date();
	var time=date.getTime();
	getConsumeList(time);
	layui.use('laydate', function(){
		var laydate = layui.laydate;
	    //执行一个laydate实例
		laydate.render({
		  elem: '#consumptionTime' 
		});
	});
})
//获取消费记录
function getConsumeList(time){
	$.ajax({
		url:url+"/consume/getConsumeList",
		type:"post",
		data:{"thisTime":time},
		success:function(data){
			console.log(data);
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
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
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