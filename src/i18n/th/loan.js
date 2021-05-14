const loan = {
    loan: {
        // Button
        loan_reference_number: "เลขที่บัญชีสินเชื่อ",
        new_loan: "สร้างบัญชีสินเชื่อใหม่",
        loan_list_btn: "ไปยังหน้ารายการบัญชีสินเชื่อ",
        bank: "ธนาคาร",
        view_repayment_plan_btn: "ตารางแสดงภาระหนี้",

        // Title
        optional_transaction_number: "เลขการทำธุรกรรม (optional)",
        optional_proof_of_payment: "หลักฐานการชำระเงิน (optional)",
        support_file_type: "รองรับสกุลไฟล์：.png .jpg .jpeg",

        title_transaction_amount: "จำนวนเงินในการทำธุรกรรม",

        loan: "สินเชื่อ",
        loan_characteristic: "ลักษณะสินเชื่อ",
        application_number: "เลขที่สมัครสินเชื่อ",
        loan_amount_USD: "วงเงินสินเชื่อ",
        interest_rate: "อัตราดอกเบี้ย",
        overdue_amount: "จำนวนเงินเกินกำหนดชำระ",
        drawdown_date: "วันที่เบิกเงินกู้",
        maturity_date: "วันครบกำหนดสัญญา",
        transaction_Info: "ข้อมูลธุรกรรม",
        transaction_history: "ประวัติการทําธุรกรรม",
        contact_history: "Contact History",
        loan_acc: "บัญชีสินเชื่อ",
        loan_status: "สถานะบัญชีสินเชื่อ",
        request: "รอการอนุมัติ",
        approved: "อนุมัติ",
        denied: "ปฏิเสธ",
        closed: "ปิดบัญชี",
        loan_application_number: "เลขที่สมัครสินเชื่อ",
        loan_application_date: "วันที่สมัครสินเชื่อ",
        arrangement_purpose: "วัตถุประสงค์ในการขอสินเชื่อ",
        credit_usage: "จำนวนเงินที่เบิกใช้จริง",
        auto_repay_activation: "มีผลให้ตัดชำระโดยอัตโนมัติ",
        auto_repay: "ตัดชำระโดยอัตโนมัติ",
        tenor: "งวด",

        // Fees
        fee: "ค่าธรรมเนียม",
        Tax_fees: "ภาษี",
        application_fees: "ค่าธรรมเนียมในการสมัครสินเชื่อ",
        processing_fees: "ค่าธรรมเนียมการจัดการสินเชื่อ",
        overdue_fees: "ค่าธรรมเนียมการชำระเงินล่าช้า",
        anticipated_fees: "ค่าธรรมเนียม Anticipated Repayment",
        extension_fees: "ค่าธรรมเนียมการขยายสัญญาเงินกู้",
        repayment_plan_fees: "ค่าธรรมเนียมการเปลี่ยนแปลงเงื่อนไขระยะเวลาเงินกู้",

        // Disbursement
        number_of_files_selected_exceeds: "จำนวนไฟล์เกินค่าที่กำหนด",
        file_name_is_too_long: "ชื่อไฟล์ต้องไม่เกิน 50 ตัวอักษร",
        select_file_format: "เฉพาะสกุลไฟล์ PNG, JPG, JPEG",
        image_size: "ความจุของไฟล์ต้องไม่เกิน 500KB",
        non_bank: "สถาบันการเงินที่ไม่ใช่ธนาคาร",
        seven_eleven: "7-11",
        lotus: "Lotus",
        bigc: "Big C",
        family_mart: "Family Mart",

        please_select_transaction_date: "กรุณาเลือกวันที่ทำธุรกรรม",
        please_select_loan_channel: "กรุณาเลือกช่องทางการทำสินเชื่อ",
        please_select_disbursement_status: "กรุณาเลือกสถานะการเบิกเงิน",
        please_input_transaction_amount: "กรุณากรอกจำนวนเงิน",

        disbursement: "การเบิกเงินกู้",
        next_disbursement: "การเบิกเงินงวดถัดไป",
        previous_disbursement: "การเบิกเงินงวดก่อนหน้า",
        previous_disbursement_amount: "จำนวนเงินเบิกงวดก่อนหน้า",
        next_disbursement_date: "วันที่เบิกเงินงวดถัดไป",
        next_disbursement_amount: "จำนวนเงินเบิกงวดถัดไป",
        please_input_next_disbursement_amount: "กรุณากรอกจำนวนเงินเบิกงวดถัดไป",
        disbursement_amount_available: "จำนวนเงินที่สามารถเบิกได้",
        disbursement_status: "สถานะเบิกเงินกู้",
        total: "เบิกงวดเดียว",
        partial: "เบิกหลายงวด",
        disbursement_amount: "จำนวนเบิกเงินกู้",
        disbursement_channel: "ช่องทางการรับเงินกู้",
        apply_disbursement_success: "ขออนุมัติเบิกเงินกู้",
        approval_disbursement_success: "อนุมัติการเบิกเงินกู้",
        check_disbursement_amt: "จำนวนเงินที่กรอกไม่สามารถเกินกว่าจำนวนเงินกู้คงเหลือที่สามารถเบิกได้",
        disbursement_amount_avaliable: "จำนวนเงินที่สามารถเบิกได้ ",
        principal_amount: "จำนวนเงินต้น",
        interest_amount: "จำนวนดอกเบี้ย",
        check_next_disbursement_amt: "จำนวนเงินที่สามารถเบิกได้ในงวดถัดไปไม่สามารถเกินกว่าจำนวนเงินที่เบิกได้คงเหลือได้",

        // Repayment plan
        transaction_time: "เวลาในการทำธุรกรรม",
        transaction_date: "วันที่ทำธุรกรรม",
        repayment_channel: "ช่องทางการชำระเงิน",
        transaction_record: "บันทึกการทำธุรกรรม",
        channel_name: "ชื่อช่องทางการชำระเงิน",
        please_select_transaction_time: "กรุณาเลือกเวลาในการทำธุรกรรม",
        please_select_repayment_channel: "กรุณาเลือกช่องทางการชำระเงิน",
        optional_application_fees: "ค่าธรรมเนียมในการสมัครสินเชื่อ (optional)",
        repayment_status: "สถานะการรับชำระ",
        optional_processing_origination_fees: "ค่าธรรมเนียมการจัดการสินเชื่อ (optional)",
        optional_overdue_fees: "ค่าธรรมเนียมการชำระเงินล่าช้า (optional)",
        optional_anticipated_repayment_fees: "ค่าธรรมเนียม Anticipated Repayment (optional)",
        optional_extension_fees: "ค่าธรรมเนียมการขยายสัญญาเงินกู้ (optional)",
        optional_repayment_plan_adjustment_fees: "ค่าธรรมเนียมการเปลี่ยนแปลงเงื่อนไขระยะเวลาเงินกู้ (optional)",
        optional_tax_fees: "ภาษี (optional)",

        repayment: "การรับชำระเงินคืน",
        repayment_frequency: "ความถี่ในการรับชำระเงินคืน",
        repayment_date: "วันที่รับชำระเงินคืน",
        repayment_date_for_next_period_only: 'วันที่ชำระหนี้สำหรับงวดถัดไป',
        period: "ช่วงระยะเวลา",
        installment: "จำนวนเงินคืนต่องวด",
        installment_USD: "จำนวนเงินคืนต่องวด",
        principal_USD: "เงินต้น",
        interest_USD: "ดอกเบี้ย",
        credit_usage_USD: "จำนวนเงินที่เบิกใช้จริง",
        outstanding_balance_USD: "ยอดคงค้าง",
        apply_repayment_success: "ขออนุมัติชำระหนี้",
        approval_repayment_success: "อนุมัติการชำระหนี้",
        check_repayment_amt: "จำนวนเงินที่กรอกไม่สามารถเกินกว่าจำนวนเงินคงเหลือที่ค้างชำระได้",

        // Loan Detail
        date: "วันที่",
        time: "เวลา",
        TRC_code: "รหัสการทำรายการ",
        TRC_detail: "รายละเอียดการทำรายการ",
        amount: "จำนวนเงิน",
        principal: "เงินต้น",
        interest: "ดอกเบี้ย",
        outstanding_balance: "ยอดคงค้าง",
        new_disbursment_record: "เพิ่มรายการบันทึกการเบิกเงิน",
        new_contact_history_record: "New Contact History Record",
        new_repayment_record: "เพิ่มรายการบันทึกการชำระเงิน",
        delete_history_title: 'คุณต้องการลบรายการนี้ใช่หรือไม่',
        delete_history_content: 'เมื่อทำการลบรายการแล้วจะไม่สามารถเรียกคืนข้อมูลกลับมาได้',
        contacted_status: "Contacted Status",
        contacted_channel: "Contacted Channel",
        contacted_outcome: "Contacted Outcome",
        promise_to_pay_amount: "Promise-to-pay Amount",

        // Message
        enter_only_number: "กรอกเฉพาะตัวเลข",
        warning_loan_reference_number: "กรอกเลขที่บัญชีสินเชื่อได้ 1-29 ตัวอักษร",
        loan_save_successfully: "บันทึกข้อมูลสินเชื่อเรียบร้อยแล้ว",
        loan_create_successfully: "เปิดบัญชีใหม่เรียบร้อยแล้ว",
        th_month: "ของเดือน",

        rpym: "RPYM",
        disb: "DISB",
        sending_email: "กำลังส่งอีเมล์...",
        email_sent_success: "ส่งอีเมล์สำเร็จ",
        email_sent_failed: "ส่งอีเมล์ไม่สำเร็จ",
        get_pdf_download_link: "กำลังดาวน์โหลดไฟล์...",
        get_pdf_download_failed: "ดาวน์โหลดไฟล์ไม่สำเร็จ",
        select_transaction_number: "กรุณาเลือกเลขการทำธุรกรรม",
        please_select_repayment_status: "กรุณาเลือกสถานะการชำระเงิน",
        repayment_amount_avaliable: "จำนวนยอดคงค้างที่ต้องชำระ",
        please_select_review: "กรุณาเลือกสถานะการอนุมัติ ",

        // Bank Information
        linked_bank_acc: 'บัญชีธนาคารที่ทำธุรกรรม',
        linked_credit_card: 'บัญชีบัตรเครดิตที่ที่ทำธุรกรรม ',

        grace_period: 'ระยะเวลาปลอดหนี้',
        days: 'วัน',

         // Collections
         transaction_status: "Transaction Status",
         current_due_date: "Current Due Date",
         promise_to_pay_date: "Promise-to-pay Date",
         task_status: "Task Status",
         task_date: "Task Date",
         fully_paid: "Fully Paid",
        partial_paid: "Partial Paid",
        un_paid: "Unpaid",

         // Contact History Details
         task_number: "Task Number",
         task_time: "Task Time",
         contacted_type: "Contacted Type",
         contacted_person: "Contacted Person",
         contacted_person_name: "Contacted Person Name",
         contacted_note: "Contacted Notes",

        delete_transaction_success: "ลบการทำธุระกรรมสำเร็จ!"

    }
}
export default loan
