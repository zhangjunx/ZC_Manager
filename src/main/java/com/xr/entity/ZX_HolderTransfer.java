package com.xr.entity;

import java.util.Date;

public class ZX_HolderTransfer {
    private Integer id;

    private String holderno;

    private String holdername;

    private String idcode;

    private String deptno1;

    private String deptname1;

    private String deptno2;

    private String deptname2;

    private String updateperson;

    private String updatepersonname;

    private Date updatedate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHolderno() {
        return holderno;
    }

    public void setHolderno(String holderno) {
        this.holderno = holderno == null ? null : holderno.trim();
    }

    public String getHoldername() {
        return holdername;
    }

    public void setHoldername(String holdername) {
        this.holdername = holdername == null ? null : holdername.trim();
    }

    public String getIdcode() {
        return idcode;
    }

    public void setIdcode(String idcode) {
        this.idcode = idcode == null ? null : idcode.trim();
    }

    public String getDeptno1() {
        return deptno1;
    }

    public void setDeptno1(String deptno1) {
        this.deptno1 = deptno1 == null ? null : deptno1.trim();
    }

    public String getDeptname1() {
        return deptname1;
    }

    public void setDeptname1(String deptname1) {
        this.deptname1 = deptname1 == null ? null : deptname1.trim();
    }

    public String getDeptno2() {
        return deptno2;
    }

    public void setDeptno2(String deptno2) {
        this.deptno2 = deptno2 == null ? null : deptno2.trim();
    }

    public String getDeptname2() {
        return deptname2;
    }

    public void setDeptname2(String deptname2) {
        this.deptname2 = deptname2 == null ? null : deptname2.trim();
    }

    public String getUpdateperson() {
        return updateperson;
    }

    public void setUpdateperson(String updateperson) {
        this.updateperson = updateperson == null ? null : updateperson.trim();
    }

    public String getUpdatepersonname() {
        return updatepersonname;
    }

    public void setUpdatepersonname(String updatepersonname) {
        this.updatepersonname = updatepersonname == null ? null : updatepersonname.trim();
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }
}