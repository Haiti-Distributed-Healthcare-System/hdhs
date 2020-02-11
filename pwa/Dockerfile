FROM node:12.10.0

WORKDIR /app
# cd app folder within container.

COPY package*.json ./

RUN npm install

COPY . .
# copy {everything in PWA} {WORKDIR (/app)}
# this is okay because node_modules is ignored

EXPOSE 3000

CMD ["npm", "start"]