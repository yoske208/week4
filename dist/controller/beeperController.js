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
exports.updateStatus = exports.deleteBeeper = exports.createBeeper = exports.getBeeperByStatus = exports.getBeeperById = exports.getBeeper = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const dbPath = './src/data/db.json';
const getBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beepers = db.beeperList;
        res.json(beepers);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
});
exports.getBeeper = getBeeper;
const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeper = db.beeperList.find((b) => b.id === parseInt(id));
        res.json(beeper);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
});
exports.getBeeperById = getBeeperById;
const getBeeperByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeper = db.beeperList.filter((b) => b.status === status);
        res.json(beeper);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
});
exports.getBeeperByStatus = getBeeperByStatus;
const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, status, created_at, detonated_at, latitude, longitude } = req.body;
    try {
        const newBeeper = {
            id,
            name,
            status,
            created_at,
            detonated_at,
            latitude,
            longitude
        };
        const db = yield jsonfile_1.default.readFile(dbPath);
        db.beeperList.push(newBeeper);
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.status(201).json({ beeper: newBeeper });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add beeper' });
    }
});
exports.createBeeper = createBeeper;
const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeperIndex = db.beeperList.findIndex((b) => b.id === parseInt(id));
        if (beeperIndex === -1) {
            return res.status(404).json({ error: 'beeper not found' });
        }
        db.beeperList.splice(beeperIndex, 1);
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.json({ message: 'beeper deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete beeper' });
    }
});
exports.deleteBeeper = deleteBeeper;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const db = yield jsonfile_1.default.readFile(dbPath);
        const beeperIndex = db.beeperList.findIndex((b) => b.id === parseInt(id));
        if (beeperIndex === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        db.beeperList[beeperIndex] = Object.assign(Object.assign({}, db.beeperList[beeperIndex]), { status });
        yield jsonfile_1.default.writeFile(dbPath, db);
        res.json(db.beeperList[beeperIndex]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update beeper' });
    }
});
exports.updateStatus = updateStatus;
