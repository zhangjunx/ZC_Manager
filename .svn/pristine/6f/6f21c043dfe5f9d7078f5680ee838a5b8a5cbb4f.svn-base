$(function(){
	//进出记录查询
	queryVehicleIORecordListByPage();
	getPage();
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  //常规用法
				laydate.render({
					elem: "#entryDate",
					trigger: 'click'
				});
				lay(".date").each(function(){
					laydate.render({
						elem: this,
						type:"time",
						trigger: 'click'
					})
				})
	})	
})
var page;
var limit;
var total;
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
                page=obj.curr; //obj包含了当前分页的所有参数
                limit=obj.limit;
                if (!first) {
                	queryVehicleIORecordListByPage();
                }
            }
        })
	})
}//end	
	
	//点击搜索
	$("#queryIORecordListBtn").click(function(){
		queryVehicleIORecordListByPage();
		getPage();
	})
	//进出记录查询
	function queryVehicleIORecordListByPage(){
		var license=$("#carNumber").val();
		var vehicleuse=$("#carName").val();
		var iodate=$("#entryDate").val();
		var starttime=$("#inTime").val();
		var endtime=$("#outTime").val();
		var  rclocation=$("#entryLocation").val();
		var vehicletype=$("#carType").val();
		var obj={"license":license,"vehicleuse":vehicleuse,
				"iodate":iodate,"starttime":starttime,
				"endtime":endtime,"rclocation":rclocation,
				"vehicletype":vehicletype,"pageIndex":page,"pageSize":limit}
		console.log(obj)
		$.ajax({
			url:url+"/LPR_VehicleIOData/queryVehicleIORecordListByPage",
			type:"POST",
			data:JSON.stringify(obj),
			dataType:"json",
			contentType:"application/json",
			async:false,
			success:function(data){
				$("#cont").empty();
				console.log(data);
				if(!data.flag){
					layer.msg("查询失败，暂无数据可查！",{time:2000})
					total=0;
					return;
				}
				page=data.pageinfo.pageIndex;
				limit=data.pageinfo.pageSize;
				total=data.pageinfo.sumCount;
				var html="";
				$.each(data.result,function(i,val){
					var vehicleuse=(val.vehicleuse==undefined?"":val.vehicleuse);
					var userunit=(val.userunit==undefined?"":val.userunit);
					var vehicletype=(val.vehicletype==undefined?"":val.vehicletype);
					var license=(val.license==undefined?"":val.license);
					var lprtype=(val.lprtype==undefined?"":val.lprtype);
					var vehiclecolor=(val.vehiclecolor==undefined?"":val.vehiclecolor);
					var rclocation=(val.rclocation==undefined?"":val.rclocation);
					var iodate=(val.iodate==undefined?"":val.iodate);
					var iotime=(val.iotime==undefined?"":val.iotime);
					var iodatastatus=(val.iodatastatus==undefined?"":val.iodatastatus);
					var photograph=(val.photograph==undefined?"":val.photograph);
					if(iodatastatus==12){
						iodatastatus="外出";
					}else if(iodatastatus==11){
						iodatastatus="进入";
					}else{
						iodatastatus="无效刷卡";
					} 
					if(photograph.length==0){
						var p="<img src='img/che.png' style='width:86px;height:86px;'>";
					}else{
						var p="<img src='data:image/png;base64,'+photograph style='width:86px;height:86px;'>";
					}
					html+="<tr><td>"+(i+1)+"</td><td>"+vehicleuse+"</td><td>"+userunit+"</td><td>"+p
					+"</td><td>"+vehicletype+"</td><td>"+license+"</td><td>"+lprtype
					+"</td><td>"+vehiclecolor+"</td><td>"+rclocation
					+"</td><td>"+iodate+"</td><td>"+iotime+"</td><td>"+iodatastatus+"</td></tr>";
				})
				$("#cont").append(html);
				}
		})
}//end
