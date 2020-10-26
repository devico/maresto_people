# build environment
FROM node:12.2.0-alpine as build
WORKDIR /server
ENV PATH /server/node_modules/.bin:$PATH
COPY package.json /server/package.json
RUN npm install --silent
RUN npm install @vue/cli@3.7.0 -g
COPY . /server
RUN nodemon
