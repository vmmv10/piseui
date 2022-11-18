FROM alpine:3.17
RUN apk update && apk add bash
RUN apk add --no-cache python3 py3-pip
COPY ./requirements.txt /home/requirements.txt
RUN pip install -r /home/requirements.txt
RUN ln -sf python3 /usr/bin/python
