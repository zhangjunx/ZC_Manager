$(function(){
	queryWeekZoneListById(getUrlParam("id"));
})

//分割数组
function spArray(N,Q){
	var R = [],F;
	for (F = 0;F < Q.length;) {
		R.push(Q.slice(F,F += N))
	}
	return R
}
//从url地址解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
//获取一条数据
function queryWeekZoneListById(id){
	$.ajax({
		url:url+"/DoorPermHolderRecord/query",
		type:"post",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.flag){
				var res=data.result;
				var obj={
							"weekzone":res.weekzone1+";"+res.weekzone2+";"+res.weekzone3+";"+res.weekzone4+";"+res.weekzone5+";"+res.weekzone6+";"+res.weekzone7
						}
					var list=obj.weekzone.split(";");
					list=list.join("-");
					var array=list.split("-");
					for(var i=0;i<array.length;i++){
						if(array[i]==""){
							$(".ipt").eq(i).val("00:00");
						}else{
							$(".ipt").eq(i).val(array[i]);
						}
					}
			}
		}
	})
}

