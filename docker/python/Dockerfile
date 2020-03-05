FROM iron/python

RUN apk add --no-cache bash

WORKDIR /codeshare-sandbox

COPY run.sh .

ENTRYPOINT ["bash", "run.sh"]