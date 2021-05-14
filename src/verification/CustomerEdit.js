const inputMessage = "Please input correct information!";
const selectMessage = "Please select correct information!";
// const lengthMessage = 'cannot be longer than 15 characters';
const inputRules = { required: true, message: inputMessage };
const selectRules = { required: true, message: selectMessage };
const customerValidate = {
	customerType: ['customerType', { initialValue: '1', rules: [selectRules] }],
	bankName: ['bankName', { rules: [selectRules] }],
	bankAccountNumber: ['bankAccountNumber', { rules: [{ ...inputRules, max: 20 }] }],
	bankAccountName: ['bankAccountName', { rules: [inputRules] }],
	title: ['title', { rules: [selectRules] }],
	firstName: ['firstName', { rules: [{ ...inputRules, max: 20 }] }],
	lastName: ['lastName', { rules: [{ ...inputRules, max: 20 }] }],
	birthDate: ['birthDate', { rules: [{ type: 'array', required: true, message: 'Please select time!' }] }],
	gender: ['gender', { initialValue: '0' }],
	IDType: ['IDType', { rules: [selectRules] }],
	certificateID: ['certificateID', { rules: [{ ...inputRules, max: 20 }] }],
	passportCountry: ['passportCountry', { rules: [{ ...inputRules, max: 20 }] }],
	nationality: ['nationality', { rules: [selectRules] }],
	proofOfIdentity: ['proofOfIdentity', {}],
	householdRegistrationNumber: ['householdRegistrationNumber', { rules: [{ ...inputRules, max: 15 }] }],
	registrationStreetAddress: ['registrationStreetAddress', { rules: [{ ...inputRules, max: 20 }] }],
	registrationSuburbDistrict: ['registrationSuburbDistrict', { rules: [selectRules] }],
	registrationStateProvince: ['registrationStateProvince', { rules: [selectRules] }],
	registrationCountry: ['registrationCountry', { rules: [selectRules] }],
	registrationZipcodePostcode: ['registrationZipcodePostcode', { rules: [{ ...inputRules, max: 5 }] }],

  customerPhoneNumber: ["customerPhoneNumber", { rules: [selectRules] }],
  customerPhoneNumberCode: ["customerPhoneNumberCode", { initialValue: "0" }],
  workPhoneNumber: ["workPhoneNumber", {}],
  workPhoneNumberCode: ["workPhoneNumberCode", { initialValue: "0" }],
  email: ["email", { rules: [{ ...inputRules, max: 20, type: "email" }] }],
  residentialStreetAddress: [
    "residentialStreetAddress",
    { rules: [{ ...inputRules, max: 20 }] }
  ],
  residentialSuburbDistrict: [
    "residentialSuburbDistrict",
    { rules: [selectRules] }
  ],
  residentialCountry: ["residentialCountry", { rules: [selectRules] }],
  residentialStateProvince: [
    "residentialStateProvince",
    { rules: [selectRules] }
  ],
  residentialZipcodePostcode: [
    "residentialZipcodePostcode",
    { rules: [{ ...inputRules, max: 5 }] }
  ],
  emergencyContactName: ["emergencyContactName", { rules: [{ max: 40 }] }],
  emergencyContactRelationship: [
    "emergencyContactRelationship",
    { rules: [{ max: 20 }] }
  ],
  EmergencyContactPhoneNumber: [
    "EmergencyContactPhoneNumber",
    { rules: [{ max: 15 }] }
  ],
  EmergencyContactPhoneNumberCode: [
    "EmergencyContactPhoneNumberCode",
    { initialValue: "0" }
  ],
  emergencyContactAddress: [
    "emergencyContactAddress",
    { rules: [{ max: 40 }] }
  ],

  highestEducationLevel: ["highestEducationLevel", {}],
  institution: ["institution", { rules: [{ max: 20 }] }],
  major: ["major", { rules: [{ max: 50 }] }],
  yearOfGraduation: ["yearOfGraduation", {}],
  occupation: ["occupation", {}],
  occupationNote: ["occupationNote", { rules: [{ max: 40 }] }],
  employerName: ["employerName", { rules: [{ max: 40 }] }],
  employerAddress: ["employerAddress", { rules: [{ max: 50 }] }],
  monthlyIncome: ["monthlyIncome", { rules: [{}] }],
  monthlyCurrency: ["monthlyCurrency", { rules: [{}] }],
  maritalStatus: ["maritalStatus", {}],
  spouseName: ["spouseName", { rules: [{ max: 40 }] }],
  spouseIDType: ["spouseIDType", {}],
  spouseCertificateID: ["spouseCertificateID", { rules: [{ ...inputRules, max: 20 }] }],
  spousePassportCountry: ["spousePassportCountry", { rules: [{ max: 20 }] }],
  spousePhoneNumber: ["spousePhoneNumber", { rules: [{ max: 15 }] }],
  spousePhoneNumberCode: ["spousePhoneNumberCode", { initialValue: "0" }],
  spouseEmployerName: ["spouseEmployerName", { rules: [{ max: 40 }] }],
  spouseMonthlyIncome: ["spouseMonthlyIncome", { rules: [] }],
  spouseMonthlyCurrency: ["spouseMonthlyCurrency", { rules: [] }],
  numberOfChildren: ["numberOfChildren", { rules: [] }],

  makerComment: ["makerComment", { rules: [{ max: 40 }] }],
  checkerComment: ["checkerComment", { rules: [{ max: 40 }] }],
  ProofOfIdentity: [
    "ProofOfIdentity",
    { rules: [{ required: true, message: "Please select file to upload" }] }
  ],
  creitNm: ['creitNm', { rules: [{ required: true, max: 30 }] }],
  cardHolderName: ['cardHolderName', { rules: [{ required: true, max: 80 }] }],
  expiryMonth: ['expiryMonth', { rules: [selectRules] }],
  expiryYear: ['expiryYear', { rules: [selectRules] }],
  securityCode: ['securityCode', { rules: [{ required: true, max: 3 }] }]

};
function getFormValidate(key, option = {}) {
  // console.log("🚀 ~ file: CustomerEdit.js ~ line 96 ~ getFormValidate ~ option", option)
  // console.log("🚀 ~ file: CustomerEdit.js ~ line 96 ~ getFormValidate ~ key", key)
  const oldRulesItem = customerValidate[key][1].rules || [];
  option.rules = option.rules || [];
  if (option.rules.length > 0 && oldRulesItem.length > 0) {
    option.rules = Object.assign(oldRulesItem, option.rules);
  }
  customerValidate[key][1] = Object.assign(customerValidate[key][1], option);
  return customerValidate[key];
}

export { getFormValidate, customerValidate };
