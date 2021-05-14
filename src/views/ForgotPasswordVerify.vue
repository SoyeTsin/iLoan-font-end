<template>
  <div class="forgot-verify">
    <div class="step">
      <a-steps :current="current">
        <a-step :title="$t('forgotpassword.verify_identity')" />
        <a-step :title="$t('forgotpassword.set_password')" />
        <a-step :title="$t('forgotpassword.completed')" />
      </a-steps>
    </div>
    <div v-if="current==0" class="content">
      <a-spin :spinning="isSpinning">
        <div v-if="sendBefore=='yes'">
          <div>{{ $t('forgotpassword.email_bound_to_acc') }}<span style="color:red">{{ accountNum }}</span>.
            {{ $t('forgotpassword.retrieve') }}
          </div>
          <div style="margin-top:20px">{{ $t('forgotpassword.password_through_this_email') }}</div>
          <div class="button-list">
            <a-button
              type="primary"
              style="width:400px;height:40px"
              class="verifyButton"
              @click="sendEmail"
            >
              {{ $t('forgotpassword.confirm_next_step') }}
            </a-button>
          </div>
        </div>
        <div v-if="sendBefore=='no'">
          <div v-if="emailsend=='no'" class="sendSuccess">
            <a-icon class="icon-success" type="check-circle" />
            <span>{{ $t('forgotpassword.link_activation_to_email') }}</span>
          </div>
          <div v-if="emailsend=='yes'" class="sendSuccess">
            <a-icon class="icon-success" type="check-circle" />
            <span>{{ $t('forgotpassword.send_activation_to_email') }}</span>
          </div>
        </div>

        <div v-if="timeoutFlag" style="text-align:center">{{ $t('forgotpassword.email_sending_failed') }}
          <a-button type="primary" style="margin-left:20px" @click="sendEmail">{{ $t('forgotpassword.try_again') }}</a-button>
        </div>
        <div v-if="!isSpinning" class="go-login">
          <a-button type="link" @click="$router.push('/login')">{{ $t('forgotpassword.go_to_login_btn') }}</a-button>
        </div>

      </a-spin>
    </div>
    <div v-if="current==1" class="content2">
      <div v-if="linkType != 'failed'">
        <div style="margin-bottom:30px">
          <a-popover placement="rightTop">
            <template slot="content">
              <div style="font-size:12px">
                <p>
                  <a-icon v-if="newPassword && !cont1" class="password-icon-error" type="close" />
                  <a-icon v-if="newPassword && cont1" class="password-icon-success" type="check" />
                  {{ $t('forgotpassword.max_char_password') }}
                </p>
                <p>
                  <a-icon v-if="newPassword && !cont2" class="password-icon-error" type="close" />
                  <a-icon v-if="newPassword && cont2" class="password-icon-success" type="check" />
                  {{ $t('forgotpassword.letters_required') }} <br> {{ $t('forgotpassword.letters_required_cont') }}
                </p>
                <p>
                  <a-icon v-if="newPassword && !cont3" class="password-icon-error" type="close" />
                  <a-icon v-if="newPassword && cont3" class="password-icon-success" type="check" />
                  {{ $t('forgotpassword.valid_password') }} <br> {{ $t('forgotpassword.valid_password_cont') }}
                </p>
              </div>
            </template>
            <a-input
              v-model="newPassword"
              type="password"
              style="height:40px"
              :placeholder="$t('placeholder.input_new_password')"
              @change="changePassword"
            />
          </a-popover>
        </div>
        <div style="margin-bottom:50px">
          <a-input
            v-model="confirmPassword"
            type="password"
            style="height:40px"
            :placeholder="$t('placeholder.input_confirm_password')"
          />
        </div>
        <div>
          <a-button type="primary" style="height:40px;width:100%" @click="uptPassword">{{ $t('message.comfirm_btn') }}</a-button>
        </div>
      </div>
      <div v-if="linkType == 'failed'" class="link-faild">
        <span>{{ $t('forgotpassword.modify_link_failed') }}</span>
      </div>
      <div v-if="!isSpinning" class="go-login">
        <a-button type="link" @click="$router.push('/login')">{{ $t('forgotpassword.go_to_login_btn') }}</a-button>
      </div>
    </div>
    <div v-if="current==2" class="content3">
      <div class="sendSuccess">
        <a-icon class="icon-success" type="check-circle" />
        <span>{{ $t('forgotpassword.changed_password_successfully') }}</span>
      </div>
      <div style="display: flex;justify-content: center;">
        <a-button
          type="primary"
          style="width:400px;height:40px"
          class="verifyButton"
          @click="toLogin"
        >
          {{ $t('forgotpassword.go_to_login_btn') }}
        </a-button>
      </div>
    </div>

  </div>
</template>
<script>
import UM from "@/service/um";

