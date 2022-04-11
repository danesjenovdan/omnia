#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f Dockerfile -t omnia-dz-2022:latest .
sudo docker tag omnia-dz-2022:latest rg.fr-par.scw.cloud/djnd/omnia-dz-2022:latest
sudo docker push rg.fr-par.scw.cloud/djnd/omnia-dz-2022:latest
