import Vue from 'vue'
import VueRouter from 'vue-router'
// import i18n from '@/i18n'

const Login = () => import('@/views/Login')
const Index = () => import('@/views/index')
const Summary = () => import('@/views/Summary')
const Product = () => import('@/views/Product')
const ProductDetails = () => import('@/views/ProductDetails')
const ProductDetailsEdit = () => import('@/views/ProductDetailsEdit')
const ProductDetailsCreate = () => import('@/views/ProductDetailsCreate')
const Customer = () => import('@/views/Customer')
const CustomerDetails = () => import('@/views/CustomerDetails')
const CustomerEdit = () => import('@/views/CustomerEdit')
const Loan = () => import('@/views/Loan')
const LoanContactDetails = () => import('@/views/LoanContactDetails');
const LoanContactEdit = () => import('@/views/LoanContactEdit');
const LoanContactCreate = () => import('@/views/LoanContactCreate');
const LoanDisbursement = () => import('@/views/LoanDisbursement')
const LoanDisbursementDetail = () => import('@/views/LoanDisbursementDetail')
const LoanDisbursementEdit = () => import('@/views/LoanDisbursementEdit')
const LoanRepayment = () => import('@/views/LoanRepayment')
const LoanRepaymentDetail = () => import('@/views/LoanRepaymentDetail')
const LoanRepaymentEdit = () => import('@/views/LoanRepaymentEdit')
const LoanDetails = () => import('@/views/LoanDetails')
const LoanEdit = () => import('@/views/LoanEdit')
const LoanCreate = () => import('@/views/LoanCreate')
const History = () => import('@/views/History')
const Report = () => import('@/views/Report')
const GroupManager = () => import('@/views/system/GroupManager')
const RoleManager = () => import('@/views/system/RoleManager')
const RoleManagerAddRole = () => import('@/views/system/RoleManagerAddRole')
const RoleManagerEditRole = () => import('@/views/system/RoleManagerAddRole')
const Audit = () => import('@/views/system/Audit')
const UserManager = () => import('@/views/system/UserManager')
const PasswordSetting = () => import('@/views/system/PasswordSetting')
const MenuManager = () => import('@/views/system/MenuManager')
const LoanRepaymentPlan = () => import('@/views/LoanRepaymentPlan')
const ForgotPassword = () => import('@/views/ForgotPassword')
const ForgotPasswordVerify = () => import('@/views/ForgotPasswordVerify')
const Notification = () => import('@/views/Notification');
const NotificationEdit = () => import('@/views/NotificationEdit');
const NotificationEditValidation = () => import("@/views/NotificationEditValidation");
const Exception404 = () => import("@/views/exception/404");
Vue.use(VueRouter)
// 获取用户信息
let userInfo = {};
// let isAuth = false;
let expire = 0;
try {
	const objStr = localStorage.getItem('userInfo') || '{}'
	userInfo = JSON.parse(objStr);
} catch (err) { console.log(err) }
// 获取过期时间
if (userInfo) {
	expire = userInfo.expire
}
// isAuth = expire - new Date().getTime() / 1000 > 0;
console.log('userInfo = ', userInfo);
Vue.prototype.global = Vue.prototype.global || {}
Vue.prototype.global.expire = expire;
Vue.prototype.global.userInfo = userInfo;

