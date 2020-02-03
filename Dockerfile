FROM ubuntu

RUN apt-get update -y

CMD ["mix deps.get"]
