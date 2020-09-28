FROM node:14
WORKDIR /usr/src/dwcag/

COPY package*.json ./
RUN npm ci --only=production
COPY . .

CMD [ "node", "./packages/internals/index.js" ]