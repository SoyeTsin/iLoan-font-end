import Vue from 'vue'
import VueI18n from "vue-i18n";
import zh from "@/i18n/zh";
import en from "@/i18n/en";
import th from "@/i18n/th";

Vue.use(VueI18n);
let locale = localStorage.getItem('language')
if (!locale) {
	locale = 'en'
	localStorage.setItem('language', locale);
}
const i18n = new VueI18n({
	locale: locale,
	messages: {
		zh,
		en,
		th
	},
	silentTranslationWarn: true
});
export default i18n;
