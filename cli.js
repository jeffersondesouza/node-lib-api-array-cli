import fs from "fs";
import chalk from "chalk";
import { readFileAsyncAwait } from "./index.js";
import { checkStatus } from "./http.request-checker.js";

const [input, input2, _] = process.argv.reverse();

function printFileLinks(links, fileName = "") {
  console.log(chalk.yellow(`Links from file ${fileName}`), links);
}

async function processText() {
  try {
    fs.lstatSync(input);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File or directory does not exists");
      return;
    }
  }

  if (fs.lstatSync(input).isFile()) {
    const result = await readFileAsyncAwait(input, input2 === '--validate');
    printFileLinks(result, input);
  } else if (fs.lstatSync(input).isDirectory()) {
    const files = await fs.promises.readdir(input);
    files.forEach(async function (file) {
      const result = await readFileAsyncAwait(`${input}/${file}`, input2 === '--validate');
      printFileLinks(result, `${input}/${file}`);
    });
  }
}

processText(input);
