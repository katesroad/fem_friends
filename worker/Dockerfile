FROM node:15.10.0-alpine3.10 as development
WORKDIR /usr/src/worker
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build
COPY *.yml ./dist/

FROM node:15.10.0-alpine3.10 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/worker
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/worker/dist ./dist
CMD ["node", "dist/main"]