FROM node:lts-alpine

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]
