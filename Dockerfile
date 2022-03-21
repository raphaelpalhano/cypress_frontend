FROM node:16.14

RUN mkdir /usr/src/e2e

WORKDIR /usr/src/e2e

#Executar apenas para OS Ubuntu/Debian
# RUN apt-get update && apt-get install --yes libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "cy:tags", "TAGS=${tags}" ]
