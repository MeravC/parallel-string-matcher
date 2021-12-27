const fs = require("fs");
const aggregator = require("./aggregator");
const constants = require("./constants");
const { Worker } = require("worker_threads");
fileDivider();

function fileDivider() {
  fs.readFile("../input/big.txt", "utf8", (err, text) => {
    if (err) {
      console.error(err);
      return;
    }

    const textArr = text.split("\n");
    let chunk = [];
    let chunkFirstLineNum = 0;
    let chunkFirstCharNum = 0;
    let chunkLastLineNum = constants.chunkLineSize;
    while (chunkLastLineNum <= textArr.length) {
      if (textArr[chunkFirstLineNum].length === 0) {
        chunkFirstLineNum++;
      }
      for (let i = chunkFirstLineNum; i < chunkLastLineNum; i++) {
        chunk.push(textArr[i]);
        if (i === chunkFirstLineNum) {
          let regName = new RegExp(textArr[i].split(" ")[0]);
          if (text.toString().match(regName) !== null) {
            chunkFirstCharNum = text.toString().match(regName).index;
          }
        }
      }

      const worker = new Worker("./matcher.js", {
        workerData: [
          chunk,
          constants.commonEnglishNames,
          chunkFirstLineNum,
          chunkFirstCharNum,
        ],
      });

      worker.once("message", (result) => {
        aggregator.collect(result);
        console.log(`Thread Id- ${worker.threadId}`);
      });

      worker.on("error", (error) => {
        console.log(error);
      });

      worker.on("exit", (exitCode) => {
        console.log(`It exited with code ${exitCode}`);
      });

      chunkLastLineNum += constants.chunkLineSize;
      chunkFirstLineNum += constants.chunkLineSize;
      chunk = [];
    }
  });
}
