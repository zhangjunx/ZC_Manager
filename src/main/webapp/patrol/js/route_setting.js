$(function() {
	//查询所有路线
	queryRouteAndNode();
	showHide();
	
	var page=1;//当前页
	var limit=20;//每页显示条数
	var total;
	//分页
	function getPage(total){
		layui.use("laypage",function(){
			var laypage=layui.laypage;
			laypage.render({
				elem:"test1",
				limit:limit,//每页显示条数
				count:total,//总条数
				layout:['count','prev','page','next','limit','refresh','skip'],
				jump:function(obj,first){
					pagination(page,limit,total);
					page=obj.curr;
					limit=obj.limit;
					if(!first){
						pagination(page,limit,total);
					}
				}
			})
		})
	}//end
   
//指派给谁弹出层
$('.main-content').on('click', '.main-tab .btn-box .addMain', function() {
    layer.open({
    	type:2,
    	content:"layer_route_name.html",
    	area:["500px","200px"],
    })
});
//点击删除
$(document).on("click",".delete",function(){
    	var routeid=$(this).parent().siblings().eq(0).html();
    	console.log(routeid);
    	layer.confirm("确定删除?",{title:"提示信息"},function(index){
    		layer.close(index);
    		$.ajax({
    	        type: "post",
    	        url: url + "/route/deleteRouteNodeAndRoute",
    	        dataType: "json",
    	        data:{"routeid":routeid},
    	        success: function(data) {
    	          console.log(data);
    	          if(data.flag){
    	        	  layer.msg("删除成功!",{time:2000},function(){
    	        		  window.location.reload();
    	        	  });
    	          }else{
    	        	  layer.msg(data.reason,{time:2000});
    	          }
    	        }
    	    })
    	})
    	 
})//end
    
//查询所有路线
function queryRouteAndNode(){
    	$.ajax({
            type: "post",
            url: url + "/route/queryRouteAndNode",
            dataType: "json",
            success: function(data) {
              console.log(data)
              res=data.result;
              if(data.flag){
            	  createTable(res);
              }else{
            	  layer.msg(data.reason,{time:2000});
              }
            }
        })//end
}

// 创建表格
function createTable(data) {
	var list=[];
	for(var item of window.top.arr){
		if(item.ModelCode=="10001"){
			list.push(item);
		}
	}
        let $tab = $("<table class='grade'></table>");
        let $tr = $("<tr></tr>");
        let $th = $(
            "<td width='40'>编号</td> <td width='80'>路线名称</td> <td width='100'>节点名称</td><td width='100'>操作</td>"
        );
        $tab.append($tr);
        $tr.append($th);
        var text1="";
        var text2="";
        for (let i = 0; i < data.length; i++) {
        	if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
   			     text1="";
	   		 }else {
	   			 text1="<a href='route_setting_bianji.html?routeid="+data[i].routeid+"' data-routeid='"+data[i].routeid+"' class='update layui-btn layui-btn-xs'>编辑</a>";
	   		 }
	   		 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
	   			 text2="";
	   		  }else {
	   			 text2="<a href='javascript:;' class='delete layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
	   		  }
	   		 if(text1==""&&text2==""){
	   			text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>编辑</a>";
	   			text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
	   		 }
            let $tr1 = $("<tr></tr>");
            let $td2 = $("<td class='center'></td>");
            let $td3 = $(" <td></td>");
            let $td4 = $("<td class='center'></td>");
            let $td5 = $(
                "<td class='center operation-box' width='80'>"+text1+text2+"</td>"
            )
            $td3.append(data[i].routename);
            $td2.append(data[i].routeid);
            $tr1.append($td2);
            $tr1.append($td3);
            $tr1.append($td4);
            $tr1.append($td5);
            $tab.append($tr1);
            for (let j = 0; j < data[i].child.length; j++) {
                let $span = $("<span class='field'></span>");
                $span.append(data[i].child[j].doorname);
                $td4.append($span);
            }
        }
        $tab.insertBefore($("#test1"));
        $("tbody").attr("id","page");
        getPage(data.length);
}
    
    
    
    
// 分页
function pagination(curr, limit, count) {
         var dep = document.getElementById("page")
         startRow = (curr - 1) * limit + 1 //每页显示第一条数据的行数
         lastRow = curr * limit //每页显示最后一条数据的行数
         var totalRow = count
         lastRow = (lastRow > totalRow) ? totalRow : lastRow //如果最后一页的最后一条数据显示的行数大于总数，那么就让最后一条的行数等于总条数
         for (var i = 1; i < totalRow + 1; i++) { //遍历数据
             var hrow = dep.rows[i]
             if (i >= startRow && i <= lastRow) {
                 hrow.style.display = ""
             } else {
                 hrow.style.display = "none"
             }
         }
}
});

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertRoute").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="10001"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertRoute").show();
			}
		}
	}