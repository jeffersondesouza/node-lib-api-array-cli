import fs from "fs";
import chalk from "chalk";
import { readFileAsyncAwait } from "./index.js";

const [filePath, _] = process.argv.reverse();

function printFileLinks(links, fileName = "") {
  console.log(chalk.yellow(`Links from file ${fileName}`), links);
}

async function processText() {
  try {
    fs.lstatSync(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File or directory does not exists");
      return;
    }
  }

  if (fs.lstatSync(filePath).isFile()) {
    const result = await readFileAsyncAwait(filePath);
    printFileLinks(result, filePath);
  } else if (fs.lstatSync(filePath).isDirectory()) {
    const files = await fs.promises.readdir(filePath);

    files.forEach(async function (file) {
      const result = await readFileAsyncAwait(`${filePath}/${file}`);
      printFileLinks(result, `${filePath}/${file}`);
    });
  }
}

processText(filePath);
