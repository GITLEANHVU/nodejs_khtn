FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN yarn
EXPOSE 3030
CMD ["yarn", "dev"]
