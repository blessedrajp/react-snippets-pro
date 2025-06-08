import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register the command
    let disposable = vscode.commands.registerCommand('reactSnippets.dynamicGenerate', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const selection = editor.selection;
        const wordRange = editor.document.getWordRangeAtPosition(selection.active);
        if (!wordRange) {
            vscode.window.showErrorMessage('No word selected!');
            return;
        }

        const word = editor.document.getText(wordRange);
        if (!word.startsWith('st_')) {
            vscode.window.showErrorMessage('State snippet must start with "st_"');
            return;
        }

        // Parse the command
        const parts = word.split('_').slice(1); // Remove the 'st' prefix
        if (parts.length === 0) {
            vscode.window.showErrorMessage('Invalid format. Use st_name or st_name_type');
            return;
        }

        const stateName = parts[0];
        const stateType = parts.length > 1 ? parts[1] : 'string';
        const setterName = 'set' + stateName.charAt(0).toUpperCase() + stateName.slice(1);

        // Create the snippet
        const snippet = new vscode.SnippetString();
        snippet.appendText(`const [${stateName}, ${setterName}] = useState<${stateType}>(`);

        // Add appropriate default value based on type
        if (stateType === 'string') {
            snippet.appendText("''");
        } else if (stateType === 'number') {
            snippet.appendText('0');
        } else if (stateType === 'boolean') {
            snippet.appendText('false');
        } else {
            snippet.appendText('null');
        }

        snippet.appendText(');');

        // Replace the word with the snippet
        editor.edit(editBuilder => {
            editBuilder.delete(wordRange);
        }).then(() => {
            editor.insertSnippet(snippet, wordRange.start);
        });
    });

    context.subscriptions.push(disposable);

    // Register a completion provider for dynamic snippets
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        ['javascript', 'javascriptreact', 'typescript', 'typescriptreact'],
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                
                if (linePrefix.endsWith('st_')) {
                    const simpleState = new vscode.CompletionItem('st_name', vscode.CompletionItemKind.Snippet);
                    simpleState.insertText = new vscode.SnippetString('st_${1:state}');
                    simpleState.documentation = new vscode.MarkdownString('Creates a useState hook with dynamic name');
                    
                    const typedState = new vscode.CompletionItem('st_name_type', vscode.CompletionItemKind.Snippet);
                    typedState.insertText = new vscode.SnippetString('st_${1:state}_${2:string}');
                    typedState.documentation = new vscode.MarkdownString('Creates a useState hook with dynamic name and type');
                    
                    return [simpleState, typedState];
                }
                
                return undefined;
            }
        },
        '_' // Triggered when typing '_'
    );

    context.subscriptions.push(completionProvider);
}

export function deactivate() {}