"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("@App/app"));
var PORT = 3001;
app_1.default.listen(PORT, function () { return console.log("Server listening on port " + PORT + "!"); });
