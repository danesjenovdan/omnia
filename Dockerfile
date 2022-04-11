# change base image
FROM nginx:alpine

# copy files into the nginx container
COPY . /usr/share/nginx/html/
