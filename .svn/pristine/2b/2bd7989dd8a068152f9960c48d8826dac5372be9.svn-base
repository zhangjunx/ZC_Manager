package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xr.entity.TemplateData;
import com.xr.entity.WxMssVo;

@Controller
@RequestMapping("/WX")
public class SendWxMessageController {
	/*
     * 发送订阅消息
     * */
	@RequestMapping("/pushOneUser")
	@ResponseBody
    public String pushOneUser() {
        return push("otxCX5FcarLG-O9q_L8uqeHU1yiM");
    }

    public String push(String openid) {
        RestTemplate restTemplate = new RestTemplate();
        //这里简单起见我们每次都获取最新的access_token（时间开发中，应该在access_token快过期时再重新获取）
        String url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + getAccessToken();
        //拼接推送的模版
        WxMssVo wxMssVo = new WxMssVo();
        wxMssVo.setTouser(openid);//用户的openid（要发送给那个用户，通常这里应该动态传进来的）
        wxMssVo.setTemplate_id("9v3gRbm0odRl9PiUl9VD56fDqSgyuMg5aOxZcFHarvA");//订阅消息模板id
        wxMssVo.setPage("pages/index/index");

        Map<String, TemplateData> m = new HashMap<>(3);
        m.put("thing1", new TemplateData("小程序入门课程"));
        m.put("thing6", new TemplateData("杭州浙江大学"));
        m.put("thing7", new TemplateData("第一章第一节"));
        wxMssVo.setData(m);
        ResponseEntity<String> responseEntity =
                restTemplate.postForEntity(url, wxMssVo, String.class);
        return responseEntity.getBody();
    }

    @RequestMapping("/getAccessToken")
    @ResponseBody
    public String getAccessToken() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> params = new HashMap<>();
        params.put("APPID", "wx4265c4de696637a5");  //
        params.put("APPSECRET", "90eee88a7b9f4d6269180f26414e3f6f");  //
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(
                "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}", String.class, params);
        String body = responseEntity.getBody();
        JSONObject object = JSON.parseObject(body);
        String Access_Token = object.getString("access_token");
        String expires_in = object.getString("expires_in");
        System.out.println("有效时长expires_in：" + expires_in);
        return Access_Token;
    }
}
