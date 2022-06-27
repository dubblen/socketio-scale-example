# syntax = docker/dockerfile:1.0-experimental

FROM node:lts

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
