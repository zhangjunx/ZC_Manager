$(function(){
	getTableData();
})

function getTableData(){
	$.ajax({
		url:url+'/KQ_Arrange/getDoorList',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log(data);
			//添加表格数据
			addTableData(data);
		},
		error:function(data){
			console.log(data);
		}
	})
}

//添加表格数据
function addTableData(data){
	var html='';
	var useredAreaID=[];
	for(var i=0;i<data.result.length;i++){
		var AreaName=(data.result[i].AreaName==undefined?"":data.result[i].AreaName);
		var trHtml = '<tr>';
		var areaID = data.result[i].AreaID;
		var doorCheck='';
		
		if(useredAreaID.indexOf(areaID) != -1){
			continue;
		}
		useredAreaID.push(areaID);
		for(var j=0;j<data.result.length;j++){
			if(data.result[j].AreaID == areaID){
				doorCheck = doorCheck+'<span class="checkbox" id="doorNo'+data.result[j].DoorNo+'" style="width:20%;text-align:left" value='+data.result[j].DoorNo+'>'+data.result[j].DoorName+'</span>';
			}
		}
		
		trHtml = trHtml + '<td>'+AreaName+'</td>';
		trHtml = trHtml + '<td>'+doorCheck+'</td></tr>';
		html = html+trHtml
	}
	$("#cont1").empty();
	$("#cont1").append(html);
	$.ajax({
		url:url+"/DoorUnit/queryDoorUnit",
		type:"POST",
		async:false,
		success:function(data){
			if(data.flag){
				var res=data.result;
				for(var item of res){
					if(item.enable=="20"){
						$("#doorNo"+item.doorno).addClass("curr");
					}
				}
			}
		}
	})
}


//点击选中复选框
$(document).on("click","#cont1 span.checkbox",function(){
	var doorno=$(this).attr("value");
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		 var obj={"enable":10,"doorno":doorno};
		 $.ajax({
			 url:url+"/DoorUnit/updateEnable",
		 	 type:"post",
		 	 data:obj,
		 	 success:function(data){
		 		//console.log(data);
		 		 
		 	}
		 })
	}else{
		$(this).addClass("curr");
		 var obj={"enable":20,"doorno":doorno};
		 $.ajax({
			 url:url+"/DoorUnit/updateEnable",
		 	 type:"post",
		 	 data:obj,
		 	 success:function(data){
		 		//console.log(data);
		 	}
		 })
	}
})

