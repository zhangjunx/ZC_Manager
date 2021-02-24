$(function() {
    //获取当前时间
     setInterval(function() {
        getTime()
     }, 1000);
     $(document).mousemove(function(event){
    		var x=event.clientX; 
    		var y=event.clientY;//监听鼠标位置;
    		var width=document.body.clientWidth;
    		var wx=width-x;
    		if(wx<300&&y<85){
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
     //进出记录
     queryIORecordByBigData();
    var myChart = echarts.init(document.getElementById('stackedLine'));
    var myChart2 = echarts.init(document.getElementById('refer'));
    var myChart3 = echarts.init(document.getElementById('vehicle'));
    var myChart4 = echarts.init(document.getElementById('rotation'));
    //折线图
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['干警出勤', '外协来访', '家属会见'],
            top: '10%',
            textStyle: {
                fontSize: 14, //字体大小
                color: '#A6E1FA' //字体颜色
            }

        },
        grid: {
            left: '1%',
            right: '4%',
            bottom: '1%',
            top: '30%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['10.15', '10.16', '10.17', '10.18', '10.19', '10.20', '10.21'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#A6E1FA'
                }
            }

        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#A6E1FA'
                }
            }
        },
        series: [{
                name: '干警出勤',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '外协来访',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '家属会见',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            }
        ]
    };
    myChart.setOption(option);
    //饼状图
    var option2 = {
        title: {
            text: '',
            x: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
        stillShowZeroSum: false,
        series: [{
            name: '',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
                { value: 1, name: '在押犯人' },
                { value: 3, name: '在岗干警' },
                { value: 7, name: '外协人员' },
                { value: 4, name: '会见人员' },
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(128, 128, 128, 0.5)'
                }
            }
        }]
    };
    myChart2.setOption(option2);
    //饼状图
    var option3 = {
        title: {
            text: '',
            x: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
        stillShowZeroSum: false,
        series: [{
            name: '',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
                { value: 1, name: '施工车辆' },
                { value: 3, name: '警务车辆' },
                { value: 7, name: '公务车辆' },
                { value: 4, name: '生产车辆' },
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(128, 128, 128, 0.5)'
                }
            }
        }]
    };
    myChart3.setOption(option3);
    //柱状图
    var option4 = {
        legend: {
            bottom: 10,
            textStyle: {
                color: "#fff"
            }

        },
        tooltip: {},
        dataset: {
            source: [
                ['product', '在岗干警', '外协人员', '会见人员', '进出车辆'],
                ['08:00', 40, 85, 93, 90],
                ['12:00', 20, 70, 80, 60],
                ['16:00', 80, 60, 80, 30],
                ['20:00', 70, 30, 50, 30]
            ]
        },
        xAxis: {
            type: 'category',
            axisLine: { //这是x轴文字颜色
                lineStyle: {
                    color: "#fff",
                }
            }

        },
        yAxis: {
            type: 'value',
            //设置坐标轴字体颜色和宽度
            axisLine: { //这是y轴文字颜色
                lineStyle: {
                    color: "#fff",
                }
            }
        },

        series: [
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' }
        ]
    };

    myChart4.setOption(option4);
})


function getTime() {
    var date = new Date();
    var seperator1 = "/";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours(); //得到小时
    var minu = date.getMinutes(); //得到分钟
    var sec = date.getSeconds(); //得到秒
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var myddy = date.getDay(); //获取存储当前日期
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var currentdate = year + seperator1 + month + seperator1 + strDate + "   " + weekday[myddy];
    $(".date").html(currentdate);
    var currentTime = hour + ":" + minu + ":" + sec;
    $(".hours").html(currentTime);
}
//实时进出记录
function queryIORecordByBigData(){
	$.ajax({
		url:url+"/BigData/queryIORecordByBigData",
		type:"POST",
		success:function(data){
			console.log(data);
			$(".realTime table  tr:not(:first)").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderno==undefined?"":item.holderno);
					var holdername=(item.holdername==undefined?"":item.holdername);
					var deptname=(item.deptname==undefined?"":item.deptname);
					var doorname=(item.doorname==undefined?"":item.doorname);
					var iodate=(item.iodate==undefined?"":item.iodate);
					var iotime=(item.iotime==undefined?"":item.iotime);
					var iostatus=(item.iostatus==undefined?"":item.iostatus);
					if(iostatus==11){
						iostatus="进入";
					}else if(iostatus==12){
						iostatus="外出";
					}
					var $tr=$("<tr><td class='layui-elip'>"+holderno+"</td><td class='layui-elip'>"+holdername+"</td><td class='layui-elip'>"+deptname+"</td><td class='layui-elip' style='width:20px'>"+doorname+"</td>" +
							"<td class='layui-elip'>"+iodate+"&nbsp;&nbsp;"+iotime+"</td><td class='layui-elip'>"+iostatus+"</td></tr>");
					$(".realTime table").append($tr);
					
				}
			}
		},
		error:function(data){
		}
	})
}//end