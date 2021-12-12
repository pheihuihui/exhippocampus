FROM node:16-alpine
ENV NODE_ENV=development
WORKDIR /usr/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "build.js", "tsconfig.json", "/usr/app/"]
ADD src /usr/app/src/
RUN npm install
RUN npm run build
COPY . .
EXPOSE 3000
RUN chown -R node /usr/app
USER node
CMD ["npx", "http-server", "./dist"]
