"use strict";
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
exports.ApiController = exports.HTTP_STATUS_CODES = void 0;
var Sequelize = require("sequelize");
var HTTP_STATUS_CODES;
(function (HTTP_STATUS_CODES) {
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["Ok"] = 200] = "Ok";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["Created"] = 201] = "Created";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["NoContent"] = 204] = "NoContent";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["NotFound"] = 404] = "NotFound";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["InternalServerError"] = 500] = "InternalServerError";
})(HTTP_STATUS_CODES = exports.HTTP_STATUS_CODES || (exports.HTTP_STATUS_CODES = {}));
// Abstract class.
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    ApiController.create = function (req, res, action) {
        return __awaiter(this, void 0, void 0, function () {
            var controller;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new this();
                        controller.action = action;
                        return [4 /*yield*/, controller.beforeAction(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, controller];
                }
            });
        });
    };
    ApiController.prototype.beforeAction = function (_req, _res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ApiController.prototype.only = function () {
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i] = arguments[_i];
        }
        return actions.indexOf(this.action) >= 0;
    };
    ApiController.prototype.except = function () {
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i] = arguments[_i];
        }
        return actions.indexOf(this.action) === -1;
    };
    ApiController.prototype.permittedParams = function (params, allowed) {
        return Object.entries(params).reduce(function (acc, _a) {
            var key = _a[0], value = _a[1];
            if (allowed.includes(key))
                acc[key] = value;
            return acc;
        }, {});
    };
    ApiController.prototype.catchValidationErrors = function (req, res, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fn()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof Sequelize.ValidationError) {
                            return [2 /*return*/, this.prepareValidationErrorResponse(req, res, error_1)];
                        }
                        else {
                            throw error_1;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /////////////////////
    // Private methods //
    /////////////////////
    ApiController.prototype.prepareValidationErrorResponse = function (_req, res, error) {
        res.status(HTTP_STATUS_CODES.UnprocessableEntity);
        return {
            errors: error.errors.reduce(function (acc, err) {
                var _a;
                var _b;
                return (__assign(__assign({}, acc), (_a = {}, _a[err.path] = ((_b = acc[err.path]) !== null && _b !== void 0 ? _b : []).concat(err.message), _a)));
            }, {}),
        };
    };
    return ApiController;
}());
exports.ApiController = ApiController;
