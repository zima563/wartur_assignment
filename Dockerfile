FROM node:18

WORKDIR /App

COPY . /App

EXPOSE 3000

RUN npm install

CMD npm start
