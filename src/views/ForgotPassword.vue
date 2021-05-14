<template>
  <div class="forgot-password">
    <div>
      <div class="title">
        {{ $t('forgotpassword.forgotpassword') }}
      </div>
      <div class="title2">
        <span>{{ $t('forgotpassword.username_password_required') }}</span>
        <a-form
          :form="forgotForm"
          class="forgot-form"
          @submit="toVerify"
        >
          <a-form-item style="margin:20px 0">
            <a-input
              v-decorator="[
                'acconutName',
                {
                  initialValue: acconutName,
                  rules: [{
                    required: true,
                    message: $t('forgotpassword.please_input_user_id')
                  }]
                }
              ]"
              style="width:400px;height:40px"
              placeholder="User ID"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'inputSmsCode',
                { rules: [{ required: true,message: $t('forgotpassword.input_smsCode') }] },
              ]"
              style="width:150px;height:40px"
            />
            <a-button
              style="width:150px;height:40px;padding:0;margin-left:50px"
              class="smsButton"
              @click="getVerificationCode"
            >
              <span v-if="!smsCode">{{ $t('forgotpassword.verification_code') }}</span>
              <span v-if="smsCode"><img
                style="width:150px;height:40px;background:red"
                :src="smsCode"
              ></span>
            </a-button>
            <a-icon
              class="refreshIcon"
              style="width:50px;height:40px;padding:0;color:blue"
              type="sync"
              @click="getCheckCode"
            />
          </a-form-item>
          <a-form-item class="errorControl">
            <div class="button-list">
              <a-button
                type="primary"
                html-type="submit"
                style="width:400px;height:40px"
                class="smscode-form-button"
              >
                {{ $t('message.next_btn') }}
              </a-button>
              <a-button type="link" @click="$router.push('/login')">{{ $t('forgotpassword.go_to_login_btn') }}</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import UM from "@/service/um";

export default {
    data() {
        return {
            acconutName: '',
            smsCode: '',
            inputSmsCode: '',
            locationUrl: '',
            uuid: ''
        }
    },
    beforeCreate() {
        this.forgotForm = this.$form.createForm(this)
    },
    mounted() {
        // this.acconutName = this.$route.params.username
        // this.locationUrl = this.$route.params.locationUrl

        if (sessionStorage.getItem("username")) {
            this.acconutName = sessionStorage.getItem("username")
        }
        if (localStorage.getItem("locationUrl")) {
            this.locationUrl = localStorage.getItem("locationUrl")
            if (this.locationUrl.indexOf("?") !== -1) {
                this.locationUrl = this.locationUrl.split("?")[0];
            }
        }
        this.getCheckCode()
    },
    methods: {

        toVerify(e) {
            e.preventDefault();
            this.forgotForm.validateFields((err, values) => {
                if (!err) {
                    console.log(values)
                    const acconutName = values.acconutName
                    const inputSmsCode = values.inputSmsCode
                    const param = {
                        "userName": acconutName,
                        "checkCode": inputSmsCode,
                        "uuid": this.uuid
                    }
                    UM.getmodifylink(param).then(res => {
                        const email = res.email
                        const userId = res.userId
                        sessionStorage.setItem("email", email);
                        sessionStorage.setItem("userId", userId);
                        localStorage.setItem("locationUrl", this.locationUrl);
                        // console.log(this.smsCode,'---')
                        this.$router.push({
                            path: "forgotPasswordVerify"
                            // params:{
                            //     email: email,
                            //     userId: userId,
                            //     locationUrl:this.locationUrl
                            // }
                        });
                    }).catch(() => {
                        this.getCheckCode()
                    });
                }
            });
        },
        getVerificationCode() {
        },

        getCheckCode() {
            const param = {
                "signal": "checkCode" // singal的值必须为 checkCode，算是一种约定.
            }
            UM.getcheckcode(param).then(res => {
                    this.smsCode = "data:image/png;base64," + res.checkCode
                    this.uuid = res.uuid
                    this.expireTime = res.expireTime
            });
        }

    }
}
</script>
<style scoped lang="less">
.forgot-password {
    overflow: hidden;
    width: 100%;
    .title {
        font-size: 36px;
        text-align: center;
        margin-top: 50px;
    }

    .title2 {
        font-size: 16px;
        text-align: center;
        margin-top: 50px;
    }

    .forgot-form {
        margin: 0 auto;
    }
    .button-list{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .smscode-form-button{
            margin-bottom: 10px;
        }
    }
}
</style>
