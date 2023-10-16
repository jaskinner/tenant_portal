FROM node:lts

WORKDIR /app/server

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]