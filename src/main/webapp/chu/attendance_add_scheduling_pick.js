/**
 * 按月排班,选择人员
 */	
$("#closeModel").click(function () {
			$("#divSelectLi").empty();
			$("#tenant-model-box").hide();
		});
			$(function(){
				$.ajax({
				url:url+'/KQ_Arrange/queryHolderData',
				type:"post",
				dataType:"json",
				success:function(data){
					if(data.flag!=false)
					{
						var specified = $(".specified");
						layer.msg(data.Reason,{icon:6,time:2000});
						var html="";
						$.each(data.result, function(i,val) {
							html+='<label style="margin-right: 10px;"><input type="checkbox" value="'+val.HolderNo+'" name="name" /><span>'+val.HolderName+'</span></label>';
						});
						specified.append(html);
					}else{
					   layer.msg(data.Reason,{icon:5,time:2000})
						
					}
				}
			})
				$(document).on("click",".confirm",function(e){
					var list=[]
					var vallist=[]
					for(var i=0;i<$("input:checkbox").length;i++){
						 if($("input:checkbox").eq(i).attr("checked")){
							list.push($("input:checkbox").eq(i).siblings().html())
							vallist.push($("input:checkbox").eq(i).val())
							/* localStorage.confirm=$("input:checkbox").eq(i).siblings().html(); */
							
						} 
						
					} 
					localStorage.confirm=list
					console.log(localStorage.confirm)
					localStorage.vallist=vallist
					console.log(localStorage.vallist)
				})
			});