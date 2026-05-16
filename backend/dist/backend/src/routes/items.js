"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var items_exports = {};
__export(items_exports, {
  default: () => items_default
});
module.exports = __toCommonJS(items_exports);
var import_express = __toESM(require("express"));
var import_item = __toESM(require("../models/item"));
var import_auth = __toESM(require("../middleware/auth"));
const router = import_express.default.Router();
router.use(import_auth.default);
router.get("/", async (req, res) => {
  try {
    const items = await import_item.default.find({ user: req.user.id });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
router.post("/", async (req, res) => {
  const { name, expiryDate } = req.body;
  try {
    const item = new import_item.default({ name, expiryDate, user: req.user.id });
    await item.save();
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, expiryDate } = req.body;
  try {
    const item = await import_item.default.findOneAndUpdate({ _id: id, user: req.user.id }, { name, expiryDate }, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await import_item.default.findOneAndDelete({ _id: id, user: req.user.id });
    if (!item) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
var items_default = router;
//# sourceMappingURL=items.js.map
