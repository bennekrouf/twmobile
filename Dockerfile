FROM nodesource/node:5.1.1

ADD package.json package.json
RUN apt-get -qq update
RUN apt-get -y install postgresql-server-dev-9.4
RUN npm install
ADD . .
EXPOSE 5000
CMD ["node","server.js"]
