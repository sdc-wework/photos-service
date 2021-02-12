#!/bin/bash

# Also need to install mongo: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/

sudo yum update
sudo yum install git

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

sudo yum install npm

sudo npm install pm2 -g
sudo npm install webpack-cli -g

git clone https://github.com/space-work/photos-service.git
cd photos-service
npm i
npm run seed
npm run build
pm2 start server/index.js
