package com.xr.entity;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

public class Product_SDData {
	private String storage1;
	private String storage2;
	private String storage;
	
	@JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
	private Date startdate;
	
	@JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
	private Date enddate;
    private Integer datano;

    private String operator;

    private String sdbill;
    
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JSONField(format="yyyy-MM-dd")
    private Date sddate;

    private Integer warecode;

    private String warename;

    private String sdperson;

    private String sdpersonname;

    private String sdpersondept;

    private String sdpersondeptname;

    private Integer supplierno;

    private String suppliername;

    private String sdstatus;

    private String statusname;

    private String itemcode;

    private String itemname;

    private BigDecimal quantity;

    private BigDecimal price;

    private BigDecimal sumamount;

    private String spec;

    private String type;

    private String unitname;

    private String itemtype;

    private String remark;

    private Integer areacode;

    private String areaname;

    private String approveperson;

    private String approvepersonname;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date approvedate;

    private String applystatus;

    private String applyname;

    private String createperson;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdate;

    private String updateperson;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedate;

    private String delperson;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date deldate;

    private String deleted;
    
    private String delreason;
    private String taxrate;

    
    public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public String getStorage1() {
		return storage1;
	}

	public void setStorage1(String storage1) {
		this.storage1 = storage1;
	}

	public String getStorage2() {
		return storage2;
	}

	public void setStorage2(String storage2) {
		this.storage2 = storage2;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public Integer getDatano() {
        return datano;
    }

    public void setDatano(Integer datano) {
        this.datano = datano;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }

    public String getSdbill() {
        return sdbill;
    }

    public void setSdbill(String sdbill) {
        this.sdbill = sdbill == null ? null : sdbill.trim();
    }

    public Date getSddate() {
        return sddate;
    }

    public void setSddate(Date sddate) {
        this.sddate = sddate;
    }

    public Integer getWarecode() {
        return warecode;
    }

    public void setWarecode(Integer warecode) {
        this.warecode = warecode;
    }

    public String getWarename() {
        return warename;
    }

    public void setWarename(String warename) {
        this.warename = warename == null ? null : warename.trim();
    }

    public String getSdperson() {
        return sdperson;
    }

    public void setSdperson(String sdperson) {
        this.sdperson = sdperson == null ? null : sdperson.trim();
    }

    public String getSdpersonname() {
        return sdpersonname;
    }

    public void setSdpersonname(String sdpersonname) {
        this.sdpersonname = sdpersonname == null ? null : sdpersonname.trim();
    }

    public String getSdpersondept() {
        return sdpersondept;
    }

    public void setSdpersondept(String sdpersondept) {
        this.sdpersondept = sdpersondept == null ? null : sdpersondept.trim();
    }

    public String getSdpersondeptname() {
        return sdpersondeptname;
    }

    public void setSdpersondeptname(String sdpersondeptname) {
        this.sdpersondeptname = sdpersondeptname == null ? null : sdpersondeptname.trim();
    }

    public Integer getSupplierno() {
        return supplierno;
    }

    public void setSupplierno(Integer supplierno) {
        this.supplierno = supplierno;
    }

    public String getSuppliername() {
        return suppliername;
    }

    public void setSuppliername(String suppliername) {
        this.suppliername = suppliername == null ? null : suppliername.trim();
    }

    public String getSdstatus() {
        return sdstatus;
    }

    public void setSdstatus(String sdstatus) {
        this.sdstatus = sdstatus == null ? null : sdstatus.trim();
    }

    public String getStatusname() {
        return statusname;
    }

    public void setStatusname(String statusname) {
        this.statusname = statusname == null ? null : statusname.trim();
    }

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

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getSumamount() {
        return sumamount;
    }

    public void setSumamount(BigDecimal sumamount) {
        this.sumamount = sumamount;
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
        this.itemtype = itemtype == null ? null : itemtype.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getAreacode() {
        return areacode;
    }

    public void setAreacode(Integer areacode) {
        this.areacode = areacode;
    }

    public String getAreaname() {
        return areaname;
    }

    public void setAreaname(String areaname) {
        this.areaname = areaname == null ? null : areaname.trim();
    }

    public String getApproveperson() {
        return approveperson;
    }

    public void setApproveperson(String approveperson) {
        this.approveperson = approveperson == null ? null : approveperson.trim();
    }

    public String getApprovepersonname() {
        return approvepersonname;
    }

    public void setApprovepersonname(String approvepersonname) {
        this.approvepersonname = approvepersonname == null ? null : approvepersonname.trim();
    }

    public Date getApprovedate() {
        return approvedate;
    }

    public void setApprovedate(Date approvedate) {
        this.approvedate = approvedate;
    }

    public String getApplystatus() {
        return applystatus;
    }

    public void setApplystatus(String applystatus) {
        this.applystatus = applystatus == null ? null : applystatus.trim();
    }

    public String getApplyname() {
        return applyname;
    }

    public void setApplyname(String applyname) {
        this.applyname = applyname == null ? null : applyname.trim();
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

	public String getDelreason() {
		return delreason;
	}

	public void setDelreason(String delreason) {
		this.delreason = delreason== null ? null : delreason.trim();
	}

	public String getTaxrate() {
		return taxrate;
	}

	public void setTaxrate(String taxrate) {
		this.taxrate = taxrate== null ? null : taxrate.trim();
	}
    
    
}