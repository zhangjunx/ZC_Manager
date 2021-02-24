package com.xr.interceptor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sun.jna.Library;
import com.sun.jna.Native;
import com.sun.jna.Platform;
import com.sun.prism.impl.Disposer.Target;

/**
 * JNA框架DLL动态库读取调用示例类
 * @ClassName: DllCall
 * @Description: 读取调用DLL动态库文件中的方法
 * @author: LinWenLi
 * @date: 2018年7月18日 上午10:32:16
 */
public class JNADllCall {
/**
     * DLL动态库调用方法
     * @Description: 读取调用CDecl方式导出的DLL动态库方法
     * @author: LinWenLi
     * @date: 2018年7月18日 上午10:49:02
     */
    public interface CLibrary extends Library {
        // DLL文件默认路径为项目根目录，若DLL文件存放在项目外，请使用绝对路径。（此处：(Platform.isWindows()?"msvcrt":"c")指本地动态库msvcrt.dll）
        CLibrary INSTANCE = (CLibrary) Native.loadLibrary("D:\\wing\\mywork\\人脸识别算法\\M20相关文档及开发包\\V1.1.4\\x64\\MtcControlLib.dll",CLibrary.class);

        // 声明将要调用的DLL中的方法,可以是多个方法(此处示例调用本地动态库msvcrt.dll中的printf()方法)
        int enumDevice(Map<String,Object> map);
    }
    
    public interface CLibrary1 extends Library {
        // DLL文件默认路径为项目根目录，若DLL文件存放在项目外，请使用绝对路径。（此处：(Platform.isWindows()?"msvcrt":"c")指本地动态库msvcrt.dll）
        CLibrary1 INSTANCE = (CLibrary1) Native.loadLibrary((Platform.isWindows() ? "msvcrt" : "c"),
                CLibrary1.class);

        int abs(int b);
    }

    public static void main(String[] args) {
    	Map<String,Object> parmMap = new HashMap<String,Object>();
    	parmMap.put("videoDevBuf", "SenseEngine AI 视觉模组");
    	parmMap.put("videoDevSize","");
    	parmMap.put("serialBuf", 200);
    	parmMap.put("serialSize", "");
    	int b = CLibrary.INSTANCE.enumDevice(parmMap);
    	System.out.println(b);
    }
}