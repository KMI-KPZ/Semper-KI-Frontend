FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

# RUN chown -R node:node /app/node_modules/

EXPOSE 3000

CMD ["yarn","start"]

# docker run     -it     --rm     -v ${PWD}:/app     -v /app/node_modules     -p 3001:3000     -e CHOKIDAR_USEPOLLING=true     sample:dev