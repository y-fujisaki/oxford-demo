FROM centos:centos7

RUN yum -y update
RUN yum -y install epel-release
RUN yum -y groupinstall 'Development tools'
ADD ./nodejs.repo /etc/yum.repos.d/nodejs.repo
RUN yum -y install nodejs
# RUN yum clean all

RUN npm install jasmine-node -g

RUN mkdir /app
ADD . /app/
WORKDIR /app

EXPOSE 3000

CMD ["node", "app.js"]
