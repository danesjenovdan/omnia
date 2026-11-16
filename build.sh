#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f Dockerfile -t predcasno-glasovanje-zakon-za-bogate:latest .
sudo docker tag predcasno-glasovanje-zakon-za-bogate:latest rg.fr-par.scw.cloud/djnd/predcasno-glasovanje-zakon-za-bogate:latest
sudo docker push rg.fr-par.scw.cloud/djnd/predcasno-glasovanje-zakon-za-bogate:latest
