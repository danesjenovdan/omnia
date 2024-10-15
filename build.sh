#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f Dockerfile -t predcasno-glasovanje-referendum-jek2:latest .
sudo docker tag predcasno-glasovanje-referendum-jek2:latest rg.fr-par.scw.cloud/djnd/predcasno-glasovanje-referendum-jek2:latest
sudo docker push rg.fr-par.scw.cloud/djnd/predcasno-glasovanje-referendum-jek2:latest
