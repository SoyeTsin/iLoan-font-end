const request = require("request");
const moment = require('moment');
const execSync = require('child_process').execSync;
const userName = execSync('git config user.name')
    .toString()
    .trim();
let url = 'http://159.138.254.112:30000/'
let arguments = process.argv.splice(2);
if(arguments[0]==='sit'){
  url = 'http://159.138.254.112:30001/'
}
const requestData = {
  "msgtype": "markdown",
  "markdown": {
    "content": `<font color="info">【iLoan-${arguments[0]}】</font>Front-end project release notice.
>Project name：<font color="info">$iLoan</font>
>Version number：<font color="warning">iLoan_${arguments[0]}_${moment().format('YYYYMMDD_hhmmss')}</font>
>Operator：<font color="comment">${userName}</font>
>URL：${url} `
  }
};

function httprequest(url, data) {
  request({
    url: url,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json"
    },
    body: data
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("send notification success!")
    }
  });
}
httprequest("https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ad932108-bdbd-42b9-8bc2-5c345d98a736", requestData);