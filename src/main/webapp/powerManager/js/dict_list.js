$(function(){
	queryDictionaryDataList();
	getPage();
	showHide();//跟权限有关
})


var page;//设置首页页面
var limit;//设置每页显示的条数
var total;//总条数
//分页
function getPage(){
	layui.use("laypage", function () {
        var laypage = layui.laypage;
        laypage.render({
            elem: "test",
            count: total, //数据总数，从服务端得到
            limit: limit,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数
                page=obj.curr;//得到当前页，以便向服务端请求对应页的数据。
                limit=obj.limit;
                if (!first) {
                	queryDictionaryDataList();
                }
            }
        })
    })
}//end

//条件查询
$("#queryBtn").click(function(){
	queryDictionaryDataList();
	getPage();
})
function queryDictionaryDataList(){//查询数据字典列表
	var typename=$("#typename1").val();
	var value=$("#value1").val();
	var obj={"typename":typename,"value":value,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/DictionaryData/queryDictionaryDataListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data)
			$("#cont").empty();
			if(!data.flag){
				total=0;
				layer.msg(data.reason,{time:2000});
				return;
			}
			page=data.page;
			limit=data.limit;
			total=data.total;
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="18001"){
					list.push(item);
				}
			}
			var html="";
			var text="";
			if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 text="修改";
			  }else {
				 text="<a href='dict_update.html' class='mo layui-btn layui-btn-xs modify'>修改</a>";
			  }
			$.each(data.result,function(i,val){
				var datano=(val.datano==undefined?"":val.datano);
				var typename=(val.typename==undefined?"":val.typename);
				var name=(val.name==undefined?"":val.name);
				var value=(val.value==undefined?"":val.value);
				var entryname=(val.entryname==undefined?"":val.entryname);
			html+="<tr><td class='no-print'><span class='checkbox ' style='float:none' name='"+datano+"'></span></td><td>"+typename
				+"</td><td>"+name+"</td><td>"+value+"</td><td>"+entryname
				+"</td><td class='center no-print'>"+text+"</td></tr>";
			})
			$("#cont").append(html);	
		}
	})
}//end


//复选
$(document).on('click', '.checkbox', function () {
    if ($(this).attr("id") == "selectAll") { // 全选
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
           	var str=$("#cont").children().find("span.curr")
           	if(arr.length==str.length){
           		$('#selectAll').addClass('curr');
           	}
        }
    }
})//end

//修改字典
 $(document).on("click", ".modify", function() {
	var datano=$(this).parent().siblings().eq(0).find("span").attr("name");
	var typename=$(this).parent().siblings().eq(1).text();
	var name=$(this).parent().siblings().eq(2).text();
	var value=$(this).parent().siblings().eq(3).text();
	var entryname=$(this).parent().siblings().eq(4).text();
	localStorage.datano=datano;
	localStorage.typename=typename;
	localStorage.name=name;
	localStorage.value=value;
	localStorage.entryname=entryname;
 });


//跟权限有关
function showHide(){
		var arrList=window.top.arr;
		if(window.top.arr.length==0){
			return;
		}
		$("#addBtn").hide();
		$("#delBtn").hide();
		$("#printBtn").hide();
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="18001"){
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
			if(item.Code=="print"){
				$("#printBtn").show();
			}
		}
}// end




/**
 * 导出Excel
 */
$("#exportBtn").click(function(){
    var table1 = document.querySelector("#dayindaju1");
    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
    openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
});