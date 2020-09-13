# https://hub.docker.com/_/node
FROM node:alpine

# make dir (-p ignores errors) and set dir as working directory for any 
# RUN, CMD, ENTRYPOINT, COPY and ADD
RUN mkdir -p /app/server
WORKDIR /app/server

# copies files into dir to install node_modules
# npm stands for Node Package Manager
COPY package.json /app/server
COPY yarn.lock /app/server

# install node modules dependencies 
RUN yarn install
RUN yarn global add nodemon

# copy local files into container
COPY . /app/server

EXPOSE 8080

CMD ["nodemon", "src/server.js"]






