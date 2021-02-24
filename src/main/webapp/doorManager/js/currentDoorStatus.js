$(function(){
	//初始化门区列表
	//var obj={"doorStatus":$('input[name="doorStatus"]:checked').val()};
	initDoorList();
	initRefresh();
	$('.grid').masonry({
		  columnWidth: 20,
		  itemSelector: '.grid-item'
	});
})
$(document).mousemove(function(event){
	var x=event.clientX; 
	var y=event.clientY;//监听鼠标位置;
	if(y<85&&x>1700){
		//弹出关闭按钮
		$(".closeYeMian").css({
			"top":"12px",
			"transition":"all 0.5s ease"
		})
	}else{
		$(".closeYeMian").css({
			"top":"-100px",
			"transition":"all 0.5s ease"
		})
	}
})
$(".closeYeMian").click(function(){
	parent.layer.closeAll();
})


//初始化门区列表（全部）
function initDoorList(){
	$.ajax({
		url:url+'/meetingRoom/getDoorList',
		dataType:'json',//数据类型
		type:'POST',//类型
		async: false,
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result;
				var areaList=[];
				for(var i=0;i<res.length;i++){
			    	if(res[i].AreaID!=undefined){
			    		var obj={
				    			"areaid":res[i].AreaID,
				    			"areaname":res[i].AreaName
				    	}
			    		areaList.push(obj);
			    	}
			    }
				var  hash = {}; 
				areaList = areaList.reduce((preVal, curVal) => {
					hash[curVal.areaid] ? '' : hash[curVal.areaid] = true && preVal.push(curVal); 
					return preVal 
				}, [])
				console.log(areaList);
				for(var i=0;i<areaList.length;i++){
					var $div1=$("<div class='grid-item'></div>");
					var $div2=$("<div class='layui-card'><div class='layui-card-header'><h4 class='con_title'>"+areaList[i].areaname+"</h4>" +
							"<div class='con_doorOpen'><img src='img/item_doorOpen.png'>门开:<span class='doorOpenNumber'>5</span></div>" +
							"<div class='con_doorClose'><img src='img/item_doorClose.png'>门关:<span class='doorCloseNumber'>7</span></div></div></div>");
					var $div3=$("<ul class='layui-card-body'></ul>");
					$div2.append($div3);
					$div1.append($div2);
					for(var k=0;k<res.length;k++){
						if(areaList[i].areaid==res[k].AreaID){
							if(res[k].IOSTatus==1){//门关
								var doorImg="<img src='img/areaDoorOpen.png'>";
							}else if(res[k].IOSTatus==2){//门开
								var doorImg="<img src='img/areaDoorClose.png'>";
							}
							var $li=$("<li class='layui-inline' title='"+res[k].DoorName+"'>"+doorImg+"<p class='layui-elip'>"+res[k].DoorName+"</p></li>");
							$div3.append($li);
						}
					}
					$(".grid").append($div1);
				}
			}
		    
		},
		error:function(data){
			
		}
	})
}

function initRefresh(){
	//定时刷新
	setInterval(function(){
		var obj={"doorStatus":$('input[name="doorStatus"]:checked').val()};
		getDoorList();
	},1000)
}

//获取变化的门区数据列表1
function getDoorList(){
	$.ajax({
		url:url+'/doorStatus/getDoorStatusData',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log(data);
		},
		error:function(data){
			
		}
	})
}