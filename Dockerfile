FROM node:14-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./

RUN npm install

# start app
CMD ["npm", "start"]