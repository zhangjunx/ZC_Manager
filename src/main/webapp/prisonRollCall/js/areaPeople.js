$(function(){
	getDate();
	getTimeMoldelList();
	initAreaChart();
	layui.use("laydate", function() {
        var laydate = layui.laydate
        lay('.test-item').each(function() {
			laydate.render({
				elem: this,
				type:"date",
				trigger: 'click'
			});
		});
    })
})
//点击搜索
$("#queryPrisonerByConditionBtn").click(function(){
	if($(".main-tab .curr a").html()=="区域点名分布"){
		initAreaChart();
	}else{
		initPrisonChart();
	}
})
function getDate(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	month=month<10?"0"+month:month;
	day=day<10?"0"+day:day;
	$("#startTime").val(year+"-"+month+"-"+day);
}
//初始化时间模板下拉框
function getTimeMoldelList(){
	$.ajax({
		url:url+"/callTimesModel/getTimeMoldelList",
		type:"post",
		success:function(data){
			$(".timeTemplate option").find("not:first").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value="+item.fid+">"+item.modelName+"</option>");
					$(".timeTemplate").append($opt);
				}
			}
		}
	})
}
//点击选项卡
$(".main-tab .label").click(function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	if($(this).index()==0){
		initAreaChart();
		$(".areaPeople").show();
		$(".areaPeople_right").show();
		$(".prisonPeople").hide();
	}else if($(this).index()==1){
		initPrisonChart();
		$(".prisonPeople").show();
		$(".areaPeople").hide();
		$(".areaPeople_right").hide();
	}
})
//初始化区域图表
function initAreaChart(){
	 var myChart = echarts.init(document.getElementById('areaPeopleSpread'));
	 var myChart1 = echarts.init(document.getElementById('pieChart'));
	 var satrtTime=$("#startTime").val();
	 var obj={"optType":1,"satrtTime":satrtTime};
	 var dateTime=(satrtTime);
	 $.ajax({
		 url:url+"/prisonCallRecord/getDistribution",
		 type:"post",
		 data:obj,
		 async:false,
		 success:function(data){
			 console.log(data)
			 if(data.flag){
				 var arr1=[];
				 var arr2=[];
				 var arr3=[];
				 for(var item of data.result){
					 arr1.push(item.areaName);
					 arr2.push(item.sum);
					 arr3.push({"value":item.sum,"name":item.areaName});
				 }
				   //柱状图
				    var option = {
				        title: {                                
				                 text: dateTime,                
				                 textStyle:{                 //---主标题内容样式    
				                     color:'#666'
				                 },
				                 x:'center'
				             },
				        legend: {
				            bottom: 10,
				            textStyle: {
				                color: "#666"
				            }
				        },
				        tooltip: {},
				        xAxis: {
				            type: 'category',
				            axisLine: { //这是x轴文字颜色
				                lineStyle: {
				                    color: "#666",
				                }
				            },
				            data:arr1,
				        },
				        yAxis: {
				            type: 'value',
				            //设置坐标轴字体颜色和宽度
				            axisLine: { //这是y轴文字颜色
				                lineStyle: {
				                    color: "#666",
				                }
				            }
				        },
				        series: [
				            { 	
				            	name:"已点名",
				            	type: 'bar',
				            	barWidth:'40',  
				            	itemStyle:{                 //---图形形状
				                    color:'skyblue',
				                },
				                label:{
				                	normal:{
				                		show:true,
				                    	position:"top",
				                    	textStyle:{
				                    		color:"black",
				                    		fontSize:16
				                    	}
				                    }
		                    		
		                    	},
				                data:arr2
				            },
				        ]
				    };
				    myChart.clear();
			 myChart.setOption(option);
			 var option1 = {
			 		 title:{
			              text:dateTime,
			              x:'center'
			          },
			 	    tooltip: {
			 	        trigger: 'item',
			 	        formatter: '{a} <br/>{b}: {c} ({d}%)'
			 	    },
			 	    legend: {
			 	        orient: 'vertical',
			 	        right: 40,
			 	        data: arr1
			 	    },
			 	    series: [
			 	        {
			 	            name: '访问来源',
			 	            type: 'pie',
			 	            radius: ['50%', '70%'],
			 	            avoidLabelOverlap: false,
			 	            label: {
			 	                show: false,
			 	                position: 'center'
			 	            },
			 	            emphasis: {
			 	                label: {
			 	                    show: true,
			 	                    fontSize: '30',
			 	                    fontWeight: 'bold'
			 	                }
			 	            },
			 	            labelLine: {
			 	                show: false
			 	            },
			 	            data:arr3,
			 	           itemStyle:{ 
						        normal:{ 
						           label:{ 
						              show: true, 
						              formatter: '{b} : {c} ({d}%)' 
						              }, 
						              labelLine :{show:true} 
						              } 
						         } 
			 	        }
			 	    ]
			 	};
			 myChart1.clear();
			 myChart1.setOption(option1);
			 }else{
				 myChart1.clear();
				 myChart.clear();
			 }
		 }
	 })

}
//初始化监区图表
function initPrisonChart(){
	 var myChart2 = echarts.init(document.getElementById('prisonChart'));
	 var satrtTime=$("#startTime").val();
	 var obj={"optType":2,"satrtTime":satrtTime};
	 var dateTime=(satrtTime);
	 $.ajax({
		 url:url+"/prisonCallRecord/getDistribution",
		 type:"post",
		 data:obj,
		 async:false,
		 success:function(data){
			 console.log(data);
			 if(data.flag){
				 var arr1=[["product","已点名","未点名"]];
				 for(var item of data.result){
					 var list=[item.prisonName,item.callSum,item.disCallSum];
					 arr1.push(list);
				 }
				//柱状图
				    var option2 = {
				    		 title: {                                
				                 text: dateTime,                
				                 textStyle:{                 //---主标题内容样式    
				                     color:'#666'
				                 },
				                 padding:[0,0,100,150]               //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
				             },
				        legend: {
				            bottom: 10,
				            textStyle: {
				                color: "#666"
				            }
				        },
				        tooltip: {},
				        dataset: {
				            source:arr1
				        },
				        xAxis: {
				            type: 'category',
				            axisLine: { //这是x轴文字颜色
				                lineStyle: {
				                    color: "#666",
				                }
				            }
				        },
				        yAxis: {
				            type: 'value',
				            //设置坐标轴字体颜色和宽度
				            axisLine: { //这是y轴文字颜色
				                lineStyle: {
				                    color: "#666",
				                }
				            }
				        },
				        series: [
				            { 
				            	type: 'bar',
				            	barWidth:'40',  
				            	itemStyle:{                 //---图形形状
				                    color:'skyblue',
				                },
				                label:{
				                	normal:{
				                		show:true,
				                    	position:"top",
				                    	textStyle:{
				                    		color:"black",
				                    		fontSize:16
				                    	}
				                    }
		                    		
		                    	}
				            },
				            {
				            	type: 'bar',
				            	barWidth:'40',
				            	label:{
				                	normal:{
				                		show:true,
				                    	position:"top",
				                    	textStyle:{
				                    		color:"black",
				                    		fontSize:16
				                    	}
				                    }
		                    		
		                    	}
				            
				            },
				            	
				        ]
				    };
				myChart2.clear();
				myChart2.setOption(option2);
			 }else{
				 myChart2.clear();
			 }
		}
   })
	
}
