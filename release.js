const client = require('scp2');
const compressing = require('compressing');
const SSH = require('simple-ssh');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const program = require("commander");
const execSync = require('child_process').execSync; // 同步子进程
// scp -P 36000 -i allen_rsa -r email.js root@159.138.236.6:/data/dist/email/

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

// 定义参数,以及参数内容的描述
program
    .version('0.0.1')
    .usage('[options] [value ...]')
    .option('-mode, --mode <string>', 'mode type')

// 添加额外的文档描述
program.on('help', function() {
    console.log('   Examples:')
    console.log('       $ ./nodecmd.js -mode sit/uat')
    console.log('')
});

// 解析commandline arguments
program.parse(process.argv)

client.on('transfer', (buffer, uploaded, total) => {
    console.log(`${moment().format('YYYY-MM-DD hh:mm:ss')} ${uploaded}M/${total}M`);
});

let host = '47.115.138.43'
if (program.mode === 'genesis') {
    host = '159.138.231.100'
}
client.defaults({
    port: 22,
    host,
    username: 'root',
    privateKey
});

const ssh = new SSH({
    port: 22,
    host,
    user: 'root',
    key: privateKey
});
console.log('mode:' + program.mode)

const $releaseName = `iLoan_${program.mode}_${moment().format('YYYYMMDD_hhmmss')}`;
console.log(`开始执行发布脚本,版本号：${$releaseName}`);
const $uername = execSync('git config user.name')
    .toString()
    .trim(); // 姓名
console.log($uername)
let osPath = ''
let osDockerName = ''
let $linkUrl = ''
switch (program.mode) {
    case 'sit':
        $linkUrl = 'iLoanSit'
        osPath = 'htmlroothw'
        osDockerName = 'hwnginx'
        break
    case 'uat':
        $linkUrl = 'iLoanUat'
        osPath = 'htmlroothwuat'
        osDockerName = 'hwuatnginx'
        break
    case 'genesis':
        $linkUrl = '`iLoanGenesis`'
        osPath = 'htmlroothw'
        osDockerName = 'hwnginx'
        break
}
console.log('---debugger start---')
console.log(program.mode);
console.log(osPath)
console.log(osDockerName)
console.log($linkUrl)
console.log('---debugger end---')

// git pull && yarn && vue-cli-service build --mode sit &&
// git pull && yarn && vue-cli-service build --mode uat &&
compressing.zip.compressDir(`./${program.mode}dist`, `${program.mode}dist.zip`)
    .then((res) => {
        console.log('开始上传');
        client.upload(`./${program.mode}dist.zip`, `/data/dist/${osPath}/`, (res) => {
            console.log('上传完毕');
            fs.unlinkSync(`./${program.mode}dist.zip`);
            deleteFolderRecursive(`./${program.mode}dist`);
            let $emailList = 'xieguozhi@formssi.com,qinsongyi@formssi.com,dch_vocco@formssi.com,denglifang@formssi.com,458563789@qq.com,tiago.b@forms-syntron.co.th';
            if (program.mode === 'sit') {
                $emailList = ''
            }
            console.log(`$linkUrl:>>>> "${$linkUrl}"`)
            var cmd = `cd /data/dist/${osPath}/;rm -rf ./dist/;unzip -o ${program.mode}dist.zip;mv ${program.mode}dist -f dist;docker restart ${osDockerName};echo -e "发布完成：\\\\033[31m ${$releaseName} \\\\033[0m";`;
            cmd += `/usr/bin/nodejs /data/dist/email/email.js -p "iLoan-${program.mode}" -vn "${$releaseName}" -un "${$uername}" -ue "${$emailList}" -lk "${$linkUrl}" -jqr "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=aa94e0f9-e167-41c8-af61-d27781bd7e21";exit;`
            ssh.exec(cmd, {
                out(stdout) {
                    console.log(stdout);
                }
            }).start();
            ssh.on('end', () => {
                console.log('邮件已发送');
                process.exit();
            });
        });
    })
    .catch((err) => {
        console.error(err);
    });

const deleteFolderRecursive = function(url) {
    let files = [];
    // 判断给定的路径是否存在
    if (fs.existsSync(url)) {
        // 返回文件和子目录的数组
        files = fs.readdirSync(url);

        files.forEach(function(file, index) {
            // var curPath = url + "/" + file;
            const curPath = path.join(url, file);
            // fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);

                // 是文件delete file
            } else {
                fs.unlinkSync(curPath);
            }
        });
        // 清除文件夹
        fs.rmdirSync(url);
    } else {
        console.log('给定的路径不存在，请给出正确的路径');
    }
};
