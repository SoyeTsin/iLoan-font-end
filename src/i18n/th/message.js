const message = {
    message: {
        // Button
        view_history_log_btn: "ไปยังหน้าประวัติการบันทึกข้อมูล",
        view_btn: "ดูข้อมูล",
        query_btn: "ค้นหา",
        edit_btn: "แก้ไข",
        save_btn: "บันทึก",
        reset_btn: "รีเซ็ต",
        upload_btn: "อัปโหลด",
        next_btn: "ถัดไป",
        comfirm_btn: "ยืนยัน",
        download_btn: "ดาวน์โหลด",
        back_btn: "กลับไป",

        // Common
        cif: "รหัสประจำตัวลูกค้า",
        id_type: "ประเภทบัตรประจำตัว",
        certificate_id: "เลขประจำตัว",
        maker_checker_status: "สถานะผู้บันทึก-ผู้อนุมัติ",
        action: "คำสั่ง",
        id_certificate: "เลขที่บัตรประชาชน",
        passport_id: "เลขที่หนังสือเดินทาง",
        status_reason: "ข้อมูลสถานะลูกค้า",

        // Bank Accounts
        bank_acc: "บัญชีธนาคาร",
        bank_name: "ชื่อธนาคาร",
        bic: "BIC",
        bank_acc_number: "เลขที่บัญชีธนาคาร",
        bank_acc_name: "ชื่อบัญชีธนาคาร",

        // Identification
        title: "คำนำหน้า",
        mr: "นาย",
        mrs: "นาง",
        miss: "นางสาว",
        firstname: "ชื่อ",
        lastname: "นามสกุล",
        birthdate: "วันเดือนปีเกิด",
        age: "อายุ",
        gender: "เพศ",
        male: "ชาย",
        female: "หญิง",
        other: "อื่นๆ",
        passport_country: "ประเทศตามหนังสือเดินทาง",
        nationality: "สัญชาติ",
        proof_identity: "หลักฐานการยืนยันตัวตน",
        household_number: "เลขที่ทะเบียนบ้าน",
        street_address: "ที่อยู่ตามทะเบียนบ้าน",
        suburb_district: "อำเภอ/เขตตามทะเบียนบ้าน",
        state_province: "จังหวัดตามทะเบียนบ้าน",
        country: "ประเทศตามทะเบียนบ้าน",
        zipcode_postcode: "รหัสไปรษณีย์ตามทะเบียนบ้าน",

        // Contact
        customer_phone_mumber: "เบอร์ติดต่อ",
        work_phone_number: "เบอร์ติดต่อสถานที่ทำงาน",
        email: "อีเมล์",

        // Mailing Address
        resident_street: "ที่อยู่ปัจจุบัน",
        resident_suburb_district: "อำเภอ/แขวงตามที่อยู่ปัจจุบัน",
        resident_state_province: "จังหวัดเขตตามที่อยู่ปัจจุบัน",
        resident_country: "ประเทศตามที่อยู่ปัจจุบัน",
        resident_zipcode_postcode: "รหัสไปรษณีย์ตามที่อยู่ปัจจุบัน",

        // Emergency Contact
        emergency_contact_name: "ชื่อ-นามสกุลผู้ที่ติดต่อกรณีฉุกเฉิน",
        emergency_contact_relationship: "ความสัมพันธ์กับลูกค้า",
        spouse: "คู่สมรส",
        children: "บุตร",
        parents: "ผู้ปกครอง",
        self: "ตนเอง",
        brother_and_sister: "พี่น้อง",
        emergency_contact_phone_number: "เบอร์ติดต่อผู้ที่ติดต่อกรณีฉุกเฉิน",
        emergency_contact_address: "ที่อยู่ผู้ที่ติดต่อกรณีฉุกเฉิน",

        // Personal
        // Education
        highest_educate_level: "ระดับการศึกษา",
        under_bachelor: "ต่ำกว่าปริญญาตรี",
        bachelor: "ปริญญาตรี",
        master: "ปริญญาโท",
        doctor: "ปริญญาเอก",
        institution: "ชื่อสถาบัน",
        major: "หลักสูตร",
        graduation_year: "ปีที่จบหลักสูตร",

        // Occupation
        occupation_note: "เพิ่มเติม",
        employer_name: "ชื่อนายจ้าง",
        employer_address: "ที่อยู่นายจ้าง",
        monthly_income: "รายได้ต่อเดือน",

        // Marital Detail
        marital_status: "สถานภาพการสมรส",
        unmarried: "โสด",
        married: "สมรส",
        unKnown: "ไม่ระบุ",
        single: "โสด",
        divorced: "หย่าร้าง ",
        widowed: "หม้าย",
        spouse_name: "ชื่อ-นามสกุลคู่สมรส",
        spouse_id_type: "ประเภทบัตรประจำตัวคู่สมรส",
        citizen_id: "เลขที่บัตรประชาชน",
        passport: "เลขที่หนังสือเดินทาง",
        spouse_certificate_id: "เลขประจำตัวคู่สมรส",
        spouse_passport_country: "ประเทศตามหนังสือเดินทางคู่สมรส",
        spouse_phone_number: "เบอร์ติดต่อคู่สมรส",
        spouse_employer_name: "ชื่อนายจ้างของคู่สมรส",
        spouse_monthly_income: "รายได้ต่อเดือนคู่สมรส",
        children_number: "จำนวนบุตร",

        // Guarantee
        guarantee_method: "ประเภทการค้ำประกัน",
        no_guarantee: "ไม่มีการค้ำประกัน",
        guarantor: "ผู้ค้ำประกัน",
        guarantor_name: "ชื่อ-นามสกุลผู้ค้ำประกัน",
        guarantor_id_type: "ประเภทบัตรประจำตัวผู้ค้ำประกัน",
        guarantor_certificate_id: "เลขประจำตัวผู้ค้ำประกัน",
        guarantor_passport_country: "ประเทศตามหนังสือเดินทางผู้ค้ำประกัน",
        guarantor_phone_number: "หมายเลขติดต่อผู้ค้ำประกัน ",

        currency: "สกุลเงิน",
        application_date: "วันที่สมัคร",
        approval_date: "วันที่อนุมัติ",
        effective_date: "วันที่มีผลบังคับใช้",
        expiry_date: "วันที่สิ้นสุด",
        number_of_applicant: "จำนวนผู้กู้",
        single_customer: "ผู้กู้เดี่ยว",
        maximum_loan_amount_USD: "จำนวนเงินที่สามารถกู้ได้",
        minimum_interest_rate: "อัตราดอกเบี้ยต่ำสุด",
        maximum_interest_rate: "อัตราดอกเบี้ยสูงสุด",
        repayment_detail: "ข้อมูลการชำระคืน",
        early_repayment_allowance: "อนุญาตให้ชำระเงินคืนล่วงหน้า",
        allow: "อนุญาต",
        not_allow: "ไม่อนุญาต",

        pending: "ขออนุมัติ",
        agreed: "เห็นด้วย",
        returned: "ปฏิเสธ",

        end: "End",
        abstain: "Abstain",
        personal_micro_loan: "สินเชื่อไมโครโลน",
        // Maker
        maker: "ผู้บันทึก",
        user_id: "รหัสพนักงาน",
        maker_comment: "เพิ่มเติม",

        // Checker
        checker: "ผู้อนุมัติ",
        review: "ผลการอนุมัติ",
        agree: "อนุมัติ",
        return: "ปฏิเสธ",
        checker_comment: "เพิ่มเติม",
        USD: "USD",
        personal: "ข้อมูลส่วนบุคคล",
        person: "คน",
        fixed_principal: "เงินต้นคงที่",
        fixed_installment: "ยอดผ่อนชำระคงที่",
        approve: "อนุมัติ",
        reject: "ปฏิเสธ",
        citigroup: "ซิตี้กรุ๊ป",
        icbc: "ไอซีบีซี",
        mizuho_FG: "มิซูโฮเอฟจี",
        wells_fargo: "เวลส์ฟาร์โก้",
        hsbc: "เฮชเอสบีซี",
        identification: "เลขประจำตัว",
        regular: "ทั่วไป",
        blacklist: "Black List",
        individual: "รายบุคคล",

        // Status
        inactive: "ไม่มีผลบังคับใช้",
        active: "มีผลบังคับใช้",
        cancelled: "ยกเลิก",
        no_information: "ไม่พบข้อมูล",

        // Warning message
        input_passport_certification: 'กรุณากรอกเลขที่หนังสือเดินทาง',
        input_only_alphabet_number: "กรอกเฉพาะตัวอักษรและตัวเลข",
        input_only_number: "กรอกเฉพาะตัวเลข",
        input_only_string: "กรุณากรอกข้อมูลให้ถูกต้อง",
        input_max_12_digits: "กรอกได้ 1-12 ตัวอักษร",
        input_max_13_digits: "กรอกได้ 1-13 ตัวอักษร",
        passport_certificate_id_max_lenght: "กรอกได้ 1-10 ตัวอักษร",
        passport_certificate_id_required: "กรุณากรอกเลขประจำตัว",
        input_your_user_id: "กรุณากรอกรหัสพนักงาน",
        input_your_password: "กรุณากรอกรหัสผ่าน",
        please_correct_information: "กรุณากรอกข้อมูลให้ถูกต้อง",
        up_to_15_digits: "กรอกได้ 1-15 ตัวอักษร",
        please_input_number: "กรอกเฉพาะตัวเลข",
        please_input_positive_number: "กรอกเฉพาะจำนวนบวก",
        up_to_two_decimal: "กรอกได้ไม่เกิน 2 จุดทศนิยม",
        up_to_ten_digits: "กรอกได้ 1-10 ตัวอักษร",
        input_user_id: 'กรุณากรอกรหัสพนักงาน',
        correct_email_format: 'กรุณากรอกอีเมล์ให้ถูกต้อง',
        input_email: 'กรุณากรอกอีเมล์',
        correct_phone_format: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        input_group: 'กรุณากรอกกลุ่มพนักงาน',
        select_time: 'กรุณากรอกเวลา',
        select_correct_information: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        alphabets_only: 'กรอกเฉพาะตัวอักษร',
        not_single_customer: 'Not single customer',
        not_guarantee: 'ไม่รับประกัน',

        // Lang
        lang_thai: 'ไทย',
        lang_eng: 'English',
        lang_zh: '简体中文',
        lang_fr: 'Français',

        // 404 page
        page_not_found: '404',
        page_not_found_des: 'ขออภัย ไม่พบหน้าที่คุณต้องการ'
    }
}
export default message