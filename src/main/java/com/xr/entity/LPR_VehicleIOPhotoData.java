package com.xr.entity;

/**
 * @ClassName LPR_VehicleIOPhotoData
 * @Description  车辆进出照片表
 * @Author csc
 * @Date 2019年12月9日 下午2:56:31
 */
public class LPR_VehicleIOPhotoData {
	
    private Integer id;//该表主键

    private Integer iodataid;//进出记录表id用于关联

    private String recordfilepath;//照片路径

    private byte[] photograph;//base64格式的现场照片

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIodataid() {
        return iodataid;
    }

    public void setIodataid(Integer iodataid) {
        this.iodataid = iodataid;
    }

    public String getRecordfilepath() {
        return recordfilepath;
    }

    public void setRecordfilepath(String recordfilepath) {
        this.recordfilepath = recordfilepath == null ? null : recordfilepath.trim();
    }

    public byte[] getPhotograph() {
        return photograph;
    }

    public void setPhotograph(byte[] photograph) {
        this.photograph = photograph;
    }//end
    
}