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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var fs_1 = require("fs");
var path_1 = require("path");
var ignore_1 = require("ignore");
var util_1 = require("util");
var readFile = (0, util_1.promisify)(fs_1.default.readFile);
var writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
var readdir = (0, util_1.promisify)(fs_1.default.readdir);
var stat = (0, util_1.promisify)(fs_1.default.stat);
var workspaceDir = "/workspaces/aicare/aicare-app";
var outputFile = path_1.default.join(workspaceDir, "workspace_code_snapshot.md");
var gitignoreFile = path_1.default.join(workspaceDir, ".gitignore");
// Function to load .gitignore rules
var loadGitignore = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ig, gitignoreContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ig = (0, ignore_1.default)();
                if (!fs_1.default.existsSync(gitignoreFile))
                    return [2 /*return*/, ig];
                return [4 /*yield*/, readFile(gitignoreFile, "utf-8")];
            case 1:
                gitignoreContent = _a.sent();
                return [2 /*return*/, ig.add(gitignoreContent)];
        }
    });
}); };
// Function to recursively scan files
var scanFiles = function (dir, ig) { return __awaiter(void 0, void 0, void 0, function () {
    var filesList, files, _i, files_1, file, fullPath, relativePath, fileStat, subFiles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filesList = [];
                return [4 /*yield*/, readdir(dir)];
            case 1:
                files = _a.sent();
                _i = 0, files_1 = files;
                _a.label = 2;
            case 2:
                if (!(_i < files_1.length)) return [3 /*break*/, 7];
                file = files_1[_i];
                fullPath = path_1.default.join(dir, file);
                relativePath = path_1.default.relative(workspaceDir, fullPath);
                if (ig.ignores(relativePath))
                    return [3 /*break*/, 6]; // Skip ignored files
                return [4 /*yield*/, stat(fullPath)];
            case 3:
                fileStat = _a.sent();
                if (!fileStat.isDirectory()) return [3 /*break*/, 5];
                return [4 /*yield*/, scanFiles(fullPath, ig)];
            case 4:
                subFiles = _a.sent();
                filesList = filesList.concat(subFiles);
                return [3 /*break*/, 6];
            case 5:
                filesList.push(relativePath);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [2 /*return*/, filesList];
        }
    });
}); };
// Function to determine the correct code block format
var getCodeBlockLanguage = function (filePath) {
    var ext = path_1.default.extname(filePath);
    var langMap = {
        ".tsx": "tsx",
        ".ts": "typescript",
        ".js": "javascript",
        ".json": "json",
        ".css": "css",
        ".html": "html",
        ".md": "markdown",
        ".sh": "bash",
    };
    return langMap[ext] || "";
};
// Function to generate Markdown document
var generateMarkdown = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ig, files, markdownContent, _i, files_2, file, content, lang, err_1, errorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadGitignore()];
            case 1:
                ig = _a.sent();
                return [4 /*yield*/, scanFiles(workspaceDir, ig)];
            case 2:
                files = _a.sent();
                markdownContent = "# AiCare Code Snapshot\n\nGenerated on ".concat(new Date().toLocaleString(), "\n\n");
                _i = 0, files_2 = files;
                _a.label = 3;
            case 3:
                if (!(_i < files_2.length)) return [3 /*break*/, 8];
                file = files_2[_i];
                if (!/\.(tsx|ts|js|json|css|html|md|sh)$/i.test(file))
                    return [3 /*break*/, 7]; // Skip non-code files
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, readFile(path_1.default.join(workspaceDir, file), "utf-8")];
            case 5:
                content = _a.sent();
                lang = getCodeBlockLanguage(file);
                markdownContent += "## File: ".concat(file, "\n\n```").concat(lang, "\n").concat(content, "\n```\n\n");
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                errorMessage = err_1 instanceof Error ? err_1.message : "Unknown error";
                console.warn("Skipping file ".concat(file, ": ").concat(errorMessage));
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8: return [4 /*yield*/, writeFile(outputFile, markdownContent, "utf-8")];
            case 9:
                _a.sent();
                console.log("Markdown document generated: ".concat(outputFile));
                return [2 /*return*/];
        }
    });
}); };
// Execute the script
generateMarkdown().catch(function (err) { return console.error(err); });
