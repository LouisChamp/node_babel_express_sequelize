import { TasksController, ApiController } from "@Controllers/."

type HttpMethodType = "get" | "post" | "put" | "patch" | "delete"

const API_BASE_URL = "/api/v1"

export interface RouteType {
  method: HttpMethodType
  route: string
  controller: typeof ApiController
  action: string
}

export const Routes: RouteType[] = [
  {
    method: "get",
    route: `${API_BASE_URL}/tasks`,
    controller: TasksController,
    action: "index",
  },
  {
    method: "delete",
    route: `${API_BASE_URL}/tasks/:id(\\d+)`,
    controller: TasksController,
    action: "destroy",
  },
  {
    method: "post",
    route: `${API_BASE_URL}/tasks`,
    controller: TasksController,
    action: "create",
  },
  {
    method: "put",
    route: `${API_BASE_URL}/tasks/:id(\\d+)`,
    controller: TasksController,
    action: "update",
  },
  {
    method: "put",
    route: `${API_BASE_URL}/tasks/batch_update_statuses`,
    controller: TasksController,
    action: "batchUpdateStatuses",
  },
  {
    method: "post",
    route: `${API_BASE_URL}/tasks/destroy_completed`,
    controller: TasksController,
    action: "destroyCompleted",
  },
]
