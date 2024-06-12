FROM  node:13.8.0-alpine
LABEL maintainer="xgene"

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
#COPY node_modules ./

#RUN REACT_APP_API_URL='https://www.itgo.vip/' yarn build

COPY . .

EXPOSE 5000
CMD ["yarn", "server"]

# yarn auto-submit