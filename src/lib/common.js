import JsEncrypt from 'jsencrypt';
import encrypt from 'encryptjs';

const Base64 = require('js-base64').Base64;
const secretKey1 = 'e7a0ea4d3430491139'
const common = {
	rsaKey: '',
	encodePassword(value, publicKey) {
		const jsEncrypt = new JsEncrypt();
		const base64key = Base64.decode(publicKey)
		jsEncrypt.setPublicKey(base64key);
		return jsEncrypt.encrypt(value)
	},
	handleCookies: {
		secretKey2: '70e4244a6492de',
		getItem: function(sKey) {
			const sValue = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || ''
			// 解密
			// console.log(sValue)
			return decodeURIComponent(encrypt.decrypt(sValue, secretKey1 + this.secretKey2, 256));
		},
		setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			let sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
						break;
					case String:
						sExpires = "; expires=" + vEnd;
						break;
					case Date:
						sExpires = "; expires=" + vEnd.toUTCString();
						break;
				}
			}
			// 加密
			sValue = encrypt.encrypt(encodeURIComponent(sValue), secretKey1 + this.secretKey2, 256);
			// console.log('sValue', sValue)
			// 赋值
			document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},
		removeItem: function(sKey, sPath, sDomain) {
			if (!sKey || !this.hasItem(sKey)) { return false; }
			document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
			return true;
		},
		hasItem: function(sKey) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		keys: /* optional method: you can safely remove it! */ function() {
			const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
			return aKeys;
		}
	}
}
export default common
