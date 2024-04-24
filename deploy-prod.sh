git pull
pkill -f node
npm install
source .env
nohup npm run start:prod &
bg
exit
