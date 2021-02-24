package com.xr.tool;

import org.apache.commons.codec.digest.DigestUtils;

public class Test {
	public static void main(String[] args) {
		 long time=System.currentTimeMillis();//1588727062691
		 System.out.println("time=="+time);
		 String str=time+"#7efb17b01619ddccb2b47a7dc76155d8";
		 System.out.println("str=="+str);
		String sign=DigestUtils.md5Hex(str);
		 System.out.println(sign);//6db0e5f387868864d5eee08ddb66c455
		
	}
	
	 public static void  get(){
		 /*//菜单循环遍历打印拼接操作
	        $(function () {
	            $.ajax( {
	                url : projectName+"/sys/menu/findMenuByRole",
	                type : "post",
	                dataType : "json",
	                success : function(data) {
	                    var menu = ""; //定义变量存储
	                    for(var i = 0;i<data.length;i++){
	                        menu += "<li class="layui-nav-item ">"
	                        if(data[i].pareMenuId == 0){ //取出父元素的菜单，拼进页面
	                            menu +=        "<a href="javascript:;">"+data[i].menuName+"</a>"
	                            for(var j = 0;j<data.length;j++){ //继续遍历这几条数据
	                                if(data[j].mid > data[i].mid && data[j].mid < (data[i].mid)+1000){ //取出这个父元素所对应的子元素
	                                    menu +=    "<dl class="layui-nav-child">"
	                                    menu +=        "<dd>"
	                                    menu +=            "<a href=""+data[j].menuPath+"" target="option">"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+data[j].menuName+"</a>"
	                                    menu +=        "</dd>"
	                                    menu +=    "</dl>"
	                                }
	                            }
	                        }
	                        menu +=    "</li>";
	                    }
	                    $("#nav").html(menu);
	                    var element = layui.element;
	                    element.init()//初始化element事件，使菜单展开
	                }
	            });
	        })*/
	 }

}
