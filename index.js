import fs from "fs";
import chalk from "chalk";

function handleFileText(txt) {
  console.log(chalk.green(txt));
}

function finishFileReading(txt) {
  console.log(chalk.yellow("Reading file finished"));
}

function errorHandler(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, "Error during file importing"));
}

function readFileSync(filePath) {
  fs.readFile(filePath, "utf-8", function name(error, txt) {
    if (error) {
      errorHandler(error);
    }
    handleFileText(txt);
    finishFileReading();
  });
}

function readFileAsync(filePath) {
  fs.promises
    .readFile(filePath, "utf-8")
    .then(handleFileText)
    .catch(errorHandler)
    .finally(finishFileReading);
}

async function readFileAsyncAwait(filePath) {
  try {
    const txt = await fs.promises.readFile(filePath, "utf-8");
    handleFileText(txt);
  } catch (error) {
    errorHandler(error);
  } finally {
    finishFileReading();
  }
}

readFileSync("./files/text.md");
readFileAsync("./files/text.md");
readFileAsyncAwait("./files/text.md");
