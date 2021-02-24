package com.xr.util;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.ComThread;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

import sun.misc.BASE64Encoder;

public class FilePathCreate {
	/* 转PDF格式值 */
	private static final int wdFormatPDF = 17;
	
	public static void main(String[] args) {
		FilePathCreate.word2PDF("C:\\Users\\Lenovo\\Desktop\\dashen.docx", "C:\\Users\\Lenovo\\Desktop\\aaa.pdf");
	}
	
	/**
	 * 判断文件路径是否存在
	 * @param path
	 * @return
	 */
	public static boolean checkExist(String path){
		File filePath = new File(path);
		if(filePath.exists()){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 创建文件夹路径
	 * @param path
	 */
	public static void createPath(String path){
		File filePath = new File(path);
		filePath.mkdirs();
	}
	
	/**
	 * 上传文件
	 * uploadPath：文件上传路径，不包含文件名
	 * 当前支持上传图片（png，jpg）
	 * size：上传图片最大字节数，若为空，则认为没有大小限制
	 * 返回结果：
	 * 101：图片太大
	 * 102：不支持的图片格式
	 * @param file
	 * @param uploadPath
	 * @return
	 */
	public static String uploadFile(MultipartFile file,String uploadPath,Long size){
		Long len = file.getSize();//文件大小
		if(size != null){//图片大小验证
			if(len>size){
				return "101";
			}
		}
		
		if(!file.isEmpty() && file != null){
			long fileRealName = new Date().getTime();//获取时间戳，以时间戳作为存储名称
			
			int pointIndex = file.getOriginalFilename().indexOf(".");//点号的位置
		    String fileSuffix = file.getOriginalFilename().substring(pointIndex);//截取文件后缀
		    
			File savedFile = new File(uploadPath+"\\"+fileRealName+fileSuffix);//服务器文件存取路径
			try {
				file.transferTo(savedFile);
				return fileRealName+fileSuffix;
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "0";
			}
		}else{
			return "0";
		}
	}
	
	/**
	 * 删除文件
	 * @param fileName
	 * @return
	 */
	public static boolean deleteFile(String fileName) {
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
        	boolean b = false;
        	int count = 0;
        	while(!b){
        		if(count<=3){
        			System.gc();
                	b = file.delete();
        		}else{
        			break;
        		}
        	}
            return b;
        } else {
        	System.out.println("文件不存在！");
            return false;
        }
    }
	
	/**
	 * 根据图片路径获取base64
	 * @return
	 */
	public static String getPhotoBase64(String filePath){
		InputStream in = null;
		byte[] data = null;
		try {
			in = new FileInputStream(filePath);
			data = new byte[in.available()];
			in.read(data);
			in.close();
		} catch (IOException e) {
			return "-1";
		}
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(data);
	}
	
	/**
     * 对图片进行缩小
     * @param originalImage 原始图片
     * @param times 缩小倍数
     * @return 缩小后的Image
     */
    public static BufferedImage zoomOutImage(BufferedImage  originalImage, Integer times){
        int width = 71;
        int height = 99;
        BufferedImage newImage = new BufferedImage(width,height,originalImage.getType());
        Graphics g = newImage.getGraphics();
        g.drawImage(originalImage, 0,0,width,height,null);
        g.dispose();
        return newImage;
    }
    
    /**
     * 根据文件路径获取文件列表
     * @param path
     * @return
     */
    public List getFileList(String path) { 
		List list = new ArrayList(); 
		try { 
			File file = new File(path); 
			String[] filelist = file.list(); 
			for (int i = 0; i < filelist.length; i++) { 
				list.add(path+"\\"+filelist[i]); 
			} 
		} catch (Exception e) { 
			e.printStackTrace(); 
		} 
		return list; 
	} 
    
    /**
     * 文件复制
     * source：源文件（完整路径，包含文件名）
     * dest：目标文件（完整路径，包含文件名）
     * @param source
     * @param dest
     */
    public static void copyNio(String source, String dest) {
        FileChannel input = null;
        FileChannel output = null;
        try {
            input = new FileInputStream(new File(source)).getChannel();
            output = new FileOutputStream(new File(dest)).getChannel();
            output.transferFrom(input, 0, input.size());
        } catch (Exception e) {
            System.out.println(e);
        } 
    }
    
    /**
	 * Word文档转换
	 * 
	 * @param inputFile
	 * @param pdfFile
	 */
	public static boolean word2PDF(String inputFile, String pdfFile) {
		ComThread.InitMTA(true);
	    long start = System.currentTimeMillis();
	    ActiveXComponent app = null;
	    Dispatch doc = null;
	    try {
	        app = new ActiveXComponent("Word.Application");// 创建一个word对象
	        app.setProperty("Visible", new Variant(false)); // 不可见打开word
	        app.setProperty("AutomationSecurity", new Variant(3)); // 禁用宏
	        Dispatch docs = app.getProperty("Documents").toDispatch();// 获取文挡属性
 
	        System.out.println("打开文档 >>> " + inputFile);
	        // Object[]第三个参数是表示“是否只读方式打开”
	        // 调用Documents对象中Open方法打开文档，并返回打开的文档对象Document
	        doc = Dispatch.call(docs, "Open", inputFile, false, true).toDispatch();
	        System.out.println("转换文档 [" + inputFile + "] >>> [" + pdfFile + "]");
            // 调用Document对象的SaveAs方法，将文档保存为pdf格式
            // word保存为pdf格式宏，值为17
            Dispatch.call(doc, "SaveAs", pdfFile, wdFormatPDF);// word保存为pdf格式宏，值为17
 
	        long end = System.currentTimeMillis();
 
	        //System.out.println("用时：" + (end - start) + "ms.");
	        return true;
	    } catch (Exception e) {
	        e.printStackTrace();
	        System.out.println("========Error:文档转换失败：" + e.getMessage());
	    } finally {
	        Dispatch.call(doc, "Close", false);
	        System.out.println("关闭文档");
	        if (app != null)
	            app.invoke("Quit", new Variant[] {});
            // 如果没有这句话,winword.exe进程将不会关闭
            ComThread.Release();
            ComThread.quitMainSTA();
        }
	    return false;
	}
}
