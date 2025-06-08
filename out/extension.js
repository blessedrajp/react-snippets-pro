"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    const dynamicGenerateCommand = vscode.commands.registerCommand('reactSnippets.dynamicGenerate', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('Open a file first.');
            return;
        }
        const position = editor.selection.active;
        const wordRange = editor.document.getWordRangeAtPosition(position);
        const word = wordRange ? editor.document.getText(wordRange) : '';
        if (!word) {
            vscode.window.showErrorMessage('Place your cursor on a valid shortcut word like st_name_type');
            return;
        }
        const parts = word.split('_');
        if (parts.length < 2) {
            vscode.window.showErrorMessage('Invalid shortcut format. Use st_name_type or fn_name_type');
            return;
        }
        const prefix = parts[0];
        const name = parts[1];
        const type = parts[2] || '';
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        let snippet = '';
        if (prefix === 'st') {
            const typeToUse = type || 'string';
            snippet = `const [${name}, set${capitalized}] = useState<${typeToUse}>('');`;
        }
        else if (prefix === 'fn') {
            if (type === 'callback') {
                snippet = `const ${name} = useCallback(() => {\n  // logic\n}, []);`;
            }
            else if (type === 'memo') {
                snippet = `const ${name} = useMemo(() => {\n  // logic\n}, []);`;
            }
            else {
                snippet = `const ${name} = () => {\n  // logic\n};`;
            }
        }
        else {
            vscode.window.showErrorMessage('Unsupported prefix. Use "st" or "fn"');
            return;
        }
        await editor.edit((editBuilder) => {
            if (wordRange)
                editBuilder.delete(wordRange);
        });
        editor.insertSnippet(new vscode.SnippetString(snippet), position);
    });
    context.subscriptions.push(dynamicGenerateCommand);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map