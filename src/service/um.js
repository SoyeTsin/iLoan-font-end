import ajax from "../lib/ajax";
import common from "@/lib/common";

const UM = {
    // 获取公钥
    getRsaKey() {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/rsakey', { "signal": "rsa" }).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * @Author Kozi
     * @param {string} param.userName
     * @param {string} param.password
     * @returns {Promise<Object>}
     */
    login(param, option) {
        return new Promise((resolve, reject) => {
            this.getRsaKey().then(rsaKey => {
                param.password = common.encodePassword(param.password, rsaKey);
                localStorage.setItem('rsaKey', rsaKey)
                ajax.post('/um/v1/newlogin', param, option).then(res => {
                    resolve(res.response)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * @Author Kozi
     * @param {Array} param.roles
     * @returns {Promise<Object>}
     */
    getauthcode(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/getauthcode', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询可访问菜单/功能/按钮
    newmenu(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/category/newmenu', param).then(res => {
                resolve(res.response || [])
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询用户列表
    queryUserList(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/list', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查找用户角色
    queryRoleList(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/category/query', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 添加用户
    addUser(param) {
        return new Promise((resolve, reject) => {
            this.getRsaKey().then(rsaKey => {
                param.password = common.encodePassword(param.password, rsaKey);
                ajax.post('/um/v1/user/add', param).then(res => {
                    resolve(res.response)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 修改用户信息
    updateUserInfo(param) {
        return new Promise((resolve, reject) => {
            if (param.password) {
                this.getRsaKey().then(rsaKey => {
                    param.password = common.encodePassword(param.password, rsaKey);
                    ajax.post('/um/v1/user/update', param).then(res => {
                        resolve(res.response)
                    }).catch(error => {
                        reject(error)
                    })
                }).catch(error => {
                    reject(error)
                })
            } else {
                ajax.post('/um/v1/user/update', param).then(res => {
                    resolve(res.response)
                }).catch(error => {
                    reject(error)
                })
            }
        })
    },
    // 删除用户
    deleteUserInfo(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/delete', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 冻结账户
    deactive(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/deactive', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 解冻账户
    active(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/active', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 解绑用户
    unBindUser(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/unbindauth', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询系统用户组
    queryGroupList(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/group/list', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 删除用户组
    deleteGroup(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/group/delete', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 新增用户组
    addGroupUser(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/group/addusers', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 删除用户组用户
    deleteGroupUser(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/group/deleteusers', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 更新用户组
    updateGroup(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/group/update', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 新增用户组
    addGroup(param) {
        return new Promise((resolve, reject) => {
            param.OrgId = `100001`
            ajax.post('/um/v1/group/add', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * @Author Kozi
     * @param {Array<Number>} param.roles
     * @returns {Promise<Object>}
     */
    getMenu(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/category/newmenu', param).then(res => {
                resolve(res.response || [])
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询菜单列表
    menuQuery(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/menu/newlist', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 按钮查询
    buttonQuery(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/menu/getbutton', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取ci列表
    ciQuery(param) {
        return new Promise((resolve, reject) => {
            ajax.post('v1/eadm/GetMetaChildren', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 根据角色查ci
    roleQuery(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/category/query', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 根据角色查ci
    queryCiByRole(param) {
        return new Promise((resolve, reject) => {
            ajax.post('v1/eadm/GetMetaModelToMenu', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询角色的菜单按钮权限
    autOfRole(param) {
        return new Promise((resolve, reject) => {
            ajax.post('um/v1/category/newmenu', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 更新角色菜单按钮权限
    addRole(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/category/add', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    }, // 更新角色菜单按钮权限
    deleteRole(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/category/delete', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 更新角色菜单按钮权限
    updateRole(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/category/update', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 新增菜单
    newAddMenu(param) {
        return new Promise((resolve, reject) => {
            ajax.post('um/v1/menu/newadd', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 修改菜单
    newUpdateMenu(param) {
        return new Promise((resolve, reject) => {
            ajax.post('um/v1/menu/newupdate', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 删除菜单
    newDeleteMenu(param) {
        return new Promise((resolve, reject) => {
            ajax.post('um/v1/menu/newdelete', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 修改密码
    umUserPassword(param) {
        return new Promise((resolve, reject) => {
            console.log(param)
            this.getRsaKey().then(rsaKey => {
                if (param.oldpassword) {
                    param.oldpassword = common.encodePassword(param.oldpassword, rsaKey);
                }
                param.password = common.encodePassword(param.password, rsaKey);
                ajax.post('/um/v1/user/password', param).then(res => {
                    resolve(res.response)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 申请短信验证码
    umUserGetsmscode(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/getsmscode', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询审计内容
    auditQuery(param) {
        return new Promise((resolve, reject) => {
            ajax.post('rapm/v1/log/query', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取验证码
    getcheckcode(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/getcheckcode', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getmodifylink(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/getmodifylink', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    checkmodifylink(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/checkmodifylink', param).then(res => {
                resolve(res.response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    forgetpasswdmodify(param) {
        return new Promise((resolve, reject) => {
            this.getRsaKey().then(rsaKey => {
                param.newPassword = common.encodePassword(param.newPassword, rsaKey);
                localStorage.setItem('rsaKey', rsaKey)
                ajax.post('/um/v1/user/forgetpasswdmodify', param).then(res => {
                    resolve(res.response)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    },
    sendmodifylink(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/um/v1/user/sendmodifylink', param).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default UM
