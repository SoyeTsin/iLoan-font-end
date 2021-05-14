<template>
  <div id="NotificationEdit">
    <div class="group-manager">
      <a-col type="flex">
        <a-col flex="1" style="width: 100%">
          <CollapseCard ref="tree" lg="12" :title="$t('noti.notification')">
            <a-form>
              <a-form-item :label="$t('noti.notification_name')">
                <a-input
                  v-model="NotiDetail.NotificationName"
                  style="width: 30%"
                  :max-length="50"
                  :disabled="NotiDetail.NotificationName === this.$t('noti.default')"
                />
              </a-form-item>
            </a-form>
          </CollapseCard>
        </a-col>
        <a-col :flex="7">
          <CollapseCard :title="$t('noti.time_slot')">
            <a-col>
              <a-row :gutter="12">
                <a-col
                  v-for="(slot, i) in NotiDetail.TimeSlot"
                  :key="slot.id"
                  :span="8"
                >
                  <a-row>
                    <div class="headbox">{{ $t('noti.time_slot')+ (i + 1) }}</div>
                  </a-row>
                  <div style="padding: 20px">
                    <a-row>
                      <p>{{ $t('noti.use_time_slot') }}</p>
                      <a-switch
                        v-model="slot.Used"
                        style="margin-bottom: 20px"
                        @change="useChange(slot, i)"
                      />
                    </a-row>
                    <p>{{ $t('noti.time_range') }}</p>
                    <div>
                      <a-input
                        v-model="slot.TimeRange"
                        style="width: 50%"
                        :disabled="!slot.Used || slot.BeforAfter === 'I'"
                        :max-length="2"
                        @change="change(i)"
                      />
                      {{ $t('loan.days') }}
                      <a-row style="margin: 16px 0">
                        <a-col :span="2">
                          <a-radio-group
                            v-model="slot.BeforAfter"
                            :disabled="!slot.Used"
                          >
                            <a-radio value="B"> {{ $t('noti.before') }} </a-radio>
                            <a-radio value="A"> {{ $t('noti.after') }} </a-radio>
                            <a-radio value="I"> {{ $t('noti.instant') }} </a-radio>
                          </a-radio-group>
                        </a-col>
                      </a-row>
                      <a-col style="margintop: 20px">
                        <p>{{ $t('noti.date_type') }}</p>
                        <a-select
                          v-model="slot.DateType"
                          style="width: 100%"
                          :placeholder="$t('noti.date_type')"
                          default-value="01"
                          :disabled="!slot.Used"
                        >
                          <a-select-option :key="1" value="01">
                            {{ $t('noti.repayment_date') }}
                          </a-select-option>
                        </a-select>
                      </a-col>
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-col>
                <div style="margin: 30px 20px 0px">
                  <a-button
                    style="width: 30%"
                    type="primary"
                    @click="addMoreSlot"
                  >{{ $t('noti.add_time_slot') }}</a-button>
                </div>
              </a-col>
            </a-col>
          </CollapseCard>
        </a-col>
      </a-col>
      <CollapseCard :title="$t('noti.email')">
        <a-form>
          <a-form-item :label="$t('noti.subject')">
            <a-input
              v-model="NotiDetail.NoteTopic"
              style="width: 100%"
              :placeholder="$t('noti.subject')"
              :max-length="100"
            />
          </a-form-item>
        </a-form>
        <ckeditor v-model="NotiDetail.NoteContent" />
      </CollapseCard>
    </div>
    <div class="submit-content">
      <a-button style="margin-right: 16px" @click="reset">{{
        $t("Utils.reset")
      }}</a-button>
      <a-button @click="save">{{ $t("message.save_btn") }} </a-button>
    </div>
  </div>
</template>

<script>
import Noti from "@/service/notification";

export default {
  components: {},
  data() {
    return {
      slotkey: 1,
      NotiDetail: {
        NotificationName: "",
        TimeSlot: [{ key: 1 }],
        NoteContent: "",
        NoteTopic: ""
      },
      OldNotiDetail: {
        NotificationName: "",
        TimeSlot: [{ key: 1 }],
        NoteContent: "",
        NoteTopic: ""
      },
      TimeRange: 1
    };
  },

  mounted() {
    this.TempId = this.$route.query.TempId;
    if (!this.TempId) {
      this.NotiDetail.NotificationName = this.$route.query.NotificationName;
      this.OldNotiDetail.NotificationName = this.$route.query.NotificationName;
    } else {
      Noti.queryNotification({ TempId: this.TempId }).then((res) => {
        if (!res.Records[0].TimeSlot || res.Records[0].TimeSlot?.length <= 0) {
          res.Records[0].TimeSlot = [{ id: 1 }];
        } else {
          res.Records[0].TimeSlot.forEach((element) => {
            element.Used = element.UseFlag === "Y";
          });
        }

        this.NotiDetail = res.Records[0];
        this.OldNotiDetail = JSON.parse(JSON.stringify(res.Records[0]));
      });
    }
  },
  methods: {
    addMoreSlot() {
      this.NotiDetail.TimeSlot.push({ key: this.slotkey++ });
    },

    change(i) {
      const value = this.NotiDetail.TimeSlot[i].TimeRange.replace(/[^\d]/g, '')
      if (value && value !== '0') {
        this.NotiDetail.TimeSlot[i].TimeRange = Number(value)
      } else {
        this.NotiDetail.TimeSlot[i].TimeRange = null
      }
    },

    useChange(slot, i) {
      if (slot.Used && this.NotiDetail?.TimeSlot) {
        this.NotiDetail.TimeSlot.forEach((element, index) => {
          if (index !== i && element.Used) {
            element.Used = false;
          }
        });
      }
    },
    save() {
      if (this.NotiDetail?.TimeSlot) {
        this.NotiDetail.TimeSlot.forEach((element) => {
          element.UseFlag = element.Used ? "Y" : "N";
        });
      }

      if (!this.TempId) {
        Noti.addNotification({
          NoteMethod: "1",
          ...this.$route.query,
          ...this.NotiDetail
        }).then((res) => {
          if (res.State === "ok") {
            this.$message.success(this.$t('noti.edit_notification_success'));
            this.$router.push({ path: "/notification" });
          }
        });
      } else {
        Noti.updateNotification({
          NoteMethod: "1",
          ...this.$route.query,
          ...this.NotiDetail
        }).then((res) => {
          if (res.State === "ok") {
            this.$message.success(this.$t('noti.edit_notification_success'));
            this.$router.push({
              path: "/notification"
            });
          }
        });
      }
    },
    reset() {
      this.NotiDetail = JSON.parse(JSON.stringify(this.OldNotiDetail));
    }
  }
};
</script>

<style lang="less" scoped>
#NotificationEdit {
  .headbox {
    padding: 16px;
    background-color: rgb(228, 224, 224);
    text-align: center;
    border-radius: 5px;
  }
  .submit-content {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
}
</style>
