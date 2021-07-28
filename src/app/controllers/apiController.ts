import { Request, Response, NextFunction } from "express"

const Sequelize = require("sequelize")

export enum HTTP_STATUS_CODES {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

// Abstract class.
export class ApiController {
  protected action!: string

  static async create(req: Request, res: Response, action: string) {
    const controller = new this()
    controller.action = action

    await controller.beforeAction(req, res)

    return controller
  }

  protected async beforeAction(_req: Request, _res: Response) {}

  protected only(...actions: string[]) {
    return actions.indexOf(this.action) >= 0
  }

  protected except(...actions: string[]) {
    return actions.indexOf(this.action) === -1
  }

  protected permittedParams(
    params: Record<string, unknown>,
    allowed: string[]
  ): Record<string, unknown> {
    return Object.entries(params).reduce(
      (acc: Record<string, unknown>, [key, value]) => {
        if (allowed.includes(key)) acc[key] = value

        return acc
      },
      {}
    )
  }

  protected async catchValidationErrors(
    req: Request,
    res: Response,
    fn: Function
  ) {
    try {
      return await fn()
    } catch (error: any) {
      if (error instanceof Sequelize.ValidationError) {
        return this.prepareValidationErrorResponse(req, res, error)
      } else {
        throw error
      }
    }
  }

  /////////////////////
  // Private methods //
  /////////////////////

  private prepareValidationErrorResponse(
    _req: Request,
    res: Response,
    error: any
  ) {
    res.status(HTTP_STATUS_CODES.UnprocessableEntity)

    return {
      errors: error.errors.reduce(
        (acc: Record<string, string[]>, err: any) => ({
          ...acc,
          [err.path]: (acc[err.path] ?? []).concat(err.message),
        }),
        {}
      ),
    }
  }
}
