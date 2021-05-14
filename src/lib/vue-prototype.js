const $lib = {
    calcNum(price, isNumber, completion) {
        let pStr = price + "";
        let p = {};
        if (pStr.indexOf(".") !== -1) {
            const decimal = pStr.substring(pStr.indexOf("."), pStr.indexOf(".") + 6);
            const int = Number(pStr.substring(0, pStr.indexOf(".")));
            if (decimal.indexOf('.99999') !== -1) {
                pStr = int + 1 + '';
            }
        }
        if (pStr.indexOf(".") !== -1) {
            const decimal = pStr.substring(pStr.indexOf("."), pStr.indexOf(".") + 6);
            let decimalNum = Number("0" + decimal).toFixed(2) + "";
            const int = pStr.substring(0, pStr.indexOf("."));
            decimalNum = decimalNum.substr(1);
            p = {
                int: int,
                decimal: decimalNum,
                num: int + decimalNum
            };
        } else {
            p = {
                int: pStr,
                num: pStr
            };
            if (completion) {
                p.num = p.num + '.00'
            }
        }
        if (isNumber) {
            p.num = Number(p.num);
        }
        // return p;
        return Number(p.num) || '';
    }
}
export default $lib
