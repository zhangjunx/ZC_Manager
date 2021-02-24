package com.xr.entity;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @ClassName ProductData
 * @Description 成品基本资料表对应的实体类
 * @Author csc
 * @Date 2019年12月23日 下午8:48:26
 */
public class ProductData {
    private String itemcode;//成品编码

    private String itemname;//成品名称

    private String spec;//规格

    private String type;//型号

    private String unitname;//计量单位

    private String itemtype;//所属类别()

    private String remark;//备注

    private BigDecimal storage;//库存量

    private String createperson;//创建人

    private Date createdate;//创建日期

    private String updateperson;//修改人

    private Date updatedate;//修改日期

    private String delperson;//删除人

    private Date deldate;//删除日期

    private String deleted;//是否删除(0删除,1存在)

    public String getItemcode() {
        return itemcode;
    }

    public void setItemcode(String itemcode) {
        this.itemcode = itemcode == null ? null : itemcode.trim();
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname == null ? null : itemname.trim();
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec == null ? null : spec.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getUnitname() {
        return unitname;
    }

    public void setUnitname(String unitname) {
        this.unitname = unitname == null ? null : unitname.trim();
    }


	public String getItemtype() {
		return itemtype;
	}

	public void setItemtype(String itemtype) {
		this.itemtype = itemtype== null ? null : unitname.trim();
	}

	public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public BigDecimal getStorage() {
        return storage;
    }

    public void setStorage(BigDecimal storage) {
        this.storage = storage;
    }

    public String getCreateperson() {
        return createperson;
    }

    public void setCreateperson(String createperson) {
        this.createperson = createperson == null ? null : createperson.trim();
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public String getUpdateperson() {
        return updateperson;
    }

    public void setUpdateperson(String updateperson) {
        this.updateperson = updateperson == null ? null : updateperson.trim();
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public String getDelperson() {
        return delperson;
    }

    public void setDelperson(String delperson) {
        this.delperson = delperson == null ? null : delperson.trim();
    }

    public Date getDeldate() {
        return deldate;
    }

    public void setDeldate(Date deldate) {
        this.deldate = deldate;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted == null ? null : deleted.trim();
    }
}