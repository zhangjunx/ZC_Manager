package com.xr.entity;

public class LPR_Customer {
    private Integer id;

    private Integer ucustomerid;

    private String strname;

    private String strcode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUcustomerid() {
        return ucustomerid;
    }

    public void setUcustomerid(Integer ucustomerid) {
        this.ucustomerid = ucustomerid;
    }

    public String getStrname() {
        return strname;
    }

    public void setStrname(String strname) {
        this.strname = strname == null ? null : strname.trim();
    }

    public String getStrcode() {
        return strcode;
    }

    public void setStrcode(String strcode) {
        this.strcode = strcode == null ? null : strcode.trim();
    }
}