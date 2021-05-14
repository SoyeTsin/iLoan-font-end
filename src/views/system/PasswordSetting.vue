<template>
  <div class="password-setting">
    <a-row type="flex" style="margin-bottom:80px">
      <a-col :span="20" class="title"><label class="col-form-label">
        <span v-if="type=='need'">{{ $t('passwordsetting.reset_password') }}</span>
        <span v-if="type=='passwdexpire'">{{ $t('passwordsetting.password_expires') }}</span>
      </label></a-col>
    </a-row>
    <a-row v-if="type =='passwdexpire'" type="flex" style="margin:20px 0">
      <a-col :xs="{ span: 4 }" :lg="{ span: 3}" style="min-width:160px"><label
        class="col-form-label"
      >{{ $t('comm.old_password') }}</label></a-col>
      <a-col :span="4" style="margin-right:20px;min-width:220px">
        <a-input v-model="inputOldPassword" type="password" />
      </a-col>
    </a-row>
    <a-row type="flex">
      <a-col :xs="{ span: 4 }" :lg="{ span: 3}" style="min-width:160px"><label
        class="col-form-label"
      >{{ $t('comm.new_password') }}</label></a-col>
      <a-col :span="4" style="margin-right:20px;min-width:220px">
        <!-- <a-input type="password" v-model="newPassword" /> -->
        <a-popover placement="rightTop">
          <div slot="content">
            {{ $t('passwordsetting.password_format_policy') }}
          </div>
          <a-input v-model="newPassword" type="password" @change="changePassword" />
        </a-popover>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin:20px 0">
      <a-col :xs="{ span: 4 }" :lg="{ span: 3}" style="min-width:160px"><label
        class="col-form-label"
      >{{ $t('comm.confirm_password') }}</label></a-col>
      <a-col :span="4" style="margin-right:20px;min-width:220px">
        <a-input v-model="confirmPassword" type="password" />
      </a-col>
    </a-row>
    <a-row type="flex">
      <a-col :xs="{ span: 4 }" :lg="{ span: 3}" style="min-width:160px" />
      <a-col style="text-align:left;min-width:110px" :span="2">
        <a-button type="primary" style="width:100px" @click="uptPassword">{{ $t('message.save_btn') }}</a-button>
      </a-col>
      <a-col style="text-align:right;min-width:110px" :span="2">
        <a-button type="primary" style="width:100px" @click="back">{{ $t('message.back_btn') }}</a-button>
      </a-col>
    </a-row>
    <a-row type="flex">
      <a-col :xs="{ span: 4 }" :lg="{ span: 3}" style="min-width:160px" />
      <a-col :span="20" style="margin-top:60px;">
        <p v-if="type=='need'" style="color:red">{{ $t('passwordsetting.points_for_attention') }}</p>
        <p v-if="type=='need'">{{ $t('passwordsetting.protect_your_privacy') }}</p>
        <div>
          <div><span v-if="type=='need'">2.</span> {{ $t('passwordsetting.format_requirements') }}</div>
          <div>{{ $t('passwordsetting.max_char_password') }}</div>
          <div>{{ $t('passwordsetting.letters_required') }}</div>
          <div>{{ $t('passwordsetting.valid_password') }}</div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import UM from "@/service/um";

export default {
  data() {
    return {
      // 新密码
      newPassword: null,
      // 确认密码
      confirmPassword: null,
      // 判断是否8-20位字符
      cont1: false,
      // 判断只能包含大小写字母、数字以及标点符号（除空格）
      cont2: false,
      // 判断大写字母、小写字母、数字及标点符号至少包含3种
      cont3: false,
      inputOldPassword: ''
    };
  },
  computed: {
    type() {
      return sessionStorage.getItem('passwordType') || 'need'
    }
  },
  mounted() {
    this.oldpassword = this.$route.params.oldpassword;
  },
  methods: {
    // 判断密码是否符合条件
    changePassword() {
      if (this.newPassword.length >= 8 && this.newPassword.length <= 20) {
        this.cont1 = true;
      } else {
        this.cont1 = false;
      }
      // ~!@#$%^&*()_+|<>,.?/:;'\\[\\]{}\"
      const gex = /^[a-zA-Z0-9~!"-@#$%^&*()_+|<>',.?/:;{}]*$/;
      if (gex.test(this.newPassword)) {
        this.cont2 = true;
      } else {
        this.cont2 = false;
      }
      let num = 0;
      if (/[0-9]/.test(this.newPassword)) {
        num = num + 1;
      }
      if (/[A-Z]/.test(this.newPassword)) {
        num = num + 1;
      }
      if (/[a-z]/.test(this.newPassword)) {
        num = num + 1;
      }

      if (/[~!"-@#$%^&*()_+|<>',.?/:;{}]/.test(this.newPassword)) {
        num = num + 1;
      }
      if (num >= 3) {
        this.cont3 = true;
      } else {
        this.cont3 = false;
      }
    },
    /**
     * @Desc return to previous page 返回上一页
     * @Author zhouyiqiong
     * @Date 2019-11-9 9:40
     */
    back() {
      this.$router.push({
        path: 'Login.vue',
        name: 'Login.vue'
      });
    },
    // 确认更新密码
    uptPassword() {
      // if (this.type == 'passwdexpire' && this.inputOldPassword != this.oldpassword) {
      //   this.$message.error(this.$t('changePassword.errorOldPassword'));
      //   return;
      // }
      if (this.newPassword !== this.confirmPassword) {
        this.$message.error(this.$t('changePassword.confirmPasswordError'));
        return;
      }
      if (!this.cont1 || !this.cont2 || !this.cont3) {
        this.$message.error(this.$t('changePassword.passwordNotSpecifications'));
        return;
      }
      const param = {
        'oldpassword': this.oldpassword || this.inputOldPassword,
        'password': this.newPassword
      };
      UM.umUserPassword(param).then((res) => {
        this.$message.success(this.$t('changePassword.changePasswordSuccess'));
        this.$router.back(-1)
      }).catch(err => {
        this.$message.error(err.errorMsg);
      })
    }
  }
};
</script>

<style lang="less">
.password-setting {
  height: 100vh;
  padding: 3vw 10vw;

  .title {
    font-size: 20px;
  }
}

.password-icon-error {
  color: #C24F52;
  font-size: 14px;
  font-weight: bolder;
}

.password-icon-success {
  color: #00B722;
  font-size: 14px;
  font-weight: bolder;
}
</style>
