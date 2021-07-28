import { Request, Response, NextFunction } from "express"
import { Routes, RouteType } from "@Config/routes"
import * as http from "http"

const cors = require("cors")
const express = require("express")

class App {
  app: any
  server: any

  constructor() {
    this.app = express()
    this.server = new http.Server(this.app)

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes() {
    // Register all application routes.
    Routes.forEach((route: RouteType) => {
      this.app[route.method](
        route.route,
        async function (req: Request, res: Response, next: NextFunction) {
          const controllerInstance = await route.controller.create(
            req,
            res,
            route.action
          )

          const result = await (controllerInstance as any)[route.action](
            req,
            res,
            next
          )

          if (result !== null && result !== undefined) res.json(result)
        }
      )
    })
  }
}

export default new App().server
