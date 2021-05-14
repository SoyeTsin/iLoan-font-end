const menuList = [{
	key: '0',
	name: 'Summary',
	path: '/summary',
	icon: 'bar-chart',
	menuType: 'view'
}, {
	key: '1',
	name: 'Product Management',
	path: '/product',
	icon: 'pay-circle',
	menuType: 'view'
}, {
	key: '2',
	name: 'Customer',
	path: '/customer',
	icon: 'bar-chart',
	menuType: 'view'
}, {
	key: '3',
	name: 'Loan',
	path: '/loan',
	icon: 'bar-chart',
	menuType: 'view'
}, {
	key: '4',
	name: 'History',
	path: '/history',
	icon: 'history',
	menuType: 'view'
}, {
	key: '5',
	name: 'Report',
	path: '/report',
	icon: 'bar-chart',
	menuType: 'view'
}, {
	key: '6',
	name: 'User',
	icon: 'bar-chart',
	children: [{
		key: '6-0',
		name: 'User Manager',
		path: '/userManager',
		icon: 'bar-chart',
		menuType: 'view'
	},
	{
		key: '6-1',
		name: 'Group Manager',
		path: '/groupManager',
		icon: 'bar-chart',
		menuType: 'view'
	},
	{
		key: '6-2',
		name: 'Role Manager',
		path: '/roleManager',
		icon: 'bar-chart',
		menuType: 'view'
	},
	{
		key: '6-3',
		name: 'Menu Manager',
		path: '/menuManager',
		icon: 'bar-chart',
		menuType: 'view'
	}]
}]

export default menuList
