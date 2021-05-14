export { default as validator } from './validator';
export function isNull(v) {
	return Object.keys(v).some((item) => v[item]);
}
export function changeIdType(v, tFlag, moreFlag) {
	if (!moreFlag) {
		this.configh = {};
		const Flag = !!tFlag;
		switch (v) {
			case '101':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard1') });
				break;
			case '102':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard2') });
				break;
			case '103':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard3') });
				break;
			case '104':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard4') });
				break;
			case '105':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard5') });
				break;
			case '106':
				this.configh = this.validator.checkIdCard({ message: this.$t('walletSelect.IdCard6') });
				break;
			case '107':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard7') });
				break;
			case '108':
				this.configh = this.validator.checkIdCard({ message: this.$t('walletSelect.IdCard8') });
				break;
			case '109':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard9') });
				break;
			case '110':
				this.configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard10') });
				break;
			case '111':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '112':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '113':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '114':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '115':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '116':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '117':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '118':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '999':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '233':
				this.configh = this.validator.checkIdCard({ required: Flag });
				break;
			default:
				this.configh = this.validator.checkIdCard({ required: Flag });
				this.checkType = false;
				break;
		}
	} else {
		let configh = {};
		const Flag = !!tFlag;
		switch (v) {
			case '101':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard1') });
				break;
			case '102':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard2') });
				break;
			case '103':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard3') });
				break;
			case '104':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard4') });
				break;
			case '105':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard5') });
				break;
			case '106':
				configh = this.validator.checkIdCard({ message: this.$t('walletSelect.IdCard6') });
				break;
			case '107':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard7') });
				break;
			case '108':
				configh = this.validator.checkIdCard({ message: this.$t('walletSelect.IdCard8') });
				break;
			case '109':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard9') });
				break;
			case '110':
				configh = this.validator.checkIdCard({ required: Flag, message: this.$t('walletSelect.IdCard10') });
				break;
			case '111':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '112':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '113':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '114':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '115':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '116':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '117':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '118':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '999':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			case '233':
				configh = this.validator.checkIdCard({ required: Flag });
				break;
			default:
				configh = this.validator.checkIdCard({ required: Flag });
				this.checkType = false;
				break;
		}
		return configh;
	}
}
export function changValue(event) {
	if (event.currentTarget.value.length > 0) {
		this.checkType = true;
	} else {
		this.checkType = false;
	}
}

