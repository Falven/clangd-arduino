import * as path from "path";
import * as fs from "fs";
import * as os from "os";

const buildPath = process.argv[2];
if (!buildPath) {
  process.exit(-1);
}
const compilationDatabasePath = path.resolve(
  buildPath,
  "compile_commands.json"
);
let compileCommands = JSON.parse(fs.readFileSync(compilationDatabasePath));
if (!compileCommands) {
  process.exit(-1);
}

if (compileCommands.length > 0) {
  if (os.platform() == "win32") {
    fixWindowsCompilerArgs(compileCommands);

    fs.writeFileSync(
      compilationDatabasePath,
      JSON.stringify(compileCommands, null, 2)
    );
  }
}

function fixWindowsCompilerArgs(compileCommands) {
  compileCommands.forEach((command) => {
    if (command.arguments.length > 0) {
      if (!command.arguments[0].endsWith(".exe")) {
        command.arguments[0] += ".exe";
      }
    }
  });
}
