"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
var _1 = require("@Controllers/.");
var apiController_1 = require("@Controllers/apiController");
var _a = require("@Models"), Task = _a.Task, User = _a.User;
var TasksController = /** @class */ (function (_super) {
    __extends(TasksController, _super);
    function TasksController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TasksController.prototype.beforeAction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Remember to ALWAYS call the overridden method beforehand.
                    return [4 /*yield*/, _super.prototype.beforeAction.call(this, req, res)
                        // If rails: `before_action :find_logger_user, only: [:destroy]`
                    ];
                    case 1:
                        // Remember to ALWAYS call the overridden method beforehand.
                        _a.sent();
                        // If rails: `before_action :find_logger_user, only: [:destroy]`
                        return [4 /*yield*/, this.findLoggedUser(req, res)
                            // If rails: `before_action :find_task, only: [:destroy]`
                        ];
                    case 2:
                        // If rails: `before_action :find_logger_user, only: [:destroy]`
                        _a.sent();
                        if (!this.only("destroy", "update")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.findTask(req, res)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //////////////////////
    // Public functions //
    //////////////////////
    TasksController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.user.getTasks()];
            });
        });
    };
    TasksController.prototype.destroy = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.task)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.task.destroy()];
                    case 1:
                        _a.sent();
                        res.status(apiController_1.HTTP_STATUS_CODES.NoContent).end();
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var createParams;
            var _this = this;
            return __generator(this, function (_a) {
                createParams = this.createParams(req.body);
                res.status(apiController_1.HTTP_STATUS_CODES.Created);
                return [2 /*return*/, this.catchValidationErrors(req, res, function () {
                        // return this.user.createTask(createParams)
                        return Task.create(__assign(__assign({}, createParams), { userId: _this.user.id }));
                    })];
            });
        });
    };
    TasksController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updateParams;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.task)
                    return [2 /*return*/];
                updateParams = this.updateParams(req.body);
                return [2 /*return*/, this.catchValidationErrors(req, res, function () {
                        return _this.task.update(updateParams);
                    })];
            });
        });
    };
    TasksController.prototype.batchUpdateStatuses = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ids, completed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, ids = _a.ids, completed = _a.completed;
                        // const ids: number[] = req.body.ids
                        // const completed: boolean = req.body.completed
                        return [4 /*yield*/, Task.batchUpdateStatuses(this.user, ids, completed)];
                    case 1:
                        // const ids: number[] = req.body.ids
                        // const completed: boolean = req.body.completed
                        _b.sent();
                        return [2 /*return*/, this.user.getTasks({ where: { id: ids } })];
                }
            });
        });
    };
    TasksController.prototype.destroyCompleted = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ids;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = req.body.ids;
                        return [4 /*yield*/, Task.scope("completed", {
                                method: ["belongingTo", this.user],
                            }).destroy({
                                where: {
                                    id: ids,
                                },
                            })];
                    case 1:
                        _a.sent();
                        res.status(apiController_1.HTTP_STATUS_CODES.NoContent).end();
                        return [2 /*return*/];
                }
            });
        });
    };
    ///////////////////////
    // Private functions //
    ///////////////////////
    TasksController.prototype.createParams = function (params) {
        return this.permittedParams(params, ["title"]);
    };
    TasksController.prototype.updateParams = function (params) {
        return this.permittedParams(params, ["title", "completed"]);
    };
    TasksController.prototype.findLoggedUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, User.findOne()]; // Let's assume the 1st user is the one logged in.
                    case 1:
                        _a.user = _b.sent(); // Let's assume the 1st user is the one logged in.
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksController.prototype.findTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = this;
                        return [4 /*yield*/, this.user.getTasks({ where: { id: id } })];
                    case 1:
                        _a.task = (_b.sent())[0];
                        if (!this.task)
                            res.status(apiController_1.HTTP_STATUS_CODES.NotFound).end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TasksController;
}(_1.ApiController));
exports.TasksController = TasksController;
