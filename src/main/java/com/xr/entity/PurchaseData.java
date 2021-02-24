package com.xr.entity;

import java.math.BigDecimal;
import java.util.Date;

public class PurchaseData {
    private Integer datano;

    private String purchaseorder;

    private String purchaseperson;

    private String purchasepersonname;

    private String purchaseitemcode;

    private String purchaseitemname;

    private BigDecimal purchasequantity;

    private BigDecimal price;

    private BigDecimal sumamount;

    private Date purchasedate;

    private String applystatus;

    private String applyname;

    private String purchaseapprove;

    private String purchaseapprovename;

    private String createperson;

    private Date createdate;

    private String updateperson;

    private Date updatedate;

    private String delperson;

    private Date deldate;

    private String deleted;

    public Integer getDatano() {
        return datano;
    }

    public void setDatano(Integer datano) {
        this.datano = datano;
    }

    public String getPurchaseorder() {
        return purchaseorder;
    }

    public void setPurchaseorder(String purchaseorder) {
        this.purchaseorder = purchaseorder == null ? null : purchaseorder.trim();
    }

    public String getPurchaseperson() {
        return purchaseperson;
    }

    public void setPurchaseperson(String purchaseperson) {
        this.purchaseperson = purchaseperson == null ? null : purchaseperson.trim();
    }

    public String getPurchasepersonname() {
        return purchasepersonname;
    }

    public void setPurchasepersonname(String purchasepersonname) {
        this.purchasepersonname = purchasepersonname == null ? null : purchasepersonname.trim();
    }

    public String getPurchaseitemcode() {
        return purchaseitemcode;
    }

    public void setPurchaseitemcode(String purchaseitemcode) {
        this.purchaseitemcode = purchaseitemcode == null ? null : purchaseitemcode.trim();
    }

    public String getPurchaseitemname() {
        return purchaseitemname;
    }

    public void setPurchaseitemname(String purchaseitemname) {
        this.purchaseitemname = purchaseitemname == null ? null : purchaseitemname.trim();
    }

    public BigDecimal getPurchasequantity() {
        return purchasequantity;
    }

    public void setPurchasequantity(BigDecimal purchasequantity) {
        this.purchasequantity = purchasequantity;
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

    public Date getPurchasedate() {
        return purchasedate;
    }

    public void setPurchasedate(Date purchasedate) {
        this.purchasedate = purchasedate;
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

    public String getPurchaseapprove() {
        return purchaseapprove;
    }

    public void setPurchaseapprove(String purchaseapprove) {
        this.purchaseapprove = purchaseapprove == null ? null : purchaseapprove.trim();
    }

    public String getPurchaseapprovename() {
        return purchaseapprovename;
    }

    public void setPurchaseapprovename(String purchaseapprovename) {
        this.purchaseapprovename = purchaseapprovename == null ? null : purchaseapprovename.trim();
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