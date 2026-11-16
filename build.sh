#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f Dockerfile -t omnia-zakon-za-bogate:latest .
sudo docker tag omnia-zakon-za-bogate:latest rg.fr-par.scw.cloud/djnd/omnia-zakon-za-bogate:latest
sudo docker push rg.fr-par.scw.cloud/djnd/omnia-zakon-za-bogate:latest
