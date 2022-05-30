FROM node:16-alpine AS web-builder
ADD . /app
WORKDIR /app
RUN npm install && npm run build

FROM golang:1.18-alpine AS golang-builder

ADD . /app
WORKDIR /app

COPY --from=web-builder /app/build /app/build
RUN mv /app/index.go.tpl /app/build/index.go

RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o dw -v -a -ldflags '-extldflags "-static"' github.com/teampui/nsmh-web-preact

FROM scratch AS final
COPY --from=golang-builder /app/dw .
CMD ["/dw"]
