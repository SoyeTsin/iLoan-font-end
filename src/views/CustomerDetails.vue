<template>
  <div class="productDetails">
    <a-row type="flex">
      <a-col span="8">
        <div style="padding-right: 20px;box-sizing: border-box">
          <collapse-card :title="$t('customer.customer_acc')" class="my-card my-card-left">
            <a-icon slot="extra" type="down" class="extra" />
            <div ref="Status" class="item-text">
              <h6>{{ $t('customer.customer_status') }}</h6>
              <span>{{ customerStatus[info.Status] }}</span>
            </div>
            <div v-if="info.Status === '3'" class="item-text">
              <h6>{{ $t('message.status_reason') }}</h6>
              <span>{{ info.ApprvSugstnComnt }}</span>
            </div>
            <div ref="CustId" class="item-text">
              <h6>{{ $t('message.cif') }}</h6>
              <span>{{ idFormat(info.CustId, "cif") }}</span>
            </div>
            <div ref="CustType" class="item-text">
              <h6>{{ $t('customer.customer_type') }}</h6>
              <span>{{ CustType[info.CustType] }}</span>
            </div>
          </collapse-card>
          <!--          <collapse-card-->
          <!--            title="Customer Account"-->
          <!--            class="my-card my-card-left"-->
          <!--          >-->
          <!--            <a-icon slot="extra" type="down" class="extra" />-->
          <!--            <div class="item-text" ref="">-->
          <!--              <span class="click-line-text">~~~05178 0086071</span>-->
          <!--            </div>-->
          <!--          </collapse-card>-->
          <collapse-card
            v-for="(bank, index) in info.SignInfo"
            :key="index"
            :title="$t('customer.bank_accounts')"
            class="my-card my-card-left"
          >
            <a-icon slot="extra" type="down" class="extra" />
            <div class="card-content-header">
              <div>
                {{ $t('customer.default_bank_acc') }}
              </div>
            </div>
            <div
              :ref="'SignInfo[' + index + '].OtherBankName'"
              class="item-text"
            >
              <h6>{{ $t('message.bank_name') }}</h6>
              <span>{{ getBankName(bank.OtherBankName) }}</span>
            </div>
            <div :ref="'SignInfo[' + index + '].SwiftCode'" class="item-text">
              <h6>{{ $t('message.bic') }}</h6>
              <span>{{ bank.SwiftCode }}</span>
            </div>
            <div :ref="'SignInfo[' + index + '].AcctNo'" class="item-text">
              <h6>{{ $t('message.bank_acc_number') }}</h6>
              <span>{{ bank.AcctNo?bank.AcctNo:'-' }}</span>
            </div>
            <div :ref="'SignInfo[' + index + '].AcctName'" class="item-text">
              <h6>{{ $t('message.bank_acc_name') }}</h6>
              <span class="break-all">{{ bank.AcctName?bank.AcctName:'-' }}</span>
            </div>
            <div class="card-content-header">
              <div>
                {{ $t('customer.default_credit_card') }}
              </div>
            </div>
            <div :ref="'SignInfo[' + index + '].CreitNm'" class="item-text">
              <h6>{{ $t('customer.credit_card_number_view') }}</h6>
              <span>{{ creditCardFormat(bank.CreitNm) }}</span>
            </div>
          </collapse-card>
          <a-card>
            <a
              href="javascript:;"
              @click="
                $router.push({
                  path: '/history',
                  query: { CustId: info.CustId }
                })
              "
            >{{ $t('message.view_history_log_btn') }}</a>
          </a-card>
        </div>
      </a-col>
      <a-col span="16">
        <collapse-card :title="$t('message.identification')" class="my-card">
          <a-icon slot="extra" type="down" class="extra" />
          <a-row type="flex" :gutter="10">
            <a-col span="8">
              <div ref="Title" class="item-text">
                <h6>{{ $t('message.title') }}</h6>
                <span>{{ info.Title }}</span>
              </div>
              <div ref="FirstName" class="item-text">
                <h6>{{ $t('message.firstname') }}</h6>
                <span class="break-all">{{ info.FirstName }}</span>
              </div>
              <div ref="LastName" class="item-text">
                <h6>{{ $t('message.lastname') }}</h6>
                <span class="break-all">{{ info.LastName }}</span>
              </div>
              <div ref="Birthday" class="item-text">
                <h6>{{ $t('message.birthdate') }}</h6>
                <span>{{ info.Birthday }}</span>
              </div>
              <div ref="age" class="item-text">
                <h6>{{ $t('message.age') }}</h6>
                <span>{{ info.age }}</span>
              </div>
              <div ref="Gender" class="item-text">
                <h6>{{ $t('message.gender') }}</h6>
                <span>{{ Gender[info.Gender] }}</span>
              </div>
            </a-col>
            <a-col span="8">
              <div ref="IdType" class="item-text">
                <h6>{{ $t('message.id_type') }}</h6>
                <span>{{ IDType[info.IdType] }}</span>
              </div>
              <div ref="IdNo" class="item-text">
                <h6>{{ $t('message.certificate_id') }}</h6>
                <span class="break-all">{{
                  idFormat(info.IdNo, "certId")
                }}</span>
              </div>
              <div ref="IdCountry" class="item-text">
                <h6>{{ $t('message.passport_country') }}</h6>
                <span>{{ Country[info.IdCountry] }}</span>
              </div>
              <div ref="Country" class="item-text">
                <h6>{{ $t('message.nationality') }}</h6>
                <span>{{ Country[info.Country] }}</span>
              </div>
              <div ref="ProofId" class="item-text">
                <h6>{{ $t('message.proof_identity') }}</h6>
                <a-progress style="width: 80%" :v-if="percent < 100" :percent="percent" />
                <span
                  v-for="file in proofofIdentity.fileList"
                  :key="file.uid"
                  style="display: block"
                ><a
                  class="break-all"
                  href="javascript:;"
                  @click="previewProofOfIdentity(file)"
                >{{ file.name }}</a></span>
              </div>
            </a-col>
            <a-col span="8">
              <div ref="HouseHoldRgstNumber" class="item-text">
                <h6>{{ $t('message.household_number') }}</h6>
                <span class="break-all">{{ info.HouseHoldRgstNumber }}</span>
              </div>
              <div ref="AddressArr[0].Addr" class="item-text">
                <h6>{{ $t('message.street_address') }}</h6>
                <span class="break-all">{{ info.AddressArr[0].Addr }}</span>
              </div>
              <div ref="AddressArr[0].AddrCountry" class="item-text">
                <h6>{{ $t('message.suburb_district') }}</h6>
                <span class="break-all">{{ info.AddressArr[0].AddrCity }}</span>
              </div>
              <div ref="AddressArr[0].AddrProvinceState" class="item-text">
                <h6>{{ $t('message.state_province') }}</h6>
                <span class="break-all">{{ info.AddressArr[0].AddrProvinceState }}</span>
              </div>
              <div ref="AddressArr[0].AddrCity" class="item-text">
                <h6>{{ $t('message.country') }}</h6>
                <span>{{ Country[info.AddressArr[0].AddrCountry] }}</span>
              </div>
              <div ref="AddressArr[0].ZipCode" class="item-text">
                <h6>{{ $t('message.zipcode_postcode') }}</h6>
                <span>{{ info.AddressArr[0].ZipCode }}</span>
              </div>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('customer.contact')" class="my-card">
          <a-icon slot="extra" type="down" class="extra" />
          <a-row type="flex" :gutter="10">
            <a-col span="8">
              <div ref="ContractNo" class="item-text">
                <h6>{{ $t('customer.customer_phone_mumber') }}</h6>
                <span>{{ info.ContractNo }}</span>
              </div>
              <div ref="WorkPhoneNo" class="item-text">
                <h6>{{ $t('message.work_phone_number') }}</h6>
                <span>{{ info.WorkPhoneNo }}</span>
              </div>
              <div ref="Email" class="item-text">
                <h6>{{ $t('message.email') }}</h6>
                <span>{{ info.Email }}</span>
              </div>
            </a-col>
            <a-col span="8">
              <div class="card-content-header">{{ $t('customer.mailling_add') }}</div>
              <div ref="AddressArr[1].Addr" class="item-text">
                <h6>{{ $t('message.resident_street') }}</h6>
                <span class="break-all">{{ info.AddressArr[1].Addr }}</span>
              </div>
              <div ref="AddressArr[1].AddrCountry" class="item-text">
                <h6>{{ $t('message.resident_suburb_district') }}</h6>
                <span class="break-all">{{ info.AddressArr[1].AddrCity }}</span>
              </div>
              <div ref="AddressArr[1].AddrProvinceState" class="item-text">
                <h6>{{ $t('message.resident_state_province') }}</h6>
                <span class="break-all">{{ info.AddressArr[1].AddrProvinceState }}</span>
              </div>
              <div ref="AddressArr[1].AddrCity" class="item-text">
                <h6>{{ $t('message.resident_country') }}</h6>
                <span>{{ Country[info.AddressArr[1].AddrCountry] }}</span>
              </div>
              <div ref="AddressArr[1].ZipCode" class="item-text">
                <h6>{{ $t('message.resident_zipcode_postcode') }}</h6>
                <span>{{ info.AddressArr[1].ZipCode }}</span>
              </div>
            </a-col>
            <a-col span="8">
              <div class="card-content-header">{{ $t('customer.emergency_contact') }}</div>
              <div ref="Emergency[0].EmergencyName" class="item-text">
                <h6>{{ $t('message.emergency_contact_name') }}</h6>
                <span class="break-all">{{ info.Emergency[0].EmergencyName }}</span>
              </div>
              <div ref="Emergency[0].Relationship" class="item-text">
                <h6>{{ $t('message.emergency_contact_relationship') }}</h6>
                <span>{{
                  EmergencyContactRelationship[info.Emergency[0].Relationship]
                }}</span>
              </div>
              <div ref="Emergency[0].EmergencyContactNo" class="item-text">
                <h6>{{ $t('message.emergency_contact_phone_number') }}</h6>
                <span>{{ info.Emergency[0].EmergencyContactNo }}</span>
              </div>
              <div ref="Emergency[0].EmergencyAddr" class="item-text">
                <h6>{{ $t('message.emergency_contact_address') }}</h6>
                <span class="break-all">{{ info.Emergency[0].EmergencyAddr }}</span>
              </div>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('message.personal')" class="my-card">
          <a-icon slot="extra" type="down" class="extra" />
          <a-row type="flex" :gutter="10">
            <a-col span="8">
              <div class="card-content-header">
                {{ $t('customer.education') }}
              </div>
              <div ref="Education" class="item-text">
                <h6>{{ $t('message.highest_educate_level') }}</h6>
                <span>{{ HighestEducationLevel[info.Education] }}</span>
              </div>
              <div ref="MaxDegt" class="item-text">
                <h6>{{ $t('message.institution') }}</h6>
                <span class="break-all">{{ info.ShoolName }}</span>
              </div>
              <div ref="Major" class="item-text">
                <h6>{{ $t('message.major') }}</h6>
                <span class="break-all">{{ info.Major }}</span>
              </div>
              <div ref="MaxDegrGradDate" class="item-text">
                <h6>{{ $t('message.graduation_year') }}</h6>
                <span>{{ info.MaxDegrGradDate }}</span>
              </div>
            </a-col>
            <a-col span="8">
              <div class="card-content-header">
                {{ $t('customer.occupation') }}
              </div>
              <div ref="Job" class="item-text">
                <h6>{{ $t('customer.occupation') }}</h6>
                <span>{{ jobList[info.Job] }}</span>
              </div>
              <div ref="JobStatus" class="item-text">
                <h6>{{ $t('message.occupation_note') }}</h6>
                <span class="break-all">{{ info.JobStatus }}</span>
              </div>
              <div ref="CompanyName" class="item-text">
                <h6>{{ $t('message.employer_name') }}</h6>
                <span class="break-all">{{ info.CompanyName }}</span>
              </div>
              <div ref="CompanyAddr" class="item-text">
                <h6>{{ $t('message.employer_address') }}</h6>
                <span class="break-all">{{ info.CompanyAddr }}</span>
              </div>
              <div ref="MthIncomAmt" class="item-text">
                <h6>{{ $t('message.monthly_income') }}</h6>
                <span v-if="info.MthIncomAmt">{{ currencyCal(info.MthIncomAmt) }} {{ info.Currency }}</span>
              </div>
            </a-col>
            <a-col span="8">
              <div class="card-content-header">{{ $t('customer.marital_detail') }}</div>
              <div ref="MaritalStatus" class="item-text">
                <h6>{{ $t('message.marital_status') }}</h6>
                <span>{{ MaritalStatus[info.MaritalStatus] }}</span>
              </div>
              <div ref="SpouseName" class="item-text">
                <h6>{{ $t('message.spouse_name') }}</h6>
                <span class="break-all">{{ info.SpouseName }}</span>
              </div>
              <div ref="SpouseIdType" class="item-text">
                <h6>{{ $t('message.spouse_id_type') }}</h6>
                <span>{{ IDType[info.SpouseIdType] }}</span>
              </div>
              <div ref="SpouseIdNo" class="item-text">
                <h6>{{ $t('message.spouse_certificate_id') }}</h6>
                <span>{{ info.SpouseIdNo }}</span>
              </div>
              <div ref="SpouseIdCountry" class="item-text">
                <h6>{{ $t('message.spouse_passport_country') }}</h6>
                <span>{{ Country[info.SpouseIdCountry] }}</span>
              </div>
              <div ref="SpousTelNum" class="item-text">
                <h6>{{ $t('message.spouse_phone_number') }}</h6>
                <span>{{ info.SpousTelNum }}</span>
              </div>
              <div ref="SpouseCompany" class="item-text">
                <h6>{{ $t('message.spouse_employer_name') }}</h6>
                <span>{{ info.SpouseCompany }}</span>
              </div>
              <div v-if="info.SpouseIncom" ref="SpouseIncom" class="item-text">
                <h6>{{ $t('message.spouse_monthly_income') }}</h6>
                <span v-if="info.SpouseIncom">{{ currencyCal(info.SpouseIncom) }} {{ info.SpouseCurrency }}</span>
              </div>
              <div ref="FosterNumber" class="item-text">
                <h6>{{ $t('message.children_number') }}</h6>
                <span>{{ info.FosterNumber }} {{ $t('message.person') }}</span>
              </div>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('customer.maker')" class="my-card">
          <a-row v-if="info.ChgTeller">
            <a-col span="12">
              <div class="item-text">
                <h6>{{ $t('message.user_id') }}</h6>
                <span>{{ info.ChgTeller }}</span>
              </div>
            </a-col>
            <a-col span="12">
              <div class="item-text">
                <h6>{{ $t('message.maker_comment') }}</h6>
                <span class="break-all">{{ info.NewComment }}</span>
              </div>
            </a-col>
          </a-row>
          <div v-else class="no-information">
            {{ $t('customer.no_information') }}
          </div>
        </collapse-card>

        <collapse-card :title="$t('customer.checker')" class="my-card">
          <a-row v-if="info.ApprvTeller">
            <a-col span="12">
              <div class="item-text">
                <h6>{{ $t('message.user_id') }}</h6>
                <span>{{ info.ApprvTeller }}</span>
              </div>
            </a-col>
            <a-col span="12">
              <div class="item-text">
                <h6>{{ $t('message.checker_comment') }}</h6>
                <span class="break-all">{{ info.ApprvSugstnComnt }}</span>
              </div>
            </a-col>
          </a-row>
          <div v-else class="no-information">
            {{ $t('customer.no_information') }}
          </div>
        </collapse-card>
      </a-col>
    </a-row>
    <a-modal
      :title="$t('customer.proof_of_identity_preview')"
      :visible="showProofofIdentity"
      class="preview-modal"
      :footer="null"
      width="700px"
      @cancel="showProofofIdentity = false"
    >
      <img style="width: 100%" :src="proofofIdentity.base64">
    </a-modal>
    <a ref="download" :href="pdfUrl" download />
  </div>
