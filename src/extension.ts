import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "raidteyar-shittier" is now active!'
  );

  let disposable = vscode.commands.registerCommand("shittier.shittify", () => {
    const document = vscode.window.activeTextEditor?.document;
    const text = document?.getText();
    const shittifiedText = shittify(text || "");
    const textRange = new vscode.Range(0, 0, document?.lineCount || 0, 0);
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.replace(textRange, shittifiedText);
    });
  });

  // make the command execute before save
//   vscode.workspace.onWillSaveTextDocument((event) => {
//     const text = event.document.getText();
//     const shittifiedText = shittify(text);
//     const textRange = new vscode.Range(0, 0, event.document.lineCount, 0);
//     event.waitUntil(
//       Promise.resolve([new vscode.TextEdit(textRange, shittifiedText)])
//     );
//   });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function shittify(inputCode: string): string {
  const lines = inputCode.split("\n");

  // random intendtation
  inputCode = addRandomIndentantion(inputCode);

  // random whitespace
  inputCode = whitespaceShuffle(inputCode);

  // unnecessary random line breaks
  inputCode = addUnnecessaryLineBreaks(inputCode);

  // Inconsistent random bracing styles
  inputCode = addInconsistentBracingStyles(inputCode);

  // Mixed quotes
  inputCode = addMixedQuotes(inputCode);

  // Random comments
  inputCode = addRandomComments(inputCode);

  return inputCode;
}

function addRandomIndentantion(code: string): string {
  const lines = code.split("\n");
  const tabSizes = [0, 5, 10, 15, 20, 25, 30]; // Possible tab sizes

  // Loop through each line and add random indentation
  for (let i = 0; i < lines.length; i++) {
    const randomIndentLevel =
      tabSizes[Math.floor(Math.random() * tabSizes.length)];
    const randomIndent = " ".repeat(randomIndentLevel * 2); // Use 2 spaces for each indentation level

    lines[i] = randomIndent + lines[i];
  }

  return lines.join("\n");
}

function whitespaceShuffle(code: string): string {
  const operators = /[\+\-\*=<>!&|,]/g;
  const symbols = /[\(\)\[\]\{\};]/g;

  // Shuffle whitespace around operators and symbols
  return code
    .replace(operators, (match) => {
      const whitespaceCount = Math.floor(Math.random() * 4); // Random number of whitespaces between 0 and 3
      return " ".repeat(whitespaceCount) + match + " ".repeat(whitespaceCount);
    })
    .replace(symbols, (match) => {
      const whitespaceCount = Math.floor(Math.random() * 4); // Random number of whitespaces between 0 and 3
      return " ".repeat(whitespaceCount) + match + " ".repeat(whitespaceCount);
    });
}

function addUnnecessaryLineBreaks(inputCode: string): string {
  const lines = inputCode.split("\n");

  // Generate random line numbers to insert line breaks
  const lineNumbersToBreaks: number[] = [];
  const numberOfBreaks =
    Math.floor(Math.random() * Math.min(lines.length, 5)) + 1;
  for (let i = 0; i < numberOfBreaks; i++) {
    const lineNum = Math.floor(Math.random() * lines.length);
    lineNumbersToBreaks.push(lineNum);
  }

  // Sort the line numbers in descending order
  lineNumbersToBreaks.sort((a, b) => b - a);

  // Insert line breaks at the selected line numbers
  for (const lineNumber of lineNumbersToBreaks) {
    if (lineNumber > 0 && lineNumber < lines.length - 1) {
      lines[lineNumber] = "\n" + lines[lineNumber];
    }
  }

  return lines.join("\n");
}

function addInconsistentBracingStyles(code: string): string {
  const lines = code.split("\n");
  const openingBraces = ["{", "(", "["]; // Possible opening braces
  const closingBraces = ["}", ")", "]"]; // Possible corresponding closing braces

  // Loop through each line and add inconsistent bracing styles
  for (let i = 0; i < lines.length; i++) {
    const hasBrace =
      lines[i].indexOf("{") !== -1 || lines[i].indexOf("}") !== -1;
    if (hasBrace) {
      const randomIndex = Math.floor(Math.random() * openingBraces.length);
      const openingBrace = openingBraces[randomIndex];
      const closingBrace = closingBraces[randomIndex];

      // Insert opening brace at the start of the line
      if (lines[i].trim().length > 0) {
        lines[i] = openingBrace + " " + lines[i].trim();
      } else {
        lines[i] = openingBrace;
      }

      // Insert closing brace at the end of the line
      lines[i] += " " + closingBrace;
    }
  }

  return lines.join("\n");
}

