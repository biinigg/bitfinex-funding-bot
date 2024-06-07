FROM node:13.8.0-alpine
LABEL maintainer="xgene"

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
#COPY node_modules ./

#RUN yarn install

COPY . .

EXPOSE 5000
CMD ["yarn", "server"]

# yarn auto-submit