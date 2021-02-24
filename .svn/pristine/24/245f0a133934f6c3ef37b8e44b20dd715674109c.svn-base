package com.xr.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class ParamFilter implements HandlerInterceptor{
	
	public void afterCompletion(HttpServletRequest httpRequest,
            HttpServletResponse httpResponse, Object arg2, Exception arg3)
            throws Exception {
		System.out.println("================================");
    }

    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
            Object arg2, ModelAndView arg3) throws Exception {
    	System.out.println("================================");

    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
            Object object) throws Exception {
    	//获取请求的RUi:去除http:localhost:8080这部分剩下的
        String uri = request.getRequestURI();
        //UTL:除了login.jsp是可以公开访问的，其他的URL都进行拦截控制
        if (uri.indexOf("/queryLoginCheck") >= 0) {
            return true;
        }
        
        if(uri.indexOf(".") >= 0 && !uri.endsWith(".html")) {
        	return true;
        }
        //获取session
        HttpSession session = request.getSession();
        if(session.getAttribute("holderno") != null 
        		&& !session.getAttribute("holderno").toString().equals("")) {
        	return true;
        }
        //不符合条件的给出提示信息，并转发到登录页面
        response.sendRedirect("/login.html");
        return false;
    }
}
