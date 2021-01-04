import fs from "fs";
import chalk from "chalk";

const test =
  "They are usually retrieved from a [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) object that is returned as a result of the user selecting files through the [ element <input>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input), object [DataTransfer](https://developer.mozilla.org/ en -US/ docs/Web/API/DataTransfer) used in drag and drop operations, or the `mozGetAsFile()` API on an [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/ HTMLCanvasElement). In Gecko, privileged code can create File objects representing any local file without user interaction (see [Implementation Notes](https://developer.mozilla.org/en-US/docs/Web/API/File#implementation_notes) for more information.).";

function getLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const links = [...text.matchAll(regex)].map(function (item) {
    return {
      [item[1]]: item[2],
      label: item[1],
      url: item[2],
    };
  });
  return links;
}

function handleFileText(txt) {
  const parsed = chalk.yellow(txt);
  return getLinks(parsed);
}

function finishFileReading() {
  console.log(chalk.yellow("Reading file finished"));
}

function errorHandler(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, "Error during file importing"));
}

function readFileSync(filePath) {
  let links;
  fs.readFile(filePath, "utf-8", function name(error, txt) {
    if (error) {
      errorHandler(error);
    }
    links = handleFileText(txt);
    finishFileReading();
  });
  console.log(3)

  return links;
}

function readFileAsync(filePath) {
  fs.promises
    .readFile(filePath, "utf-8")
    .then(handleFileText)
    .catch(errorHandler)
    .finally(finishFileReading);
}

export async function readFileAsyncAwait(filePath) {
  try {
    const txt = await fs.promises.readFile(filePath, "utf-8");
    return handleFileText(txt);
  } catch (error) {
    errorHandler(error);
  } finally {
    finishFileReading();
  }
}