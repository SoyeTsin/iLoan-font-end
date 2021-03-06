const th = {
    comm: {
        old_password: "รหัสผ่านเดิม",
        new_password: "รหัสผ่านใหม่",
        confirm_password: "ยืนยันรหัสผ่าน",
        change_password: "เปลี่ยนรหัสผ่าน",
        remark: 'หมายเหตุ',
        creator: 'ผู้สร้าง',
        create_time: 'เวลาสร้าง',
        status: 'สถานะ',
        action: 'คำสั่ง',
        detail: 'รายละเอียด',
        edit: 'แก้ไข',
        produce: 'Produce',
        recycle: 'Recycling',
        add: 'เพิ่ม',
        removed: 'ลบ',
        deploy: 'Deploy',
        type: 'ประเภท',
        version: 'เวอร์ชั่น',
        description: "รายละเอียด",
        plz_select: "กรุณาเลือก",
        next: "ต่อไป",
        back: "ย้อนกลับ",
        save: "บันทึก",
        operate_success: "ดำเนินการสำเร็จ",
        item_required: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        stop: "หยุด",
        start: "เริ่ม",
        restart: 'เริ่มต้นใหม่',
        parameter: 'Parameter',
        backup: 'Backup',
        restart_instance: "Restart Instance",
        parameter_settings: "Parameter Settings",
        create_instance: "Create Instance",
        create_listen: "สร้าง",
        connection: "เชื่อมต่อ",
        audit: "ตรวจสอบ",
        upload_certificate: "แนบหลักฐาน",
        create: "สร้าง",
        create_machine: "Create Machine",
        create_chain: "Create Chain",
        chainCert: "ChainCert",
        agencyCert: "AgencyCert",
        close: "ปิด",
        nodeCert: "NodeCert",
        nodeCertKey: "NodeCertKey",
        add_node: "Add Node",
        log: "Log",
        create_rados_cluster: "Create Rados Cluster",
        create_sql: "Create SQL",
        add_k8snode: "Add K8SNode",
        for_example: "For Example:0,1,2",
        number: "Number",
        add_to_existing_host: "Add to existing host"
    },
    userManager: {
        deleteUser: "ลบพนักงาน",
        deleteUserSuccess: "ลบพนักงานสำเร็จ",
        disableUser: "ปิดการใช้งานพนักงาน",
        unlockUser: "ปลดล็อกพนักงาน",
        set_login_time: "ตั้งค่าเวลาเข้าสู่ระบบ",
        add_group_user: "เพิ่มพนักงานในกลุ่ม",
        delete_group_user: "ลบพนักงานในกลุ่ม",
        add_group: "เพิ่มกลุ่มพนักงาน",
        delete_group: "ลบกลุ่มพนักงาน",
        edit_group: "แก้ไขชื่อกลุ่ม",
        add_role: "เพิ่มตำแหน่ง",
        edit_role: "แก้ไขชื่อตำแหน่ง",
        role_list: "รายการตำแหน่งพนักงาน",

        add: "เพิ่ม",
        addUser: "สร้างพนักงานใหม่",
        addSuccess: "เพิ่มสำเร็จ",
        error_message_password_include_upper_case: "รหัสผ่านต้องประกอบไปด้วยตัวอักษรพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ ",
        error_message_password_too_short: "รหัสผ่านสั้นเกินกว่ากำหนด",
        error_message_mobile_must_11_digit: "สร้างพนักงานใหม่ไม่สำเร็จ หมายเลขโทรศัพท์ต้องประกอบไปด้วย 11 ตัวเลข",
        error_message_email_already_exist: "มี  user email นี้แล้ว",
        editUser: "แก้ไขพนักงาน",
        userName: "รหัสพนักงาน",
        nickname: "ชื่อ-นามสกุลพนักงาน",
        password: "รหัสผ่าน",
        email: "อีเมล์",
        phone: "เบอร์ติดต่อพนักงาน",
        role: "ตำแหน่ง",
        group: "กลุ่มพนักงาน",
        selectRole: "กรุณาเลือกตำแหน่ง",
        selectGroup: "กรุณาเลือกกลุ่มพนักงาน",
        createdTime: "เวลาที่สร้าง",
        action: "คำสั่ง",
        delete: "ลบ",
        edit: "แก้ไข",
        loginSetting: "ตั้งค่าการเข้าสู่ระบบ",
        passwordAlert: "กรอกเฉพาะตัวเลขและอักขระพิเศษ",
        startingTime: "เวลาที่เริ่มต้น",
        endTime: "เวลาที่สิ้นสุด",
        clear: "ล้างข้อมูล",
        clearTime: "ล้างเวลาที่เลือก",
        selectStartDate: "กรุณาเลือกเวลาเริ่มต้น",
        selectEndDate: "กรุณาเลือกเวลาสิ้นสุด",
        startDateBehindEndDate: "เวลาเริ่มต้นควรมาก่อนเวลาสิ้นสุด",
        freeze: "ระงับชั่วคราว",
        unfreeze: "กู้คืน",
        unbind: "ไม่ผูกบัญชี",
        confirm: "บันทึก",
        cancel: "ยกเลิก",
        delete_group_success: "ลบกลุ่มพนักงานสำเร็จ",
        delete_role_success: "ลบตำแหน่งสำเร็จ",
        description_limit_space: "จำกัดตัวอักษร",
        // msg
        unfreeze_user: "คุณต้องการกู้คืนบัญชีใช่หรือไม่",
        freeze_user: "คุณต้องการระงับบัญชีใช่หรือไม่",
        unbind_user: 'คุณไม่ต้องการผูกบัญชีใช่หรือไม่',
        delete_user: 'คุณแน่ใจที่จะลบพนักงานรายนี้ใช่หรือไม่'

    },
    userAudit: {
        viewEvent: "View Event",
        modelTitle: "log detail",
        hostName: "Resources Name",
        service: "Service Name",
        instance: "Instance",
        time: "Event Time",
        userName: "User",
        logType: "Log Type",
        level: "Log Level",
        operator: "Event Name",
        operatorLevel: "Level",
        request: "Request",
        response: "Response",
        result: "Result",
        resourceType: "Resource Type"
        // resourceName:"Resources Name"
    },
    groupManager: {
        groupModelTitle: "เพิ่มกลุ่มพนักงาน",
        editModelTitle: "แก้ไขกลุ่มพนักงาน",
        groupName: "ชื่อกลุ่มพนักงาน",
        description: "รายละเอียด",
        editGroupUser: "แก้ไขรายการกลุ่มพนักงาน",
        userName: "รหัสพนักงาน",
        email: "อีเมล",
        phone: "เบอร์ติดต่อพนักงาน",
        role: "ตำแหน่ง",
        group: "กลุ่มพนักงาน",
        createdTime: "เวลาที่สร้าง",
        // button
        action: "คำสั่ง",
        confirm: "บันทึก",
        cancel: "ยกเลิก",
        // title
        editGroupName: "แก้ไขชื่อกลุ่ม",
        deleteGroup: "ลบกลุ่ม",
        new_subgroup: "กลุ่มย่อยใหม่",
        userList: "รายชื่อพนักงาน",
        group_directory: "รายการกลุ่ม",

        // message
        confirm_delete_group_msg: "คุณแน่ใจที่จะลบกลุ่มนี้ใช่หรือไม่",
        confirm_delete_group_content: "เมื่อทำการลบรายการแล้วจะไม่สามารถเรียกคืนข้อมูลกลับมาได้",
        confirm_delete_user_msg: "คุณแน่ใจที่จะลบพนักงานรายนี้ใช่หรือไม่",
        yes_msg: "ใช่",
        no_msg: "ไม่ใช่",
        groupName_warning_space: "ชื่อกลุ่มเว้นวรรคได้",
        groupName_required: "กรุณากรอกชื่อกลุ่ม"
    },
    roleManager: {
        // msg
        input_role_name: 'กรุณากรอกชื่อตำแหน่ง',
        add_role_success: 'เพิ่มตำแหน่งสำเร็จ',
        update_role_success: 'แก้ไขตำแหน่งสำเร็จ',
        selection_required: 'ต้องเลือกอย่างน้อยหนึ่งรายการ',

        add: "สร้างตำแหน่งใหม่",
        edit: 'แก้ไขตำแหน่ง',
        removed: 'ลบตำแหน่ง',
        del_confirm: "คุณจะลบตำแหน่งนี้ใช่หรือไม่?",
        role_name: "ชื่อตำแหน่ง",
        description: "รายละเอียด",
        crate_time: "เวลาที่สร้าง",
        action: "คำสั่ง",
        confirm: "บันทึก",
        cancel: "ยกเลิก",
        role_account: "ตำแหน่ง",
        loan: "สินเชื่อ",
        role_status: "สถานะตำแหน่ง",
        active: "มีผลบังคับใช้",
        inactive: "ไม่มีผลบังคับใช้"
    },
    system: {
        total: "ทั้งหมด"
    },
    changePassword: {
        characters: "กรอกได้ 8-20 ตัวอักษร",
        type: "กรอกเฉพาะตัวอักษรพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษเท่านั้น (ห้ามมีเว้นวรรค)",
        typeNum: "ต้องประกอบไปด้วยตัวอักษรพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษอย่างน้อย 3 ตัวอักษร",
        confirmPasswordError: "ยืนยันรหัสผ่านไม่ถูกต้อง",
        passwordNotSpecifications: "กรุณาทำตามเงื่อนไขรหัสผ่าน",
        changePasswordSuccess: "ตั้งค่ารหัสผ่านเรียบร้อยแล้ว",
        errorOldPassword: "รหัสผ่านเดิมไม่ถูกต้อง"
    },
    menu: {
        id: 'รหัสเมนู',
        name: 'ชื่อเมนู',
        display: 'I18N Key',
        icon: 'ไอคอนเมนู',
        parent_menu: 'เมนู Parent',
        level: 'ระดับ',
        href: 'ที่อยู่',
        index: 'ดัชนีย์',
        menu_type: 'ประเภทเมนู',
        type: 'ประเภทการทำงาน',
        status: 'สถานะ',
        menu_type_view: 'แสดง',
        menu_type_menu: 'เมนู',
        status_normal: 'ปกติ',
        status_disabled: 'ไม่ทำการ',
        status_hidden: 'ซ่อน',
        no_service_type: 'ไม่มีประเภทการทำงาน',
        no_menu_icon: 'ไม่มีไอคอนเมนู',
        btn_add_menu: 'สร้างเมนูใหม่',
        yes: 'ใช่',
        no: 'ไม่ใช่',
        operation: 'คำสั่ง',
        add_menu: 'เพิ่มเมนู',
        del_menu: 'ลบเมนู',
        update_menu: 'อัปเดตเมนู',
        confirm: 'ยืนยัน',
        cancel: 'ยกเลิก',
        edit_menu: "แก้ไขเมนู",
        // msg
        confirm_delete_menu_msg: 'คุณแน่ใจที่จะลบเมนูนี้ใช่หรือไม่',
        input_menu_id: 'กรุณากรอกรหัสเมนู',
        input_menu_name: 'กรุณากรอกชื่อเมนู',
        input_menu_I18N: 'กรุณากรอกรหัส I18N',
        input_menu_icon: 'กรุณาเลือกสัญลักษณ์เมนู',
        selection_required: 'กรุณาเลือก',
        select_parent_menu: 'กรุณาเลือกเมนูหลัก',
        input_menu_path: 'กรุณากรอกเมนู path',
        input_service_type: 'กรุณากรอกประเภทการให้บริการ',
        choose_menu_status: 'กรุณาเลือกสถานะเมนู',
        choose_menu_type: 'กรุณาเลือกประเภทเมนู',

        cannot_delete_menu: 'ไม่สามารถลบเมนูที่มีเมนูย่อยได้',
        operating_success: 'ดำเนินการสำเร็จ'
    },
    menuAuthority: {
        menuAuthority: "การเข้าถึงเมนู",
        lack_permissions: "ไม่ได้รับอนุญาตให้เข้าถึง"
    },
    functionAuthority: {
        function_authority: 'การเข้าถึงฟังก์ชั่น',
        basic: "พื้นฐาน",
        query_product_list: "ค้นหารายการผลิตภัณฑ์",
        restrict: "ข้อจำกัด",
        history_log_product_characteristic: "ดูรายการประวัติผลิตภัณฑ์",
        maker_checker: "ผู้บันทึก-ผู้อนุมัติ",
        create_new_product: "สร้างผลิตภัณฑ์ใหม่",
        view_product_detail: "ดูรายละเอียดผลิตภัณฑ์",
        edit_product_detail: "แก้ไขรายละเอียดผลิตภัณฑ์",
        status_requested: "สถานะผู้บันทึก-ผู้อนุมัติ = ขออนุมัติ",
        status_agreed: "สถานะผู้บันทึก-ผู้อนุมัติ = เห็นด้วย",
        status_return: "สถานะผู้บันทึก-ผู้อนุมัติ = ปฏิเสธ",
        customer: "ลูกค้า",
        query_customer_list: "ค้นหารายชื่อลูกค้า",
        history_log_customer_detail: "ดูรายการประวัติลูกค้า",
        create_new_customer: "สร้างลูกค้าใหม่",
        view_customer_detail: "ดูรายละเอียดลูกค้า",
        view_attached_files: "ดูข้อมูลไฟล์แนบ",
        edit_customer_detail: "แก้ไขข้อมูลลูกค้า",
        download_customer_files: "ดาวน์โหลดไฟล์ลูกค้า",
        send_emails: "ส่งอีเมล์",
        query_loan_list: "ค้นหารายการสินเชื่อ",
        view_repayment_plan: "ดูรายละเอียดแผนการชำระเงินกู้",
        create_new_loan: "สร้างสินเชื่อใหม่",
        view_loan_detail: "ดูรายละเอียดสินเชื่อ",
        view_history_log_loan_characteristic: "ดูรายการประวัติสินเชื่อ",
        edit_new_loan_detail: "แก้ไขข้อมูลสินเชื่อ",
        download_loan_files: "ดาวน์โหลดไฟล์สินเชื่อ",
        edit_loan_detail: "แก้ไขข้อมูลสินเชื่อ",
        history: "ประวัติ",
        query_history_log_product_characteristic: "ค้นหารายการประวัติผลิตภัณฑ์",
        query_history_log_customer: "ค้นหารายการประวัติลูกค้า",
        query_history_log_loan_characteristic: "ค้นหารายการประวัติสินเชื่อ",
        view_history_log_product_characteristic: "ดูรายการประวัติผลิตภัณฑ์",
        view_history_log_customer: "ดูรายการประวัติลูกค้า",
        report: "รายงาน",
        query_regulartory_report_list: "ค้นหารายงาน Regulatory",
        download_regulatory_files: "ดาวน์โหลด Regulatory",
        query_credit_bureau_report_list: "ค้นหารายงานข้อมูลเครดิตแห่งชาติ",
        download_credit_bureau_files: "ดาวน์โหลดรายงานข้อมูลเครดิตแห่งชาติ",
        query_disbursement_report_list: "ค้นหารายงานการเบิกจ่ายเงินกู้",
        download_disbursement_files: "ดาวน์โหลดรายงานการเบิกจ่ายเงินกู้",
        query_repayment_report_list: "ค้นหารายงานการชำระเงินกู้",
        download_repayment_files: "ดาวน์โหลดรายงานการชำระเงินกู้",
        query_other_report_list: "ค้นหารายงานอื่นๆ",
        download_other_files: "ดาวน์โหลดรายงานอื่นๆ"
    }
}
module.exports = th;
