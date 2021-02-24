$(function(){
})
 

//新增字典
$("#addBtn").click(function(){
	insert();
})
function insert(){//添加数据字典
	var typename=$("#typename").val();
	var name=$("#name").val();
	var value=$("#value").val();
	var entryname=$("#entryname").val();
	if(typename.length==0 || name.length==0 || value.length==0){
		layer.msg("带*号的不能为空！",{time:2000});
		return;
	}
	var obj={"typename":typename,"name":name,"value":value,"entryname":entryname};
	$.ajax({
		url:url+"/DictionaryData/insertDictionaryData",
		type:"POST",
		data:obj,
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}//end

$("#typename2").val(localStorage.typename);
$("#name2").val(localStorage.name);
$("#value2").val(localStorage.value);
$("#entryname2").val(localStorage.entryname);
//修改
$("#updateBtn").click(function(){
	updateDictionaryData();
});
function updateDictionaryData(){
	var datano=localStorage.datano;
	var typename=$("#typename2").val();
	var name=$("#name2").val();
	var value=$("#value2").val();
	var entryname=$("#entryname2").val();
	var obj={"datano":datano,"typename":typename,"name":name,"value":value,"entryname":entryname}
	$.ajax({
		url:url+"/DictionaryData/updateDictionaryData",
	    type:"POST",
	    data:obj,
	    success:function(data){
	    	console.log(data)
	    	if(data.flag){
	    		layer.msg(data.reason,{time:2000});
	    		window.top.$('.top-logo .title').html("玺瑞云智慧物联网平台("+value+")");
	    	}else{
	    		layer.msg(data.reason,{time:2000});
	    	}
	    	
	    }
	})
}//end

