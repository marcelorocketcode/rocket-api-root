FROM node:18-alpine

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]