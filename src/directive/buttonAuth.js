import Vue from "vue";

// 注册一个全局自定义指令 `v-auth`
Vue.directive('auth', {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el, binding) {
		let authBtns;
		if (sessionStorage.getItem('authBtns') && sessionStorage.getItem('authBtns') !== 'undefined') {
			authBtns = JSON.parse(sessionStorage.getItem('authBtns')) || []
		} else {
			authBtns = []
		}
		const btnId = Number(binding.value)
		if (authBtns.length < 0 || !authBtns.includes(btnId)) {
			// el.style.display = 'none'
			el.parentNode.removeChild(el)
		}
	}
})
