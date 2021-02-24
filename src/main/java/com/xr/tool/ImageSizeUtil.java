package com.xr.tool;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.ImageInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

/*获取图片尺寸和截图工具*/
public class ImageSizeUtil {
    private final static Logger logger=LoggerFactory.getLogger(ImageSizeUtil.class);
    
    public static byte[] getFileBytes(MultipartFile params){
    	byte[] imageBytes=null;
    	try {
    		//获取图片最长边长度
        	int lengthSize=62;//getImageLengthOfSide(params);62.96*1024=64479
        	int lenSize=getImageLengthOfSide(params);
			byte[] photo=params.getBytes();
			imageBytes=compressPicForScale(photo,lengthSize);
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return imageBytes;
    }
    
    /*获取图片最长边长度*/
    public static int getImageLengthOfSide(MultipartFile params){
    	int lengthSize=0;
    	Map<String,Integer> result=new HashMap<String,Integer>();
    	long beginTime=new Date().getTime();
    	//获取图片格式
    	String suffixName=getSuffixNameInfo(params);
		try {
			Iterator<ImageReader> readers = ImageIO.getImageReaders(new FileImageInputStream(new File(suffixName)));
	    	ImageReader reader=readers.next();
	    	ImageInputStream iis = ImageIO.createImageInputStream(params.getInputStream());
	    	reader.setInput(iis,true);
	    	result.put("width", reader.getWidth(0));
	    	result.put("height", reader.getHeight(0));
	    	if(reader.getWidth(0)>reader.getHeight(0)){
	    		lengthSize=reader.getWidth(0);
	    	}else{
	    		lengthSize=reader.getHeight(0);
	    	}
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
    	return lengthSize;
    }//end

    /*获取图片格式*/
    public static String getSuffixNameInfo(MultipartFile params) {
		String result="";
		// 图片后缀
		String suffixName=params.getOriginalFilename().substring(params.getOriginalFilename().lastIndexOf("."));
		if(suffixName.indexOf("png")>0){
			result="png";
		}else if(suffixName.indexOf("jpg")>0){
			result ="jpg";
		}else if(suffixName.indexOf("jpeg")>0){
			result="jpeg";
		}
		return result;
	}//end
	
	/*
	 * 根据指定大小压缩图片 
	 * @param imageBytes 源图片字节数组
	 * @param desFileSize 指定图片大小，单位kb
	 * @return 压缩质量后的图片字节数组
	 * */
	public static byte[] compressPicForScale(byte[] imageBytes,long desFileSize){
	    if(imageBytes==null || imageBytes.length<=0 || imageBytes.length<desFileSize*1024){
			return imageBytes;
		}
		long srcSize=imageBytes.length;
		long srcsize=srcSize/1024;
		//double accuracy=getAccuracy(srcSize/1024);//0.85
		double accuracy=getAccuracy(srcsize);//0.85
		try {
			while(imageBytes.length>desFileSize*1024){
				ByteArrayInputStream bis=new ByteArrayInputStream(imageBytes);
				ByteArrayOutputStream bos=new ByteArrayOutputStream(imageBytes.length);
				//按比例压缩
				Thumbnails.of(bis).scale(accuracy).outputQuality(accuracy).toOutputStream(bos);
				imageBytes=bos.toByteArray();
			}
			logger.error("图片压缩imageId={} | 图片原大小={}kb | 压缩后大小={}kb","",srcSize/1024,imageBytes.length/1024);
			System.out.println("图片原大小={}kb | 压缩后大小={}kb+"+srcSize/1024 +"::::"+imageBytes.length/1024);
		} catch (IOException e) {
			logger.error("图片压缩msg=图片压缩失败！",e);
		}
		return imageBytes;
	}//end

	/*
	 * 自动调节精度（经验数值）
	 * @param size 原图片大小，单位KB
	 * @return 图片压缩质量比*/
	public static double getAccuracy(long size) {
		double accuracy;
		if(size<900){
			accuracy=0.6;//0.85;
		}else if(size<2047){
			accuracy=0.25;//0.8;
		}else if(size<3275){
			accuracy=0.2;//0.7
		}else{
			accuracy=0.1;//0.4;
		}
		return accuracy;
	}//end
	
	/*base64  转Multipartfile
	 * @param base64
	 * @return
	 * */
	public static MultipartFile base64ToMultipart(String base64){
		//注意base64是否有头信息，如：data:image/jpeg;base64,...
		
		String[] baseStrs=base64.split(",");
		//BASE64Decoder decoder=new BASE64Decoder();
		Base64.Decoder decoder=Base64.getDecoder();
		byte[] b=decoder.decode(baseStrs[1]);
		for(int i=0;i<b.length;++i){
			if(b[i]<0){
				b[i]+=256;
			}
		}
		return new BASE64DecodedMultipartFile(b,baseStrs[0]);
		
	}//end
	
	/*压缩图片
	 * @return
	 * */
	public static MultipartFile[] byte2Base64StringFun(MultipartFile[] fileImg){
		MultipartFile[] result=fileImg;
		//获取图片最长边
		int imageLengthSize=ImageSizeUtil.getImageLengthOfSide(fileImg[0]);
		Long swd=fileImg[0].getSize();
		if(imageLengthSize>4096 || swd>2500000){
			//BASE64Encoder encoder=new BASE64Encoder();
			Base64.Encoder encoder=Base64.getEncoder();
			String imgData1=null;
			try{
				InputStream is=fileImg[0].getInputStream();
				byte[] imgData=ImageSizeUtil.compressPicForScale(ToolsUtil.getByteArray(is), 2000);
				//imgData1="data:"+fileImg[0].getContentType()+";base64,"+encoder.encode(imgData);
				imgData1="data:"+fileImg[0].getContentType()+";base64,"+encoder.encodeToString(imgData);
				MultipartFile def=ImageSizeUtil.base64ToMultipart(imgData1);
				result[0]=def;
			}catch(IOException e){
				e.printStackTrace();
			}
		}
		return result;
	}//end
	
	 
}
