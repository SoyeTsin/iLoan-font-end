const getInt = (value) => {
	switch (typeof value) {
		case 'number':
			return value
		case 'string':
			return parseFloat(value)
		default:
			return 0
	}
}

const FilterList = {
	install(Vue) {
		Vue.filter('formatPrice', (value) => {
			const price = getInt(value)
			return (
				price
				.toFixed(2)
				.toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
			)
		})
	}
}

export default FilterList;
