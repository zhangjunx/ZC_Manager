/***
 * 排班中心
 */
$(function(){
	
	showHide()
	function showHide(){
		var arrList=window.top.arr;
		if(window.top.arr.length==0){
			return;
		}
		$("#insertArrangeData").hide();
		arrList.forEach(item=>{
			if(item.Code=="insertArrangeData"){
				$("#insertArrangeData").show();
			}
		})
	}
	
	//点击周六周日复选框
	$(document).on("click",".checkbox1",function(){
		if($(this).hasClass("current")){
			$(this).removeClass("current");
		}else{
			$(this).addClass("current");
		}
		
	})
	$(document).on("click",".checkbox2",function(){
		if($(this).hasClass("current")){
			$(this).removeClass("current");
		}else{
			$(this).addClass("current");
		}
		
	})
	
	//获取时间日期
    var myDate = new Date();             
    var year=myDate.getFullYear();//获取当前年
    var month = myDate.getMonth()+1;//月份
    var years=year+1;
    var $opt=$("<option value='"+year+"'></option>");
    var $opt1=$("<option value='"+years+"'></option>");
    $opt.append(year+"年");
    $opt1.append(years+"年");
    $("#Year").append($opt);
    $("#Year").append($opt1);
    $(".dayue").text(month);
    console.log(month)
    var yue=$('input:radio:checked').val();//获取月份的值
    for(var i=0;i<$(".ction").length;i++){
    	var str=$(".ction").eq(i).text();
    	str=str.replace("月","");
    	if(str==month){
    		$(".ction").eq(i).addClass("curr");
    	}
    	
    }
	
	
	
	//行政班,三班倒下拉框    弹出框
	queryshiftdata();
	function queryshiftdata(){
		var obj={"holderno":window.top.holderno};
		$.ajax({
			url:url+'/KQ_Arrange/queryshiftdata',
			type:"post",
			data:obj,
			async:false,
			success:function(data){
				console.log(data);
				var res=data.result;
				if(data.flag){
					for(var item of res){
						//创建休息日
						if(item.nickname=="休"){
							var $div1=$("<div class='doubleRest'><span class='doubleRest_tit'>休息:</span><div><span class='checkbox1' data-shiftno='"+item.shiftno+"' data-code='"+item.codeno+"'></span><span class='doubleRest_sat'>周六</span></div></div>");
							var $div2=$("<div><span class='checkbox2' data-shiftno='"+item.shiftno+"' data-code='"+item.codeno+"'></span><span class='doubleRest_mon'>周日</span></div>");
							$div1.append($div2);
							$div1.insertBefore($(".Sure_"));
						}
						//给下拉框赋值
						for(var i=0;i<$(".shift").length;i++){
							var $opt=$("<option value='"+item.nickname+"' data-code='"+item.codeno+"' data-shiftno='"+item.shiftno+"'></option>");
							$opt.append(item.shiftname);
							$(".shift").eq(i).append($opt);
						}
						//给弹出框赋值
						var $dt = $("<dt class='cellDt' data-codeno='"+item.codeno+"'></dt>");
						$dt.append(item.nickname);
						$dt.attr("data-shiftno",item.shiftno);
						if(item.codeno=="01"){
							$dt.css("background","#F5222D");
						}else if(item.codeno=="02"){
							$dt.css("background","#FA541C");
						}else if(item.codeno=="03"){
							$dt.css("background","#722ED1");
						}else if(item.codeno=="04"){
							$dt.css("background","#52C41A");
						}else if(item.codeno=="05"){
							$dt.css("background","#1890FF");
						}else if(item.codeno=="06"){
							$dt.css("background","#FA8C16");
						}else if(item.codeno=="07"){
							$dt.css("background","#FAAD14");
						}else if(item.codeno=="08"){
							$dt.css("background","#A0D911");
						}else if(item.codeno=="09"){
							$dt.css("background","#13C2C2");
						}else if(item.codeno=="10"){
							$dt.css("background","#FADB14");
						}
							
						$(".hover").append($dt);
					}
				}
			},
			error:function(){
				console.log("error");
			}
		})
	}
	
	
	//选择班次点击确定
	$(".Sure_").click(function(){	
		$(".cell").css("background","#fff");
		//行政班
			if($(".Administration").hasClass("curr")){
				
				var banci=$(".banci").val();
				var code=$(".banci option:selected").attr("data-code");
				var shiftno=$(".banci option:selected").attr("data-shiftno");
				$(".cell").html(banci);
				$(".cell").attr("data-shiftno",shiftno);
				
				if(code=="01"){
					$(".cell").css("background","#F5222D");
				}else if(code=="02"){
					$(".cell").css("background","#FA541C");
				}else if(code=="03"){
					$(".cell").css("background","#722ED1");
				}else if(code=="04"){
					$(".cell").css("background","#52C41A");
				}else if(code=="05"){
					$(".cell").css("background","#1890FF");
				}else if(code=="06"){
					$(".cell").css("background","#FA8C16");
				}else if(code=="07"){
					$(".cell").css("background","#FAAD14");
				}else if(code=="08"){
					$(".cell").css("background","#A0D911");
				}else if(code=="09"){
					$(".cell").css("background","#13C2C2");
				}else if(code=="10"){
					$(".cell").css("background","#FADB14");
				}else if(code=="11"){
					$(".cell").css("background","#ccc");
				}
				//周六被选中
				if($(".checkbox1").hasClass("current")){
					var shiftno1=$(".checkbox1").attr("data-shiftno");
					var codeno=$(".checkbox1").attr("data-code");
					for(var i=0;i<$(".week").length;i++){
						if($(".week").eq(i).html()=="六"){
							var no=$(".week").eq(i).attr("data-no");
							$("#cell"+no).html("休");
							$("#cell"+no).attr("data-shiftno",shiftno1);
							
							if(codeno=="01"){
								$("#cell"+no).css("background","#F5222D");
							}else if(codeno=="02"){
								$("#cell"+no).css("background","#FA541C");
							}else if(codeno=="03"){
								$("#cell"+no).css("background","#722ED1");
							}else if(codeno=="04"){
								$("#cell"+no).css("background","#52C41A");
							}else if(codeno=="05"){
								$("#cell"+no).css("background","#1890FF");
							}else if(codeno=="06"){
								$("#cell"+no).css("background","#FA8C16");
							}else if(codeno=="07"){
								$("#cell"+no).css("background","#FAAD14");
							}else if(codeno=="08"){
								$("#cell"+no).css("background","#A0D911");
							}else if(codeno=="09"){
								$("#cell"+no).css("background","#13C2C2");
							}else if(codeno=="10"){
								$("#cell"+no).css("background","#FADB14");
							}else if(codeno=="11"){
								$("#cell"+no).css("background","#ccc");
							}
						}
					}
					
					
				}
				
				//周日被选中
				if($(".checkbox2").hasClass("current")){
					var shiftno1=$(".checkbox2").attr("data-shiftno");
					var codeno=$(".checkbox2").attr("data-code");
					for(var i=0;i<$(".week").length;i++){
						if($(".week").eq(i).html()=="日"){
							var no=$(".week").eq(i).attr("data-no");
							$("#cell"+no).html("休");
							$("#cell"+no).attr("data-shiftno",shiftno1);
							
							if(codeno=="01"){
								$("#cell"+no).css("background","#F5222D");
							}else if(codeno=="02"){
								$("#cell"+no).css("background","#FA541C");
							}else if(codeno=="03"){
								$("#cell"+no).css("background","#722ED1");
							}else if(codeno=="04"){
								$("#cell"+no).css("background","#52C41A");
							}else if(codeno=="05"){
								$("#cell"+no).css("background","#1890FF");
							}else if(codeno=="06"){
								$("#cell"+no).css("background","#FA8C16");
							}else if(codeno=="07"){
								$("#cell"+no).css("background","#FAAD14");
							}else if(codeno=="08"){
								$("#cell"+no).css("background","#A0D911");
							}else if(codeno=="09"){
								$("#cell"+no).css("background","#13C2C2");
							}else if(codeno=="10"){
								$("#cell"+no).css("background","#FADB14");
							}else if(codeno=="11"){
								$("#cell"+no).css("background","#ccc");
							}
						}
					}
				}
				//周六周日都被选中
				if($(".checkbox1").hasClass("current")&&$(".checkbox2").hasClass("current")){
					var shiftno1=$(".checkbox2").attr("data-shiftno");
					var codeno=$(".checkbox2").attr("data-code");
					for(var i=0;i<$(".week").length;i++){
						if($(".week").eq(i).html()=="日"||$(".week").eq(i).html()=="六"){
							var no=$(".week").eq(i).attr("data-no");
							$("#cell"+no).html("休");
							$("#cell"+no).attr("data-shiftno",shiftno1);
							
							if(codeno=="01"){
								$("#cell"+no).css("background","#F5222D");
							}else if(codeno=="02"){
								$("#cell"+no).css("background","#FA541C");
							}else if(codeno=="03"){
								$("#cell"+no).css("background","#722ED1");
							}else if(codeno=="04"){
								$("#cell"+no).css("background","#52C41A");
							}else if(codeno=="05"){
								$("#cell"+no).css("background","#1890FF");
							}else if(codeno=="06"){
								$("#cell"+no).css("background","#FA8C16");
							}else if(codeno=="07"){
								$("#cell"+no).css("background","#FAAD14");
							}else if(codeno=="08"){
								$("#cell"+no).css("background","#A0D911");
							}else if(codeno=="09"){
								$("#cell"+no).css("background","#13C2C2");
							}else if(codeno=="10"){
								$("#cell"+no).css("background","#FADB14");
							}else if(codeno=="11"){
								$("#cell"+no).css("background","#ccc");
							}
						}
					}
				}
			}
			//三班倒
			if($(".three").hasClass("curr")){
				var nickname1=$("#shift1").val();
				var nickname2=$("#shift2").val();
				var nickname3=$("#shift3").val();
				var shiftno1=$("#shift1 option:selected").attr("data-shiftno");
				var shiftno2=$("#shift2 option:selected").attr("data-shiftno");
				var shiftno3=$("#shift3 option:selected").attr("data-shiftno");
				var code1=$("#shift1 option:selected").attr("data-code");
				var code2=$("#shift2 option:selected").attr("data-code");
				var code3=$("#shift3 option:selected").attr("data-code");
				
					if($(".week").eq(0).html()=="一"){
						for(var k=0;k<7;k++){
							$(".cell").eq(k).html(nickname1);
							$(".cell").eq(k).attr("data-shiftno",shiftno1)
							if(code1=="01"){
								$(".cell").eq(k).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(k).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(k).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(k).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(k).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(k).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(k).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(k).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(k).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(k).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(k).css("background","#ccc");
							}
						}
						
						for(var i=7;i<14;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=14;i<21;i++){
							$(".cell").eq(i).html(nickname3);
							$(".cell").eq(i).attr("data-shiftno",shiftno3);
							if(code3=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code3=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code3=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code3=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code3=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code3=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code3=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code3=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code3=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code3=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code3=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=21;i<28;i++){
							$(".cell").eq(i).html(nickname1);
							$(".cell").eq(i).attr("data-shiftno",shiftno1);
							if(code1=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=28;i<$(".cell").length;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
					}else if($(".week").eq(0).html()=="二"){
						for(var k=0;k<6;k++){
							$(".cell").eq(k).html(nickname1);
							$(".cell").eq(k).attr("data-shiftno",shiftno1)
							if(code1=="01"){
								$(".cell").eq(k).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(k).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(k).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(k).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(k).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(k).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(k).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(k).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(k).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(k).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(k).css("background","#ccc");
							}
						}
						
						for(var i=6;i<13;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=13;i<20;i++){
							$(".cell").eq(i).html(nickname3);
							$(".cell").eq(i).attr("data-shiftno",shiftno3);
							if(code3=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code3=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code3=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code3=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code3=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code3=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code3=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code3=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code3=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code3=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code3=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=20;i<27;i++){
							$(".cell").eq(i).html(nickname1);
							$(".cell").eq(i).attr("data-shiftno",shiftno1);
							if(code1=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=27;i<$(".cell").length;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
					}else if($(".week").eq(0).html()=="三"){
						for(var k=0;k<5;k++){
							$(".cell").eq(k).html(nickname1);
							$(".cell").eq(k).attr("data-shiftno",shiftno1)
							if(code1=="01"){
								$(".cell").eq(k).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(k).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(k).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(k).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(k).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(k).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(k).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(k).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(k).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(k).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(k).css("background","#ccc");
							}
						}
						
						for(var i=5;i<12;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=12;i<19;i++){
							$(".cell").eq(i).html(nickname3);
							$(".cell").eq(i).attr("data-shiftno",shiftno3);
							if(code3=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code3=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code3=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code3=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code3=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code3=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code3=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code3=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code3=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code3=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code3=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=19;i<26;i++){
							$(".cell").eq(i).html(nickname1);
							$(".cell").eq(i).attr("data-shiftno",shiftno1);
							if(code1=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=26;i<$(".cell").length;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
					}else if($(".week").eq(0).html()=="四"){
						for(var k=0;k<4;k++){
							$(".cell").eq(k).html(nickname1);
							$(".cell").eq(k).attr("data-shiftno",shiftno1)
							if(code1=="01"){
								$(".cell").eq(k).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(k).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(k).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(k).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(k).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(k).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(k).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(k).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(k).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(k).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(k).css("background","#ccc");
							}
						}
						
						for(var i=4;i<11;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=11;i<18;i++){
							$(".cell").eq(i).html(nickname3);
							$(".cell").eq(i).attr("data-shiftno",shiftno3);
							if(code3=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code3=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code3=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code3=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code3=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code3=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code3=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code3=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code3=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code3=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code3=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=18;i<25;i++){
							$(".cell").eq(i).html(nickname1);
							$(".cell").eq(i).attr("data-shiftno",shiftno1);
							if(code1=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=25;i<$(".cell").length;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
					}else if($(".week").eq(0).html()=="五"){
						for(var k=0;k<3;k++){
							$(".cell").eq(k).html(nickname1);
							$(".cell").eq(k).attr("data-shiftno",shiftno1)
							if(code1=="01"){
								$(".cell").eq(k).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(k).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(k).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(k).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(k).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(k).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(k).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(k).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(k).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(k).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(k).css("background","#ccc");
							}
						}
						
						for(var i=3;i<10;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=10;i<17;i++){
							$(".cell").eq(i).html(nickname3);
							$(".cell").eq(i).attr("data-shiftno",shiftno3);
							if(code3=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code3=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code3=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code3=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code3=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code3=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code3=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code3=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code3=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code3=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code3=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=17;i<24;i++){
							$(".cell").eq(i).html(nickname1);
							$(".cell").eq(i).attr("data-shiftno",shiftno1);
							if(code1=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=24;i<$(".cell").length;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
					}else if($(".week").eq(0).html()=="六"){
						for(var k=0;k<2;k++){
							$(".cell").eq(k).html(nickname1);
							$(".cell").eq(k).attr("data-shiftno",shiftno1)
							if(code1=="01"){
								$(".cell").eq(k).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(k).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(k).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(k).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(k).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(k).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(k).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(k).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(k).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(k).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(k).css("background","#ccc");
							}
						}
						
						for(var i=2;i<9;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=9;i<16;i++){
							$(".cell").eq(i).html(nickname3);
							$(".cell").eq(i).attr("data-shiftno",shiftno3);
							if(code3=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code3=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code3=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code3=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code3=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code3=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code3=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code3=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code3=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code3=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code3=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=16;i<23;i++){
							$(".cell").eq(i).html(nickname1);
							$(".cell").eq(i).attr("data-shiftno",shiftno1);
							if(code1=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						if($(".cell").length>30){
							for(var i=23;i<30;i++){
								$(".cell").eq(i).html(nickname2);
								$(".cell").eq(i).attr("data-shiftno",shiftno2);
								if(code2=="01"){
									$(".cell").eq(i).css("background","#F5222D");
								}else if(code2=="02"){
									$(".cell").eq(i).css("background","#FA541C");
								}else if(code2=="03"){
									$(".cell").eq(i).css("background","#722ED1");
								}else if(code2=="04"){
									$(".cell").eq(i).css("background","#52C41A");
								}else if(code2=="05"){
									$(".cell").eq(i).css("background","#1890FF");
								}else if(code2=="06"){
									$(".cell").eq(i).css("background","#FA8C16");
								}else if(code2=="07"){
									$(".cell").eq(i).css("background","#FAAD14");
								}else if(code2=="08"){
									$(".cell").eq(i).css("background","#A0D911");
								}else if(code2=="09"){
									$(".cell").eq(i).css("background","#13C2C2");
								}else if(code2=="10"){
									$(".cell").eq(i).css("background","#FADB14");
								}else if(code2=="11"){
									$(".cell").eq(i).css("background","#ccc");
								}
							}
							for(var i=30;i<$(".cell").length;i++){
								$(".cell").eq(i).html(nickname3);
								$(".cell").eq(i).attr("data-shiftno",shiftno3);
								if(code3=="01"){
									$(".cell").eq(i).css("background","#F5222D");
								}else if(code3=="02"){
									$(".cell").eq(i).css("background","#FA541C");
								}else if(code3=="03"){
									$(".cell").eq(i).css("background","#722ED1");
								}else if(code3=="04"){
									$(".cell").eq(i).css("background","#52C41A");
								}else if(code3=="05"){
									$(".cell").eq(i).css("background","#1890FF");
								}else if(code3=="06"){
									$(".cell").eq(i).css("background","#FA8C16");
								}else if(code3=="07"){
									$(".cell").eq(i).css("background","#FAAD14");
								}else if(code3=="08"){
									$(".cell").eq(i).css("background","#A0D911");
								}else if(code3=="09"){
									$(".cell").eq(i).css("background","#13C2C2");
								}else if(code3=="10"){
									$(".cell").eq(i).css("background","#FADB14");
								}else if(code3=="11"){
									$(".cell").eq(i).css("background","#ccc");
								}
							}
						}else{
							for(var i=23;i<$(".cell").length;i++){
								$(".cell").eq(i).html(nickname2);
								$(".cell").eq(i).attr("data-shiftno",shiftno2);
								if(code2=="01"){
									$(".cell").eq(i).css("background","#F5222D");
								}else if(code2=="02"){
									$(".cell").eq(i).css("background","#FA541C");
								}else if(code2=="03"){
									$(".cell").eq(i).css("background","#722ED1");
								}else if(code2=="04"){
									$(".cell").eq(i).css("background","#52C41A");
								}else if(code2=="05"){
									$(".cell").eq(i).css("background","#1890FF");
								}else if(code2=="06"){
									$(".cell").eq(i).css("background","#FA8C16");
								}else if(code2=="07"){
									$(".cell").eq(i).css("background","#FAAD14");
								}else if(code2=="08"){
									$(".cell").eq(i).css("background","#A0D911");
								}else if(code2=="09"){
									$(".cell").eq(i).css("background","#13C2C2");
								}else if(code2=="10"){
									$(".cell").eq(i).css("background","#FADB14");
								}else if(code2=="11"){
									$(".cell").eq(i).css("background","#ccc");
								}
							}
						}
						
					}else{
						for(var k=0;k<1;k++){
							$(".cell").eq(k).html(nickname1);
							$(".cell").eq(k).attr("data-shiftno",shiftno1)
							if(code1=="01"){
								$(".cell").eq(k).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(k).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(k).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(k).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(k).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(k).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(k).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(k).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(k).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(k).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(k).css("background","#ccc");
							}
						}
						
						for(var i=1;i<8;i++){
							$(".cell").eq(i).html(nickname2);
							$(".cell").eq(i).attr("data-shiftno",shiftno2);
							if(code2=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code2=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code2=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code2=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code2=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code2=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code2=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code2=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code2=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code2=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code2=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=8;i<15;i++){
							$(".cell").eq(i).html(nickname3);
							$(".cell").eq(i).attr("data-shiftno",shiftno3);
							if(code3=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code3=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code3=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code3=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code3=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code3=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code3=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code3=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code3=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code3=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code3=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						
						for(var i=15;i<22;i++){
							$(".cell").eq(i).html(nickname1);
							$(".cell").eq(i).attr("data-shiftno",shiftno1);
							if(code1=="01"){
								$(".cell").eq(i).css("background","#F5222D");
							}else if(code1=="02"){
								$(".cell").eq(i).css("background","#FA541C");
							}else if(code1=="03"){
								$(".cell").eq(i).css("background","#722ED1");
							}else if(code1=="04"){
								$(".cell").eq(i).css("background","#52C41A");
							}else if(code1=="05"){
								$(".cell").eq(i).css("background","#1890FF");
							}else if(code1=="06"){
								$(".cell").eq(i).css("background","#FA8C16");
							}else if(code1=="07"){
								$(".cell").eq(i).css("background","#FAAD14");
							}else if(code1=="08"){
								$(".cell").eq(i).css("background","#A0D911");
							}else if(code1=="09"){
								$(".cell").eq(i).css("background","#13C2C2");
							}else if(code1=="10"){
								$(".cell").eq(i).css("background","#FADB14");
							}else if(code1=="11"){
								$(".cell").eq(i).css("background","#ccc");
							}
						}
						if($(".cell").length>=30){
							for(var i=22;i<29;i++){
								$(".cell").eq(i).html(nickname2);
								$(".cell").eq(i).attr("data-shiftno",shiftno2);
								if(code2=="01"){
									$(".cell").eq(i).css("background","#F5222D");
								}else if(code2=="02"){
									$(".cell").eq(i).css("background","#FA541C");
								}else if(code2=="03"){
									$(".cell").eq(i).css("background","#722ED1");
								}else if(code2=="04"){
									$(".cell").eq(i).css("background","#52C41A");
								}else if(code2=="05"){
									$(".cell").eq(i).css("background","#1890FF");
								}else if(code2=="06"){
									$(".cell").eq(i).css("background","#FA8C16");
								}else if(code2=="07"){
									$(".cell").eq(i).css("background","#FAAD14");
								}else if(code2=="08"){
									$(".cell").eq(i).css("background","#A0D911");
								}else if(code2=="09"){
									$(".cell").eq(i).css("background","#13C2C2");
								}else if(code2=="10"){
									$(".cell").eq(i).css("background","#FADB14");
								}else if(code2=="11"){
									$(".cell").eq(i).css("background","#ccc");
								}
							}
							for(var i=29;i<$(".cell").length;i++){
								$(".cell").eq(i).html(nickname3);
								$(".cell").eq(i).attr("data-shiftno",shiftno3);
								if(code3=="01"){
									$(".cell").eq(i).css("background","#F5222D");
								}else if(code3=="02"){
									$(".cell").eq(i).css("background","#FA541C");
								}else if(code3=="03"){
									$(".cell").eq(i).css("background","#722ED1");
								}else if(code3=="04"){
									$(".cell").eq(i).css("background","#52C41A");
								}else if(code3=="05"){
									$(".cell").eq(i).css("background","#1890FF");
								}else if(code3=="06"){
									$(".cell").eq(i).css("background","#FA8C16");
								}else if(code3=="07"){
									$(".cell").eq(i).css("background","#FAAD14");
								}else if(code3=="08"){
									$(".cell").eq(i).css("background","#A0D911");
								}else if(code3=="09"){
									$(".cell").eq(i).css("background","#13C2C2");
								}else if(code3=="10"){
									$(".cell").eq(i).css("background","#FADB14");
								}else if(code3=="11"){
									$(".cell").eq(i).css("background","#ccc");
								}
							}
						}else{
							for(var i=22;i<$(".cell").length;i++){
								$(".cell").eq(i).html(nickname2);
								$(".cell").eq(i).attr("data-shiftno",shiftno2);
								if(code2=="01"){
									$(".cell").eq(i).css("background","#F5222D");
								}else if(code2=="02"){
									$(".cell").eq(i).css("background","#FA541C");
								}else if(code2=="03"){
									$(".cell").eq(i).css("background","#722ED1");
								}else if(code2=="04"){
									$(".cell").eq(i).css("background","#52C41A");
								}else if(code2=="05"){
									$(".cell").eq(i).css("background","#1890FF");
								}else if(code2=="06"){
									$(".cell").eq(i).css("background","#FA8C16");
								}else if(code2=="07"){
									$(".cell").eq(i).css("background","#FAAD14");
								}else if(code2=="08"){
									$(".cell").eq(i).css("background","#A0D911");
								}else if(code2=="09"){
									$(".cell").eq(i).css("background","#13C2C2");
								}else if(code2=="10"){
									$(".cell").eq(i).css("background","#FADB14");
								}else if(code2=="11"){
									$(".cell").eq(i).css("background","#ccc");
								}
							}
						}
						
					}
					
					//周六被选中
					if($(".checkbox1").hasClass("current")){
						var shiftno1=$(".checkbox1").attr("data-shiftno");
						var codeno=$(".checkbox1").attr("data-code");
						for(var i=0;i<$(".week").length;i++){
							if($(".week").eq(i).html()=="六"){
								var no=$(".week").eq(i).attr("data-no");
								$("#cell"+no).html("休");
								$("#cell"+no).attr("data-shiftno",shiftno1);
								
								if(codeno=="01"){
									$("#cell"+no).css("background","#F5222D");
								}else if(codeno=="02"){
									$("#cell"+no).css("background","#FA541C");
								}else if(codeno=="03"){
									$("#cell"+no).css("background","#722ED1");
								}else if(codeno=="04"){
									$("#cell"+no).css("background","#52C41A");
								}else if(codeno=="05"){
									$("#cell"+no).css("background","#1890FF");
								}else if(codeno=="06"){
									$("#cell"+no).css("background","#FA8C16");
								}else if(codeno=="07"){
									$("#cell"+no).css("background","#FAAD14");
								}else if(codeno=="08"){
									$("#cell"+no).css("background","#A0D911");
								}else if(codeno=="09"){
									$("#cell"+no).css("background","#13C2C2");
								}else if(codeno=="10"){
									$("#cell"+no).css("background","#FADB14");
								}else if(codeno=="11"){
									$("#cell"+no).css("background","#ccc");
								}
							}
						}
						
						
					}
					
					//周日被选中
					if($(".checkbox2").hasClass("current")){
						var shiftno1=$(".checkbox2").attr("data-shiftno");
						var codeno=$(".checkbox2").attr("data-code");
						for(var i=0;i<$(".week").length;i++){
							if($(".week").eq(i).html()=="日"){
								var no=$(".week").eq(i).attr("data-no");
								$("#cell"+no).html("休");
								$("#cell"+no).attr("data-shiftno",shiftno1);
								
								if(codeno=="01"){
									$("#cell"+no).css("background","#F5222D");
								}else if(codeno=="02"){
									$("#cell"+no).css("background","#FA541C");
								}else if(codeno=="03"){
									$("#cell"+no).css("background","#722ED1");
								}else if(codeno=="04"){
									$("#cell"+no).css("background","#52C41A");
								}else if(codeno=="05"){
									$("#cell"+no).css("background","#1890FF");
								}else if(codeno=="06"){
									$("#cell"+no).css("background","#FA8C16");
								}else if(codeno=="07"){
									$("#cell"+no).css("background","#FAAD14");
								}else if(codeno=="08"){
									$("#cell"+no).css("background","#A0D911");
								}else if(codeno=="09"){
									$("#cell"+no).css("background","#13C2C2");
								}else if(codeno=="10"){
									$("#cell"+no).css("background","#FADB14");
								}else if(codeno=="11"){
									$("#cell"+no).css("background","#ccc");
								}
							}
						}
					}
					//周六周日都被选中
					if($(".checkbox1").hasClass("current")&&$(".checkbox2").hasClass("current")){
						var shiftno1=$(".checkbox2").attr("data-shiftno");
						var codeno=$(".checkbox2").attr("data-code");
						for(var i=0;i<$(".week").length;i++){
							if($(".week").eq(i).html()=="日"||$(".week").eq(i).html()=="六"){
								var no=$(".week").eq(i).attr("data-no");
								$("#cell"+no).html("休");
								$("#cell"+no).attr("data-shiftno",shiftno1);
								
								if(codeno=="01"){
									$("#cell"+no).css("background","#F5222D");
								}else if(codeno=="02"){
									$("#cell"+no).css("background","#FA541C");
								}else if(codeno=="03"){
									$("#cell"+no).css("background","#722ED1");
								}else if(codeno=="04"){
									$("#cell"+no).css("background","#52C41A");
								}else if(codeno=="05"){
									$("#cell"+no).css("background","#1890FF");
								}else if(codeno=="06"){
									$("#cell"+no).css("background","#FA8C16");
								}else if(codeno=="07"){
									$("#cell"+no).css("background","#FAAD14");
								}else if(codeno=="08"){
									$("#cell"+no).css("background","#A0D911");
								}else if(codeno=="09"){
									$("#cell"+no).css("background","#13C2C2");
								}else if(codeno=="10"){
									$("#cell"+no).css("background","#FADB14");
								}else if(codeno=="11"){
									$("#cell"+no).css("background","#ccc");
								}
							}
						}
					}
			}
			
	})
		

    // 单选按钮 三班倒行政班
    $(document).on("click", ".radio", function() {
        $(this).addClass("curr").siblings().removeClass("curr")
    })
    $(".three").click(function(){
    	$(".rest").show();
    	$(".banci").hide();
    })
    $(".Administration").click(function(){
			$(".rest").hide();
			$(".banci").show();
    })	
    var no;
    //点击hover赋值
    $(document).on("click",".hover .cellDt",function (){
    	//console.log($("#no"))
    	$("#"+no).html($(this).html());
    	var bg=$(this).css("background");
    	$("#"+no).css("background",bg);
    	var shiftno=$(this).attr("data-shiftno");
    	$("#"+no).attr("data-shiftno",shiftno);
    	$(".hover").hide();
    })
    //点击hover随鼠标显示隐藏
    $(document).on("click", ".da_cell .cell", function (e) {
    	no=$(this).attr("id");
    	//console.log(no);
    	$(".hover").css("position","absolute");
    	$(".hover").css("top",e.clientY+10+"px");
    	$(".hover").css("left",e.clientX-20+"px");
		if ($(".hover").is(':hidden')) {
			$(".hover").show();
		} else {
			$(".hover").hide();
        }
    })
    //获取每月多少天数
    function getCountDays() {
	        var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var d = new Date(year, month, 0);
			return d.getDate();

	}
	var day=getCountDays();
	//获取日和周
	function getEvryDay(day){
		var myDate = new Date();             
	    var year=$("#Year").val();//获取当前年
	    var month = $(".control .curr").attr("data-id");//月份
		for (var k = 1; k <= day; k++) {
			var $td =$("<td width='100'></td>");
			$td.append(k);
			$(".da_date").append($td);
			var now=`${year}-${month}-${k}`
			var date=new Date(now);
			var week;
			if(date.getDay()==0) week="日"
		    if(date.getDay()==1) week="一"
			if(date.getDay()==2) week="二"
			if(date.getDay()==3) week="三"
			if(date.getDay()==4) week="四"
			if(date.getDay()==5) week="五"
			if(date.getDay()==6) week="六"
		    var $td1=$("<td width='100' data-no='"+k+"' class='week'></td>")
		    $td1.append(week);
			if(week=="六"||week=="日"){
				$td1.css("background","#eee");
			}
			
		    $(".da_week").append($td1);
		   }
		
		
		};
		//获取日和周
		getEvryDay(day);
		
		function getEvryCell(day){
			var myDate = new Date();             
		    var year=myDate.getFullYear();//获取当前年
		    var month = myDate.getMonth()+1;//月份
			for (var k = 1; k <= day; k++) {
				var $td2 =$("<td width='100' class='cell'></td>");
				$td2.append($(".banci").val());
				var shiftno=$(".banci option:selected").attr("data-shiftno");
				$td2.attr("data-shiftno",shiftno);
				$td2.attr("data-day",k);
				var code=$(".banci option:selected").attr("data-code");
				if(code=="01"){
					$td2.css("background","#F5222D");
				}else if(code=="02"){
					$td2.css("background","#FA541C");
				}else if(code=="03"){
					$td2.css("background","#722ED1");
				}else if(code=="04"){
					$td2.css("background","#52C41A");
				}else if(code=="05"){
					$td2.css("background","#1890FF");
				}else if(code=="06"){
					$td2.css("background","#FA8C16");
				}else if(code=="07"){
					$td2.css("background","#FAAD14");
				}else if(code=="08"){
					$td2.css("background","#A0D911");
				}else if(code=="09"){
					$td2.css("background","#13C2C2");
				}else if(code=="10"){
					$td2.css("background","#FADB14");
				}else{
					$td2.css("background","#fff");
				}
				
				$td2.attr("id","cell"+k);
				$(".da_cell").append($td2);
				
			   }
			
			
			};
			//获取班次
			getEvryCell(day);
		
		
				
			    
			    
			    
			    //选择月份
			    $(".ction").click(function(e){
			    	$(".da_date").empty();
			    	$(".da_week").empty();
			    	$(".da_cell").empty();
			    	$(this).addClass("curr").siblings().removeClass("curr");
			    	
			    	var days;
			    	if($(this).html().length==3){
			    		days=$(this).html().substring(0,2);
			    	} else if($(this).html().length==2){
			    		days=$(this).html().substring(0,1);
			    	}
			    	//console.log(days);
			    	//console.log(month);
				    $(".dayue").text(days);
			    	 var curDate = new Date();
				        curDate.setMonth(days);
				        curDate.setDate(0);
				        /* 返回当月的天数 */
				        curdate=curDate.getDate();
			    	getEvryDay(curdate);
			    	getEvryCell(curdate);
			    })
			   //过去的月份不能点击
			  /* for(var i=0;i<$(".ction").length;i++){
			    	var da;
			    	if($(".ction").eq(i).html().length==3){
			    		da=$(".ction").eq(i).html().substring(0,2);
			    	} else if($(".ction").eq(i).html().length==2){
			    		da=$(".ction").eq(i).html().substring(0,1);
			    	}
			    	if(da<month){
			    		$(".ction").eq(i).off("click");
			    	}
			    }*/
			    
			    
			    //年份下拉框改变事件
			    $("#Year").change(function(){
			    	if($("#Year").val()!=year){
			    		 $(".ction").removeClass("curr");
			    		 $(".ction").click(function(){
						    	$(".da_date").empty();
						    	$(".da_week").empty();
						    	$(".da_cell").empty();
						    	$(this).addClass("curr").siblings().removeClass("curr");
						    	var days;
						    	if($(this).html().length==3){
						    		days=$(this).html().substring(0,2);
						    	} else if($(this).html().length==2){
						    		days=$(this).html().substring(0,1);
						    	}
						    	//console.log(days);
						    	//console.log(month);
							    $(".dayue").text(days);
						    	 var curdate=new Date( $("#Year").val(),days,0);
						    	 curdate=curdate.getDate();
								//console.log(curdate)
						    	getEvryDay(curdate);
						    	getEvryCell(curdate);
						    })
			    	}else{
			    		$(".ction").removeClass("curr")
			    		for(var i=0;i<$(".ction").length;i++){
					    	if($(".ction").eq(i).text()[0]==month){
					    		$(".ction").eq(i).addClass("curr");
					    	}
					    	var da;
					    	if($(".ction").eq(i).html().length==3){
					    		da=$(".ction").eq(i).html().substring(0,2);
					    	} else if($(".ction").eq(i).html().length==2){
					    		da=$(".ction").eq(i).html().substring(0,1);
					    	}
					    	if(da<month){
					    		$(".ction").eq(i).off("click");
					    	}
					    	
					    }
			    		$(".control .curr").click();
			    	}
			    })
						//点击加号弹出框
						$("#anniu").click(function(){
							$(".select_person_box").fadeIn(500);
							$(".select_person").fadeIn(500);
						})
						
});