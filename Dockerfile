FROM node:16.16.0
WORKDIR /infra-template-master

COPY . .
RUN npm ci
RUN npm run build

CMD npm start