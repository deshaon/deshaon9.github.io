FROM iron/java:1.8-dev

RUN apk add --no-cache bash

WORKDIR /codeshare-sandbox

COPY run.sh .

ENTRYPOINT ["bash", "run.sh"]