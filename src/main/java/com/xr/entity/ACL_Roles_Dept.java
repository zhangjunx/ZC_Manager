package com.xr.entity;

/**
 *  角色部门表(ACL_Roles_Dept)
 * @author csc
 *   实体类
 */
public class ACL_Roles_Dept {
	
    private Integer datano;//部门主键

    private String deptno;//部门编号

    private Integer roleId;//角色ID


	public Integer getDatano() {
        return datano;
    }

    public void setDatano(Integer datano) {
        this.datano = datano;
    }

    public String getDeptno() {
        return deptno;
    }

    public void setDeptno(String deptno) {
        this.deptno = deptno == null ? null : deptno.trim();
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}