From node:latest
RUN sudo apt-get install gnupg \
    && wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add - \
  && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list \
  && apt-get update \
  && apt-get install -y mongodb-org --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN sudo systemctl start mongod
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN npm install -g nodemon
# COPY . ./
EXPOSE 3000
CMD ["nodemon" , "index.js"]
