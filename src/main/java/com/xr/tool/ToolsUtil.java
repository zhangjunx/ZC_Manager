package com.xr.tool;

import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.output.ByteArrayOutputStream;

/*
 * 自定义类 
 * 公共  工具类
 * */

public class ToolsUtil {
	
	/*InputStream 转换为byte[]
	 * @param instream
	 * @return
	 * @throw IOException
	 * */
	public static final byte[] getByteArray(InputStream instream) throws IOException{
		ByteArrayOutputStream bos=new ByteArrayOutputStream();
		byte[] buff=new byte[100];
		int rc=0;
		while((rc=instream.read(buff, 0, 100))>0){
			bos.write(buff,0,rc);
		}
		byte[] in2b=bos.toByteArray();
		return in2b;
	}//end
	
	
	

}
