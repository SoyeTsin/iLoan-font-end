<template>
  <div class="login">
    <a-form
      :form="form"
      class="login-form"
      @submit="login"
    >
      <a-form-item>
        <a-input
          v-decorator="['userName',{ initialValue: cookieValue.userName,rules: [{ required: true, message: $t('message.input_your_user_id') }] },]"
          placeholder="User ID"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          v-decorator="['password',{ initialValue: cookieValue.password, rules: [{ required: true, message: $t('message.input_your_password') }] },]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="['remember',{valuePropName: 'checked',initialValue: true}]"
        >
          {{ $t('passwordsetting.remember_me') }}
        </a-checkbox>
        <a class="login-form-forgot" href="javascript:;" @click="$router.push({path:'/forgotPassword'})">
          {{ $t('forgotpassword.forgotpassword') }}
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button" :loading="loading">
          {{ $t('passwordsetting.log_in') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import UM from "@/service/um";
import CM from "@/service/common";
import commonLib from "@/lib/common";
import common from "@/utils/common";

export default {
    name: "Login",
    data() {
        return {
            loading: false,
            cookieValue: {}
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    mounted() {
        console.log(this.global)
        this.cookieValue = {
            userName: commonLib.handleCookies.getItem('userName'),
            password: commonLib.handleCookies.getItem('password')
        }
        sessionStorage.setItem('username', this.cookieValue.userName)
    },
    methods: {
        login(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    const param = {
                        userName: values.userName,
                        password: values.password
                        // code:''
                    }
                    this.loading = true
                    this.password = values.password;
                    // console.log(param)
                    if (values.remember) {
                        commonLib.handleCookies.setItem('userName', values.userName)
                        commonLib.handleCookies.setItem('password', values.password)
                    } else {
                        this.cleanCookie()
                    }
                    UM.login(param, { hideErrorMsg: true }).then(res => {
                        console.log(res)
                        const userInfo = res.data
                        const authParam = {
                            LoginOrgNo: res.data.belong[0].orgId === null ? res.data.belong[0].orgId : res.data.belong[0].orgId,
                            Empnbr: res.data.name,
                            OprType: '1'
                        }
                        sessionStorage.setItem('username', param.userName)
                        CM.auth(authParam).then(ilUser => {
                            userInfo.ilUser = ilUser;
                            userInfo.expire = res.expire;
                            localStorage.setItem('userInfo', JSON.stringify(userInfo));
                            this.global.expire = res.expire;
                            this.global.userInfo = userInfo;
                            const roles = res.data.roles.reduce((roles, item) => roles.push(item.id) && roles, [])
                            this.loading = false
                            this.newmenu({ roles: roles }, res)
                        }).catch(() => {
                            this.loading = false
                        })
                        // this.$router.replace({ path: '/' });
                    }).catch(error => {
                        console.log(error)
                        let msg = error.errorMsg
                        if (error?.errorMsg?.indexOf('user not exist') !== -1) {
                            msg = 'User ID does not exist, please retry with existing user ID'
                        } else if (error.errorMsg.indexOf('check password fail') !== -1) {
                            msg = 'Wrong password, please retry with correct password'
                        }
                        this.$message.error({ content: msg, duration: 5 })
                        this.loading = false
                    })
                }
            });
        },
        cleanCookie() {
            commonLib.handleCookies.removeItem('userName')
            commonLib.handleCookies.removeItem('password')
        },
        newmenu(param, data) {
            UM.newmenu(param).then(authData => {
                const auths = common.menuTransfer(authData)
                // console.log("auth", authData, auths)

                sessionStorage.setItem("authRawList", JSON.stringify(authData))
                sessionStorage.setItem("auths", JSON.stringify(auths))
                // 设置bss
                // this.$store.commit('SET_VIEW_PARAMS', "BSS")
                const view = this.findFirstView(auths) || {}
                sessionStorage.setItem('passwordType', data.firstTimeLogin)
                // // 第一次登陆需要修改密码
                // if (data.firstTimeLogin === 'need' || data.firstTimeLogin === 'passwdexpire') {
                //   // 100215 用户第一次登陆需要跳转至修改密码页面
                //   this.$router.push({
                //     path: "/passwordSetting",
                //     params: {
                //       oldpassword: this.password
                //     }
                //   });
                // } else {
                //   view.href = '/summary' // 调试用
                //   this.$router.push(view.href || '/login');
                // }
                view.href = '/summary' // 调试用
                this.$router.push(view.href || '/login');
            }).finally(() => {
                this.loading = false
            })
        },
        findFirstView(auths) {
            auths = auths || []
            let view = null

            function recrusive(a) {
                a = a || []
                for (let index = 0;
                    index < a.length;
                    index++) {
                    const menu = a[index];
                    if (menu.menuType == 'view') {
                        view = menu
                        break
                    }
                    return recrusive(menu.children)
                }
            }

            recrusive(auths)
            return view
        }
    }
}
</script>
<style scoped lang="less">
.login {
    background-color: #f1f3f7;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .login-form {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        width: 368px;
        padding: 30px;
        border-radius: 8px;

        .login-form-forgot {
            float: right;
        }

        .login-form-button {
            width: 100%;
        }
    }
}

</style>