export default {
    data() {
        return {
            current: 0,
            accountNum: '',
            sendBefore: 'yes',
            newPassword: '',
            confirmPassword: '',
            userId: '',
            link: '',
            showEmail: '',
            linkType: '',
            emailsend: '',
            timeoutFlag: false,
            isSpinning: false
        };
    },
    mounted() {
        console.log(window.location.href)
      console.log(this.$route.query)
        const option = this.$route.query || {};
      // 如果是邮箱点击跳转过来的
        if (option.key) {
            this.checkmodifylink()
        }
      // console.log(window)
      //   // this.disableBack()
      //   // this.accountNum = this.$route.params.email
      //   // this.userId = this.$route.params.userId
      //   // this.locationUrl = this.$route.params.locationUrl
      //   this.from = this.$route.params.from
      //   this.locationUrl = localStorage.getItem("locationUrl")
      //   if (this.from == 'login' || sessionStorage.getItem("from") == 'login') {
      //       this.current = 1
      //       // this.locationUrl = this.$route.params.locationUrl
      //       // localStorage.setItem("locationUrl",this.locationUrl)
      //       sessionStorage.setItem("from", "login")
      //       this.checkmodifylink()
      //   }
      //   if (sessionStorage.getItem("sendBefore") == 'no') {
      //       this.sendBefore = 'no'
      //   }
        this.emailsend = sessionStorage.getItem("emailsend")
        this.accountNum = sessionStorage.getItem("email")
        // this.showEmail = this.setEmail(this.accountNum)
        this.userId = sessionStorage.getItem("userId")

        //  console.log(this.locationUrl,JSON.stringify(this.locationUrl),'llkkjj=====')
    },
    methods: {
        /**
         * @Desc Checkmodifylink
         * @Author zhouyiqiong
         * @Date 2020-02
         * @Param
         * @Return
         */
        checkmodifylink() {
            const param = {
                "link": window.location.href
            }
            this.linkType = '';
            UM.checkmodifylink(param).then(res => {
                 this.userId = res.userId
                this.current = 1;
            }).catch(() => {
                this.linkType = "failed"
            })
        },
        toLogin() {
            this.$router.push({
                path: "login"
            });
        },
        /**
         * @Desc Forgetpasswdmodify
         * @Author zhouyiqiong
         * @Date 2020-02
         * @Param
         * @Return
         */
        uptPassword() {
            if (this.newPassword !== this.confirmPassword) {
                this.$message.error(this.t('forgotpassword.password_confirmation_error'));
                return
            }
            if (!this.cont1) {
                this.$message.error(this.t('forgotpassword.password_too_short'));
                return
            }
            if (!this.cont2 || !this.cont3) {
                this.$message.error(this.t('forgotpassword.password_does_not_meet_specifications'));
                return
            }
            const param = {
                "userId": Number(this.userId),
                "newPassword": this.newPassword,
                "link": window.location.href
            }
            UM.forgetpasswdmodify(param).then(data => {
                this.$message.success(this.t('forgotpassword.password_reset_complete'));
                this.current++
            })
        },
        sendEmail() {
            this.isSpinning = true
            this.sendBefore = 'no'
            this.timeoutFlag = false
            const param = {
                "userId": Number(this.userId),
                "link": window.location.href,
                "email": this.accountNum,
                "message": "",
                "subject": "Forget the password"
            }
            UM.sendmodifylink(param).then(res => {
                sessionStorage.setItem("sendBefore", this.sendBefore)
                this.emailsend = 'no'
                sessionStorage.setItem("emailsend", 'no')
            }).catch(err => {
                if (err.code === 'ECONNABORTED' && err.message?.indexOf('timeout') !== -1) {
                    this.isSpinning = false
                    this.timeoutFlag = true
                }
              if (err.errorCode === 100229) {
                this.emailsend = 'yes'
                sessionStorage.setItem("emailsend", 'yes')
              }
                this.current = 0;
              this.sendBefore = 'yes'
            }).finally(() => {
              this.isSpinning = false
            });
        },
        // 判断密码是否符合条件
        changePassword() {
            this.cont1 = this.newPassword.length >= 8 && this.newPassword.length <= 20;
            // ~!@#$%^&*()_+|<>,.?/:;'\\[\\]{}\"
            const gex = /^[a-zA-Z0-9~!"-@#$%^&*()_+|<>',.?/:;{}]*$/;
            this.cont2 = gex.test(this.newPassword);
            let num = 0
            if (/[0-9]/.test(this.newPassword)) {
                num = num + 1
            }
            if (/[A-Za-z]/.test(this.newPassword)) {
                num = num + 1
            }

            if (/[~!"-@#$%^&*()_+|<>',.?/:;{}]/.test(this.newPassword)) {
                num = num + 1
            }
            this.cont3 = num == 3;
        },
        setEmail(accountNum) {
            const str = accountNum.split('@'); let _s = '';
            if (str[0].length > 1) {
                _s = str[0].substr(0, 1);
                for (let i = 0;
                    i < str[0].length - 2;
                    i++) {
                    _s += '*';
                }
                _s += str[0].substr(str[0].length - 1, 1);
            } else {
                _s = str[0].substr(0, 1);
                for (let i = 0;
                    i < str[0].length - 1;
                    i++) {
                    _s += '*';
                }
            }
            return _s + '@' + str[1];
        },
        disableBack() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function() {
                history.pushState(null, null, document.URL);
            });
        }
    }
};
</script>
<style lang="less">
.forgot-verify {
    overflow: hidden;
    width: 100%;
    .step {
        margin: 50px auto;
        padding: 0 20%;
    }

    .content {
        margin: 150px auto;
        padding: 0 20% 0 22%;
        font-size: 20px;
    }

    .content3 {
        margin: 30px auto;
        padding: 0 20% 0 22%;
        font-size: 20px;
    }

    .content2 {
        margin: 0 auto;
        padding: 50px 35%;
    }

    .verifyButton {
        margin: 50px 0 10px 0;
    }

    .sendSuccess {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 50px;
        text-align: center;
        justify-content: center;
        .icon-success {
            font-size: 30px;
            color: #1890ff;
            margin-right: 20px;
        }
    }

    .link-faild {
        font-size: 22px;
        margin: 0 auto;
        text-align: center;
    }
}
.button-list,.go-login{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.go-login{
    margin-top: 20px;
}
</style>
