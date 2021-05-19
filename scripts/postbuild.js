import * as fs from "fs";
import * as os from "os";

let arduino = JSON.parse(fs.readFileSync(".vscode/arduino.json"));
let compileCommands = JSON.parse(
  fs.readFileSync(`${arduino.output}/compile_commands.json`)
);
if (compileCommands && compileCommands.length > 0) {
  if (os.platform() == "win32") {
    fixCompilerArgs(compileCommands);
  }

  fs.writeFileSync(
    `${arduino.output}/compile_commands.json`,
    JSON.stringify(compileCommands, null, 2)
  );
}

function fixCompilerArgs(compileCommands) {
  compileCommands.forEach((command) => {
    if (command.arguments.length > 0) {
      if (!command.arguments[0].endsWith(".exe")) {
        command.arguments[0] += ".exe";
      }
    }
  });
}
