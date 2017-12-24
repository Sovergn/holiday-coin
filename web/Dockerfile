FROM nginx:1.13.7-alpine

USER root

WORKDIR /var/www/html/

ADD ./static/ /usr/share/nginx/html/
ADD ./static/ /var/www/html/
ADD ./build/ /var/www/html/

RUN rm /etc/nginx/conf.d/default.conf
ADD ./conf/redirect.conf /etc/nginx/conf.d/
ADD ./conf/site.conf /etc/nginx/conf.d/
