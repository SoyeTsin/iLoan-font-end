/* 表单验证组件 */
const validators = {};
import i18n from '../i18n';
const messages = {
	paramOne: i18n.t('Utils.pleaseInput'),
	paramTwo: i18n.t('Utils.Aninteger'),
	and: i18n.t('Utils.to'),
	max: i18n.t('Utils.NotHigherThan'),
	min: i18n.t('Utils.noLessThan'),
	required: i18n.t('Utils.required'),
	phone: i18n.t('Utils.Pleasenumber'),
	ID: i18n.t('Utils.PleaseID'),
	email: i18n.t('Utils.PleaseEmail'),
	number: i18n.t('Utils.PleaseNumber1'),
	numberInteger: i18n.t('Utils.PleaseNumberInteger'),
	integer: i18n.t('Utils.PleaseInteger'),
	pInteger: i18n.t('Utils.PleasePInteger'),
	float: i18n.t('MenuSetting.PleaseFloat'),
	str: i18n.t('Utils.PleaseStr'),
	letter: i18n.t('Utils.PleaseLetter'),
	lengthMessage: i18n.t('Utils.PleaseLengthMessage'),
	bit: i18n.t('Utils.PleaseBit'),
	intLengthMessage: i18n.t('Utils.PleaseIntLengthMessage'),
	pointLengthMessage: i18n.t('Utils.PleasePointLengthMessage'),
	deadLine: i18n.t('Utils.PleaseDeadLine'),
	chinese: i18n.t('Utils.PleaseChinese'),
	notSpace: i18n.t('MenuSetting.PleaseNotSpace'),
	allLengthMessage: '输入的字符长度最多为',
	pointMessage: '小数点后只能保留',
	onlyRight: i18n.t('Utils.PleaseOnlyRight')
};

// 必填项
validators.checkRequired = (params = {}) => {
	return {
		rules: [
			{ required: true, message: params.message || messages.required }
		]
	};
};
// 动态改变是否必填
validators.checked = (params = {}) => {
	return {
		rules: [
			{ required: params.required || false, message: params.message || messages.required }
		]
	};
};

// // 验证手机号
// validators.checkPhone = (params = {}) => {
//     const isRequire = params.required ? !!params.required : false;
//     const rules = [];
//     isRequire && rules.push({ required: true, message: params.message || messages.required });
//     rules.push({
//         validator (rule, value, callback) {
//             if (!value) callback();
//             const Rex = /^1[3456789]\d{9}$/;
//             if (!Rex.test(value)) {
//                 callback(messages.phone);
//             }
//             callback();
//         }
//     });
//     return { rules };
// };

// 验证身份证号
// validators.checkIdCard = (params = {}) => {
//     const isRequire = params.required ? !!params.required : false;
//     const rules = [];
//     isRequire && rules.push({ required: true, message: params.message || messages.required });
//     rules.push({
//         validator (rule, value, callback) {
//             if (!value) callback();
//             // 18位身份证验证
//             const Rex = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//             if (!Rex.test(value)) {
//                 callback(messages.ID);
//             }
//             callback();
//         }
//     });
//     return { rules };
// };

validators.checkPhone = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		validator(rule, value, callback) {
			if (!value) callback();
			let len = 0;
			if (value) {
				for (const char of value) {
					// eslint-disable-next-line
                    len += char.match(/[^\x00-\xff]/ig) != null ? 2 : 1;
				}
				if (len > 80) {
					callback('输入不合法');
				} else if (!(/^[0-9]*$/.test(value))) {
					callback(messages.notSpace);
				}
			}
			callback();
		}
	});
	return { rules };
};

validators.checkIdCard = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		validator(rule, value, callback) {
			if (!value) callback();
			let len = 0;
			if (value) {
				for (const char of value) {
					// eslint-disable-next-line
                    len += char.match(/[^\x00-\xff]/ig) != null ? 2 : 1;
				}
				if (len > 20) {
					callback('输入不合法');
				} else if (!(/^(?=.*\d)[a-zA-Z0-9]*$/g).test(value)) {
					callback(messages.notSpace);
				}
			}
			callback();
		}
	});
	return { rules };
};

// 邮箱
validators.checkEmail = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		type: 'email',
		message: params.message ? params.message : messages.email
	});
	return { rules };
};

