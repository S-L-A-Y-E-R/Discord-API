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
exports.createMember = exports.updateMember = exports.deleteMember = exports.getMember = exports.getAllMembers = void 0;
const memberModel_1 = __importDefault(require("../models/memberModel"));
const factoryHandler_1 = require("./factoryHandler");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.getAllMembers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serverId, profileId, role } = req.query;
    const filter = {};
    if (role) {
        filter.role = role;
    }
    if (profileId) {
        filter.profileId = profileId;
    }
    if (serverId) {
        filter.serverId = serverId;
    }
    let members = yield memberModel_1.default.find();
    members = members.filter((member) => {
        for (const key in filter) {
            if (member[key].toString() !== filter[key]) {
                return false;
            }
        }
        return true;
    });
    res.status(200).json({
        status: "success",
        results: members.length,
        data: members,
    });
}));
exports.getMember = (0, factoryHandler_1.getOne)(memberModel_1.default);
exports.deleteMember = (0, factoryHandler_1.deleteOne)(memberModel_1.default);
exports.updateMember = (0, factoryHandler_1.updateOne)(memberModel_1.default);
exports.createMember = (0, factoryHandler_1.createOne)(memberModel_1.default);
