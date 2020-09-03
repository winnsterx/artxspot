# telling Docker to grap cp of Node and specifying Linux dist. as Alpine
# bc of its lightweight / slim base image 
FROM node:alpine

# WORKDIR sets work dir for subsequent RUN, COPY, ADD, CMD, ENTRYPOINT that follows
# so instead of RUN cd xx && .., do WORKDIR
WORKDIR /usr/app
RUN pwd

COPY package*.json ./
COPY craco.config.js ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn start

EXPOSE 3000
CMD ["yarn", "start"]