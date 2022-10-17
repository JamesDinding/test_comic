# generate summary-ui
FROM node:16-alpine AS summary-ui-builder
#RUN apk --no-cache add ca-certificates openssl

WORKDIR /app
COPY . .
RUN npm install && npm run build



FROM caddy:alpine
COPY Caddyfile /etc/caddy/Caddyfile
#COPY build/* ./build

COPY --from=summary-ui-builder /app/build ./build

EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]