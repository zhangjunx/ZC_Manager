$(function(){
	//查询会议室详情
	getOneRoomOnfo(getQueryString("meetingno"));
	//获取一条信息，回显
	function getOneRoomOnfo(meetingno){
		if(meetingno == null || meetingno == '' || meetingno == 'undefined'){
			return;
		}
		$.ajax({
			url:url+'/meetingRoom/getOneRoomInfo?fno='+meetingno,
			dataType:'json',//数据类型
			type:'POST',//类型
			success:function(data){
				var res=JSON.parse(data.result);
				//根据查询的结果为表单赋值
				setFormValue(res);
			},
			error:function(data){
				console.log(data);
			}
		})
	}

	//为表单赋值
	function setFormValue(data){
		//输入框赋值
		$("#meetingRoomNo").html(data.roomno);
		$("#meetingRoomTitle").html(data.roomname);
		$("#meetingRoomLocation").html(data.roomplace);
		$("#meetingRoomPersons").html(data.roomsize);
		$("#meetingRoomRemark").html(data.remark);
		//物品赋值
		if(data.goodslist != undefined){
			var value="";
			for(var i=0;i<data.goodslist.length;i++){
				value+=data.goodslist[i].value+"&nbsp;&nbsp;";
			}
			$("#meetingRoomThings").html(value);
		}
		
		//会议签到点赋值
		if(data.signinlist != undefined){
			var value="";
			for(var i=0;i<data.signinlist.length;i++){
				value+=data.signinlist[i].DoorName+"&nbsp;&nbsp;";
			}
			$("#meetingSignIn").html(value);
		}
		//会议签退点赋值
		if(data.signbacklist != undefined){
			var value="";
			for(var i=0;i<data.signbacklist.length;i++){
				value+=data.signbacklist[i].DoorName+"&nbsp;&nbsp;";
			}
			$("#meetingSignBack").html(value);
		}
		
		//状态
		if(data.status=="0"){
			$("#meetingRoomStatus").html("关闭");
		}else if(data.status=="1"){
			$("#meetingRoomStatus").html("开启");
		}
	}
	
	
	//获取页面跳转参数
	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if ( r != null ){
	       return decodeURI(r[2]);
	    }else{
	       return null;
	    } 
	}

})