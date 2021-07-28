import { Request, Response } from "express"
import { ApiController } from "@Controllers/."
import { HTTP_STATUS_CODES } from "@Controllers/apiController"

const { Task, User } = require("@Models")

export class TasksController extends ApiController {
  protected user: any
  protected task: any

  protected async beforeAction(req: Request, res: Response) {
    // Remember to ALWAYS call the overridden method beforehand.
    await super.beforeAction(req, res)

    // If rails: `before_action :find_logger_user, only: [:destroy]`
    await this.findLoggedUser(req, res)

    // If rails: `before_action :find_task, only: [:destroy]`
    if (this.only("destroy", "update")) await this.findTask(req, res)
  }

  //////////////////////
  // Public functions //
  //////////////////////

  public async index(req: Request, res: Response) {
    return this.user.getTasks()
  }

  public async destroy(req: Request, res: Response) {
    if (!this.task) return

    await this.task.destroy()

    res.status(HTTP_STATUS_CODES.NoContent).end()
  }

  public async create(req: Request, res: Response) {
    const createParams = this.createParams(req.body)

    res.status(HTTP_STATUS_CODES.Created)

    return this.catchValidationErrors(req, res, () => {
      // return this.user.createTask(createParams)
      return Task.create({ ...createParams, userId: this.user.id })
    })
  }

  public async update(req: Request, res: Response) {
    if (!this.task) return

    const updateParams = this.updateParams(req.body)

    return this.catchValidationErrors(req, res, () => {
      return this.task.update(updateParams)
    })
  }

  public async batchUpdateStatuses(req: Request, res: Response) {
    const { ids, completed }: { ids: number[]; completed: boolean } = req.body
    // const ids: number[] = req.body.ids
    // const completed: boolean = req.body.completed

    await Task.batchUpdateStatuses(this.user, ids, completed)

    return this.user.getTasks({ where: { id: ids } })
  }

  public async destroyCompleted(req: Request, res: Response) {
    const ids: number[] = req.body.ids

    await Task.scope("completed", {
      method: ["belongingTo", this.user],
    }).destroy({
      where: {
        id: ids,
      },
    })

    res.status(HTTP_STATUS_CODES.NoContent).end()
  }

  ///////////////////////
  // Private functions //
  ///////////////////////

  private createParams(params: Record<string, unknown>) {
    return this.permittedParams(params, ["title"])
  }

  private updateParams(params: Record<string, unknown>) {
    return this.permittedParams(params, ["title", "completed"])
  }

  private async findLoggedUser(req: Request, res: Response) {
    this.user = await User.findOne() // Let's assume the 1st user is the one logged in.
  }

  private async findTask(req: Request, res: Response) {
    const id = req.params.id
    this.task = (await this.user.getTasks({ where: { id } }))[0]

    if (!this.task) res.status(HTTP_STATUS_CODES.NotFound).end()
  }
}