const routes = [
	{
		path: '/exception404',
		name: 'Exception404',
		component: Exception404,
		meta: {
			title: 'Exception404',
			noAuth: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			title: 'Login',
			noAuth: true
		}
	},
	{
		path: '/forgotPassword',
		name: 'ForgotPassword',
		component: ForgotPassword,
		meta: {
			title: 'ForgotPassword',
			noAuth: true
		}
	},
	{
		path: '/forgotPasswordVerify',
		name: 'ForgotPasswordVerify',
		component: ForgotPasswordVerify,
		meta: {
			title: 'ForgotPasswordVerify',
			noAuth: true
		}
	},
	{
		path: '/',
		name: 'index',
		component: Index,
		redirect: '/summary',
		children: [
			{
				path: '/summary',
				component: Summary,
				meta: {
					title: 'nav.Summary',
					module: '/summary'
				}
			},
			{
				path: '/product',
				component: Product,
				meta: {
					title: 'BasicLayout.product',
					module: '/product'
				}
			},
			{
				path: '/product/productDetails',
				component: ProductDetails,
				meta: {
					title: 'BasicLayout.productDetails',
					type: 'details',
					module: '/product',
					parentPath: '/product'
				}
			},
			{
				path: '/product/productDetails/productDetailsEdit',
				component: ProductDetailsEdit,
				meta: {
					title: 'BasicLayout.productDetailsEdit',
					type: 'edit',
					module: '/product',
					parentPath: '/product'
				}
			},
			{
				path: '/product/productDetails/productDetailsCreate',
				component: ProductDetailsCreate,
				meta: {
					title: 'BasicLayout.productDetailsCreate',
					type: 'create',
					module: '/product',
					parentPath: '/product'
				}
			},
			{
				path: '/customer',
				component: Customer,
				meta: {
					title: 'BasicLayout.customer',
					module: '/customer'
				}
			},
			{
				path: '/customer/customerDetails',
				component: CustomerDetails,
				name: 'customerDetails',
				meta: {
					title: 'BasicLayout.customerDetails',
					type: 'details',
					module: '/customer',
					parentPath: '/customer'
				}
			},
			{
				path: '/customer/customerEdit',
				component: CustomerEdit,
				name: 'customerEdit',
				meta: {
					title: 'BasicLayout.CustomerEdit',
					type: 'edit',
					module: '/customer',
					parentPath: '/customer'
				}
			},
			{
				path: '/customer/customerCreate',
				component: CustomerEdit,
				name: 'customerCreate',
				meta: {
					title: 'BasicLayout.customerDetailsCreate',
					type: 'edit',
					module: '/customer',
					parentPath: '/customer'
				}
			},
			{
				path: '/customer/customerReview',
				component: CustomerEdit,
				name: 'customerReview',
				meta: {
					title: 'BasicLayout.customerDetailsCreate',
					type: 'edit',
					module: '/customer',
					parentPath: '/customer'
				}
			},
			{
				path: '/loan',
				component: Loan,
				meta: {
					title: 'BasicLayout.loan',
					module: '/loan',
					fullScreen: true
				}
			},
			{
				path: '/loan/loanDetails',
				component: LoanDetails,
				name: 'loanDetails',
				meta: {
					title: 'BasicLayout.loanDetails',
					type: 'details',
					module: '/loan',
					parentPath: '/loan',
					needParam: true
				}
			},
			{
				path: '/loan/contactHistory/detail',
				component: LoanContactDetails,
				meta: {
					title: 'BasicLayout.contact_history_details',
					type: 'details',
					module: '/loan',
					parentPath: '/loan/loanDetails'
				}
			},
			{
				path: '/loan/contactHistory/edit',
				component: LoanContactEdit,
				meta: {
					title: 'BasicLayout.contact_history_edit',
					type: 'details',
					module: '/loan',
					parentPath: '/loan/loanDetails',
					needParam: true
				}
			},
			{
				path: '/loan/contactHistory/create',
				component: LoanContactCreate,
				meta: {
					title: 'BasicLayout.contact_history_create',
					type: 'create',
					module: '/loan',
					parentPath: '/loan/loanDetails',
					needParam: true
				}
			},
			{
				path: '/loan/loanDisbursement/create',
				component: LoanDisbursement,
				meta: {
					title: 'loan.new_disbursment_record',
					type: 'create',
					module: '/loan',
					parentPath: '/loan/loanDetails'
				}
			},
			{
				path: '/loan/loanDisbursement/detail',
				component: LoanDisbursementDetail,
				meta: {
					title: 'Transation History Detail',
					type: 'details',
					module: '/loan',
					parentPath: '/loan/loanDetails'
				}
			},
			{
				path: '/loan/loanDisbursement/edit',
				component: LoanDisbursementEdit,
				meta: {
					title: 'loan.new_disbursment_record',
					type: 'edit',
					module: '/loan',
					parentPath: '/loan/loanDetails'
				}
			},
			{
				path: '/loan/loanRepayment/create',
				component: LoanRepayment,
				meta: {
					title: 'loan.new_repayment_record',
					type: 'create',
					module: '/loan',
					parentPath: '/loan/loanDetails'
				}
			},
			{
				path: '/loan/loanRepayment/detail',
				component: LoanRepaymentDetail,
				meta: {
					title: 'Transation History Detail',
					type: 'details',
					module: '/loan',
					parentPath: '/loan/loanDetails'
				}
			},
			{
				path: '/loan/loanRepayment/edit',
				component: LoanRepaymentEdit,
				meta: {
					title: 'loan.new_repayment_record',
					type: 'edit',
					module: '/loan',
					parentPath: '/loan/loanDetails'
				}
			},
			{
				path: '/loan/loanEdit',
				component: LoanEdit,
				name: 'LoanEdit',
				meta: {
					title: 'BasicLayout.LoanEdit',
					type: 'edit',
					module: '/loan',
					parentPath: '/loan'
				}
			},
			{
				path: '/loan/loanCreate',
				component: LoanCreate,
				name: 'LoanCreate',
				meta: {
					title: 'BasicLayout.LoanCreate',
					type: 'edit',
					module: '/loan',
					parentPath: '/loan'
				}
			},
			{
				path: '/loan/loanReview',
				component: LoanEdit,
				name: 'LoanReview',
				meta: {
					title: 'BasicLayout.LoanEdit',
					type: 'edit',
					module: '/loan',
					parentPath: '/loan'
				}
			},
			{
				path: '/loan/loanReject',
				component: LoanCreate,
				name: 'LoanReject',
				meta: {
					title: 'BasicLayout.LoanCreate',
					type: 'edit',
					module: '/loan',
					parentPath: '/loan'
				}
			},
			{
				path: '/loan/loanRepaymentPlan',
				component: LoanRepaymentPlan,
				name: 'loanRepaymentPlan',
				meta: {
					title: 'BasicLayout.loanRepaymentPlan',
					type: 'edit',
					module: '/loan',
					parentPath: '/loan'
				}
			},
			{
				path: '/history',
				component: History,
				meta: {
					title: 'BasicLayout.history',
					fullScreen: true,
					module: '/history'
				}
			},
			{
				path: '/report',
				component: Report,
				meta: {
					title: 'BasicLayout.report',
					fullScreen: true,
					module: '/report'
				}
			},
			{
				path: '/groupManager',
				component: GroupManager,
				name: 'groupManager',
				meta: {
					title: 'BasicLayout.groupManager',
					module: '/groupManager'
				}
			},
			{
				path: '/groupManager/eidt',
				component: GroupManager,
				name: 'editUser',
				meta: {
					title: 'groupManager.editGroupUser',
					module: '/groupManager',
					parentPath: '/groupManager',
					type: 'edit'
				}
			},
			{
				path: '/roleManager',
				component: RoleManager,
				meta: {
					title: 'BasicLayout.roleManager',
					module: '/roleManager'
				}
			},
			{
				path: '/roleManagerAddRole',
				component: RoleManagerAddRole,
				meta: {
					title: 'BasicLayout.roleManagerAddRole',
					type: 'edit',
					fullScreen: true,
					module: '/roleManager'
				}
			},
			{
				path: '/roleManagerEditRole',
				component: RoleManagerEditRole,
				meta: {
					title: 'BasicLayout.roleManagerEditRole',
					type: 'edit',
					fullScreen: true,
					module: '/roleManager'
				}
			},
			{
				path: '/audit',
				component: Audit,
				meta: {
					title: 'BasicLayout.audit',
					module: '/audit'
				}
			},
			{
				path: '/notification',
				component: Notification,
				meta: {
					title: 'nav.AutoNotification'
					// module: '/notification'
				}
			},
			{
				path: '/notification/edit',
				component: NotificationEdit,
				meta: {
					title: 'noti.edit_notification',
					type: 'edit',
					parentPath: '/notification'
				}
			},
			{
				path: '/notification/validation',
				component: NotificationEditValidation,
				meta: {
					title: 'noti.edit_validation',
					type: 'edit',
					parentPath: '/notification'
				}
			},
			{
				path: '/userManager',
				component: UserManager,
				meta: {
					title: 'BasicLayout.userManager',
					module: '/userManager'
				}
			},
			{
				path: '/passwordSetting',
				component: PasswordSetting,
				meta: {
					title: 'BasicLayout.passwordSetting',
					module: '/userManager'
				}
			},
			{
				path: '/menuManager',
				component: MenuManager,
				meta: {
					title: 'BasicLayout.menuManager',
					module: '/menuManager'
				}
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})
// const authRawList = JSON.parse(sessionStorage.getItem('authRawList') || '[]')
// console.log(authRawList)
// const authButton = {};
// authRawList.forEach(item => {
// 	authButton[item.name] = item.buttons || []
// })
router.beforeEach((to, from, next) => {
	const isAuth = Vue.prototype.global.expire - new Date().getTime() / 1000 > 0 && Vue.prototype.global.userInfo.name && sessionStorage.getItem('sessionid');
	// console.log('isAuth :', isAuth && !to.meta.noAuth)
	if (!isAuth && !to.meta.noAuth) {
		localStorage.clear();
		next({ name: 'Login' })
	} else {
		next()
	}
})

export default router
