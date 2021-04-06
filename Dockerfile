FROM node:14.16.0-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

EXPOSE 6001

RUN npm run build

CMD ["node", "server/index.js"]