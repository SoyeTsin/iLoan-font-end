const inputValidate = (domList = [], rules = {}) => {
  const onInput = e => {
    rules.ignoreSymbol = rules.ignoreSymbol || [];
    let value = e.target.value + "";
    if (rules.noSpace) {
      value = value.replace(/\s/g, '');
    }
    if (!/^[ ]+$/g.test(e.data)) {
      if (rules.noNumber) {
        value = value.replace(/^[0-9]![ ]*$/g, "");
      }
      if (rules.noNeg) {
        value = value.replace(/[-]+/g, "");
    }
      if (rules.noSymbol) {
        rules.ignoreSymbol = rules.ignoreSymbol || [];
        if (rules.ignoreSymbol.length === 0) {
          value = value.replace(/[\W]![ ]/g, "");
          value = value.replace(/_![ ]/g, "");
        } else {
          if (rules.ignoreSymbol.indexOf(e.key) === -1) {
            value = value.replace(/[\W]![ ]/g, "");
            value = value.replace(/_![ ]/g, "");
          }
        }
      }
      if (rules.noLetter) {
        value = value.replace(/([\u4E00-\u9FA5]|[A-Za-z]![ ])+/g, "");
      }
    }

    e.target.value = value;
  };
  const onkeypress = e => {
    console.log("rules", e.key, rules);
    if (rules.noNumber) {
      if (new RegExp("^[0-9]*$").test(e.key)) {
        e.returnValue = false;
      }
    }

    if (rules.noSymbol && e.code !== "Space") {
      rules.ignoreSymbol = rules.ignoreSymbol || [];
      if (rules.ignoreSymbol.length === 0) {
        e.returnValue =
          e.key === "-" || !(/[\W]/g.test(e.key) || e.key === "_");
      } else {
        if (rules.ignoreSymbol.indexOf(e.key) === -1) {
          e.returnValue = !(/[\W]/g.test(e.key) || e.key === "_");
        }
      }
    }
    if (rules.noLetter) {
      if (/([\u4E00-\u9FA5]|[A-Za-z])+/g.test(e.key)) {
        e.returnValue = false;
      }
    }
  };
  domList.forEach(dom => {
    dom.oninput = onInput;
    dom.onkeypress = onkeypress;
  });
};

export default inputValidate;
