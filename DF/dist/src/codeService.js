"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CodeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeService = void 0;
const common_1 = require("@nestjs/common");
const redisService_1 = require("./redisService");
const _ = require('lodash');
const babelParser = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
const generator_1 = require("@babel/generator");
const t = require("@babel/types");
let CodeService = CodeService_1 = class CodeService {
    constructor(redisService) {
        this.redisService = redisService;
        this.logger = new common_1.Logger(CodeService_1.name);
    }
    async replaceVariable(code, variableName, newValue) {
        function buildLiteralAST(value, seen = new Set()) {
            if (value === null)
                return t.nullLiteral();
            if (typeof value === 'boolean')
                return t.booleanLiteral(value);
            if (typeof value === 'number')
                return t.numericLiteral(value);
            if (typeof value === 'string')
                return t.stringLiteral(value);
            if (typeof value === 'object') {
                if (seen.has(value)) {
                    return t.stringLiteral('[Circular]');
                }
                seen.add(value);
                if (Array.isArray(value)) {
                    return t.arrayExpression(value.map((item) => buildLiteralAST(item, seen)));
                }
                return t.objectExpression(Object.entries(value).map(([key, val]) => t.objectProperty(t.stringLiteral(key), buildLiteralAST(val, seen))));
            }
            throw new Error(`Unsupported value type: ${typeof value}`);
        }
        const ast = babelParser.parse(code, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
        });
        (0, traverse_1.default)(ast, {
            VariableDeclarator(path) {
                if (t.isIdentifier(path.node.id) && path.node.id.name === variableName) {
                    path.node.init = buildLiteralAST(newValue);
                }
            },
        });
        return (0, generator_1.default)(ast).code;
    }
    async customCode(key, code, data, fabric, SessionInfo) {
        const declaredVars = await this.extractDeclaredVariables(code);
        var arr = {};
        if (declaredVars?.length > 0) {
            for (let a = 0; a < declaredVars.length; a++) {
                if (declaredVars[a] == 'sessionInfo') {
                    arr[declaredVars[a]] = SessionInfo;
                }
                if (fabric == "DF-DFD") {
                    if (data && data.hasOwnProperty(declaredVars[a])) {
                        arr[declaredVars[a]] = data[declaredVars[a]];
                    }
                    else {
                        var customres = JSON.parse(await this.redisService.getJsonDataWithPath(key + ':NPV:' + declaredVars[a] + '.PRO', '.customResponse', process.env.CLIENTCODE));
                        if (customres) {
                            if (Array.isArray(customres) && customres.length > 0) {
                                arr[declaredVars[a]] = customres;
                            }
                            else if (Object.keys(customres).length > 0) {
                                arr[declaredVars[a]] = customres;
                            }
                        }
                    }
                }
                else if (fabric == "PF-PFD" || fabric == "PF-SFD" || fabric == "PF-SCDL") {
                    if (await this.redisService.exist(key + ':NPV:' + declaredVars[a] + '.PRO', process.env.CLIENTCODE)) {
                        var pro = JSON.parse(await this.redisService.getJsonData(key + ':NPV:' + declaredVars[a] + '.PRO', process.env.CLIENTCODE));
                        arr[declaredVars[a]] = pro.response;
                    }
                }
            }
        }
        let updatedFunctionString = code;
        for (let [key, value] of Object.entries(arr)) {
            updatedFunctionString = await this.replaceVariable(updatedFunctionString, key, value);
        }
        const output = eval(updatedFunctionString);
        return output;
    }
    async fastReplaceVariable(code, variableName, newValue) {
        const valueString = JSON.stringify(newValue, null, 2);
        const regex = new RegExp(`(const|let|var)\\s+${variableName}\\s*=\\s*[^;]*;`, 'g');
        return code.replace(regex, `$1 ${variableName} = ${valueString};`);
    }
    async extractDeclaredVariables(funcStr) {
        const letMatch = funcStr.match(/let\s+([\s\S]*?);/);
        if (!letMatch)
            return [];
        const letContent = letMatch[1];
        const result = [];
        let depth = 0;
        let current = '';
        for (let i = 0; i < letContent.length; i++) {
            const char = letContent[i];
            if (char === '{' || char === '[')
                depth++;
            if (char === '}' || char === ']')
                depth--;
            if (char === ',' && depth === 0) {
                const variable = current.split('=')[0].trim();
                if (variable)
                    result.push(variable);
                current = '';
            }
            else {
                current += char;
            }
        }
        const finalVar = current.split('=')[0].trim();
        if (finalVar)
            result.push(finalVar);
        return result;
    }
};
exports.CodeService = CodeService;
exports.CodeService = CodeService = CodeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redisService_1.RedisService])
], CodeService);
//# sourceMappingURL=codeService.js.map