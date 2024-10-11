FROM node:20-alpine

RUN apk add curl
RUN npm install nx -g
