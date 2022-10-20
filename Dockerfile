# UI
FROM node:16-alpine AS ui-builder
WORKDIR /app

COPY . .
RUN npm install && npm run build
RUN tar cf build.tar build

# GO 
FROM golang:alpine AS builder
WORKDIR /app

RUN apk --no-cache add ca-certificates git
ADD . /app

COPY --from=ui-builder /app/build.tar /app/dw
RUN tar xf /app/dw/build.tar -C /app/dw && mv /app/dw/build/* /app/dw && rmdir /app/dw/build && rm /app/dw/build.tar
RUN GOARCH=arm64 GOOS=linux CGO_ENABLED=0 go build -o dwui github.com/teampui/sjmh-dw

# FINAL
FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /app/dwui /dw

EXPOSE 3001

CMD ["/dw"]