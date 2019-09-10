FROM nginx:1.15.0-alpine AS base
WORKDIR /app
EXPOSE 80

FROM node:11.4-stretch AS build
WORKDIR /repo

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run compile-sass
RUN npm run minify-sass
RUN npm run build

FROM build AS publish
RUN cp -a build/. /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
