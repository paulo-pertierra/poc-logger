FROM node:18-alpine

COPY . .

RUN npm install

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]