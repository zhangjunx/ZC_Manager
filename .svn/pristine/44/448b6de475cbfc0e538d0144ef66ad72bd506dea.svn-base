layui.use(['laydate'], function () {
			var laydate = layui.laydate;
			//日期
			 laydate.render({
			    elem: '#test5'
			    ,type: 'datetime'
			    ,theme: '#393D49'
			  });
			   laydate.render({
			    elem: '#test6'
			    ,type: 'datetime'
			    ,theme: '#393D49'
			  });
			  laydate.render({
			    elem: '#test7'
			    ,type: 'datetime'
			    ,theme: '#393D49'
			  });
			   laydate.render({
			    elem: '#test8'
			    ,type: 'datetime'
			    ,theme: '#393D49'
			  });
		});
//var url="http://localhost:8080";		
		 $(function(){
		    	 $.ajax({
		    		 url:url+'/KQ_EvectionData/queryNoEvection',
		    		 type:'POST',
		    		 datatype:'JSON',
		    		 success:function(data){
                       if(data!=false){
                    	   layer.msg(data.Reason,{icon:6,time:1000});
                    		 var pro=$(".Splicing");
                          	 var html="";
                          	$.each(data.result,function(i,val){
                        		html+="<tr><td>"+val.evecno+"</td><td>"+val.holdername+"</td><td>"+val.locale+"</td><td>"+val.reason+"</td><td>"+val.deptname+"</td><td>"+val.applydate
                        		+'</td><td>'+val.begintime+'</td><td>'+val.endtime+'</td></tr>';
                        	});
             			    pro.append(html);
                    	   
                       }else{
                    	   layer.msg(data.Reason,{icon:5,time:1000});
                       }		
		    		 }
		    	 }) 
		     });
		     //分页
		     layui.use("laypage", function () {
		            var laypage = layui.laypage;
		            laypage.render({
		                elem: "test",
		                count: 20, //数据总数，从服务端得到
		                limit: 5,
		                jump: function (obj, first) {
		                    //obj包含了当前分页的所有参数
		                    console.log(obj) //得到当前页，以便向服务端请求对应页的数据。


		                    if (!first) {
		                        // do something
		                    }
		                }
		            })
		        })