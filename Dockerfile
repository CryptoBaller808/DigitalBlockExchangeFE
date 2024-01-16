##
# Docker Build: docker build . -t dbe-frontend
# Docker Run: docker run -p 3000:8080 dbe-frontend
# Docker PS: docker ps | grep dbe-frontend
# Docker Stop: docker stop IMAGE_ID
##

# Install dependencies only when needed
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json ./

RUN npm i -f

# Rebuild the source code only when needed
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# Production image, copy the server files and run
FROM node:20-alpine AS runner

WORKDIR /app

COPY server/package*.json ./
COPY server/app.js ./
COPY --from=builder /app/build ./public

RUN npm i -f

ENV NODE_ENV production

EXPOSE 8080

ENV PORT 8080

CMD ["node", "app.js"]
