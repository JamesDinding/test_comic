package main

import (
	"encoding/base64"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"

	"github.com/teampui/nsmh-web-preact/build"
)

func main() {
	// 建立一個 HTTP 主機
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
	})

	// 開啟 CORS 以便我們可以用 Fetch 來測試是否能連到這裡
	app.Use(cors.New())

	// 壓縮頁面
	app.Use(compress.New())

	//
	app.Get("/ping", func(c *fiber.Ctx) error {
		log.Print("[alb/healthcheck] OK")
		c.Set("Cache-Control", "no-cache")
		return c.SendStatus(200)
	})

	// 聲納請求
	app.Get("/_sonar", func(c *fiber.Ctx) error {
		c.Set("Cache-Control", "no-cache")

		if c.Get("X-NSMH-REQ") != "1" {
			return c.SendStatus(400)
		}

		return c.JSON(fiber.Map{
			"status": 200,
			"msg":    "ok",
			"date":   base64.StdEncoding.EncodeToString([]byte(time.Now().Format("2006-01-02"))),
		})
	})

	// 輸出檔案
	app.Use(filesystem.New(filesystem.Config{
		Root:         http.FS(build.FS),
		MaxAge:       86400,
		NotFoundFile: "index.html",
	}))

	// listen
	PORT := os.Getenv("PORT")

	if PORT == "" {
		log.Fatalf("env PORT not given")
		return
	}

	err := app.Listen(PORT)

	if err != nil {
		log.Fatalf("cannot listen due to %v", err)
		return
	}
}
