package com.xr.entity;

/**
 * 部门表(DepartmentData)
 * @author csc
 * 实体类
 */
public class DepartmentData {
	
	private String undername;//上级部门名称 新添的
	private String companyno;//上级部门名称 新添的
	private String companyname;//上级部门名称 新添的
	
    private String departmentno;

    private String departmentname;

    private String description;

    private String underno;

    private String netnode;

    
    public String getCompanyno() {
		return companyno;
	}

	public void setCompanyno(String companyno) {
		this.companyno = companyno;
	}

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public String getUndername() {
		return undername;
	}

	public void setUndername(String undername) {
		this.undername = undername;
	}

	public String getDepartmentno() {
        return departmentno;
    }

    public void setDepartmentno(String departmentno) {
        this.departmentno = departmentno == null ? null : departmentno.trim();
    }

    public String getDepartmentname() {
        return departmentname;
    }

    public void setDepartmentname(String departmentname) {
        this.departmentname = departmentname == null ? null : departmentname.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getUnderno() {
        return underno;
    }

    public void setUnderno(String underno) {
        this.underno = underno == null ? null : underno.trim();
    }

    public String getNetnode() {
        return netnode;
    }

    public void setNetnode(String netnode) {
        this.netnode = netnode == null ? null : netnode.trim();
    }
}