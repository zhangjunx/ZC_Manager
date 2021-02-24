package com.xr.dao;

import org.springframework.stereotype.Repository;

import com.xr.entity.IODataPhoto;
@Repository
public interface IODataPhotoMapper {
    int deleteByPrimaryKey(Integer id);
    
    /**
     * 小程序人脸识别开门后要放入现场照片
     * @param record
     */
    int insertAppletOpenPhoto(IODataPhoto record);

    int insertSelective(IODataPhoto record);

    IODataPhoto selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(IODataPhoto record);

    int updateByPrimaryKeyWithBLOBs(IODataPhoto record);

    int updateByPrimaryKey(IODataPhoto record);
    IODataPhoto queryIOPhoto(Integer iodataid);//获取进出的照片
}