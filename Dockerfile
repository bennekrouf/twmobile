FROM nodesource/node:5.1.1

ADD package.json package.json
RUN sudo apt-get install libpq-dev && npm install
ADD . .
EXPOSE 5000
CMD ["node","server.js"]
