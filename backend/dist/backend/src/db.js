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
var db_exports = {};
__export(db_exports, {
  default: () => db_default
});
module.exports = __toCommonJS(db_exports);
var import_mongoose = __toESM(require("mongoose"));
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://ravi31study_db_user:Ravi31srv%40@ac-txjv2yx-shard-00-00.djkfmsd.mongodb.net:27017,ac-txjv2yx-shard-00-01.djkfmsd.mongodb.net:27017,ac-txjv2yx-shard-00-02.djkfmsd.mongodb.net:27017/expirywise?ssl=true&replicaSet=atlas-12b7dv-shard-0&authSource=admin&appName=expirywise-app-cluster";
    const conn = await import_mongoose.default.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
var db_default = connectDB;
//# sourceMappingURL=db.js.map
