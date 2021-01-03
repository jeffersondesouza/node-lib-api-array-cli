import fs from "fs";
import chalk from "chalk";

function errorHandler(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, "Error during file importing"));
}

function readFile(filePath) {
  fs.readFile(filePath, "utf-8", function name(error, txt) {
    if (error) {
      errorHandler(error);
    }
    console.log(chalk.green(txt));
  });
}

readFile("./files/text.md");
