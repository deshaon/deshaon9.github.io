FROM iron/gcc:dev

RUN apk add --no-cache bash

WORKDIR /opt/test

# ADD . /opt/test

ENTRYPOINT ["bash", "compile.sh"]  




