
FROM node:22.16.0

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["node" , "./server.js"]

