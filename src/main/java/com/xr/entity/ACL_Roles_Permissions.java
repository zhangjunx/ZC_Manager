package com.xr.entity;


/**
 * 角色功能表(ACL_Roles_Permissions)
 * @author csc
 *  实体类
 */
public class ACL_Roles_Permissions {
	//private ACL_Permissions permissiondata;
	//private ACL_Roles roledata;
	
    private Integer id;//主键

    private Integer permissionId;//功能表

    private Integer roleId;//角色ID关联角色表
    
	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
     
    
}