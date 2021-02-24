$(function() {
	//查询卡信息
	queryCardInfor();
	showHide();
    //复选
    /*$(document).on('click', '.checkbox', function() {
        if ($(this).parents('tr').index() == 0) { //全选
            if ($(this).hasClass('curr')) {
                $(this).removeClass('curr');
                $(this).parents('tr').nextAll().each(function() {
                    $(this).find('span.checkbox').removeClass('curr');
                })
            } else {
                $(this).addClass('curr');
                $(this).parents('tr').nextAll().each(function() {
                    $(this).find('span.checkbox').addClass('curr');
                })
            }
        } else {
            if ($(this).hasClass('curr')) {
                $(this).removeClass('curr');
                $('#selectAll').removeClass('curr');
            } else {
                $(this).addClass('curr');
            }
        }
    })
*/
//查询卡信息
function queryCardInfor(){
	$.ajax({
        type: "post",
        url: url + "/card/queryCardInfor",
        dataType: "json",
        success: function(data) {
        	console.log(data);
        	var res=data.result;
           if(data.flag){
        	   createTable(res);
           }else{
        	   layer.msg(data.reason,{time:2000});
           }
           
        },
        error: function(data) {
            console.log("error")
        }

    })
}

    //点击卡号删除
    $(document).on("click","span.patrolfield",function(){
    	var nid=$(this).attr("data-nid");
    	layer.confirm("确定删除?",{title:"提示信息"},function(index){
     	   layer.close(index);
     	   $.ajax({
                type: "post",
                url: url + "/card/deleteCardInfor",
                dataType: "json",
                data: {
                    "nid": nid
                },
                success: function(data) {
                    console.log(data)
                    if(data.flag){
                    	layer.msg("删除成功!",{time:1000},function(){
                    		window.location.reload();
                    	})
                    }else{
                 	   layer.msg(data.reason,{time:2000});
                    }
                },
                error: function(data) {
                    console.log("error")
                }
            });
        })
    })

    // 批量删除
    /*$(document).on("click", ".orange", function() {

        var pl = $(".grade").find(".curr")
        console.log(pl)

        for (var i = 0; i < pl.length; i++) {
            // var pls = pl[i]
            // pls.parentNode.parentNode.remove()
            pl[i].parentNode.parentNode.remove()

        }
    })*/

    // createTable()

    // 创建表格
    function createTable(data) {
        let $tab = $("<table class='grade'></table>");
        let $tr = $("<tr></tr>");
        let $th = $(
            "<td width='80'>路线名称</td><td  width='80'>路线节点个数</td> <td width='100'>卡号</td>"
        );
        $tab.append($tr);
        $tr.append($th);
        for (let i = 0; i < data.length; i++) {
            let $tr1 = $("<tr></tr>")
            let $td3 = $(" <td>"+data[i].routename+"</td>");
            let $td4 = $("<td class='center'></td>");
            let $td6=$("<td >"+data[i].placeseveral+"</td>")
            for(var item of data[i].child){
            	 var  $span = $("<span class='patrolfield' data-nid='"+item.nid+"'><p>卡号:"+item.cardno+"</p><p>姓名:"+item.holdername+"</p></span>");
                 $td4.append($span)
            }
            //$tr1.append($td1);
            $tr1.append($td3);
            $tr1.append($td6);
            $tr1.append($td4);
            /*$tr1.append($td5);*/
            $tab.append($tr1);
        }
        $(".main-table").append($tab);
    }

});

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertCard").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="10002"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertCard").show();
			}
		}
	}