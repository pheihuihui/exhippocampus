FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add g++ make py3-pip python3
RUN npm i -g node-gyp typescript ts-node node-sass
RUN npm i
COPY . .
RUN npm run build:client
EXPOSE 30000
CMD [ "ts-node", "./src/server/index.ts" ]