# https://hub.docker.com/_/node
FROM node:alpine

# make dir (-p ignores errors) and set dir as working directory for any 
# RUN, CMD, ENTRYPOINT, COPY and ADD
RUN mkdir -p /app/client
WORKDIR /app/client

# copies files into dir to install node_modules
# npm stands for Node Package Manager
COPY package.json /app/client
COPY yarn.lock /app/client
COPY craco.config.js /app/client

# install node modules dependencies 
RUN yarn install

# copy local files into container
COPY . /app/client

EXPOSE 3000

CMD ["yarn", "start"]






