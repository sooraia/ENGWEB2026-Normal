FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
# COPY index_files/ /usr/share/nginx/html/index_files/

EXPOSE 19021

CMD ["nginx", "-g", "daemon off;"]