FROM node:18-alpine

# Create app directory
WORKDIR /app

ENV PORT=8080

# Install app dependencies
COPY ./_deploy/package.json ./

RUN npm i

# Bundle app source
COPY ./_deploy .

EXPOSE 8080

CMD [ "node", "app.js" ]