</template>

<script>
import Customer from "@/service/customer";
import Common from "@/service/common";
import config from "@/lib/config";
import CM from "@/service/common";

export default {
  name: "ProductDetails",
  components: {},
  data() {
    return {
      percent: 0,
      info: {
        SignInfo: [{}],
        AddressArr: [{}, {}],
        Emergency: [{}]
      },
      customerStatus: { "0": this.$t('message.regular'), "3": this.$t('message.blacklist'), "4": this.$t('message.inactive') },
      CustType: { "1": this.$t('message.individual') },
      Gender: { "0": this.$t('message.male'), "1": this.$t('message.female'), "2": this.$t('message.other') },
      IDType: { "101": this.$t('message.citizen_id'), "104": this.$t('message.passport') },
      MaritalStatus: { "10": this.$t('message.single'), "20": this.$t('message.married'), "30": this.$t('message.divorced'), "40": this.$t('message.widowed') },
      HighestEducationLevel: {
        "01": this.$t('message.under_bachelor'),
        "02": this.$t('message.bachelor'),
        "03": this.$t('message.master'),
        "04": this.$t('message.doctor')
      },
      EmergencyContactRelationship: {
        "201": this.$t('message.spouse'),
        "202": this.$t('message.children'),
        "203": this.$t('message.parents'),
        "205": this.$t('message.self'),
        "206": this.$t('message.brother_and_sister')
      },
      Country: {},
      jobList: config.jobList,
      pdfUrl: "",
      proofofIdentity: {
        fileList: [],
        base64: ""
      },
      showProofofIdentity: false
    };
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      const Country = {};
      config.countryCode.forEach(item => {
        Country[item.key] = item.value;
      });
      this.Country = Country;
      this.getCustomerDetails(id);
    } else {
      window.history.back();
    }
      this.setDownloadList();
      // 点击下载
    this.$EventBus.$on('breadcrumbDownload', (e) => {
      this.download(e)
    })
    this.$EventBus.$on('breadcrumbEdit', () => {
      this.intoEdit()
    })
  },
  destroyed() {
    this.$EventBus.$off("breadcrumbDownload")
    this.$EventBus.$off("breadcrumbEdit")
  },
  methods: {
    intoEdit() {
      let url = "";
        const query = this.$route.query;
        if (query.recrodStatus === "12" || query.recrodStatus === "13") {
          url = "customerReview";
        } else {
          url = "customerEdit";
        }
        this.$router.push({ path: "/customer/" + url, query: query });
    },
    getBankName(name) {
      let resString = '-'
        switch (name) {
            case `ICBC`:
                resString = this.$t('message.icbc')
                break;
            case `Mizuho FG`:
                resString = this.$t('message.mizuho_FG')
                break;
            case `Wells fargo`:
                resString = this.$t('message.wells_fargo')
                break;
            case `HSBC`:
                resString = this.$t('message.hsbc')
                break;
            case `Citigroup`:
                resString = this.$t('message.citigroup')
                break;
            default:
                resString = `-`
        }
        return resString
    },
    creditCardFormat(value) {
      if (value && value.length > 5) {
        const creditNum = value.split('');
        const data = creditNum.slice((creditNum.length - 4), creditNum.length)
        const num = data.join('')
        return 'XXXX XXXX XXXX ' + num
      } else {
        return '-'
      }
    },
    idFormat(text, p) {
      if (text) {
        const data = text.split("");
        if (p === "cif") {
          for (let i = 1; i <= data.length - 1; i++) {
            if (i % 3 === 0) {
              data[i - 1] += "-";
            }
          }
          return data.join("");
        } else {
          const newText =
            text.slice(0, 1) +
            "-" +
            text.slice(1, 5) +
            "-" +
            text.slice(5, 10) +
            "-" +
            text.slice(10, 12) +
            "-" +
            text.slice(12, 13);
          return newText;
        }
      }
      // return text;
    },
    currencyCal(val) {
      return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(val);
    },
    getCustomerDetails(id) {
      Customer.getCustomerDetails({ CustId: id }).then(res => {
        console.log('getCustomerDetails = ', res);
        const birthdayTime = new Date(res.Birthday).getTime();
        const newInfo = JSON.parse(JSON.stringify(res));
        if (birthdayTime) {
          res.age = parseInt(
            (new Date().getTime() - birthdayTime) / (1000 * 60 * 60 * 24 * 365)
          );
        } else {
          res.age = "-";
        }
        if (res.ChgContextList) {
          try {
            const changeContext = JSON.parse(res.ChgContextList);
            changeContext.forEach(item => {
              let key = "";
              if (item.ChgField.indexOf("{") !== -1) {
                try {
                  const keyInfo = JSON.parse(item.ChgField);
                  newInfo[keyInfo.key] = newInfo[keyInfo.key] || [];
                  newInfo[keyInfo.key][keyInfo.index] =
                    newInfo[keyInfo.key][keyInfo.index] || {};
                  newInfo[keyInfo.key][keyInfo.index][keyInfo.itemKey] =
                    item.ChgValueAfter;
                  key =
                    keyInfo.key + "[" + keyInfo.index + "]." + keyInfo.itemKey;
                } catch (e) {
                  return false;
                }
              } else {
                key = item.ChgField;
                newInfo[item.ChgField] = item.ChgValueAfter;
              }
              console.log(key);
              if (key) {
                try {
                  this.$refs[key].querySelector("h6").style.color = "#F00";
                } catch (e) {
                  console.log(e);
                }
              }
            });
            this.info = newInfo;
          } catch (e) {
            this.info = res;
          }
        } else {
        this.info = res;
        }
        const ProofIdList = this.info.ProofId.split("___");
        const getFileList = [];
        ProofIdList.forEach(item => {
          getFileList.push(this.downloadFile(item, ProofIdList.length));
        });
        Promise.all(getFileList).then(res => {
          console.log("Promise.all", res);
        });
      });
    },
      download(item) {
          const key = 'getting';
          let msg = 'Getting pdf download link...'
          if (item.type === 'email') {
              msg = 'Sending Email...'
          }
          this.$message.loading({ content: msg, key });
          Customer.downloadPDF(this.info.CustId, item.type).then(pdfInfo => {
              if (item.type !== 'email') {
                  Common.downloadFile(pdfInfo.FileKey).then(res => {
                      if (res.UrlStr) {
                          // this.$message.success({ content: 'The PDF connection is successful.', key, duration: 2 });
                          this.pdfUrl = res.UrlStr;
                          setTimeout(() => {
                              this.$refs.download.click()
                          })
                      } else {
                          this.$message.error({ content: 'Failed to get download link', key, duration: 2 });
                      }
                  }).finally(() => {
                      // this.$message.success({ content: 'Loaded!', key, duration: 2 });
                  })
              } else {
                  this.$message.success({ content: 'Email sent successfully.', key, duration: 2 });
              }
          }).catch(() => {
              let errorMsg = 'Failed to get download link'
              if (item.type === 'email') {
                  errorMsg = 'Failed to send email'
              }
              this.$message.error({ content: errorMsg, key, duration: 2 });
          })
      },
    // 获取文件
    downloadFile(fileId, length) {
      return new Promise((resolve, reject) => {
        CM.downloadFile(fileId)
          .then(res => {
            const fileName = fileId.split("__") || [fileId];
            // console.log(fileId);
            // console.log(res);
            // console.log(fileName);
            const fileList = this.proofofIdentity.fileList || [];
            fileList.push({
              uid: fileId,
              name: fileName[0],
              status: "done",
              url: "javascript:;",
              base64: res.Buf
            });
            this.percent = this.percent += Math.ceil(100 / length);
            this.proofofIdentity.fileList = fileList;
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    previewProofOfIdentity(file) {
      this.proofofIdentity.base64 = file.base64;
      setTimeout(() => {
        this.showProofofIdentity = true;
      })
    },
    setDownloadList() {
      const downloadList = []
      const authBtns = JSON.parse(sessionStorage.getItem('authBtns') || '[]')
      config.downloadList.customerDetails.forEach(item => {
          item.auth = item.type === 'pdf' ? this.$buttonConfig.Customer.DownloadFile : this.$buttonConfig.Customer.SendEmail
          if (item.auth) {
              if (authBtns.indexOf(Number(item.auth)) !== -1) {
                  downloadList.push(item)
              }
          } else {
              downloadList.push(item)
          }
      })
      this.$EventBus.$emit('getDownloadList', downloadList)
    }
  }
};
</script>

<style lang="less">
.product {
  background-color: #ffffff;
  min-height: 240px;
  padding: 26px 32px;
  box-sizing: border-box;
}

.extra {
  cursor: pointer;
}

.card-content-title {
  width: 100%;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #000000;
}

.card-content-text {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #737373;
  margin-bottom: 13px;
}

.card-content-header {
  height: 36px;
  line-height: 36px;
  padding-right: 12px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #001529;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #f0f2f5;
}

.click-line {
  border: 1px solid #e8e8e8;
  background-color: #ffffff;
  border-radius: 2px;
  height: 70px;
  line-height: 70px;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #1890ff;
  text-align: center;
  align-content: center;
}

.no-information {
  height: 20px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
}
.my-card {
  margin-bottom: 24px;

  .click-line-text {
    cursor: pointer;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #1890ff;
    margin-bottom: 0;
  }

  .click-line-text:hover {
    text-decoration: underline;
  }
}

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

.preview-modal {
  .ant-modal {
    top: 20px;
  }
}

.break-all {
  word-break: break-all;
}
</style>
