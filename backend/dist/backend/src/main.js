"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var dotenv = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));
var import_express = __toESM(require("express"));
var import_db = __toESM(require("./db"));
var import_item = __toESM(require("./models/item"));
dotenv.config({ path: "backend/.env" });
const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ? Number(process.env.PORT) : 3e3;
(0, import_db.default)();
const app = (0, import_express.default)();
app.use((0, import_cors.default)());
app.use(import_express.default.json());
app.get("/items", async (req, res) => {
  try {
    const items = await import_item.default.find().sort({ date: 1 });
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error fetching items" });
  }
});
app.post("/items", async (req, res) => {
  const { item, date } = req.body;
  if (!item || !date || item.trim() === "") {
    return res.status(400).json({ error: "Item and date required" });
  }
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({ error: "Date must be in YYYY-MM-DD format" });
  }
  try {
    const newItem = new import_item.default({ item, date });
    await newItem.save();
    return res.json({ success: true, data: newItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error saving item" });
  }
});
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }
  try {
    const deletedItem = await import_item.default.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error deleting item" });
  }
});
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
//# sourceMappingURL=main.js.map
