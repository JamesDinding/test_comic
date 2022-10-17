# generate summary-ui
FROM node:alpine AS summary-ui-builder
RUN apk --no-cache add ca-certificates

WORKDIR /app
COPY . .
RUN npm install && npm run build



FROM caddy:alpine
COPY Caddyfile /etc/caddy/Caddyfile
#COPY build/* ./build

COPY --from=summary-ui-builder /app/build ./build

