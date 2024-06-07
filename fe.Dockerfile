FROM nginx
LABEL authors="xgene"
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY build .
#COPY public .
WORKDIR /etc/init.d/
#ENTRYPOINT ["nginx"]