set -e -x
cd $(dirname $0)/..
rm -rf dist
yarn
yarn build
# scp -i ktc-sit -r dist/css root@159.138.254.112:/data/apps/lego-web
scp -i ktc-sit -r dist/static root@159.138.254.112:/data/apps/lego-web
scp -i ktc-sit -r dist/index.html root@159.138.254.112:/data/apps/lego-web
node notification.js uat