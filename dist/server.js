"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beeperController_1 = require("./controller/beeperController");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const port = 3000;
app.get("/beeper", beeperController_1.getBeeper);
app.post("/beeper", beeperController_1.createBeeper);
app.get("/beeper/:id", beeperController_1.getBeeperById);
app.put("/beeper/:id", beeperController_1.updateStatus);
app.delete("/beeper/:id", beeperController_1.deleteBeeper);
app.get("/beeper/status/:status", beeperController_1.getBeeperByStatus);
app.listen(port, () => {
    console.log(`Server i555s running on http://localhost:${port}`);
});
