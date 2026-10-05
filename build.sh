#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f Dockerfile -t omnia-4xproti:latest .
sudo docker tag omnia-4xproti:latest rg.fr-par.scw.cloud/djnd/omnia-4xproti:latest
sudo docker push rg.fr-par.scw.cloud/djnd/omnia-4xproti:latest