// 验证两者比较
validators.checkCompare = (params = {}, param1, param2) => {
	const isRequire = params.required ? !!params.required : true;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		validator(rule, value, callback) {
			if (!value) callback();
			if (param1 && param2 && param1 > param2) {
				console.log(param1, param2);
				callback(params.compareMessage);
			}
			callback();
		}
	});
	return { rules };
};

// 验证截止天数大于开始天数
validators.checkDate = (params = {}, arg) => {
	const isRequire = params.required ? !!params.required : true;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		validator(rule, value, callback) {
			if (!value) callback();
			if (value < arg || !arg) {
				callback(messages.deadLine);
			}
			callback();
		}
	});
	return { rules };
};
// 验证输入框只能输入中文
validators.checkChinese = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		validator(rule, value, callback) {
			if (!value) callback();
			const Rex = /[^\u4E00-\u9fa5]/g;
			if (Rex.test(value)) {
				callback(messages.chinese);
			}
			callback();
		}
	});
	return { rules };
};

// 验证输入框字符长度中文2 数字字母1
validators.checkAllLength = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		validator(rule, value, callback) {
			if (!value) callback();
			let len = 0;
			if (value) {
				for (const char of value.toString()) {
					// eslint-disable-next-line
                    len += char.match(/[^\x00-\xff]/ig) != null ? 2 : 1;
				}
				const regEn = /[`!@#$%^&*()_+<>?:"{},./;'[\]]/im;
				const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				if (params.onlyRight && (regEn.test(value) || regCn.test(value))) {
					callback(messages.onlyRight);
				} else if (len > params.intLength) {
					callback(params.intLengthMessage);
				} else if (value.toString().trim().length != value.toString().length) { // 不能有空格
					callback(messages.notSpace);
				} else if (params.intFlag && !(/^[0-9]*$/.test(value))) { // 只能为数字
					callback(messages.notSpace);
				} else if (params.notChina && (/[\u4E00-\u9fa5]/g).test(value)) { // 不能为中文
					callback(messages.notSpace);
				} else if (params.remindNumber && !(/^(?=.*\d)[a-zA-Z0-9]*$/g).test(value)) { // 必须包含一个数字 其他为数字或英文
					callback(messages.notSpace);
				} if (params.stringOrNumber && !(/^[a-zA-Z0-9]*$/g).test(value)) { // 只能为数字英文
					callback(messages.notSpace);
				} else if (params.notOnlyNum && (/^\d+$/g).test(value)) { // 不能仅为数字
					callback(messages.notSpace);
				}
			}
			callback();
		}
	});
	return { rules };
};

/** 验证数值 默认验证正整数{type}
 *  1、Integer：整数（正数、负数、0）
 *  2、Float：浮点数
 */
validators.checkNumber = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	const type = params.type ? params.type : '';
	let Rex = /^[0-9]*$/;
	let message = params.pIntegerMessage || messages.numberInteger;
	switch (type) {
		// case '':
		//     break;
		case 'Integer':
			Rex = /^-?([0-9]*)$/;
			message = params.integerMessage || messages.integer;
			break;
		case 'Float':
			Rex = /^(\d+)(\.\d+)$/;
			message = params.floatMessage || messages.float;
			break;
		case 'FloatAll':
			Rex = /^(\d+)(\.\d+)?$/;
			message = params.floatMessage || messages.float;
			break;
	}
	rules.push({
		validator(rule, value, callback) {
			if (!value) {
				if (params.notZero && parseFloat(value) == 0) {
					callback('输入的值不能为零');
				} else {
					callback();
				}
			} else if (!Rex.test(value)) {
				callback(message);
			} else if (params.notZero && parseFloat(value) == 0) {
				callback('输入的值不能为零');
			} else if (params.numberFlag && (parseFloat(value) > parseFloat(params.numberValue))) {
				callback('输入的值不能大于' + params.numberValue);
			} else if (type == 'Float' || type == 'FloatAll') {
				const intValue = value.toString().split('.')[0];
				const pointValue = value.toString().split('.')[1];
				if (intValue) {
					console.log(params.compare, value, value > params.compare);
					if (params.intLength && (intValue.length != params.intLength)) {
						message = params.intLengthMessage ? params.intLengthMessage : messages.intLengthMessage + params.intLength + messages.bit;
						callback(message);
					} else if (params.intMax || params.intMin) {
						if (params.intMax && params.intMin) {
							if (!(params.intMin <= intValue.length && intValue.length <= params.intMax)) {
								message = params.intMaxAndintMinMessage ? params.intMaxAndintMinMessage : 'intMaxAndintMinMessage';
								callback(message);
							}
						} else if (intValue.length > params.intMax) {
							message = params.intMaxMessage ? params.intMaxMessage : 'intMaxMessage';
							callback(message);
						} else if (intValue.length < params.intMin) {
							message = params.intMinMessage ? params.intMinMessage : 'intMinMessage';
							callback(message);
						} else if (params.compare && value > params.compare) {
							message = params.compareMessage ? params.compareMessage : 'compareMessage';
							callback(message);
						}
					} else if (params.compare && value > params.compare) {
						message = params.compareMessage ? params.compareMessage : 'compareMessage';
						callback(message);
					}
				}
				if (intValue && pointValue) {
					if (params.pointLength && (pointValue.length != params.pointLength)) {
						message = params.pointLengthMessage ? params.pointLengthMessage : messages.pointLengthMessage + params.pointLength + messages.bit;
						callback(message);
					} else if (params.pointMax || params.pointMin) {
						if (params.pointMax && params.pointMin) {
							if (!(params.pointMin <= pointValue.length && pointValue.length <= params.pointMax)) {
								message = params.pointMaxAndpointMinMessage ? params.pointMaxAndpointMinMessage : 'pointMaxAndpointMinMessage';
								callback(message);
							}
						} else if (pointValue.length > params.pointMax) {
							message = params.pointMaxMessage ? params.pointMaxMessage : 'pointMaxMessage';
							callback(message);
						} else if (pointValue.length < params.pointMin) {
							message = params.pointMinMessage ? params.pointMinMessage : 'pointMinMessage';
							callback(message);
						} else if (params.compare && value > params.compare) {
							message = params.compareMessage ? params.compareMessage : 'compareMessage';
							callback(message);
						}
					} else if (params.compare && value > params.compare) {
						message = params.compareMessage ? params.compareMessage : 'compareMessage';
						callback(message);
					}
				}
			} else {
				console.log(value, params.max);
				if (params.length) {
					if (value.toString().length != params.length) {
						message = params.lengthMessage ? params.lengthMessage : (messages.paramOne + params.length + messages.paramTwo);
						callback(message);
					}
				} else if (params.max || params.min) {
					if (params.max && params.min) {
						if (!(params.min <= value.toString().length && value.toString().length <= params.max)) {
							message = params.maxAndMinMessage ? params.maxAndMinMessage : (messages.paramOne + params.min + messages.and + params.max + messages.paramTwo);
							callback(message);
						}
					} else if (value.toString().length > params.max) {
						message = params.maxMessage ? params.maxMessage : (messages.max + params.max + messages.paramTwo);
						callback(message);
					} else if (value.toString().length < params.min) {
						message = params.minMessage ? params.minMessage : (messages.min + params.min + messages.paramTwo);
						callback(message);
					}
				}
			}
			callback();
		}
	});

	return { rules };
};
validators.validateFloatLength = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	let message = '';
	rules.push({
		validator(rule, value, callback) {
			if (!value) {
				callback();
			} else if (value.toString().split('.').length > 2) {
				message = params.pointLength ? params.pointLength : messages.notSpace;
				callback(message);
			} else if (params.allLength && value.toString().split('.').join('').length > params.allLength) {
				message = params.allLengthMessage ? params.allLengthMessage : messages.allLengthMessage + params.allLength;
				callback(message);
			} else if (params.point && ((value.toString().split('.')[1] ? value.toString().split('.')[1].length : 0) > params.point)) {
				message = params.pointMessage ? params.allLengthMessage : messages.pointMessage + params.point + messages.bit;
				callback(message);
			}
			callback();
		}
	});
	return { rules };
};
// 验证输入长度
validators.checkLength = (params = {}) => {
	const isRequire = params.required ? !!params.required : false;
	const rules = [];
	isRequire && rules.push({ required: true, message: params.message || messages.required });
	rules.push({
		validator(rule, value, callback) {
			if (!value) callback();
			else if (value.length > parseInt(params.length)) {
				callback(params.lengthMessage || messages.lengthMessage + params.length + messages.bit);
			}
			callback();
		}
	});
	return { rules };
};
export default validators;
