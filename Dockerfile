FROM node:20-alpine

WORKDIR /home/node/app
RUN npm install nx -g
COPY package.json .
RUN npm install -f --loglevel=verbose
RUN ls -als node_modules

CMD npx nx run $PROJECT_NAME:serve --verbose --skip-nx-cache
