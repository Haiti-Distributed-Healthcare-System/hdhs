FROM cypress/base:12.16.0

WORKDIR /data

COPY package*.json ./

RUN npm install

ENV PATH /data/node_modules/.bin:$PATH

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
