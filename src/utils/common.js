/*
 * @Description:
 * @Author: Stephen
 * @Date: 2019-09-21 15:02:17
 */
const common = {}
common.login_name = '';
common.getDataDay = data => {
	const cycle = data
	const end = new Date();
	const start = new Date();
	end.setTime(end.getTime() - 3600 * 1000 * 24 * 0);
	start.setTime(start.getTime() - 3600 * 1000 * 24 * cycle);
	return {
		start_time: common.formatDate(start),
		end_time: common.formatDate(end)
	}
}

// 格式化时间
common.dateStringFormat = dateString => {
	const date = new Date(dateString)
	const myyear = date.getFullYear();
	let mymonth = date.getMonth() + 1;
	let myweekday = date.getDate();
	let myhour = date.getHours();
	let mymin = date.getMinutes();
	let mysec = date.getSeconds();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	if (myhour < 10) {
		myhour = "0" + myhour;
	}
	if (mymin < 10) {
		mymin = "0" + mymin;
	}
	if (mysec < 10) {
		mysec = "0" + mysec;
	}
	return (myyear + "-" + mymonth + "-" + myweekday + " " + myhour + ":" + mymin + ":" + mysec);
}

// 格式化时间
common.formatDate = date => {
	const myyear = date.getFullYear();
	let mymonth = date.getMonth() + 1;
	let myweekday = date.getDate();
	let myhour = date.getHours();
	let mymin = date.getMinutes();
	let mysec = date.getSeconds();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	if (myhour < 10) {
		myhour = "0" + myhour;
	}
	if (mymin < 10) {
		mymin = "0" + mymin;
	}
	if (mysec < 10) {
		mysec = "0" + mysec;
	}
	return (myyear + "-" + mymonth + "-" + myweekday + " " + myhour + ":" + mymin + ":" + mysec);
}
// 格式化日期 YYYY/MM/DD HH:MM
common.formatDate2 = date => {
	const myyear = date.getFullYear();
	let mymonth = date.getMonth() + 1;
	let myweekday = date.getDate();
	let myhour = date.getHours();
	let mymin = date.getMinutes();
	let mysec = date.getSeconds();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	if (myhour < 10) {
		myhour = "0" + myhour;
	}
	if (mymin < 10) {
		mymin = "0" + mymin;
	}
	if (mysec < 10) {
		mysec = "0" + mysec;
	}
	return (myyear + "/" + mymonth + "/" + myweekday + " " + myhour + ":" + mymin);
}
// 格式化日期
common.formatDay = date => {
	const myyear = date.getFullYear();
	let mymonth = date.getMonth() + 1;
	let myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}

common.formatDateString = date => {
	const myyear = date.getFullYear();
	let mymonth = date.getMonth() + 1;
	let myweekday = date.getDate();
	let myhour = date.getHours();
	let mymin = date.getMinutes();
	let mysec = date.getSeconds();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	if (myhour < 10) {
		myhour = "0" + myhour;
	}
	if (mymin < 10) {
		mymin = "0" + mymin;
	}
	if (mysec < 10) {
		mysec = "0" + mysec;
	}
	return (myyear + "" + mymonth + "" + myweekday + "" + myhour + "" + mymin + "" + mysec);
}

common.stringToDateString = srcTime => {
	if (srcTime.length == 14) {
		const myyear = srcTime.substring(0, 4);
		const mymonth = srcTime.substring(4, 6);
		const myweekday = srcTime.substring(6, 8);
		const myhour = srcTime.substring(8, 10);
		const mymin = srcTime.substring(10, 12);
		const mysec = srcTime.substring(12, 14);
		return (myyear + "-" + mymonth + "-" + myweekday + " " + myhour + ":" + mymin + ":" + mysec);
	} else {
		return srcTime;
	}
}
common.zipkinDateString = date => {
	// eslint-disable-next-line no-unused-vars
	const myyear = date.getFullYear();
	let mymonth = date.getMonth() + 1;
	let myweekday = date.getDate();
	let myhour = date.getHours();
	let mymin = date.getMinutes();
	let mysec = date.getSeconds();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	if (myhour < 10) {
		myhour = "0" + myhour;
	}
	if (mymin < 10) {
		mymin = "0" + mymin;
	}
	if (mysec < 10) {
		mysec = "0" + mysec;
	}
	return (mymonth + "/" + myweekday + " " + myhour + ":" + mymin + ":" + mysec);
}

common.localeCompare = (a, b) => {
	if (typeof a == 'number' || typeof b == 'number') {
		const tempA = a || 0
		const tempB = b || 0
		return tempA - tempB
	} else {
		const tempA = a || ""
		const tempB = b || ""
		return tempA.localeCompare(tempB)
	}
}
common.menuTransfer = (menusArray) => {
	menusArray = menusArray || []
	const childObj = {}
	menusArray.forEach(menu => {
		childObj[menu.parentId] = childObj[menu.parentId] || []
		childObj[menu.parentId].push(menu)
	});
	return menusArray.filter(menu => {
		menu.children = childObj[menu.id] || []
		menu.image = menu.icon
		// menu.display = menu.display
		menu.lev = menu.level
		return menu.parentId == 0
	})
}
// ci
common.ciTransfer = (ciArray) => {
	ciArray = ciArray || []
	const childObj = {}
	ciArray.forEach(ci => {
		ci.name = ci.Title
		ci.display = ci.Title
		ci.id = ci.Id
		ci.parentId = ci.ParentId
		ci.href = "/modelTable"
		ci.type = ci.Title
		childObj[ci.ParentId] = childObj[ci.ParentId] || []
		childObj[ci.ParentId].push(ci)
	});
	return ciArray.filter(menu => {
		menu.children = childObj[menu.id] || []
		menu.image = menu.icon
		// menu.display = menu.display
		menu.lev = menu.level
		return menu.parentId == 0
	})
}
/**
 * @Desc Get the number of layers of data 获取数据的层数
 * @Author zhouyiqiong
 * @Date 2019-09-16 16:30
 * @Param items：Data to be processed 需要处理的数据
 */
common.getMaxFloor = (treeData) => {
	// eslint-disable-next-line no-unused-vars
	const floor = 0
	// eslint-disable-next-line no-unused-vars
	const v = this
	let max = 0
	function each(data, floor) {
		data.forEach(e => {
			e.floor = floor
			if (floor > max) {
				max = floor
			}
			if (e.children) {
				each(e.children, floor + 1)
			}
		})
	}
	each(treeData, 1)
	return max
}
export default common
