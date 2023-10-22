FROM node:lts

WORKDIR /client

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]