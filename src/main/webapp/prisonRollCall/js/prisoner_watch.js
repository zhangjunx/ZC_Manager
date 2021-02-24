$(function(){
	getOnePrison();
})
function getOnePrison(){
	$.ajax({
		url:url+"/prisoner/getOnePrison",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result;
				var inStartTime=timestampToTime(res.inStartTime);
				var startTime=timestampToTime(res.startTime);
				var endTime=timestampToTime(res.endTime);
				if(res.status==1){
					var st="在押";
				}else if(res.status==2){
					var st="释放";
				}
				$("#prisonerName").val(res.prisonerName);
				$("#prisonerName2").val(res.prisonerName2);
				$("#sex").val(res.sex);
				$("#age").val(res.age);
				$("#IDCard").val(res.IDCard);
				$("#nationality").val(res.nationality);
				$("#nation").val(res.nation);
				$("#homeLocal").val(res.homeLocal);
				$("#skill").val(res.skill);
				$("#political").val(res.political);
				$("#graduationSchool").val(res.graduationSchool);
				$("#major").val(res.major);
				$("#marriage").val(res.marriage);
				$("#prisonID").val(res.prisonName);
				$("#inStartTime").val(inStartTime);
				$("#inReason").val(res.inReason);
				$("#arrestingOrgan").val(res.arrestingOrgan);
				$("#judgmentOrgan").val(res.judgmentOrgan);
				$("#startTime").val(startTime);
				$("#endTime").val(endTime);
				$("#status").val(st);
				if(res.photoBase64!=undefined){
					$("#digitalPhoto").attr("src","data:image/png;base64,"+res.photoBase64);
				}
			}
		}
	})
}
//时间戳转换日期
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10?"0"+date.getDate():date.getDate() + ' ';
    return Y+M+D;
}
//url地址解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
