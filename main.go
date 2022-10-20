package main

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"

	"github.com/teampui/sjmh-dw/dw"
)

func main() {
	app := fiber.New()

	app.Use(filesystem.New(filesystem.Config{
		Root:         http.FS(dw.Files),
		Browse:       true,
		Index:        "1index.html",
		NotFoundFile: "index.html",
	}))

	app.Listen(":3001")
}
