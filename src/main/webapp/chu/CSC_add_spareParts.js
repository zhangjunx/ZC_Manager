   //添加方法
   $("#insertProductBtn").click(function(){
	 var itemcode =  $("#itemcode1").val();
	 var itemname = $("#itemname1").val();
	 var spec = $("#spec1").val();
	 var type  = $("#type1").val();
	 var unitname =	$("#unitname1").val();
	 var itemtype =	$("#itemtype1").val();
	 var remark = $("#remark1").val(); 
	 var obj = {"itemcode":itemcode,"itemname":itemname,"type":type,"unitname":unitname,"itemtype":itemtype,"remark":remark,"spec":spec};
	if(itemcode=="" || itemname=="" || spec=="" || type=="" || unitname==""){
		alert("请输入必填项");
	}else{
		$.ajax({
			url:url+'/SparePartsData/insertSparePartsData', 
			type:'post',
			data:obj,
			dataType:'json',
			success:function(data){
				if(data.flag==true){
					window.location.href=document.referrer;
				}else{
					$("#msg").append(data.reason);
				}
			  }
		    })
	   }
   })
   
