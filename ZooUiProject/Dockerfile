FROM node:alpine AS build
WORKDIR /app/src
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-prod

FROM nginx:alpine
COPY --from=build /app/src/dist/ZooUiProject /usr/share/nginx/html
COPY ./web-ui.conf /etc/nginx/conf.d/web-ui.conf
