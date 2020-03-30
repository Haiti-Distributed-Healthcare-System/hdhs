FROM node:12.10.0

WORKDIR /data

COPY package*.json ./

RUN npm install

ENV PATH /data/node_modules/.bin:$PATH

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
