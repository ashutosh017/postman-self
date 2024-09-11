"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
require("dotenv/config");
const backendUrl = process.env.BACKEND_URL;
console.log(backendUrl);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post(`${backendUrl}/api/sum`, (req, res) => {
    const { a, b } = req.body;
    console.log(a + b);
    res.json({
        sum: a + b
    });
});
app.post(`${backendUrl}/api/addToHistory,`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { reqMethod, url, reqBody } = req.body;
    yield db_1.prisma.request.create({
        data: {
            reqMethod, reqUrl: url, reqBody
        }
    });
}));
app.get(`${backendUrl}/api/getAllHistory`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.prisma.request.findMany();
    res.json(response);
}));
app.listen(3000, () => {
    console.log(("hello world"));
});
