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
    fixWindowsCompilerArg(compileCommands);

    fs.writeFileSync(
      compilationDatabasePath,
      JSON.stringify(compileCommands, null, 2)
    );
  }

  // const vscodePath = process.argv[3];
  // if (vscodePath) {
  //   const vscodeSettingsPath = path.resolve(vscodePath, "settings.json");
  //   let vscodeSettings = JSON.parse(fs.readFileSync(vscodeSettingsPath));
  //   createSettingsFallbackFlags(compileCommands, vscodeSettings);

  //   fs.writeFileSync(
  //     vscodeSettingsPath,
  //     JSON.stringify(vscodeSettings, null, 2)
  //   );
  // }
}

function fixWindowsCompilerArg(compileCommands) {
  compileCommands.forEach((command) => {
    if (command.arguments.length > 0) {
      if (!command.arguments[0].endsWith(".exe")) {
        command.arguments[0] += ".exe";
      }
    }
  });
}

// function createSettingsFallbackFlags(compileCommands, vscodeSettings) {
//   const compilerFlagRegex = /(?!^-c)(?!^-o)(?:^-{1,2}.+$)|(?:^.*=.*$)/;
//   let commandToExtract = compileCommands[0];
//   let flags = [];
//   const args = commandToExtract.arguments;
//   const argsLength = args.length;
//   for (let i = 0; i < argsLength; ++i) {
//     if (i == 0) {
//       flags.push(args[i]);
//     } else {
//       const flag = compilerFlagRegex.exec(args[i]);
//       if (flag !== null) {
//         flags.push(flag[0]);
//       }
//     }
//   }
//   vscodeSettings["clangd.fallbackFlags"] = flags;
// }
