FROM node:16.14-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build-financial-app-prod 

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/financial-app-prod /usr/share/nginx/html