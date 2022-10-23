package main

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"

	"github.com/teampui/sjmh-dw/dw"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	app.Use(filesystem.New(filesystem.Config{
		Root:         http.FS(dw.Files),
		Index:        "index.html",
		NotFoundFile: "index.html",
	}))

	app.Listen(":3001")
}
