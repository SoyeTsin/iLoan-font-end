<template>
  <a-row type="flex" justify="space-between" :gutter="10">
    <a-col :span="8">
      <collapse-card title="User Task" class="my-card my-card-left">
        <div ref="CustName" class="item-text">
          <h6>{{ $t("loan.task_status") }}</h6>
          <!-- <span>{{ loanDetails.CustName }}</span> -->
        </div>
        <div ref="CustName" class="item-text">
          <h6>{{ $t("message.user_id") }}</h6>
          <!-- <span>{{ info.age }}</span> -->
        </div>
        <div ref="CustName" class="item-text">
          <h6>{{ $t("userManager.nickname") }}</h6>
          <!-- <span>{{ Gender[info.Gender] }}</span> -->
        </div>
        <div ref="CustName" class="item-text">
          <h6>{{ $t("loan.task_number") }}</h6>
          <!-- <span>{{ Gender[info.Gender] }}</span> -->
        </div>
        <div ref="CustName" class="item-text">
          <h6>{{ $t("loan.task_date") }}</h6>
          <!-- <span>{{ Gender[info.Gender] }}</span> -->
        </div>
        <div ref="CustName" class="item-text">
          <h6>{{ $t("loan.task_time") }}</h6>
          <!-- <span>{{ Gender[info.Gender] }}</span> -->
        </div>
      </collapse-card>
    </a-col>
    <a-col :span="16">
      <collapse-card
        title="Contact History Detail"
        class="my-card my-card-right"
      >
        <a-row type="flex" justify="space-between">
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.contacted_type") }}</h6>
              <!-- <span>{{ loanDetails.CustName }}</span> -->
            </div>
          </a-col>
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.contacted_channel") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.contacted_person") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.contacted_person_name") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
          </a-col>
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.contacted_outcome") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.contacted_note") }}</h6>
              <!-- <span>{{ Gender[info.Gender] }}</span> -->
            </div>
          </a-col>
        </a-row>
      </collapse-card>
      <collapse-card title="Promise-to-pay" class="my-card my-card-right">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.current_due_date") }}</h6>
              <!-- <span>{{ loanDetails.CustName }}</span> -->
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.grace_period") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
          </a-col>
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.promise_to_pay_amount") }}</h6>
              <!-- <span>{{ Gender[info.Gender] }}</span> -->
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("loan.promise_to_pay_date") }}</h6>
              <!-- <span>{{ Gender[info.Gender] }}</span> -->
            </div>
          </a-col>
          <a-col />
        </a-row>
      </collapse-card>
      <collapse-card title="Maker" class="my-card my-card-right">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("message.user_id") }}</h6>
              <!-- <span>{{ loanDetails.CustName }}</span> -->
            </div>
          </a-col>

          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("message.maker_comment") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
          </a-col>
          <a-col />
        </a-row>
      </collapse-card>
      <collapse-card title="Checker" class="my-card my-card-right">
        <a-row type="flex" justify="space-between">
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("message.user_id") }}</h6>
              <!-- <span>{{ loanDetails.CustName }}</span> -->
            </div>
          </a-col>

          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("message.review") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
          </a-col>
          <a-col>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("message.checker_comment") }}</h6>
              <!-- <span>{{ info.age }}</span> -->
            </div>
          </a-col>
        </a-row>
      </collapse-card>
    </a-col>
  </a-row>
</template>

<style scoped lang="less">
.item-text {
  margin-bottom: 20px;

  h6 {
    font-size: 15px;
    margin-bottom: 0;
    color: #333;
  }

  span {
    font-size: 14px;
    color: #a0a0a0;
    margin-top: 5px;
    display: block;
  }
}
</style>
