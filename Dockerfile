FROM 327066177061.dkr.ecr.ap-northeast-2.amazonaws.com/node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .
ARG ENV

RUN if [ "$ENV" = "prod" ]; then npm run build:prod; fi
RUN if [ "$ENV" = "dev" ]; then npm run build:dev; fi


EXPOSE 80

CMD ["node","/usr/src/app/dist/main.js"]
