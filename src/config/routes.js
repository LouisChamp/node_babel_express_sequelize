"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var _1 = require("@Controllers/.");
var API_BASE_URL = "/api/v1";
exports.Routes = [
    {
        method: "get",
        route: API_BASE_URL + "/tasks",
        controller: _1.TasksController,
        action: "index",
    },
    {
        method: "delete",
        route: API_BASE_URL + "/tasks/:id(\\d+)",
        controller: _1.TasksController,
        action: "destroy",
    },
    {
        method: "post",
        route: API_BASE_URL + "/tasks",
        controller: _1.TasksController,
        action: "create",
    },
    {
        method: "put",
        route: API_BASE_URL + "/tasks/:id(\\d+)",
        controller: _1.TasksController,
        action: "update",
    },
    {
        method: "put",
        route: API_BASE_URL + "/tasks/batch_update_statuses",
        controller: _1.TasksController,
        action: "batchUpdateStatuses",
    },
    {
        method: "post",
        route: API_BASE_URL + "/tasks/destroy_completed",
        controller: _1.TasksController,
        action: "destroyCompleted",
    },
];
