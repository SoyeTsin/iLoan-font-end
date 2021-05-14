<template>
  <a-spin :spinning="pageLoading && pageType !== 'customerReview'">
    <div v-if="!showSuccess" class="customer-details-edit">
      <a-form :form="form" :self-update="true">
        <collapse-card :title="$t('customer.customer_acc')" class="form-card form-card-left">
          <a-row type="flex" justify="space-between">
            <a-col v-if="pageType === 'customerEdit'" :span="7">
              <a-form-item :label="$t('message.status_reason')">
                <a-radio-group class="form-radio" disabled :value="info.Status">
                  <a-radio value="0">{{ $t('message.regular') }}</a-radio>
                  <a-radio value="3">{{ $t('customer.black_list') }}</a-radio>
                </a-radio-group>
              </a-form-item>
              <div v-if="info.Status === '3'" class="reason-status">
                <div class="card-content-title">{{ $t('customer.status_reason') }}</div>
                <div class="card-content-text">{{ info.ApprvSugstnComnt }}</div>
              </div>
            </a-col>
            <a-col v-if="pageType === 'customerEdit'" :span="7">
              <a-form-item :label="$t('message.cif')">
                <a-input :value="option.id" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('customer.customer_type')">
                <a-select
                  v-decorator="validate('customerType',{initialValue:'1',rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.select_customer_type')"
                  :disabled="isReview"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value="1">
                    {{ $t('message.individual') }}
                  </a-select-option>
                  <!--                  <a-select-option value="2">-->
                  <!--                    USD-->
                  <!--                  </a-select-option>-->
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('customer.bank_accounts')" class="form-card form-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('customer.default_bank_acc') }}
                </div>
              </div>
              <a-form-item ref="SignInfo[0].OtherBankName" :label="$t('message.bank_name')">
                <a-select
                  v-decorator="validate('bankName',{initialValue:info.SignInfo[0].OtherBankName})"
                  :placeholder="$t('placeholder.select_bank_name')"
                  :disabled="isReview"
                  @change="selectChange($event,'bankName')"
                >
                  <a-select-option value="Citigroup">{{ $t('message.citigroup') }}</a-select-option>
                  <a-select-option value="ICBC">{{ $t('message.icbc') }}</a-select-option>
                  <a-select-option value="Mizuho FG">{{ $t('message.mizuho_FG') }}</a-select-option>
                  <a-select-option value="Wells fargo">{{ $t('message.wells_fargo') }}</a-select-option>
                  <a-select-option value="HSBC">{{ $t('message.hsbc') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="SignInfo[0].SwiftCode" :label="$t('message.bic')">
                <a-input v-model="reveal.bankBIC" :placeholder="$t('placeholder.select_bank_name')" disabled />
              </a-form-item>
              <a-form-item ref="SignInfo[0].AcctNo" :label="$t('message.bank_acc_number')">
                <a-input
                  v-decorator="validate('bankAccountNumber',{initialValue:info.SignInfo[0].AcctNo})"
                  class="inputNumberOnly"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_bank_acc_number')"
                  :min-length="1"
                  :max-length="30"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item ref="SignInfo[0].AcctName" :label="$t('message.bank_acc_name')">
                <a-input
                  v-decorator="validate('bankAccountName',{initialValue:info.SignInfo[0].AcctName})"
                  class="bank-name"
                  :disabled="isReview"
                  :max-length="80"
                  :placeholder="$t('placeholder.input_bank_acc_name')"
                />
              </a-form-item>
            </a-col>

            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('customer.default_credit_card') }}
                </div>
              </div>
              <a-form-item ref="CreitNm" :label="$t('customer.credit_card_number')">
                <a-input
                  v-decorator="validate('creitNm',{initialValue:info.SignInfo[0].CreitNm})"
                  :max-length="30"
                  :min-length="1"
                  class="inputNumberOnly"
                  :placeholder="$t('placeholder.input_credit_card_number')"
                  :disabled="isReview"
                />
              </a-form-item>
              <a-form-item ref="CardHdNm" :label="$t('customer.cardholder_name')">
                <a-input
                  v-decorator="validate('cardHolderName',{initialValue:info.SignInfo[0].CardHdNm})"
                  :max-length="80"
                  :min-length="1"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_credit_card_name')"
                  :disabled="isReview"
                />
              </a-form-item>
              <a-form-item ref="ExpiryMonth" :label="$t('customer.expiry_month')">
                <a-select
                  v-decorator="validate('expiryMonth',{initialValue:info.SignInfo[0].ExpiryMonth, rules: [{message: $t('message.select_correct_information') }]})"
                  :placeholder="$t('placeholder.input_expiry_month')"
                  :disabled="isReview"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option v-for="n in ExpiryMonth " :key="n" :value="n">{{ n }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="ExpiryYear" :label="$t('customer.expiry_year')">
                <a-select
                  v-decorator="validate('expiryYear',{initialValue:info.SignInfo[0].ExpiryYear, rules: [{message: $t('message.select_correct_information') }]})"
                  :placeholder="$t('placeholder.input_expiry_year')"
                  :disabled="isReview"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option v-for="y in ExpiryYear" :key="y" :value="y">{{ y }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="SecurityCd" :label="$t('customer.security_code')">
                <a-input
                  v-decorator="validate('securityCode',{initialValue:info.SignInfo[0].SecurityCd})"
                  :max-length="3"
                  :min-length="1"
                  class="inputNumberOnly"
                  :placeholder="$t('placeholder.input_security_code')"
                  :disabled="isReview"
                />
              </a-form-item>

            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>

        <collapse-card
          :title="$t('message.identification')"
          class="form-card form-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item ref="Title" :label="$t('message.title')">
                <a-select
                  v-decorator="validate('title',{initialValue:info.Title,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                  :disabled="isReview"
                  data-cy="s2"
                  :placeholder="$t('placeholder.select_title')"
                >
                  <a-select-option value="Mr.">{{ $t('message.mr') }}</a-select-option>
                  <a-select-option data-cy="dtile" value="Mrs.">{{ $t('message.mrs') }}</a-select-option>
                  <a-select-option value="Miss">{{ $t('message.miss') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="FirstName" :label="$t('message.firstname')">
                <a-input
                  v-decorator="validate('firstName',{initialValue:info.FirstName,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :disabled="isReview"
                  :max-length="40"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_first_name')"
                />
              </a-form-item>
              <a-form-item ref="LastName" :label="$t('message.lastname')">
                <a-input
                  v-decorator="validate('lastName',{initialValue:info.LastName,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :disabled="isReview"
                  :max-length="40"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_last_name')"
                />
              </a-form-item>
              <a-form-item ref="Birthday" :label="$t('message.birthdate')">
                <a-date-picker v-decorator="validate('birthDate',{initialValue:info.Birthday,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})" :placeholder="$t('placeholder.select_date')" data-cy="bday" :disabled="isReview" :initial-value="info.Birthday" @change="dateChange($event,'birthdate')" />
                <!--                <a-date-picker-->
                <!--                  v-decorator="validate('birthDate',{initialValue:info.Birthday,rules: [{required:!isReview}]})"-->
                <!--                  :disabled="isReview"-->
                <!--                  @change="dateChange($event,'birthdate')"-->
                <!--                />-->
              </a-form-item>
              <a-form-item :label="$t('message.age')">
                <a-input v-model="reveal.age" :placeholder="$t('placeholder.select_birth_date')" disabled />
              </a-form-item>
              <a-form-item ref="Gender" :label="$t('message.gender')">
                <a-radio-group
                  v-decorator="validate('gender',{initialValue:info.Gender || '0', rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  class="form-radio"
                  :disabled="isReview"
                >
                  <a-radio value="0">{{ $t('message.male') }}</a-radio>
                  <a-radio value="1">{{ $t('message.female') }}</a-radio>
                  <a-radio value="2">{{ $t('message.other') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item ref="IdType" :label="$t('message.id_type')">
                <a-select
                  v-decorator="validate('IDType',{initialValue:info.IdType,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.select_id_type')"
                  :disabled="isReview"
                  @change="selectChange($event,'IDType')"
                >
                  <a-select-option cy-data="cId" value="101">{{ $t('message.citizen_id') }}</a-select-option>
                  <a-select-option value="104">{{ $t('message.passport') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="IdNo" :label="$t('message.certificate_id')">
                <a-input
                  v-decorator="validate('certificateID',{initialValue:info.IdNo, rules: [{required: true, message: $t('message.please_correct_information')}]})"
                  :max-length="reveal.IDType === '101'? 13: 10"
                  class="certificate-id"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_cert_id')"
                />
              </a-form-item>
              <a-form-item ref="IdCountry" :label="$t('message.passport_country')">
                <a-select
                  v-decorator="validate('passportCountry',{initialValue:info.IdCountry,rules:
                    [{ required: reveal.IDType !== '101' && !isReview, message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.select_passport_country')"
                  :disabled="reveal.IDType === '101' || isReview"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  @change="selectChange($event,'passportCountry')"
                >
                  <a-select-option v-for="item in countryCode" :key="item.key" data-cy="na" :value="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>

              </a-form-item>
              <a-form-item ref="Country" :label="$t('message.nationality')">
                <a-select
                  v-decorator="validate('nationality',{initialValue:info.Country,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :disabled="isReview"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :placeholder="$t('placeholder.select_nationality')"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option v-for="item in countryCode" :key="item.key" data-cy="na" :value="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                ref="ProofId"
                :label="$t('message.proof_identity')"
                :extra="$t('loan.select_file_format')"
              >
                <a-upload
                  v-decorator="validate('proofOfIdentity',{initialValue:info.ProofId,rules: [{required:true, message: $t('message.please_correct_information')}]})"
                  :disabled="isReview"
                  :multiple="false"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :accept="'.jpg, .jpeg, .png'"
                  @change="fileListChange"
                  @preview="previewProofOfIdentity"
                >
                  <a-button :disabled="isReview">
                    <a-icon type="upload" />
                    {{ $t('message.upload_btn') }}
                  </a-button>
                  <a-progress v-if="option.recrodStatus === '01' || option.recrodStatus === '12' || option.recrodStatus === '13'" :percent="percent" />
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item ref="HouseHoldRgstNumber" :label="$t('message.household_number')">
                <a-input
                  v-decorator="validate('householdRegistrationNumber',{initialValue:info.HouseHoldRgstNumber,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  style="width: 100%;"
                  :max-length="15"
                  class="no-hrn"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_holder_regis_number')"
                />
              </a-form-item>
              <a-form-item ref="AddressArr[0].Addr" :label="$t('message.street_address')">
                <a-textarea
                  v-decorator="validate('registrationStreetAddress',{initialValue:info.AddressArr[0].Addr,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  type="textarea"
                  class="validate-addr"
                  :max-length="140"
                  :min-length="1"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_regist_street_addr')"
                />
              </a-form-item>
              <a-form-item ref="AddressArr[0].AddrCity" :label="$t('message.suburb_district')">
                <!--                <a-select v-decorator="validate('registrationSuburbDistrict" placeholder="Please select country">-->
                <!--                  <a-select-option value="Sathorn">Sathorn</a-select-option>-->
                <!--                  <a-select-option value="Chatuchak">Chatuchak</a-select-option>-->
                <!--                  <a-select-option value="Bangrak">Bangrak</a-select-option>-->
                <!--                  <a-select-option value="Din Dang">Din Dang</a-select-option>-->
                <!--                  <a-select-option value="Ratchathewi">Ratchathewi</a-select-option>-->
                <!--                </a-select>-->
                <a-input
                  v-decorator="validate('registrationSuburbDistrict',{initialValue:info.AddressArr[0].AddrCity,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  class="validate-addr"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_regist_sub_district')"
                  :max-length="85"
                  :min-length="1"
                />
              </a-form-item>
              <a-form-item ref="AddressArr[0].AddrProvinceState" :label="$t('message.state_province')">
                <!--                <a-select v-decorator="validate('registrationStateProvince" placeholder="Please select country">-->
                <!--                  <a-select-option value="Bangkok">Bangkok</a-select-option>-->
                <!--                  <a-select-option value="Chiangmai">Chiangmai</a-select-option>-->
                <!--                  <a-select-option value="Phuket">Phuket</a-select-option>-->
                <!--                  <a-select-option value="Nonthaburi">Nonthaburi</a-select-option>-->
                <!--                  <a-select-option value="Pathumthani">Pathumthani</a-select-option>-->
                <!--                </a-select>-->
                <a-input
                  v-decorator="validate('registrationStateProvince',{initialValue:info.AddressArr[0].AddrProvinceState,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  class="validate-addr"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_regist_state_province')"
                  :max-length="85"
                  :min-length="1"
                />
              </a-form-item>
              <a-form-item ref="AddressArr[0].AddrCountry" :label="$t('message.country')">
                <a-select
                  v-decorator="validate('registrationCountry',{initialValue:info.AddressArr[0].AddrCountry,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :placeholder="$t('placeholder.select_regist_country')"
                  :disabled="isReview"
                >
                  <a-select-option v-for="item in countryCode" :key="item.key" data-cy="na2" :value="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="AddressArr[0].ZipCode" :label="$t('message.zipcode_postcode')">
                <a-input
                  v-decorator="validate('registrationZipcodePostcode',{initialValue:info.AddressArr[0].ZipCode,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  style="width: 100%"
                  :max-length="10"
                  :min-length="1"
                  class="zipcode"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_regist_zipcode')"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card

          :title="$t('customer.contact')"
          class="form-card form-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item ref="ContractNo" :label="$t('message.customer_phone_mumber')">
                <a-input
                  v-decorator="validate('customerPhoneNumber',{initialValue:info.ContractNo,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.input_cust_phone_number')"
                  style="width: 100%"
                  class="phone"
                  :disabled="isReview"
                  :max-length="20"
                  :min-length="1"
                >
                  <!--                  <a-select-->
                  <!--                    slot="addonBefore"-->
                  <!--                    v-decorator="validate('customerPhoneNumberCode"-->
                  <!--                    style="width: 70px"-->
                  <!--                  >-->
                  <!--                    <a-select-option value="0">-->
                  <!--                      +86-->
                  <!--                    </a-select-option>-->
                  <!--                    <a-select-option value="1">-->
                  <!--                      +87-->
                  <!--                    </a-select-option>-->
                  <!--                  </a-select>-->
                </a-input>
              </a-form-item>
              <a-form-item ref="WorkPhoneNo" :label="$t('message.work_phone_number')">
                <a-input
                  v-decorator="validate('workPhoneNumber',{initialValue:info.WorkPhoneNo})"
                  :placeholder="$t('placeholder.input_workphone_number')"
                  style="width: 100%"
                  class="phone"
                  :disabled="isReview"
                  :min-length="1"
                  :max-length="20"
                >
                  <!--                  <a-select-->
                  <!--                    slot="addonBefore"-->
                  <!--                    v-decorator="validate('workPhoneNumberCode"-->
                  <!--                    style="width: 70px"-->
                  <!--                  >-->
                  <!--                    <a-select-option value="0">-->
                  <!--                      +86-->
                  <!--                    </a-select-option>-->
                  <!--                    <a-select-option value="1">-->
                  <!--                      +87-->
                  <!--                    </a-select-option>-->
                  <!--                  </a-select>-->
                </a-input>
              </a-form-item>
              <a-form-item ref="Email" :label="$t('message.email')">
                <a-input
                  v-decorator="validate('email',{initialValue:info.Email,rules: [{required:!isReview, message: $t('message.please_correct_information'),type: 'email'}]})"
                  :placeholder="$t('placeholder.input_email')"
                  :disabled="isReview"
                  class="email"
                  :min-length="1"
                  :max-length="254"
                />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('customer.mailling_add') }}
                </div>
              </div>
              <a-form-item ref="AddressArr[1].Addr" :label="$t('message.street_address')">
                <a-textarea
                  v-decorator="validate('residentialStreetAddress',{initialValue:info.AddressArr[1].Addr,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  type="textarea"
                  class="validate-addr"
                  :disabled="isReview"
                  :max-length="140"
                  :min-length="1"
                  :placeholder="$t('placeholder.input_regist_street_addr')"
                />
              </a-form-item>
              <a-form-item ref="AddressArr[1].AddrCity" :label="$t('message.suburb_district')">
                <!--                <a-select v-decorator="validate('residentialSuburbDistrict" placeholder="Please select country">-->
                <!--                  <a-select-option value="0">-->
                <!--                    Mittweida-->
                <!--                  </a-select-option>-->
                <!--                  <a-select-option value="1">-->
                <!--                    Single Customer1-->
                <!--                  </a-select-option>-->
                <!--                </a-select>-->
                <a-input
                  v-decorator="validate('residentialSuburbDistrict',{initialValue:info.AddressArr[1].AddrCity,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.input_regist_sub_district')"
                  :disabled="isReview"
                  :max-length="85"
                  :min-length="1"
                  class="validate-addr"
                />
              </a-form-item>
              <a-form-item ref="AddressArr[1].AddrProvinceState" :label="$t('message.state_province')">
                <!--                <a-select v-decorator="validate('residentialStateProvince" placeholder="Please select country">-->
                <!--                  <a-select-option value="0">-->
                <!--                    Dhaka-->
                <!--                  </a-select-option>-->
                <!--                  <a-select-option value="1">-->
                <!--                    Single Customer1-->
                <!--                  </a-select-option>-->
                <!--                </a-select>-->
                <a-input
                  v-decorator="validate('residentialStateProvince',{initialValue:info.AddressArr[1].AddrProvinceState,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.input_regist_state_province')"
                  :disabled="isReview"
                  :max-length="85"
                  :min-length="1"
                  class="validate-addr"
                />
              </a-form-item>
              <a-form-item ref="AddressArr[1].AddrCountry" :label="$t('message.country')">
                <a-select
                  v-decorator="validate('residentialCountry',{initialValue:info.AddressArr[1].AddrCountry,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :disabled="isReview"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :placeholder="$t('placeholder.select_regist_country')"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option v-for="item in countryCode" :key="item.key" data-cy="na3" :value="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="AddressArr[1].ZipCode" :label="$t('message.zipcode_postcode')">
                <a-input
                  v-decorator="validate('residentialZipcodePostcode',{initialValue:info.AddressArr[1].ZipCode,rules: [{required:!isReview, message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.input_regist_zipcode')"
                  class="zipcode"
                  :disabled="isReview"
                  :min-length="1"
                  :max-length="10"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('customer.emergency_contact') }}
                </div>
              </div>
              <a-form-item ref="Emergency[0].EmergencyName" :label="$t('message.emergency_contact_name')">
                <a-input
                  v-decorator="validate('emergencyContactName',{initialValue:info.Emergency[0].EmergencyName})"
                  :placeholder="$t('placeholder.input_emergency_contact_name')"
                  :disabled="isReview"
                  class="bank-name"
                  :max-length="80"
                  :min-length="1"
                />
              </a-form-item>
              <a-form-item
                ref="Emergency[0].Relationship"
                :label="$t('message.emergency_contact_relationship')"
              ><!------------>
                <a-select
                  v-decorator="validate('emergencyContactRelationship',{initialValue:info.Emergency[0].Relationship})"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_emergency_contact_relationship')"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value="201">{{ $t('message.spouse') }}</a-select-option>
                  <a-select-option value="202">{{ $t('message.children') }}</a-select-option>
                  <a-select-option value="203">{{ $t('message.parents') }}</a-select-option>
                  <a-select-option value="205">{{ $t('message.self') }}</a-select-option>
                  <a-select-option value="206">{{ $t('message.brother_and_sister') }}</a-select-option>
                </a-select>
                <!--                <a-input v-decorator="validate('residentialStateProvince" />-->
              </a-form-item>
              <a-form-item
                ref="Emergency[0].EmergencyContactNo"
                :label="$t('message.emergency_contact_phone_number')"
              >
                <a-input
                  v-decorator="validate('EmergencyContactPhoneNumber',{initialValue:info.Emergency[0].EmergencyContactNo})"
                  :placeholder="$t('placeholder.input_emergency_contact_phone_number')"
                  :disabled="isReview"
                  class="phone"
                  style="width: 100%"
                  :max-length="20"
                  :min-length="1"
                >
                  <!--                  <a-select-->
                  <!--                    slot="addonBefore"-->
                  <!--                    v-decorator="validate('EmergencyContactPhoneNumberCode"-->
                  <!--                    style="width: 70px"-->
                  <!--                  >-->
                  <!--                    <a-select-option value="0">-->
                  <!--                      +86-->
                  <!--                    </a-select-option>-->
                  <!--                    <a-select-option value="1">-->
                  <!--                      +87-->
                  <!--                    </a-select-option>-->
                  <!--                  </a-select>-->
                </a-input>
              </a-form-item>
              <a-form-item ref="Emergency[0].EmergencyAddr" :label="$t('message.emergency_contact_address')">
                <a-textarea
                  v-decorator="validate('emergencyContactAddress',{initialValue:info.Emergency[0].EmergencyAddr})"
                  :disabled="isReview"
                  type="textarea"
                  :auto-size="{ minRows: 2}"
                  class="validate-addr"
                  :placeholder="$t('placeholder.input_emergency_contact_addr')"
                  :min-length="1"
                  :max-length="200"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('message.personal')" class="form-card form-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('customer.education') }}
                </div>
              </div>
              <a-form-item ref="Education" :label="$t('message.highest_educate_level')">
                <a-select
                  v-decorator="validate('highestEducationLevel',{initialValue:info.Education})"
                  :placeholder="$t('placeholder.select_highest_edu_level')"
                  :disabled="isReview"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value="01">{{ $t('message.under_bachelor') }}</a-select-option>
                  <a-select-option value="02">{{ $t('message.bachelor') }}</a-select-option>
                  <a-select-option value="03">{{ $t('message.master') }}</a-select-option>
                  <a-select-option value="04">{{ $t('message.doctor') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="ShoolName" :label="$t('message.institution')">
                <a-input
                  v-decorator="validate('institution',{initialValue:info.ShoolName})"
                  :placeholder="$t('placeholder.input_institution')"
                  :disabled="isReview"
                  class="institution"
                  :max-length="80"
                  :min-length="1"
                />
              </a-form-item>
              <a-form-item ref="Major" :label="$t('message.major')">
                <a-input
                  v-decorator="validate('major',{initialValue:info.Major})"
                  :placeholder="$t('placeholder.input_major')"
                  :disabled="isReview"
                  :max-length="80"
                  :min-length="1"
                />
              </a-form-item>
              <a-form-item ref="MaxDegrGradDate" :label="$t('message.graduation_year')">
                <a-select
                  v-decorator="validate('yearOfGraduation',{initialValue:info.MaxDegrGradDate})"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.select_year_of_grad')"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option v-for="y in yearOfGraduation" :key="y" :value="y">{{ y }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('customer.occupation') }}
                </div>
              </div>
              <a-form-item ref="Job" :label="$t('customer.occupation')">
                <a-select
                  v-decorator="validate('occupation',{initialValue:info.Job})"
                  :placeholder="$t('placeholder.select_occupation')"
                  :disabled="isReview"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option v-for="(name,key) in jobList" :key="key">{{ name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="JobStatus" :label="$t('message.occupation_note')">
                <a-textarea
                  v-decorator="validate('occupationNote',{initialValue:info.JobStatus})"
                  :auto-size="{ minRows: 2}"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_occupation_note')"
                  :max-length="80"
                  :min-length="1"
                />
              </a-form-item>
              <a-form-item ref="CompanyName" :label="$t('message.employer_name')">
                <a-input
                  v-decorator="validate('employerName',{initialValue:info.CompanyName})"
                  :max-length="40"
                  :min-length="1"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_employer_name')"
                  :disabled="isReview"
                />
              </a-form-item>
              <a-form-item ref="CompanyAddr" :label="$t('message.employer_address')">
                <a-textarea
                  v-decorator="validate('employerAddress',{initialValue:info.CompanyAddr})"
                  :placeholder="$t('placeholder.input_employer_addr')"
                  :max-length="200"
                  :min-length="1"
                  class="validate-addr"
                  :auto-size="{ minRows: 2}"
                  :disabled="isReview"
                />
              </a-form-item>
              <a-form-item ref="MthIncomAmt" :label="$t('message.monthly_income')">
                <div class="input-and-text">
                  <a-input
                    v-decorator="validate('monthlyIncome',{initialValue:info.MthIncomAmt, rules: [{required: false}]})"
                    :placeholder="$t('placeholder.input_monthly_income')"
                    :step=".11"
                    class="inputNumberOnly"
                    :disabled="isReview"
                  />
                  <span style="width: 50%">
                    <a-spin :spinning="currencySpinning">
                      <a-select
                        ref="monthlyCurrency"
                        v-decorator="validate('monthlyCurrency',{initialValue:info.Currency, rules: []})"
                        :disabled="isReview"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="monthlyIncomeCurrencyChecked"
                      >
                        <a-select-option v-for="item of currencyList" :key="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-spin>
                  </span>
                </div>
              </a-form-item>

            </a-col>
            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('customer.marital_detail') }}
                </div>
              </div>
              <a-form-item ref="MaritalStatus" :label="$t('message.marital_status')">
                <a-select
                  v-decorator="validate('maritalStatus',{initialValue:info.MaritalStatus, rules: [{required:!isReview}] })"
                  :placeholder="$t('placeholder.select_marital_status')"
                  :disabled="isReview"
                  class="no-hrn"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                  @change="selectChange($event,'maritalStatus')"
                >
                  <a-select-option v-for="item of MaritalStatus" :key="item.value">
                    {{ item.name }}
                  </a-select-option>

                </a-select>
              </a-form-item>
              <a-form-item ref="SpouseName" :label="$t('message.spouse_name')">
                <a-input
                  v-decorator="validate('spouseName',{initialValue:info.SpouseName,rules: [{required:reveal.maritalStatus === '20' && !isReview, message: $t('message.please_correct_information')}]})"
                  :min-length="1"
                  :max-length="80"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_spouse_name')"
                  :disabled="isReview || reveal.maritalStatus !== '20'"
                />
              </a-form-item>
              <a-form-item ref="SpouseIdType" :label="$t('message.spouse_id_type')">
                <a-select
                  v-decorator="validate('spouseIDType',{initialValue:info.SpouseIdType,rules: [{required:reveal.maritalStatus === '20' && !isReview , message: $t('message.please_correct_information')}]})"
                  :placeholder="$t('placeholder.select_spouse_id_type')"
                  :disabled="isReview || reveal.maritalStatus !== '20'"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                  @change="selectChange($event,'spouseIDType')"
                >
                  <a-select-option value="101">{{ $t('message.citizen_id') }}</a-select-option>
                  <a-select-option value="104">{{ $t('message.passport') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="SpouseIdNo" :label="$t('message.spouse_certificate_id')">
                <a-input
                  v-decorator="validate('spouseCertificateID',{initialValue:info.SpouseIdNo,rules: [{required:reveal.maritalStatus === '13' && !isReview, max: spouseType === '101'? 13: 10, min: spouseType === '101'? 1: 1,message: $t('message.please_correct_information') }]})"
                  class="spouse-certificate-id"
                  :max-length="spouseType === '101'? 13: 10"
                  :placeholder="$t('placeholder.input_spouse_cert_id')"
                  :disabled="isReview || reveal.maritalStatus !== '20'"
                  @change="selectChange($event,'SpouseIdNo')"
                />
              </a-form-item>
              <a-form-item ref="SpouseIdCountry" :label="$t('message.spouse_passport_country')">
                <a-select
                  v-decorator="validate('spousePassportCountry',{initialValue:info.SpouseIdCountry,rules: [{required:reveal.maritalStatus === '20' && reveal.spouseIDType === '104', message: $t('message.please_correct_information')}]})"
                  :disabled="isReview || reveal.maritalStatus !== '20' || reveal.spouseIDType === '101'"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :placeholder="$t('placeholder.select_spouse_passport_country')"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option v-for="item in countryCode" :key="item.key" :value="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="SpousTelNum" :label="$t('message.spouse_phone_number')">
                <a-input
                  v-decorator="validate('spousePhoneNumber',{initialValue:info.SpousTelNum,rules: [{required:reveal.maritalStatus === '20' && !isReview , message: $t('message.please_correct_information')}]})"
                  :max-length="20"
                  :min-length="1"
                  class="phone"
                  :placeholder="$t('placeholder.input_spouse_phone_number')"
                  :disabled="isReview || reveal.maritalStatus !== '20'"
                  style="width: 100%"
                >
                  <!--                  <a-select-->
                  <!--                    slot="addonBefore"-->
                  <!--                    v-decorator="validate('spousePhoneNumberCode"-->
                  <!--                    style="width: 70px"-->
                  <!--                  >-->
                  <!--                    <a-select-option value="0">-->
                  <!--                      +86-->
                  <!--                    </a-select-option>-->
                  <!--                    <a-select-option value="1">-->
                  <!--                      +87-->
                  <!--                    </a-select-option>-->
                  <!--                  </a-select>-->
                </a-input>
              </a-form-item>
              <a-form-item ref="SpouseCompany" :label="$t('message.spouse_employer_name')">
                <a-input
                  v-decorator="validate('spouseEmployerName',{initialValue:info.SpouseCompany,rules: [{required:reveal.maritalStatus === '20' && !isReview, message: $t('message.please_correct_information')}]})"
                  :max-length="40"
                  :min-length="1"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_spouse_employer_name')"
                  :disabled="isReview || reveal.maritalStatus !== '20'"
                />
              </a-form-item>
              <a-form-item ref="SpouseIncom" :label="$t('message.spouse_monthly_income')">
                <div class="input-and-text">
                  <a-input
                    v-decorator="validate('spouseMonthlyIncome',{initialValue:info.SpouseIncom,rules: [{required:reveal.maritalStatus === '20' && !isReview, message: $t('message.please_correct_information')}]})"
                    :max-length="12"
                    :placeholder="$t('placeholder.input_spouse_monthly_income')"
                    :step=".11"
                    :disabled="isReview || reveal.maritalStatus !== '20'"
                    class="inputNumberOnly"
                    :decimal="true"
                  />
                  <span style="width: 50%">
                    <a-spin :spinning="currencySpinning">
                      <a-select
                        ref="spouseMonthlyCurrency"
                        v-decorator="validate('spouseMonthlyCurrency',{initialValue:info.SpouseCurrency, rules: []})"
                        :placeholder="$t('placeholder.select_currency')"
                        :disabled="isReview || reveal.maritalStatus !== '20'"
                        @change="spouseIncomeCurrencyChecked"
                      >
                        <a-select-option v-for="item of currencyList" :key="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-spin>
                  </span>
                </div>
              </a-form-item>
              <a-form-item ref="FosterNumber" :label="$t('message.children_number')">
                <div class="input-and-text">
                  <number-input
                    v-decorator="validate('numberOfChildren',{initialValue:info.FosterNumber,rules: [{required:reveal.maritalStatus === '20' && !isReview, message: $t('message.please_correct_information')}]})"
                    :max-length="2"
                    :min-length="0"
                    :placeholder="$t('placeholder.input_number_of_children')"
                    :disabled="isReview || reveal.maritalStatus !== '20'"
                    class="input-and-text-input"
                  />
                  <span>{{ $t('message.person') }}</span>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card
          :title="$t('customer.maker')"
          class="form-card form-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input :max-length="12" :value="makerId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.maker_comment')">
                <a-textarea
                  v-decorator="validate('makerComment',{initialValue:info.NewComment})"
                  :max-length="200"
                  :min-length="1"
                  :placeholder="$t('placeholder.input_maker_comment')"
                  :disabled="isReview"
                  :auto-size="{ minRows: 2}"
                />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>

        <!--v-if="pageType === 'customerReview'"-->
        <collapse-card
          :title="$t('customer.checker')"
          class="form-card form-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input :max-length="12" :value="checker.userId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.review')">
                <a-radio-group
                  v-model="checker.review"
                  class="form-radio"
                  :disabled="pageType !== 'customerReview'"
                >
                  <a-radio value="1">
                    {{ $t('message.approve') }}
                  </a-radio>
                  <a-radio value="5">
                    {{ $t('message.reject') }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.checker_comment')">
                <a-textarea
                  v-decorator="validate('checkerComment')"
                  :min-lenth="1"
                  :placeholder="$t('placeholder.input_checker_comment')"
                  :max-length="200"
                  :disabled="pageType !== 'customerReview'"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>
        <div v-if="!option.recrodStatus" v-auth="$buttonConfig.Customer.NewCustomer" class="submit-content">
          <a-button @click="resetForm">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" :loading="loading" @click="submit">{{ $t('message.save_btn') }}</a-button>
        </div>
        <div v-if="option.recrodStatus === '12' || option.recrodStatus === '13'" v-auth="$buttonConfig.Customer.EditCustomerRequested" class="submit-content">
          <a-button @click="resetForm">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" :loading="loading" :disabled="percent < 100" @click="submit">{{ $t('message.save_btn') }}</a-button>
        </div>
        <div v-if="option.recrodStatus === '01'" v-auth="$buttonConfig.Customer.EditCustomerAgreed" class="submit-content">
          <a-button @click="resetForm">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" :loading="loading" :disabled="percent < 100" @click="submit">{{ $t('message.save_btn') }}</a-button>
        </div>
        <div v-if="option.recrodStatus === '16'" v-auth="$buttonConfig.Customer.EditCustomerReturned" class="submit-content">
          <a-button @click="resetForm">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" :loading="loading" :disabled="percent < 100" @click="submit">{{ $t('message.save_btn') }}</a-button>
        </div>
        <!--v-auth="$buttonConfig.Customer.Approve"-->
        <!--          <a-button-->
        <!--            type="primary"-->
        <!--            @click="upFile"-->
        <!--          >upFile-->
        <!--          </a-button>-->
      </a-form>
    </div>
    <div v-if="showSuccess" class="success-msg">
      <div class="msg">{{ $t('customer.created_successfully') }}</div>
      <div class="product-id">{{ $t('message.cif') }}: {{ CIF }}</div>
      <a-button type="dashed" style="margin-bottom: 12px" @click="$router.push({ path: '/customer' })">
        {{ $t('customer.customer_list_btn') }}
      </a-button>
      <a-button
        v-auth="$buttonConfig.Customer.NewCustomer"
        type="primary"
        style="margin-bottom: 26px"
        icon="plus"
        @click="newCustomer"
      >
        {{ $t('customer.new_customer_btn') }}
      </a-button>
    </div>
    <a-modal
      :title="$t('customer.proof_of_identity_preview')"
      class="preview-modal"
      :visible="proofOfIdentity.show"
      :footer="null"
      width="700px"
      @cancel="proofOfIdentity.show = false"
    >
      <img style="width: 100%" :src="proofOfIdentity.base64">
    </a-modal>
  </a-spin>
</template>

<script>

import { getFormValidate } from "@/verification/CustomerEdit";
import Customer from "@/service/customer";
import CM from "@/service/common";
import config from "@/lib/config";
import inputValidate from "@/lib/input-validate";

export default {
    name: 'CustomerEdit',
    data() {
        return {
            currencyList: [],
            currencySpinning: false,
            currentcyResult: [],
            percent: 0,
            patterns: "^[0-9 a-zA-Z\\&\\\\/\\\\.\\\\()\\\\,\\ \\'\\ ]+$",
            form: this.$form.createForm(this, { name: this.$route.name }),
            showSuccess: false,
            pageType: this.$route.name,
            countryCode: config.countryCode,
            jobList: config.jobList,
            CIF: '',
            spouseCurrency: '',
            monthlyIncomeCurrency: '',
            identityFile: [],
            spouseType: '',
            fileList: [],
            pageLoading: false,
            maxLength: {
                certificateID: 20,
                spouseCertificateID: 20
            },
            info: {
                SignInfo: [{}],
                AddressArr: [{}, {}],
                Emergency: [{}]
            },
            initialInfo: {},
            yearOfGraduation: [],
            option: this.$route.query,
            checker: {
                review: '1',
                userId: this.global.userInfo.name
            },
            reveal: {
                bankBIC: '',
                age: '',
                userId: this.global.userInfo.name
            },
            makerId: '',
            config: {
                rules: [{
                    type: 'object', required: true,
                    message: this.$t('message.select_time')
                }]
            },
            loading: false,
            isReview: false,
            showPage: false,
            proofOfIdentity: {
                show: false,
                base64: ''
            },
            ExpiryYear: [],
            ExpiryMonth: [],
            MaritalStatus: [],
            MaritalStatusResult: []
        };
    },
    mounted() {
          this.getCurrencyList();
        for (let i = 1990;
            i <= (new Date().getFullYear() + 20);
            i++) {
            this.yearOfGraduation.push(i + '')
        }
        for (let i = new Date().getFullYear(); i <= new Date().getFullYear() + 25; i++) {
        this.ExpiryYear.push(i + "");
        }
        for (let i = 1; i <= 12; i++) {
          this.ExpiryMonth.push(('0' + i).slice(-2) + '')
        }
        if (this.pageType === 'customerEdit' && this.option.id || this.pageType === 'customerReview' && this.option.id) {
            this.pageLoading = true;
            this.getCustomerDetails(this.option.id)
        }
        if (this.pageType === 'customerReview') {
            this.isReview = true;
        } else {
            this.checker.userId = ''
            this.checker.review = ''
        }
        this.initPage()
    },
    methods: {
        initPage() {
            // 自定义校验
            inputValidate(document.querySelectorAll('.no-symbol-number'), { noSymbol: true, noNumber: true })
            inputValidate(document.querySelectorAll('.no-symbol-letter'), { noSymbol: true, noLetter: true })
            // Allow alphabets and INT Not allow negative number
            inputValidate(document.querySelectorAll('.no-symbol-neg-have-letter-number'), { noNeg: true, noSymbol: true, noLetter: false, noNumber: false, noSpace: true })
            inputValidate(document.querySelectorAll('.no-symbol'), { noSymbol: true })
            inputValidate(document.querySelectorAll('.spouse-certificate-id'), { noSymbol: true, noLetter: true, noNumber: false })
            // Allow alphabets and space
            inputValidate(document.querySelectorAll('.institution'), { noSymbol: true, noLetter: false, noNumber: true })
            // "Allow alphabets, INT, space and symbol -"
            inputValidate(document.querySelectorAll('.zipcode'), { noLetter: false, noSymbol: true, ignoreSymbol: ['-'] })
            // "INT, space and symbol + - ( ) #"
            inputValidate(document.querySelectorAll('.CID'), { noSymbol: true, noLetter: false, noNumber: false });

            inputValidate(document.querySelectorAll('.phone'), { noSymbol: true, noLetter: true, noNumber: false, ignoreSymbol: ['+', '-', '(', ')', '#'] })
            // "Allow alphabets, INT, space,and symbol - , . : ; ' ° & / ( ) #"
            inputValidate(document.querySelectorAll('.validate-addr'), { noSymbol: true, noLetter: false, noNumber: false, ignoreSymbol: ['&', ',', '-', '/', '(', ')', '.', '#', ':', ';', '°', "'"] })
            // Allow alphabets and INT
            inputValidate(document.querySelectorAll('.no-hrn'), { noSymbol: true, noLetter: false, noNumber: false, noSpace: true })
            // Allow alphabets, space, and symbol & /. ( ) - , '
            inputValidate(document.querySelectorAll('.bank-name'), { noLetter: false, noNumber: true, noSymbol: true, ignoreSymbol: ['&', ',', '-', '/', '(', ')', '.'] })
            // Allow alphabets and full stop (.)
            inputValidate(document.querySelectorAll('.full-stop'), { noLetter: false, noSymbol: true, ignoreSymbol: ['.'] })
            inputValidate(document.querySelectorAll('.email'), { noSymbol: true, ignoreSymbol: ['_', '-', '@', '.'] })
            // "Allow INT"
            inputValidate(document.querySelectorAll('.inputNumberOnly'), { noNeg: true, noLetter: true, noSymbol: true, noSpace: true, ignoreSymbol: ['-'] })
        },
    spouseIncomeCurrencyChecked(e) {
      console.log("spouseIncomeCurrencyChecked e = ", e)
     this.spouseCurrency = this.currencyList.find(curr => curr.value === e.toString())
    //  console.log("🚀 ~ file: CustomerEdit.vue ~ line 1045 ~ spouseIncomeCurrencyChecked ~ this.spouseCurrency", this.spouseCurrency)
    },
    monthlyIncomeCurrencyChecked(e) {
    console.log("monthlyIncomeCurrencyChecked e = ", e)
    this.monthlyIncomeCurrency = this.currencyList.find(curr => curr.value === e.toString())
    },
    async getCurrencyList() {
     this.currencySpinning = true
      this.currencyList = [];
      await CM.getOptionList().then(res => {
        this.currentcyResult = res["CM0001"]
        this.MaritalStatusResult = res["CM0054"]
      })
        for (const i in this.MaritalStatusResult) {
          // if (this.MaritalStatusResult[i] === "Single") {
          //   this.MaritalStatusResult[i] = this.$t('message.single')
          // }
          // if (this.MaritalStatusResult[i] === "Married") {
          //   this.MaritalStatusResult[i] = this.$t('message.married')
          // }
          // if (this.MaritalStatusResult[i] === "Divorced") {
          //   this.MaritalStatusResult[i] = this.$t('message.divorced')
          // }
          // if (this.MaritalStatusResult[i] === "Widowed") {
          //   this.MaritalStatusResult[i] = this.$t('message.widowed')
          // }
          this.MaritalStatus.push({ name: this.MaritalStatusResult[i], value: i });
        }
        for (const i in this.currentcyResult) {
          this.currencyList.push({ name: this.currentcyResult[i], value: i });
        }
        this.currencyList.sort((s1, s2) => {
          const x1 = s1.name.toUpperCase();
          const x2 = s2.name.toUpperCase();
          if (x1 < x2) return -1;
          if (x1 > x2) return 1;
          return 0;
        });
         this.currencySpinning = false
    },
      hyphenAppend(e) {
        if (e.inputType !== 'deleteContentBackward') {
          const pattern = String("_-____-_____-__-_");
          const pattern_ex = String("-");
          let returnText = String("");
          const obj_l = e.target.value.length;
          const obj_l2 = obj_l - 1;
          for (let i = 0; i < pattern.length; i++) {
            if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
              returnText += e.target.value + pattern_ex;
              e.target.value = returnText;
            }
          }
          if (obj_l >= pattern.length) {
            e.target.value = e.target.value.substr(0, pattern.length);
          }
        }
      },
        selectChange(e, type) {
            if (type === 'bankName') {
                const BIC = {
                    'Citigroup': 'CITICNSX',
                    'ICBC': 'ICBKCNBJ',
                    'Mizuho FG': 'MHCBJPJT',
                    'Wells fargo': 'WFBIUS63',
                    'HSBC': 'HSBCCNSH'
                }
                this.reveal.bankBIC = BIC[e]
            } else if (type === 'IDType' || type === 'spouseIDType') {
                this.spouseType = e;
                this.$set(this.reveal, type, e);
                let resetFields = ['passportCountry', 'certificateID'];
                let certificateIdClass = '.certificate-id';
                const rules = { noSymbol: true }
                let maxLength = 20;
                let maxLengthKey = 'certificateID';
                if (type === 'spouseIDType') {
                    resetFields = ['spousePassportCountry', 'spouseCertificateID']
                    certificateIdClass = '.spouse-certificate-id'
                    maxLengthKey = 'spouseCertificateID'
                }
                this.form.resetFields(resetFields)
                const dom = document.querySelectorAll(certificateIdClass);
                rules.noSpace = true;
                if (e === '101') {
                    rules.noLetter = false;
                    rules.message = "ssss";
                    maxLength = 13
                }
                this.maxLength[maxLengthKey] = maxLength
                inputValidate(dom, rules)
            } else if (type === 'maritalStatus') {
                // this.reveal.maritalStatus = e;
                this.$set(this.reveal, 'maritalStatus', e);
                this.form.resetFields(['spouseName', 'spouseIDType', 'spouseCertificateID', 'spousePassportCountry', 'spousePhoneNumber', 'spouseEmployerName', 'spouseMonthlyIncome', 'numberOfChildren'])
            }
        },
        dateChange(e, type) {
            if (type === 'birthdate') {
                if (e) {
                    this.reveal.age = this.getAge(e.valueOf())
                } else {
                    this.reveal.age = ''
                }
            }
        },
        submit() {
            this.form.validateFields((err, value) => {
                console.log("validateFields value = ", value)
                if (!err) {
                    this.loading = true;
                    if (this.pageType !== 'customerReview') {
                        const param = {
                            // "CustName": "",
                            "FirstName": value.firstName,
                            "LastName": value.lastName,
                            "Title": value.title,
                            "CustType": value.customerType,
                            "Status": "0",
                            "IdCountry": value.passportCountry, // --
                            "IdType": value.IDType,
                            "IdNo": value.certificateID,
                            "ContractNo": value.customerPhoneNumber,
                            "WorkPhoneNo": value.workPhoneNumber,
                            "Email": value.email,
                            // "LprOrgNo": "",
                            // "OrgName": "",
                            // "CustMgrEmpnbr": "",
                            // "CustMgrName": "",
                            "Country": value.nationality,
                            "Gender": value.gender,
                            // "Nationality": '',
                            "Birthday": new Date(value.birthDate).format('yyyy-MM-dd'), // --
                            "MaritalStatus": value.maritalStatus, // --
                            "SpouseName": value.spouseName, // --
                            "SpouseIdType": value.spouseIDType, // --
                            "SpouseIdNo": value.spouseCertificateID, // --
                            "SpousTelNum": value.spousePhoneNumber, // --
                            "SpouseCompany": value.spouseEmployerName, // --
                            "SpouseIncom": Number(value.spouseMonthlyIncome), // --
                            "FosterNumber": Number(value.numberOfChildren), // --
                            "Education": value.highestEducationLevel, // --
                            "Major": value.major, // --
                            "Currency": this.monthlyIncomeCurrency.name,
                            "SpouseCurrency": this.spouseCurrency.name,
                            // "MaxDegt": "",
                            "ShoolName": value.institution, // --
                            "MaxDegrGradDate": value.yearOfGraduation, // --
                            "JobStatus": value.occupationNote,
                            "Job": value.occupation, // --
                            "CompanyName": value.employerName, // --
                            "CompanyAddr": value.employerAddress, // --
                            // "Position": "",
                            "ProofId": this.info.ProofId,
                            "MthIncomAmt": Number(value.monthlyIncome), // --
                            "HouseHoldRgstNumber": value.householdRegistrationNumber, // --
                            "NewComment": value.makerComment, // --
                            "NeedApprove": "Y", // 是否需要审核
                            "SpouseIdCountry": value.spousePassportCountry,
                            "SignInfo": [
                                {
                                    "ContType": "40002",
                                    "OtherBankName": value.bankName,
                                    "SwiftCode": this.reveal.bankBIC,
                                    "AcctName": value.bankAccountName,
                                    "AcctNo": value.bankAccountNumber,
                                    "CreitNm": value.creitNm,
                                    "CardHdNm": value.cardHolderName,
                                    "ExpiryMonth": value.expiryMonth,
                                    "ExpiryYear": value.expiryYear,
                                    "SecurityCd": value.securityCode
                                }
                            ],
                            "AddressArr": [
                                {
                                    "Addr": value.registrationStreetAddress,
                                    "AddrCountry": value.registrationCountry,
                                    "AddrProvinceState": value.registrationStateProvince,
                                    "AddrCity": value.registrationSuburbDistrict,
                                    "ZipCode": value.registrationZipcodePostcode
                                },
                                {
                                    "Addr": value.residentialStreetAddress,
                                    "AddrCountry": value.residentialCountry,
                                    "AddrProvinceState": value.residentialStateProvince,
                                    "AddrCity": value.residentialSuburbDistrict,
                                    "ZipCode": value.residentialZipcodePostcode
                                }
                            ],
                            "Emergency": [
                                {
                                    "EmergencyName": value.emergencyContactName,
                                    "Relationship": value.emergencyContactRelationship,
                                    "EmergencyContactNo": value.EmergencyContactPhoneNumber,
                                    "EmergencyAddr": value.emergencyContactAddress
                                }
                            ]
                            // "SpouseCurrency": value.SpouseCurrency,
                            // "Currency": value.Currency,

                        }
                        console.log('param new api = ', param)
                        if (this.pageType === 'customerCreate') {
                            this.upFile().then(fileKey => {
                                param.ProofId = fileKey.join('___');
                                this.createCustomer(param);
                            })
                        } else if (this.pageType === 'customerEdit') {
                            if (this.identityFile.length > 0) {
                              console.log('identity', this.identityFile);
                                this.upFile().then(fileKey => {
                                    const oldProofIdList = this.fileList.filter(file => file.status === 'done') || []
                                    const ProofIdList = [...fileKey]
                                    oldProofIdList.forEach(file => {
                                        ProofIdList.push(file.uid)
                                    })
                                    param.ProofId = ProofIdList.join('___');
                                    this.editCustomer(param)
                                })
                            } else {
                                const ProofId = [];
                                this.fileList.forEach(file => {
                                    ProofId.push(file.uid)
                                })
                                param.ProofId = ProofId.join('___');
                                this.editCustomer(param)
                            }
                        }
                    } else {
                        const param = {
                            "CustId": this.option.id,
                            "OprType": this.option.recrodStatus === '12' ? '1' : '2',
                            "ApprvSugstnCd": this.checker.review,
                            "ApprvSugstnComnt": value.checkerComment || ''
                        }
                        this.customerReview(param)
                    }
                }
            });
        },
        // 创建客户
        createCustomer(param) {
            Customer.createCustomer(param).then(res => {
                this.showSuccess = true;
                this.CIF = res.CustId
            }).finally(() => {
                this.loading = false;
            })
        },
        // 审计
        customerReview(param) {
            Customer.customerReview(param).then(res => {
                this.$notification.success({
                    message: this.$t('Utils.success'),
                    description: 'The request was executed successfully.'
                });
                setTimeout(() => {
                    this.$router.push({ path: '/customer' });
                }, 1000)
            }).finally(() => {
                this.loading = false;
            })
        },
        // 查询用户
        getCustomerDetails(id) {
           Customer.getCustomerDetails({ CustId: id }).then(res => {
                console.log("getCustomerDetails res = ", res)
                this.showPage = true;
                const newInfo = this.initialInfo = JSON.parse(JSON.stringify(res));
                this.reveal.bankBIC = res.SignInfo[0].SwiftCode;
                this.reveal.age = this.getAge(new Date(res.Birthday).getTime())
                if (this.pageType === 'customerReview') {
                    try {
                        const changeContext = JSON.parse(res.ChgContextList);
                        let key = '';
                        changeContext.forEach(item => {
                            if (item.ChgField.indexOf('{') !== -1) {
                                try {
                                    const keyInfo = JSON.parse(item.ChgField)
                                    newInfo[keyInfo.key] = newInfo[keyInfo.key] || [];
                                    newInfo[keyInfo.key][keyInfo.index] = newInfo[keyInfo.key][keyInfo.index] || {};
                                    newInfo[keyInfo.key][keyInfo.index][keyInfo.itemKey] = item.ChgValueAfter;
                                    key = keyInfo.key + '[' + keyInfo.index + '].' + keyInfo.itemKey
                                } catch (e) {
                                    return false
                                }
                            } else {
                                key = item.ChgField
                                newInfo[item.ChgField] = item.ChgValueAfter
                            }
                            if (key) {
                                try {
                                    this.$refs[key].$el.querySelector('.ant-form-item-label label').style.color = '#f00'
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                        })
                        this.reveal.userId = newInfo.ChgTeller;
                        this.info = newInfo;
                    } catch (e) {
                        this.info = res;
                    }
                    this.makerId = res.ChgTeller
                } else {
                    this.info = res;
                }
                if (res.Currency) {
                this.info["Currency"] = res.Currency;
                }
                if (res.SpouseCurrency) {
                  this.info["SpouseCurrency"] = res.SpouseCurrency;
                }
                const ProofIdList = this.info.ProofId.split('___');
                const getFileList = []
                console.log('oop1')
                ProofIdList.forEach((item) => {
                getFileList.push(this.downloadFile(item, ProofIdList.length))
                })
                this.$set(this.reveal, 'maritalStatus', this.info.MaritalStatus)
                // this.reveal.maritalStatus = this.info.MaritalStatus;
                this.selectChange(this.info.IdType, 'IDType')
                this.selectChange(this.info.SpouseIdType, 'spouseIDType')
            })
        },
        // 编辑
        editCustomer(param) {
            const changeContext = []
            for (const key in
                param) {
                if (key !== 'AddressArr' && key !== 'Emergency' && key !== 'SignInfo') {
                    if (param[key] !== this.initialInfo[key] && key && key !== 'Status' && key !== 'NewComment' && key !== 'NeedApprove' && key !== 'newComm' || param[key] === 0 || this.initialInfo[key] === 0) {
                        if (this.initialInfo[key] + '' !== param[key] + '') {
                            changeContext.push({
                                ChgField: key,
                                ChgValueBefore: this.initialInfo[key] + '',
                                ChgValueAfter: param[key] + ''
                            })
                        }
                    }
                } else {
                    param[key].forEach((arrItem, index) => {
                        for (const itemKey in
                            arrItem) {
                            if (arrItem[itemKey] !== this.initialInfo[key][index][itemKey]) {
                                changeContext.push({
                                    ChgField: JSON.stringify({ key: key, index: index, itemKey: itemKey }),
                                    ChgValueBefore: this.initialInfo[key][index][itemKey] + '',
                                    ChgValueAfter: arrItem[itemKey] + ''
                                })
                            }
                        }
                    })
                }
            }
            param.CustId = this.option.id;
            param.ChgContext = changeContext;
            // this.loading = false
            Customer.editCustomer(param).then(res => {
                this.$notification.success({
                    message: this.$t('Utils.success'),
                    description: 'The request was executed successfully.'
                });
                setTimeout(() => {
                    this.$router.push({ path: '/customer' });
                }, 1000)
            }).finally(() => {
                this.loading = false;
            })
        },
        // 上传文件
        upFile() {
            return new Promise((resolve, reject) => {
                // const file = this.identityFile;
                // const param = new FormData();
                // param.append('FileId', file.name);
                // param.append('Buf', file);
                const params = [];
                const getAllBase = [];
                this.identityFile.forEach((file, index) => {
                    params.push({
                        Key: file.name + '__' + index,
                        Buf: ''
                    })
                    getAllBase.push(this.getBase(file))
                })
                Promise.all(getAllBase).then(base64List => {
                    base64List.forEach((base64, index) => {
                        params[index].Buf = base64;
                    })
                    CM.upFile({
                        Flag: '2',
                        DosFileBase64: params
                    }).then(res => {
                        resolve(res.Key)
                    }).catch(error => {
                        reject(error)
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 下载文件
       async downloadFile(fileId, length) {
             return await CM.downloadFile(fileId).then(res => {
                    const fileName = fileId.split('__') || [fileId]
                    this.fileList.push({
                        uid: fileId,
                        name: fileName[0],
                        status: 'done',
                        url: 'javascript:;',
                        base64: res.Buf
                    })
                    // console.log("🚀 ~ file: CustomerEdit.vue ~ line 1531 ~ CM.downloadFile ~ this.fileList", this.fileList)
                    this.percent += Math.ceil(100 / length);
                    console.log("🚀 ~ file: CustomerEdit.vue ~ line 1537 ~ returnawaitCM.downloadFile ~  this.percent ", this.percent)
                    if (this.percent >= 100) {
                    this.loading = false;
                    this.pageLoading = false;
                    }
                }).catch(error => {
                    this.$message.error(error.RetMessage)
                })
        },
        fileListChange(info) {
            if (info.file.status === 'removed') {
             this.identityFile = this.identityFile.filter(m => {
                return m.uid !== info.file.uid
              })
              this.fileList = info.fileList;
                // console.log("🚀 ~ file: CustomerEdit.vue ~ line 1398 ~ fileListChange ~ this.fileList ", this.fileList)
            }
        },
        beforeUpload(e) {
            const typeArr = e.name.split('.')
            const type = typeArr[typeArr.length - 1]
            const outoflimit = (e.size / 1024) > 500;// 500kb以内
            if (this.fileList.length >= 5) {
                this.$message.error('The number of files selected exceeds the maximum limit!');
                return false
            } else if (typeArr[0].length > 50) {
                this.$message.error('The file name is too long. Please upload a file with a file name less than 50 characters!');
                return false
            } else if (type !== 'png' && type !== 'jpg' && type !== 'jpeg') {
                this.$message.error('Please select a file in PNG, JPG, JPEG format');
                return false
            } else if (outoflimit) {
                // this.form.setFields({ 'proofOfIdentity': { errors: [new Error('Image must smaller than 500kb!')] }})
                this.$message.error(this.$t('loan.image_size'));
                return false
            } else {
                this.identityFile.push(e);
                this.fileList.push(e);
            }
            return false;
        },
        async previewProofOfIdentity(file) {
        // console.log("🚀 ~ file: CustomerEdit.vue ~ line 1436 ~ previewProofOfIdentity ~ file", file.blob, file.previeww)
            if (file.status !== 'done') {
                if (!file.blob && !file.preview) {
                    file.preview = await this.getBase(file);
                    file.blob = this.getBlob(file.preview)
                }
                this.proofOfIdentity.base64 = file.blob || file.preview;
            }
            this.proofOfIdentity.base64 = file.base64 || file.preview;
            this.proofOfIdentity.show = true;
        },
        getBase(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        getBlob(base64) {
            const arr = base64.split(',');
            var mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return URL.createObjectURL(new Blob([u8arr], { type: mime }));
        },
        getAge(date) {
            if (date && typeof date === "number") {
                const difference = new Date().getTime() - date;
                if (difference > 0) {
                    return parseInt(difference / (1000 * 60 * 60 * 24 * 365));
                }
            }
        },
        validate(key, option) {
            // if (this.pageType === 'customerReview') {
            //   option = option || { rules: [{}] };
            //   option.rules = option.rules || [{}]
            //   option.rules[0].required = false;
            // }
            return getFormValidate(key, option)
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        resetForm() {
            this.form.resetFields()
            this.reveal.bankBIC = ''
            this.reveal.age = '';
            this.fileList = []
        },
        newCustomer() {
            this.showSuccess = false;
            this.resetForm();
            this.initPage()
            if (this.pageType !== 'customerCreate') {
                this.$router.push('/customer/customerCreate')
            }
        }
    }
};
</script>

<style lang="less">
.customer-details-edit {
    .submit-content {
        display: flex;
        justify-content: center;

        > button {
            margin: 12px;
        }
    }

    /deep/ .ant-form-item-no-colon {
        width: 100%;
        height: 22px;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        color: #000;
    }

    /deep/ .ant-form-item {
        margin-bottom: 6px;
    }

    .form-radio {
        display: flex;
        flex-direction: column;

        > label {
            margin-bottom: 6px;
        }
    }

    .product {
        background-color: #fff;
        min-height: 240px;
        padding: 26px 32px;
        box-sizing: border-box;
    }

    .extra {
        cursor: pointer;
    }

    .card-content-title {
        width: 100%;
        height: 22px;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        color: #000;
        margin-bottom: 8px;
    }

    .card-content-text {
        height: 18px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        color: #737373;

    }

    .click-line {
        border: 1px solid #e8e8e8;
        background-color: #fff;
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

    .form-card {
        margin-bottom: 24px;
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

        > div {
            border-radius: 4px;
            background-color: #f0f2f5;
        }
    }
}

.success-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 272px;
    width: 100%;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #e8e8e8;

    .msg {
        height: 25px;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
        margin-bottom: 20px;
    }

    .product-id {
        height: 25px;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #1890ff;
        margin-bottom: 30px;
    }
}

.input-and-text {
    display: flex;
    align-items: center;

    .input-and-text-input {
        width: 50%;
    }

    & > span {
        margin-left: 5px;
    }
}
.preview-modal{
    .ant-modal{
        top: 20px;
    }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
