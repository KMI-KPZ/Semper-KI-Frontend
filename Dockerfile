FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

# RUN chown -R node:node /app/node_modules/

EXPOSE 3000

# CMD [ "yarn", "json-server", "-p", "3030", "-w", "generateData.js" ]

CMD ["yarn","start"]