function addMixedQuotes(code: string): string {
  const lines = code.split("\n");
  const quotes = [`'`, `"`]; // Possible quote types

  // Loop through each line and add mixed quotes
  for (let i = 0; i < lines.length; i++) {
    const hasString = /'[^']*'|"[^"]*"/.test(lines[i]); // Check if the line contains a string
    if (hasString) {
      // Replace single quotes with double quotes or vice versa
      lines[i] = lines[i].replace(
        /'([^']*)'| "([^"]*)"/g,
        (match, singleQuoteContent, doubleQuoteContent) => {
          if (singleQuoteContent) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return `${quotes[randomIndex]}${singleQuoteContent}${quotes[randomIndex]}`;
          } else if (doubleQuoteContent) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return `${quotes[randomIndex]}${doubleQuoteContent}${quotes[randomIndex]}`;
          }
          return match;
        }
      );
    }
  }

  return lines.join("\n");
}

function addRandomComments(code: string): string {
  // variable "times" is used to determine how many comments to add based on the the number of lines in the code
  // add a comment each 5 lines
  const times = Math.floor(code.split("\n").length / 5);
  for (let i = 0; i < times; i++) {
    code = addRandomComment(code);
  }
  return code;
}

function addRandomComment(code: string): string {
  const lines = code.split("\n");
  const randomIndex = Math.floor(Math.random() * lines.length);
  const randomComment = getRandomShittierComment();
  lines[randomIndex] = randomComment + "\n" + lines[randomIndex];
  return lines.join("\n");
}

const shittierCodeComments = [
  "// Chaos incoming, proceed with caution!",
  "// Buckle up! We're going on a bumpy ride!",
  "// Abandon all hope, ye who enter here.",
  "// Ever heard of a thing called 'readability'? Me neither!",
  "// Let's see how many linters we can trigger with this masterpiece!",
  "// Inconsistent indentation? You bet!",
  "// Messy code, messier programmer.",
  "// Once upon a time, there was a programmer who didn't know what they were doing.",
  "// Why make it simple when we can make it shittier?",
  "// This code is like a maze. Good luck finding your way out!",
  "// I'm pretty sure this breaks at least five best practices.",
  "// Do you smell that? It's the smell of chaos.",
  "// Whoever said 'clean code' clearly hasn't seen this.",
  "// One small step for code, one giant leap into confusion.",
  "// Look ma, no comments! Because who needs them?",
  "// Warning: This code may induce headaches.",
  "// Hacky code, coming right up!",
  "// My code is an enigma wrapped in a riddle.",
  "// I'm not a programmer; I'm an artist.",
  "// This code is a monument to disorder.",
  "// You think you've seen bad code? You haven't seen anything yet!",
  "// Just a sprinkle of confusion to spice things up.",
  "// If you understand this code, you must be a wizard.",
  "// Error 404: Meaning not found.",
  "// There's a method to this madness. Maybe.",
  "// This code doesn't have bugs; it's just...special.",
  "// I wrote this code at 3 AM, so...yeah.",
  "// To err is human, to really mess things up requires a programmer.",
  "// When in doubt, add more loops!",
  "// Don't worry; the bugs are there to keep you on your toes.",
  "// Shakespeare would be proud of this code.",
  "// Code quality? What's that?",
  "// The more you stare, the less it makes sense.",
  "// Chaos is the natural state of this code.",
  "// If code were art, this would be a masterpiece.",
  "// As the great philosophers once said: '¯\\_(ツ)_/¯'",
  "// I swear it worked on my machine!",
  "// It's not a bug; it's a feature!",
  "// This code has transcended into a higher state of confusion.",
  "// Do not go gentle into that good refactor.",
  "// If I had a dollar for every bug, I'd be rich!",
  "// It's not a bug; it's an Easter egg!",
  "// Readability? Overrated.",
  "// This codebase has been blessed by the Coding Gods.",
  "// I don't always write code, but when I do, it's shittier.",
  "// You call it chaos; I call it innovation.",
  "// Debugging? More like spelunking.",
  "// The code is dark and full of errors.",
  "// I think my code is smarter than me.",
  "// To be or not to be...logical. That is the question.",
  "// Code monkeys, unite!",
];

// Use the comments as needed in your Shittier extension
export function getRandomShittierComment(): string {
  const randomIndex = Math.floor(Math.random() * shittierCodeComments.length);
  return shittierCodeComments[randomIndex];
}
